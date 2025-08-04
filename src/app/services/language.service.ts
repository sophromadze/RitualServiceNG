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
      'nav.home': 'დამკრძალავი ბიურო - მთავარი',
      'nav.home_short': 'მთავარი',
      'header.company_name': 'რიტუალ სერვისი',
      'loader.title': 'რიტუალ სერვისი - დამკრძალავი ბიურო',
      'nav.services': 'სერვისები',
      'nav.products': 'პროდუქცია',
      'nav.about': 'ჩვენს შესახებ',
      'nav.contact': 'კონტაქტი',
      'nav.locations': 'ფილიალები',
      'header.call_24_7': 'დაგვიკავშირდით 24/7',
      'breadcrumb.plan_funeral': 'დაგეგმე დაკრძალვა',
      
      // Breadcrumb translations for URL segments
      'breadcrumb.coffins': 'სასახლეები',
      'breadcrumb.shrouds': 'სუდარები',
      'breadcrumb.refrigeration': 'სასახლე მაცივრები',
      'breadcrumb.cemetery_accessories': 'სასაფლაოს აქსესუარები',
      'breadcrumb.embalming': 'ბალზამირება',
      'breadcrumb.transportation': 'გადასვენება',
      'breadcrumb.stone_engraving': 'ქვაზე ხატვა',
      'breadcrumb.grave_decoration': 'საფლავის მოპირკეთება',
      'breadcrumb.dressing': 'მიცვალებულის ჩაცმა',
      'breadcrumb.mourning_hall': 'საპანაშვიდე დარბაზი',
      'breadcrumb.banquet_hall': 'საბანკეტო დარბაზი',
      'breadcrumb.metal_letters': 'ლითონის წარწერები',
      'breadcrumb.agent_service': 'აგენტის მომსახურება',
      'breadcrumb.lifting_machine': 'მწევი მანქანა',
      'breadcrumb.colored_photo': 'ფერადი სურათის დამზადება',
      

      // Home Page Keywords and Content
      'home.title': 'რიტუალ სერვისი - დამკრძალავი ბიურო',
      'home.subtitle': 'გთავაზობთ სარიტუალო მომსახურებას 24 საათის განმავლობაში',
      'home.funeral_home': 'დამკრძალავი ბიურო',
      'home.damkrdzalavi_biuro': 'დამკრძალავი ბიურო',
      'home.ritual_house': 'სარიტუალო სახლი',
      'home.saritualo_saxli': 'სარიტუალო სახლი',
      'home.funeral_bureau_tbilisi': 'დამკრძალავი ბიურო თბილისში',
      'home.ritual_service_bureau': 'Ritual Service - დამკრძალავი ბიურო',
      'home.funeral_bureau_services': 'დამკრძალავი ბიურო მომსახურება',
      'home.funeral_bureau': 'დამკრძალავი ბიურო',
      'home.main_services': 'ჩვენი მთავარი სერვისები',
      'home.ritual_products': 'სარიტუალო პროდუქცია',
      'home.branches_tbilisi': 'ფილიალები თბილისში',
      'home.why_leaders': 'რატომ ვართ ლიდერები',
      'home.20_years_experience': '20 წლიანი გამოცდილება',
      'home.burial_field': 'დაკრძალვის სფეროში',
      'home.mourning_ceremonies': 'სამგლოვიარო ცერემონიების',
      'home.burial_services': 'დასაფლავების მომსახურება',
      'home.memorial_hall': 'საპანაშვიდე დარბაზი',
      'home.banquet_hall': 'საბანკეტო დარბაზი',
      'home.funeral_services_24_7': '24/7 დამკრძალავი მომსახურება',
      'home.trusted_partner': 'თქვენი დანდობილი პარტნერი',
      'home.by_your_side': 'ჩვენ ვართ 24 საათის განმავლობაში თქვენი გვერდით',
      'home.dressing_deceased': 'მიცვალებულის ჩაცმა',
      'home.professional_preparation': 'პროფესიონალური მომზადება',
      'home.embalming': 'ბალზამირება',
      'home.hearse_service': 'კატაფალკის მომსახურება',
      'home.stone_painting': 'ქვაზე ხატვა',
      'home.grave_decoration': 'საფლავის მოპირკეთება',
      'home.transportation': 'გადასვენება',
      'home.colored_photo': 'ფერადი სურათის დამზადება',
      'home.metal_inscriptions': 'ლითონის ასოებით წარწერა',
      'home.coffins_all_styles': 'სასახლეები ყველა სტილში',
      'home.shrouds': 'სუდარები',
      'home.traditional_modern': 'ტრადიციული და თანამედროვე',
      'home.shroud': 'სუდარა',
      'home.quality_materials': 'ხარისხიანი მასალებით',
      'home.coffin_refrigerators': 'სასახლე-მაცივრები',
      'home.gldani': 'გლდანი',
      'home.dighomi': 'დიღომი',
      'home.jiqia': 'ჯიქია',

      // Services with SEO Keywords - 14 Service Cards
      'services.coffins': 'სასახლეები',
      'services.coffin_refrigeration': 'სასახლე მაცივარი',
      'services.shrouds': 'სუდარა',
      'services.embalming_dressing': 'ბალზამირება, გრიმი, ჩაცმა',
      'services.transportation': 'გადასვენება',
      'services.mourning_hall': 'საპანაშვიდე დარბაზი',
      'services.hearse_service': 'კატაფალკის მომსახურება',
      'services.marshutka': 'მარშუტკა',
      'services.hall': 'დარბაზი',
      'services.cemetery_decoration': 'სასაფლაოს მოპირკეთება',
      'services.grave_stones_painting': 'საფლავის ქვები, ქვაზე ხატვა',
      'services.grave_excavation': 'სამარხის გაჭრა',
      'services.cemetery_accessories': 'სასაფლაოს აქსესუარები',
      'services.lifting_machine': 'ჩასასვენებლი ლიფტი',

      // Products with Keywords
      'products.coffins': 'სასახლეები',
      'products.shrouds': 'სუდარები',
      'products.refrigeration': 'სასახლე მაცივრები',
      'products.cemetery_accessories': 'სასაფლაოს აქსესუარები',
      

      
      'header.phone': '+995 557 55 61 16',

      // Common SEO Terms
      'seo.funeral_services': 'დაკრძალვის სერვისები',
      'seo.burial_services': 'დასაფლავების მომსახურება',
      'seo.memorial_ceremonies': 'სამგლოვიარო ცერემონიები',
      'seo.burial': 'დაკრძალვა',
      'seo.funeral_director': 'დამკრძალავი',
      'seo.cemetery': 'საფლავის',
      'seo.deceased': 'მიცვალებული',
      'seo.mourning_hall': 'საპანაშვიდე დარბაზი',
      'seo.banquet_hall': 'საბანკეტო დარბაზი',
      'seo.colored_photo': 'ფერადი სურათის დამზადება',
      'seo.metal_letters': 'ლითონის ასოებით წარწერა',
      'seo.regional_transportation': 'რაიონში გადასვენება',
      'seo.international_transportation': 'საზღვარგარეთ გადასვენება',

      // Services Description
      'services.description': 'ჩვენ გთავაზობთ სრულ სარიტუალო მომსახურებას - ერთი სივრციდან ყველაფერს, რაც საჭიროა ღირსეული და მოწესრიგებული ცერემონიისთვის. ჩვენი მიზანია, რთულ სიტუაციაში თქვენი გვერდში დგომა და საჭიროებების გათვალისწინება.',

      // Contact & Location
      'contact.free_consultation': 'უფასო კონსულტაცია',
      'contact.agent_visit': 'აგენტის მოწვევა',
      'contact.24_7_service': '24/7 მომსახურება',
      'locations.tbilisi_branches': 'თბილისის ფილიალები',
      'locations.gldani': 'გლდანი - 4 გრ. ოშკელის ქუჩა',
      'locations.dighomi': 'დიღომი - 14 ნოდარ ბოხუას ქუჩა',
      'locations.jiqia': 'ჯიქია - 96 ალექსანდრე იოსელიანის ქუჩა',
      'ritual_offer': '"რიტუალ სერვისი" გთავაზობთ უფასო პირველ კონსულტაციას, რის შემდეგაც, სურვილის შემთხვევაში, ჩვენი სარიტუალო აგენტი ადგილზე მობრძანდება თქვენთან.',
      'gldani_address': '4 გრ. ოშკელის ქუჩა, თბილისი',
      'dighomi_address': '14 ნოდარ ბოხუას ქუჩა, თბილისი',
      'saburtalo_address': '96 ალექსანდრე იოსელიანის ქუჩა, თბილისი',
      'locations.title': 'დამკრძალავი ბიურო',
      'locations.gldani_title': 'გლდანი',
      'locations.dighomi_title': 'დიღომი',
      'locations.saburtalo_title': 'საბურთალო',

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
      'common.learn_more': 'გაიგე მეტი',
      'common.quick_actions': 'მოქმედებები',
      'common.plan_funeral': 'დაკრძალვის დაგეგმვა',
      'common.call': 'დარეკვა',
      'common.scroll_to_top': 'ზევით ასვლა',

      // Footer
      'footer.ritual_services': 'სარიტუალო მომსახურება',
      'footer.ritual_products': 'სარიტუალო პროდუქცია',
      'footer.additional_services': 'დამატებითი სერვისები',
      'footer.quick_links': 'სწრაფი ლინკები',
      'footer.specialized_services': 'სპეციალიზებული სერვისები',
      'footer.branches_tbilisi': 'ფილიალები თბილისში',
      'footer.dighomi_branch': 'დიღმის ფილიალი',
      'footer.gldani_branch': 'გლდანის ფილიალი',
      'footer.jiqia_branch': 'ჯიქიას ფილიალი',
      'footer.24_7_service': '24/7 მომსახურება',
      'footer.all_rights_reserved': 'ყველა უფლება დაცულია',
      'footer.copyright_text': 'სარიტუალო სახლი - რიტუალ სერვისი - დამკრძალავი ბიურო',
      'footer.privacy_policy': 'კონფიდენციალურობის პოლიტიკა',
      'footer.terms_of_service': 'მომსახურების წესები',
      'footer.sitemap': 'საიტის რუკა',
      'footer.search_keywords': 'ძიების სიტყვები',
      'footer.georgian_keywords': 'ქართული Keywords',
      'footer.transliteration_keywords': 'Transliteration Keywords',
      'footer.russian_keywords': 'Russian Keywords',
      
      'funeral_planning.cta_description': 'მაშინ როდესაც ადამიანი დგას ცხოვრების ყველაზე რთული მომენტში, მნიშვნელოვანია მის გვერდით იყოს სანდო, პასუხისმგებლიანი და გულისხმიერი გუნდი. სწორედ ასეთები ვართ ჩვენ.',

      // Why Choose Us Section
      'why_choose.title': 'რატომ ვართ ლიდერები?',
      'why_choose.subtitle': 'პროფესიონალური გუნდი',
      'why_choose.experience': '20 წლიანი გამოცდილება',
      'why_choose.quality': 'ხარისხიანი მომსახურება',
      'why_choose.individual_approach': 'ინდივიდუალური მიდგომა',
      'why_choose.agent_visit': 'აგენტის მოწვევა',

      // About Page
      'about.hero.title': 'რიტუალ სერვისის შესახებ',
      'about.hero.title_new': 'ჩვენს შესახებ',
      
      'about.how_created.title': 'როგორ შეიქმნა',
      'about.how_created.description1': '1995 წელს პეტროვების ოჯახმა დააარსა რიტუალ სერვისი, როგორც პატარა ადგილობრივი დამკრძალავი ბიურო მარტივი მისიით: ოჯახებს ღირსეული და პატივისცემული სარიტუალო მომსახურების მიწოდება მათი ყველაზე რთულ დროში. რაც ერთი ფილიალით დაიწყო, გადაიქცა რეგიონის ერთ-ერთ ყველაზე სანდო სარიტუალო მომსახურებად.',
      'about.how_created.description2': 'ჩვენი მოგზაურობა დაიწყო მაშინ, როცა პეტროვების ოჯახმა განიცადა ნაცნობის დაკარგვა და აღმოაჩინა, რომ არსებულ მომსახურებას აკლდა პირადი შეხება და კულტურული მგრძნობელობა, რაც ოჯახებს ნამდვილად სჭირდებოდათ. ეს პირადი გამოცდილება გახდა ჩვენი კომპანიის ფილოსოფიის საფუძველი - ყველა ოჯახთან ისე ვექცევით, თითქოს ჩვენი საკუთარი ოჯახი იყოს.',
      'about.how_created.image_alt': 'ჩვენი თავმოყრილი დასაწყისი',
      
      'about.what_offer.title': 'რას ვთავაზობთ',
      'about.what_offer.title_new': 'რას გთავაზობთ',
      'about.what_offer.description': 'ვთავაზობთ ყოვლისმომცველ სარიტუალო და მემორიალურ მომსახურებას, რომელიც შექმნილია თქვენი ნაცნობების ღირსეული პატივისცემისთვის. ჩვენი სერვისები მოიცავს ტრადიციულ დაკრძალვებს, გადასვენების სერვისებს, მემორიალურ ცერემონიებს და სპეციალიზებულ კულტურულ და რელიგიურ ცერემონიებს, რომლებიც პატივს სცემენ მრავალფეროვან ტრადიციებს და რწმენებს.',
      'about.what_offer.description_new': 'გთავაზობთ ყოვლისმომცველ რიტუალურ მომსახურებას, რომელიც მოიცავს ტრადიციულ დაკრძალვის ცერემონიებს, ტრანსპორტირებას, მემორიალურ მომსახურებებს და რელიგიურ რიტუალებს.',
      'about.what_offer.image_alt': 'ჩვენი ყოვლისმომცველი სერვისები',
      'about.what_offer.services.traditional': 'ტრადიციული სარიტუალო მომსახურება',
      'about.what_offer.services.transportation': 'გადასვენების სერვისები',
      'about.what_offer.services.memorial': 'მემორიალური ცერემონიები',
      'about.what_offer.services.religious': 'რელიგიური სერვისები',
      
      'about.our_goal.title': 'ჩვენი მიზანი',
      'about.our_goal.description1': 'ჩვენი მთავარი მიზანია ოჯახებს თანაგრძნობით, პროფესიონალური და კულტურულად მგრძნობიარე სარიტუალო მომსახურების მიწოდება მათი საჭიროების დროს. ჩვენ გვჯერა, რომ ყველა ცხოვრება იმსახურებს აღსანიშნავს და ყველა ოჯახი იმსახურებს მხარდაჭერას გლოვის პროცესში.',
      'about.our_goal.description2': 'ჩვენ ვცდილობთ ვიყოთ მეტი, ვიდრე უბრალოდ მომსახურების მიმწოდებელი - ჩვენ ვმიზნავთ ვიყოთ სანდო პარტნიორი ოჯახების დახმარებაში ცხოვრების ერთ-ერთი ყველაზე რთული მომენტის გადალახვაში. ჩვენი ვალდებულება ხარისხის, დეტალებზე ყურადღების და ნამდვილი ზრუნვის მიმართ ყველა ოჯახის მიმართ, რომელსაც ვემსახურებით, ყველაფერს მართავს.',
      'about.our_goal.image_alt': 'ჩვენი ვალდებულება ხარისხის მიმართ',
      'about.our_goal.values.compassion.title': 'თანაგრძნობა',
      'about.our_goal.values.compassion.description': 'ყველა ოჯახთან ემპათიით და გაგებით ვექცევით',
      'about.our_goal.values.excellence.title': 'ხარისხი',
      'about.our_goal.values.excellence.description': 'ყველა ჩვენს სერვისში უმაღლესი სტანდარტების შენარჩუნება',
      'about.our_goal.values.respect.title': 'პატივისცემა',
      'about.our_goal.values.respect.description': 'მრავალფეროვანი ტრადიციების და პირადი სურვილების პატივისცემა',

      // Ritual Service Description Section
      'ritual_service.title': 'სარიტუალო სერვისი',
      'ritual_service.description': 'გთავაზობთ სამგლოვიარო ცერემონიის ორგანიზებას და სარიტუალო მომსახურების სრულ კომპლექსს. რთულ მომენტებში თქვენ გვერდით ვიქნებით და ყველა სარიტუალო დეტალზე ვიზრუნებთ, რათა თქვენი საზრუნავი შევამციროთ. ჩვენთან დაკავშირება შეგიძლიათ ნებისმიერ დროს - 24/7, კვირის ნებისმიერ დღეს. სარიტუალო მომსახურების შესახებ პირველადი კონსულტაცია სრულიად უფასოა, ხოლო საჭიროების შემთხვევაში, ჩვენი სარიტუალო აგენტი ადგილზე მოვა და დაგეხმარებათ ყველა საკითხის მოგვარებაში. ჩვენთვის მთავარია თანაგრძნობა, სწრაფი რეაგირება, პროფესიონალიზმი და ინდივიდუალური მიდგომა თითოეული დამკვეთის მიმართ. ჩვენ გთავაზობთ უმაღლესი ხარისხის მომსახურებას, ხოლო ფასები მორგებულია თქვენს საჭიროებებსა და შესაძლებლობებს.',
      'ritual_service.view_services': 'იხილეთ ჩვენი სერვისები',

      // Why Choose Ritual Service Section
      'why_choose_ritual.title': 'რატომ უნდა აირჩიოთ Ritual Service?',
      'why_choose_ritual.subtitle': 'ჩვენი სარიტუალო მომსახურება გამოირჩევა პროფესიონალიზმით, ყურადღებითა და ინდივიდუალური მიდგომით. ვზრუნავთ ყველა დეტალზე, რათა თქვენ სიმშვიდე შეინარჩუნოთ რთულ დროს. მაღალი ხარისხი, ოპერატიულობა და თანაგრძნობა ჩვენი მთავარი პრინციპებია.',
      'why_choose_ritual.full_service.title': 'სრულ სერვისზე პასუხისმგებლობა',
      'why_choose_ritual.full_service.desc': 'ჩვენ არ გიტოვებთ არაფერს გასარკვევად - ყველაფერზე ვზრუნავთ: ცერემონიიდან დაწყებული, ტრანსპორტირებით, დარბაზით და სასაფლაოს აქსესუარებით დამთავრებული',
      'why_choose_ritual.peaceful_environment.title': 'მშვიდი გარემო და პროფესიონალიზმი',
      'why_choose_ritual.peaceful_environment.desc': 'ჩვენი სივრცეები შექმნილია იმისთვის, რომ ოჯახმა შეძლოს ღირსეულად, მშვიდად და სიწყნარეში გამოეთხოვოს საყვარელ ადამიანს.',
      'why_choose_ritual.compassion_support.title': 'თანაგრძნობა და მხარდაჭერა',
      'why_choose_ritual.compassion_support.desc': 'ჩვენ არ ვართ მხოლოდ სერვისის მიმწოდებლები - ვართ ადამიანები, რომლებიც თქვენს გვერდით დგანან. ჩვენ გვესმის თქვენი ტკივილი და პატივისცემით ვეკიდებით თითოეულ დეტალს.',
      'why_choose_ritual.experience_trust.title': 'გამოცდილება და ნდობა',
      'why_choose_ritual.experience_trust.desc': 'მრავალი ოჯახი უკვე გვენდო და ჩვენ დავამტკიცეთ, რომ შესაძლებელია ცერემონიის გამართვა ღირსეულად, მოკრძალებულად და ყოველგვარი ზედმეტი ხარჯის გარეშე. ჩვენთან ყველაფერი წარიმართება მშვიდად, მოწესრიგებულად და ადამიანურად. თქვენზე ზრუნვა - ჩვენი მთავარი პასუხისმგებლობაა.',
      'why_choose_ritual.years_experience.title': '15 წლიანი გამოცდილება',
      'why_choose_ritual.years_experience.desc': 'ჩვენი გამოცდილება გვაძლევს საშძუალებას ვუზრუნველყოთ ღირსეული და პროფესიონალური სარიტუალო მოსმახურება.',
      'why_choose_ritual.support_24_7.title': '24/7 მხარდაჭერა',
      'why_choose_ritual.support_24_7.desc': 'ჩვენი გუნდი მზად არის დაგეხმაროთ ნებისმიერ დროს და დღეს, უზრუნველყოს სრაფი მომსახურება.',
      'why_choose_ritual.plan_funeral': 'დაგეგმეთ დაკრძალვა ჩვენთან',
      'why_choose_ritual.contact_24_7': 'დაგვიკავშირდით 24/7',

      // What Makes Us Different Section
      'what_makes_us.title': 'რა გვხდის ჩვენ გამორჩეულს',
      'what_makes_us.professionalism.title': 'პროფესიონალიზმი და გამოცდილება',
      'what_makes_us.professionalism.desc': 'მრავალწლიანი გამოცდილება და ნდობა - დამკრძალავი ბიურო "Ritual service" 15 წელია ფუნქციონირებს, შესაბამისად გამოცდილება გვაძლევს საშუალებას შევინარჩუნოთ ორგანიზებულობა. ჩვენი მიზანია, ადამიანებს დავეხმაროთ ცხოვრების ყველაზე რთულ მომენტში - მშვიდად, ღირსეულად ჩაატარონ სარიტუალო პროცესი.',
      'what_makes_us.trust.title': 'სანდო და გამჭირვალე მომსახურება',
      'what_makes_us.trust.desc': 'ჩვენ მზად ვართ 24 საათის განმავლობაში, კვირაში 7 დღე, რათა დაგეხმაროთ ყველა თქვენი სერვისის მოწყობაში და სპეციალიზირდეთ მემორიალური სერვისების მიწოდებაში ცხოვრების ყველა ფენის ადამიანებისთვის.',
      'what_makes_us.care.title': 'თანაგრძნობა, განსაკუთრებული ზრუნვა',
      'what_makes_us.care.desc': 'Ritual Service-ის პერსონალი მზად არის დაეხმაროს ადამიანებს ამ რთულ პერიოდში ცერემონიის ყველა დეტალის გატარებით. ასევე ზრუნავს თქვენი ოჯახისა და საყვარელი ადამიანისთვის მნიშვნელოვანი და დასამახსოვრებელი სერვისის შექმნაზე.',
      
      // Products Page Specific Translations
      'products.title': 'სარიტუალო პროდუქტები',
      'products.hero_description': 'სარიტუალო პროდუქტები უმაღლესი ხარისხით: სასახლეები, სუდარები, სასახლე მაცივრები, კატაფალკები. ყველა პროდუქტი მზადაა 24/7.',
      'products.hero_title': 'დამკრძალავი ბიურო - სარიტუალო პროდუქტები',
      'products.our_products': 'ჩვენი პროდუქტები',
      'products.quality_description': 'ხარისხიანი სარიტუალო პროდუქტები - სრული ასორტიმენტი',
      'products.categories_title': 'პროდუქტების კატეგორიები',
      'products.types_title': 'პროდუქტის ტიპები',
      'products.gallery_title': 'ფოტო გალერეა',
      'products.related_title': 'სხვა პროდუქტები',
      'products.details_title': 'დეტალურად',
      'products.features_title': 'ჩვენი უპირატესობები',
      
      // Product Keywords for Related Products
      'products.coffins_keywords': 'სასახლეები - sasaxleebi',
      'products.shrouds_keywords': 'სუდარები - sudarebi',
      'products.refrigeration_keywords': 'სასახლე მაცივრები - sasaxle macivrebi',
      'products.cemetery_accessories_keywords': 'სასაფლაოს აქსესუარები - sasapleos akseesuarebi',
      
      // Product Categories
      'products.coffins.wooden': 'ხის სასახლეები',
      'products.coffins.luxury': 'ლუქს კლასის სასახლეები',
      'products.coffins.economy': 'ეკონომ კლასის სასახლეები',
      'products.coffins.standard': 'სტანდარტული სასახლეები',
      
      'products.shrouds.cotton': 'ბამბის სუდარები',
      'products.shrouds.silk': 'სილკის სუდარები',
      'products.shrouds.artificial': 'ხელოვნური ქსოვილის სუდარები',
      'products.shrouds.special': 'სპეციალური დიზაინის სუდარები',
      
      'products.refrigeration.coffin': 'სასახლე-მაცივრები',
      'products.refrigeration.stationary': 'სტაციონარული მაცივრები',
      'products.refrigeration.mobile': 'მობილური მაცივრები',
      'products.refrigeration.special': 'სპეციალური მაცივრები',
      
      'products.cemetery_accessories.crosses': 'ჯვრები',
      'products.cemetery_accessories.flower_structures': 'საყვავილე კონსტრუქციები',
      'products.cemetery_accessories.candles': 'სასანთლეები',
      'products.cemetery_accessories.marble_accessories': 'მარმარილოს აქსესუარები',
      
      // Product Features
      'products.coffins.features.natural': 'ხის სასახლეები ბუნებრივი მასალებით',
      'products.coffins.features.luxury': 'ლუქს კლასის სასახლეები უმაღლესი ხარისხით',
      'products.coffins.features.economy': 'ეკონომ კლასის სასახლეები ხელმისაწვდომი ფასით',
      'products.coffins.features.standard': 'სტანდარტული სასახლეები სანდო ხარისხით',
      
      'products.shrouds.features.cotton': 'ბამბის სუდარები ბუნებრივი მასალებით',
      'products.shrouds.features.silk': 'სილკის სუდარები ხარისხიანი ქსოვილით',
      'products.shrouds.features.artificial': 'ხელოვნური ქსოვილის სუდარები გამძლე მასალებით',
      'products.shrouds.features.special': 'სპეციალური დიზაინის სუდარები ინდივიდუალური მიდგომით',
      
      'products.refrigeration.features.coffin': 'სასახლე-მაცივრები კომბინირებული ფუნქციით',
      'products.refrigeration.features.stationary': 'სტაციონარული მაცივრები დიდი ტევადობით',
      'products.refrigeration.features.mobile': 'მობილური მაცივრები ტრანსპორტირებისთვის',
      'products.refrigeration.features.special': 'სპეციალური მაცივრები გახანგრძლივებული შენახვისთვის',
      
      'products.cemetery_accessories.features.crosses': 'ჯვრები (მარმარილოსი და ხის) - ტრადიციული და თანამედროვე ფორმებით, სხვადასხვა ზომასა და დიზაინში',
      'products.cemetery_accessories.features.flower_structures': 'საყვავილე კონსტრუქციები - ლითონის, ქვის ან კერამიკის, რომლებიც უზრუნველყოფს მუდმივ სისუფთავეს და სიმშვიდეს საფლავზე',
      'products.cemetery_accessories.features.candles': 'სასანთლეები - მარტივი და ორნამენტული ვარიანტები, რომლებიც თვეობით ინარჩუნებენ სიმყუდროვეს და ლოცვის სივრცეს',
      'products.cemetery_accessories.features.marble_accessories': 'მარმარილოს აქსესუარები - ქვის ლარნაკები, ხსოვნის ქვის დაფები, ბორდიურები და სხვა ელემენტები, მორგებული საფლავის დიზაინზე',
      'products.cemetery_accessories.process_title': 'სასაფლაოს აქსესუარების არჩევანი',
      
      // Contact CTA
      'products.contact_now': 'დაგვიკავშირდით ახლავე - ჩვენ ვართ 24 საათის განმავლობაში თქვენი გვერდით',
      'services.contact_now': 'დაგვიკავშირდით ახლავე - ჩვენ ვართ 24 საათის განმავლობაში თქვენი გვერდით',
      
      // Services Page
      'services.hero_description': 'რიტუალ სერვისი გთავაზობთ სრულ კომპლექს სარიტუალო მომსახურებისა: ბალზამირება, კატაფალკი, ქვაზე ხატვა, გადასვენება, საპანაშვიდე დარბაზი, მიცვალებულის ჩაცმა და ა.შ.',
      'services.hero_title': 'დამკრძალავი ბიურო - დაკრძალვის სერვისები',

      'services.section_title': 'ჩვენი მომსახურება',
      'services.section_description': 'პროფესიონალური სარიტუალო მომსახურება 24/7 - ყველა საჭირო სერვისი ერთ ადგილას',
      'services.seo_title': 'სარიტუალო მომსახურება - რიტუალ სერვისი',
      'services.seo_subtitle': 'პროფესიონალური სარიტუალო მომსახურება',
      'services.seo_description': 'რიტუალ სერვისი წარმოადგენს პროფესიონალურ სარიტუალო მომსახურების კომპანიას, სადაც მიიღებთ ყველა საჭირო მომსახურებას დაკრძალვის (dakrdzalva) ორგანიზებისთვის. ჩვენ ვზრუნავთ მიცვალებულის (micvalebuli) ღირსეულ მომზადებაზე და სამგლოვიარო ცერემონიების (samgloviaro) ორგანიზებაზე.',
      'services.main_services_title': 'ძირითადი სარიტუალო სერვისები:',
      'services.additional_services_title': 'დამატებითი სერვისები:',
      'services.advantages_title': 'ჩვენი უპირატესობები:',
      'services.branches_title': 'ფილიალები თბილისში:',
      'services.seo_conclusion': 'რიტუალ სერვისი უზრუნველყოფს ღირსეულ სამგლოვიარო ცერემონიებს (samgloviaro cerimoniis) და კომპლექსურ დასაფლავების მომსახურებას (dasaflaveba momsaxureba). ჩვენი კომპანია - თქვენი დანდობილი პარტნერი რთულ დროს.',
      
      // Service Features
      'services.features.long_term_storage': 'ხანგრძლივი შენახვა',
      'services.features.hygienic_preparation': 'ჰიგიენური მომზადება',
      'services.features.professional_approach': 'პროფესიონალური მიდგომა',
      'services.features.modern_hearses': 'თანამედროვე კატაფალკები',
      'services.features.24_7_availability': '24/7 ხელმისაწვდომობა',
      'services.features.any_direction': 'ნებისმიერ მიმართულებით',
      'services.features.dignified_preparation': 'ღირსეული მომზადება',
      'services.features.quality_materials': 'ხარისხიანი მასალები',
      'services.features.regional_transportation': 'რაიონში გადასვენება',
      'services.features.international_transportation': 'საზღვარგარეთ გადასვენება',
      'services.features.all_documents': 'ყველა საჭირო დოკუმენტი',
      'services.features.colored_photo': 'ფერადი სურათის დამზადება',
      'services.features.metal_letters': 'ლითონის ასოებით წარწერა',
      'services.features.artistic_ornaments': 'ხელოვნური ორნამენტები',
      'services.features.landscape_design': 'ლანდშაფტური დიზაინი',
      'services.features.stone_work': 'ქვის მუშაობა',
      'services.features.complex_service': 'კომპლექსური მომსახურება',
      'services.features.dignified_environment': 'ღირსეული გარემო',
      'services.features.full_service': 'სრული მომსახურება',
      'services.features.flexible_schedule': 'მოქნილი გრაფიკი',
      'services.features.large_capacity': 'დიდი ტევადობა',
      
      // Product Hero Keywords
      'products.coffins.hero_keywords': 'ხარისხიანი ხის სასახლეები ბუნებრივი მასალებით. ლუქს კლასის სასახლეები და ეკონომ კლასის სასახლეები ყველა ფასის კატეგორიაში.',
      'products.shrouds.hero_keywords': 'ბამბის სუდარები ბუნებრივი მასალებით. სილკის სუდარები ხარისხიანი ქსოვილით და ხელოვნური ქსოვილის სუდარები გამძლე მასალებით.',
      
      // Shrouds Product Detail Translations
      'products.shrouds.hero_description_1': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ სუდარებს, სუდარა არის ქრისტიანული წესის განუყოფელი ნაწილი - ის მიცვალებულს ფარავს როგორც სიმშვიდისა და სიწმინდის ნიშანი.',
      'products.shrouds.hero_description_2': 'ჩვენ გთავაზობთ: ტრადიციულ და რბილ ქსოვილზე დამზადებულ სუდარებს, ჯვრით, გამოსახულებით ან მინიმალისტური დიზაინით, სხვადასხვა ზომა და საფასო კატეგორია, ადგილზე მიტანა დაკრძალვამდე.',
      'products.shrouds.types_section_title': 'სუდარა არ არის მხოლოდ გადასაფარებელი - ის რწმენის და უკანასკნელი გზის სიმბოლოა.',
      'products.shrouds.types.traditional': 'ტრადიციული',
      'products.shrouds.types.traditional_materials': 'რბილი ქსოვილზე დამზადებული სუდარები ჯვრით და გამოსახულებით.',
      'products.shrouds.types.minimalist': 'მინიმალისტური',
      'products.shrouds.types.minimalist_materials': 'მინიმალისტური დიზაინის სუდარები ხარისხიანი ქსოვილით.',
      'products.shrouds.types.special': 'სპეციალური',
      'products.shrouds.types.special_materials': 'სპეციალური დიზაინის სუდარები ინდივიდუალური მოთხოვნებისთვის.',
      'products.shrouds.consultation_text_1': 'თუ არ იცით როგორ შეარჩიოთ - ჩვენი კონსულტანტი დაგეხმარებათ არჩევანში.',
      'products.shrouds.consultation_text_2': 'ადგილზე მიტანა შესაძლებელია თბილისში და რეგიონებში. დეტალური ინფორმაციისთვის დაგვიკავშირდით ნომერზე',
                  'products.refrigeration.hero_keywords': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ უმაღლესი ხარისხის სასახლე მაცივარს, რომელიც უზრუნველყოფს გარდაცვლილის დროებით დაყოვნებას დაკრძალვამდე',
      'products.cemetery_accessories.hero_keywords': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ სასაფლაოს აქსუსეუარებს აქსესუარები ქმნიან მთლიან, სუფთა და მოწესრიგებულ გარემოს, სადაც ახლობლებს შეუძლიათ ღირსეულად გამოხატონ პატივისცემა',
      
      // Coffins Product Detail Translations
      'products.coffins.seo_header': 'სასახლეები - sasaxleebi თბილისში ხარისხიანი მასალებით',
      'products.coffins.hero_description_1': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ სრულად ორგანიზებულ და ღირსეულ მომსახურებას.',
      'products.coffins.hero_description_2': 'ჩვენს ბიუროში შეგიძლიათ შეიძინოთ მაღალი ხარისხის სხვადასხვა დიზაინის სასახლეები, რომლებიც პასუხობს როგორც ტრადიციულ, ისე თანამედროვე მოთხოვნებს.',
      'products.coffins.types_section_title': 'ჩვენს ბიუროში წარმოდგენილია, ქართული, იტალიური და უკრაინული სასახლეები',
      'products.coffins.types.georgian': 'ქართული',
      'products.coffins.types.georgian_materials': 'მასალა - წიფელი, წაბლი, მუხა, კაკალი, ფიჭვი.',
      'products.coffins.types.italian': 'იტალიური',
      'products.coffins.types.italian_materials': 'მასალა - წიფელი, წაბლი, მუხა, კაკალი, ფიჭვი',
      'products.coffins.types.ukrainian': 'უკრაინული',
      'products.coffins.types.ukrainian_materials': 'მასალა - ფიჭვი.',
      'products.coffins.consultation_text_1': 'თუ არ იცით როგორ შეარჩიოთ - ჩვენი კონსულტანტი დაგეხმარებათ არჩევანში.',
      'products.coffins.consultation_text_2': 'ადგილზე მიტანა შესაძლებელია თბილისში და რეგიონებში. დეტალებზე დაგვიკავშირდით ნომერზე',
      'products.coffins.seo_keywords': 'sasaxleebi, xis sasaxleebi, lux klasis sasaxleebi',
      
      // Other Product SEO Headers
      'products.shrouds.seo_header': 'სუდარები - sudarebi ბუნებრივი მასალებით',
      'products.refrigeration.seo_header': 'სასახლე მაცივრები - sasaxle macivrebi სასახლე-მაცივრები',
      'products.cemetery_accessories.seo_header': 'სასაფლაოს აქსესუარები - sasapleos akseesuarebi ხარისხიანი მასალებით',
      
      // Related Products
      'products.related_products_title': 'სხვა პროდუქტები',
      
      // Other Product SEO Keywords
      'products.shrouds.seo_keywords': 'sudarebi, bambis sudarebi, silkis sudarebi',
      'products.refrigeration.seo_keywords': 'macivrеbi, sasaxle-macivrеbi',
      'products.cemetery_accessories.seo_keywords': 'sasapleos akseesuarebi, jvrebi, saqvaile konstrukciebi, sasantleebi',
      
      // Refrigeration Types Section
                  'products.refrigeration.types_section_title': 'გთავაზობთ ორი სახეობის სასახლე მაცივარს',
      'products.refrigeration.types.american': 'ამერიკული მაცივარი',
      'products.refrigeration.types.american_description': 'ამერიკული მაცივარი - უმაღლესი ხარისხის სასახლე მაცივარი, რომელიც უზრუნველყოფს გარდაცვლილის დროებით დაყოვნებას დაკრძალვამდე.',
      'products.refrigeration.types.standard': 'სტანდარტული მაცივარი',
      'products.refrigeration.types.standard_description': 'სტანდარტული მაცივარი - სანდო და ხარისხიანი მაცივარი ფასი და სასახლის სტილის განსხვავებით.',
      'products.refrigeration.consultation_text_1': 'განსხვავება აღნიშნულ სახეობებში არის ფასი და სასახლის სტილი.',
      'products.refrigeration.consultation_text_2': 'სასახლე მაცივრის მიწოდება შეგვიძლია ნებისმიერ ლოკაციაზე თბილისსა თუ რეგიონებში. დეტალური ინფორმაციის მისაღებად დაგვიკავშირდით ნომერზე',
      
      // Cemetery Accessories Product Detail Translations
      'products.cemetery_accessories.hero_description_1': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ სასაფლაოს აქსუსეუარებს აქსესუარები ქმნიან მთლიან, სუფთა და მოწესრიგებულ გარემოს, სადაც ახლობლებს შეუძლიათ ღირსეულად გამოხატონ პატივისცემა',
      'products.cemetery_accessories.hero_description_2': '',
      'products.cemetery_accessories.types_section_title': 'ჩვენ გთავაზობთ',
      'products.cemetery_accessories.types.crosses': 'ჯვრები',
      'products.cemetery_accessories.types.crosses_materials': '(მარმარილოს და ხის) - ტრადიციული და თანამედროვე ფორმებით, სხვადასხვა ზომასა და დიზაინში.',
      'products.cemetery_accessories.types.flower_structures': 'საყვავილე კონსტრუქციები',
      'products.cemetery_accessories.types.flower_structures_materials': 'ლითონის, ქვის ან კერამიკის, რომლებიც უზრუნველყოფს მუდმივ სისუფთავეს და სიმშვიდეს საფლავზე.',
      'products.cemetery_accessories.types.candles': 'სასანთლეები',
      'products.cemetery_accessories.types.candles_materials': 'მარტივი და ორნამენტული ვარიანტები, რომლებიც თვეობით ინარჩუნებენ სიმყუდროვეს და ლოცვის სივრცეს.',
      'products.cemetery_accessories.types.marble_accessories': 'მარმარილოს აქსესუარები',
      'products.cemetery_accessories.types.marble_accessories_materials': 'ქვის ლარნაკები, ხსოვნის ქვის დაფები, ბორდიურები და სხვა ელემენტები, მორგებული საფლავის დიზაინზე.',
      'products.cemetery_accessories.why_choose_title': 'რატომ უნდა აირჩიოთ ჩვენი პროდუქტი?',
      'products.cemetery_accessories.why_choose.quality': '✔ ხარისხიანი, გამძლე მასალები - ამინდისა და დროის მიმართ მდგრადობა',
      'products.cemetery_accessories.why_choose.variety': '✔ არჩევანის მრავალფეროვნება - ტრადიციული და ინდივიდუალური დიზაინები',
      'products.cemetery_accessories.why_choose.consultation': '✔ დახმარება სწორ არჩევანში - კონსულტაცია სპეციალისტებისგან',
      'products.cemetery_accessories.why_choose.delivery': '✔ ადგილზე მიტანა და მონტაჟი თბილისსა და რეგიონებში',
      'products.cemetery_accessories.final_message': '',
      'products.cemetery_accessories.consultation_text_1': 'გააუმჯობესეთ მემორიალის იერსახე დეტალებით, რომლებიც სიწმინდისა და სიყვარულის ნიშნებად რჩება მრავალი წლის განმავლობაში.',
      'products.cemetery_accessories.consultation_text_2': 'დაგვიკავშირდით დეტალებისთვის',
      
      // Coffin Types Section
      'coffin_types.title': 'ჩვენს ბიუროში წარმოდგენილია, ქართული, იტალიური და უკრაინული სასახლეები',
      'coffin_types.georgian': 'ქართული',
      'coffin_types.italian': 'იტალიური',
      'coffin_types.ukrainian': 'უკრაინული',
      'coffin_types.georgian_desc': 'წიფელი,წაბლი,მუხა,კაკალი,ფიჭვი მასალისგან დამზადებული სასახლეები',
      'coffin_types.italian_desc': 'წიფელი,წაბლი,მუხა,კაკალი,ფიჭვი მასალისგან დამზადებული სასახლეები',
      'coffin_types.ukrainian_desc': 'ფიჭვი მასალისგან დამზადებული სასახლეები',
      'coffin_types.consultation_text': 'თუ არ იცით როგორ შეარჩიოთ - ჩვენი კონსულტანტი დაგეხმარებათ არჩევანში.',
      'coffin_types.delivery_text': 'ადგილზე მიტანა შესაძლებელია თბილისში და რეგიონებში. დეტალებზე დაგვიკავშირდით ნომერზე',
      
      // Service Categories
      'services.category.primary': 'ძირითადი სერვისები',
      'services.category.transport': 'ტრანსპორტული სერვისები',
      'services.category.memorial': 'მემორიალური სერვისები',
      'services.category.halls': 'დარბაზები და ღონისძიებები',
      
      // Service Details Section
      'services.our_services_title': 'ჩვენს მიერ მოწოდებული სერვისები',
      'services.our_services_description': 'რიტუალური სერვისები გთავაზობთ მომსახურების ფართო სპექტრს, ჩვენი გუნდი მზად არის დაგეხმაროთ რთულ სიტუაციაში.',
      
      // Service Plan List
      'services.plan_list.agent_visit': 'ჩვენი აგენტის პირადი ვიზიტი თქვენთან ცერემონიის დასაგეგმად.',
      'services.plan_list.dressing_preparation': 'გარდაცვლილის ჩაცმა მოწესრიგება.',
      'services.plan_list.embalming': 'ბალზამირება.',
      'services.plan_list.hearse_service': 'კატაფალკის მომსახურება.',
      'services.plan_list.lifting_machine': 'ჩასასვენებელი ლიფტი.',
      'services.plan_list.halls': 'საპანაშვიდე და საბანკეტო დარბაზი.',
      'services.plan_list.transportation': 'რაიონში ან საზღვარგარეთ გადასვენება.',
      'services.plan_list.grave_preparation': 'სამარხის გაჭრა.',
      'services.plan_list.stone_engraving': 'ქვაზე ხატვა.',
      'services.plan_list.colored_photo': 'ფერადი სურათის დამზადება.',
      'services.plan_list.metal_letters': 'ლითონის ასოებით წარწერა.',
      
      // Detailed Service Descriptions
      'services.agent_service.title': 'აგენტის მომსახურება - 24/7',
      'services.agent_service.description': 'ჩვენი დამკრძალავი ბიუროს გამოცდილი აგენტები 24 საათის განმავლობაში მზად არიან გაგიწიონ სრული დახმარება მძიმე წუთებში. ჩვენ გთავაზობთ როგორც პირად ვიზიტს თქვენს მისამართზე, ისე სატელეფონო კონსულტაციას, რათა დაგეხმაროთ სარიტუალო პროცედურების დაგეგმვაში. აგენტი გაგიწევთ დეტალურ კონსულტაციას, დაგეხმარებათ ყველა საჭირო დოკუმენტის მომზადებაში და უზრუნველყოფს ცერემონიის ორგანიზებას თქვენი სურვილის შესაბამისად. ჩვენი მიზანია, შეგიმსუბუქოთ ეს რთული პროცესი და უზრუნველვყოთ ღირსეული და პატივსაცემი გამოსამშვიდობებელი ცერემონია. დაგვიკავშირდით ნებისმიერ დროს - ჩვენ თქვენს გვერდით ვართ.',
      'services.agent_service.alt': 'აგენტის მომსახურება - რიტუალ სერვისი',
      
      'services.dressing_service.title': 'ჩაცმა და მოწესრიგება',
      'services.dressing_service.description': 'ჩვენი პროფესიონალთა გუნდი უზრუნველყოფს მიცვალებულის ჩაცმასა და მოწესრიგებას მაღალი ღირსებისა და პატივისცემის შესაბამისად. პროცესი მოიცავს ჰიგიენურ მომზადებას, ტანსაცმლის შერჩევასა და მოწესრიგებას ოჯახთან შეთანხმებით, თმის დავარცხნას, მაკიაჟის გაკეთებას (საჭიროების მიხედვით) და სახის მშვიდი გამომეტყველების უზრუნველყოფას. ჩვენ ვზრუნავთ, რომ განსვენებული მოწესრიგებულად და ღირსეულად გამოიყურებოდეს, რათა ოჯახმა და ახლობლებმა შეძლონ ღირსეული გამომშვიდობება. მთელი პროცესი კეთილშობილური დამოკიდებულებით და სათანადო სიფრთხილით ტარდება, რათა პატივი მიაგონ მიცვალებულს და მისი ოჯახისთვის სიმშვიდის შეგრძნება შევქმნათ.',
      'services.dressing_service.alt': 'მიცვალებულის ჩაცმა და მოწესრიგება',
      
      'services.embalming_service.title': 'ბალზამირება',
      'services.embalming_service.description': 'ბალზამირება არის სპეციალური პროცედურა, რომელიც უზრუნველყოფს მიცვალებულის სხეულის დროებით შენახვას, ბუნებრივი ცვლილებების შეფერხებას და ესთეტიკური იერის დაცვას. ჩვენი კვალიფიციური სპეციალისტები იყენებენ თანამედროვე ტექნიკასა და ჰიგიენურ საშუალებებს, რათა სხეული შენარჩუნდეს უსაფრთხოდ. პროცესი მოიცავს სისხლის ჩანაცვლებას კონსერვაციის სპეციალური ხსნარით, კანის დატენიანებას და საჭიროებისამებრ კოსმეტიკურ აღდგენას. ბალზამირება განსაკუთრებით მნიშვნელოვანია მაშინ, როდესაც ცერემონია დაგეგმილია რამდენიმე დღეში ან მოითხოვს ტრანსპორტირებას. ჩვენ ვზრუნავთ, რომ განსვენებული დარჩეს მშვიდ და ბუნებრივ მდგომარეობაში, რაც ოჯახსა და ახლობლებს ღირსეული გამოსამშვიდობებლის საშუალებას აძლევს.',
      'services.embalming_service.alt': 'ბალზამირების სერვისი - რიტუალ სერვისი',
      
      'services.hearse_service.title': 'კატაფალკის მომსახურება',
      'services.hearse_service.description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ კატაფალკის მომსახურებას, რომელიც უზრუნველყოფს მიცვალებულის ღირსეულ და უსაფრთხო გადაყვანას დაკრძალვამდე.',
      'services.hearse_service.care_respect_header': 'სიფრთხილე და პატივისცემა თითოეული შემთხვევის მიმართ',
      'services.hearse_service.specialized_vehicle': 'სპეციალურად აღჭურვილი ავტომობილი',
      'services.hearse_service.service_georgia': 'მომსახურება მთელი საქართველოს მასშტაბით',
      'services.hearse_service.final_message': 'ჩვენი მიზანია მაქსიმალური კომფორტი და სანდოობა თქვენი ოჯახისთვის ამ რთულ დროს. დაგვიკავშირდით 24/7',
      'services.hearse_service.alt': 'კატაფალკის მომსახურება - რიტუალ სერვისი',
      
      'services.transportation_service.title': 'გადასვენება',
      'services.transportation_service.description': 'მიცვალებულის გადაასვენება - ნებისმიერი ლოკაციიდან, ნებისმიერი ლოკაციაზე',
      'services.transportation_service.full_preparation_header': 'გთავაზობთ მიცვალებულის გადაასვენებას სერვისს საქართველოს მასშტაბით - თბილისიდან რეგიონებში, რეგიონებიდან თბილისში, ან სხვა საჭირო მისამართებზე.',
      'services.transportation_service.specialized_vehicle': 'სპეციალურად აღჭურვილი ავტომობილი',
      'services.transportation_service.hygienic_conditions': 'ჰიგიენური და უსაფრთხო პირობები',
      'services.transportation_service.24_7_call': '24/7 გამოძახება',
      'services.transportation_service.reliable_service': 'სანდო და პატივისცემით შესრულებული მომსახურება',
      'services.transportation_service.final_message': 'თქვენი ოჯახის ტკივილი გვესმის - გადაასვენების პროცესს მივუდგებით სრული პასუხისმგებლობით. დაგვიკავშირდით ნებისმიერ დროს - ჩვენ მზად ვართ დაგეხმაროთ.',
      'services.transportation_service.alt': 'გადასვენების სერვისი - რიტუალ სერვისი',
      
      'services.stone_engraving_service.title': 'ქვაზე ხატვა',
      'services.stone_engraving_service.description': 'ჩვენი ხელოვნური გუნდი უზრუნველყოფს ქვაზე პროფესიონალურ ხატვას და გრავიურას. ჩვენ ვიყენებთ თანამედროვე ტექნოლოგიებს და ხარისხიან მასალებს, რათა შევქმნათ ხანგრძლივი და ღირსეული ნაწარმოები. ჩვენი სერვისი მოიცავს ფერადი სურათის დამზადებას, ლითონის ასოებით წარწერას და ხელოვნურ ორნამენტებს. ჩვენ ვმუშაობთ ყველა სახის ქვაზე და ვუზრუნველყოფთ მაღალი ხარისხის შედეგს. ჩვენი გუნდი ზრუნავს ყველა დეტალზე, რათა შედეგი იყოს ღირსეული და ხანგრძლივი.',
      'services.stone_engraving_service.alt': 'ქვაზე ხატვა - რიტუალ სერვისი',
      
      'services.grave_decoration_service.title': 'საფლავის მოპირკეთება',
      'services.grave_decoration_service.description': 'ჩვენ ვთავაზობთ საფლავის კომპლექსურ მოპირკეთებას და მემორიალურ სამუშაოებს. ჩვენი გუნდი უზრუნველყოფს ყველა საჭირო სამუშაოს - სამარხის გაჭრას, ბეტონით მოწყობას, ქვის მუშაობას და ლანდშაფტურ დიზაინს. ჩვენ ვიყენებთ ხარისხიან მასალებს და თანამედროვე ტექნოლოგიებს, რათა შევქმნათ ღირსეული და ხანგრძლივი მემორიალი. ჩვენი სერვისი მოიცავს ყველა საჭირო მომზადებას და უზრუნველყოფს მაღალი ხარისხის შედეგს.',
      'services.grave_decoration_service.alt': 'საფლავის მოპირკეთება - რიტუალ სერვისი',
      
      'services.mourning_hall_service.title': 'საპანაშვიდე დარბაზი',
      'services.mourning_hall_service.description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ საპანაშვიდე დარბაზების არჩევანს',
      'services.mourning_hall_service.full_preparation_header': 'გთავაზობთ სრულად აღჭურვილ საპანაშვიდე დარბაზს, სადაც მიცვალებულის დაკრძალვამდე შესაძლებელია:',
      'services.mourning_hall_service.rest_card': 'დასვენება მშვიდ და მოწესრიგებულ გარემოში',
      'services.mourning_hall_service.guests_card': 'სტუმრების მიღება სითბოსა და სისუფთავეში',
      'services.mourning_hall_service.tradition_card': 'ტრადიციული წესის დაცვით პანაშვიდის ჩატარება',
      'services.mourning_hall_service.infrastructure_card': 'წყნარი ატმოსფერო და სრულად უზრუნველყოფილი ინფრასტრუქტურა (სკამები, განათება, ჰაერის ვენტილაცია)',
      'services.mourning_hall_service.final_message': 'დარბაზი მზად არის 24/7 დარბაზები მდებარებოს ლოკაციებზე •გლდანი გრიგოლ ოშკელის 4 •დიღომი ბოხუას14, ჯიქია საშა იოსელიანის 96 ჩვენ ვიზრუნებთ სივრცეზე, სადაც ღირსეულად გამოემშვიდობებით საყვარელ ადამიანს. წინასწარ დაჯავშნა რეკომენდებულია, დაგვიკავშირდით ნომერზე',
      'services.mourning_hall_service.alt': 'საპანაშვიდე დარბაზი - რიტუალ სერვისი',
      
      'services.banquet_hall_service.title': 'საბანკეტო დარბაზი',
      'services.banquet_hall_service.description': 'ჩვენი საბანკეტო დარბაზი იდეალურია მემორიალური ღონისძიებებისთვის. დარბაზი აქვს დიდი ტევადობა და აღჭურვილია ყველა საჭირო აღჭურვილობით. ჩვენ ვთავაზობთ სრულ მომსახურებას, მათ შორის კვების მომზადებას, მაგიდების მოწყობას და ყველა საჭირო დეტალის ორგანიზებას. ჩვენი გუნდი უზრუნველყოფს მაღალი ხარისხის მომსახურებას და ზრუნავს ყველა დეტალზე, რათა ღონისძიება წარმატებით ჩატარდეს.',
      'services.banquet_hall_service.alt': 'საბანკეტო დარბაზი - რიტუალ სერვისი',
      
      'services.grave_preparation_service.title': 'სამარხის გაჭრა',
      'services.grave_preparation_service.description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ სამარხის გაჭრის მომსახურებას დაკრძალვის პროცესია წარმართვისთვის. სამარხის მომზადება ითხოვს სიზუსტეს, გამოცდილებას და მაღალი პასუხისმგებლობის განცდას - და სწორედ ამას გთავაზობთ ჩვენ.',
      'services.grave_preparation_service.long_description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ სამარხის გაჭრის მომსახურებას დაკრძალვის პროცესია წარმართვისთვის. სამარხის მომზადება ითხოვს სიზუსტეს, გამოცდილებას და მაღალი პასუხისმგებლობის განცდას - და სწორედ ამას გთავაზობთ ჩვენ.',
      'services.grave_preparation_service.feature_1': 'სამარხის გაჭრა საჭირო ზომების მიხედვით (ერთადგილიანი, ორადგილიანი, ოჯახური საფლავები)',
      'services.grave_preparation_service.feature_2': 'მიწის სწორად გათხრა, გადატანა და მოსწორება',
      'services.grave_preparation_service.feature_3': 'საჭიროების შემთხვევაში მდგრადი კონსტრუქციის მოწყობა (ბეტონის გადახურვა ან კედლები)',
      'services.grave_preparation_service.feature_4': 'დაკრძალვის დღეს დროული მზადყოფნა - ყველაფერი იქნება მოწესრიგებული განსაზღვრულ დროზე ადრე',
      'services.grave_preparation_service.process_1': 'ტრადიციული და რელიგიური წესების გათვალისწინებით',
      'services.grave_preparation_service.process_2': 'დეტალური ინფორმაციის მისაღებად დაგვიკავშირდით ნომერზე',
      'services.grave_preparation_service.service_details_header': 'მომსახურების დეტალები',
      'services.grave_preparation_service.alt': 'სამარხის გაჭრა - რიტუალ სერვისი',
      
      'services.colored_photo_service.title': 'ფერადი სურათის დამზადება',
      'services.colored_photo_service.description': 'ჩვენი სპეციალისტები უზრუნველყოფენ ფერადი სურათის მაღალი ხარისხის დამზადებას ქვაზე. ჩვენ ვიყენებთ თანამედროვე ტექნოლოგიებს და ხარისხიან მასალებს, რათა შევქმნათ ხანგრძლივი და ღირსეული ნაწარმოები. ჩვენი სერვისი მოიცავს ფოტოს დამუშავებას, ქვაზე გადატანას და ფერების დაცვას. ჩვენ ვმუშაობთ ყველა სახის ქვაზე და ვუზრუნველყოფთ მაღალი ხარისხის შედეგს. ჩვენი გუნდი ზრუნავს ყველა დეტალზე, რათა შედეგი იყოს ღირსეული და ხანგრძლივი.',
      'services.colored_photo_service.alt': 'ფერადი სურათის დამზადება - რიტუალ სერვისი',
      
      'services.metal_letters_service.title': 'ლითონის წარწერები',
      'services.metal_letters_service.description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ საფლავის ქვაზე მისაკრავ წაწერებს, გვქვს ალუმინის და ლატუნუს მასალისგან დამზადებული წარწერები.',
      'services.metal_letters_service.alt': 'ლითონის წარწერები - რიტუალ სერვისი',
      'services.metal_letters_service.long_description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ საფლავის ქვაზე მისაკრავ წაწერებს, გვქვს ალუმინის და ლატუნუს მასალისგან დამზადებული წარწერები. წარწერები სხვადასხვა სტილში და შრიფტით - ქართული, რუსული, ინგლისური ან სხვა ენაზე. კლასიკური და თანამედროვე დიზაინები. ლაზერული ან მექანიკური წარწერა პირდაპირ ქვის ზედაპირზე. დაბადების და გარდაცვალების თარიღები, სახელები, ციტატები, ლოცვები ან პერსონალური ტექსტები. ასოები მზადდება გამძლე, ამინდისადმი მედეგი მასალებით. თითოეული წარწერა იფიქრება ინდივიდუალურად - მორგებული ქვის ზომაზე, ფორმასა და სტილზე. შერჩევა ხდება პროფესიონალის დახმარებით - სწორი შრიფტის, ზომისა და განლაგების მიხედვით.',
      'services.metal_letters_service.feature_1': 'წარწერები სხვადასხვა სტილში და შრიფტით - ქართული, რუსული, ინგლისური ან სხვა ენაზე',
      'services.metal_letters_service.feature_2': 'კლასიკური და თანამედროვე დიზაინები',
      'services.metal_letters_service.feature_3': 'ლაზერული ან მექანიკური წარწერა პირდაპირ ქვის ზედაპირზე',
      'services.metal_letters_service.feature_4': 'დაბადების და გარდაცვალების თარიღები, სახელები, ციტატები, ლოცვები ან პერსონალური ტექსტები',
      'services.metal_letters_service.process_1': 'მასალები და დამზადების მეთოდები',
      'services.metal_letters_service.materials_methods_1': 'ასოები მზადდება გამძლე, ამინდისადმი მედეგი მასალებით',
      'services.metal_letters_service.materials_methods_2': 'თითოეული წარწერა იფიქრება ინდივიდუალურად - მორგებული ქვის ზომაზე, ფორმასა და სტილზე',
      'services.metal_letters_service.materials_methods_3': 'შერჩევა ხდება პროფესიონალის დახმარებით - სწორი შრიფტის, ზომისა და განლაგების მიხედვით',
      'services.metal_letters_service.process_2': 'დეტალური ინფორმაციის მისაღევად დაგვიკავშორდით ნომერზე',

      // Individual Services Section
      'services.individual_services_title': 'ჩვენი სერვისები',
      'services.individual_services_description': 'პროფესიონალური სარიტუალო მომსახურება 24/7 - ყველა საჭირო სერვისი ერთ ადგილას',

      // Individual Service Titles and Descriptions
      'services.agent_visit.title': 'აგენტის პირადი ვიზიტი',
      'services.agent_visit.description': 'ჩვენი აგენტის პირადი ვიზიტი თქვენთან ცერემონიის დასაგეგმად. პროფესიონალური კონსულტაცია და დაგეგმვა 24/7.',

      'services.dressing.title': 'მიცვალებულის ჩაცმა მოწესრიგება',
      'services.dressing.description': 'გარდაცვლილის ჩაცმა მოწესრიგება. ღირსეული და პატივსაცემი მომზადება ოჯახის სურვილის შესაბამისად.',

      'services.embalming.title': 'ბალზამირება',
      'services.embalming.description': 'ბალზამირება. პროფესიონალური მომზადება და შენახვა თანამედროვე ტექნოლოგიებით.',

      'services.hearse.title': 'კატაფალკის მომსახურება',
      'services.hearse.description': 'კატაფალკის მომსახურება. თანამედროვე კატაფალკები ნებისმიერ მიმართულებით 24/7.',

      'services.lifting_machine.title': 'ჩასასვენებელი ლიფტი',
      'services.lifting_machine.description': 'ჩასასვენებელი ლიფტი. პროფესიონალური აღჭურვილობა უსაფრთხო ტრანსპორტირებისთვის.',

      'services.halls.title': 'საპანაშვიდე და საბანკეტო დარბაზი',
      'services.halls.description': 'საპანაშვიდე და საბანკეტო დარბაზი. ღირსეული გარემო ცერემონიებისთვის და მემორიალური ღონისძიებებისთვის.',

      'services.transportation.title': 'გადასვენება რაიონში და საზღვარგარეთ',
      'services.transportation.description': 'რაიონში ან საზღვარგარეთ გადასვენება. ყველა საჭირო დოკუმენტის მომზადება და უსაფრთხო ტრანსპორტირება.',

      'services.grave_preparation.title': 'სამარხის გაჭრა',
      'services.grave_preparation.description': 'სამარხის გაჭრა. პროფესიონალური მომსახურება დაკრძალვის პროცესისთვის.',

      'services.stone_engraving.title': 'ქვაზე ხატვა',
      'services.stone_engraving.description': 'ქვაზე ხატვა. პროფესიონალური ხელოვნური მუშაობა თანამედროვე ტექნოლოგიებით.',

      'services.colored_photo.title': 'ფერადი სურათის დამზადება',
      'services.colored_photo.description': 'ფერადი სურათის დამზადება. ხარისხიანი ფოტოები ხანგრძლივი შენახვისთვის.',

      'services.metal_letters.title': 'ლითონის წარწერები',
      'services.metal_letters.description': 'ლითონის წარწერები. ხანგრძლივი და ღირსეული წარწერები ლითონის ასოებით.',
      
      // New service translations for breadcrumb
      'services.embalming_dressing_service.title': 'ბალზამირება, გრიმი, ჩაცმა',
      'services.embalming_dressing_service.description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ პროფესიონალურ მოსამზადებელ მომსახურებას დაკრძალვამდე.',
      'services.embalming_dressing_service.full_preparation_header': 'მიცვალებულის სრული მომზადება, მოწესრიგება დაკრძალვამდე:',
      'services.embalming_dressing_service.embalming_card': 'ბალზამირება - ჩვენი გუნდის წევრი ექიმი უზრუნველყოფს ბალზამირების პროხესს, სხეულის ღირსეულ შენარჩუნებას დროის გადავადების მიზნით',
      'services.embalming_dressing_service.makeup_card': 'გრიმი - სახის მსუბუქი აღდგენა საჭიროების შემთხვევაში',
      'services.embalming_dressing_service.dressing_card': 'ჩაცმა- მიცვალებულის ჩაცმა, მოწესრიგება',
      'services.embalming_dressing_service.final_message': 'მძიმე წუთებში, ჩვენ ვიზრუნებთ ყველა დეტალზე - სრული სანდოობით. მომსახურება 24/7 მთელი საქართველოს მასშტაბით დეტალური ინფორმაციის მისაღებად დაგვიკავშირდით ნომერზე',
      'services.microbus_service.title': 'მარშუტკა',
      'services.microbus_service.description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ მარშუტკის მომსახურების სერვისს. სტუმრების უსაფრთხო და კომფორტული გადაყვანა.',
      'services.microbus_service.long_description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ მარშუტკის მომსახურების სერვისს. სტუმრების უსაფრთხო და კომფორტული გადაყვანა.',
      'services.microbus_service.full_preparation_header': 'გთავაზობთ მარშუტკის მომსახურებას სტუმრების გადასაყვანად დაკრძალვის დღეს',
      'services.microbus_service.comfortable_modern': 'კომფორტული და თანამედროვე სტილის მარშუტკა',
      'services.microbus_service.safe_travel': 'უსაფრთხო მგზავრობა ნებისმიერ მანძილზე',
      'services.microbus_service.timely_reliable': 'დროული და სანდო მომსახურება',
      'services.microbus_service.tbilisi_regions': 'მომსახურება თბილისსა და რეგიონებში',
      'services.microbus_service.final_message': 'დაგვიკავშირდით და ჩვენ ვიზრუნებთ სტუმართა მარტივ და უსაფრთხო გადაადგილებაზე. 24/7 გამოძახება.',
      'services.hall_service.title': 'დარბაზი',
      'services.hall_service.description': 'გთავაზობთ სრულად აღჭურვილ დარბაზს, სადაც შეგიძლიათ შეხვდეთ და მიიღოთ სტუმრები დაკრძალვის შემდეგ მშვიდ, მოწესრიგებულ და სოლიდურ გარემოში.',
      'services.hall_service.long_description': 'გთავაზობთ სრულად აღჭურვილ დარბაზს, სადაც შეგიძლიათ შეხვდეთ და მიიღოთ სტუმრები დაკრძალვის შემდეგ მშვიდ, მოწესრიგებულ და სოლიდურ გარემოში. ჩვენი დარბაზი შექმნილია იმისთვის, რომ ეს მძიმე წუთებში შეძლოთ ყველა სერვისის ერთ სივრცეში მიღება. წინასწარ დაჯავშნა აუცილებელია დაგვიკავშირდით ნომერზე +995 557 55 61 16.',
      'services.hall_service.process_1': 'საბანკეტო დარბაზი',
      'services.hall_service.process_2': 'ჩვენი დარბაზი შექმნილია იმისთვის, რომ ეს მძიმე წუთებში შეძლოთ ყველა სერვისის ერთ სივრცეში მიღება. წინასწარ დაჯავშნა აუცილებელია დაგვიკავშირდით ნომერზე +995 557 55 61 16.',
      'services.hall_service.feature_1': 'კომფორტული სივრცე',
      'services.hall_service.feature_2': 'ყველა საჭირო ინფრასტრუქტურით უზრუნველყოფილი',
      'services.hall_service.feature_3': 'მოსახერხებელი მდებარეობა',
      'services.hall_service.feature_4': '24/7 წვდომა და მომსახურება',
      'services.lifting_machine_service.title': 'ჩასასვენებელი ლიფტი',
      'services.lifting_machine_service.description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ ჩასასვენებელ ლიფტს ჩვენ გთავაზობთ მიცვალებულის ჩასასვენებელი ლიფტის მომსახურებას, რომელიც უზრუნველყოფს კუბოს უსაფრთხო, მოწესრიგებულ და ღირსეულ დაშვებას სამარხში.',
      'services.lifting_machine_service.long_description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ ჩასასვენებელ ლიფტს ჩვენ გთავაზობთ მიცვალებულის ჩასასვენებელი ლიფტის მომსახურებას, რომელიც უზრუნველყოფს კუბოს უსაფრთხო, მოწესრიგებულ და ღირსეულ დაშვებას სამარხში.',
      'services.lifting_machine_service.process_1': 'ჩასასვენებელი ლიფტი',
      'services.lifting_machine_service.process_2': 'ჩასასვენებელი ლიფტი არა მხოლოდ ამსუბუქებს პროცესს, არამედ ქმნის მოწესრიგებულ, სოლიდურ გარემოს დაკრძალვის ცერემონიალზე. დაგვიკავშირდით ნომერზე',
      'services.lifting_machine_service.feature_1': 'უსაფრთხო და ღირსეული დაშვება',
      'services.lifting_machine_service.feature_2': 'პროფესიონალური მომსახურება',
      'services.lifting_machine_service.feature_3': 'მოწესრიგებული პროცესი',
      'services.lifting_machine_service.feature_4': '24/7 ხელმისაწვდომობა',
      'services.cemetery_decoration_service.title': 'სასაფლაოს მოპირკეთება',
      'services.cemetery_decoration_service.description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ პროფესიონალი ხელოსნების ჯგუფის მიერ სასაფლაოს მოპირკეთების სერვისს, რომელიც განკუთვნილია თქვენი საყვარელი ადამიანის საფლავის ღირსეულად და სამარადისოდ მოწესრიგებისთვის.',
      'services.cemetery_decoration_service.long_description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ პროფესიონალი ხელოსნების ჯგუფის მიერ სასაფლაოს მოპირკეთების სერვისს, რომელიც განკუთვნილია თქვენი საყვარელი ადამიანის საფლავის ღირსეულად და სამარადისოდ მოწესრიგებისთვის.',
      'services.cemetery_decoration_service.full_preparation_header': 'რას მოიცავს ჩვენი მომსახურება?',
      'services.cemetery_decoration_service.high_quality_materials_header': 'მოპირკეთება მაღალი ხარისხის მასალებით:',
      'services.cemetery_decoration_service.high_quality_materials_desc': 'ვმუშაობთ სხვადასხვა სახეობის ქვით - მარმარილოთი, გრანიტით, გაბრო ლაბრადორი… თითოეული მასალა გამოირჩევა სიდიდით, გამძლეობით და უნიკალური იერით, რაც საშუალებას გაძლევთ აირჩიოთ ის, რაც თქვენს მოთხოვნებსა და ბიუჯეტს საუკეთესოდ შეესაბამება.',
      'services.cemetery_decoration_service.individual_approach_header': 'სრულად ინდივიდუალური მიდგომა:',
      'services.cemetery_decoration_service.individual_approach_desc': 'ჩვენი სპეციალისტები დაგეხმარებიან დიზაინის არჩევაში და მოგიწოდებენ საუკეთესო გადაწყვეტილებებს, რომლებიც შეესაბამება როგორც ტრადიციულ, ისე თანამედროვე სტილს.',
      'services.cemetery_decoration_service.full_spectrum_header': 'სამუშაოს სრული სპექტრი:',
      'services.cemetery_decoration_service.full_spectrum_desc': 'საფლავის მოასფალტება, ბორდიურების დაყენება, საფლავის საფარის მოწყობა, ქვის დამუშავება და პროფესიონალური მოპირკეთება.',
      'services.cemetery_decoration_service.long_term_result_header': 'გრძელვადიანი შედეგი:',
      'services.cemetery_decoration_service.long_term_result_desc': 'ჩვენი გამოყენებული მასალები და ტექნოლოგიები უზრუნველყოფენ, რომ სასაფლაომ არ დაკარგოს თავისი გარეგნობა და ფუნქციურობა წლების განმავლობაში, წინააღმდეგობის გაწევით ამინდისა და სხვა ზემოქმედებების მიმართ.',
      'services.cemetery_decoration_service.why_choose_header': 'რატომ უნდა აგვირჩიოთ ჩვენ?',
      'services.cemetery_decoration_service.professionalism': '✔ მაღალი პროფესიონალიზმი და გამოცდილება',
      'services.cemetery_decoration_service.affordable_prices': '✔ ხელმისაწვდომი ფასები და გამჭვირვალე ფასდაკლების სისტემა',
      'services.cemetery_decoration_service.reliability': '✔ სრული პასუხისმგებლობა და სანდოობა',
      'services.cemetery_decoration_service.georgia_wide': '✔ მომსახურება მთელ საქართველოში',
      'services.cemetery_decoration_service.timely_completion': '✔ დროული შესრულება და ხარისხზე კონტროლი',
      'services.cemetery_decoration_service.final_message': 'ჩვენი გუნდი მზად არის უპასუხოს ყველა თქვენს კითხვას და დაგეხმაროთ სასაფლაოს მოპირკეთების ნებისმიერ ეტაპზე. დაგვიკავშირდით ნომერზე',
      'services.grave_stones_service.title': 'საფლავის ქვები, ქვაზე ხატვა',
      'services.grave_stones_service.description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ საფლავის ქვებს როგორც დასადგამს ასევე დასადებს. გთავაზობთ ხარისხიან საფლავის ქვებს სხვადასხვა მასალის დიზაინისა და ზომია რათა თქვენ შეძლოთ საყვარელი ადამიანის მემორიალის ღირსეული მოწყობა.',
      'services.grave_stones_service.long_description': 'დამკრძალავი ბიურო რიტუალ სერვისი გთავაზობთ საფლავის ქვებს როგორც დასადგამს ასევე დასადებს. გთავაზობთ ხარისხიან საფლავის ქვებს სხვადასხვა მასალის დიზაინისა და ზომია რათა თქვენ შეძლოთ საყვარელი ადამიანის მემორიალის ღირსეული მოწყობა.',
      'services.grave_stones_service.feature_1': 'მარმარილო - ელეგანტური, სუფთა და კლასიკური მასალა, რომელიც გამორჩეულია სილამაზით და გამძლეობით.',
      'services.grave_stones_service.feature_2': 'ქუთაისის გრანიტი - ძლიერი და ხანგრძლივი ქვა, რომელიც იტანს ნებისმიერ ამინდს და გარეგნობას მრავალი წელი ინარჩუნებს.',
      'services.grave_stones_service.feature_3': 'ბაზალტი - ძლიერი და ხანგრძლივი ქვა, რომელიც იტანს ნებისმიერ ამინდს და გარეგნობას მრავალი წელი ინარჩუნებს.',
      'services.grave_stones_service.feature_4': 'გაბრო და ლაბრადორი - უნიკალური ტექსტურები და ფერების გამა, რომელიც შექმნის განსაკუთრებულ და განსხვავებულ საფლავს.',
      'services.grave_stones_service.process_1': 'საფლავის ქვებზე ხატვა',
      'services.grave_stones_service.process_2': 'ჩვენ გთავაზობთ საფლავის ქვებზე მაღალხარისხიან და დეტალურ ხატვას, რომელიც სრულყოფილად გადმოსცემს მემორიალის მნიშვნელობას და სახელს. ხატვის პროცესი შესრულებულია პროფესიონალთა მიერ, რომელიც გამოიყენებს სპეციალურ, ამინდისადმი გამძლე საღებავებს, რომლებსაც წლების განმავლობაში არ გასცლიათ.',
      'services.grave_stones_service.process_3': 'დაგვიკავშირდით ნომერზე ჩვენი კონსულტანტები სიამოვნებით გაგიწევენ სრულ ინფორმაციას და დაგეხმარებიან იდეალური არჩევანის გაკეთებაში.',
      'services.grave_stones_service.our_products_header': 'ჩვენი პროდუქცია მოიცავს:',
      'services.grave_stones_service.painting_feature_1': 'შავ-თეთრი და ფერადი ხატვა',
      'services.grave_stones_service.painting_feature_2': 'სასულიერო სიმბოლოები, რელიგიური გამოსახულებები',
      'services.grave_stones_service.painting_feature_3': 'პერსონალური პორტრეტები და დეკორატიული ელემენტები',
      'services.grave_stones_service.why_choose_header': 'რატომ გვირჩევენ ჩვენ?',
      'services.grave_stones_service.professionalism': '✔ მრავალწლიანი გამოცდილება და პროფესიონალიზმი',
      'services.grave_stones_service.individual_approach': '✔ ინდივიდუალური მიდგომა და დიზაინის კონსულტაციები',
      'services.grave_stones_service.quality_materials': '✔ ხარისხიანი მასალები და ტექნოლოგიები',
      'services.grave_stones_service.high_standards': '✔ ყველა სამუშაო შესრულებულია მაღალი სტანდარტებით',
      'services.grave_stones_service.convenient_service': '✔ დროული და მოსახერხებელი მომსახურება მთელს საქართველოში',
      'services.related_services': 'სხვა სერვისები',
      'services.gallery': 'ფოტო გალერია'
    },

    en: {
      // Header & Navigation
      'nav.home': 'Funeral Home - Home',
      'nav.home_short': 'Home',
      'header.company_name': 'Ritual Service',
      'loader.title': 'Ritual Service - Funeral Home',
      'nav.services': 'Services',
      'nav.products': 'Products',
      'nav.about': 'About Us',
      'nav.contact': 'Contact',
      'nav.locations': 'Locations',
      'header.call_24_7': 'Call us 24/7',
      'breadcrumb.plan_funeral': 'Plan Funeral',
      
      // Breadcrumb translations for URL segments
      'breadcrumb.coffins': 'Coffins',
      'breadcrumb.shrouds': 'Shrouds',
      'breadcrumb.refrigeration': 'Refrigeration',
      'breadcrumb.cemetery_accessories': 'Cemetery Accessories',
      'breadcrumb.embalming': 'Embalming',
      'breadcrumb.transportation': 'Transportation',
      'breadcrumb.stone_engraving': 'Stone Engraving',
      'breadcrumb.grave_decoration': 'Grave Decoration',
      'breadcrumb.dressing': 'Dressing and Preparation',
      'breadcrumb.mourning_hall': 'Mourning Hall',
      'breadcrumb.banquet_hall': 'Banquet Hall',
      'breadcrumb.metal_letters': 'Metal Inscriptions',
      'breadcrumb.agent_service': 'Agent Service',
      'breadcrumb.lifting_machine': 'Lifting Machine',
      'breadcrumb.colored_photo': 'Colored Photo Production',
      

      // Home Page
      'home.title': 'Ritual Service - Funeral Home',
      'home.subtitle': 'We offer ritual services 24 hours a day',
      'home.funeral_home': 'Funeral Home',
      'home.damkrdzalavi_biuro': 'Professional Funeral Services',
      'home.ritual_house': 'Funeral Services House',
      'home.saritualo_saxli': 'Memorial Service Center',
      'home.funeral_bureau_tbilisi': 'Funeral Bureau in Tbilisi',
      'home.ritual_service_bureau': 'Ritual Service - Funeral Bureau',
      'home.funeral_bureau_services': 'Funeral Bureau Services',
      'home.funeral_bureau': 'Funeral Bureau',
      'home.main_services': 'Our Main Services',
      'home.ritual_products': 'Ritual Products',
      'home.branches_tbilisi': 'Branches in Tbilisi',
      'home.why_leaders': 'Why We Are Leaders',
      'home.20_years_experience': '20 Years of Experience',
      'home.burial_field': 'in the burial field',
      'home.mourning_ceremonies': 'mourning ceremonies',
      'home.burial_services': 'burial services',
      'home.memorial_hall': 'memorial hall',
      'home.banquet_hall': 'banquet hall',
      'home.funeral_services_24_7': '24/7 funeral services',
      'home.trusted_partner': 'your trusted partner',
      'home.by_your_side': 'we are by your side 24 hours a day',
      'home.dressing_deceased': 'Dressing the deceased',
      'home.professional_preparation': 'Professional preparation',
      'home.embalming': 'Embalming',
      'home.hearse_service': 'Hearse service',
      'home.stone_painting': 'Stone painting',
      'home.grave_decoration': 'Grave decoration',
      'home.transportation': 'Transportation',
      'home.colored_photo': 'Colored photo production',
      'home.metal_inscriptions': 'Metal letter inscriptions',
      'home.coffins_all_styles': 'Coffins in all styles',
      'home.shrouds': 'Shrouds',
      'home.traditional_modern': 'Traditional and modern',
      'home.shroud': 'Shroud',
      'home.quality_materials': 'Quality materials',
      'home.coffin_refrigerators': 'Coffin refrigerators',
      'home.gldani': 'Gldani',
      'home.dighomi': 'Dighomi',
      'home.jiqia': 'Jiqia',

      // Services - 14 Service Cards
      'services.coffins': 'Coffins',
      'services.coffin_refrigeration': 'Coffin Refrigeration',
      'services.shrouds': 'Shrouds',
      'services.embalming_dressing': 'Embalming, Makeup, Dressing',
      'services.transportation': 'Transportation',
      'services.mourning_hall': 'Mourning Hall',
      'services.hearse_service': 'Hearse Service',
      'services.marshutka': 'Minibus',
      'services.hall': 'Hall',
      'services.cemetery_decoration': 'Cemetery Decoration',
      'services.grave_stones_painting': 'Grave Stones, Stone Painting',
      'services.grave_excavation': 'Grave Excavation',
      'services.cemetery_accessories': 'Cemetery Accessories',
      'services.lifting_machine': 'Lifting Machine',

      // Products
      'products.coffins': 'Coffins',
      'products.shrouds': 'Shrouds',
      'products.refrigeration': 'Refrigeration',
      'products.cemetery_accessories': 'Cemetery Accessories',
      'header.phone': '+995 557 55 61 16',

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

      // Services Description
      'services.description': 'We offer complete ritual services - everything needed for a dignified and organized ceremony from one place. Our goal is to stand by your side in difficult situations and consider your needs.',

      // Contact & Location
      'contact.free_consultation': 'Free Consultation',
      'contact.agent_visit': 'Agent Visit',
      'contact.24_7_service': '24/7 Service',
      'locations.tbilisi_branches': 'Tbilisi Branches',
      'locations.gldani': 'Gldani - 4 Gr. Oshkeli Street',
      'locations.dighomi': 'Dighomi - 14 Nodar Bokhua Street',
      'locations.jiqia': 'Jiqia - 96 Alexandre Ioseliani Street',
      'ritual_offer': '"Ritual Service" offers free initial consultation, after which, if desired, our ritual agent will visit you on site.',
      'gldani_address': '4 Gr. Oshkeli Street, Tbilisi',
      'dighomi_address': '14 Nodar Bokhua Street, Tbilisi',
      'saburtalo_address': '96 Alexandre Ioseliani Street, Tbilisi',
      'locations.title': 'Funeral Home',
      'locations.gldani_title': 'Gldani',
      'locations.dighomi_title': 'Dighomi',
      'locations.saburtalo_title': 'Saburtalo',

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
      'common.learn_more': 'Learn More',
      'common.quick_actions': 'Quick Actions',
      'common.plan_funeral': 'Plan Funeral',
      'common.call': 'Call',
      'common.scroll_to_top': 'Scroll to Top',

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
      'footer.copyright_text': 'Funeral Home - Ritual Service - Funeral Bureau',
      'footer.privacy_policy': 'Privacy Policy',
      'footer.terms_of_service': 'Terms of Service',
      'footer.sitemap': 'Sitemap',
      'footer.search_keywords': 'Search Keywords',
      'footer.georgian_keywords': 'Georgian Keywords',
      'footer.transliteration_keywords': 'Transliteration Keywords',
      'footer.russian_keywords': 'Russian Keywords',

      'funeral_planning.cta_description': 'When a person is going through life\'s most difficult moment, it is important to have a reliable, responsible, and caring team by their side. That is exactly what we are.',

      // Why Choose Us Section
      'why_choose.title': 'Why Choose Ritual Service?',
      'why_choose.subtitle': 'Professional Team',
      'why_choose.experience': '20 Years of Experience',
      'why_choose.quality': 'Quality Service',
      'why_choose.individual_approach': 'Individual Approach',
      'why_choose.agent_visit': 'Agent Visit',

      // About Page
      'about.hero.title': 'About RitualService',
      'about.hero.title_new': 'About Us',
      
      'about.how_created.title': 'How We Created',
      'about.how_created.description1': 'Founded in 1995 by the Petrov family, RitualService began as a small local funeral home with a simple mission: to provide dignified and respectful funeral services to families during their most difficult times. What started as a single location has grown into one of the most trusted names in funeral services across the region.',
      'about.how_created.description2': 'Our journey began when the Petrov family experienced the loss of a loved one and found that existing services lacked the personal touch and cultural sensitivity that families truly needed. This personal experience became the foundation of our company\'s philosophy - treating every family as if they were our own.',
      'about.how_created.image_alt': 'Our humble beginnings',
      
      'about.what_offer.title': 'What We Offer',
      'about.what_offer.title_new': 'What We Offer',
      'about.what_offer.description': 'We provide comprehensive funeral and memorial services designed to honor your loved ones with dignity and respect. Our services include traditional funerals, transportation services, memorial ceremonies, and specialized cultural and religious ceremonies that honor diverse traditions and beliefs.',
      'about.what_offer.description_new': 'We offer comprehensive ritual services that include traditional funeral ceremonies, transportation, memorial services, and religious rituals.',
      'about.what_offer.image_alt': 'Our comprehensive services',
      'about.what_offer.services.traditional': 'Traditional Funeral Services',
      'about.what_offer.services.transportation': 'Transportation Services',
      'about.what_offer.services.memorial': 'Memorial Ceremonies',
      'about.what_offer.services.religious': 'Religious Services',
      
      'about.our_goal.title': 'Our Goal',
      'about.our_goal.description1': 'Our primary goal is to provide families with compassionate, professional, and culturally sensitive funeral services during their time of need. We believe that every life deserves to be celebrated and every family deserves support during the grieving process.',
      'about.our_goal.description2': 'We strive to be more than just a service provider - we aim to be a trusted partner in helping families navigate one of life\'s most challenging moments. Our commitment to excellence, attention to detail, and genuine care for every family we serve drives everything we do.',
      'about.our_goal.image_alt': 'Our commitment to excellence',
      'about.our_goal.values.compassion.title': 'Compassion',
      'about.our_goal.values.compassion.description': 'Treating every family with empathy and understanding',
      'about.our_goal.values.excellence.title': 'Excellence',
      'about.our_goal.values.excellence.description': 'Maintaining the highest standards in all our services',
      'about.our_goal.values.respect.title': 'Respect',
      'about.our_goal.values.respect.description': 'Honoring diverse traditions and personal wishes',

      // Ritual Service Description Section
      'ritual_service.title': 'Ritual Service',
      'ritual_service.description': 'We offer comprehensive funeral ceremony organization and complete ritual services. In difficult times, we will be by your side and take care of every ritual detail to reduce your worries. You can contact us at any time - 24/7, any day of the week. Initial consultation about ritual services is completely free, and if needed, our ritual agent will come to your location and help you resolve all issues. For us, the main priorities are compassion, quick response, professionalism, and individual approach to each client. We offer the highest quality service, while prices are tailored to your needs and capabilities.',
      'ritual_service.view_services': 'View Our Services',

      // Why Choose Ritual Service Section
      'why_choose_ritual.title': 'Why Choose Ritual Service?',
      'why_choose_ritual.subtitle': 'Our ritual service stands out for its professionalism, attention, and individual approach. We take care of every detail so that you can maintain peace during difficult times. High quality, efficiency, and compassion are our main principles.',
      'why_choose_ritual.full_service.title': 'Full Service Responsibility',
      'why_choose_ritual.full_service.desc': 'We leave nothing for you to figure out - we take care of everything: from the ceremony, transportation, hall, and cemetery accessories.',
      'why_choose_ritual.peaceful_environment.title': 'Peaceful Environment and Professionalism',
      'why_choose_ritual.peaceful_environment.desc': 'Our spaces are designed so that families can bid farewell to their loved ones with dignity, peace, and tranquility.',
      'why_choose_ritual.compassion_support.title': 'Compassion and Support',
      'why_choose_ritual.compassion_support.desc': 'We are not just service providers - we are people who stand by your side. We understand your pain and treat every detail with respect.',
      'why_choose_ritual.experience_trust.title': 'Experience and Trust',
      'why_choose_ritual.experience_trust.desc': 'Many families already trust us and we have proven that it is possible to conduct ceremonies with dignity, modesty, and without any unnecessary expenses. Everything with us will proceed peacefully, orderly, and humanely. Taking care of you is our main responsibility.',
      'why_choose_ritual.years_experience.title': '15 Years of Experience',
      'why_choose_ritual.years_experience.desc': 'Our experience enables us to provide dignified and professional ritual services.',
      'why_choose_ritual.support_24_7.title': '24/7 Support',
      'why_choose_ritual.support_24_7.desc': 'Our team is ready to help you at any time and day, providing prompt service.',
      'why_choose_ritual.plan_funeral': 'Plan a Funeral with Us',
      'why_choose_ritual.contact_24_7': 'Contact Us 24/7',


      // What Makes Us Different Section
      'what_makes_us.title': 'What Makes Us Different',
      'what_makes_us.professionalism.title': 'Professionalism and Experience',
      'what_makes_us.professionalism.desc': 'Years of experience and trust - "Ritual Service" funeral bureau has been operating for 15 years, so experience allows us to maintain organization. Our goal is to help people in life\'s most difficult moment - to conduct the ritual process peacefully and with dignity.',
      'what_makes_us.trust.title': 'Reliable and Transparent Service',
      'what_makes_us.trust.desc': 'We are ready 24 hours a day, 7 days a week to help you organize all your services and specialize in providing memorial services for people of all walks of life.',
      'what_makes_us.care.title': 'Compassion, Special Care',
      'what_makes_us.care.desc': 'Ritual Service staff are ready to help people during this difficult period by going through every detail of the ceremony. Also cares about creating an important and memorable service for your family and loved one.',
      
      // Products Page Specific Translations
      'products.title': 'Ritual Products',
      'products.hero_description': 'High-quality ritual products: coffins, shrouds, refrigeration, hearse. All products are ready 24/7.',
      'products.hero_title': 'Funeral Home - Ritual Products',
      'products.our_products': 'Our Products',
      'products.quality_description': 'Quality ritual products - complete assortment',
      'products.categories_title': 'Product Categories',
      'products.types_title': 'Product Types',
      'products.gallery_title': 'Photo Gallery',
      'products.related_title': 'Other Products',
      'products.details_title': 'In Detail',
      'products.features_title': 'Our Advantages',
      
      // Product Keywords for Related Products
      'products.coffins_keywords': 'Coffins - sasaxleebi',
      'products.shrouds_keywords': 'Shrouds - sudarebi',
      'products.refrigeration_keywords': 'Refrigeration - macivrеbi',
      'products.cemetery_accessories_keywords': 'Cemetery Accessories - sasapleos akseesuarebi',
      
      // Product Categories
      'products.coffins.wooden': 'Wooden coffins',
      'products.coffins.luxury': 'Luxury class coffins',
      'products.coffins.economy': 'Economy class coffins',
      'products.coffins.standard': 'Standard coffins',
      
      'products.shrouds.cotton': 'Cotton shrouds',
      'products.shrouds.silk': 'Silk shrouds',
      'products.shrouds.artificial': 'Artificial fabric shrouds',
      'products.shrouds.special': 'Special design shrouds',
      
      'products.refrigeration.coffin': 'Coffin-refrigeration units',
      'products.refrigeration.stationary': 'Stationary refrigeration',
      'products.refrigeration.mobile': 'Mobile refrigeration',
      'products.refrigeration.special': 'Special refrigeration',
      
      'products.cemetery_accessories.crosses': 'Crosses',
      'products.cemetery_accessories.flower_structures': 'Flower Structures',
      'products.cemetery_accessories.candles': 'Candles',
      'products.cemetery_accessories.marble_accessories': 'Marble Accessories',
      
      // Product Features
      'products.coffins.features.natural': 'Wooden coffins with natural materials',
      'products.coffins.features.luxury': 'Luxury class coffins with highest quality',
      'products.coffins.features.economy': 'Economy class coffins at affordable prices',
      'products.coffins.features.standard': 'Standard coffins with reliable quality',
      
      'products.shrouds.features.cotton': 'Cotton shrouds with natural materials',
      'products.shrouds.features.silk': 'Silk shrouds with quality fabric',
      'products.shrouds.features.artificial': 'Artificial fabric shrouds with durable materials',
      'products.shrouds.features.special': 'Special design shrouds with individual approach',
      
      'products.refrigeration.features.coffin': 'Coffin-refrigeration units with combined function',
      'products.refrigeration.features.stationary': 'Stationary refrigeration with large capacity',
      'products.refrigeration.features.mobile': 'Mobile refrigeration for transportation',
      'products.refrigeration.features.special': 'Special refrigeration for extended storage',
      
      'products.cemetery_accessories.features.crosses': 'Crosses (marble and wood) - traditional and modern forms, various sizes and designs',
      'products.cemetery_accessories.features.flower_structures': 'Flower structures - metal, stone or ceramic, which provide constant cleanliness and peace at the grave',
      'products.cemetery_accessories.features.candles': 'Candles - simple and ornamental variants that maintain warmth and prayer space for months',
      'products.cemetery_accessories.features.marble_accessories': 'Marble accessories - stone lanterns, memorial stone boards, borders and other elements, adapted to the grave design',
      'products.cemetery_accessories.process_title': 'Cemetery Accessories Selection',
      
      // Contact CTA
      'products.contact_now': 'Contact us now - we are by your side 24 hours a day',
      'services.contact_now': 'Contact us now - we are by your side 24 hours a day',
      
      // Services Page
      'services.hero_description': 'Ritual Service offers a complete complex of ritual services: embalming, hearse, stone engraving, transportation, dressing the deceased, grave decoration, etc.',
      'services.hero_title': 'Funeral Home - Funeral Services',

      'services.section_title': 'Our Services',
      'services.section_description': 'Professional ritual services 24/7 - all necessary services in one place',
      'services.seo_title': 'Ritual Services - Ritual Service',
      'services.seo_subtitle': 'Professional Ritual Services',
      'services.seo_description': 'Ritual Service represents a professional ritual services company where you will receive all necessary services for organizing a funeral (dakrdzalva). We take care of the dignified preparation of the deceased (micvalebuli) and the organization of mourning ceremonies (samgloviaro).',
      'services.main_services_title': 'Main Ritual Services:',
      'services.additional_services_title': 'Additional Services:',
      'services.advantages_title': 'Our Advantages:',
      'services.branches_title': 'Branches in Tbilisi:',
      'services.seo_conclusion': 'Ritual Service provides dignified mourning ceremonies (samgloviaro cerimoniis) and comprehensive burial services (dasaflaveba momsaxureba). Our company - your trusted partner in difficult times.',
      
      // Service Features
      'services.features.long_term_storage': 'Long-term storage',
      'services.features.hygienic_preparation': 'Hygienic preparation',
      'services.features.professional_approach': 'Professional approach',
      'services.features.modern_hearses': 'Modern hearses',
      'services.features.24_7_availability': '24/7 availability',
      'services.features.any_direction': 'Any direction',
      'services.features.dignified_preparation': 'Dignified preparation',
      'services.features.quality_materials': 'Quality materials',
      'services.features.regional_transportation': 'Regional transportation',
      'services.features.international_transportation': 'International transportation',
      'services.features.all_documents': 'All necessary documents',
      'services.features.colored_photo': 'Colored photo production',
      'services.features.metal_letters': 'Metal letter inscriptions',
      'services.features.artistic_ornaments': 'Artistic ornaments',
      'services.features.landscape_design': 'Landscape design',
      'services.features.stone_work': 'Stone work',
      'services.features.complex_service': 'Complex service',
      'services.features.dignified_environment': 'Dignified environment',
      'services.features.full_service': 'Full service',
      'services.features.flexible_schedule': 'Flexible schedule',
      'services.features.large_capacity': 'Large capacity',
      
      // Product Hero Keywords
      'products.coffins.hero_keywords': 'Quality wooden coffins with natural materials. Luxury class coffins and economy class coffins in all price categories.',
      'products.shrouds.hero_keywords': 'Cotton shrouds with natural materials. Silk shrouds with quality fabric and artificial fabric shrouds with durable materials.',
      
      // Shrouds Product Detail Translations
      'products.shrouds.hero_description_1': 'Funeral bureau Ritual Service offers shrouds, shroud is an integral part of Christian tradition - it covers the deceased as a sign of peace and holiness.',
      'products.shrouds.hero_description_2': 'We offer: traditional and soft fabric shrouds, with cross, image or minimalist design, various sizes and price categories, on-site delivery before burial.',
      'products.shrouds.types_section_title': 'Shroud is not just a covering - it is a symbol of faith and the final journey.',
      'products.shrouds.types.traditional': 'Traditional',
      'products.shrouds.types.traditional_materials': 'Shrouds made of soft fabric with cross and image.',
      'products.shrouds.types.minimalist': 'Minimalist',
      'products.shrouds.types.minimalist_materials': 'Minimalist design shrouds with quality fabric.',
      'products.shrouds.types.special': 'Special',
      'products.shrouds.types.special_materials': 'Special design shrouds for individual requirements.',
      'products.shrouds.consultation_text_1': 'If you don\'t know how to choose - our consultant will help you with the selection.',
      'products.shrouds.consultation_text_2': 'On-site delivery is available in Tbilisi and regions. Contact us for detailed information at',
      'products.refrigeration.hero_keywords': 'Funeral Bureau Ritual Service offers high-quality coffin refrigeration that ensures temporary preservation of the deceased before burial.',
      'products.cemetery_accessories.hero_keywords': 'Funeral Bureau Ritual Service offers cemetery accessories. Accessories create a complete, clean and organized environment where relatives can express respect with dignity.',
      
      // Coffins Product Detail Translations
      'products.coffins.seo_header': 'Coffins - sasaxleebi in Tbilisi with quality materials',
      'products.coffins.hero_description_1': 'Funeral bureau Ritual Service offers fully organized and dignified services.',
      'products.coffins.hero_description_2': 'In our bureau you can purchase high-quality coffins of various designs that meet both traditional and modern requirements.',
      'products.coffins.types_section_title': 'Our bureau offers Georgian, Italian and Ukrainian coffins',
      'products.coffins.types.georgian': 'Georgian',
      'products.coffins.types.georgian_materials': 'Materials - beech, chestnut, oak, walnut, pine.',
      'products.coffins.types.italian': 'Italian',
      'products.coffins.types.italian_materials': 'Materials - beech, chestnut, oak, walnut, pine',
      'products.coffins.types.ukrainian': 'Ukrainian',
      'products.coffins.types.ukrainian_materials': 'Materials - pine.',
      'products.coffins.consultation_text_1': 'If you don\'t know how to choose - our consultant will help you with the selection.',
      'products.coffins.consultation_text_2': 'On-site delivery is available in Tbilisi and regions. Contact us for details at',
      'products.coffins.seo_keywords': 'sasaxleebi, wooden coffins, luxury class coffins',
      
      // Other Product SEO Headers
      'products.shrouds.seo_header': 'Shrouds - sudarebi with natural materials',
      'products.refrigeration.seo_header': 'Refrigeration - sasaxle macivrebi coffin-refrigerators',
      'products.cemetery_accessories.seo_header': 'Cemetery Accessories - sasapleos akseesuarebi with quality materials',
      
      // Related Products
      'products.related_products_title': 'Other Products',
      
      // Other Product SEO Keywords
      'products.shrouds.seo_keywords': 'sudarebi, cotton shrouds, silk shrouds',
      'products.refrigeration.seo_keywords': 'macivrеbi, sasaxle-macivrеbi',
      'products.cemetery_accessories.seo_keywords': 'sasapleos akseesuarebi, crosses, flower structures, candles',
      
      // Refrigeration Types Section
      'products.refrigeration.types_section_title': 'We offer two types of coffin refrigeration',
      'products.refrigeration.types.american': 'American Refrigerator',
      'products.refrigeration.types.american_description': 'American refrigerator - high-quality coffin refrigerator that ensures temporary preservation of the deceased before burial.',
      'products.refrigeration.types.standard': 'Standard Refrigerator',
      'products.refrigeration.types.standard_description': 'Standard refrigerator - reliable and quality refrigerator with price and coffin style differences.',
      'products.refrigeration.consultation_text_1': 'The difference between these types is price and coffin style.',
      'products.refrigeration.consultation_text_2': 'We can deliver coffin refrigeration to any location in Tbilisi or regions. For detailed information contact us at',
      
      // Cemetery Accessories Product Detail Translations
      'products.cemetery_accessories.hero_description_1': 'Funeral Bureau Ritual Service offers cemetery accessories. Accessories create a complete, clean and organized environment where relatives can express respect with dignity.',
      'products.cemetery_accessories.hero_description_2': '',
      'products.cemetery_accessories.types_section_title': 'We offer',
      'products.cemetery_accessories.types.crosses': 'Crosses',
      'products.cemetery_accessories.types.crosses_materials': 'Marble and wood crosses - traditional and modern forms, various sizes and designs.',
      'products.cemetery_accessories.types.flower_structures': 'Flower Structures',
      'products.cemetery_accessories.types.flower_structures_materials': 'Metal, stone or ceramic structures that provide constant cleanliness and peace at the grave.',
      'products.cemetery_accessories.types.candles': 'Candlesticks',
      'products.cemetery_accessories.types.candles_materials': 'Simple and ornamental variants that maintain warmth and prayer space for months.',
      'products.cemetery_accessories.types.marble_accessories': 'Marble Accessories',
      'products.cemetery_accessories.types.marble_accessories_materials': 'Stone lanterns, memorial stone boards, borders and other elements, adapted to the grave design.',
      'products.cemetery_accessories.why_choose_title': 'Why should you choose our product?',
      'products.cemetery_accessories.why_choose.quality': '✔ Quality, durable materials - resistance to weather and time',
      'products.cemetery_accessories.why_choose.variety': '✔ Variety of choice - traditional and individual designs',
      'products.cemetery_accessories.why_choose.consultation': '✔ Help in right choice - consultation from specialists',
      'products.cemetery_accessories.why_choose.delivery': '✔ On-site delivery and installation in Tbilisi and regions',
      'products.cemetery_accessories.final_message': '',
      'products.cemetery_accessories.consultation_text_1': 'Enhance the memorial appearance with details that remain as signs of holiness and love for many years.',
      'products.cemetery_accessories.consultation_text_2': 'Contact us for details',
      
      // Coffin Types Section
      'coffin_types.title': 'Our bureau offers Georgian, Italian and Ukrainian coffins',
      'coffin_types.georgian': 'Georgian',
      'coffin_types.italian': 'Italian',
      'coffin_types.ukrainian': 'Ukrainian',
      'coffin_types.georgian_desc': 'Coffins made from beech, chestnut, oak, walnut, pine materials',
      'coffin_types.italian_desc': 'Coffins made from beech, chestnut, oak, walnut, pine materials',
      'coffin_types.ukrainian_desc': 'Coffins made from pine materials',
      'coffin_types.consultation_text': 'If you don\'t know how to choose - our consultant will help you with the selection.',
      'coffin_types.delivery_text': 'On-site delivery is available in Tbilisi and regions. Contact us for details at',
      
      // Service Categories
      'services.category.primary': 'Primary Services',
      'services.category.transport': 'Transport Services',
      'services.category.memorial': 'Memorial Services',
      'services.category.halls': 'Halls and Events',
      
      // Service Details Section
      'services.our_services_title': 'Services We Provide',
      'services.our_services_description': 'Ritual services offer a wide range of services, our team is ready to help you in difficult situations.',
      
      // Service Plan List
      'services.plan_list.agent_visit': 'Personal visit of our agent to plan the ceremony.',
      'services.plan_list.dressing_preparation': 'Dressing and preparation of the deceased.',
      'services.plan_list.embalming': 'Embalming.',
      'services.plan_list.hearse_service': 'Hearse service.',
      'services.plan_list.lifting_machine': 'Lifting machine for burial.',
      'services.plan_list.halls': 'Mourning and banquet halls.',
      'services.plan_list.transportation': 'Transportation within the region or abroad.',
      'services.plan_list.grave_preparation': 'Grave digging.',
      'services.plan_list.stone_engraving': 'Stone engraving.',
      'services.plan_list.colored_photo': 'Colored photo production.',
      'services.plan_list.metal_letters': 'Metal letter inscriptions.',
      
      // Detailed Service Descriptions
      'services.agent_service.title': 'Agent Service - 24/7',
      'services.agent_service.description': 'Our experienced funeral bureau agents are ready to provide full assistance in difficult moments 24 hours a day. We offer both personal visits to your address and telephone consultations to help you plan ritual procedures. The agent will provide you with detailed consultation, help you prepare all necessary documents and ensure the organization of the ceremony according to your wishes. Our goal is to ease this difficult process and ensure a dignified and respectful farewell ceremony. Contact us anytime - we are by your side.',
      'services.agent_service.alt': 'Agent Service - Ritual Service',
      
      'services.dressing_service.title': 'Dressing and Preparation',
      'services.dressing_service.description': 'Our team of professionals ensures the dressing and preparation of the deceased with high dignity and respect. The process includes hygienic preparation, selection and arrangement of clothing in agreement with the family, hair styling, makeup (if necessary) and ensuring a peaceful facial expression. We take care that the deceased looks neat and dignified so that family and relatives can have a dignified farewell. The entire process is carried out with noble attitude and proper care to honor the deceased and create a sense of peace for his family.',
      'services.dressing_service.alt': 'Dressing and preparation of the deceased',
      
      'services.embalming_service.title': 'Embalming',
      'services.embalming_service.description': 'Embalming is a special procedure that ensures temporary preservation of the deceased body, delays natural changes and preserves aesthetic appearance. Our qualified specialists use modern techniques and hygienic means to keep the body safely preserved. The process includes replacing blood with special conservation solution, moisturizing the skin and cosmetic restoration as needed. Embalming is especially important when the ceremony is planned for several days or requires transportation. We take care that the deceased remains in a calm and natural state, which gives family and relatives the opportunity for a dignified farewell.',
      'services.embalming_service.alt': 'Embalming service - Ritual Service',
      
      'services.hearse_service.title': 'Hearse Service',
      'services.hearse_service.description': 'Funeral Bureau Ritual Service offers hearse service that ensures dignified and safe transportation of the deceased before burial.',
      'services.hearse_service.care_respect_header': 'Care and respect for each case',
      'services.hearse_service.specialized_vehicle': 'Specially equipped vehicle',
      'services.hearse_service.service_georgia': 'Service throughout Georgia',
      'services.hearse_service.final_message': 'Our goal is maximum comfort and reliability for your family during this difficult time. Contact us 24/7',
      'services.hearse_service.alt': 'Hearse service - Ritual Service',
      
      'services.transportation_service.title': 'Transportation',
      'services.transportation_service.description': 'Transportation of the deceased - from any location to any location',
      'services.transportation_service.full_preparation_header': 'We offer transportation service for the deceased throughout Georgia - from Tbilisi to regions, from regions to Tbilisi, or to other necessary addresses.',
      'services.transportation_service.specialized_vehicle': 'Specially equipped vehicle',
      'services.transportation_service.hygienic_conditions': 'Hygienic and safe conditions',
      'services.transportation_service.24_7_call': '24/7 call service',
      'services.transportation_service.reliable_service': 'Reliable and respectfully performed service',
      'services.transportation_service.final_message': 'We understand your family\'s pain - we approach the transportation process with full responsibility. Contact us anytime - we are ready to help you.',
      'services.transportation_service.alt': 'Transportation service - Ritual Service',
      
      'services.stone_engraving_service.title': 'Stone Engraving',
      'services.stone_engraving_service.description': 'Our artistic team provides professional stone painting and engraving. We use modern technologies and quality materials to create long-lasting and dignified works. Our service includes colored photo production, metal letter inscriptions and artistic ornaments. We work on all types of stone and ensure high quality results. Our team takes care of every detail to ensure the result is dignified and long-lasting.',
      'services.stone_engraving_service.alt': 'Stone engraving - Ritual Service',
      
      'services.grave_decoration_service.title': 'Grave Decoration',
      'services.grave_decoration_service.description': 'We offer comprehensive grave decoration and memorial work. Our team ensures all necessary work - grave cutting, concrete arrangement, stone work and landscape design. We use quality materials and modern technologies to create dignified and long-lasting memorials. Our service includes all necessary preparation and ensures high quality results.',
      'services.grave_decoration_service.alt': 'Grave decoration - Ritual Service',
      
      'services.mourning_hall_service.title': 'Mourning Hall',
      'services.mourning_hall_service.description': 'Funeral Bureau Ritual Service offers a choice of mourning halls',
      'services.mourning_hall_service.full_preparation_header': 'We offer a fully equipped mourning hall where before the burial of the deceased it is possible to:',
      'services.mourning_hall_service.rest_card': 'Rest in a peaceful and orderly environment',
      'services.mourning_hall_service.guests_card': 'Receive guests in warmth and cleanliness',
      'services.mourning_hall_service.tradition_card': 'Conduct memorial service with traditional customs',
      'services.mourning_hall_service.infrastructure_card': 'Quiet atmosphere and fully provided infrastructure (benches, lighting, air ventilation)',
      'services.mourning_hall_service.final_message': 'The hall is ready 24/7 Halls are located at •Gldani Grigol Oshkeli 4 •Dighomi Bokhua 14, Jikia Sasha Ioseliani 96 We take care of the space where you can say goodbye to your loved one with dignity. Advance booking is recommended, contact us at',
      'services.mourning_hall_service.alt': 'Mourning hall - Ritual Service',
      
      'services.banquet_hall_service.title': 'Banquet Hall',
      'services.banquet_hall_service.description': 'Our banquet hall is ideal for memorial events. The hall has large capacity and is equipped with all necessary equipment. We offer full service including food preparation, table arrangement and organization of all necessary details. Our team ensures high quality service and takes care of every detail to ensure the event is successful.',
      'services.banquet_hall_service.alt': 'Banquet hall - Ritual Service',
      
      'services.grave_preparation_service.title': 'Grave Digging',
      'services.grave_preparation_service.description': 'Funeral Bureau Ritual Service offers grave digging service for conducting the burial process. Grave preparation requires precision, experience, and a high sense of responsibility - and that\'s exactly what we offer.',
      'services.grave_preparation_service.long_description': 'Funeral Bureau Ritual Service offers grave digging service for conducting the burial process. Grave preparation requires precision, experience, and a high sense of responsibility - and that\'s exactly what we offer.',
      'services.grave_preparation_service.feature_1': 'Grave digging according to required dimensions (single, double, family graves)',
      'services.grave_preparation_service.feature_2': 'Proper excavation, transportation, and leveling of soil',
      'services.grave_preparation_service.feature_3': 'Installation of durable construction when necessary (concrete covering or walls)',
      'services.grave_preparation_service.feature_4': 'Timely readiness on the day of burial - everything will be arranged before the specified time',
      'services.grave_preparation_service.process_1': 'Taking into account traditional and religious customs',
      'services.grave_preparation_service.process_2': 'Contact us for detailed information',
      'services.grave_preparation_service.service_details_header': 'Service Details',
      'services.grave_preparation_service.alt': 'Grave digging - Ritual Service',
      
      'services.colored_photo_service.title': 'Colored Photo Production',
      'services.colored_photo_service.description': 'Our specialists ensure high-quality colored photo production on stone. We use modern technologies and quality materials to create long-lasting and dignified works. Our service includes photo processing, transfer to stone, and color preservation. We work on all types of stone and ensure high-quality results. Our team takes care of every detail to ensure the result is dignified and long-lasting.',
      'services.colored_photo_service.alt': 'Colored photo production - Ritual Service',
      
      'services.metal_letters_service.title': 'Metal Inscriptions',
      'services.metal_letters_service.description': 'Funeral Bureau Ritual Service offers attachable inscriptions on grave stones, we have inscriptions made from aluminum and brass materials.',
      'services.metal_letters_service.alt': 'Metal inscriptions - Ritual Service',
      'services.metal_letters_service.long_description': 'Funeral Bureau Ritual Service offers attachable inscriptions on grave stones, we have inscriptions made from aluminum and brass materials. Inscriptions in various styles and fonts - Georgian, Russian, English or other languages. Classical and modern designs. Laser or mechanical engraving directly on the stone surface. Birth and death dates, names, quotes, prayers or personal texts. Letters are made from durable, weather-resistant materials. Each inscription is thought out individually - adapted to the size, shape and style of the stone. Selection is made with the help of a professional - according to the correct font, size and arrangement.',
      'services.metal_letters_service.feature_1': 'Inscriptions in various styles and fonts - Georgian, Russian, English or other languages',
      'services.metal_letters_service.feature_2': 'Classical and modern designs',
      'services.metal_letters_service.feature_3': 'Laser or mechanical engraving directly on the stone surface',
      'services.metal_letters_service.feature_4': 'Birth and death dates, names, quotes, prayers or personal texts',
      'services.metal_letters_service.process_1': 'Materials and manufacturing methods',
      'services.metal_letters_service.materials_methods_1': 'Letters are made from durable, weather-resistant materials',
      'services.metal_letters_service.materials_methods_2': 'Each inscription is thought out individually - adapted to the size, shape and style of the stone',
      'services.metal_letters_service.materials_methods_3': 'Selection is made with the help of a professional - according to the correct font, size and arrangement',
      'services.metal_letters_service.process_2': 'Contact us for detailed information',

      // Individual Services Section
      'services.individual_services_title': 'Our Services',
      'services.individual_services_description': 'Professional ritual services 24/7 - all necessary services in one place',

      // Individual Service Titles and Descriptions
      'services.agent_visit.title': 'Personal Agent Visit',
      'services.agent_visit.description': 'Personal visit of our agent to plan the ceremony. Professional consultation and planning 24/7.',

      'services.dressing.title': 'Dressing and Preparation of the Deceased',
      'services.dressing.description': 'Dressing and preparation of the deceased. Dignified and respectful preparation according to family wishes.',

      'services.embalming.title': 'Embalming',
      'services.embalming.description': 'Embalming. Professional preparation and storage with modern technologies.',

      'services.hearse.title': 'Hearse Service',
      'services.hearse.description': 'Hearse service. Modern hearses in any direction 24/7.',

      'services.lifting_machine.title': 'Lifting Machine',
      'services.lifting_machine.description': 'Lifting machine. Professional equipment for safe transportation.',

      'services.halls.title': 'Mourning and Banquet Halls',
      'services.halls.description': 'Mourning and banquet halls. Dignified environment for ceremonies and memorial events.',

      'services.transportation.title': 'Transportation in Region and Abroad',
      'services.transportation.description': 'Transportation within the region or abroad. Preparation of all necessary documents and safe transportation.',

      'services.grave_preparation.title': 'Grave Digging',
      'services.grave_preparation.description': 'Grave digging. Professional service for the burial process.',

      'services.stone_engraving.title': 'Stone Engraving',
      'services.stone_engraving.description': 'Stone engraving. Professional artistic work with modern technologies.',

      'services.colored_photo.title': 'Colored Photo Production',
      'services.colored_photo.description': 'Colored photo production. Quality photos for long-term storage.',

      'services.metal_letters.title': 'Metal Inscriptions',
      'services.metal_letters.description': 'Metal inscriptions. Long-lasting and dignified inscriptions with metal letters.',
      
      // New service translations for breadcrumb
      'services.embalming_dressing_service.title': 'Embalming, Makeup, Dressing',
      'services.embalming_dressing_service.description': 'Funeral Bureau Ritual Service offers professional preparatory services before burial.',
      'services.embalming_dressing_service.full_preparation_header': 'Complete preparation and arrangement of the deceased before burial:',
      'services.embalming_dressing_service.embalming_card': 'Embalming - Our team doctor ensures the embalming process, dignified preservation of the body for time delay purposes',
      'services.embalming_dressing_service.makeup_card': 'Makeup - Light restoration of the face if necessary',
      'services.embalming_dressing_service.dressing_card': 'Dressing - Dressing and arrangement of the deceased',
      'services.embalming_dressing_service.final_message': 'In difficult moments, we take care of every detail - with complete reliability. Service 24/7 throughout Georgia. Contact us for detailed information',
      'services.microbus_service.title': 'Minibus',
      'services.microbus_service.description': 'Funeral Bureau Ritual Service offers minibus service. Safe and comfortable transportation of guests.',
      'services.microbus_service.long_description': 'Funeral Bureau Ritual Service offers minibus service. Safe and comfortable transportation of guests.',
      'services.microbus_service.full_preparation_header': 'We offer minibus service for transporting guests on the day of burial',
      'services.microbus_service.comfortable_modern': 'Comfortable and modern style minibus',
      'services.microbus_service.safe_travel': 'Safe travel to any distance',
      'services.microbus_service.timely_reliable': 'Timely and reliable service',
      'services.microbus_service.tbilisi_regions': 'Service in Tbilisi and regions',
      'services.microbus_service.final_message': 'Contact us and we will take care of easy and safe movement of guests. 24/7 call service.',
      'services.hall_service.title': 'Hall',
      'services.hall_service.description': 'We offer a fully equipped hall where you can meet and receive guests after the funeral in a peaceful, orderly, and dignified environment.',
      'services.hall_service.long_description': 'We offer a fully equipped hall where you can meet and receive guests after the funeral in a peaceful, orderly, and dignified environment. Our hall is designed so that in these difficult moments you can receive all services in one space. Advance booking is required, contact us at +995 557 55 61 16.',
      'services.hall_service.process_1': 'Banquet Hall',
      'services.hall_service.process_2': 'Our hall is designed so that in these difficult moments you can receive all services in one space. Advance booking is required, contact us at +995 557 55 61 16.',
      'services.hall_service.feature_1': 'Comfortable space',
      'services.hall_service.feature_2': 'Equipped with all necessary infrastructure',
      'services.hall_service.feature_3': 'Convenient location',
      'services.hall_service.feature_4': '24/7 access and service',
      'services.lifting_machine_service.title': 'Lifting Machine',
      'services.lifting_machine_service.description': 'Funeral Bureau Ritual Service offers a lifting machine service. We offer the deceased lifting machine service, which ensures safe, orderly and dignified lowering of the coffin into the grave.',
      'services.lifting_machine_service.long_description': 'Funeral Bureau Ritual Service offers a lifting machine service. We offer the deceased lifting machine service, which ensures safe, orderly and dignified lowering of the coffin into the grave.',
      'services.lifting_machine_service.process_1': 'Lifting Machine',
      'services.lifting_machine_service.process_2': 'The lifting machine not only facilitates the process, but also creates an orderly, dignified environment at the funeral ceremony. Contact us at',
      'services.lifting_machine_service.feature_1': 'Safe and dignified lowering',
      'services.lifting_machine_service.feature_2': 'Professional service',
      'services.lifting_machine_service.feature_3': 'Orderly process',
      'services.lifting_machine_service.feature_4': '24/7 availability',
      'services.cemetery_decoration_service.title': 'Cemetery Decoration',
      'services.cemetery_decoration_service.description': 'Funeral Bureau Ritual Service offers cemetery decoration service by a group of professional craftsmen, designed for the dignified and permanent arrangement of your loved one\'s grave.',
      'services.cemetery_decoration_service.long_description': 'Funeral Bureau Ritual Service offers cemetery decoration service by a group of professional craftsmen, designed for the dignified and permanent arrangement of your loved one\'s grave.',
      'services.cemetery_decoration_service.full_preparation_header': 'What does our service include?',
      'services.cemetery_decoration_service.high_quality_materials_header': 'Decoration with high-quality materials:',
      'services.cemetery_decoration_service.high_quality_materials_desc': 'We work with various types of stone - marble, granite, gabbro labrador… Each material is distinguished by its size, durability and unique appearance, which allows you to choose what best suits your requirements and budget.',
      'services.cemetery_decoration_service.individual_approach_header': 'Fully individual approach:',
      'services.cemetery_decoration_service.individual_approach_desc': 'Our specialists will help you choose the design and offer the best solutions that suit both traditional and modern styles.',
      'services.cemetery_decoration_service.full_spectrum_header': 'Full spectrum of work:',
      'services.cemetery_decoration_service.full_spectrum_desc': 'Grave asphalting, border installation, grave covering arrangement, stone processing and professional decoration.',
      'services.cemetery_decoration_service.long_term_result_header': 'Long-term result:',
      'services.cemetery_decoration_service.long_term_result_desc': 'Our used materials and technologies ensure that the cemetery does not lose its appearance and functionality over the years, resisting weather and other influences.',
      'services.cemetery_decoration_service.why_choose_header': 'Why should you choose us?',
      'services.cemetery_decoration_service.professionalism': '✔ High professionalism and experience',
      'services.cemetery_decoration_service.affordable_prices': '✔ Affordable prices and transparent discount system',
      'services.cemetery_decoration_service.reliability': '✔ Full responsibility and reliability',
      'services.cemetery_decoration_service.georgia_wide': '✔ Service throughout Georgia',
      'services.cemetery_decoration_service.timely_completion': '✔ Timely completion and quality control',
      'services.cemetery_decoration_service.final_message': 'Our team is ready to answer all your questions and help you at any stage of cemetery decoration. Contact us at',
      'services.grave_stones_service.title': 'Grave Stones, Stone Painting',
      'services.grave_stones_service.description': 'Funeral Bureau Ritual Service offers grave stones both for installation and placement. We offer quality grave stones of various materials, designs and sizes so that you can arrange a dignified memorial for your loved one.',
      'services.grave_stones_service.long_description': 'Funeral Bureau Ritual Service offers grave stones both for installation and placement. We offer quality grave stones of various materials, designs and sizes so that you can arrange a dignified memorial for your loved one.',
      'services.grave_stones_service.feature_1': 'Marble - elegant, clean and classic material, distinguished by beauty and durability.',
      'services.grave_stones_service.feature_2': 'Kutaisi granite - strong and long-lasting stone that withstands any weather and maintains its appearance for many years.',
      'services.grave_stones_service.feature_3': 'Basalt - strong and long-lasting stone that withstands any weather and maintains its appearance for many years.',
      'services.grave_stones_service.feature_4': 'Gabbro and labrador - unique textures and color gamut that will create a special and different grave.',
      'services.grave_stones_service.process_1': 'Stone painting on grave stones',
      'services.grave_stones_service.process_2': 'We offer high-quality and detailed painting on grave stones, which perfectly conveys the meaning and name of the memorial. The painting process is performed by professionals who use special, weather-resistant paints that will not fade over the years.',
      'services.grave_stones_service.process_3': 'Contact us at our consultants will be happy to provide you with complete information and help you make the ideal choice.',
      'services.grave_stones_service.our_products_header': 'Our products include:',
      'services.grave_stones_service.painting_feature_1': 'Black and white and colored painting',
      'services.grave_stones_service.painting_feature_2': 'Spiritual symbols, religious images',
      'services.grave_stones_service.painting_feature_3': 'Personal portraits and decorative elements',
      'services.grave_stones_service.why_choose_header': 'Why should you choose us?',
      'services.grave_stones_service.professionalism': '✔ Many years of experience and professionalism',
      'services.grave_stones_service.individual_approach': '✔ Individual approach and design consultations',
      'services.grave_stones_service.quality_materials': '✔ Quality materials and technologies',
      'services.grave_stones_service.high_standards': '✔ All work is performed to high standards',
      'services.grave_stones_service.convenient_service': '✔ Timely and convenient service throughout Georgia',
      'services.related_services': 'Other Services',
      'services.gallery': 'Photo Gallery'
    },

    ru: {
      // Header & Navigation
      'nav.home': 'Похоронный дом - Главная',
      'nav.home_short': 'Главная',
      'header.company_name': 'Ритуал Сервис',
      'loader.title': 'Ритуал Сервис - Похоронный дом',
      'nav.services': 'Услуги',
      'nav.products': 'Продукция',
      'nav.about': 'О нас',
      'nav.contact': 'Контакты',
      'nav.locations': 'Филиалы',
      'header.call_24_7': 'Звоните 24/7',
      'breadcrumb.plan_funeral': 'Планировать похороны',
      
      // Breadcrumb translations for URL segments
      'breadcrumb.coffins': 'Гробы',
      'breadcrumb.shrouds': 'Саваны',
      'breadcrumb.refrigeration': 'Холодильники',
      'breadcrumb.cemetery_accessories': 'Кладбищенские аксессуары',
      'breadcrumb.embalming': 'Бальзамирование',
      'breadcrumb.transportation': 'Перевозка',
      'breadcrumb.stone_engraving': 'Роспись на камне',
      'breadcrumb.grave_decoration': 'Благоустройство могил',
      'breadcrumb.dressing': 'Одевание и подготовка',
      'breadcrumb.mourning_hall': 'Траурный зал',
      'breadcrumb.banquet_hall': 'Банкетный зал',
      'breadcrumb.metal_letters': 'Металлические надписи',
      'breadcrumb.agent_service': 'Услуги агента',
      'breadcrumb.lifting_machine': 'Подъемная машина',
      'breadcrumb.colored_photo': 'Изготовление цветного фото',
      

      // Home Page
      'home.title': 'Ритуал Сервис - Похоронный дом',
      'home.subtitle': 'Предлагаем ритуальные услуги 24 часа в сутки',
      'home.funeral_home': 'Похоронный дом',
      'home.damkrdzalavi_biuro': 'Профессиональные похоронные услуги',
      'home.ritual_house': 'Ритуальный дом',
      'home.saritualo_saxli': 'Центр ритуальных услуг',
      'home.funeral_bureau_tbilisi': 'Похоронное бюро в Тбилиси',
      'home.funeral_bureau_services': 'Услуги похоронного бюро',
      'home.funeral_bureau': 'Похоронное бюро',

      // Services - 14 Service Cards
      'services.coffins': 'Гробы',
      'services.coffin_refrigeration': 'Гробы-холодильники',
      'services.shrouds': 'Саваны',
      'services.embalming_dressing': 'Бальзамирование, грим, одевание',
      'services.transportation': 'Перевозка',
      'services.mourning_hall': 'Траурный зал',
      'services.hearse_service': 'Услуги катафалка',
      'services.marshutka': 'Маршрутка',
      'services.hall': 'Зал',
      'services.cemetery_decoration': 'Благоустройство кладбища',
      'services.grave_stones_painting': 'Надгробные камни, роспись на камне',
      'services.grave_excavation': 'Рытье могилы',
      'services.cemetery_accessories': 'Кладбищенские аксессуары',
      'services.lifting_machine': 'Подъемная машина',

      // Products
      'products.coffins': 'Гробы',
      'products.shrouds': 'Саваны',
      'products.refrigeration': 'Холодильники',
      'products.cemetery_accessories': 'Кладбищенские аксессуары',
      'header.phone': '+995 557 55 61 16',

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

      // Services Description
      'services.description': 'Мы предлагаем полный комплекс ритуальных услуг - все необходимое для достойной и организованной церемонии из одного места. Наша цель - быть рядом с вами в трудных ситуациях и учитывать ваши потребности.',

      // Contact & Location
      'contact.free_consultation': 'Бесплатная консультация',
      'contact.agent_visit': 'Визит агента',
      'contact.24_7_service': '24/7 обслуживание',
      'locations.tbilisi_branches': 'Филиалы в Тбилиси',
      'locations.gldani': 'Глдани - ул. Гр. Ошкели, 4',
      'locations.dighomi': 'Дигоми - ул. Нодара Бохлуа, 14',
      'locations.jiqia': 'Джикия - ул. Александра Иоселиани, 96',
      'ritual_offer': '"Ритуал Сервис" предлагает бесплатную первичную консультацию, после которой, при желании, наш ритуальный агент приедет к вам на место.',
      'gldani_address': 'ул. Гр. Ошкели, 4, Тбилиси',
      'dighomi_address': 'ул. Нодара Бохлуа, 14, Тбилиси',
      'saburtalo_address': 'ул. Александра Иоселиани, 96, Тбилиси',
      'locations.title': 'Похоронный дом',
      'locations.gldani_title': 'Глдани',
      'locations.dighomi_title': 'Дигоми',
      'locations.saburtalo_title': 'Сабуртало',

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
      'common.learn_more': 'Узнать больше',
      'common.quick_actions': 'Действия',
      'common.plan_funeral': 'Планирование похорон',
      'common.call': 'Позвонить',
      'common.scroll_to_top': 'Прокрутить вверх',

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
      'footer.copyright_text': 'Похоронный дом - Ритуальный сервис - Похоронное бюро',
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

      // About Page
      'about.hero.title': 'О Ритуал Сервисе',
      'about.hero.title_new': 'О нас',
      'about.hero.subtitle': 'Предоставляем сострадательные и профессиональные похоронные услуги с 1995 года',
      
      'about.how_created.title': 'Как мы создавались',
      'about.how_created.description1': 'Основанная в 1995 году семьей Петровых, Ритуал Сервис начал как небольшой местный похоронный дом с простой миссией: предоставлять достойные и уважительные похоронные услуги семьям в их самые трудные времена. То, что начиналось как одно место, выросло в одно из самых доверенных имен в похоронных услугах по всему региону.',
      'about.how_created.description2': 'Наш путь начался, когда семья Петровых пережила потерю близкого человека и обнаружила, что существующие услуги не хватало личного подхода и культурной чувствительности, которые действительно нужны семьям. Этот личный опыт стал основой философии нашей компании - относиться к каждой семье так, как если бы это была наша собственная семья.',
      'about.how_created.image_alt': 'Наши скромные начинания',
      
      'about.what_offer.title': 'Что мы предлагаем',
      'about.what_offer.title_new': 'Что мы предлагаем',
      'about.what_offer.description': 'Мы предоставляем комплексные похоронные и мемориальные услуги, разработанные для почитания ваших близких с достоинством и уважением. Наши услуги включают традиционные похороны, услуги перевозки, мемориальные церемонии и специализированные культурные и религиозные церемонии, которые почитают разнообразные традиции и верования.',
      'about.what_offer.description_new': 'Мы предлагаем комплексные ритуальные услуги, которые включают традиционные похоронные церемонии, транспортировку, мемориальные услуги и религиозные ритуалы.',
      'about.what_offer.image_alt': 'Наши комплексные услуги',
      'about.what_offer.services.traditional': 'Традиционные похоронные услуги',
      'about.what_offer.services.transportation': 'Услуги перевозки',
      'about.what_offer.services.memorial': 'Мемориальные церемонии',
      'about.what_offer.services.religious': 'Религиозные услуги',
      
      'about.our_goal.title': 'Наша цель',
      'about.our_goal.description1': 'Наша основная цель - предоставлять семьям сострадательные, профессиональные и культурно чувствительные похоронные услуги во время их нужды. Мы верим, что каждая жизнь заслуживает быть отпразднованной и каждая семья заслуживает поддержки в процессе скорби.',
      'about.our_goal.description2': 'Мы стремимся быть больше, чем просто поставщиком услуг - мы стремимся быть доверенным партнером в помощи семьям преодолевать один из самых сложных моментов жизни. Наша приверженность совершенству, внимание к деталям и искренняя забота о каждой семье, которой мы служим, движет всем, что мы делаем.',
      'about.our_goal.image_alt': 'Наша приверженность совершенству',
      'about.our_goal.values.compassion.title': 'Сострадание',
      'about.our_goal.values.compassion.description': 'Относимся к каждой семье с эмпатией и пониманием',
      'about.our_goal.values.excellence.title': 'Совершенство',
      'about.our_goal.values.excellence.description': 'Поддерживаем высочайшие стандарты во всех наших услугах',
      'about.our_goal.values.respect.title': 'Уважение',
      'about.our_goal.values.respect.description': 'Почитаем разнообразные традиции и личные пожелания',

      // Ritual Service Description Section
      'ritual_service.title': 'Ритуальный сервис',
      'ritual_service.description': 'Предлагаем организацию поминальных церемоний и полный комплекс ритуальных услуг. В трудные моменты мы будем рядом и позаботимся о каждой ритуальной детали, чтобы уменьшить ваши заботы. Вы можете связаться с нами в любое время - 24/7, в любой день недели. Первичная консультация по ритуальным услугам совершенно бесплатна, а при необходимости наш ритуальный агент приедет на место и поможет решить все вопросы. Для нас главное - сострадание, быстрая реакция, профессионализм и индивидуальный подход к каждому клиенту. Мы предлагаем услуги высочайшего качества, при этом цены адаптированы под ваши потребности и возможности.',
      'ritual_service.view_services': 'Посмотреть наши услуги',

      // Why Choose Ritual Service Section
      'why_choose_ritual.title': 'Почему стоит выбрать Ritual Service?',
      'why_choose_ritual.subtitle': 'Наш ритуальный сервис выделяется профессионализмом, вниманием и индивидуальным подходом. Мы заботимся о каждой детали, чтобы вы могли сохранить спокойствие в трудные времена. Высокое качество, оперативность и сострадание - наши основные принципы.',
      'why_choose_ritual.full_service.title': 'Полная ответственность за сервис',
      'why_choose_ritual.full_service.desc': 'Мы не оставляем вам ничего для выяснения - мы заботимся обо всем: от церемонии, транспортировки, зала и аксессуаров кладбища.',
      'why_choose_ritual.peaceful_environment.title': 'Спокойная обстановка и профессионализм',
      'why_choose_ritual.peaceful_environment.desc': 'Наши пространства созданы для того, чтобы семьи могли достойно, спокойно и в умиротворении попрощаться с любимым человеком.',
      'why_choose_ritual.compassion_support.title': 'Сострадание и поддержка',
      'why_choose_ritual.compassion_support.desc': 'Мы не просто поставщики услуг - мы люди, которые стоят рядом с вами. Мы понимаем вашу боль и относимся к каждой детали с уважением.',
      'why_choose_ritual.experience_trust.title': 'Опыт и доверие',
      'why_choose_ritual.experience_trust.desc': 'Многие семьи уже доверяют нам, и мы доказали, что возможно провести церемонию достойно, скромно и без каких-либо лишних расходов. С нами все пройдет спокойно, организованно и по-человечески. Забота о вас - наша главная ответственность.',
      'why_choose_ritual.years_experience.title': '15 лет опыта',
      'why_choose_ritual.years_experience.desc': 'Наш опыт позволяет нам обеспечить достойное и профессиональное ритуальное обслуживание.',
      'why_choose_ritual.support_24_7.title': '24/7 поддержка',
      'why_choose_ritual.support_24_7.desc': 'Наша команда готова помочь вам в любое время и день, обеспечивая оперативное обслуживание.',
      'why_choose_ritual.plan_funeral': 'Запланируйте похороны с нами',
      'why_choose_ritual.contact_24_7': 'Свяжитесь с нами 24/7',

      // What Makes Us Different Section
      'what_makes_us.title': 'Что делает нас особенными',
      'what_makes_us.professionalism.title': 'Профессионализм и опыт',
      'what_makes_us.professionalism.desc': 'Многолетний опыт и доверие - похоронное бюро "Ritual Service" функционирует уже 15 лет, поэтому опыт позволяет нам поддерживать организованность. Наша цель - помочь людям в самый сложный момент жизни - провести ритуальный процесс спокойно и достойно.',
      'what_makes_us.trust.title': 'Надежное и прозрачное обслуживание',
      'what_makes_us.trust.desc': 'Мы готовы 24 часа в сутки, 7 дней в неделю помочь вам организовать все ваши услуги и специализируемся на предоставлении мемориальных услуг для людей всех слоев общества.',
      'what_makes_us.care.title': 'Сострадание, особая забота',
      'what_makes_us.care.desc': 'Персонал Ritual Service готов помочь людям в этот трудный период, пройдя через каждую деталь церемонии. Также заботится о создании важного и запоминающегося обслуживания для вашей семьи и близкого человека.',

      'funeral_planning.cta_description': 'Когда человек переживает самый трудный момент, важно, чтобы рядом с ним была надежная, ответственная и заботливая команда. Именно такими мы и являемся.',
      
      // Products Page Specific Translations
      'products.title': 'Ритуальная продукция',
      'products.hero_description': 'Высококачественная ритуальная продукция: гробы, саваны, холодильники, катафалк. Вся продукция готова 24/7.',
      'products.hero_title': 'Похоронный дом - Ритуальная продукция',
      'products.our_products': 'Наша продукция',
      'products.quality_description': 'Качественная ритуальная продукция - полный ассортимент',
      'products.categories_title': 'Категории продукции',
      'products.types_title': 'Типы продукции',
      'products.gallery_title': 'Фото галерея',
      'products.related_title': 'Другие продукты',
      'products.details_title': 'Подробно',
      'products.features_title': 'Наши преимущества',
      
      // Product Keywords for Related Products
      'products.coffins_keywords': 'Гробы - sasaxleebi',
      'products.shrouds_keywords': 'Саваны - sudarebi',
      'products.refrigeration_keywords': 'Холодильники - macivrеbi',
      'products.cemetery_accessories_keywords': 'Кладбищенские аксессуары - sasapleos akseesuarebi',
      
      // Product Categories
      'products.coffins.wooden': 'Деревянные гробы',
      'products.coffins.luxury': 'Гробы люкс класса',
      'products.coffins.economy': 'Гробы эконом класса',
      'products.coffins.standard': 'Стандартные гробы',
      
      'products.shrouds.cotton': 'Хлопковые саваны',
      'products.shrouds.silk': 'Шелковые саваны',
      'products.shrouds.artificial': 'Саваны из искусственной ткани',
      'products.shrouds.special': 'Саваны специального дизайна',
      
      'products.refrigeration.coffin': 'Гробы-холодильники',
      'products.refrigeration.stationary': 'Стационарные холодильники',
      'products.refrigeration.mobile': 'Мобильные холодильники',
      'products.refrigeration.special': 'Специальные холодильники',
      
      'products.cemetery_accessories.crosses': 'Кресты',
      'products.cemetery_accessories.flower_structures': 'Цветочные конструкции',
      'products.cemetery_accessories.candles': 'Свечи',
      'products.cemetery_accessories.marble_accessories': 'Мраморные аксессуары',
      
      // Product Features
      'products.coffins.features.natural': 'Деревянные гробы с натуральными материалами',
      'products.coffins.features.luxury': 'Гробы люкс класса с высшим качеством',
      'products.coffins.features.economy': 'Гробы эконом класса по доступным ценам',
      'products.coffins.features.standard': 'Стандартные гробы с надежным качеством',
      
      'products.shrouds.features.cotton': 'Хлопковые саваны с натуральными материалами',
      'products.shrouds.features.silk': 'Шелковые саваны с качественной тканью',
      'products.shrouds.features.artificial': 'Саваны из искусственной ткани с прочными материалами',
      'products.shrouds.features.special': 'Саваны специального дизайна с индивидуальным подходом',
      
      'products.refrigeration.features.coffin': 'Гробы-холодильники с комбинированной функцией',
      'products.refrigeration.features.stationary': 'Стационарные холодильники с большой вместимостью',
      'products.refrigeration.features.mobile': 'Мобильные холодильники для перевозки',
      'products.refrigeration.features.special': 'Специальные холодильники для длительного хранения',
      
      'products.cemetery_accessories.features.crosses': 'Кресты (мраморные и деревянные) - традиционные и современные формы, различные размеры и дизайн',
      'products.cemetery_accessories.features.flower_structures': 'Цветочные конструкции - металлические, каменные или керамические, которые обеспечивают постоянную чистоту и покой на могиле',
      'products.cemetery_accessories.features.candles': 'Свечи - простые и орнаментальные варианты, которые месяцами сохраняют тепло и пространство для молитвы',
      'products.cemetery_accessories.features.marble_accessories': 'Мраморные аксессуары - каменные фонари, мемориальные каменные доски, бордюры и другие элементы, адаптированные к дизайну могилы',
      'products.cemetery_accessories.process_title': 'Выбор кладбищенских аксессуаров',
      
      // Contact CTA
      'products.contact_now': 'Свяжитесь с нами сейчас - мы рядом 24 часа в сутки',
      'services.contact_now': 'Свяжитесь с нами сейчас - мы рядом 24 часа в сутки',
      
      // Services Page
      'services.hero_description': 'Ритуал Сервис предлагает полный комплекс ритуальных услуг: бальзамирование, катафалк, роспись на камне, перевозка, одевание усопшего, благоустройство могил и т.д.',
      'services.hero_title': 'Похоронный дом - Похоронные услуги',

      'services.section_title': 'Наши услуги',
      'services.section_description': 'Профессиональные ритуальные услуги 24/7 - все необходимые услуги в одном месте',
      'services.seo_title': 'Ритуальные услуги - Ритуал Сервис',
      'services.seo_subtitle': 'Профессиональные ритуальные услуги',
      'services.seo_description': 'Ритуал Сервис представляет профессиональную компанию ритуальных услуг, где вы получите все необходимые услуги для организации похорон (dakrdzalva). Мы заботимся о достойной подготовке усопшего (micvalebuli) и организации траурных церемоний (samgloviaro).',
      'services.main_services_title': 'Основные ритуальные услуги:',
      'services.additional_services_title': 'Дополнительные услуги:',
      'services.advantages_title': 'Наши преимущества:',
      'services.branches_title': 'Филиалы в Тбилиси:',
      'services.seo_conclusion': 'Ритуал Сервис обеспечивает достойные траурные церемонии (samgloviaro cerimoniis) и комплексные услуги по захоронению (dasaflaveba momsaxureba). Наша компания - ваш надежный партнер в трудные времена.',
      
      // Service Features
      'services.features.long_term_storage': 'Длительное хранение',
      'services.features.hygienic_preparation': 'Гигиеническая подготовка',
      'services.features.professional_approach': 'Профессиональный подход',
      'services.features.modern_hearses': 'Современные катафалки',
      'services.features.24_7_availability': '24/7 доступность',
      'services.features.any_direction': 'Любое направление',
      'services.features.dignified_preparation': 'Достойная подготовка',
      'services.features.quality_materials': 'Качественные материалы',
      'services.features.regional_transportation': 'Региональная перевозка',
      'services.features.international_transportation': 'Международная перевозка',
      'services.features.all_documents': 'Все необходимые документы',
      'services.features.colored_photo': 'Изготовление цветного фото',
      'services.features.metal_letters': 'Надписи металлическими буквами',
      'services.features.artistic_ornaments': 'Художественные орнаменты',
      'services.features.landscape_design': 'Ландшафтный дизайн',
      'services.features.stone_work': 'Работа с камнем',
      'services.features.complex_service': 'Комплексное обслуживание',
      'services.features.dignified_environment': 'Достойная обстановка',
      'services.features.full_service': 'Полное обслуживание',
      'services.features.flexible_schedule': 'Гибкий график',
      'services.features.large_capacity': 'Большая вместимость',
      
      // Product Hero Keywords
      'products.coffins.hero_keywords': 'Качественные деревянные гробы из натуральных материалов. Гробы люкс класса и гробы эконом класса во всех ценовых категориях.',
      'products.shrouds.hero_keywords': 'Хлопковые саваны из натуральных материалов. Шелковые саваны из качественной ткани и саваны из искусственной ткани с прочными материалами.',
      
      // Shrouds Product Detail Translations
      'products.shrouds.hero_description_1': 'Похоронное бюро Ритуал Сервис предлагает саваны, саван является неотъемлемой частью христианской традиции - он покрывает усопшего как знак мира и святости.',
      'products.shrouds.hero_description_2': 'Мы предлагаем: традиционные и мягкие тканевые саваны, с крестом, изображением или минималистичным дизайном, различные размеры и ценовые категории, доставка на место до похорон.',
      'products.shrouds.types_section_title': 'Саван - это не просто покрывало - это символ веры и последнего пути.',
      'products.shrouds.types.traditional': 'Традиционные',
      'products.shrouds.types.traditional_materials': 'Саваны из мягкой ткани с крестом и изображением.',
      'products.shrouds.types.minimalist': 'Минималистичные',
      'products.shrouds.types.minimalist_materials': 'Минималистичные саваны с качественной тканью.',
      'products.shrouds.types.special': 'Специальные',
      'products.shrouds.types.special_materials': 'Саваны специального дизайна для индивидуальных требований.',
      'products.shrouds.consultation_text_1': 'Если вы не знаете, как выбрать - наш консультант поможет вам с выбором.',
      'products.shrouds.consultation_text_2': 'Доставка на место доступна в Тбилиси и регионах. Свяжитесь с нами для подробной информации по номеру',
      'products.refrigeration.hero_keywords': 'Похоронное бюро Ритуальный сервис предлагает высококачественные гробы-холодильники, которые обеспечивают временное сохранение усопшего до захоронения.',
      'products.cemetery_accessories.hero_keywords': 'Похоронное бюро Ритуал Сервис предлагает кладбищенские аксессуары. Аксессуары создают полную, чистую и организованную среду, где родственники могут с достоинством выразить уважение.',
      
      // Coffins Product Detail Translations
      'products.coffins.seo_header': 'Гробы - sasaxleebi в Тбилиси с качественными материалами',
      'products.coffins.hero_description_1': 'Похоронное бюро Ритуал Сервис предлагает полностью организованные и достойные услуги.',
      'products.coffins.hero_description_2': 'В нашем бюро вы можете приобрести высококачественные гробы различных дизайнов, которые отвечают как традиционным, так и современным требованиям.',
      'products.coffins.types_section_title': 'Наше бюро предлагает грузинские, итальянские и украинские гробы',
      'products.coffins.types.georgian': 'Грузинские',
      'products.coffins.types.georgian_materials': 'Материалы - бук, каштан, дуб, грецкий орех, сосна.',
      'products.coffins.types.italian': 'Итальянские',
      'products.coffins.types.italian_materials': 'Материалы - бук, каштан, дуб, грецкий орех, сосна',
      'products.coffins.types.ukrainian': 'Украинские',
      'products.coffins.types.ukrainian_materials': 'Материалы - сосна.',
      'products.coffins.consultation_text_1': 'Если вы не знаете, как выбрать - наш консультант поможет вам с выбором.',
      'products.coffins.consultation_text_2': 'Доставка на место доступна в Тбилиси и регионах. Свяжитесь с нами для получения подробной информации по номеру',
      'products.coffins.seo_keywords': 'sasaxleebi, деревянные гробы, гробы люкс класса',
      
      // Other Product SEO Headers
      'products.shrouds.seo_header': 'Саваны - sudarebi с натуральными материалами',
      'products.refrigeration.seo_header': 'Холодильники - sasaxle macivrebi гробы-холодильники',
      'products.cemetery_accessories.seo_header': 'Кладбищенские аксессуары - sasapleos akseesuarebi с качественными материалами',
      
      // Related Products
      'products.related_products_title': 'Другие продукты',
      
      // Other Product SEO Keywords
      'products.shrouds.seo_keywords': 'sudarebi, хлопковые саваны, шелковые саваны',
      'products.refrigeration.seo_keywords': 'macivrеbi, sasaxle-macivrеbi',
      'products.cemetery_accessories.seo_keywords': 'sasapleos akseesuarebi, кресты, цветочные конструкции, свечи',
      
      // Refrigeration Types Section
      'products.refrigeration.types_section_title': 'Предлагаем два вида гробов-холодильников',
      'products.refrigeration.types.american': 'Американский холодильник',
      'products.refrigeration.types.american_description': 'Американский холодильник - высококачественный гроб-холодильник, который обеспечивает временное сохранение усопшего до захоронения.',
      'products.refrigeration.types.standard': 'Стандартный холодильник',
      'products.refrigeration.types.standard_description': 'Стандартный холодильник - надежный и качественный холодильник с различиями в цене и стиле гроба.',
      'products.refrigeration.consultation_text_1': 'Разница между этими видами заключается в цене и стиле гроба.',
      'products.refrigeration.consultation_text_2': 'Мы можем доставить гроб-холодильник в любое место в Тбилиси или регионах. Для получения подробной информации свяжитесь с нами по номеру',
      
      // Cemetery Accessories Product Detail Translations
      'products.cemetery_accessories.hero_description_1': 'Похоронное бюро Ритуал Сервис предлагает кладбищенские аксессуары. Аксессуары создают полную, чистую и организованную среду, где родственники могут с достоинством выразить уважение.',
      'products.cemetery_accessories.hero_description_2': '',
      'products.cemetery_accessories.types_section_title': 'Мы предлагаем',
      'products.cemetery_accessories.types.crosses': 'Кресты',
      'products.cemetery_accessories.types.crosses_materials': 'Мраморные и деревянные кресты - традиционные и современные формы, различные размеры и дизайн.',
      'products.cemetery_accessories.types.flower_structures': 'Цветочные конструкции',
      'products.cemetery_accessories.types.flower_structures_materials': 'Металлические, каменные или керамические конструкции, которые обеспечивают постоянную чистоту и покой на могиле.',
      'products.cemetery_accessories.types.candles': 'Подсвечники',
      'products.cemetery_accessories.types.candles_materials': 'Простые и орнаментальные варианты, которые месяцами сохраняют тепло и пространство для молитвы.',
      'products.cemetery_accessories.types.marble_accessories': 'Мраморные аксессуары',
      'products.cemetery_accessories.types.marble_accessories_materials': 'Каменные фонари, мемориальные каменные доски, бордюры и другие элементы, адаптированные к дизайну могилы.',
      'products.cemetery_accessories.why_choose_title': 'Почему стоит выбрать наш продукт?',
      'products.cemetery_accessories.why_choose.quality': '✔ Качественные, прочные материалы - устойчивость к погоде и времени',
      'products.cemetery_accessories.why_choose.variety': '✔ Разнообразие выбора - традиционные и индивидуальные дизайны',
      'products.cemetery_accessories.why_choose.consultation': '✔ Помощь в правильном выборе - консультация специалистов',
      'products.cemetery_accessories.why_choose.delivery': '✔ Доставка и установка на месте в Тбилиси и регионах',
      'products.cemetery_accessories.final_message': '',
      'products.cemetery_accessories.consultation_text_1': 'Улучшите внешний вид мемориала деталями, которые остаются знаками святости и любви на долгие годы.',
      'products.cemetery_accessories.consultation_text_2': 'Свяжитесь с нами для деталей',
      
      // Coffin Types Section
      'coffin_types.title': 'В нашем бюро представлены грузинские, итальянские и украинские гробы',
      'coffin_types.georgian': 'Грузинские',
      'coffin_types.italian': 'Итальянские',
      'coffin_types.ukrainian': 'Украинские',
      'coffin_types.georgian_desc': 'Гробы из бука, каштана, дуба, грецкого ореха, сосны',
      'coffin_types.italian_desc': 'Гробы из бука, каштана, дуба, грецкого ореха, сосны',
      'coffin_types.ukrainian_desc': 'Гробы из сосновых материалов',
      'coffin_types.consultation_text': 'Если вы не знаете как выбрать - наш консультант поможет вам с выбором.',
      'coffin_types.delivery_text': 'Доставка на место возможна в Тбилиси и регионах. Свяжитесь с нами для деталей по номеру',
      
      // Service Categories
      'services.category.primary': 'Основные услуги',
      'services.category.transport': 'Транспортные услуги',
      'services.category.memorial': 'Мемориальные услуги',
      'services.category.halls': 'Залы и мероприятия',
      
      // Service Details Section
      'services.our_services_title': 'Услуги, которые мы предоставляем',
      'services.our_services_description': 'Ритуальные услуги предлагают широкий спектр услуг, наша команда готова помочь вам в трудных ситуациях.',
      
      // Service Plan List
      'services.plan_list.agent_visit': 'Личный визит нашего агента для планирования церемонии.',
      'services.plan_list.dressing_preparation': 'Одевание и подготовка усопшего.',
      'services.plan_list.embalming': 'Бальзамирование.',
      'services.plan_list.hearse_service': 'Услуги катафалка.',
      'services.plan_list.lifting_machine': 'Подъемная машина для захоронения.',
      'services.plan_list.halls': 'Траурные и банкетные залы.',
      'services.plan_list.transportation': 'Перевозка в пределах региона или за границу.',
      'services.plan_list.grave_preparation': 'Копание могилы.',
      'services.plan_list.stone_engraving': 'Роспись на камне.',
      'services.plan_list.colored_photo': 'Изготовление цветного фото.',
      'services.plan_list.metal_letters': 'Надписи металлическими буквами.',
      
      // Detailed Service Descriptions
      'services.agent_service.title': 'Услуги агента - 24/7',
      'services.agent_service.description': 'Наши опытные агенты похоронного бюро готовы предоставить полную помощь в трудные моменты 24 часа в сутки. Мы предлагаем как личные визиты по вашему адресу, так и телефонные консультации, чтобы помочь вам спланировать ритуальные процедуры. Агент предоставит вам подробную консультацию, поможет подготовить все необходимые документы и обеспечит организацию церемонии согласно вашим пожеланиям. Наша цель - облегчить этот трудный процесс и обеспечить достойную и уважительную прощальную церемонию. Свяжитесь с нами в любое время - мы рядом.',
      'services.agent_service.alt': 'Услуги агента - Ритуал Сервис',
      
      'services.dressing_service.title': 'Одевание и подготовка',
      'services.dressing_service.description': 'Наша команда профессионалов обеспечивает одевание и подготовку усопшего с высоким достоинством и уважением. Процесс включает гигиеническую подготовку, подбор и приведение в порядок одежды по согласованию с семьей, укладку волос, макияж (при необходимости) и обеспечение мирного выражения лица. Мы заботимся о том, чтобы усопший выглядел опрятно и достойно, чтобы семья и родственники могли достойно попрощаться. Весь процесс проводится с благородным отношением и надлежащей заботой, чтобы почтить усопшего и создать чувство покоя для его семьи.',
      'services.dressing_service.alt': 'Одевание и подготовка усопшего',
      
      'services.embalming_service.title': 'Бальзамирование',
      'services.embalming_service.description': 'Бальзамирование - это специальная процедура, которая обеспечивает временное сохранение тела усопшего, задерживает естественные изменения и сохраняет эстетический вид. Наши квалифицированные специалисты используют современные техники и гигиенические средства для безопасного сохранения тела. Процесс включает замену крови специальным консервирующим раствором, увлажнение кожи и косметическое восстановление по мере необходимости. Бальзамирование особенно важно, когда церемония планируется на несколько дней или требует транспортировки. Мы заботимся о том, чтобы усопший оставался в спокойном и естественном состоянии, что дает семье и родственникам возможность достойного прощания.',
      'services.embalming_service.alt': 'Услуги бальзамирования - Ритуал Сервис',
      
      'services.hearse_service.title': 'Услуги катафалка',
      'services.hearse_service.description': 'Похоронное бюро Ритуал Сервис предлагает услуги катафалка, которые обеспечивают достойную и безопасную перевозку усопшего перед захоронением.',
      'services.hearse_service.care_respect_header': 'Забота и уважение к каждому случаю',
      'services.hearse_service.specialized_vehicle': 'Специально оборудованный автомобиль',
      'services.hearse_service.service_georgia': 'Обслуживание по всей Грузии',
      'services.hearse_service.final_message': 'Наша цель - максимальный комфорт и надежность для вашей семьи в это трудное время. Свяжитесь с нами 24/7',
      'services.hearse_service.alt': 'Услуги катафалка - Ритуал Сервис',
      
      'services.transportation_service.title': 'Перевозка',
      'services.transportation_service.description': 'Перевозка усопшего - из любого места в любое место',
      'services.transportation_service.full_preparation_header': 'Мы предлагаем услуги перевозки усопшего по всей Грузии - из Тбилиси в регионы, из регионов в Тбилиси, или по другим необходимым адресам.',
      'services.transportation_service.specialized_vehicle': 'Специально оборудованный автомобиль',
      'services.transportation_service.hygienic_conditions': 'Гигиеничные и безопасные условия',
      'services.transportation_service.24_7_call': 'Вызов 24/7',
      'services.transportation_service.reliable_service': 'Надежное и уважительно выполненное обслуживание',
      'services.transportation_service.final_message': 'Мы понимаем боль вашей семьи - мы подходим к процессу перевозки с полной ответственностью. Свяжитесь с нами в любое время - мы готовы помочь вам.',
      'services.transportation_service.alt': 'Услуги перевозки - Ритуал Сервис',
      
      'services.stone_engraving_service.title': 'Роспись на камне',
      'services.stone_engraving_service.description': 'Наша художественная команда обеспечивает профессиональную роспись и гравировку на камне. Мы используем современные технологии и качественные материалы для создания долговечных и достойных работ. Наши услуги включают изготовление цветного фото, надписи металлическими буквами и художественные орнаменты. Мы работаем со всеми типами камня и обеспечиваем высококачественные результаты. Наша команда заботится о каждой детали, чтобы результат был достойным и долговечным.',
      'services.stone_engraving_service.alt': 'Роспись на камне - Ритуал Сервис',
      
      'services.grave_decoration_service.title': 'Благоустройство могил',
      'services.grave_decoration_service.description': 'Мы предлагаем комплексное благоустройство могил и мемориальные работы. Наша команда обеспечивает все необходимые работы - выкапывание могилы, бетонное обустройство, работу с камнем и ландшафтный дизайн. Мы используем качественные материалы и современные технологии для создания достойных и долговечных мемориалов. Наши услуги включают всю необходимую подготовку и обеспечивают высококачественные результаты.',
      'services.grave_decoration_service.alt': 'Благоустройство могил - Ритуал Сервис',
      
      'services.mourning_hall_service.title': 'Траурный зал',
      'services.mourning_hall_service.description': 'Похоронное бюро Ритуал Сервис предлагает выбор траурных залов',
      'services.mourning_hall_service.full_preparation_header': 'Мы предлагаем полностью оборудованный траурный зал, где перед захоронением умершего возможно:',
      'services.mourning_hall_service.rest_card': 'Отдых в спокойной и упорядоченной обстановке',
      'services.mourning_hall_service.guests_card': 'Прием гостей в тепле и чистоте',
      'services.mourning_hall_service.tradition_card': 'Проведение панихиды с соблюдением традиционных обычаев',
      'services.mourning_hall_service.infrastructure_card': 'Тихая атмосфера и полностью обеспеченная инфраструктура (скамейки, освещение, вентиляция воздуха)',
      'services.mourning_hall_service.final_message': 'Зал готов 24/7 Залы расположены по адресам •Глдани Григол Ошкели 4 •Дигоми Бохуа 14, Джикиа Саша Иоселиани 96 Мы заботимся о пространстве, где можно достойно попрощаться с любимым человеком. Рекомендуется предварительное бронирование, свяжитесь с нами по номеру',
      'services.mourning_hall_service.alt': 'Траурный зал - Ритуал Сервис',
      
      'services.banquet_hall_service.title': 'Банкетный зал',
      'services.banquet_hall_service.description': 'Наш банкетный зал идеален для мемориальных мероприятий. Зал имеет большую вместимость и оснащен всем необходимым оборудованием. Мы предлагаем полное обслуживание, включая приготовление пищи, расстановку столов и организацию всех необходимых деталей. Наша команда обеспечивает высококачественное обслуживание и заботится о каждой детали, чтобы мероприятие прошло успешно.',
      'services.banquet_hall_service.alt': 'Банкетный зал - Ритуал Сервис',
      
      'services.grave_preparation_service.title': 'Копание могилы',
      'services.grave_preparation_service.description': 'Похоронное бюро Ритуал Сервис предлагает услуги по копанию могилы для проведения процесса захоронения. Подготовка могилы требует точности, опыта и высокого чувства ответственности - и именно это мы предлагаем.',
      'services.grave_preparation_service.long_description': 'Похоронное бюро Ритуал Сервис предлагает услуги по копанию могилы для проведения процесса захоронения. Подготовка могилы требует точности, опыта и высокого чувства ответственности - и именно это мы предлагаем.',
      'services.grave_preparation_service.feature_1': 'Копание могилы согласно требуемым размерам (одиночные, двойные, семейные могилы)',
      'services.grave_preparation_service.feature_2': 'Правильная выемка, транспортировка и выравнивание грунта',
      'services.grave_preparation_service.feature_3': 'Установка прочной конструкции при необходимости (бетонное покрытие или стены)',
      'services.grave_preparation_service.feature_4': 'Своевременная готовность в день похорон - все будет устроено до указанного времени',
      'services.grave_preparation_service.process_1': 'С учетом традиционных и религиозных обычаев',
      'services.grave_preparation_service.process_2': 'Свяжитесь с нами для получения подробной информации',
      'services.grave_preparation_service.service_details_header': 'Детали обслуживания',
      'services.grave_preparation_service.alt': 'Копание могилы - Ритуал Сервис',
      
      'services.colored_photo_service.title': 'Изготовление цветных фотографий',
      'services.colored_photo_service.description': 'Наши специалисты обеспечивают высококачественное изготовление цветных фотографий на камне. Мы используем современные технологии и качественные материалы для создания долговечных и достойных работ. Наш сервис включает обработку фотографий, перенос на камень и сохранение цветов. Мы работаем на всех типах камня и обеспечиваем высококачественные результаты. Наша команда заботится о каждой детали, чтобы результат был достойным и долговечным.',
      'services.colored_photo_service.alt': 'Изготовление цветных фотографий - Ритуал Сервис',
      
      'services.metal_letters_service.title': 'Металлические надписи',
      'services.metal_letters_service.description': 'Похоронное бюро Ритуал Сервис предлагает прикрепляемые надписи на надгробных камнях, у нас есть надписи из алюминия и латуни.',
      'services.metal_letters_service.alt': 'Металлические надписи - Ритуал Сервис',
      'services.metal_letters_service.long_description': 'Похоронное бюро Ритуал Сервис предлагает прикрепляемые надписи на надгробных камнях, у нас есть надписи из алюминия и латуни. Надписи в различных стилях и шрифтах - грузинский, русский, английский или другие языки. Классические и современные дизайны. Лазерная или механическая гравировка непосредственно на поверхности камня. Даты рождения и смерти, имена, цитаты, молитвы или личные тексты. Буквы изготавливаются из прочных, устойчивых к погодным условиям материалов. Каждая надпись продумывается индивидуально - адаптируется к размеру, форме и стилю камня. Выбор производится с помощью профессионала - согласно правильному шрифту, размеру и расположению.',
      'services.metal_letters_service.feature_1': 'Надписи в различных стилях и шрифтах - грузинский, русский, английский или другие языки',
      'services.metal_letters_service.feature_2': 'Классические и современные дизайны',
      'services.metal_letters_service.feature_3': 'Лазерная или механическая гравировка непосредственно на поверхности камня',
      'services.metal_letters_service.feature_4': 'Даты рождения и смерти, имена, цитаты, молитвы или личные тексты',
      'services.metal_letters_service.process_1': 'Материалы и методы изготовления',
      'services.metal_letters_service.materials_methods_1': 'Буквы изготавливаются из прочных, устойчивых к погодным условиям материалов',
      'services.metal_letters_service.materials_methods_2': 'Каждая надпись продумывается индивидуально - адаптируется к размеру, форме и стилю камня',
      'services.metal_letters_service.materials_methods_3': 'Выбор производится с помощью профессионала - согласно правильному шрифту, размеру и расположению',
      'services.metal_letters_service.process_2': 'Свяжитесь с нами для получения подробной информации',

      // Individual Services Section
      'services.individual_services_title': 'Наши услуги',
      'services.individual_services_description': 'Профессиональные ритуальные услуги 24/7 - все необходимые услуги в одном месте',

      // Individual Service Titles and Descriptions
      'services.agent_visit.title': 'Личный визит агента',
      'services.agent_visit.description': 'Личный визит нашего агента для планирования церемонии. Профессиональная консультация и планирование 24/7.',

      'services.dressing.title': 'Одевание и подготовка усопшего',
      'services.dressing.description': 'Одевание и подготовка усопшего. Достойная и уважительная подготовка согласно пожеланиям семьи.',

      'services.embalming.title': 'Бальзамирование',
      'services.embalming.description': 'Бальзамирование. Профессиональная подготовка и хранение с использованием современных технологий.',

      'services.hearse.title': 'Услуги катафалка',
      'services.hearse.description': 'Услуги катафалка. Современные катафалки в любом направлении 24/7.',

      'services.lifting_machine.title': 'Подъемная машина',
      'services.lifting_machine.description': 'Подъемная машина. Профессиональное оборудование для безопасной транспортировки.',

      'services.halls.title': 'Траурные и банкетные залы',
      'services.halls.description': 'Траурные и банкетные залы. Достойная обстановка для церемоний и мемориальных мероприятий.',

      'services.transportation.title': 'Перевозка по региону и за границу',
      'services.transportation.description': 'Перевозка в пределах региона или за границу. Подготовка всех необходимых документов и безопасная транспортировка.',

      'services.grave_preparation.title': 'Копание могилы',
      'services.grave_preparation.description': 'Копание могилы. Профессиональное обслуживание для процесса захоронения.',

      'services.stone_engraving.title': 'Роспись на камне',
      'services.stone_engraving.description': 'Роспись на камне. Профессиональная художественная работа с использованием современных технологий.',

      'services.colored_photo.title': 'Изготовление цветного фото',
      'services.colored_photo.description': 'Изготовление цветного фото. Качественные фотографии для длительного хранения.',

      'services.metal_letters.title': 'Металлические надписи',
      'services.metal_letters.description': 'Металлические надписи. Долговечные и достойные надписи металлическими буквами.',
      
      // New service translations for breadcrumb
      'services.embalming_dressing_service.title': 'Бальзамирование, макияж, одевание',
      'services.embalming_dressing_service.description': 'Похоронное бюро Ритуал Сервис предлагает профессиональные подготовительные услуги перед захоронением.',
      'services.embalming_dressing_service.full_preparation_header': 'Полная подготовка и приведение в порядок усопшего перед захоронением:',
      'services.embalming_dressing_service.embalming_card': 'Бальзамирование - Врач нашей команды обеспечивает процесс бальзамирования, достойное сохранение тела для целей задержки времени',
      'services.embalming_dressing_service.makeup_card': 'Грим - Легкое восстановление лица при необходимости',
      'services.embalming_dressing_service.dressing_card': 'Одевание - Одевание и приведение в порядок усопшего',
      'services.embalming_dressing_service.final_message': 'В тяжелые моменты мы заботимся о каждой детали - с полной надежностью. Обслуживание 24/7 по всей Грузии. Свяжитесь с нами для получения подробной информации',
      'services.microbus_service.title': 'Маршрутка',
      'services.microbus_service.description': 'Похоронное бюро Ритуал Сервис предлагает услуги маршрутки. Безопасная и комфортная перевозка гостей.',
      'services.microbus_service.long_description': 'Похоронное бюро Ритуал Сервис предлагает услуги маршрутки. Безопасная и комфортная перевозка гостей.',
      'services.microbus_service.full_preparation_header': 'Предлагаем услуги маршрутки для перевозки гостей в день похорон',
      'services.microbus_service.comfortable_modern': 'Комфортная и современная маршрутка',
      'services.microbus_service.safe_travel': 'Безопасное путешествие на любое расстояние',
      'services.microbus_service.timely_reliable': 'Своевременное и надежное обслуживание',
      'services.microbus_service.tbilisi_regions': 'Обслуживание в Тбилиси и регионах',
      'services.microbus_service.final_message': 'Свяжитесь с нами, и мы позаботимся о легком и безопасном передвижении гостей. Вызов 24/7.',
      'services.hall_service.title': 'Зал',
      'services.hall_service.description': 'Мы предлагаем полностью оборудованный зал, где вы можете встретить и принять гостей после похорон в спокойной, упорядоченной и достойной обстановке.',
      'services.hall_service.long_description': 'Мы предлагаем полностью оборудованный зал, где вы можете встретить и принять гостей после похорон в спокойной, упорядоченной и достойной обстановке. Наш зал создан для того, чтобы в эти тяжелые моменты вы могли получить все услуги в одном пространстве. Предварительное бронирование обязательно, свяжитесь с нами по номеру +995 557 55 61 16.',
      'services.hall_service.process_1': 'Банкетный зал',
      'services.hall_service.process_2': 'Наш зал создан для того, чтобы в эти тяжелые моменты вы могли получить все услуги в одном пространстве. Предварительное бронирование обязательно, свяжитесь с нами по номеру +995 557 55 61 16.',
      'services.hall_service.feature_1': 'Комфортное пространство',
      'services.hall_service.feature_2': 'Обеспечено всей необходимой инфраструктурой',
      'services.hall_service.feature_3': 'Удобное расположение',
      'services.hall_service.feature_4': '24/7 доступ и обслуживание',
      'services.lifting_machine_service.title': 'Подъемная машина',
      'services.lifting_machine_service.description': 'Похоронное бюро Ритуал Сервис предлагает услуги подъемной машины. Мы предлагаем услуги подъемной машины для умершего, которая обеспечивает безопасное, упорядоченное и достойное опускание гроба в могилу.',
      'services.lifting_machine_service.long_description': 'Похоронное бюро Ритуал Сервис предлагает услуги подъемной машины. Мы предлагаем услуги подъемной машины для умершего, которая обеспечивает безопасное, упорядоченное и достойное опускание гроба в могилу.',
      'services.lifting_machine_service.process_1': 'Подъемная машина',
      'services.lifting_machine_service.process_2': 'Подъемная машина не только облегчает процесс, но и создает упорядоченную, достойную обстановку на похоронной церемонии. Свяжитесь с нами по номеру',
      'services.lifting_machine_service.feature_1': 'Безопасное и достойное опускание',
      'services.lifting_machine_service.feature_2': 'Профессиональное обслуживание',
      'services.lifting_machine_service.feature_3': 'Упорядоченный процесс',
      'services.lifting_machine_service.feature_4': '24/7 доступность',
      'services.cemetery_decoration_service.title': 'Благоустройство кладбища',
      'services.cemetery_decoration_service.description': 'Похоронное бюро Ритуал Сервис предлагает услуги по благоустройству кладбища группой профессиональных мастеров, предназначенные для достойного и постоянного обустройства могилы вашего близкого человека.',
      'services.cemetery_decoration_service.long_description': 'Похоронное бюро Ритуал Сервис предлагает услуги по благоустройству кладбища группой профессиональных мастеров, предназначенные для достойного и постоянного обустройства могилы вашего близкого человека.',
      'services.cemetery_decoration_service.full_preparation_header': 'Что включает наша услуга?',
      'services.cemetery_decoration_service.high_quality_materials_header': 'Обустройство высококачественными материалами:',
      'services.cemetery_decoration_service.high_quality_materials_desc': 'Мы работаем с различными видами камня - мрамором, гранитом, габбро лабрадором… Каждый материал отличается размером, прочностью и уникальным внешним видом, что позволяет выбрать то, что лучше всего подходит вашим требованиям и бюджету.',
      'services.cemetery_decoration_service.individual_approach_header': 'Полностью индивидуальный подход:',
      'services.cemetery_decoration_service.individual_approach_desc': 'Наши специалисты помогут вам выбрать дизайн и предложат лучшие решения, которые подходят как традиционному, так и современному стилю.',
      'services.cemetery_decoration_service.full_spectrum_header': 'Полный спектр работ:',
      'services.cemetery_decoration_service.full_spectrum_desc': 'Асфальтирование могилы, установка бордюров, обустройство покрытия могилы, обработка камня и профессиональное обустройство.',
      'services.cemetery_decoration_service.long_term_result_header': 'Долгосрочный результат:',
      'services.cemetery_decoration_service.long_term_result_desc': 'Наши используемые материалы и технологии обеспечивают, чтобы кладбище не теряло свой внешний вид и функциональность на протяжении многих лет, сопротивляясь погодным условиям и другим воздействиям.',
      'services.cemetery_decoration_service.why_choose_header': 'Почему стоит выбрать нас?',
      'services.cemetery_decoration_service.professionalism': '✔ Высокий профессионализм и опыт',
      'services.cemetery_decoration_service.affordable_prices': '✔ Доступные цены и прозрачная система скидок',
      'services.cemetery_decoration_service.reliability': '✔ Полная ответственность и надежность',
      'services.cemetery_decoration_service.georgia_wide': '✔ Обслуживание по всей Грузии',
      'services.cemetery_decoration_service.timely_completion': '✔ Своевременное выполнение и контроль качества',
      'services.cemetery_decoration_service.final_message': 'Наша команда готова ответить на все ваши вопросы и помочь на любом этапе благоустройства кладбища. Свяжитесь с нами по номеру',
      'services.grave_stones_service.title': 'Надгробные камни, роспись на камне',
      'services.grave_stones_service.description': 'Похоронное бюро Ритуал Сервис предлагает надгробные камни как для установки, так и для размещения. Мы предлагаем качественные надгробные камни различных материалов, дизайнов и размеров, чтобы вы могли достойно обустроить мемориал для вашего близкого человека.',
      'services.grave_stones_service.long_description': 'Похоронное бюро Ритуал Сервис предлагает надгробные камни как для установки, так и для размещения. Мы предлагаем качественные надгробные камни различных материалов, дизайнов и размеров, чтобы вы могли достойно обустроить мемориал для вашего близкого человека.',
      'services.grave_stones_service.feature_1': 'Мрамор - элегантный, чистый и классический материал, отличающийся красотой и долговечностью.',
      'services.grave_stones_service.feature_2': 'Кутаисский гранит - прочный и долговечный камень, который выдерживает любую погоду и сохраняет свой внешний вид на протяжении многих лет.',
      'services.grave_stones_service.feature_3': 'Базальт - прочный и долговечный камень, который выдерживает любую погоду и сохраняет свой внешний вид на протяжении многих лет.',
      'services.grave_stones_service.feature_4': 'Габбро и лабрадор - уникальные текстуры и цветовая гамма, которые создадут особенный и отличный памятник.',
      'services.grave_stones_service.process_1': 'Роспись на надгробных камнях',
      'services.grave_stones_service.process_2': 'Мы предлагаем высококачественную и детальную роспись на надгробных камнях, которая идеально передает значение и имя мемориала. Процесс росписи выполняется профессионалами, которые используют специальные, устойчивые к погодным условиям краски, которые не выцветут на протяжении многих лет.',
      'services.grave_stones_service.process_3': 'Свяжитесь с нами по номеру наши консультанты с удовольствием предоставят вам полную информацию и помогут сделать идеальный выбор.',
      'services.grave_stones_service.our_products_header': 'Наша продукция включает:',
      'services.grave_stones_service.painting_feature_1': 'Черно-белая и цветная роспись',
      'services.grave_stones_service.painting_feature_2': 'Духовные символы, религиозные изображения',
      'services.grave_stones_service.painting_feature_3': 'Персональные портреты и декоративные элементы',
      'services.grave_stones_service.why_choose_header': 'Почему стоит выбрать нас?',
      'services.grave_stones_service.professionalism': '✔ Многолетний опыт и профессионализм',
      'services.grave_stones_service.individual_approach': '✔ Индивидуальный подход и консультации по дизайну',
      'services.grave_stones_service.quality_materials': '✔ Качественные материалы и технологии',
      'services.grave_stones_service.high_standards': '✔ Все работы выполняются по высоким стандартам',
      'services.grave_stones_service.convenient_service': '✔ Своевременное и удобное обслуживание по всей Грузии',
      'services.related_services': 'Другие услуги',
      'services.gallery': 'Фото галерея'
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
        } else {
          // Default to Georgian for root path and any other paths
          language = 'ka';
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
          description: 'სრული სარიტუალო მომსახურება: ბალზამირება, კატაფალკი, ქვაზე ხატვა, გადასვენება, საპანაშვიდე დარბაზი, მიცვალებულის ჩაცმა.',
          keywords: 'დაკრძალვის სერვისები, ბალზამირება, კატაფალკები, ქვაზე ხატვა, გადასვენება, damkrdzalavi biuro, მიცვალებულის ჩაცმა, საფლავის მოპირკეთება',
          h1: 'სარიტუალო მომსახურება - დამკრძალავი ბიურო',
          services: [
            { name: 'ბალზამირება', url: '/services/embalming', desc: 'მიცვალებულის პროფესიონალური ბალზამირება' },
            { name: 'კატაფალკები', url: '/services/hearse', desc: 'კატაფალკების მომსახურება ყველა მიმართულებით' },
            { name: 'გადასვენება', url: '/services/transportation', desc: 'მიცვალებულის გადასვენება რაიონში და საზღვარგარეთ' },
            { name: 'ქვაზე ხატვა', url: '/services/stone-engraving', desc: 'პროფესიონალური ქვაზე ხატვა და გრავიურა' }
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
                  title: 'პროდუქცია - სასახლეები, სუდარები, სასახლე მაცივრები | რიტუალ სერვისი',
        description: 'ხარისხიანი სარიტუალო პროდუქცია: სასახლეები, სუდარები, სასახლე მაცივრები. ფართო არჩევანი, მაღალი ხარისხი.',
        keywords: 'სასახლეები, სუდარები, სასახლე მაცივრები, sasaxleebi, sudarebi, sasaxle macivrebi, კუბო, სარიტუალო პროდუქცია',
          h1: 'სარიტუალო პროდუქცია',
          products: [
                    { name: 'სასახლეები', url: '/products/coffins', desc: 'ხარისხიანი სასახლეები ყველა სტილში' },
        { name: 'სუდარები', url: '/products/shrouds', desc: 'ტრადიციული და თანამედროვე სუდარები' },
                          { name: 'სასახლე მაცივრები', url: '/products/refrigeration', desc: 'სასახლე-მაცივრები ხანგრძლივი შენახვისთვის' }
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
          'დამკრძალავი ბიურო', 'სარიტუალო სახლი', 'ბალზამირება', 'კატაფალკი', 
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
          'ბალზამირება', 'balzamireba', 'კატაფალკები', 'katafalka', 'ქვაზე ხატვა', 
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
          'სასახლეები', 'sasaxleebi', 'სუდარები', 'sudarebi', 'სასახლე მაცივრები', 'sasaxle macivrebi',
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