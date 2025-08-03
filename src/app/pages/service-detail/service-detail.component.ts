import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { isPlatformBrowser } from '@angular/common';

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
  process?: string[];
}

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CtaComponent],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit, OnDestroy {

  currentLanguage: string = 'ka';
  serviceType: string = '';
  serviceContent?: ServiceContent;
  private subscriptions: Subscription = new Subscription();

  // Service content with heavy SEO keyword focus
  servicesData: { [key: string]: ServiceContent } = {
    'agent-service': {
      id: 'agent-service',
      titleKey: 'services.agent_service.title',
      descKey: 'services.agent_service.description',
      longDescKey: 'services.agent_service.long_description',
      image: '/images/agent.jpg',
      gallery: [
        '/images/agent.jpg',
        '/images/agent2.jpg',
        '/images/agent3.jpg'
      ],
      keywords: ['აგენტის მომსახურება', 'agent service', 'damkrdzalavi biuro'],
      relatedServices: ['dressing', 'embalming', 'hearse'],
      features: [
        'services.agent_service.feature_1',
        'services.agent_service.feature_2',
        'services.agent_service.feature_3',
        'services.agent_service.feature_4'
      ],
      process: [
        'services.agent_service.process_1',
        'services.agent_service.process_2',
        'services.agent_service.process_3'
      ]
    },
    
    'dressing': {
      id: 'dressing',
      titleKey: 'services.dressing_service.title',
      descKey: 'services.dressing_service.description',
      longDescKey: 'services.dressing_service.long_description',
      image: '/images/suit.jpg',
      gallery: [
        '/images/suit.jpg',
        '/images/dressing1.jpg',
        '/images/dressing2.jpg'
      ],
      keywords: ['მიცვალებულის ჩაცმა', 'micvalebulis chacma', 'dressing service'],
      relatedServices: ['agent-service', 'embalming', 'hearse'],
      features: [
        'services.dressing_service.feature_1',
        'services.dressing_service.feature_2',
        'services.dressing_service.feature_3',
        'services.dressing_service.feature_4'
      ],
      process: [
        'services.dressing_service.process_1',
        'services.dressing_service.process_2',
        'services.dressing_service.process_3'
      ]
    },

    'embalming': {
      id: 'embalming',
      titleKey: 'services.embalming_service.title',
      descKey: 'services.embalming_service.description',
      longDescKey: 'services.embalming_service.long_description',
      image: '/images/embalming.jpg',
      gallery: [
        '/images/embalming.jpg',
        '/images/embalming1.jpg',
        '/images/embalming2.jpg'
      ],
      keywords: ['ბალზამირება', 'balzamireba', 'embalming service'],
      relatedServices: ['dressing', 'hearse', 'transportation'],
      features: [
        'services.embalming_service.feature_1',
        'services.embalming_service.feature_2',
        'services.embalming_service.feature_3',
        'services.embalming_service.feature_4'
      ],
      process: [
        'services.embalming_service.process_1',
        'services.embalming_service.process_2',
        'services.embalming_service.process_3'
      ]
    },

    'hearse': {
      id: 'hearse',
      titleKey: 'services.hearse_service.title',
      descKey: 'services.hearse_service.description',
      longDescKey: 'services.hearse_service.description',
      image: '/images/katafalkebi.jpg',
      gallery: [
        '/images/katafalkebi.jpg',
        '/images/katafalki1.jpg',
        '/images/katafalki2.jpg'
      ],
      keywords: ['კატაფალკა', 'katafalka', 'hearse service'],
      relatedServices: ['embalming', 'transportation', 'mourning-hall'],
      features: [
        'services.hearse_service.specialized_vehicle',
        'services.hearse_service.service_georgia'
      ],
      process: [
        'services.hearse_service.care_respect_header',
        'services.hearse_service.final_message'
      ]
    },

    'transportation': {
      id: 'transportation',
      titleKey: 'services.transportation_service.title',
      descKey: 'services.transportation_service.description',
      longDescKey: 'services.transportation_service.description',
      image: '/images/transfer.jpg',
      gallery: [
        '/images/transfer.jpg',
        '/images/transportation1.jpg',
        '/images/transportation2.jpg'
      ],
      keywords: ['გადასვენება', 'gadasveneba', 'transportation service'],
      relatedServices: ['hearse', 'embalming', 'grave-preparation'],
      features: [
        'services.transportation_service.specialized_vehicle',
        'services.transportation_service.hygienic_conditions',
        'services.transportation_service.24_7_call',
        'services.transportation_service.reliable_service'
      ],
      process: [
        'services.transportation_service.full_preparation_header',
        'services.transportation_service.final_message'
      ]
    },

    'stone-engraving': {
      id: 'stone-engraving',
      titleKey: 'services.stone_engraving_service.title',
      descKey: 'services.stone_engraving_service.description',
      longDescKey: 'services.stone_engraving_service.long_description',
      image: '/images/stonepainting.jpg',
      gallery: [
        '/images/stonepainting.jpg',
        '/images/stone1.jpg',
        '/images/stone2.jpg'
      ],
      keywords: ['ქვაზე ხატვა', 'qvaze xatva', 'stone engraving'],
      relatedServices: ['grave-decoration', 'colored-photo', 'metal-letters'],
      features: [
        'services.stone_engraving_service.feature_1',
        'services.stone_engraving_service.feature_2',
        'services.stone_engraving_service.feature_3',
        'services.stone_engraving_service.feature_4'
      ],
      process: [
        'services.stone_engraving_service.process_1',
        'services.stone_engraving_service.process_2',
        'services.stone_engraving_service.process_3'
      ]
    },

    'grave-decoration': {
      id: 'grave-decoration',
      titleKey: 'services.grave_decoration_service.title',
      descKey: 'services.grave_decoration_service.description',
      longDescKey: 'services.grave_decoration_service.long_description',
      image: '/images/grave.jpg',
      gallery: [
        '/images/grave.jpg',
        '/images/grave1.jpg',
        '/images/grave2.jpg'
      ],
      keywords: ['საფლავის მოპირკეთება', 'mopirketeba', 'grave decoration'],
      relatedServices: ['stone-engraving', 'grave-preparation', 'colored-photo'],
      features: [
        'services.grave_decoration_service.feature_1',
        'services.grave_decoration_service.feature_2',
        'services.grave_decoration_service.feature_3',
        'services.grave_decoration_service.feature_4'
      ],
      process: [
        'services.grave_decoration_service.process_1',
        'services.grave_decoration_service.process_2',
        'services.grave_decoration_service.process_3'
      ]
    },

    'mourning-hall': {
      id: 'mourning-hall',
      titleKey: 'services.mourning_hall_service.title',
      descKey: 'services.mourning_hall_service.description',
      longDescKey: 'services.mourning_hall_service.description',
      image: '/images/hall.jpg',
      gallery: [
        '/images/hall.jpg',
        '/images/hall1.jpg',
        '/images/hall2.jpg'
      ],
      keywords: ['საპანაშვიდე დარბაზი', 'sapanashvide darbazi', 'mourning hall'],
      relatedServices: ['hearse', 'banquet-hall', 'embalming'],
      features: [
        'services.mourning_hall_service.rest_card',
        'services.mourning_hall_service.guests_card',
        'services.mourning_hall_service.tradition_card',
        'services.mourning_hall_service.infrastructure_card'
      ],
      process: [
        'services.mourning_hall_service.full_preparation_header',
        'services.mourning_hall_service.final_message'
      ]
    },

    'banquet-hall': {
      id: 'banquet-hall',
      titleKey: 'services.banquet_hall_service.title',
      descKey: 'services.banquet_hall_service.description',
      longDescKey: 'services.banquet_hall_service.long_description',
      image: '/images/hall.jpg',
      gallery: [
        '/images/hall.jpg',
        '/images/banquet1.jpg',
        '/images/banquet2.jpg'
      ],
      keywords: ['საბანკეტო დარბაზი', 'sabanketo darbazi', 'banquet hall'],
      relatedServices: ['mourning-hall', 'hearse', 'transportation'],
      features: [
        'services.banquet_hall_service.feature_1',
        'services.banquet_hall_service.feature_2',
        'services.banquet_hall_service.feature_3',
        'services.banquet_hall_service.feature_4'
      ],
      process: [
        'services.banquet_hall_service.process_1',
        'services.banquet_hall_service.process_2',
        'services.banquet_hall_service.process_3'
      ]
    },

    'grave-preparation': {
      id: 'grave-preparation',
      titleKey: 'services.grave_preparation_service.title',
      descKey: 'services.grave_preparation_service.description',
      longDescKey: 'services.grave_preparation_service.long_description',
      image: '/images/grave.jpg',
      gallery: [
        '/images/grave.jpg',
        '/images/preparation1.jpg',
        '/images/preparation2.jpg'
      ],
      keywords: ['საფლავის მომზადება', 'saflavis momzadeba', 'grave preparation'],
      relatedServices: ['grave-decoration', 'transportation', 'stone-engraving'],
      features: [
        'services.grave_preparation_service.feature_1',
        'services.grave_preparation_service.feature_2',
        'services.grave_preparation_service.feature_3',
        'services.grave_preparation_service.feature_4'
      ],
      process: [
        'services.grave_preparation_service.process_1',
        'services.grave_preparation_service.process_2'
      ]
    },

    'colored-photo': {
      id: 'colored-photo',
      titleKey: 'services.colored_photo_service.title',
      descKey: 'services.colored_photo_service.description',
      longDescKey: 'services.colored_photo_service.long_description',
      image: '/images/stonepainting.jpg',
      gallery: [
        '/images/stonepainting.jpg',
        '/images/photo1.jpg',
        '/images/photo2.jpg'
      ],
      keywords: ['ფერადი სურათი', 'feradi surati', 'colored photo'],
      relatedServices: ['stone-engraving', 'metal-letters', 'grave-decoration'],
      features: [
        'services.colored_photo_service.feature_1',
        'services.colored_photo_service.feature_2',
        'services.colored_photo_service.feature_3',
        'services.colored_photo_service.feature_4'
      ],
      process: [
        'services.colored_photo_service.process_1',
        'services.colored_photo_service.process_2',
        'services.colored_photo_service.process_3'
      ]
    },

    'metal-letters': {
      id: 'metal-letters',
      titleKey: 'services.metal_letters_service.title',
      descKey: 'services.metal_letters_service.description',
      longDescKey: 'services.metal_letters_service.long_description',
      image: '/images/stonepainting.jpg',
      gallery: [
        '/images/stonepainting.jpg',
        '/images/metal1.jpg',
        '/images/metal2.jpg'
      ],
      keywords: ['ლითონის წარწერები', 'litonis tsartserebi', 'metal inscriptions'],
      relatedServices: ['stone-engraving', 'colored-photo', 'grave-decoration'],
      features: [
        'services.metal_letters_service.feature_1',
        'services.metal_letters_service.feature_2',
        'services.metal_letters_service.feature_3',
        'services.metal_letters_service.feature_4'
      ],
      process: [
        'services.metal_letters_service.process_1',
        'services.metal_letters_service.process_2'
      ]
    },

    'embalming-dressing': {
      id: 'embalming-dressing',
      titleKey: 'services.embalming_dressing_service.title',
      descKey: 'services.embalming_dressing_service.description',
      longDescKey: 'services.embalming_dressing_service.description',
      image: '/images/embalming.jpg',
      gallery: [
        '/images/embalming.jpg',
        '/images/suit.jpg',
        '/images/dressing1.jpg'
      ],
      keywords: ['ბალზამირება, გრიმი, ჩაცმა', 'balzamireba, grimi, chacma', 'embalming makeup dressing'],
      relatedServices: ['hearse', 'transportation', 'mourning-hall'],
      features: [
        'services.embalming_dressing_service.embalming_card',
        'services.embalming_dressing_service.makeup_card',
        'services.embalming_dressing_service.dressing_card'
      ],
      process: [
        'services.embalming_dressing_service.full_preparation_header',
        'services.embalming_dressing_service.final_message'
      ]
    },

    'microbus': {
      id: 'microbus',
      titleKey: 'services.microbus_service.title',
      descKey: 'services.microbus_service.description',
      longDescKey: 'services.microbus_service.long_description',
      image: '/images/marshutka.jpg',
      gallery: [
        '/images/marshutka.jpg',
        '/images/microbus1.jpg',
        '/images/microbus2.jpg'
      ],
      keywords: ['მარშუტკა', 'marshutka', 'microbus service'],
      relatedServices: ['transportation', 'hearse', 'mourning-hall'],
      features: [
        'services.microbus_service.comfortable_modern',
        'services.microbus_service.safe_travel',
        'services.microbus_service.timely_reliable',
        'services.microbus_service.tbilisi_regions'
      ],
      process: [
        'services.microbus_service.full_preparation_header',
        'services.microbus_service.final_message'
      ]
    },

    'hall': {
      id: 'hall',
      titleKey: 'services.hall_service.title',
      descKey: 'services.hall_service.description',
      longDescKey: 'services.hall_service.long_description',
      image: '/images/hall.jpg',
      gallery: [
        '/images/hall.jpg',
        '/images/saritualo-darbazi.jpg',
        '/images/saritualo-darbazi-2.jpg'
      ],
      keywords: ['დარბაზი', 'darbazi', 'hall service'],
      relatedServices: ['mourning-hall', 'banquet-hall', 'transportation'],
      features: [
        'services.hall_service.feature_1',
        'services.hall_service.feature_2',
        'services.hall_service.feature_3',
        'services.hall_service.feature_4'
      ],
      process: [
        'services.hall_service.process_1',
        'services.hall_service.process_2'
      ]
    },

    'cemetery-decoration': {
      id: 'cemetery-decoration',
      titleKey: 'services.cemetery_decoration_service.title',
      descKey: 'services.cemetery_decoration_service.description',
      longDescKey: 'services.cemetery_decoration_service.description',
      image: '/images/grave.jpg',
      gallery: [
        '/images/grave.jpg',
        '/images/cemetery1.jpg',
        '/images/cemetery2.jpg'
      ],
      keywords: ['სასაფლაოს მოპირკეთება', 'sasapleos mopirketeba', 'cemetery decoration'],
      relatedServices: ['grave-decoration', 'grave-stones', 'grave-preparation'],
              features: [
          'services.cemetery_decoration_service.high_quality_materials_header',
          'services.cemetery_decoration_service.individual_approach_header',
          'services.cemetery_decoration_service.full_spectrum_header',
          'services.cemetery_decoration_service.long_term_result_header'
        ],
      process: [
        'services.cemetery_decoration_service.full_preparation_header',
        'services.cemetery_decoration_service.final_message'
      ]
    },

    'grave-stones': {
      id: 'grave-stones',
      titleKey: 'services.grave_stones_service.title',
      descKey: 'services.grave_stones_service.description',
      longDescKey: 'services.grave_stones_service.long_description',
      image: '/images/stonepainting.jpg',
      gallery: [
        '/images/stonepainting.jpg',
        '/images/grave-stones1.jpg',
        '/images/grave-stones2.jpg'
      ],
      keywords: ['საფლავის ქვები, ქვაზე ხატვა', 'saflavis qvebi, qvaze xatva', 'grave stones stone painting'],
      relatedServices: ['stone-engraving', 'cemetery-decoration', 'grave-decoration'],
      features: [
        'services.grave_stones_service.feature_1',
        'services.grave_stones_service.feature_2',
        'services.grave_stones_service.feature_3',
        'services.grave_stones_service.feature_4'
      ],
      process: [
        'services.grave_stones_service.process_1',
        'services.grave_stones_service.process_2',
        'services.grave_stones_service.process_3'
      ]
    },

    'lifting-machine': {
      id: 'lifting-machine',
      titleKey: 'services.lifting_machine_service.title',
      descKey: 'services.lifting_machine_service.description',
      longDescKey: 'services.lifting_machine_service.long_description',
      image: '/images/liftingMachine.jpg',
      gallery: [
        '/images/liftingMachine.jpg',
        '/images/lifting1.jpg',
        '/images/lifting2.jpg'
      ],
      keywords: ['ჩასასვენებლი ლიფტი', 'chasasvenebli lifti', 'lifting machine'],
      relatedServices: ['grave-preparation', 'transportation', 'cemetery-decoration'],
      features: [
        'services.lifting_machine_service.feature_1',
        'services.lifting_machine_service.feature_2',
        'services.lifting_machine_service.feature_3',
        'services.lifting_machine_service.feature_4'
      ],
      process: [
        'services.lifting_machine_service.process_1',
        'services.lifting_machine_service.process_2'
      ]
    }
  };

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

    // Subscribe to route params
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        this.serviceType = params['service'];
        this.loadServiceContent();
      })
    );

    // Subscribe to route data for SEO
    this.subscriptions.add(
      this.route.data.subscribe(data => {
        if (data && data['service']) {
          this.serviceType = data['service'];
          this.loadServiceContent();
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

  private loadServiceContent(): void {
    this.serviceContent = this.servicesData[this.serviceType];
    this.updateSEO();
  }

  private updateSEO(): void {
    if (!this.serviceContent) return;

    const seoData = {
      title: this.getSEOTitle(),
      description: this.getSEODescription(),
      keywords: this.getSEOKeywords()
    };

    // Add structured data for service detail page
    const structuredData = this.generateServiceStructuredData();
    
    this.seoService.updateSEO({
      ...seoData,
      structuredData: structuredData
    }, this.currentLanguage);
  }

  private getSEOTitle(): string {
    if (!this.serviceContent) return '';
    
    const titles = {
      ka: `${this.translate(this.serviceContent.titleKey)} - ${this.translate('header.company_name')}`,
      en: `${this.translate(this.serviceContent.titleKey)} - ${this.translate('header.company_name')}`,
      ru: `${this.translate(this.serviceContent.titleKey)} - ${this.translate('header.company_name')}`
    };
    return titles[this.currentLanguage as keyof typeof titles] || titles.ka;
  }

  private getSEODescription(): string {
    if (!this.serviceContent) return '';
    
    return this.translate(this.serviceContent.descKey);
  }

  private getSEOKeywords(): string {
    if (!this.serviceContent) return '';
    
    return this.serviceContent.keywords.join(', ');
  }

  private generateServiceStructuredData(): any {
    if (!this.serviceContent) return {};

    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": this.translate(this.serviceContent.titleKey),
      "description": this.translate(this.serviceContent.descKey),
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

  getServiceUrl(relatedService: string): string {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return `/services/${relatedService}`;
    }
    // For other languages, add language prefix
    return `/${this.currentLanguage}/services/${relatedService}`;
  }

  navigateToService(relatedService: string): void {
    this.router.navigate([this.getServiceUrl(relatedService)]);
  }

  callPhone(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.location.href = 'tel:+995557556116';
  }

  getGalleryImageAlt(index: number): string {
    if (!this.serviceContent) return '';
    return `${this.translate(this.serviceContent.titleKey)} - ${index + 1}`;
  }

  openImageModal(image: string): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Implementation for image modal
    console.log('Opening image modal:', image);
  }

  // Type guard to ensure serviceContent is defined
  isServiceContentDefined(): boolean {
    return this.serviceContent !== undefined && this.serviceContent !== null;
  }

  // TrackBy function for ngFor loops
  trackByIndex(index: number): number {
    return index;
  }

  // Navigation structure matching header component
  navigation = {
    ka: {
      services: [
        { name: 'ბალზამირება, გრიმი, ჩაცმა', url: 'embalming-dressing', keywords: 'balzamireba grimi chacma' },
        { name: 'გადასვენება', url: 'transportation', keywords: 'gadasveneba' },
        { name: 'საპანაშვიდე დარბაზი', url: 'mourning-hall', keywords: 'sapanashvide darbazi' },
        { name: 'კატაფალკის მომსახურება', url: 'hearse', keywords: 'katafalkis momsaxureba' },
        { name: 'მარშუტკა', url: 'microbus', keywords: 'marshutka' },
        { name: 'დარბაზი', url: 'hall', keywords: 'darbazi' },
        { name: 'სასაფლაოს მოპირკეთება', url: 'cemetery-decoration', keywords: 'sasapleos mopirketeba' },
        { name: 'საფლავის ქვები, ქვაზე ხატვა', url: 'grave-stones', keywords: 'saplavis qvebi qvaze xatva' },
        { name: 'ლითონის წარწერები', url: 'metal-letters', keywords: 'litonis tsartserebi' },
        { name: 'სამარხის გაჭრა', url: 'grave-preparation', keywords: 'samarxis gacra' },
        { name: 'ჩასასვენებლი ლიფტი', url: 'lifting-machine', keywords: 'chasasvenebli lifti' }
      ]
    },
    en: {
      services: [
        { name: 'Embalming, Makeup, Dressing', url: 'embalming-dressing', keywords: 'embalming makeup dressing' },
        { name: 'Transportation', url: 'transportation', keywords: 'transportation' },
        { name: 'Memorial Hall', url: 'mourning-hall', keywords: 'memorial hall' },
        { name: 'Hearse Service', url: 'hearse', keywords: 'hearse service' },
        { name: 'Microbus', url: 'microbus', keywords: 'microbus' },
        { name: 'Hall', url: 'hall', keywords: 'hall' },
        { name: 'Cemetery Decoration', url: 'cemetery-decoration', keywords: 'cemetery decoration' },
        { name: 'Grave Stones, Stone Painting', url: 'grave-stones', keywords: 'grave stones stone painting' },
        { name: 'Metal Inscriptions', url: 'metal-letters', keywords: 'metal inscriptions' },
        { name: 'Grave Digging', url: 'grave-preparation', keywords: 'grave digging' },
        { name: 'Lifting Machine', url: 'lifting-machine', keywords: 'lifting machine' }
      ]
    },
    ru: {
      services: [
        { name: 'Бальзамирование, грим, одевание', url: 'embalming-dressing', keywords: 'бальзамирование грим одевание' },
        { name: 'Перевозка', url: 'transportation', keywords: 'перевозка' },
        { name: 'Поминальный зал', url: 'mourning-hall', keywords: 'поминальный зал' },
        { name: 'Услуги катафалка', url: 'hearse', keywords: 'услуги катафалка' },
        { name: 'Маршрутка', url: 'microbus', keywords: 'маршрутка' },
        { name: 'Зал', url: 'hall', keywords: 'зал' },
        { name: 'Благоустройство кладбища', url: 'cemetery-decoration', keywords: 'благоустройство кладбища' },
        { name: 'Надгробные камни, роспись на камне', url: 'grave-stones', keywords: 'надгробные камни роспись на камне' },
        { name: 'Надписи металлическими буквами', url: 'metal-letters', keywords: 'надписи металлическими буквами' },
        { name: 'Копание могилы', url: 'grave-preparation', keywords: 'копание могилы' },
        { name: 'Подъемная машина', url: 'lifting-machine', keywords: 'подъемная машина' }
      ]
    }
  };

  // Get current services for related services section
  getCurrentServices() {
    return this.navigation[this.currentLanguage as keyof typeof this.navigation]?.services || this.navigation.ka.services;
  }

  getFuneralPlanningLink(): string[] {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return ['funeral-planning'];
    }
    // For other languages, add language prefix
    return [this.currentLanguage, 'funeral-planning'];
  }

  // Get all service keys for related services section
  getAllServiceKeys(): string[] {
    return this.getCurrentServices().map(service => service.url);
  }

  getFeatureDescription(index: number): string {
    const descriptions = [
      'services.cemetery_decoration_service.high_quality_materials_desc',
      'services.cemetery_decoration_service.individual_approach_desc',
      'services.cemetery_decoration_service.full_spectrum_desc',
      'services.cemetery_decoration_service.long_term_result_desc'
    ];
    return descriptions[index] || '';
  }
} 