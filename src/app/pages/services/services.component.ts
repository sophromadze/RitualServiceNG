import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'ka';
  private subscriptions: Subscription = new Subscription();

  // SEO-focused services with maximum keywords
  services = [
    {
      id: 'funeral-home',
      titleKey: 'services.funeral_home',
      descKey: 'services.funeral_home_desc',
      url: 'damkrdzalavi-biuro',
      image: '/images/funeral-home.jpg',
      keywords: 'დამკრძალავი ბიურო, damkrdzalavi biuro, სარიტუალო სახლი',
      features: ['24/7 მომსახურება', 'პროფესიონალური გუნდი', 'სრული მომსახურება']
    },
    {
      id: 'embalming',
      titleKey: 'services.embalming',
      descKey: 'services.embalming_desc',
      url: 'balzamireba',
      image: '/images/embalming.jpg',
      keywords: 'ბალზამირება, balzamireba, მიცვალებულის მომზადება',
      features: ['ხანგრძლივი შენახვა', 'ჰიგიენური მომზადება', 'პროფესიონალური მიდგომა']
    },
    {
      id: 'hearse',
      titleKey: 'services.hearse',
      descKey: 'services.hearse_desc',
      url: 'katafalka',
      image: '/images/hearse.jpg',
      keywords: 'კატაფალკა, katafalka, კატაფალკის მომსახურება',
      features: ['თანამედროვე კატაფალკები', '24/7 ხელმისაწვდომობა', 'ნებისმიერ მიმართულებით']
    },
    {
      id: 'transportation',
      titleKey: 'services.transportation',
      descKey: 'services.transportation_desc',
      url: 'gadasveneba',
      image: '/images/transportation.jpg',
      keywords: 'გადასვენება, gadasveneba, ტრანსპორტირება',
      features: ['რაიონში გადასვენება', 'საზღვარგარეთ გადასვენება', 'ყველა საჭირო დოკუმენტი']
    },
    {
      id: 'stone-engraving',
      titleKey: 'services.stone_engraving',
      descKey: 'services.stone_engraving_desc',
      url: 'qvaze-xatva',
      image: '/images/stone-engraving.jpg',
      keywords: 'ქვაზე ხატვა, qvaze xatva, ხელოვნური მუშაობა',
      features: ['ფერადი სურათის დამზადება', 'ლითონის ასოებით წარწერა', 'ხელოვნური ორნამენტები']
    },
    {
      id: 'grave-decoration',
      titleKey: 'services.grave_decoration',
      descKey: 'services.grave_decoration_desc',
      url: 'mopirketeba',
      image: '/images/grave-decoration.jpg',
      keywords: 'საფლავის მოპირკეთება, mopirketeba, მემორიალური სამუშაოები',
      features: ['ლანდშაფტური დიზაინი', 'ქვის მუშაობა', 'კომპლექსური მომსახურება']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService
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
      "@type": "ItemList",
      "name": this.languageService.translate('nav.services'),
      "description": this.getSEODescription(),
      "itemListElement": this.services.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": this.languageService.translate(service.titleKey),
          "description": this.languageService.translate(service.descKey),
          "url": `https://ritualservice.ge/${this.currentLanguage}/services/${service.url}`,
          "provider": {
            "@type": "FuneralHome",
            "name": "Ritual Service",
            "telephone": "+995599069898"
          }
        }
      }))
    };
  }

  // Template methods
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  getServiceUrl(serviceUrl: string): string {
    return `/${this.currentLanguage}/services/${serviceUrl}`;
  }

  navigateToService(serviceUrl: string): void {
    this.router.navigate([this.currentLanguage, 'services', serviceUrl]);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }
}