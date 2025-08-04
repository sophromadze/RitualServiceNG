import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { isPlatformBrowser } from '@angular/common';

interface ServiceItem {
  id: string;
  titleKey: string;
  descKey: string;
  image: string;
  keywords: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, CtaComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'ka';
  private subscriptions: Subscription = new Subscription();

  // Services data for grid display
  services: ServiceItem[] = [
    {
      id: 'embalming-dressing',
      titleKey: 'services.embalming_dressing',
      descKey: 'services.embalming_dressing.description',
      image: '/images/embalming.jpg',
      keywords: 'ბალზამირება, გრიმი, ჩაცმა, balzamireba, grimi, chacma'
    },
    {
      id: 'transportation',
      titleKey: 'services.transportation',
      descKey: 'services.transportation.description',
      image: '/images/transfer.jpg',
      keywords: 'გადასვენება, gadasveneba, transportation'
    },
    {
      id: 'mourning-hall',
      titleKey: 'services.mourning_hall',
      descKey: 'services.mourning_hall.description',
      image: '/images/hall.jpg',
      keywords: 'საპანაშვიდე დარბაზი, sapanashvide darbazi, mourning hall'
    },
    {
      id: 'hearse-service',
      titleKey: 'services.hearse_service',
      descKey: 'services.hearse_service.description',
      image: '/images/katafalkebi.jpg',
      keywords: 'კატაფალკის მომსახურება, katafalkis momsaxureba, hearse service'
    },
    {
      id: 'marshutka',
      titleKey: 'services.marshutka',
      descKey: 'services.marshutka.description',
      image: '/images/marshutka.jpg',
      keywords: 'მარშუტკა, marshutka, minibus'
    },
    {
      id: 'hall',
      titleKey: 'services.hall',
      descKey: 'services.hall_service.description',
      image: '/images/hall.jpg',
      keywords: 'დარბაზი, darbazi, hall'
    },
    {
      id: 'cemetery-decoration',
      titleKey: 'services.cemetery_decoration',
      descKey: 'services.cemetery_decoration.description',
      image: '/images/grave.jpg',
      keywords: 'სასაფლაოს მოპირკეთება, sasapleos mopirketeba, cemetery decoration'
    },
    {
      id: 'grave-stones-painting',
      titleKey: 'services.grave_stones_painting',
      descKey: 'services.grave_stones_painting.description',
      image: '/images/stonepainting.jpg',
      keywords: 'საფლავის ქვები, ქვაზე ხატვა, saflavis qvebi, qvaze xatva'
    },
    {
      id: 'metal-letters',
      titleKey: 'services.metal_letters.title',
      descKey: 'services.metal_letters.description',
      image: '/images/metal-letters.jpg',
      keywords: 'ლითონის წარწერები, litonis tsartserebi, metal inscriptions'
    },
    {
      id: 'grave-excavation',
      titleKey: 'services.grave_excavation',
      descKey: 'services.grave_excavation.description',
      image: '/images/grave.jpg',
      keywords: 'სამარხის გაჭრა, samarxis gachra, grave excavation'
    },
    {
      id: 'lifting-machine',
      titleKey: 'services.lifting_machine_service.title',
      descKey: 'services.lifting_machine_service.description',
      image: '/images/liftingMachine.jpg',
      keywords: 'ჩასასვენებელი ლიფტი, chasasvenebli lifti, lifting machine'
    }
  ];



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Subscribe to language changes
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
        this.updateSEO();
      })
    );

    // Subscribe to route data for SEO
    this.subscriptions.add(
      this.route.data.subscribe(data => {
        if (data) {
          this.updateSEO(data);
        }
      })
    );

    // Set language from route
    const urlSegments = this.router.url.split('/');
    if (urlSegments.length > 1 && ['ka', 'en', 'ru'].includes(urlSegments[1])) {
      this.languageService.setLanguage(urlSegments[1]);
    }

    // Handle anchor scrolling
    this.handleAnchorScroll();

    // Listen for hash changes when already on the page
    this.subscriptions.add(
      this.router.events.subscribe(event => {
        if (event.type === 1) { // NavigationEnd
          this.handleAnchorScroll();
        }
      })
    );

    // Also listen for fragment changes
    this.subscriptions.add(
      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          setTimeout(() => {
            this.scrollToElement(fragment);
          }, 100);
        }
      })
    );
  }

  private handleAnchorScroll(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Wait for the component to be fully rendered
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        this.scrollToElement(hash.substring(1)); // Remove the # from hash
      }
    }, 100);
  }

  private scrollToElement(elementId: string): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    const element = document.getElementById(elementId);
    if (element) {
      const elementTop = element.offsetTop - 100; // Offset for header
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private updateSEO(routeData?: any): void {
    const seoData = routeData || {
      title: this.getSEOTitle(),
      description: this.getSEODescription(),
      keywords: this.getSEOKeywords()
    };

    // Add structured data for services page
    const structuredData = this.generateServicesStructuredData();
    
    this.seoService.updateSEO({
      ...seoData,
      structuredData: structuredData
    }, this.currentLanguage);
  }

  private getSEOTitle(): string {
    const titles = {
      ka: 'მომსახურება - სრული სარიტუალო მომსახურება | რიტუალ სერვისი',
      en: 'Services - Complete Funeral Services | Ritual Service',
      ru: 'Услуги - Полный комплекс ритуальных услуг | Ритуал Сервис'
    };
    return titles[this.currentLanguage as keyof typeof titles] || titles.ka;
  }

  private getSEODescription(): string {
    const descriptions = {
      ka: 'სრული სარიტუალო მომსახურება: ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, საპანაშვიდე დარბაზი, მიცვალებულის ჩაცმა. დამკრძალავი ბიურო 24/7.',
      en: 'Complete funeral services: embalming, hearse, stone engraving, transportation, mourning hall, dressing and preparation. Professional funeral home 24/7.',
      ru: 'Полный комплекс ритуальных услуг: бальзамирование, катафалк, роспись на камне, перевозка, траурный зал, одевание усопшего. Похоронный дом 24/7.'
    };
    return descriptions[this.currentLanguage as keyof typeof descriptions] || descriptions.ka;
  }

  private getSEOKeywords(): string {
    const keywords = {
      ka: 'დაკრძალვის სერვისები, ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, damkrdzalavi biuro, მიცვალებულის ჩაცმა, საფლავის მოპირკეთება, balzamireba, katafalka, qvaze xatva, gadasveneba, mopirketeba, micvalebuli, sudara, samgloviaro, dasaflaveba, dakrdzalva, sapanashvide',
      en: 'funeral services, embalming, hearse services, stone engraving, transportation, mourning hall, burial preparation, grave decoration, memorial services, funeral home services',
      ru: 'услуги бальзамирования, услуги катафалка, роспись на камне, услуги перевозки, одевание усопшего, благоустройство могил, услуги похоронного дома, ритуальные услуги'
    };
    return keywords[this.currentLanguage as keyof typeof keywords] || keywords.ka;
  }

  private generateServicesStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": this.languageService.translate('nav.services'),
      "description": this.getSEODescription(),
      "provider": {
        "@type": "FuneralHome",
        "name": "Ritual Service",
        "telephone": "+995557556116"
      }
    };
  }

  // Template methods
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  callPhone(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.location.href = 'tel:+995557556116';
  }

  navigateToService(serviceId: string): void {
    // Map service IDs to the correct routes
    const serviceRouteMap: { [key: string]: string } = {
      'embalming-dressing': 'embalming-dressing',
      'transportation': 'transportation',
      'mourning-hall': 'mourning-hall',
      'hearse-service': 'hearse',
      'marshutka': 'microbus',
      'hall': 'hall',
      'cemetery-decoration': 'cemetery-decoration',
      'grave-stones-painting': 'grave-stones',
      'grave-excavation': 'grave-preparation',
      'lifting-machine': 'lifting-machine'
    };
    
    const route = serviceRouteMap[serviceId] || serviceId;
    
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      this.router.navigate(['services', route]);
    } else {
      // For other languages, add language prefix
      this.router.navigate([this.currentLanguage, 'services', route]);
    }
  }


}