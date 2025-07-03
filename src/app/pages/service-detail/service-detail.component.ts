import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

interface ServiceContent {
  id: string;
  titleKey: string;
  descKey: string;
  longDescKey: string;
  image: string;
  gallery: string[];
  keywords: string[];
  relatedServices: string[];
  features: string[];
  process: string[];
}

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit, OnDestroy {

  currentLanguage: string = 'ka';
  serviceType: string = '';
  serviceContent?: ServiceContent;
  private subscriptions: Subscription = new Subscription();

  // Service content with heavy SEO keyword focus
  private servicesData: { [key: string]: ServiceContent } = {
    'funeral-home': {
      id: 'funeral-home',
      titleKey: 'services.funeral_home',
      descKey: 'services.funeral_home_desc',
      longDescKey: 'services.funeral_home_long',
      image: '/images/funeral-home-main.jpg',
      gallery: [
        '/images/funeral-home-1.jpg',
        '/images/funeral-home-2.jpg',
        '/images/funeral-home-3.jpg'
      ],
      keywords: ['დამკრძალავი ბიურო', 'damkrdzalavi biuro', 'სარიტუალო სახლი', 'funeral home'],
      relatedServices: ['embalming', 'hearse', 'transportation'],
      features: [
        'services.funeral_home_feature_1',
        'services.funeral_home_feature_2', 
        'services.funeral_home_feature_3',
        'services.funeral_home_feature_4'
      ],
      process: [
        'services.funeral_home_process_1',
        'services.funeral_home_process_2',
        'services.funeral_home_process_3'
      ]
    },
    
    'embalming': {
      id: 'embalming',
      titleKey: 'services.embalming',
      descKey: 'services.embalming_desc',
      longDescKey: 'services.embalming_long',
      image: '/images/embalming-main.jpg',
      gallery: [
        '/images/embalming-1.jpg',
        '/images/embalming-2.jpg',
        '/images/embalming-process.jpg'
      ],
      keywords: ['ბალზამირება', 'balzamireba', 'მიცვალებულის მომზადება', 'embalming'],
      relatedServices: ['dressing', 'funeral-home', 'transportation'],
      features: [
        'services.embalming_feature_1',
        'services.embalming_feature_2',
        'services.embalming_feature_3',
        'services.embalming_feature_4'
      ],
      process: [
        'services.embalming_process_1',
        'services.embalming_process_2',
        'services.embalming_process_3',
        'services.embalming_process_4'
      ]
    },

    'hearse': {
      id: 'hearse',
      titleKey: 'services.hearse',
      descKey: 'services.hearse_desc', 
      longDescKey: 'services.hearse_long',
      image: '/images/hearse-main.jpg',
      gallery: [
        '/images/katafalkebi2.jpg',
        '/images/katafalkebi3.jpg',
        '/images/hearse-luxury.jpg'
      ],
      keywords: ['კატაფალკა', 'katafalka', 'კატაფალკის მომსახურება', 'hearse service'],
      relatedServices: ['transportation', 'funeral-home', 'embalming'],
      features: [
        'services.hearse_feature_1',
        'services.hearse_feature_2',
        'services.hearse_feature_3',
        'services.hearse_feature_4'
      ],
      process: [
        'services.hearse_process_1', 
        'services.hearse_process_2',
        'services.hearse_process_3'
      ]
    },

    'transportation': {
      id: 'transportation',
      titleKey: 'services.transportation',
      descKey: 'services.transportation_desc',
      longDescKey: 'services.transportation_long', 
      image: '/images/transportation-main.jpg',
      gallery: [
        '/images/microbus.jpg',
        '/images/international-transport.jpg',
        '/images/regional-transport.jpg'
      ],
      keywords: ['გადასვენება', 'gadasveneba', 'ტრანსპორტირება', 'transportation'],
      relatedServices: ['hearse', 'funeral-home', 'documentation'],
      features: [
        'services.transportation_feature_1',
        'services.transportation_feature_2',
        'services.transportation_feature_3',
        'services.transportation_feature_4'
      ],
      process: [
        'services.transportation_process_1',
        'services.transportation_process_2', 
        'services.transportation_process_3',
        'services.transportation_process_4'
      ]
    },

    'stone-engraving': {
      id: 'stone-engraving',
      titleKey: 'services.stone_engraving',
      descKey: 'services.stone_engraving_desc',
      longDescKey: 'services.stone_engraving_long',
      image: '/images/stone-engraving-main.jpg',
      gallery: [
        '/images/qvaze-xatva-1.jpg',
        '/images/qvaze-xatva-2.jpg',
        '/images/colored-photo.jpg'
      ],
      keywords: ['ქვაზე ხატვა', 'qvaze xatva', 'ფერადი სურათის დამზადება', 'stone engraving'],
      relatedServices: ['grave-decoration', 'metal-letters', 'memorial-work'],
      features: [
        'services.stone_engraving_feature_1',
        'services.stone_engraving_feature_2',
        'services.stone_engraving_feature_3',
        'services.stone_engraving_feature_4'
      ],
      process: [
        'services.stone_engraving_process_1',
        'services.stone_engraving_process_2',
        'services.stone_engraving_process_3'
      ]
    },

    'grave-decoration': {
      id: 'grave-decoration',
      titleKey: 'services.grave_decoration',
      descKey: 'services.grave_decoration_desc',
      longDescKey: 'services.grave_decoration_long',
      image: '/images/grave-decoration-main.jpg',
      gallery: [
        '/images/grave.jpg',
        '/images/mopirketeba-1.jpg',
        '/images/mopirketeba-2.jpg'
      ],
      keywords: ['საფლავის მოპირკეთება', 'mopirketeba', 'მემორიალური სამუშაოები', 'grave decoration'],
      relatedServices: ['stone-engraving', 'metal-letters', 'landscaping'],
      features: [
        'services.grave_decoration_feature_1',
        'services.grave_decoration_feature_2',
        'services.grave_decoration_feature_3',
        'services.grave_decoration_feature_4'
      ],
      process: [
        'services.grave_decoration_process_1',
        'services.grave_decoration_process_2',
        'services.grave_decoration_process_3'
      ]
    }
  };

  // Translation content for service details with all SEO keywords
  private serviceTranslations = {
    ka: {
      // Funeral Home
      'services.funeral_home': 'დამკრძალავი ბიურო',
      'services.funeral_home_desc': 'პროფესიონალური დამკრძალავი ბიურო თბილისში. სრული სარიტუალო მომსახურება 24/7.',
      'services.funeral_home_long': 'ჩვენი დამკრძალავი ბიურო (damkrdzalavi biuro) წარმოადგენს სრულყოფილ სარიტუალო სახლს, სადაც თქვენ მიიღებთ ყველა საჭირო მომსახურებას. ჩვენ ვზრუნავთ მიცვალებულის ღირსეულ მომზადებაზე, ბალზამირებაზე, კატაფალკის მომსახურებაზე და ყველა იმ დეტალზე, რაც აუცილებელია ღირსეული დაკრძალვისთვის.',
      
      // Embalming
      'services.embalming_long': 'ბალზამირება (balzamireba) არის მიცვალებულის სხეულის კონსერვაციის პროცესი, რომელიც უზრუნველყოფს ხანგრძლივ შენახვას და ბუნებრივი იერის დაცვას. ჩვენი გამოცდილი სპეციალისტები იყენებენ თანამედროვე მეთოდებსა და ხარისხიან მასალებს.',
      
      // Hearse
      'services.hearse_long': 'კატაფალკა (katafalka) - ჩვენი თანამედროვე და ღირსეული კატაფალკების პარკი მზადაა ნებისმიერ დროს. კატაფალკის მომსახურება მოიცავს გადასვენებას როგორც ქალაქში, ისე რაიონებსა და საზღვარგარეთ.',
      
      // Transportation
      'services.transportation_long': 'გადასვენება (gadasveneba) - ჩვენ უზრუნველვყოფთ მიცვალებულის უსაფრთხო ტრანსპორტირებას ნებისმიერ მიმართულებით. რაიონებში თუ საზღვარგარეთ გადასვენება ხორციელდება ყველა საჭირო დოკუმენტის მომზადებით.',
      
      // Stone Engraving
      'services.stone_engraving_long': 'ქვაზე ხატვა (qvaze xatva) - ჩვენი ხელოვანები ქმნიან ღირსეულ მემორიალურ ნამუშევრებს. ფერადი სურათის დამზადება, ლითონის ასოებით წარწერა და ხელოვნური ორნამენტები.',
      
      // Grave Decoration
      'services.grave_decoration_long': 'საფლავის მოპირკეთება (mopirketeba) - კომპლექსური მემორიალური სამუშაოები, რომელიც მოიცავს საფლავის მოწყობას, ლანდშაფტურ დიზაინს, ქვის მუშაობას და ყველა იმ დეტალს, რაც საჭიროა ღირსეული მემორიალისთვის.'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    // Subscribe to route params
    this.subscriptions.add(
      this.route.data.subscribe(data => {
        if (data['service']) {
          this.serviceType = data['service'];
          this.loadServiceContent();
        }
      })
    );

    // Subscribe to language changes  
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
        this.updateSEO();
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

  private loadServiceContent(): void {
    this.serviceContent = this.servicesData[this.serviceType];
    if (this.serviceContent) {
      this.updateSEO();
    }
  }

  private updateSEO(): void {
    if (!this.serviceContent) return;

    const seoData = {
      title: this.getSEOTitle(),
      description: this.getSEODescription(),
      keywords: this.getSEOKeywords(),
      structuredData: this.generateServiceStructuredData()
    };

    this.seoService.updateSEO(seoData, this.currentLanguage);
  }

  private getSEOTitle(): string {
    const serviceTitles = {
      'funeral-home': {
        ka: 'დამკრძალავი ბიურო - damkrdzalavi biuro | რიტუალ სერვისი',
        en: 'Funeral Home - Professional Funeral Services | Ritual Service',
        ru: 'Похоронный дом - Профессиональные услуги | Ритуал Сервис'
      },
      'embalming': {
        ka: 'ბალზამირება - balzamireba | მიცვალებულის მომზადება',
        en: 'Embalming - Professional Embalming Services | Ritual Service',
        ru: 'Бальзамирование - Профессиональные услуги | Ритуал Сервис'
      },
      'hearse': {
        ka: 'კატაფალკა - katafalka | კატაფალკის მომსახურება 24/7',
        en: 'Hearse Service - Professional Transportation | Ritual Service',
        ru: 'Услуги катафалка - Профессиональная перевозка | Ритуал Сервис'
      },
      'transportation': {
        ka: 'გადასვენება - gadasveneba | ტრანსპორტირება რაიონში და საზღვარგარეთ',
        en: 'Transportation - Local and International | Ritual Service',
        ru: 'Перевозка - По региону и за границу | Ритуал Сервис'
      },
      'stone-engraving': {
        ka: 'ქვაზე ხატვა - qvaze xatva | ფერადი სურათის დამზადება',
        en: 'Stone Engraving - Memorial Art Services | Ritual Service',
        ru: 'Роспись на камне - Мемориальные работы | Ритуал Сервис'
      },
      'grave-decoration': {
        ka: 'საფლავის მოპირკეთება - mopirketeba | მემორიალური სამუშაოები',
        en: 'Grave Decoration - Memorial Services | Ritual Service',
        ru: 'Благоустройство могил - Мемориальные услуги | Ритуал Сервис'
      }
    };

    return serviceTitles[this.serviceType as keyof typeof serviceTitles]?.[this.currentLanguage as keyof typeof serviceTitles['funeral-home']] || 
           serviceTitles[this.serviceType as keyof typeof serviceTitles]?.ka || 
           'Ritual Service';
  }

  private getSEODescription(): string {
    const serviceDescriptions = {
      'funeral-home': {
        ka: 'პროფესიონალური დამკრძალავი ბიურო (damkrdzalavi biuro) თბილისში. სრული სარიტუალო მომსახურება, მიცვალებულის ჩაცმა, ბალზამირება. 24/7 მომსახურება.',
        en: 'Professional funeral home in Tbilisi. Complete funeral services, dressing and preparation, embalming. 24/7 service.',
        ru: 'Профессиональный похоронный дом в Тбилиси. Полный комплекс ритуальных услуг, одевание усопшего, бальзамирование. Обслуживание 24/7.'
      },
      'embalming': {
        ka: 'ბალზამირება (balzamireba) - პროფესიონალური მიცვალებულის მომზადება. ხანგრძლივი შენახვა, ჰიგიენური მომზადება. გამოცდილი სპეციალისტები.',
        en: 'Embalming - Professional preparation of the deceased. Long-term preservation, hygienic preparation. Experienced specialists.',
        ru: 'Бальзамирование - Профессиональная подготовка усопшего. Длительное сохранение, гигиеническая подготовка. Опытные специалисты.'
      },
      'hearse': {
        ka: 'კატაფალკა (katafalka) - პროფესიონალური კატაფალკის მომსახურება. თანამედროვე კატაფალკები ნებისმიერ მიმართულებით. 24/7 ხელმისაწვდომობა.',
        en: 'Hearse service - Professional hearse transportation. Modern hearses in any direction. 24/7 availability.',
        ru: 'Услуги катафалка - Профессиональная перевозка катафалком. Современные катафалки в любом направлении. Доступность 24/7.'
      },
      'transportation': {
        ka: 'გადასვენება (gadasveneba) - მიცვალებულის ტრანსპორტირება რაიონში და საზღვარგარეთ. პროფესიონალური გადასვენება, ყველა საჭირო დოკუმენტი.',
        en: 'Transportation - Transportation of deceased locally and internationally. Professional transportation, all necessary documents.',
        ru: 'Перевозка - Транспортировка усопшего по региону და за границу. Профессиональная перевозка, все необходимые документы.'
      },
      'stone-engraving': {
        ka: 'ქვაზე ხატვა (qvaze xatva) - პროფესიონალური ხელოვნური მუშაობა. ფერადი სურათის დამზადება, ლითონის ასოებით წარწერა. ხელოვნური და ხანგრძლივი.',
        en: 'Stone engraving - Professional artistic work. Colored photo creation, metal letter inscriptions. Artistic and durable.',
        ru: 'Роспись на камне - Профессиональная художественная работа. Изготовление цветного фото, надписи металлическими буквами. Художественно и долговечно.'
      },
      'grave-decoration': {
        ka: 'საფლავის მოპირკეთება (mopirketeba) - კომპლექსური მემორიალური სამუშაოები. ლანდშაფტური დიზაინი, ქვის მუშაობა, ღირსეული მემორიალი.',
        en: 'Grave decoration - Complex memorial work. Landscape design, stone work, dignified memorial.',
        ru: 'Благоустройство могил - Комплексные мемориальные работы. Ландшафтный дизайн, каменные работы, достойный мемориал.'
      }
    };

    return serviceDescriptions[this.serviceType as keyof typeof serviceDescriptions]?.[this.currentLanguage as keyof typeof serviceDescriptions['funeral-home']] || 
           serviceDescriptions[this.serviceType as keyof typeof serviceDescriptions]?.ka || 
           'Professional funeral services';
  }

  private getSEOKeywords(): string {
    const serviceKeywords = {
      'funeral-home': {
        ka: 'დამკრძალავი ბიურო, damkrdzalavi biuro, სარიტუალო სახლი, saritualo saxli, მიცვალებულის ჩაცმა, micvalebulis chacma, დაკრძალვის სერვისები, სამგლოვიარო ცერემონიები, დასაფლავების მომსახურება',
        en: 'funeral home, funeral services, burial services, memorial services, dressing and preparation, funeral director, mortuary services',
        ru: 'похоронный дом, ритуальные услуги, похоронные услуги, одевание усопшего, траурные церемонии, услуги погребения, похоронное бюро'
      },
      'embalming': {
        ka: 'ბალზამირება, balzamireba, მიცვალებულის მომზადება, micvalebuli, მიცვალებულის ჩაცმა, micvalebulis chacma, დამკრძალავი ბიურო, damkrdzalavi biuro',
        en: 'embalming, preparation of deceased, body preparation, funeral preparation, mortuary preparation, embalming services',
        ru: 'бальзамирование, подготовка усопшего, одевание усопшего, услуги бальзамирования, подготовка покойного, похоронная подготовка'
      },
      'hearse': {
        ka: 'კატაფალკა, katafalka, კატაფალკის მომსახურება, გადასვენება, gadasveneba, ტრანსპორტირება, damkrdzalavi biuro',
        en: 'hearse, hearse service, funeral transportation, hearse rental, funeral car, mortuary transportation',
        ru: 'катафалк, услуги катафалка, перевозка покойного, похоронный транспорт, ритуальная перевозка, катафалк аренда'
      },
      'transportation': {
        ka: 'გადასვენება, gadasveneba, ტრანსპორტირება, რაიონში გადასვენება, საზღვარგარეთ გადასვენება, კატაფალკა, katafalka, damkrdzalavi biuro',
        en: 'transportation, funeral transportation, local transportation, international transportation, body transportation, repatriation',
        ru: 'перевозка, перевозка покойного, перевозка по региону, международная перевозка, репатриация, транспортировка усопшего'
      },
      'stone-engraving': {
        ka: 'ქვაზე ხატვა, qvaze xatva, ფერადი სურათის დამზადება, ლითონის ასოებით წარწერა, საფლავის მოპირკეთება, mopirketeba, მემორიალური სამუშაოები',
        en: 'stone engraving, memorial engraving, colored photo creation, metal letter inscriptions, grave decoration, memorial work',
        ru: 'роспись на камне, мемориальная гравировка, изготовление цветного фото, надписи металлическими буквами, благоустройство могил, мемориальные работы'
      },
      'grave-decoration': {
        ka: 'საფლავის მოპირკეთება, mopirketeba, მემორიალური სამუშაოები, ქვაზე ხატვა, qvaze xatva, ფერადი სურათის დამზადება, ლითონის ასოებით წარწერა',
        en: 'grave decoration, memorial landscaping, cemetery decoration, grave maintenance, memorial services, headstone installation',
        ru: 'благоустройство могил, мемориальное благоустройство, украшение могил, уход за могилами, мемориальные услуги, установка памятников'
      }
    };

    return serviceKeywords[this.serviceType as keyof typeof serviceKeywords]?.[this.currentLanguage as keyof typeof serviceKeywords['funeral-home']] || 
           serviceKeywords[this.serviceType as keyof typeof serviceKeywords]?.ka || 
           'funeral services';
  }

  private generateServiceStructuredData(): any {
    return this.seoService.generateServiceStructuredData(this.serviceType, this.currentLanguage);
  }

  // Template methods
  translate(key: string): string {
    // First check service-specific translations
    if (this.serviceTranslations[this.currentLanguage as keyof typeof this.serviceTranslations]?.[key as keyof typeof this.serviceTranslations['ka']]) {
      return this.serviceTranslations[this.currentLanguage as keyof typeof this.serviceTranslations][key as keyof typeof this.serviceTranslations['ka']];
    }
    
    // Fallback to general translations
    return this.languageService.translate(key);
  }

  getServiceUrl(relatedService: string): string {
    const serviceUrls = {
      'embalming': 'balzamireba',
      'hearse': 'katafalka', 
      'transportation': 'gadasveneba',
      'stone-engraving': 'qvaze-xatva',
      'grave-decoration': 'mopirketeba',
      'funeral-home': 'damkrdzalavi-biuro'
    };
    
    const url = serviceUrls[relatedService as keyof typeof serviceUrls] || relatedService;
    return `/${this.currentLanguage}/services/${url}`;
  }

  navigateToService(relatedService: string): void {
    const url = this.getServiceUrl(relatedService);
    this.router.navigateByUrl(url);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }

  getGalleryImageAlt(index: number): string {
    const alts = {
      'funeral-home': ['დამკრძალავი ბიურო', 'damkrdzalavi biuro ოფისი', 'სარიტუალო სახლი'],
      'embalming': ['ბალზამირება', 'balzamireba პროცესი', 'მიცვალებულის მომზადება'],
      'hearse': ['კატაფალკა', 'katafalka მომსახურება', 'კატაფალკის პარკი'],
      'transportation': ['გადასვენება', 'gadasveneba ტრანსპორტი', 'ტრანსპორტირების ავტომობილი'],
      'stone-engraving': ['ქვაზე ხატვა', 'qvaze xatva ნამუშევარი', 'ფერადი სურათის დამზადება'],
      'grave-decoration': ['საფლავის მოპირკეთება', 'mopirketeba ნამუშევარი', 'მემორიალური სამუშაოები']
    };

    return alts[this.serviceType as keyof typeof alts]?.[index] || `${this.serviceType} image ${index + 1}`;
  }

  openImageModal(image: string): void {
    // Image modal functionality
    console.log('Opening image modal for:', image);
  }
}