import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';
import { isPlatformBrowser } from '@angular/common';
import { CtaComponent } from '../../shared/components/cta/cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CtaComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  currentLanguage: string = 'ka';
  private subscriptions: Subscription = new Subscription();

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
      titleKey: 'services.coffins',
      url: '/products/coffins',
      image: '/images/kuboebi-2.webp',
      keywords: 'სასახლეები, sasaxleebi, კუბოები'
    },
    {
      titleKey: 'services.coffin_refrigeration',
      url: '/products/refrigeration',
      image: '/images/kubo-macivrebi.webp',
      keywords: 'სასახლე მაცივრები, sasaxle macivrebi, სასახლე-მაცივრები'
    },
    {
      titleKey: 'services.shrouds',
      url: '/products/shrouds',
      image: '/images/sudarebi.webp',
      keywords: 'სუდარა, sudara, სუდარები'
    },
    {
      titleKey: 'services.embalming_dressing',
      url: '/services/embalming-dressing',
      image: '/images/balzamireba.webp',
      keywords: 'ბალზამირება, balzamireba, მიცვალებულის ჩაცმა'
    },
    {
      titleKey: 'services.transportation',
      url: '/services/transportation',
      image: '/images/gadasveneba.webp',
      keywords: 'გადასვენება, gadasveneba, ტრანსპორტირება'
    },
    {
      titleKey: 'services.mourning_hall',
      url: '/services/mourning-hall',
      image: '/images/sapanashvide-darbazi.webp',
      keywords: 'საპანაშვიდე დარბაზი, sapanashvide darbazi, სამგლოვიარო დარბაზი'
    },
    {
      titleKey: 'services.hearse_service',
      url: '/services/hearse',
      image: '/images/katafalka.webp',
      keywords: 'კატაფალკის მომსახურება, katafalkis momserva, კატაფალკა'
    },
    {
      titleKey: 'services.marshutka',
      url: '/services/microbus',
      image: '/images/marshutka.webp',
      keywords: 'მარშუტკა, marshutka, სტუმრების გადაყვანა'
    },
    {
      titleKey: 'services.hall',
      url: '/services/hall',
      image: '/images/sabanketo-darbazi.webp',
      keywords: 'დარბაზი, darbazi, საბანკეტო დარბაზი'
    },
    {
      titleKey: 'services.cemetery_decoration',
      url: '/services/cemetery-decoration',
      image: '/images/sasaflao.webp',
      keywords: 'სასაფლაოს მოპირკეთება, sasaflaos mopirketeba, საფლავის მოპირკეთება'
    },
    {
      titleKey: 'services.grave_stones_painting',
      url: '/services/grave-stones',
      image: '/images/qvaze-xatva.webp',
      keywords: 'საფლავის ქვები, saflavis qvebi, ქვაზე ხატვა'
    },
    {
      titleKey: 'services.metal_letters.title',
      url: '/services/metal-letters',
      image: '/images/litonis-warwerebi.webp',
      keywords: 'ლითონის წარწერები, litonis tsartserebi, metal inscriptions'
    },
    {
      titleKey: 'services.grave_excavation',
      url: '/services/grave-preparation',
      image: '/images/samarxis-gachra.webp',
      keywords: 'სამარხის გაჭრა, samarkhis gachra, საფლავის გაჭრა'
    },
    {
      titleKey: 'services.cemetery_accessories',
      url: '/products/cemetery-accessories',
      image: '/images/sasaflaos-aqsesuarebi.webp',
      keywords: 'სასაფლაოს აქსესუარები, sasaflaos akseesuarebi, საფლავის აქსესუარები'
    },
    {
      titleKey: 'services.lifting_machine',
      url: '/services/lifting-machine',
      image: '/images/chasasvenebeli-lifti.webp',
      keywords: 'ჩასასვენებელი ლიფტი, chasasvenebeli lifti, მწევი მანქანა'
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

    // Add structured data for home page
    const structuredData = this.generateHomeStructuredData();
    
    this.seoService.updateSEO({
      ...seoData,
      structuredData: structuredData
    }, this.currentLanguage);
  }

  private getSEOTitle(): string {
    const titles = {
      ka: 'დამკრძალავი ბიურო - Ritual Service',
      en: 'Funeral Bureau - Ritual Service',
      ru: 'Похоронное бюро - Ritual Service'
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
      "logo": "https://ritualservice.ge/images/logo.webp",
      "image": "https://ritualservice.ge/images/logo300.png",
      "telephone": "+995557556116",
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
          "name": this.languageService.translate('services.embalming_dressing'),
          "description": this.languageService.translate('services.embalming_service.description'),
          "url": `https://ritualservice.ge${this.currentLanguage === 'ka' ? '' : `/${this.currentLanguage}`}/services/balzamireba`
        },
        {
          "@type": "Service", 
          "name": this.languageService.translate('services.hearse_service'),
          "description": this.languageService.translate('services.hearse_service.description'),
          "url": `https://ritualservice.ge${this.currentLanguage === 'ka' ? '' : `/${this.currentLanguage}`}/services/katafalka`
        },
        {
          "@type": "Service",
          "name": this.languageService.translate('services.transportation'),
          "description": this.languageService.translate('services.transportation_service.description'),
          "url": `https://ritualservice.ge${this.currentLanguage === 'ka' ? '' : `/${this.currentLanguage}`}/services/gadasveneba`
        },
        {
          "@type": "Service",
          "name": this.languageService.translate('services.grave_stones_painting'),
          "description": this.languageService.translate('services.stone_engraving_service.description'),
          "url": `https://ritualservice.ge${this.currentLanguage === 'ka' ? '' : `/${this.currentLanguage}`}/services/qvaze-xatva`
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
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return serviceUrl;
    }
    // For other languages, add language prefix
    return `/${this.currentLanguage}${serviceUrl}`;
  }

  navigateToService(serviceUrl: string): void {
    // Navigate to service or product detail pages
    const segments = serviceUrl.split('/').filter(s => s);
    
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      this.router.navigate([...segments]);
    } else {
      // For other languages, add language prefix
      this.router.navigate([this.currentLanguage, ...segments]);
    }
  }

  callPhone(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.location.href = 'tel:+995557556116';
  }

  goToServicePage(): void {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      this.router.navigate(['services']);
    } else {
      // For other languages, add language prefix
      this.router.navigate([this.currentLanguage, 'services']);
    }
  }


}