import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

declare const Swiper: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  
  currentLanguage: string = 'ka';
  private subscriptions: Subscription = new Subscription();
  private swiper?: any;

  // SEO-focused content structure with maximum keywords
  heroSlides = [
    {
      id: 'main-service',
      titleKey: 'home.title',
      subtitleKey: 'home.subtitle',
      image: '/images/kuboebi2.jpg',
      alt: 'დამკრძალავი ბიურო - სარიტუალო სახლი - damkrdzalavi biuro'
    },
    {
      id: 'coffins-slide',
      titleKey: 'products.coffins',
      subtitleKey: 'products.coffins_desc',
              images: ['/images/kuboebi3.jpg', '/images/kuboebi4.jpg'],
      alt: 'სასახლეები - ხარისხიანი სასახლეები - sasaxleebi'
    },
    {
      id: 'hearse-slide', 
      titleKey: 'services.hearse',
      subtitleKey: 'services.hearse_desc',
              images: ['/images/katafalkebi2.jpg', '/images/katafalkebi3.jpg'],
      alt: 'კატაფალკა - კატაფალკის მომსახურება - katafalka'
    },
    {
      id: 'embalming-slide',
      titleKey: 'services.embalming',
      subtitleKey: 'services.embalming_desc', 
      image: '/images/darbazebi1.jpg',
      alt: 'ბალზამირება - პროფესიონალური ბალზამირება - balzamireba'
    },
    {
      id: 'stone-engraving-slide',
      titleKey: 'services.stone_engraving',
      subtitleKey: 'services.stone_engraving_desc',
      image: '/images/grave.jpg',
      alt: 'ქვაზე ხატვა - საფლავის მოპირკეთება - qvaze xatva - mopirketeba'
    },
    {
      id: 'transportation-slide',
      titleKey: 'services.transportation', 
      subtitleKey: 'services.transportation_desc',
      image: '/images/microbus.jpg',
      alt: 'გადასვენება - ტრანსპორტირება - gadasveneba'
    }
  ];

  // Why choose us section with SEO keywords
  whyChooseUsFeatures = [
    {
      icon: 'fa-solid fa-user-tie fa-4x',
      titleKey: 'why_choose.experience',
      descKey: 'why_choose.subtitle'
    },
    {
      icon: 'fa-regular fa-star fa-4x', 
      titleKey: 'why_choose.quality',
      descKey: 'why_choose.individual_approach'
    },
    {
      icon: 'fa-regular fa-clock fa-4x',
      titleKey: 'contact.24_7_service',
      descKey: 'why_choose.agent_visit'
    }
  ];

  // Service cards with SEO-optimized URLs and keywords
  serviceCards = [
    {
      titleKey: 'services.embalming',
      descKey: 'services.embalming_desc',
      url: '/services/balzamireba',
      image: '/images/embalming.jpg',
      keywords: 'ბალზამირება, balzamireba, მიცვალებულის მომზადება'
    },
    {
      titleKey: 'services.dressing',
      descKey: 'services.dressing_desc',
      url: '/services/micvalebulis-chacma',
      image: '/images/suit.jpg',
      keywords: 'მიცვალებულის ჩაცმა, micvalebulis chacma, მოწესრიგება'
    },
    {
      titleKey: 'services.transportation',
      descKey: 'services.transportation_desc',
      url: '/services/gadasveneba', 
      image: '/images/microbus.jpg',
      keywords: 'გადასვენება, gadasveneba, ტრანსპორტირება'
    },
    {
      titleKey: 'services.stone_engraving',
      descKey: 'services.stone_engraving_desc',
      url: '/services/qvaze-xatva',
      image: '/images/stonepainting.jpg', 
      keywords: 'ქვაზე ხატვა, qvaze xatva, საფლავის მოპირკეთება'
    },
    {
      titleKey: 'services.grave_decoration',
      descKey: 'services.grave_decoration_desc',
      url: '/services/samarkhis-motsqoba',
      image: '/images/grave.jpg',
      keywords: 'სამარხის მოწყობა, samarkhis motsqoba, საფლავის მოპირკეთება'
    },
    {
      titleKey: 'services.metal_letters',
      descKey: 'services.metal_letters_desc',
      url: '/services/litonis-asoebit-tsartsera',
      image: '/images/tomb.jpg',
      keywords: 'ლითონის ასოებით წარწერა, litonis asoebit tsartsera, მეტალის ასოები'
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
        // Reinitialize Swiper after language change to ensure proper rendering
        setTimeout(() => {
          this.reinitializeSwiper();
        }, 300);
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

  ngAfterViewInit(): void {
    // Load Swiper from CDN and initialize
    this.loadSwiper();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.swiper && typeof this.swiper.destroy === 'function') {
      this.swiper.destroy();
    }
  }

  private loadSwiper(): void {
    // Check if Swiper is already loaded
    if (typeof Swiper !== 'undefined') {
      this.initializeSwiper();
      return;
    }

    // Load Swiper CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(link);

    // Load Swiper JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.onload = () => {
      this.initializeSwiper();
    };
    document.head.appendChild(script);
  }

  private initializeSwiper(): void {
    try {
      // Check if Swiper container exists
      const swiperContainer = document.querySelector('.hero-swiper');
      if (!swiperContainer) {
        console.warn('Swiper container not found');
        return;
      }

      // Check if Swiper is available
      if (typeof Swiper === 'undefined') {
        console.warn('Swiper not loaded yet');
        return;
      }

      // Check if slides are properly loaded
      const slides = document.querySelectorAll('.hero-swiper .swiper-slide');
      
      if (slides.length < 2) {
        setTimeout(() => this.initializeSwiper(), 100);
        return;
      }

      // Check if slides have proper dimensions (not 0x0)
      const firstSlide = slides[0] as HTMLElement;
      if (firstSlide.offsetWidth === 0 || firstSlide.offsetHeight === 0) {
        setTimeout(() => this.initializeSwiper(), 100);
        return;
      }

      // Destroy existing swiper instance if it exists
      if (this.swiper && typeof this.swiper.destroy === 'function') {
        this.swiper.destroy();
      }

      // Enable loop mode since we have 6 slides with proper dimensions
      const shouldUseLoop = true;

      this.swiper = new Swiper('.hero-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: shouldUseLoop,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    } catch (error) {
      console.error('Error initializing Swiper:', error);
    }
  }

  private reinitializeSwiper(): void {
    // Only reinitialize if Swiper is already loaded
    if (typeof Swiper !== 'undefined') {
      // Add a longer delay to ensure DOM is fully updated after language change
      setTimeout(() => {
        this.initializeSwiper();
      }, 200);
    }
  }

  private updateSEO(routeData?: any): void {
    const seoData = routeData || {
      title: this.getSEOTitle(),
      description: this.getSEODescription(),
      keywords: this.getSEOKeywords()
    };

    // Add structured data for home page
    const structuredData = this.generateHomeStructuredData();
    
    this.seoService.updateSEO({
      ...seoData,
      structuredData: structuredData
    }, this.currentLanguage);
  }

  private getSEOTitle(): string {
    const titles = {
      ka: 'რიტუალ სერვისი - დამკრძალავი ბიურო | სარიტუალო სახლი თბილისში',
      en: 'Ritual Service - Funeral Home | Professional Funeral Services in Tbilisi',
      ru: 'Ритуал Сервис - Похоронный дом | Профессиональные ритуальные услуги в Тбилиси'
    };
    return titles[this.currentLanguage as keyof typeof titles] || titles.ka;
  }

  private getSEODescription(): string {
    const descriptions = {
      ka: 'რიტუალ სერვისი - პროფესიონალური დამკრძალავი ბიურო თბილისში. ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, მიცვალებულის ჩაცმა. სარიტუალო მომსახურება 24/7. damkrdzalavi biuro.',
      en: 'Ritual Service - Professional funeral home in Tbilisi. Embalming, hearse services, stone engraving, transportation, dressing and preparation. 24/7 funeral services.',
      ru: 'Ритуал Сервис - профессиональный похоронный дом в Тбилиси. Бальзамирование, катафалк, роспись на камне, перевозка, одевание усопшего. Ритуальные услуги 24/7.'
    };
    return descriptions[this.currentLanguage as keyof typeof descriptions] || descriptions.ka;
  }

  private getSEOKeywords(): string {
    const keywords = {
      ka: 'დამკრძალავი ბიურო, სარიტუალო სახლი, ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, damkrdzalavi biuro, მიცვალებულის ჩაცმა, საფლავის მოპირკეთება, ფერადი სურათის დამზადება, ლითონის ასოებით წარწერა, balzamireba, katafalka, qvaze xatva, gadasveneba, mopirketeba, micvalebuli, sudara, samgloviaro, dasaflaveba, dakrdzalva, sapanashvide, saritualo saxli',
      en: 'funeral home, funeral services, embalming, hearse, stone engraving, transportation, burial services, memorial services, grave decoration, colored photo creation, metal letter inscriptions, dressing and preparation, mourning hall, banquet hall',
      ru: 'похоронный дом, ритуальные услуги, похоронные услуги, бальзамирование, катафалк, роспись на камне, перевозка покойного, благоустройство могил, изготовление цветного фото, надписи металлическими буквами, одевание усопшего, траурный зал, банкетный зал, траурные церемонии, погребение, похороны, похоронное бюро, кладбище, саван, покойный, перевозка по региону, международная перевозка'
    };
    return keywords[this.currentLanguage as keyof typeof keywords] || keywords.ka;
  }

  private generateHomeStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "FuneralHome",
      "name": this.languageService.translate('header.company_name'),
      "alternateName": [
        "დამკრძალავი ბიურო რიტუალ სერვისი",
        "damkrdzalavi biuro",
        "Похоронный дом Ритуал Сервис",
        "Ritual Service Funeral Home",
        "სარიტუალო სახლი",
        "saritualo saxli"
      ],
      "url": `https://ritualservice.ge/${this.currentLanguage}`,
      "logo": "https://ritualservice.ge/images/logo.png",
      "image": "https://ritualservice.ge/images/logo300.png",
      "telephone": "+995599069898",
      "description": this.getSEODescription(),
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "14 ნოდარ ბოხუას ქუჩა",
          "addressLocality": "თბილისი",
          "addressRegion": "თბილისი",
          "addressCountry": "GE",
          "name": "დიღომის ფილიალი"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "4 გრ. ოშკელის ქუჩა", 
          "addressLocality": "თბილისი",
          "addressRegion": "თბილისი",
          "addressCountry": "GE",
          "name": "გლდნის ფილიალი"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "96 ალექსანდრე იოსელიანის ქუჩა",
          "addressLocality": "თბილისი",
          "addressRegion": "თბილისი", 
          "addressCountry": "GE",
          "name": "ჯიქიას ფილიალი"
        }
      ],
      "geo": [
        {
          "@type": "GeoCoordinates",
          "latitude": "41.78013878162857",
          "longitude": "44.7705123053155"
        },
        {
          "@type": "GeoCoordinates", 
          "latitude": "41.81655515468242",
          "longitude": "44.82321041488827"
        },
        {
          "@type": "GeoCoordinates",
          "latitude": "41.72027280349609", 
          "longitude": "44.7002050838214"
        }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "availableService": [
        {
          "@type": "Service",
          "name": this.languageService.translate('services.embalming'),
          "description": this.languageService.translate('services.embalming_desc'),
          "url": `https://ritualservice.ge/${this.currentLanguage}/services/balzamireba`
        },
        {
          "@type": "Service", 
          "name": this.languageService.translate('services.hearse'),
          "description": this.languageService.translate('services.hearse_desc'),
          "url": `https://ritualservice.ge/${this.currentLanguage}/services/katafalka`
        },
        {
          "@type": "Service",
          "name": this.languageService.translate('services.transportation'),
          "description": this.languageService.translate('services.transportation_desc'),
          "url": `https://ritualservice.ge/${this.currentLanguage}/services/gadasveneba`
        },
        {
          "@type": "Service",
          "name": this.languageService.translate('services.stone_engraving'),
          "description": this.languageService.translate('services.stone_engraving_desc'),
          "url": `https://ritualservice.ge/${this.currentLanguage}/services/qvaze-xatva`
        }
      ],
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100075978162042",
        "https://www.memento.ge/"
      ],
      "priceRange": "$$"
    };
  }

  // Methods for template
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  getServiceUrl(serviceUrl: string): string {
    return `/${this.currentLanguage}${serviceUrl}`;
  }

  navigateToService(serviceUrl: string): void {
    this.router.navigate([this.currentLanguage, ...serviceUrl.split('/').filter(s => s)]);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }

  goToServicePage(): void {
    this.router.navigate([this.currentLanguage, 'services']);
  }

  goToPlanningPage(): void {
    this.router.navigate([this.currentLanguage, 'contact']);
  }
}