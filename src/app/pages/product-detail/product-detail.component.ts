import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { isPlatformBrowser } from '@angular/common';

interface ProductContent {
  id: string;
  titleKey: string;
  descKey: string;
  longDescKey: string;
  image: string;
  gallery: string[];
  keywords: string[];
  relatedProducts: string[];
  features: string[];
  types: string[];
  process?: string[];
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CtaComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  currentLanguage: string = 'ka';
  productType: string = '';
  productContent?: ProductContent;
  private subscriptions: Subscription = new Subscription();

  // Product content with heavy SEO keyword focus
  private productsData: { [key: string]: ProductContent } = {
    'coffins': {
      id: 'coffins',
      titleKey: 'products.coffins',
      descKey: 'products.coffins_desc',
      longDescKey: 'products.coffins_long',
      image: '/images/sasaxleebi2.jpg',
      gallery: [
        '/images/sasaxleebi2.jpg',
        '/images/darbazebi1.jpg',
        '/images/darbazebi2.jpg'
      ],
      keywords: ['სასახლეები', 'sasaxleebi', 'ხის სასახლეები', 'coffins'],
      relatedProducts: ['shrouds', 'refrigeration', 'cemetery_accessories'],
      features: [
        'products.coffins_feature_1',
        'products.coffins_feature_2',
        'products.coffins_feature_3',
        'products.coffins_feature_4'
      ],
      types: [
        'products.coffins.wooden',
        'products.coffins.luxury',
        'products.coffins.economy',
        'products.coffins.standard'
      ]
    },
    
    'shrouds': {
      id: 'shrouds',
      titleKey: 'products.shrouds',
      descKey: 'products.shrouds_desc',
      longDescKey: 'products.shrouds_long',
      image: '/images/sudarebi2.jpg',
      gallery: [
        '/images/sudarebi2.jpg',
        '/images/shroud1.jpg',
        '/images/shroud2.jpg',
        '/images/shroud3.jpg'
      ],
      keywords: ['სუდარები', 'sudarebi', 'ბამბის სუდარები', 'shrouds'],
      relatedProducts: ['coffins', 'refrigeration', 'cemetery_accessories'],
      features: [],
      types: []
    },

    'refrigeration': {
      id: 'refrigeration',
      titleKey: 'products.refrigeration',
      descKey: 'products.refrigeration_desc',
      longDescKey: 'products.refrigeration_long',
      image: '/images/fridge2.jpeg',
      gallery: [
        '/images/fridge1.jpeg',
        '/images/fridge2.jpeg',
        '/images/macivrebi.jpg',
        '/images/macivrebi2.jpg'
      ],
              keywords: ['სასახლე მაცივრები', 'sasaxle macivrеbi', 'სასახლე-მაცივრები', 'refrigeration'],
      relatedProducts: ['coffins', 'shrouds', 'cemetery_accessories'],
      features: [
        'products.refrigeration_feature_1',
        'products.refrigeration_feature_2',
        'products.refrigeration_feature_3',
        'products.refrigeration_feature_4'
      ],
      types: [
        'products.refrigeration.coffin',
        'products.refrigeration.stationary',
        'products.refrigeration.mobile',
        'products.refrigeration.special'
      ]
    },

    'cemetery_accessories': {
      id: 'cemetery_accessories',
      titleKey: 'products.cemetery_accessories',
      descKey: 'products.cemetery_accessories_desc',
      longDescKey: 'products.cemetery_accessories_long',
      image: '/images/cemetery.jpg',
      gallery: [
        '/images/cemetery.jpg',
        '/images/grave.jpg',
        '/images/tomb.jpg',
        '/images/stonepainting.jpg'
      ],
      keywords: ['სასაფლაოს აქსესუარები', 'sasapleos akseesuarebi', 'ჯვრები', 'jvrebi', 'საყვავილე კონსტრუქციები', 'saqvaile konstrukciebi'],
      relatedProducts: ['coffins', 'shrouds', 'refrigeration'],
      features: [
        'products.cemetery_accessories_feature_1',
        'products.cemetery_accessories_feature_2',
        'products.cemetery_accessories_feature_3',
        'products.cemetery_accessories_feature_4',
        'products.cemetery_accessories_feature_5',
        'products.cemetery_accessories_feature_6'
      ],
      types: [
        'products.cemetery_accessories.crosses',
        'products.cemetery_accessories.flower_structures',
        'products.cemetery_accessories.candles',
        'products.cemetery_accessories.marble_accessories'
      ],
      process: [
        'products.cemetery_accessories_process_1',
        'products.cemetery_accessories_process_2',
        'products.cemetery_accessories_process_3',
        'products.cemetery_accessories_process_4'
      ]
    }
  };

