import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

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
      'nav.home': 'მთავარი',
      'header.company_name': 'რიტუალ სერვისი',
      'nav.services': 'სერვისები',
      'nav.products': 'პროდუქცია',
      'nav.about': 'ჩვენს შესახებ',
      'nav.contact': 'კონტაქტი',
      'nav.locations': 'ფილიალები',
      'header.call_24_7': 'დაგვიკავშირდით 24/7',
      

      // Home Page Keywords and Content
      'home.title': 'რიტუალ სერვისი - დამკრძალავი ბიურო',
      'home.subtitle': 'გთავაზობთ სარიტუალო მომსახურებას 24 საათის განმავლობაში',
      'home.funeral_home': 'დამკრძალავი ბიურო',
      'home.damkrdzalavi_biuro': 'დამკრძალავი ბიურო',
      'home.ritual_house': 'სარიტუალო სახლი',
      'home.saritualo_saxli': 'სარიტუალო სახლი',

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
      'services.metal_letters': 'ლითონის ასოებით წარწერა',
      'services.metal_letters_desc': 'ლითონის ასოებით წარწერების დამზადება საფლავებზე. მაღალი ხარისხის მეტალის ასოები.',

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
      'cta.learn_more': 'გაიგეთ მეტი',

      // Footer
      'footer.ritual_services': 'სარიტუალო მომსახურება',
      'footer.ritual_products': 'სარიტუალო პროდუქცია',
      'footer.additional_services': 'დამატებითი სერვისები',
      'footer.quick_links': 'სწრაფი ლინკები',
      'footer.specialized_services': 'სპეციალიზებული სერვისები',
      'footer.branches_tbilisi': 'ფილიალები თბილისში',
      'footer.dighomi_branch': 'დიღომის ფილიალი',
      'footer.gldani_branch': 'გლდნის ფილიალი',
      'footer.jiqia_branch': 'ჯიქიას ფილიალი',
      'footer.24_7_service': '24/7 მომსახურება',
      'footer.all_rights_reserved': 'ყველა უფლება დაცულია',
      'footer.privacy_policy': 'კონფიდენციალურობის პოლიტიკა',
      'footer.terms_of_service': 'მომსახურების წესები',
      'footer.sitemap': 'საიტის რუკა',
      'footer.search_keywords': 'ძიების სიტყვები',
      'footer.georgian_keywords': 'ქართული Keywords',
      'footer.transliteration_keywords': 'Transliteration Keywords',
      'footer.russian_keywords': 'Russian Keywords',

      // Why Choose Us Section
      'why_choose.title': 'რატომ ვართ ლიდერები?',
      'why_choose.subtitle': 'პროფესიონალური გუნდი',
      'why_choose.experience': '20 წლიანი გამოცდილება',
      'why_choose.quality': 'ხარისხიანი მომსახურება',
      'why_choose.individual_approach': 'ინდივიდუალური მიდგომა',
      'why_choose.agent_visit': 'აგენტის მოწვევა',

      // Ritual Service Description Section
      'ritual_service.title': 'სარიტუალო სერვისი',
      'ritual_service.description': 'გთავაზობთ სამგლოვიარო ცერემონიის ორგანიზებას და სარიტუალო მომსახურების სრულ კომპლექსს. რთულ მომენტებში თქვენ გვერდით ვიქნებით და ყველა სარიტუალო დეტალზე ვიზრუნებთ, რათა თქვენი საზრუნავი შევამციროთ. ჩვენთან დაკავშირება შეგიძლიათ ნებისმიერ დროს - 24/7, კვირის ნებისმიერ დღეს. სარიტუალო მომსახურების შესახებ პირველადი კონსულტაცია სრულიად უფასოა, ხოლო საჭიროების შემთხვევაში, ჩვენი სარიტუალო აგენტი ადგილზე მოვა და დაგეხმარებათ ყველა საკითხის მოგვარებაში. ჩვენთვის მთავარია თანაგრძნობა, სწრაფი რეაგირება, პროფესიონალიზმი და ინდივიდუალური მიდგომა თითოეული დამკვეთის მიმართ. ჩვენ გთავაზობთ უმაღლესი ხარისხის მომსახურებას, ხოლო ფასები მორგებულია თქვენს საჭიროებებსა და შესაძლებლობებს.',
      'ritual_service.view_services': 'იხილეთ ჩვენი სერვისები',

      // Why Choose Ritual Service Section
      'why_choose_ritual.title': 'რატომ უნდა აირჩიოთ Ritual Service?',
      'why_choose_ritual.subtitle': 'ჩვენი სარიტუალო მომსახურება გამოირჩევა პროფესიონალიზმით, ყურადღებითა და ინდივიდუალური მიდგომით. ვზრუნავთ ყველა დეტალზე, რათა თქვენ სიმშვიდე შეინარჩუნოთ რთულ დროს. მაღალი ხარისხი, ოპერატიულობა და თანაგრძნობა ჩვენი მთავარი პრინციპებია.',
      'why_choose_ritual.experience.title': '20 წლიანი გამოცდილება',
      'why_choose_ritual.experience.desc': 'ჩვენი გამოცდილება გვაძლევს საშუალებას, უზრუნველვყოთ ღირსეული და პროფესიონალური სარიტუალო მომსახურება.',
      'why_choose_ritual.quality.title': 'საუკეთესო მომსახურება',
      'why_choose_ritual.quality.desc': 'უზრუნველყოფთ ღირსეულ, სწრაფ და პროფესიონალურ სარიტუალო მომსახურებას, თითოეული დეტალის სრული გათვალისწინებით.',
      'why_choose_ritual.support.title': '24/7 მხარდაჭერა',
      'why_choose_ritual.support.desc': 'ჩვენი გუნდი მზადაა დაგეხმაროთ ნებისმიერ დროს, უზრუნველყოფს სწრაფ და ორგანიზებულ მომსახურებას.',
      'why_choose_ritual.plan_funeral': 'დაგეგმეთ დაკრძალვა ჩვენთან',
      'why_choose_ritual.contact_24_7': 'დაგვიკავშირდით 24/7',

      // What Makes Us Different Section
      'what_makes_us.title': 'რა გვხდის ჩვენ გამორჩეულს',
      'what_makes_us.professionalism.title': 'პროფესიონალიზმი და გამოცდილება',
      'what_makes_us.professionalism.desc': 'სიდნეის აკადემიის დაკრძალვის სერვისებს ფლობს და მართავს პოლ გროსი, რომელსაც აქვს 40 წელზე მეტი გამოცდილება ინდუსტრიაში და აქვს რეპუტაცია პერსონალური სერვისის, გაგებისა და თანაგრძნობის მიწოდებით.',
      'what_makes_us.trust.title': 'სანდო და გამჭირვალე მომსახურება',
      'what_makes_us.trust.desc': 'ჩვენ მზად ვართ 24 საათის განმავლობაში, კვირაში 7 დღე, რათა დაგეხმაროთ ყველა თქვენი სერვისის მოწყობაში და სპეციალიზირდეთ მემორიალური სერვისების მიწოდებაში ცხოვრების ყველა ფენის ადამიანებისთვის.',
      'what_makes_us.care.title': 'თანაგრძნობა, განსაკუთრებული ზრუნვა',
      'what_makes_us.care.desc': 'Ritual Service-ს პერსონალი მზად არის დაეხმაროს ადამიანებს ამ რთულ პერიოდში ცერემონიის ყველა დეტალის გატარებით. ასევე ზრუნავს თქვენი ოჯახისა და საყვარელი ადამიანისთვის მნიშვნელოვანი და დასამახსოვრებელი სერვისის შექმნაზე.'
    },

    en: {
      // Header & Navigation
      'nav.home': 'Home',
      'header.company_name': 'Ritual Service',
      'nav.services': 'Services',
      'nav.products': 'Products',
      'nav.about': 'About Us',
      'nav.contact': 'Contact',
      'nav.locations': 'Locations',
      'header.call_24_7': 'Call us 24/7',
      

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
      'services.metal_letters': 'Metal Letter Inscriptions',
      'services.metal_letters_desc': 'Creation of metal letter inscriptions on graves. High-quality metal letters.',

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
      'cta.learn_more': 'Learn More',

      // Footer
      'footer.ritual_services': 'Ritual Services',
      'footer.ritual_products': 'Ritual Products',
      'footer.additional_services': 'Additional Services',
      'footer.quick_links': 'Quick Links',
      'footer.specialized_services': 'Specialized Services',
      'footer.branches_tbilisi': 'Tbilisi Branches',
      'footer.dighomi_branch': 'Dighomi Branch',
      'footer.gldani_branch': 'Gldani Branch',
      'footer.jiqia_branch': 'Jiqia Branch',
      'footer.24_7_service': '24/7 Service',
      'footer.all_rights_reserved': 'All Rights Reserved',
      'footer.privacy_policy': 'Privacy Policy',
      'footer.terms_of_service': 'Terms of Service',
      'footer.sitemap': 'Sitemap',
      'footer.search_keywords': 'Search Keywords',
      'footer.georgian_keywords': 'Georgian Keywords',
      'footer.transliteration_keywords': 'Transliteration Keywords',
      'footer.russian_keywords': 'Russian Keywords',

      // Why Choose Us Section
      'why_choose.title': 'Why Choose Ritual Service?',
      'why_choose.subtitle': 'Professional Team',
      'why_choose.experience': '20 Years of Experience',
      'why_choose.quality': 'Quality Service',
      'why_choose.individual_approach': 'Individual Approach',
      'why_choose.agent_visit': 'Agent Visit',

      // Ritual Service Description Section
      'ritual_service.title': 'Ritual Service',
      'ritual_service.description': 'We offer comprehensive funeral ceremony organization and complete ritual services. In difficult times, we will be by your side and take care of every ritual detail to reduce your worries. You can contact us at any time - 24/7, any day of the week. Initial consultation about ritual services is completely free, and if needed, our ritual agent will come to your location and help you resolve all issues. For us, the main priorities are compassion, quick response, professionalism, and individual approach to each client. We offer the highest quality service, while prices are tailored to your needs and capabilities.',
      'ritual_service.view_services': 'View Our Services',

      // Why Choose Ritual Service Section
      'why_choose_ritual.title': 'Why Choose Ritual Service?',
      'why_choose_ritual.subtitle': 'Our ritual service stands out for its professionalism, attention, and individual approach. We take care of every detail so that you can maintain peace during difficult times. High quality, efficiency, and compassion are our main principles.',
      'why_choose_ritual.experience.title': '20 Years of Experience',
      'why_choose_ritual.experience.desc': 'Our experience allows us to ensure dignified and professional ritual services.',
      'why_choose_ritual.quality.title': 'Best Service',
      'why_choose_ritual.quality.desc': 'We provide dignified, fast, and professional ritual services, taking into account every detail.',
      'why_choose_ritual.support.title': '24/7 Support',
      'why_choose_ritual.support.desc': 'Our team is ready to help you at any time, providing fast and organized service.',
      'why_choose_ritual.plan_funeral': 'Plan a Funeral with Us',
      'why_choose_ritual.contact_24_7': 'Contact Us 24/7',

      // What Makes Us Different Section
      'what_makes_us.title': 'What Makes Us Different',
      'what_makes_us.professionalism.title': 'Professionalism and Experience',
      'what_makes_us.professionalism.desc': 'Sydney Academy Funeral Services is owned and operated by Paul Gross, who has over 40 years of experience in the industry and has a reputation for providing personal service, understanding and compassion.',
      'what_makes_us.trust.title': 'Reliable and Transparent Service',
      'what_makes_us.trust.desc': 'We are ready 24 hours a day, 7 days a week to help you organize all your services and specialize in providing memorial services for people of all walks of life.',
      'what_makes_us.care.title': 'Compassion, Special Care',
      'what_makes_us.care.desc': 'Ritual Service staff are ready to help people during this difficult period by going through every detail of the ceremony. Also cares about creating an important and memorable service for your family and loved one.'
    },

    ru: {
      // Header & Navigation
      'nav.home': 'Главная',
      'header.company_name': 'Ритуал Сервис',
      'nav.services': 'Услуги',
      'nav.products': 'Продукция',
      'nav.about': 'О нас',
      'nav.contact': 'Контакты',
      'nav.locations': 'Филиалы',
      'header.call_24_7': 'Звоните 24/7',
      

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
      'services.dressing': 'Одевание и подготовка',
      'services.dressing_desc': 'Достойное одевание и подготовка усопшего опытными специалистами.',
      'services.metal_letters': 'Надписи металлическими буквами',
      'services.metal_letters_desc': 'Изготовление надписей металлическими буквами на могилах. Высококачественные металлические буквы.',

      // Products
      'products.coffins': 'Гробы',
      'products.coffins_desc': 'Качественные гробы: грузинский, украинский, итальянский стили. Широкий выбор для любого бюджета.',
      'products.shrouds': 'Саваны',
      'products.shrouds_desc': 'Традиционные и современные саваны. Натуральные материалы, ручная работа.',
      'products.refrigeration': 'Холодильники',
      'products.refrigeration_desc': 'Гробы-холодильники, американские и стандартные модели для длительного хранения.',

      // Common SEO Terms
      'seo.funeral_services': 'Ритуальные услуги',
      'seo.burial_services': 'Похоронные услуги',
      'seo.memorial_ceremonies': 'Поминальные церемонии',
      'seo.burial': 'Похороны',
      'seo.funeral_director': 'Похоронный директор',
      'seo.cemetery': 'Кладбище',
      'seo.deceased': 'Усопший',
      'seo.mourning_hall': 'Траурный зал',
      'seo.banquet_hall': 'Банкетный зал',
      'seo.colored_photo': 'Изготовление цветного фото',
      'seo.metal_letters': 'Надписи металлическими буквами',
      'seo.regional_transportation': 'Региональная перевозка',
      'seo.international_transportation': 'Международная перевозка',

      // Contact & Location
      'contact.free_consultation': 'Бесплатная консультация',
      'contact.agent_visit': 'Визит агента',
      'contact.24_7_service': '24/7 обслуживание',
      'locations.tbilisi_branches': 'Филиалы в Тбилиси',
      'locations.gldani': 'Глдани - ул. Гр. Ошкели, 4',
      'locations.dighomi': 'Дигоми - ул. Нодара Бохлуа, 14',
      'locations.jiqia': 'Джикия - ул. Александра Иоселиани, 96',

      // About & Experience
      'about.20_years_experience': '20 лет опыта',
      'about.professional_team': 'Профессиональная команда',
      'about.individual_approach': 'Индивидуальный подход',
      'about.quality_service': 'Качественное обслуживание',

      // Call to Actions
      'cta.call_now': 'Позвонить сейчас',
      'cta.get_consultation': 'Получить консультацию',
      'cta.order_service': 'Заказать услугу',
      'cta.learn_more': 'Узнать больше',

      // Footer
      'footer.ritual_services': 'Ритуальные услуги',
      'footer.ritual_products': 'Ритуальная продукция',
      'footer.additional_services': 'Дополнительные услуги',
      'footer.quick_links': 'Быстрые ссылки',
      'footer.specialized_services': 'Специализированные услуги',
      'footer.branches_tbilisi': 'Филиалы в Тбилиси',
      'footer.dighomi_branch': 'Филиал Дигоми',
      'footer.gldani_branch': 'Филиал Глдани',
      'footer.jiqia_branch': 'Филиал Джикия',
      'footer.24_7_service': '24/7 обслуживание',
      'footer.all_rights_reserved': 'Все права защищены',
      'footer.privacy_policy': 'Политика конфиденциальности',
      'footer.terms_of_service': 'Условия обслуживания',
      'footer.sitemap': 'Карта сайта',
      'footer.search_keywords': 'Поисковые слова',
      'footer.georgian_keywords': 'Грузинские ключевые слова',
      'footer.transliteration_keywords': 'Транслитерация ключевых слов',
      'footer.russian_keywords': 'Русские ключевые слова',

      // Why Choose Us Section
      'why_choose.title': 'Почему стоит выбрать Ритуал Сервис?',
      'why_choose.subtitle': 'Профессиональная команда',
      'why_choose.experience': '20 лет опыта',
      'why_choose.quality': 'Качественное обслуживание',
      'why_choose.individual_approach': 'Индивидуальный подход',
      'why_choose.agent_visit': 'Визит агента',

      // Ritual Service Description Section
      'ritual_service.title': 'Ритуальный сервис',
      'ritual_service.description': 'Предлагаем организацию поминальных церемоний и полный комплекс ритуальных услуг. В трудные моменты мы будем рядом и позаботимся о каждой ритуальной детали, чтобы уменьшить ваши заботы. Вы можете связаться с нами в любое время - 24/7, в любой день недели. Первичная консультация по ритуальным услугам совершенно бесплатна, а при необходимости наш ритуальный агент приедет на место и поможет решить все вопросы. Для нас главное - сострадание, быстрая реакция, профессионализм и индивидуальный подход к каждому клиенту. Мы предлагаем услуги высочайшего качества, при этом цены адаптированы под ваши потребности и возможности.',
      'ritual_service.view_services': 'Посмотреть наши услуги',

      // Why Choose Ritual Service Section
      'why_choose_ritual.title': 'Почему стоит выбрать Ritual Service?',
      'why_choose_ritual.subtitle': 'Наш ритуальный сервис выделяется профессионализмом, вниманием и индивидуальным подходом. Мы заботимся о каждой детали, чтобы вы могли сохранить спокойствие в трудные времена. Высокое качество, оперативность и сострадание - наши основные принципы.',
      'why_choose_ritual.experience.title': '20 лет опыта',
      'why_choose_ritual.experience.desc': 'Наш опыт позволяет обеспечить достойные и профессиональные ритуальные услуги.',
      'why_choose_ritual.quality.title': 'Лучший сервис',
      'why_choose_ritual.quality.desc': 'Обеспечиваем достойные, быстрые и профессиональные ритуальные услуги, учитывая каждую деталь.',
      'why_choose_ritual.support.title': '24/7 поддержка',
      'why_choose_ritual.support.desc': 'Наша команда готова помочь вам в любое время, обеспечивая быстрый и организованный сервис.',
      'why_choose_ritual.plan_funeral': 'Запланируйте похороны с нами',
      'why_choose_ritual.contact_24_7': 'Свяжитесь с нами 24/7',

      // What Makes Us Different Section
      'what_makes_us.title': 'Что делает нас особенными',
      'what_makes_us.professionalism.title': 'Профессионализм и опыт',
      'what_makes_us.professionalism.desc': 'Сиднейская академия похоронных услуг принадлежит и управляется Полом Гроссом, который имеет более 40 лет опыта в отрасли и имеет репутацию предоставления персонального обслуживания, понимания и сострадания.',
      'what_makes_us.trust.title': 'Надежное и прозрачное обслуживание',
      'what_makes_us.trust.desc': 'Мы готовы 24 часа в сутки, 7 дней в неделю помочь вам организовать все ваши услуги и специализируемся на предоставлении мемориальных услуг для людей всех слоев общества.',
      'what_makes_us.care.title': 'Сострадание, особая забота',
      'what_makes_us.care.desc': 'Персонал Ritual Service готов помочь людям в этот трудный период, пройдя через каждую деталь церемонии. Также заботится о создании важного и запоминающегося обслуживания для вашей семьи и близкого человека.'
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Set initial language based on URL or browser preference
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    let language = 'ka'; // default

    if (isPlatformBrowser(this.platformId)) {
      try {
        const urlPath = window.location.pathname;
        
        if (urlPath.startsWith('/en')) {
          language = 'en';
        } else if (urlPath.startsWith('/ru')) {
          language = 'ru';
        } else if (urlPath.startsWith('/ka')) {
          language = 'ka';
        } else {
          // Try to get from localStorage
          const savedLanguage = localStorage.getItem('selectedLanguage');
          if (savedLanguage && this.translations[savedLanguage]) {
            language = savedLanguage;
          }
        }
      } catch (error) {
        // Fallback to default
        language = 'ka';
      }
    }

    this.setLanguage(language);
  }

  setLanguage(language: string): void {
    if (this.translations[language]) {
      this.currentLanguageSubject.next(language);
      if (isPlatformBrowser(this.platformId)) {
        try {
          localStorage.setItem('selectedLanguage', language);
        } catch (error) {
          // Silently handle localStorage error
        }
      }
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
        return key;
      }
      return this.interpolateParams(fallbackTranslation, params);
    }
    
    return this.interpolateParams(translation, params);
  }

  private getNestedTranslation(obj: Translation, key: string): string {
    // Since translations are stored as flat keys, just return the direct key
    return obj[key] as string;
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