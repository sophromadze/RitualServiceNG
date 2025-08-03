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
      longDescKey: 'services.hearse_service.long_description',
      image: '/images/katafalkebi.jpg',
      gallery: [
        '/images/katafalkebi.jpg',
        '/images/hearse1.jpg',
        '/images/hearse2.jpg'
      ],
      keywords: ['კატაფალკა', 'katafalka', 'hearse service'],
      relatedServices: ['embalming', 'transportation', 'mourning-hall'],
      features: [
        'services.hearse_service.feature_1',
        'services.hearse_service.feature_2',
        'services.hearse_service.feature_3',
        'services.hearse_service.feature_4'
      ],
      process: [
        'services.hearse_service.process_1',
        'services.hearse_service.process_2',
        'services.hearse_service.process_3'
      ]
    },

    'transportation': {
      id: 'transportation',
      titleKey: 'services.transportation_service.title',
      descKey: 'services.transportation_service.description',
      longDescKey: 'services.transportation_service.long_description',
      image: '/images/transfer.jpg',
      gallery: [
        '/images/transfer.jpg',
        '/images/transportation1.jpg',
        '/images/transportation2.jpg'
      ],
      keywords: ['გადასვენება', 'gadasveneba', 'transportation service'],
      relatedServices: ['hearse', 'embalming', 'grave-preparation'],
      features: [
        'services.transportation_service.feature_1',
        'services.transportation_service.feature_2',
        'services.transportation_service.feature_3',
        'services.transportation_service.feature_4'
      ],
      process: [
        'services.transportation_service.process_1',
        'services.transportation_service.process_2',
        'services.transportation_service.process_3'
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
      longDescKey: 'services.mourning_hall_service.long_description',
      image: '/images/hall.jpg',
      gallery: [
        '/images/hall.jpg',
        '/images/hall1.jpg',
        '/images/hall2.jpg'
      ],
      keywords: ['საპანაშვიდე დარბაზი', 'sapanashvide darbazi', 'mourning hall'],
      relatedServices: ['hearse', 'banquet-hall', 'embalming'],
      features: [
        'services.mourning_hall_service.feature_1',
        'services.mourning_hall_service.feature_2',
        'services.mourning_hall_service.feature_3',
        'services.mourning_hall_service.feature_4'
      ],
      process: [
        'services.mourning_hall_service.process_1',
        'services.mourning_hall_service.process_2',
        'services.mourning_hall_service.process_3'
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
        'services.grave_preparation_service.process_2',
        'services.grave_preparation_service.process_3'
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
      keywords: ['ლითონის ასოები', 'litonis asoebi', 'metal letters'],
      relatedServices: ['stone-engraving', 'colored-photo', 'grave-decoration'],
      features: [
        'services.metal_letters_service.feature_1',
        'services.metal_letters_service.feature_2',
        'services.metal_letters_service.feature_3',
        'services.metal_letters_service.feature_4'
      ],
      process: [
        'services.metal_letters_service.process_1',
        'services.metal_letters_service.process_2',
        'services.metal_letters_service.process_3'
      ]
    },

    'embalming-dressing': {
      id: 'embalming-dressing',
      titleKey: 'services.embalming_dressing_service.title',
      descKey: 'services.embalming_dressing_service.description',
      longDescKey: 'services.embalming_dressing_service.long_description',
      image: '/images/embalming.jpg',
      gallery: [
        '/images/embalming.jpg',
        '/images/suit.jpg',
        '/images/dressing1.jpg'
      ],
      keywords: ['ბალზამირება, გრიმი, ჩაცმა', 'balzamireba, grimi, chacma', 'embalming makeup dressing'],
      relatedServices: ['hearse', 'transportation', 'mourning-hall'],
      features: [
        'services.embalming_dressing_service.feature_1',
        'services.embalming_dressing_service.feature_2',
        'services.embalming_dressing_service.feature_3',
        'services.embalming_dressing_service.feature_4'
      ],
      process: [
        'services.embalming_dressing_service.process_1',
        'services.embalming_dressing_service.process_2',
        'services.embalming_dressing_service.process_3'
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
        'services.microbus_service.feature_1',
        'services.microbus_service.feature_2',
        'services.microbus_service.feature_3',
        'services.microbus_service.feature_4'
      ],
      process: [
        'services.microbus_service.process_1',
        'services.microbus_service.process_2',
        'services.microbus_service.process_3'
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
        '/images/hall1.jpg',
        '/images/hall2.jpg'
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
        'services.hall_service.process_2',
        'services.hall_service.process_3'
      ]
    },

    'cemetery-decoration': {
      id: 'cemetery-decoration',
      titleKey: 'services.cemetery_decoration_service.title',
      descKey: 'services.cemetery_decoration_service.description',
      longDescKey: 'services.cemetery_decoration_service.long_description',
      image: '/images/grave.jpg',
      gallery: [
        '/images/grave.jpg',
        '/images/cemetery1.jpg',
        '/images/cemetery2.jpg'
      ],
      keywords: ['სასაფლაოს მოპირკეთება', 'sasapleos mopirketeba', 'cemetery decoration'],
      relatedServices: ['grave-decoration', 'grave-stones', 'grave-preparation'],
      features: [
        'services.cemetery_decoration_service.feature_1',
        'services.cemetery_decoration_service.feature_2',
        'services.cemetery_decoration_service.feature_3',
        'services.cemetery_decoration_service.feature_4'
      ],
      process: [
        'services.cemetery_decoration_service.process_1',
        'services.cemetery_decoration_service.process_2',
        'services.cemetery_decoration_service.process_3'
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
        'services.lifting_machine_service.process_2',
        'services.lifting_machine_service.process_3'
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
        "telephone": "+995599069898"
      }
    };
  }

  // Template methods
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  getServiceUrl(relatedService: string): string {
    return `/${this.currentLanguage}/services/${relatedService}`;
  }

  navigateToService(relatedService: string): void {
    this.router.navigate([this.getServiceUrl(relatedService)]);
  }

  callPhone(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.location.href = 'tel:+995599069898';
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

  // Get all service keys for related services section
  getAllServiceKeys(): string[] {
    return Object.keys(this.servicesData);
  }
} 