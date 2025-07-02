import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translation {
  [key: string]: string | Translation;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('ka');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: { [lang: string]: Translation } = {
    ka: {
      // Header & Navigation
      'header.company_name': 'რიტუალ სერვისი',
      'nav.services': 'მომსახურება',
      'nav.products': 'პროდუქცია',
      'nav.about': 'ჩვენს შესახებ',
      'nav.contact': 'კონტაქტი',
      'nav.locations': 'ფილიალები',
      'header.call_24_7': 'დაგვიკავშირდით 24/7',
      'header.phone': '+(995) 599 06 98 98',

      // Home Page Keywords and Content
      'home.title': 'რიტუალ სერვისი - დამკრძალავი ბიურო',
      'home.subtitle': 'გთავაზობთ სარიტუალო მომსახურებას 24 საათის განმავლობაში',
      'home.funeral_home': 'დამკრძალავი ბიურო',
      'home.damkrdzalavi_biuro': 'damkrdzalavi biuro',
      'home.ritual_house': 'სარიტუალო სახლი',
      'home.saritualo_saxli': 'saritualo saxli',

      // Services with SEO Keywords
      'services.embalming': 'ბალზამირება',
      'services.embalming_desc': 'მიცვალებულის პროფესიონალური ბალზამირება და მომზადება. ხანგრძლივი შენახვა, ჰიგიენური მომზადება.',
      'services.hearse': 'კატაფალკა',
      'services.hearse_desc': 'კატაფალკის პროფესიონალური მომსახურება. თანამედროვე კატაფალკები ნებისმიერ მიმართულებით გადასვენებისთვის.',
      'services.transportation': 'გადასვენება',
      'services.transportation_desc': 'მიცვალებულის გადასვენება რაიონში და საზღვარგარეთ. ყველა საჭირო დოკუმენტის მომზადება.',
      'services.stone_engraving': 'ქვაზე ხატვა',
      'services.stone_engraving_desc': 'ქვაზე პროფესიონალური ხატვა, ფერადი სურათის დამზადება, ლითონის ასოებით წარწერა.',
      'services.grave_decoration': 'საფლავის მოპირკეთება',
      'services.grave_decoration_desc': 'საფლავის კომპლექსური მოპირკეთება, მემორიალური სამუშაოები, ლანდშაფტური დიზაინი.',
      'services.dressing': 'მიცვალებულის ჩაცმა',
      'services.dressing_desc': 'მიცვალებულის ღირსეული ჩაცმა და მოწესრიგება გამოცდილი სპეციალისტების მიერ.',

      // Products with Keywords
      'products.coffins': 'სასახლეები',
      'products.coffins_desc': 'ხარისხიანი სასახლეები: ქართული, უკრაინული, იტალიური სტილი. ფართო არჩევანი ყველა ბიუჯეტისთვის.',
      'products.shrouds': 'სუდარები',
      'products.shrouds_desc': 'ტრადიციული და თანამედროვე სუდარები. ნატურალური მასალები, ხელნაკეთი მუშაობა.',
      'products.refrigeration': 'მაცივრები',
      'products.refrigeration_desc': 'სასახლე-მაცივრები, ამერიკული და სტანდარტული მოდელები ხანგრძლივი შენახვისთვის.',

      // Common SEO Terms
      'seo.funeral_services': 'დაკრძალვის სერვისები',
      'seo.burial_services': 'დასაფლავების მომსახურება',
      'seo.memorial_ceremonies': 'სამგლოვიარო ცერემონიები',
      'seo.burial': 'დაკრძალვა',
      'seo.funeral_director': 'დამკრძალავი',
      'seo.cemetery': 'სასაფლაო',
      'seo.deceased': 'მიცვალებული',
      'seo.mourning_hall': 'საპანაშვიდე დარბაზი',
      'seo.banquet_hall': 'საბანკეტო დარბაზი',
      'seo.colored_photo': 'ფერადი სურათის დამზადება',
      'seo.metal_letters': 'ლითონის ასოებით წარწერა',
      'seo.regional_transportation': 'რაიონში გადასვენება',
      'seo.international_transportation': 'საზღვარგარეთ გადასვენება',

      // Contact & Location
      'contact.free_consultation': 'უფასო კონსულტაცია',
      'contact.agent_visit': 'აგენტის მოწვევა',
      'contact.24_7_service': '24/7 მომსახურება',
      'locations.tbilisi_branches': 'თბილისის ფილიალები',
      'locations.gldani': 'გლდანი - 4 გრ. ოშკელის ქუჩა',
      'locations.dighomi': 'დიღომი - 14 ნოდარ ბოხუას ქუჩა',
      'locations.jiqia': 'ჯიქია - 96 ალექსანდრე იოსელიანის ქუჩა',

      // About & Experience
      'about.20_years_experience': '20 წლიანი გამოცდილება',
      'about.professional_team': 'პროფესიონალური გუნდი',
      'about.individual_approach': 'ინდივიდუალური მიდგომა',
      'about.quality_service': 'ხარისხიანი მომსახურება',

      // Call to Actions
      'cta.call_now': 'დაგვიკავშირდით ახლავე',
      'cta.get_consultation': 'მიიღეთ კონსულტაცია',
      'cta.order_service': 'შეუკვეთეთ სერვისი',
      'cta.learn_more': 'გაიგეთ მეტი'
    },

    en: {
      // Header & Navigation
      'header.company_name': 'Ritual Service',
      'nav.services': 'Services',
      'nav.products': 'Products',
      'nav.about': 'About Us',
      'nav.contact': 'Contact',
      'nav.locations': 'Locations',
      'header.call_24_7': 'Call us 24/7',
      'header.phone': '+(995) 599 06 98 98',

      // Home Page
      'home.title': 'Ritual Service - Funeral Home',
      'home.subtitle': 'We offer ritual services 24 hours a day',
      'home.funeral_home': 'Funeral Home',
      'home.damkrdzalavi_biuro': 'Professional Funeral Services',
      'home.ritual_house': 'Funeral Services House',
      'home.saritualo_saxli': 'Memorial Service Center',

      // Services
      'services.embalming': 'Embalming',
      'services.embalming_desc': 'Professional embalming and preparation of the deceased. Long-term preservation, hygienic preparation.',
      'services.hearse': 'Hearse Service',
      'services.hearse_desc': 'Professional hearse services. Modern hearses for transportation in any direction.',
      'services.transportation': 'Transportation',
      'services.transportation_desc': 'Transportation of the deceased locally and internationally. Preparation of all necessary documents.',
      'services.stone_engraving': 'Stone Engraving',
      'services.stone_engraving_desc': 'Professional stone engraving, colored photo creation, metal letter inscriptions.',
      'services.grave_decoration': 'Grave Decoration',
      'services.grave_decoration_desc': 'Complete grave decoration, memorial work, landscape design.',
      'services.dressing': 'Dressing and Preparation',
      'services.dressing_desc': 'Dignified dressing and preparation of the deceased by experienced specialists.',

      // Products
      'products.coffins': 'Coffins',
      'products.coffins_desc': 'Quality coffins: Georgian, Ukrainian, Italian styles. Wide selection for every budget.',
      'products.shrouds': 'Shrouds',
      'products.shrouds_desc': 'Traditional and modern shrouds. Natural materials, handcrafted work.',
      'products.refrigeration': 'Refrigeration',
      'products.refrigeration_desc': 'Coffin refrigeration, American and standard models for long-term preservation.',

      // Common SEO Terms
      'seo.funeral_services': 'Funeral Services',
      'seo.burial_services': 'Burial Services',
      'seo.memorial_ceremonies': 'Memorial Ceremonies',
      'seo.burial': 'Burial',
      'seo.funeral_director': 'Funeral Director',
      'seo.cemetery': 'Cemetery',
      'seo.deceased': 'Deceased',
      'seo.mourning_hall': 'Mourning Hall',
      'seo.banquet_hall': 'Banquet Hall',
      'seo.colored_photo': 'Colored Photo Creation',
      'seo.metal_letters': 'Metal Letter Inscriptions',
      'seo.regional_transportation': 'Regional Transportation',
      'seo.international_transportation': 'International Transportation',

      // Contact & Location
      'contact.free_consultation': 'Free Consultation',
      'contact.agent_visit': 'Agent Visit',
      'contact.24_7_service': '24/7 Service',
      'locations.tbilisi_branches': 'Tbilisi Branches',
      'locations.gldani': 'Gldani - 4 Gr. Oshkeli Street',
      'locations.dighomi': 'Dighomi - 14 Nodar Bokhua Street',
      'locations.jiqia': 'Jiqia - 96 Alexandre Ioseliani Street',

      // About & Experience
      'about.20_years_experience': '20 Years of Experience',
      'about.professional_team': 'Professional Team',
      'about.individual_approach': 'Individual Approach',
      'about.quality_service': 'Quality Service',

      // Call to Actions
      'cta.call_now': 'Call Now',
      'cta.get_consultation': 'Get Consultation',
      'cta.order_service': 'Order Service',
      'cta.learn_more': 'Learn More'
    },

    ru: {
      // Header & Navigation
      'header.company_name': 'Ритуал Сервис',
      'nav.services': 'Услуги',
      'nav.products': 'Продукция',
      'nav.about': 'О нас',
      'nav.contact': 'Контакты',
      'nav.locations': 'Филиалы',
      'header.call_24_7': 'Звоните 24/7',
      'header.phone': '+(995) 599 06 98 98',

      // Home Page
      'home.title': 'Ритуал Сервис - Похоронный дом',
      'home.subtitle': 'Предлагаем ритуальные услуги 24 часа в сутки',
      'home.funeral_home': 'Похоронный дом',
      'home.damkrdzalavi_biuro': 'Профессиональные похоронные услуги',
      'home.ritual_house': 'Ритуальный дом',
      'home.saritualo_saxli': 'Центр ритуальных услуг',

      // Services
      'services.embalming': 'Бальзамирование',
      'services.embalming_desc': 'Профессиональное бальзамирование и подготовка усопшего. Длительное сохранение, гигиеническая подготовка.',
      'services.hearse': 'Услуги катафалка',
      'services.hearse_desc': 'Профессиональные услуги катафалка. Современные катафалки для перевозки в любом направлении.',
      'services.transportation': 'Перевозка',
      'services.transportation_desc': 'Перевозка усопшего по региону и за границу. Подготовка всех необходимых документов.',
      'services.stone_engraving': 'Роспись на камне',
      'services.stone_engraving_desc': 'Профессиональная роспись на камне, изготовление цветного фото, надписи металлическими буквами.',
      'services.grave_decoration': 'Благоустройство могил',
      'services.grave_decoration_desc': 'Комплексное благоустройство могил, мемориальные работы, ландшафтный дизайн.',
      'services.dressing': 'Одевание усопшего',
      'services.dressing_desc': 'Достойное одевание и подготовка усопшего опытными специалистами.',

      // Products
      'products.coffins': 'Гробы',
      'products.coffins_desc': 'Качественные гробы: грузинский, украинский, итальянский стили. Широкий выбор на любой бюджет.',
      'products.shrouds': 'Саваны',
      'products.shrouds_desc': 'Традиционные и современные саваны. Натуральные материалы, ручная работа.',
      'products.refrigeration': 'Холодильники',
      'products.refrigeration_desc': 'Гробы-холодильники, американские и стандартные модели для длительного хранения.',

      // Common SEO Terms
      'seo.funeral_services': 'Похоронные услуги',
      'seo.burial_services': 'Услуги погребения',
      'seo.memorial_ceremonies': 'Траурные церемонии',
      'seo.burial': 'Погребение',
      'seo.funeral_director': 'Похоронный директор',
      'seo.cemetery': 'Кладбище',
      'seo.deceased': 'Покойный',
      'seo.mourning_hall': 'Траурный зал',
      'seo.banquet_hall': 'Банкетный зал',
      'seo.colored_photo': 'Изготовление цветного фото',
      'seo.metal_letters': 'Надписи металлическими буквами',
      'seo.regional_transportation': 'Перевозка по региону',
      'seo.international_transportation': 'Международная перевозка',

      // Contact & Location
      'contact.free_consultation': 'Бесплатная консультация',
      'contact.agent_visit': 'Вызов агента',
      'contact.24_7_service': 'Обслуживание 24/7',
      'locations.tbilisi_branches': 'Филиалы в Тбилиси',
      'locations.gldani': 'Глдани - ул. Гр. Ошкели, 4',
      'locations.dighomi': 'Дигоми - ул. Нодара Бохуа, 14',
      'locations.jiqia': 'Джикия - ул. Александра Иоселиани, 96',

      // About & Experience
      'about.20_years_experience': '20 лет опыта',
      'about.professional_team': 'Профессиональная команда',
      'about.individual_approach': 'Индивидуальный подход',
      'about.quality_service': 'Качественное обслуживание',

      // Call to Actions
      'cta.call_now': 'Звоните сейчас',
      'cta.get_consultation': 'Получить консультацию',
      'cta.order_service': 'Заказать услугу',
      'cta.learn_more': 'Узнать больше'
    }
  };

  constructor() {
    // Set initial language based on URL or browser preference
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const urlPath = window.location.pathname;
    let language = 'ka'; // default

    if (urlPath.startsWith('/en')) {
      language = 'en';
    } else if (urlPath.startsWith('/ru')) {
      language = 'ru';
    } else if (urlPath.startsWith('/ka')) {
      language = 'ka';
    }

    this.setLanguage(language);
  }

  setLanguage(language: string): void {
    if (this.translations[language]) {
      this.currentLanguageSubject.next(language);
      localStorage.setItem('selectedLanguage', language);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  translate(key: string, params?: { [key: string]: string }): string {
    const language = this.getCurrentLanguage();
    const translation = this.getNestedTranslation(this.translations[language], key);
    
    if (!translation) {
      // Fallback to Georgian if translation not found
      const fallbackTranslation = this.getNestedTranslation(this.translations['ka'], key);
      if (!fallbackTranslation) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        return key;
      }
      return this.interpolateParams(fallbackTranslation, params);
    }
    
    return this.interpolateParams(translation, params);
  }

  private getNestedTranslation(obj: Translation, key: string): string {
    return key.split('.').reduce((o: any, k) => o && o[k], obj) as string;
  }

  private interpolateParams(text: string, params?: { [key: string]: string }): string {
    if (!params) return text;
    
    return Object.keys(params).reduce((result, key) => {
      return result.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
    }, text);
  }

  // Get all available languages
  getAvailableLanguages(): string[] {
    return Object.keys(this.translations);
  }

  // Get language-specific content for SEO
  getSEOContent(contentType: 'services' | 'products' | 'about' | 'contact', language?: string): any {
    const lang = language || this.getCurrentLanguage();
    
    const seoContent = {
      services: {
        ka: {
          title: 'მომსახურება - სრული სარიტუალო მომსახურება | რიტუალ სერვისი',
          description: 'სრული სარიტუალო მომსახურება: ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, საპანაშვიდე დარბაზი, მიცვალებულის ჩაცმა.',
          keywords: 'დაკრძალვის სერვისები, ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, damkrdzalavi biuro, მიცვალებულის ჩაცმა, საფლავის მოპირკეთება',
          h1: 'სარიტუალო მომსახურება - დამკრძალავი ბიურო',
          services: [
            { name: 'ბალზამირება', url: '/ka/services/balzamireba', desc: 'მიცვალებულის პროფესიონალური ბალზამირება' },
            { name: 'კატაფალკა', url: '/ka/services/katafalka', desc: 'კატაფალკის მომსახურება ყველა მიმართულებით' },
            { name: 'გადასვენება', url: '/ka/services/gadasveneba', desc: 'მიცვალებულის გადასვენება რაიონში და საზღვარგარეთ' },
            { name: 'ქვაზე ხატვა', url: '/ka/services/qvaze-xatva', desc: 'პროფესიონალური ქვაზე ხატვა და გრავიურა' }
          ]
        },
        en: {
          title: 'Services - Complete Funeral Services | Ritual Service',
          description: 'Complete funeral services: embalming, hearse, stone engraving, transportation, mourning hall, dressing and preparation.',
          keywords: 'funeral services, embalming, hearse, stone engraving, transportation, funeral home, dressing and preparation, grave decoration',
          h1: 'Professional Funeral Services',
          services: [
            { name: 'Embalming', url: '/en/services/embalming', desc: 'Professional embalming of the deceased' },
            { name: 'Hearse Service', url: '/en/services/hearse', desc: 'Hearse services in all directions' },
            { name: 'Transportation', url: '/en/services/transportation', desc: 'Transportation locally and internationally' },
            { name: 'Stone Engraving', url: '/en/services/stone-engraving', desc: 'Professional stone engraving and memorial work' }
          ]
        },
        ru: {
          title: 'Услуги - Полный комплекс ритуальных услуг | Ритуал Сервис',
          description: 'Полный комплекс ритуальных услуг: бальзамирование, катафалк, роспись на камне, перевозка, траурный зал, одевание усопшего.',
          keywords: 'ритуальные услуги, бальзамирование, катафалк, роспись на камне, перевозка покойного, похоронный дом, одевание усопшего, благоустройство могил',
          h1: 'Профессиональные ритуальные услуги',
          services: [
            { name: 'Бальзамирование', url: '/ru/services/embalming', desc: 'Профессиональное бальзамирование усопшего' },
            { name: 'Услуги катафалка', url: '/ru/services/hearse', desc: 'Услуги катафалка во всех направлениях' },
            { name: 'Перевозка', url: '/ru/services/transportation', desc: 'Перевозка по региону и за границу' },
            { name: 'Роспись на камне', url: '/ru/services/stone-engraving', desc: 'Профессиональная роспись на камне и мемориальные работы' }
          ]
        }
      },
      
      products: {
        ka: {
          title: 'პროდუქცია - სასახლეები, სუდარები, მაცივრები | რიტუალ სერვისი',
          description: 'ხარისხიანი სარიტუალო პროდუქცია: სასახლეები, სუდარები, მაცივრები. ფართო არჩევანი, მაღალი ხარისხი.',
          keywords: 'სასახლეები, სუდარები, მაცივრები, sasaxleebi, sudarebi, კუბო, სარიტუალო პროდუქცია',
          h1: 'სარიტუალო პროდუქცია',
          products: [
            { name: 'სასახლეები', url: '/ka/products/sasaxleebi', desc: 'ხარისხიანი სასახლეები ყველა სტილში' },
            { name: 'სუდარები', url: '/ka/products/sudarebi', desc: 'ტრადიციული და თანამედროვე სუდარები' },
            { name: 'მაცივრები', url: '/ka/products/macivrеbi', desc: 'სასახლე-მაცივრები ხანგრძლივი შენახვისთვის' }
          ]
        },
        en: {
          title: 'Products - Coffins, Shrouds, Refrigeration | Ritual Service',
          description: 'Quality funeral products: coffins, shrouds, refrigeration. Wide selection, high quality.',
          keywords: 'coffins, shrouds, refrigeration, funeral products, caskets, burial products',
          h1: 'Funeral Products',
          products: [
            { name: 'Coffins', url: '/en/products/coffins', desc: 'Quality coffins in all styles' },
            { name: 'Shrouds', url: '/en/products/shrouds', desc: 'Traditional and modern shrouds' },
            { name: 'Refrigeration', url: '/en/products/refrigeration', desc: 'Coffin refrigeration for long-term preservation' }
          ]
        },
        ru: {
          title: 'Продукция - Гробы, Саваны, Холодильники | Ритуал Сервис',
          description: 'Качественная ритуальная продукция: гробы, саваны, холодильники. Широкий выбор, высокое качество.',
          keywords: 'гробы, саваны, холодильники, ритуальная продукция, гробы-холодильники, похоронная продукция',
          h1: 'Ритуальная продукция',
          products: [
            { name: 'Гробы', url: '/ru/products/coffins', desc: 'Качественные гробы во всех стилях' },
            { name: 'Саваны', url: '/ru/products/shrouds', desc: 'Традиционные и современные саваны' },
            { name: 'Холодильники', url: '/ru/products/refrigeration', desc: 'Гробы-холодильники для длительного хранения' }
          ]
        }
      },

      about: {
        ka: {
          title: 'ჩვენს შესახებ - 20 წლიანი გამოცდილება | რიტუალ სერვისი',
          description: '20 წლიანი გამოცდილება სარიტუალო მომსახურებაში. პროფესიონალური დამკრძალავი ბიურო.',
          keywords: 'რიტუალ სერვისი ისტორია, გამოცდილება, damkrdzalavi biuro',
          h1: 'ჩვენს შესახებ - რიტუალ სერვისი'
        },
        en: {
          title: 'About Us - 20 Years Experience | Ritual Service',
          description: '20 years of experience in funeral services. Professional funeral home.',
          keywords: 'Ritual Service history, experience, funeral home',
          h1: 'About Ritual Service'
        },
        ru: {
          title: 'О нас - 20 лет опыта | Ритуал Сервис',
          description: '20 лет опыта в ритуальных услугах. Профессиональный похоронный дом.',
          keywords: 'история Ритуал Сервис, опыт, похоронный дом',
          h1: 'О Ритуал Сервис'
        }
      },
      
      contact: {
        ka: {
          title: 'კონტაქტი - 24/7 მომსახურება | რიტუალ სერვისი',
          description: 'დაგვიკავშირდით 24/7. პროფესიონალური კონსულტაცია, სწრაფი რეაგირება.',
          keywords: 'კონტაქტი, 24/7 მომსახურება, damkrdzalavi biuro',
          h1: 'კონტაქტი - რიტუალ სერვისი'
        },
        en: {
          title: 'Contact - 24/7 Service | Ritual Service',
          description: 'Contact us 24/7. Professional consultation, quick response.',
          keywords: 'contact, 24/7 service, funeral home',
          h1: 'Contact Ritual Service'
        },
        ru: {
          title: 'Контакт - 24/7 обслуживание | Ритуал Сервис',
          description: 'Свяжитесь с нами 24/7. Профессиональная консультация, быстрый ответ.',
          keywords: 'контакт, 24/7 обслуживание, похоронный дом',
          h1: 'Контакт Ритуал Сервис'
        }
      },
      
    };

    return (seoContent[contentType] as any)[lang] || seoContent[contentType]['ka'];
  }

  // Get formatted keywords for different pages
  getKeywordsByPage(page: string, language?: string): string[] {
    const lang = language || this.getCurrentLanguage();
    
    const pageKeywords = {
      home: {
        ka: [
          'დამკრძალავი ბიურო', 'სარიტუალო სახლი', 'ბალზამირება', 'კატაფალკა', 
          'ქვაზე ხატვა', 'გადასვენება', 'damkrdzalavi biuro', 'მიცვალებულის ჩაცმა',
          'საფლავის მოპირკეთება', 'ფერადი სურათის დამზადება', 'ლითონის ასოებით წარწერა',
          'რიტუალ სერვისი', 'დაკრძალვის სერვისები', 'სამგლოვიარო ცერემონიები'
        ],
        en: [
          'funeral home', 'funeral services', 'embalming', 'hearse', 'stone engraving', 
          'transportation', 'burial services', 'memorial services', 'grave decoration',
          'colored photo creation', 'metal letter inscriptions', 'ritual service'
        ],
        ru: [
          'похоронный дом', 'ритуальные услуги', 'бальзамирование', 'катафалк', 
          'роспись на камне', 'перевозка покойного', 'благоустройство могил',
          'изготовление цветного фото', 'надписи металлическими буквами', 'ритуал сервис'
        ]
      },
      services: {
        ka: [
          'ბალზამირება', 'balzamireba', 'კატაფალკა', 'katafalka', 'ქვაზე ხატვა', 
          'qvaze xatva', 'გადასვენება', 'gadasveneba', 'მიცვალებულის ჩაცმა',
          'მოპირკეთება', 'mopirketeba', 'დამკრძალავი ბიურო სერვისები'
        ],
        en: [
          'embalming services', 'hearse services', 'stone engraving', 'transportation services',
          'dressing and preparation', 'grave decoration', 'funeral home services'
        ],
        ru: [
          'услуги бальзамирования', 'услуги катафалка', 'роспись на камне', 
          'услуги перевозки', 'одевание усопшего', 'благоустройство могил', 'услуги похоронного дома'
        ]
      },
      products: {
        ka: [
          'სასახლეები', 'sasaxleebi', 'სუდარები', 'sudarebi', 'მაცივრები', 'macivrеbi',
          'კუბო', 'სუდარა', 'sudara', 'სასახლე მაცივარი'
        ],
        en: [
          'coffins', 'caskets', 'shrouds', 'refrigeration', 'coffin refrigeration', 'burial products'
        ],
        ru: [
          'гробы', 'саваны', 'холодильники', 'гробы-холодильники', 'ритуальная продукция'
        ]
      }
    };

    return pageKeywords[page as keyof typeof pageKeywords]?.[lang as keyof typeof pageKeywords['home']] || 
       pageKeywords[page as keyof typeof pageKeywords]?.['ka'] || [];
  }
}