  // Translation content for product details with all SEO keywords
  private productTranslations = {
    ka: {
      // Coffins
      'products.coffins': 'სასახლეები',
      'products.coffins_desc': 'ხარისხიანი სასახლეები ბუნებრივი მასალებით',
      'products.coffins_long': 'ჩვენი სასახლეები წარმოადგენს ხარისხიან ხის სასახლეებს ბუნებრივი მასალებით. ლუქს კლასის სასახლეები, ეკონომ კლასის სასახლეები და სტანდარტული სასახლეები - ყველა ფასის კატეგორიაში.',
      'products.coffins_feature_1': 'ხის სასახლეები ბუნებრივი მასალებით',
      'products.coffins_feature_2': 'ლუქს კლასის სასახლეები უმაღლესი ხარისხით',
      'products.coffins_feature_3': 'ეკონომ კლასის სასახლეები ხელმისაწვდომი ფასით',
      'products.coffins_feature_4': 'სტანდარტული სასახლეები სანდო ხარისხით',

      // Shrouds
      'products.shrouds': 'სუდარები',
      'products.shrouds_desc': 'ბუნებრივი მასალების სუდარები',
      'products.shrouds_long': 'სუდარები - ჩვენ გთავაზობთ ბამბის სუდარებს ბუნებრივი მასალებით, სილკის სუდარებს ხარისხიანი ქსოვილით და ხელოვნური ქსოვილის სუდარებს გამძლე მასალებით.',
      'products.shrouds_feature_1': 'ბამბის სუდარები ბუნებრივი მასალებით',
      'products.shrouds_feature_2': 'სილკის სუდარები ხარისხიანი ქსოვილით',
      'products.shrouds_feature_3': 'ხელოვნური ქსოვილის სუდარები გამძლე მასალებით',
      'products.shrouds_feature_4': 'სპეციალური დიზაინის სუდარები ინდივიდუალური მიდგომით',

      // Refrigeration
      'products.refrigeration': 'სასახლე მაცივრები',
      'products.refrigeration_desc': 'სასახლე-მაცივრები და სტაციონარული მაცივრები',
      'products.refrigeration_long': 'სასახლე მაცივრები - ჩვენი სასახლე-მაცივრები კომბინირებული ფუნქციით. სტაციონარული მაცივრები დიდი ტევადობით და მობილური მაცივრები ტრანსპორტირებისთვის.',
      'products.refrigeration_feature_1': 'სასახლე-მაცივრები კომბინირებული ფუნქციით',
      'products.refrigeration_feature_2': 'სტაციონარული მაცივრები დიდი ტევადობით',
      'products.refrigeration_feature_3': 'მობილური მაცივრები ტრანსპორტირებისთვის',
      'products.refrigeration_feature_4': 'სპეციალური მაცივრები გახანგრძლივებული შენახვისთვის',

      // Cemetery Accessories
      'products.cemetery_accessories': 'სასაფლაოს აქსესუარები',
      'products.cemetery_accessories_desc': 'ხარისხიანი სასაფლაოს აქსესუარები',
      'products.cemetery_accessories_long': 'სასაფლაოს აქსესუარები - ჩვენ გთავაზობთ ჯვრებს, საყვავილე კონსტრუქციებს, სასანთლეებს და მარმარილოს აქსესუარებს. ყველა პროდუქტი მზადაა 24/7.',
      'products.cemetery_accessories_feature_1': 'ჯვრები (მარმარილოსი და ხის) - ტრადიციული და თანამედროვე ფორმებით',
      'products.cemetery_accessories_feature_2': 'საყვავილე კონსტრუქციები - ლითონის, ქვის ან კერამიკის',
      'products.cemetery_accessories_feature_3': 'სასანთლეები - მარტივი და ორნამენტული ვარიანტები',
      'products.cemetery_accessories_feature_4': 'მარმარილოს აქსესუარები - ქვის ლარნაკები და ხსოვნის დაფები',
      'products.cemetery_accessories_feature_5': 'ხარისხიანი, გამძლე მასალები - ამინდისა და დროის მიმართ მდგრადობა',
      'products.cemetery_accessories_feature_6': 'ადგილზე მიტანა და მონტაჟი თბილისსა და რეგიონებში',
      'products.cemetery_accessories_process_1': 'კონტაქტი და შეთანხმება - ჩვენ ვუკავშირდებით 24/7',
      'products.cemetery_accessories_process_2': 'პროდუქტის შერჩევა - კონსულტაცია სპეციალისტებისგან',
      'products.cemetery_accessories_process_3': 'ადგილზე მიტანა - უსაფრთხო ტრანსპორტირებით',
      'products.cemetery_accessories_process_4': 'მონტაჟი და მომსახურება - სრული პასუხისმგებლობა'
    },
    en: {
      // Coffins
      'products.coffins': 'Coffins',
      'products.coffins_desc': 'Quality coffins with natural materials',
      'products.coffins_long': 'Our coffins represent quality wooden coffins with natural materials. Luxury class coffins, economy class coffins and standard coffins - in all price categories.',
      'products.coffins_feature_1': 'Wooden coffins with natural materials',
      'products.coffins_feature_2': 'Luxury class coffins with highest quality',
      'products.coffins_feature_3': 'Economy class coffins at affordable prices',
      'products.coffins_feature_4': 'Standard coffins with reliable quality',

      // Shrouds
      'products.shrouds': 'Shrouds',
      'products.shrouds_desc': 'Natural material shrouds',
      'products.shrouds_long': 'Shrouds - we offer cotton shrouds with natural materials, silk shrouds with quality fabric and artificial fabric shrouds with durable materials.',
      'products.shrouds_feature_1': 'Cotton shrouds with natural materials',
      'products.shrouds_feature_2': 'Silk shrouds with quality fabric',
      'products.shrouds_feature_3': 'Artificial fabric shrouds with durable materials',
      'products.shrouds_feature_4': 'Special design shrouds with individual approach',

      // Refrigeration
      'products.refrigeration': 'Refrigeration',
      'products.refrigeration_desc': 'Coffin-refrigerators and stationary refrigerators',
      'products.refrigeration_long': 'Refrigerators - our coffin-refrigerators with combined function. Stationary refrigerators with large capacity and mobile refrigerators for transportation.',
      'products.refrigeration_feature_1': 'Coffin-refrigerators with combined function',
      'products.refrigeration_feature_2': 'Stationary refrigerators with large capacity',
      'products.refrigeration_feature_3': 'Mobile refrigerators for transportation',
      'products.refrigeration_feature_4': 'Special refrigerators for extended storage',

      // Cemetery Accessories
      'products.cemetery_accessories': 'Cemetery Accessories',
      'products.cemetery_accessories_desc': 'Quality cemetery accessories',
      'products.cemetery_accessories_long': 'Cemetery Accessories - we offer crosses, flower structures, candles and marble accessories. All products are ready 24/7.',
      'products.cemetery_accessories_feature_1': 'Crosses (marble and wood) - traditional and modern forms',
      'products.cemetery_accessories_feature_2': 'Flower structures - metal, stone or ceramic',
      'products.cemetery_accessories_feature_3': 'Candles - simple and ornamental variants',
      'products.cemetery_accessories_feature_4': 'Marble accessories - stone lanterns and memorial boards',
      'products.cemetery_accessories_feature_5': 'Quality, durable materials - resistance to weather and time',
      'products.cemetery_accessories_feature_6': 'On-site delivery and installation in Tbilisi and regions',
      'products.cemetery_accessories_process_1': 'Contact and agreement - we are available 24/7',
      'products.cemetery_accessories_process_2': 'Product selection - consultation from specialists',
      'products.cemetery_accessories_process_3': 'On-site delivery - with safe transportation',
      'products.cemetery_accessories_process_4': 'Installation and service - full responsibility'
    },
    ru: {
      // Coffins
      'products.coffins': 'Гробы',
      'products.coffins_desc': 'Качественные гробы из натуральных материалов',
      'products.coffins_long': 'Наши гробы представляют собой качественные деревянные гробы из натуральных материалов. Гробы люкс класса, гробы эконом класса и стандартные гробы - во всех ценовых категориях.',
      'products.coffins_feature_1': 'Деревянные гробы из натуральных материалов',
      'products.coffins_feature_2': 'Гробы люкс класса с высшим качеством',
      'products.coffins_feature_3': 'Гробы эконом класса по доступным ценам',
      'products.coffins_feature_4': 'Стандартные гробы с надежным качеством',

      // Shrouds
      'products.shrouds': 'Саваны',
      'products.shrouds_desc': 'Саваны из натуральных материалов',
      'products.shrouds_long': 'Саваны - мы предлагаем хлопковые саваны из натуральных материалов, шелковые саваны из качественной ткани и саваны из искусственной ткани с прочными материалами.',
      'products.shrouds_feature_1': 'Хлопковые саваны из натуральных материалов',
      'products.shrouds_feature_2': 'Шелковые саваны из качественной ткани',
      'products.shrouds_feature_3': 'Саваны из искусственной ткани с прочными материалами',
      'products.shrouds_feature_4': 'Саваны специального дизайна с индивидуальным подходом',

      // Refrigeration
      'products.refrigeration': 'Холодильники',
      'products.refrigeration_desc': 'Гробы-холодильники и стационарные холодильники',
      'products.refrigeration_long': 'Холодильники - наши гробы-холодильники с комбинированной функцией. Стационарные холодильники с большой вместимостью и мобильные холодильники для транспортировки.',
      'products.refrigeration_feature_1': 'Гробы-холодильники с комбинированной функцией',
      'products.refrigeration_feature_2': 'Стационарные холодильники с большой вместимостью',
      'products.refrigeration_feature_3': 'Мобильные холодильники для транспортировки',
      'products.refrigeration_feature_4': 'Специальные холодильники для длительного хранения',

      // Cemetery Accessories
      'products.cemetery_accessories': 'Кладбищенские аксессуары',
      'products.cemetery_accessories_desc': 'Качественные кладбищенские аксессуары',
      'products.cemetery_accessories_long': 'Кладбищенские аксессуары - мы предлагаем кресты, цветочные конструкции, свечи и мраморные аксессуары. Все продукты готовы 24/7.',
      'products.cemetery_accessories_feature_1': 'Кресты (мраморные и деревянные) - традиционные и современные формы',
      'products.cemetery_accessories_feature_2': 'Цветочные конструкции - металлические, каменные или керамические',
      'products.cemetery_accessories_feature_3': 'Свечи - простые и декоративные варианты',
      'products.cemetery_accessories_feature_4': 'Мраморные аксессуары - каменные фонари и мемориальные доски',
      'products.cemetery_accessories_feature_5': 'Качественные, прочные материалы - устойчивость к погоде и времени',
      'products.cemetery_accessories_feature_6': 'Доставка и установка на месте в Тбилиси и регионах',
      'products.cemetery_accessories_process_1': 'Контакт и соглашение - мы доступны 24/7',
      'products.cemetery_accessories_process_2': 'Выбор продукта - консультация специалистов',
      'products.cemetery_accessories_process_3': 'Доставка на месте - с безопасной транспортировкой',
      'products.cemetery_accessories_process_4': 'Установка и обслуживание - полная ответственность'
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
    this.currentLanguage = this.languageService.getCurrentLanguage();
    
    this.subscriptions.add(
      this.route.data.subscribe(data => {
        this.productType = data['product'] || '';
        this.loadProductContent();
        this.updateSEO();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadProductContent(): void {
    this.productContent = this.productsData[this.productType];
  }

  private updateSEO(): void {
    if (this.productContent) {
      const seoData = {
        title: this.getSEOTitle(),
        description: this.getSEODescription(),
        keywords: this.getSEOKeywords(),
        structuredData: this.generateProductStructuredData()
      };
      
      this.seoService.updateSEO(seoData, this.currentLanguage);
    }
  }

  private getSEOTitle(): string {
    if (!this.productContent) return '';
    
    const productName = this.translate(this.productContent.titleKey);
    return `${productName} - ${this.translate('header.company_name')}`;
  }

  private getSEODescription(): string {
    if (!this.productContent) return '';
    
    return this.translate(this.productContent.descKey);
  }

  private getSEOKeywords(): string {
    if (!this.productContent) return '';
    
    return this.productContent.keywords.join(', ');
  }

  private generateProductStructuredData(): any {
    if (!this.productContent) return {};

    // Get current date for priceValidUntil (set to 1 year from now)
    const currentDate = new Date();
    const validUntilDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
    const priceValidUntil = validUntilDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": this.translate(this.productContent.titleKey),
      "description": this.translate(this.productContent.descKey),
      "image": this.productContent.image,
      "brand": {
        "@type": "Brand",
        "name": this.translate('header.company_name')
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "GEL",
        "price": "500",
        "priceValidUntil": priceValidUntil
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Customer"
          },
          "reviewBody": this.translate(this.productContent.descKey)
        }
      ]
    };
  }

  translate(key: string): string {
    const translations = this.productTranslations[this.currentLanguage as keyof typeof this.productTranslations];
    return (translations as any)[key] || this.languageService.translate(key);
  }

  getProductUrl(relatedProduct: string): string {
    // Map product IDs to URL paths (handle underscores to hyphens conversion)
    const urlMapping: { [key: string]: string } = {
      'coffins': 'coffins',
      'shrouds': 'shrouds', 
      'refrigeration': 'refrigeration',
      'cemetery_accessories': 'cemetery-accessories'
    };
    
    const urlPath = urlMapping[relatedProduct] || relatedProduct;
    
    if (this.currentLanguage === 'ka') {
      return `/products/${urlPath}`;
    }
    return `/${this.currentLanguage}/products/${urlPath}`;
  }

  navigateToProduct(relatedProduct: string): void {
    this.router.navigateByUrl(this.getProductUrl(relatedProduct));
  }

  callPhone(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.location.href = 'tel:+995599069898';
  }

  getGalleryImageAlt(index: number): string {
    if (!this.productContent) return '';
    return `${this.translate(this.productContent.titleKey)} - ${index + 1}`;
  }

  openImageModal(image: string): void {
    // Implementation for image modal
    console.log('Opening image modal:', image);
  }
}