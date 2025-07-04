import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';
import { CtaComponent } from '../../shared/components/cta/cta.component';

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
    // Wait for the component to be fully rendered
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        this.scrollToElement(hash.substring(1)); // Remove the # from hash
      }
    }, 100);
  }

  private scrollToElement(elementId: string): void {
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
        "telephone": "+995599069898"
      }
    };
  }

  // Template methods
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }
}