import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  structuredData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  
  private defaultSEO = {
    ka: {
      title: 'რიტუალ სერვისი - დამკრძალავი ბიურო | სარიტუალო სახლი',
      description: 'რიტუალ სერვისი - პროფესიონალური დამკრძალავი ბიურო თბილისში. ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება. სარიტუალო მომსახურება 24/7.',
      keywords: 'დამკრძალავი ბიურო, სარიტუალო სახლი, ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, damkrdzalavi biuro, მიცვალებულის ჩაცმა, საფლავის მოპირკეთება, ფერადი სურათის დამზადება, ლითონის ასოებით წარწერა'
    },
    en: {
      title: 'Ritual Service - Funeral Home | Professional Funeral Services',
      description: 'Ritual Service - Professional funeral home in Tbilisi. Embalming, hearse services, stone engraving, transportation. 24/7 funeral services.',
      keywords: 'funeral home, funeral services, embalming, hearse, stone engraving, transportation, burial services, memorial services, grave decoration'
    },
    ru: {
      title: 'Ритуал Сервис - Похоронный дом | Ритуальные услуги',
      description: 'Ритуал Сервис - профессиональный похоронный дом в Тбилиси. Бальзамирование, катафалк, роспись на камне, перевозка. Ритуальные услуги 24/7.',
      keywords: 'похоронный дом, ритуальные услуги, похоронные услуги, бальзамирование, катафалк, роспись на камне, перевозка покойного, благоустройство могил, траурные церемонии'
    }
  };

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateCanonicalUrl(event.url);
    });
  }

  updateSEO(data: SEOData, language: string = 'ka'): void {
    // Update title
    if (data.title) {
      this.title.setTitle(data.title);
    } else {
      this.title.setTitle(this.defaultSEO[language as keyof typeof this.defaultSEO]?.title || this.defaultSEO.ka.title);
    }

    // Update meta description
    this.updateMetaTag('description', data.description || this.defaultSEO[language as keyof typeof this.defaultSEO]?.description || this.defaultSEO.ka.description);
    
    // Update keywords
    this.updateMetaTag('keywords', data.keywords || this.defaultSEO[language as keyof typeof this.defaultSEO]?.keywords || this.defaultSEO.ka.keywords);
    
    // Update Open Graph tags
    this.updateMetaTag('og:title', data.ogTitle || data.title || this.defaultSEO[language as keyof typeof this.defaultSEO]?.title);
    this.updateMetaTag('og:description', data.ogDescription || data.description || this.defaultSEO[language as keyof typeof this.defaultSEO]?.description);
    this.updateMetaTag('og:image', data.ogImage || 'https://ritualservice.ge/images/logo300.png');
    this.updateMetaTag('og:url', data.ogUrl || this.getCurrentUrl());
    this.updateMetaTag('og:type', 'website');
    this.updateMetaTag('og:site_name', 'Ritual Service');
    
    // Update Twitter Card tags
    this.updateMetaTag('twitter:card', 'summary_large_image');
    this.updateMetaTag('twitter:title', data.title || this.defaultSEO[language as keyof typeof this.defaultSEO]?.title);
    this.updateMetaTag('twitter:description', data.description || this.defaultSEO[language as keyof typeof this.defaultSEO]?.description);
    this.updateMetaTag('twitter:image', data.ogImage || 'https://ritualservice.ge/images/logo300.png');
    
    // Language and alternate links
    this.updateMetaTag('language', language);
    this.updateLanguageAlternates();
    
    // Add structured data if provided
    if (data.structuredData) {
      this.updateStructuredData(data.structuredData);
    } else {
      this.setDefaultStructuredData(language);
    }
  }

  private updateMetaTag(name: string, content: string): void {
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      this.meta.updateTag({ property: name, content: content });
    } else {
      this.meta.updateTag({ name: name, content: content });
    }
  }

  private updateCanonicalUrl(url: string): void {
    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Add new canonical link
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', `https://ritualservice.ge${url}`);
    document.head.appendChild(canonical);
  }

  private updateLanguageAlternates(): void {
    // Remove existing hreflang links
    document.querySelectorAll('link[hreflang]').forEach(link => link.remove());
    
    const currentPath = this.router.url.substring(3); // Remove language prefix
    const languages = ['ka', 'en', 'ru'];
    
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang === 'ka' ? 'ka-GE' : lang === 'en' ? 'en-US' : 'ru-RU');
      link.setAttribute('href', `https://ritualservice.ge/${lang}${currentPath}`);
      document.head.appendChild(link);
    });
    
    // Add x-default
    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `https://ritualservice.ge/ka${currentPath}`);
    document.head.appendChild(defaultLink);
  }

  private updateStructuredData(data: any): void {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  private setDefaultStructuredData(language: string): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FuneralHome",
      "name": language === 'ka' ? "რიტუალ სერვისი - დამკრძალავი ბიურო" : 
             language === 'en' ? "Ritual Service - Funeral Home" : 
             "Ритуал Сервис - Похоронный дом",
      "alternateName": [
        "დამკრძალავი ბიურო რიტუალ სერვისი",
        "damkrdzalavi biuro",
        "Похоронный дом Ритуал Сервис",
        "Ritual Service Funeral Home"
      ],
      "url": "https://ritualservice.ge",
      "logo": "https://ritualservice.ge/images/logo.png",
      "image": "https://ritualservice.ge/images/logo300.png",
      "telephone": "+995599069898",
      "description": this.getMultiLanguageDescription(),
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "14 ნოდარ ბოხუას ქუჩა",
          "addressLocality": "თბილისი",
          "addressRegion": "თბილისი",
          "addressCountry": "GE"
        },
        {
          "@type": "PostalAddress", 
          "streetAddress": "4 გრ. ოშკელის ქუჩა",
          "addressLocality": "თბილისი",
          "addressRegion": "თბილისი", 
          "addressCountry": "GE"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "96 ალექსანდრე იოსელიანის ქუჩა",
          "addressLocality": "თბილისი",
          "addressRegion": "თბილისი",
          "addressCountry": "GE"
        }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "availableService": this.getAvailableServices(language),
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100075978162042",
        "https://www.memento.ge/"
      ],
      "priceRange": "$$",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": language === 'ka' ? "სარიტუალო მომსახურება" : 
               language === 'en' ? "Funeral Services" : 
               "Ритуальные услуги"
      }
    };
    
    this.updateStructuredData(structuredData);
  }

  private getMultiLanguageDescription(): any {
    return {
      "@type": "MultipleLanguageValue",
      "ka": "ჩვენ გთავაზობთ პროფესიონალურ მომსახურებას დაკრძალვის ორგანიზებაში. ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება.",
      "ru": "Мы предоставляем профессиональную поддержку во всех вопросах организации похорон. Бальзамирование, катафалк, роспись на камне.",
      "en": "We provide professional support for all funeral arrangements. Embalming, hearse services, stone engraving, transportation."
    };
  }

  private getAvailableServices(language: string): any[] {
    const services = [
      {
        ka: { name: "მიცვალებულის ჩაცმა მოწესრიგება", desc: "პროფესიონალური მიცვალებულის ჩაცმა და მოწესრიგება" },
        en: { name: "Dressing and Preparation", desc: "Professional dressing and preparation of the deceased" },
        ru: { name: "Подготовка усопшего", desc: "Профессиональная подготовка и облачение усопшего" }
      },
      {
        ka: { name: "ბალზამირება", desc: "თანამედროვე ბალზამირების მეთოდები" },
        en: { name: "Embalming", desc: "Modern embalming methods" },
        ru: { name: "Бальзамирование", desc: "Современные методы бальзамирования" }
      },
      {
        ka: { name: "კატაფალკის მომსახურება", desc: "კატაფალკით ტრანსპორტირება" },
        en: { name: "Hearse Service", desc: "Professional hearse transportation" },
        ru: { name: "Услуги катафалка", desc: "Профессиональная перевозка катафалком" }
      },
      {
        ka: { name: "გადასვენება", desc: "რაიონში და საზღვარგარეთ გადასვენება" },
        en: { name: "Transportation", desc: "Local and international transportation" },
        ru: { name: "Перевозка", desc: "Перевозка по региону и за границу" }
      },
      {
        ka: { name: "ქვაზე ხატვა", desc: "ხელოვნური ქვაზე ხატვა და გრავიურა" },
        en: { name: "Stone Engraving", desc: "Artistic stone engraving and memorial work" },
        ru: { name: "Роспись на камне", desc: "Художественная роспись на камне и мемориальные работы" }
      },
      {
        ka: { name: "საფლავის მოპირკეთება", desc: "საფლავის პროფესიონალური მოპირკეთება" },
        en: { name: "Grave Decoration", desc: "Professional grave decoration and landscaping" },
        ru: { name: "Благоустройство могил", desc: "Профессиональное благоустройство могил" }
      }
    ];

    return services.map(service => ({
      "@type": "Service",
      "name": service[language as keyof typeof service]?.name || service.ka.name,
      "description": service[language as keyof typeof service]?.desc || service.ka.desc
    }));
  }

  private getCurrentUrl(): string {
    return `https://ritualservice.ge${this.router.url}`;
  }

  // Method to generate service-specific structured data
  generateServiceStructuredData(serviceType: string, language: string): any {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "provider": {
        "@type": "FuneralHome",
        "name": "Ritual Service",
        "telephone": "+995599069898",
        "url": "https://ritualservice.ge"
      }
    };

    switch (serviceType) {
      case 'embalming':
        return {
          ...baseData,
          "name": language === 'ka' ? "ბალზამირება" : language === 'en' ? "Embalming" : "Бальзамирование",
          "description": language === 'ka' ? "პროფესიონალური ბალზამირების მომსახურება" : 
                        language === 'en' ? "Professional embalming services" : 
                        "Профессиональные услуги бальзамирования",
          "serviceType": "Embalming"
        };
      
      case 'hearse':
        return {
          ...baseData,
          "name": language === 'ka' ? "კატაფალკის მომსახურება" : language === 'en' ? "Hearse Service" : "Услуги катафалка",
          "description": language === 'ka' ? "კატაფალკის პროფესიონალური მომსახურება" : 
                        language === 'en' ? "Professional hearse transportation services" : 
                        "Профессиональные услуги катафалка",
          "serviceType": "Transportation"
        };
      
      default:
        return baseData;
    }
  }
}