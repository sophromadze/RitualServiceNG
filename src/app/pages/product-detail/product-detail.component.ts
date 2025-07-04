import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

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
  imports: [CommonModule, RouterModule],
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
        '/images/sasaxleebi1.jpg',
        '/images/sasaxleebi2.jpg',
        '/images/coffin-luxury.jpg'
      ],
      keywords: ['სასახლეები', 'sasaxleebi', 'ხის სასახლეები', 'coffins'],
      relatedProducts: ['shrouds', 'refrigeration', 'hearse'],
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
        '/images/sudarebi1.jpg',
        '/images/sudarebi2.jpg',
        '/images/shroud-cotton.jpg'
      ],
      keywords: ['სუდარები', 'sudarebi', 'ბამბის სუდარები', 'shrouds'],
      relatedProducts: ['coffins', 'refrigeration', 'hearse'],
      features: [
        'products.shrouds_feature_1',
        'products.shrouds_feature_2',
        'products.shrouds_feature_3',
        'products.shrouds_feature_4'
      ],
      types: [
        'products.shrouds.cotton',
        'products.shrouds.silk',
        'products.shrouds.artificial',
        'products.shrouds.special'
      ]
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
        '/images/refrigeration-stationary.jpg'
      ],
      keywords: ['მაცივრები', 'macivrеbi', 'სასახლე-მაცივრები', 'refrigeration'],
      relatedProducts: ['coffins', 'shrouds', 'hearse'],
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

    'hearse': {
      id: 'hearse',
      titleKey: 'products.hearse',
      descKey: 'products.hearse_desc',
      longDescKey: 'products.hearse_long',
      image: '/images/katafalkebi2.jpg',
      gallery: [
        '/images/katafalkebi2.jpg',
        '/images/katafalkebi3.jpg',
        '/images/katafalki1.jpg',
        '/images/katafalki2.jpg',
        '/images/katafalki3.jpg'
      ],
      keywords: ['კატაფალკი', 'katafalki', 'თანამედროვე კატაფალკები', 'hearse', 'გადასვენება', 'gadasveneba'],
      relatedProducts: ['coffins', 'shrouds', 'refrigeration'],
      features: [
        'products.hearse_feature_1',
        'products.hearse_feature_2',
        'products.hearse_feature_3',
        'products.hearse_feature_4',
        'products.hearse_feature_5',
        'products.hearse_feature_6'
      ],
      types: [
        'products.hearse.modern',
        'products.hearse.luxury',
        'products.hearse.standard',
        'products.hearse.special'
      ],
      process: [
        'products.hearse_process_1',
        'products.hearse_process_2',
        'products.hearse_process_3',
        'products.hearse_process_4'
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
      'products.refrigeration': 'მაცივრები',
      'products.refrigeration_desc': 'სასახლე-მაცივრები და სტაციონარული მაცივრები',
      'products.refrigeration_long': 'მაცივრები - ჩვენი სასახლე-მაცივრები კომბინირებული ფუნქციით. სტაციონარული მაცივრები დიდი ტევადობით და მობილური მაცივრები ტრანსპორტირებისთვის.',
      'products.refrigeration_feature_1': 'სასახლე-მაცივრები კომბინირებული ფუნქციით',
      'products.refrigeration_feature_2': 'სტაციონარული მაცივრები დიდი ტევადობით',
      'products.refrigeration_feature_3': 'მობილური მაცივრები ტრანსპორტირებისთვის',
      'products.refrigeration_feature_4': 'სპეციალური მაცივრები გახანგრძლივებული შენახვისთვის',

      // Hearse
      'products.hearse': 'კატაფალკი',
      'products.hearse_desc': 'თანამედროვე კატაფალკები 24/7 მომსახურებით',
      'products.hearse_long': 'კატაფალკი - ჩვენი თანამედროვე კატაფალკების პარკი მზადაა ნებისმიერ დროს. თანამედროვე კატაფალკები უკანასკნელი მოდელები და ლუქს კლასის კატაფალკები უმაღლესი კომფორტით. გადასვენება ნებისმიერ მიმართულებით.',
      'products.hearse_feature_1': 'თანამედროვე კატაფალკები უკანასკნელი მოდელები',
      'products.hearse_feature_2': 'ლუქს კლასის კატაფალკები უმაღლესი კომფორტით',
      'products.hearse_feature_3': 'სტანდარტული კატაფალკები სანდო ხარისხით',
      'products.hearse_feature_4': 'სპეციალური კატაფალკები ინდივიდუალური მოთხოვნებისთვის',
      'products.hearse_feature_5': '24/7 ხელმისაწვდომობა - ნებისმიერ დროს',
      'products.hearse_feature_6': 'გადასვენება ნებისმიერ მიმართულებით',
      'products.hearse_process_1': 'კონტაქტი და შეთანხმება - ჩვენ ვუკავშირდებით 24/7',
      'products.hearse_process_2': 'კატაფალკის მომზადება - თანამედროვე აღჭურვილობით',
      'products.hearse_process_3': 'უსაფრთხო ტრანსპორტირება - გამოცდილი მძღოლებით',
      'products.hearse_process_4': 'სრული მომსახურება - დანარჩენი ყველაფერი ჩვენზეა'
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

      // Hearse
      'products.hearse': 'Hearse',
      'products.hearse_desc': 'Modern hearses with 24/7 service',
      'products.hearse_long': 'Hearse - our modern hearse fleet is ready at any time. Modern hearses latest models and luxury class hearses with highest comfort. Transportation in any direction.',
      'products.hearse_feature_1': 'Modern hearses latest models',
      'products.hearse_feature_2': 'Luxury class hearses with highest comfort',
      'products.hearse_feature_3': 'Standard hearses with reliable quality',
      'products.hearse_feature_4': 'Special hearses for individual requirements',
      'products.hearse_process_1': 'Contact and agreement - we are available 24/7',
      'products.hearse_process_2': 'Hearse preparation - with modern equipment',
      'products.hearse_process_3': 'Safe transportation - with experienced drivers',
      'products.hearse_process_4': 'Complete service - everything else is on us'
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

      // Hearse
      'products.hearse': 'Катафалк',
      'products.hearse_desc': 'Современные катафалки с обслуживанием 24/7',
      'products.hearse_long': 'Катафалк - наш современный парк катафалков готов в любое время. Современные катафалки последние модели и катафалки люкс класса с высшим комфортом. Перевозка в любом направлении.',
      'products.hearse_feature_1': 'Современные катафалки последние модели',
      'products.hearse_feature_2': 'Катафалки люкс класса с высшим комфортом',
      'products.hearse_feature_3': 'Стандартные катафалки с надежным качеством',
      'products.hearse_feature_4': 'Специальные катафалки для индивидуальных требований',
      'products.hearse_process_1': 'Контакт и соглашение - мы доступны 24/7',
      'products.hearse_process_2': 'Подготовка катафалка - с современным оборудованием',
      'products.hearse_process_3': 'Безопасная перевозка - с опытными водителями',
      'products.hearse_process_4': 'Полное обслуживание - все остальное на нас'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService
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
        "priceCurrency": "GEL"
      }
    };
  }

  translate(key: string): string {
    const translations = this.productTranslations[this.currentLanguage as keyof typeof this.productTranslations];
    return (translations as any)[key] || this.languageService.translate(key);
  }

  getProductUrl(relatedProduct: string): string {
    return `/${this.currentLanguage}/products/${relatedProduct}`;
  }

  navigateToProduct(relatedProduct: string): void {
    this.router.navigateByUrl(this.getProductUrl(relatedProduct));
  }

  callPhone(): void {
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