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
      'breadcrumb.plan_funeral': 'დაგეგმე დაკრძალვა',
      
      // Breadcrumb translations for URL segments
      'breadcrumb.coffins': 'სასახლეები',
      'breadcrumb.shrouds': 'სუდარები',
      'breadcrumb.refrigeration': 'მაცივრები',
      'breadcrumb.hearse': 'კატაფალკი',
      'breadcrumb.embalming': 'ბალზამირება',
      'breadcrumb.transportation': 'გადასვენება',
      'breadcrumb.stone_engraving': 'ქვაზე ხატვა',
      'breadcrumb.grave_decoration': 'საფლავის მოპირკეთება',
      'breadcrumb.dressing': 'მიცვალებულის ჩაცმა',
      'breadcrumb.mourning_hall': 'საპანაშვიდე დარბაზი',
      'breadcrumb.banquet_hall': 'საბანკეტო დარბაზი',
      'breadcrumb.metal_letters': 'ლითონის ასოებით წარწერა',
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
      'services.mourning_hall': 'საპანაშვიდე დარბაზი',
      'services.mourning_hall_desc': 'საპანაშვიდე დარბაზი ღირსეული გარემოთი. სრული მომსახურება, მოქნილი გრაფიკი.',
      'services.banquet_hall': 'საბანკეტო დარბაზი',
      'services.banquet_hall_desc': 'საბანკეტო დარბაზი მემორიალური ღონისძიებებისთვის. დიდი ტევადობა, სრული მომსახურება.',
      'services.metal_letters': 'ლითონის ასოებით წარწერა',
      'services.metal_letters_desc': 'ლითონის ასოებით წარწერების დამზადება საფლავებზე. მაღალი ხარისხის მეტალის ასოები.',

      // Products with Keywords
      'products.coffins': 'სასახლეები',
      'products.coffins_desc': 'ხარისხიანი სასახლეები: ქართული, უკრაინული, იტალიური სტილი. ფართო არჩევანი ყველა ბიუჯეტისთვის.',
      'products.shrouds': 'სუდარები',
      'products.shrouds_desc': 'ტრადიციული და თანამედროვე სუდარები. ნატურალური მასალები, ხელნაკეთი მუშაობა.',
      'products.refrigeration': 'მაცივრები',
      'products.refrigeration_desc': 'სასახლე-მაცივრები, ამერიკული და სტანდარტული მოდელები ხანგრძლივი შენახვისთვის.',
      'products.hearse': 'კატაფალკი',
      'products.hearse_desc': 'თანამედროვე კატაფალკები 24/7 მომსახურებით',
      'products.coffins_long': 'ჩვენი სასახლეები წარმოადგენს ხარისხიან ხის სასახლეებს ბუნებრივი მასალებით. ლუქს კლასის სასახლეები, ეკონომ კლასის სასახლეები და სტანდარტული სასახლეები - ყველა ფასის კატეგორიაში.',
      'products.shrouds_long': 'სუდარები - ჩვენ გთავაზობთ ბამბის სუდარებს  ბუნებრივი მასალებით, სილკის სუდარებს ხარისხიანი ქსოვილით და ხელოვნური ქსოვილის სუდარებს გამძლე მასალებით.',
      'products.refrigeration_long': 'მაცივრები - ჩვენი სასახლე-მაცივრები კომბინირებული ფუნქციით. სტაციონარული მაცივრები დიდი ტევადობით და მობილური მაცივრები ტრანსპორტირებისთვის.',
      'products.hearse_long': 'კატაფალკი - ჩვენი თანამედროვე კატაფალკების პარკი მზადაა ნებისმიერ დროს. თანამედროვე კატაფალკები უკანასკნელი მოდელები და ლუქს კლასის კატაფალკები უმაღლესი კომფორტით. გადასვენება ნებისმიერ მიმართულებით.',
      
      'header.phone': '+995 599 069 898',

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

      // Funeral Planning Page
      'funeral_planning.title': 'დაკრძალვის დაგეგმვა',
      'funeral_planning.subtitle': 'პროფესიონალური დაგეგმვა და კონსულტაცია',
      'funeral_planning.description': 'დაგეხმარებით დაკრძალვის ყველა დეტალის დაგეგმვაში. უფასო კონსულტაცია და ნაბიჯ-ნაბიჯ გზამკვლევი.',
      'funeral_planning.planning_guide': 'დაგეგმვის გზამკვლევი',
      'funeral_planning.call_us': 'დაგვიკავშირდით',
      
      // Planning Steps
      'funeral_planning.step_consultation_title': 'საწყისი კონსულტაცია',
      'funeral_planning.step_consultation_desc': 'ჩვენი გამოცდილი გუნდი შეხვდება თქვენს საჭიროებებს და მოგაწვდით პერსონალურ რჩევებს.',
      'funeral_planning.step_consultation_detail1': 'პირადი შეხვედრა ჩვენს დამკრძალავ ბიუროს ხელმძღვანელთან',
      'funeral_planning.step_consultation_detail2': 'ოჯახის სურვილებისა და ტრადიციების განხილვა',
      'funeral_planning.step_consultation_detail3': 'საწყისი ღირებულების შეფასება და სერვისის ვარიანტები',
      
      'funeral_planning.step_documentation_title': 'დოკუმენტაციის მომზადება',
      'funeral_planning.step_documentation_desc': 'ჩვენ დაგეხმარებით ყველა საჭირო იურიდიული დოკუმენტის შეგროვებაში და მომზადებაში.',
      'funeral_planning.step_documentation_detail1': 'სიკვდილის მოწმობა და სამედიცინო დოკუმენტაცია',
      'funeral_planning.step_documentation_detail2': 'დაკრძალვის ნებართვები და სასაფლაოს მოწყობა',
      'funeral_planning.step_documentation_detail3': 'დაზღვევისა და იურიდიული დოკუმენტების დამუშავება',
      
      'funeral_planning.step_ceremony_title': 'ცერემონიის დაგეგმვა',
      'funeral_planning.step_ceremony_desc': 'ერთად დავგეგმავთ მნიშვნელოვან და ღირსეულ ცერემონიას, რომელიც პატივს მიაგებს თქვენს ნათესავს.',
      'funeral_planning.step_ceremony_detail1': 'ცერემონიის ტიპისა და ადგილის არჩევა',
      'funeral_planning.step_ceremony_detail2': 'მუსიკა, კითხვები და პერსონალური დეტალები',
      'funeral_planning.step_ceremony_detail3': 'ცერემონიის ხელმძღვანელისა და მონაწილეთა კოორდინაცია',
      
      'funeral_planning.step_logistics_title': 'ლოგისტიკის კოორდინაცია',
      'funeral_planning.step_logistics_desc': 'ჩვენ ვმართავთ ყველა ტრანსპორტირებას, დროის განრიგს და ადგილის მოწყობას, რომ ყველაფერი შეუფერხებლად ჩატარდეს.',
      'funeral_planning.step_logistics_detail1': 'ტრანსპორტირებისა და კატაფალკის მოწყობა',
      'funeral_planning.step_logistics_detail2': 'დროის კოორდინაცია ყველა მხარესთან',
      'funeral_planning.step_logistics_detail3': 'ადგილის მომზადება და სტუმართა ორგანიზება',
      
      'funeral_planning.step_coordination_title': 'საბოლოო კოორდინაცია',
      'funeral_planning.step_coordination_desc': 'საბოლოო მიმოხილვა და კოორდინაცია, რომ ყველა დეტალი იყოს სრულყოფილი ცერემონიისთვის.',
      'funeral_planning.step_coordination_detail1': 'საბოლოო მიმოხილვა და დადასტურება',
      'funeral_planning.step_coordination_detail2': 'საგანგებო კონტაქტი და სარეზერვო გეგმები',
      'funeral_planning.step_coordination_detail3': 'დღის კოორდინაცია და მხარდაჭერა',
      
      // Planning Sections
      'funeral_planning.pre_planning': 'წინასწარი დაგეგმვა',
      'funeral_planning.ceremony_planning': 'ცერემონიის დაგეგმვა',
      'funeral_planning.logistics': 'ლოგისტიკა',
      'funeral_planning.documentation': 'დოკუმენტაცია',
      
      // Checklist Items - Pre-Planning
      'funeral_planning.deceased_wishes': 'გარდაცვალებულის სურვილები',
      'funeral_planning.budget_planning': 'ბიუჯეტის განსაზღვრა',
      'funeral_planning.burial_location': 'დაკრძალვის ადგილის არჩევა',
      'funeral_planning.family_consultation': 'ოჯახის კონსულტაცია',
      
      // Checklist Items - Ceremony
      'funeral_planning.ceremony_type': 'ცერემონიის ტიპი',
      'funeral_planning.choose_officiant': 'ღვთისმსახურის არჩევა',
      'funeral_planning.musical_accompaniment': 'მუსიკალური აკომპანიმენტი',
      'funeral_planning.readings_prayers': 'კითხვები და ლოცვები',
      
      // Checklist Items - Logistics
      'funeral_planning.transportation': 'ტრანსპორტირება',
      'funeral_planning.timing_schedule': 'დროის განრიგი',
      'funeral_planning.guest_organization': 'სტუმრების ორგანიზება',
      'funeral_planning.venue_booking': 'შენობების და ობიექტების ჯავშანი',
      
      // Checklist Items - Documentation
      'funeral_planning.death_certificate': 'სიკვდილის მოწმობა',
      'funeral_planning.permits': 'ნებართვები',
      'funeral_planning.insurance': 'დაზღვევა',
      'funeral_planning.legal_documents': 'იურიდიული დოკუმენტები',
      
      // FAQ Section
      'funeral_planning.faq_title': 'ხშირად დასმული კითხვები',
      'funeral_planning.faq_early_planning_q': 'რამდენად ადრე უნდა დავიწყოთ დაგეგმვა?',
      'funeral_planning.faq_early_planning_a': 'რეკომენდებულია დაგეგმვის დაწყება მინიმუმ 2-3 კვირით ადრე, თუმცა ზოგიერთი სერვისისთვის შეიძლება მოკლე ვადებიც.',
      'funeral_planning.faq_documents_q': 'რა დოკუმენტებია საჭირო?',
      'funeral_planning.faq_documents_a': 'საჭიროა სიკვდილის მოწმობა, პირადობის მოწმობა, ოჯახის წევრების დოკუმენტები და სხვა ნებართვები.',
      'funeral_planning.faq_personalized_q': 'შეგვიძლია თუ არა პერსონალიზებული ცერემონია?',
      'funeral_planning.faq_personalized_a': 'დიახ, ჩვენ ვთავაზობთ სრულად პერსონალიზებულ ცერემონიებს, რომლებიც ასახავს გარდაცვალებულის პიროვნებას და ოჯახის სურვილებს.',
      'funeral_planning.faq_timing_q': 'რამდენ ხანს სჭირდება დაკრძალვის დაგეგმვა?',
      'funeral_planning.faq_timing_a': 'დაგეგმვის პროცესი ჩვეულებრივ 1-3 დღეს სჭირდება, დამოკიდებულია მოწყობის სირთულეზე. ჩვენ შეგვიძლია გავითვალისწინოთ გადაუდებელი სიტუაციები და ვმუშაობთ თქვენს დროის ფარგლებში.',
      'funeral_planning.faq_cost_q': 'რა შედის დაკრძალვის ღირებულებაში?',
      'funeral_planning.faq_cost_a': 'ჩვენი დაკრძალვის ღირებულება მოიცავს პროფესიონალურ სერვისებს, ტრანსპორტირებას, დოკუმენტაციის დახმარებას და ცერემონიის კოორდინაციას. ჩვენ ვთავაზობთ გამჭვირვალე ფასს და შეგვიძლია ვმუშაობთ სხვადასხვა ბიუჯეტის ფარგლებში.',
      'funeral_planning.faq_cemetery_q': 'როგორ ავირჩიო სასაფლაო?',
      'funeral_planning.faq_cemetery_a': 'ჩვენ შეგვიძლია დაგეხმაროთ სასაფლაოს ვარიანტების შესწავლაში მდებარეობის, რელიგიური მოთხოვნების, ოჯახის პრეფერენციებისა და ბიუჯეტის მიხედვით. ჩვენ გვაქვს ურთიერთობები ბევრ ადგილობრივ სასაფლაოთან.',
      'funeral_planning.faq_transport_q': 'თქვენ გთავაზობთ ტრანსპორტული სერვისებს?',
      'funeral_planning.faq_transport_a': 'დიახ, ჩვენ ვთავაზობთ ყოვლისმომცველ ტრანსპორტულ სერვისებს, მათ შორის კატაფალკას, ოჯახის ტრანსპორტირებას და რეგიონულ ან საერთაშორისო ტრანსპორტირებას საჭიროების შემთხვევაში.',
      'funeral_planning.faq_cremation_q': 'თქვენ გთავაზობთ კრემაციის სერვისებს?',
      'funeral_planning.faq_cremation_a': 'დიახ, ჩვენ ვთავაზობთ კრემაციის სერვისებს და შეგვიძლია დაგეხმაროთ კრემირებული ნაშთების მემორიალური ცერემონიების დაგეგმვაში. ჩვენ პატივს ვცემთ ყველა რელიგიურ და პირად პრეფერენციას.',
      'funeral_planning.faq_insurance_q': 'თქვენ მუშაობთ დაკრძალვის დაზღვევასთან?',
      'funeral_planning.faq_insurance_a': 'დიახ, ჩვენ ვმუშაობთ უმეტეს დაკრძალვის დაზღვევის მიმწოდებელთან და შეგვიძლია დაგეხმაროთ პრეტენზიების პროცესის გადალახვაში. ჩვენ ასევე ვთავაზობთ გადახდის გეგმებს ოჯახებისთვის.',
      'funeral_planning.faq_emergency_q': 'რა მოხდება თუ მჭირდება მყისიერი დახმარება?',
      'funeral_planning.faq_emergency_a': 'ჩვენ ვთავაზობთ 24/7 საგანგებო სერვისებს. ჩვენი გუნდი ყოველთვის ხელმისაწვდომია მყისიერი საჭიროებების დასახმარებლად და შეუძლია სწრაფად რეაგირება გადაუდებელ სიტუაციებზე.',
      
      // Contact Form
      'funeral_planning.contact_title': 'დაგვიკავშირდით',
      'funeral_planning.contact_subtitle': 'მიიღეთ უფასო კონსულტაცია',
      'funeral_planning.form_name': 'სახელი',
      'funeral_planning.form_phone': 'ტელეფონი',
      'funeral_planning.form_email': 'ელ-ფოსტა',
      'funeral_planning.form_message': 'შეტყობინება',
      'funeral_planning.form_preferred_contact': 'სასურველი კონტაქტი',
      'funeral_planning.form_phone_option': 'ტელეფონი',
      'funeral_planning.form_email_option': 'ელ-ფოსტა',
      'funeral_planning.form_submit': 'გაგზავნა',
      'funeral_planning.form_submitted': 'თქვენი შეტყობინება გაიგზავნა! ჩვენ მალე დაგიკავშირდებით.',
      
      // Progress and Status
      'funeral_planning.progress': 'პროგრესი',
      'funeral_planning.completed': 'დასრულებული',
      'funeral_planning.pending': 'მიმდინარე',
      'funeral_planning.start_planning': 'დაიწყეთ დაგეგმვა',
      'funeral_planning.cta_title': 'მზად ხართ დაგეგმვის დასაწყებად?',
      'funeral_planning.cta_description': 'დაგვიკავშირდით დღეს, რომ განვიხილოთ როგორ შეგვიძლია დაგეხმაროთ თქვენ და თქვენს ოჯახს',

      // Why Choose Us Section
      'why_choose.title': 'რატომ ვართ ლიდერები?',
      'why_choose.subtitle': 'პროფესიონალური გუნდი',
      'why_choose.experience': '20 წლიანი გამოცდილება',
      'why_choose.quality': 'ხარისხიანი მომსახურება',
      'why_choose.individual_approach': 'ინდივიდუალური მიდგომა',
      'why_choose.agent_visit': 'აგენტის მოწვევა',

      // About Page
      'about.hero.title': 'რიტუალ სერვისის შესახებ',
      'about.hero.subtitle': '1995 წლიდან ვთავაზობთ თანაგრძნობით და პროფესიონალურ სარიტუალო მომსახურებას',
      
      'about.how_created.title': 'როგორ შეიქმნა',
      'about.how_created.description1': '1995 წელს პეტროვების ოჯახმა დააარსა რიტუალ სერვისი, როგორც პატარა ადგილობრივი დამკრძალავი ბიურო მარტივი მისიით: ოჯახებს ღირსეული და პატივისცემული სარიტუალო მომსახურების მიწოდება მათი ყველაზე რთულ დროში. რაც ერთი ფილიალით დაიწყო, გადაიქცა რეგიონის ერთ-ერთ ყველაზე სანდო სარიტუალო მომსახურებად.',
      'about.how_created.description2': 'ჩვენი მოგზაურობა დაიწყო მაშინ, როცა პეტროვების ოჯახმა განიცადა ნაცნობის დაკარგვა და აღმოაჩინა, რომ არსებულ მომსახურებას აკლდა პირადი შეხება და კულტურული მგრძნობელობა, რაც ოჯახებს ნამდვილად სჭირდებოდათ. ეს პირადი გამოცდილება გახდა ჩვენი კომპანიის ფილოსოფიის საფუძველი - ყველა ოჯახთან ისე ვექცევით, თითქოს ჩვენი საკუთარი ოჯახი იყოს.',
      'about.how_created.image_alt': 'ჩვენი თავმოყრილი დასაწყისი',
      
      'about.what_offer.title': 'რას ვთავაზობთ',
      'about.what_offer.description': 'ვთავაზობთ ყოვლისმომცველ სარიტუალო და მემორიალურ მომსახურებას, რომელიც შექმნილია თქვენი ნაცნობების ღირსეული პატივისცემისთვის. ჩვენი სერვისები მოიცავს ტრადიციულ დაკრძალვებს, გადასვენების სერვისებს, მემორიალურ ცერემონიებს და სპეციალიზებულ კულტურულ და რელიგიურ ცერემონიებს, რომლებიც პატივს სცემენ მრავალფეროვან ტრადიციებს და რწმენებს.',
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
      'what_makes_us.care.desc': 'Ritual Service-ს პერსონალი მზად არის დაეხმაროს ადამიანებს ამ რთულ პერიოდში ცერემონიის ყველა დეტალის გატარებით. ასევე ზრუნავს თქვენი ოჯახისა და საყვარელი ადამიანისთვის მნიშვნელოვანი და დასამახსოვრებელი სერვისის შექმნაზე.',
      
      // Products Page Specific Translations
      'products.title': 'სარიტუალო პროდუქტები',
      'products.hero_description': 'სარიტუალო პროდუქტები უმაღლესი ხარისხით: სასახლეები, სუდარები, მაცივრები, კატაფალკი. ყველა პროდუქტი მზადაა 24/7.',
      'products.our_products': 'ჩვენი პროდუქტები',
      'products.quality_description': 'ხარისხიანი სარიტუალო პროდუქტები - სრული ასორტიმენტი',
      'products.categories_title': 'პროდუქტების კატეგორიები',
      'products.types_title': 'პროდუქტის ტიპები',
      'products.gallery_title': 'ფოტო გალერეა',
      'products.related_title': 'მსგავსი პროდუქტები',
      'products.details_title': 'დეტალურად',
      'products.features_title': 'ჩვენი უპირატესობები',
      
      // Product Keywords for Related Products
      'products.coffins_keywords': 'სასახლეები - sasaxleebi',
      'products.shrouds_keywords': 'სუდარები - sudarebi',
      'products.refrigeration_keywords': 'მაცივრები - macivrebi',
      'products.hearse_keywords': 'კატაფალკი - katafalki',
      
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
      
      'products.hearse.modern': 'თანამედროვე კატაფალკები',
      'products.hearse.luxury': 'ლუქს კლასის კატაფალკები',
      'products.hearse.standard': 'სტანდარტული კატაფალკები',
      'products.hearse.special': 'სპეციალური კატაფალკები',
      
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
      
      'products.hearse.features.modern': 'თანამედროვე კატაფალკები უკანასკნელი მოდელები',
      'products.hearse.features.luxury': 'ლუქს კლასის კატაფალკები უმაღლესი კომფორტით',
      'products.hearse.features.standard': 'სტანდარტული კატაფალკები სანდო ხარისხით',
      'products.hearse.features.special': 'სპეციალური კატაფალკები ინდივიდუალური მოთხოვნებისთვის',
      'products.hearse.process_title': 'კატაფალკის მომსახურების პროცესი',
      
      // Contact CTA
      'products.contact_now': 'დაგვიკავშირდით ახლავე - ჩვენ ვართ 24 საათის განმავლობაში თქვენი გვერდით',
      'services.contact_now': 'დაგვიკავშირდით ახლავე - ჩვენ ვართ 24 საათის განმავლობაში თქვენი გვერდით',
      
      // Services Page
      'services.hero_description': 'რიტუალ სერვისი გთავაზობთ სრულ კომპლექს სარიტუალო მომსახურებისა: ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, საპანაშვიდე დარბაზი, მიცვალებულის ჩაცმა.',
      'services.hero_keywords.ritual_services': 'სარიტუალო მომსახურება',
      'services.hero_keywords.embalming': 'ბალზამირება',
      'services.hero_keywords.hearse': 'კატაფალკა',
      'services.hero_keywords.stone_engraving': 'ქვაზე ხატვა',
      'services.hero_keywords.transportation': 'გადასვენება',
      'services.hero_keywords.dressing': 'მიცვალებულის ჩაცმა',
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
      'products.refrigeration.hero_keywords': 'სასახლე-მაცივრები კომბინირებული ფუნქციით. სტაციონარული მაცივრები დიდი ტევადობით და მობილური მაცივრები ტრანსპორტირებისთვის.',
      'products.hearse.hero_keywords': 'პროფესიონალური კატაფალკის მომსახურება. თანამედროვე კატაფალკები უკანასკნელი მოდელები 24/7. გადასვენება ნებისმიერ მიმართულებით.',
      
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
      'services.plan_list.grave_preparation': 'სამარხის გაჭრა, მოპირკეთება და ბეტონით მოწყობა.',
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
      'services.hearse_service.description': 'ჩვენი თანამედროვე კატაფალკების პარკი მზადაა ნებისმიერ დროს ღირსეული ტრანსპორტირებისთვის. კატაფალკის მომსახურება მოიცავს ყველა საჭირო მომზადებას, უსაფრთხო ტრანსპორტირებას და ცერემონიის ადგილზე მიყვანას. ჩვენი კატაფალკები აღჭურვილია თანამედროვე აღჭურვილობით და უზრუნველყოფენ კომფორტულ მგზავრობას. ჩვენ ვმუშაობთ ყველა მიმართულებით - როგორც თბილისში, ასევე რეგიონებში და საზღვარგარეთ. ჩვენი გუნდი უზრუნველყოფს პროფესიონალურ მომსახურებას და ზრუნავს ყველა დეტალზე, რათა ცერემონია ღირსეულად ჩატარდეს.',
      'services.hearse_service.alt': 'კატაფალკის მომსახურება - რიტუალ სერვისი',
      
      'services.transportation_service.title': 'გადასვენების სერვისი',
      'services.transportation_service.description': 'ჩვენ ვთავაზობთ მიცვალებულის გადასვენების სერვისს როგორც რეგიონში, ასევე საზღვარგარეთ. ჩვენი გამოცდილი გუნდი უზრუნველყოფს ყველა საჭირო დოკუმენტის მომზადებას, უსაფრთხო ტრანსპორტირებას და ცერემონიის ადგილზე მიყვანას. ჩვენ ვმუშაობთ ყველა მიმართულებით და ვუზრუნველყოფთ ღირსეულ მომსახურებას. ჩვენი სერვისი მოიცავს ყველა საჭირო ლოგისტიკურ მომზადებას, დოკუმენტების მომზადებას და ცერემონიის ორგანიზებას. ჩვენ ვზრუნავთ, რომ პროცესი იყოს მარტივი და უსაფრთხო თქვენი ოჯახისთვის.',
      'services.transportation_service.alt': 'გადასვენების სერვისი - რიტუალ სერვისი',
      
      'services.stone_engraving_service.title': 'ქვაზე ხატვა',
      'services.stone_engraving_service.description': 'ჩვენი ხელოვნური გუნდი უზრუნველყოფს ქვაზე პროფესიონალურ ხატვას და გრავიურას. ჩვენ ვიყენებთ თანამედროვე ტექნოლოგიებს და ხარისხიან მასალებს, რათა შევქმნათ ხანგრძლივი და ღირსეული ნაწარმოები. ჩვენი სერვისი მოიცავს ფერადი სურათის დამზადებას, ლითონის ასოებით წარწერას და ხელოვნურ ორნამენტებს. ჩვენ ვმუშაობთ ყველა სახის ქვაზე და ვუზრუნველყოფთ მაღალი ხარისხის შედეგს. ჩვენი გუნდი ზრუნავს ყველა დეტალზე, რათა შედეგი იყოს ღირსეული და ხანგრძლივი.',
      'services.stone_engraving_service.alt': 'ქვაზე ხატვა - რიტუალ სერვისი',
      
      'services.grave_decoration_service.title': 'საფლავის მოპირკეთება',
      'services.grave_decoration_service.description': 'ჩვენ ვთავაზობთ საფლავის კომპლექსურ მოპირკეთებას და მემორიალურ სამუშაოებს. ჩვენი გუნდი უზრუნველყოფს ყველა საჭირო სამუშაოს - სამარხის გაჭრას, ბეტონით მოწყობას, ქვის მუშაობას და ლანდშაფტურ დიზაინს. ჩვენ ვიყენებთ ხარისხიან მასალებს და თანამედროვე ტექნოლოგიებს, რათა შევქმნათ ღირსეული და ხანგრძლივი მემორიალი. ჩვენი სერვისი მოიცავს ყველა საჭირო მომზადებას და უზრუნველყოფს მაღალი ხარისხის შედეგს.',
      'services.grave_decoration_service.alt': 'საფლავის მოპირკეთება - რიტუალ სერვისი',
      
      'services.mourning_hall_service.title': 'საპანაშვიდე დარბაზი',
      'services.mourning_hall_service.description': 'ჩვენი საპანაშვიდე დარბაზი უზრუნველყოფს ღირსეულ გარემოს სამგლოვიარო ცერემონიებისთვის. დარბაზი აღჭურვილია ყველა საჭირო აღჭურვილობით და უზრუნველყოფს კომფორტულ გარემოს ოჯახისა და სტუმრებისთვის. ჩვენ ვთავაზობთ სრულ მომსახურებას, მათ შორის მუსიკალურ აკომპანიმენტს, სვეტების მომზადებას და ყველა საჭირო დეტალის ორგანიზებას. ჩვენი გუნდი ზრუნავს ყველა დეტალზე, რათა ცერემონია ღირსეულად ჩატარდეს.',
      'services.mourning_hall_service.alt': 'საპანაშვიდე დარბაზი - რიტუალ სერვისი',
      
      'services.banquet_hall_service.title': 'საბანკეტო დარბაზი',
      'services.banquet_hall_service.description': 'ჩვენი საბანკეტო დარბაზი იდეალურია მემორიალური ღონისძიებებისთვის. დარბაზი აქვს დიდი ტევადობა და აღჭურვილია ყველა საჭირო აღჭურვილობით. ჩვენ ვთავაზობთ სრულ მომსახურებას, მათ შორის კვების მომზადებას, მაგიდების მოწყობას და ყველა საჭირო დეტალის ორგანიზებას. ჩვენი გუნდი უზრუნველყოფს მაღალი ხარისხის მომსახურებას და ზრუნავს ყველა დეტალზე, რათა ღონისძიება წარმატებით ჩატარდეს.',
      'services.banquet_hall_service.alt': 'საბანკეტო დარბაზი - რიტუალ სერვისი',
      
      'services.grave_preparation_service.title': 'სამარხის გაჭრა და მოწყობა',
      'services.grave_preparation_service.description': 'ჩვენი გამოცდილი გუნდი უზრუნველყოფს სამარხის პროფესიონალურ გაჭრასა და მოწყობას. ჩვენ ვიყენებთ თანამედროვე ტექნიკას და ხარისხიან მასალებს, რათა უზრუნველვყოთ უსაფრთხო და ხანგრძლივი სამუშაო. ჩვენი სერვისი მოიცავს სამარხის გაჭრას, ბეტონით მოწყობას, ქვის მუშაობას და ყველა საჭირო დეტალის მოწყობას. ჩვენ ვმუშაობთ ყველა სახის ნიადაგზე და ვუზრუნველყოფთ მაღალი ხარისხის შედეგს. ჩვენი გუნდი ზრუნავს ყველა დეტალზე, რათა შედეგი იყოს ღირსეული და ხანგრძლივი.',
      'services.grave_preparation_service.alt': 'სამარხის გაჭრა და მოწყობა - რიტუალ სერვისი',
      
      'services.colored_photo_service.title': 'ფერადი სურათის დამზადება',
      'services.colored_photo_service.description': 'ჩვენი სპეციალისტები უზრუნველყოფენ ფერადი სურათის მაღალი ხარისხის დამზადებას ქვაზე. ჩვენ ვიყენებთ თანამედროვე ტექნოლოგიებს და ხარისხიან მასალებს, რათა შევქმნათ ხანგრძლივი და ღირსეული ნაწარმოები. ჩვენი სერვისი მოიცავს ფოტოს დამუშავებას, ქვაზე გადატანას და ფერების დაცვას. ჩვენ ვმუშაობთ ყველა სახის ქვაზე და ვუზრუნველყოფთ მაღალი ხარისხის შედეგს. ჩვენი გუნდი ზრუნავს ყველა დეტალზე, რათა შედეგი იყოს ღირსეული და ხანგრძლივი.',
      'services.colored_photo_service.alt': 'ფერადი სურათის დამზადება - რიტუალ სერვისი',
      
      'services.metal_letters_service.title': 'ლითონის ასოებით წარწერა',
      'services.metal_letters_service.description': 'ჩვენი ხელოვნური გუნდი უზრუნველყოფს ლითონის ასოებით პროფესიონალურ წარწერას ქვაზე. ჩვენ ვიყენებთ ხარისხიან ლითონს და თანამედროვე ტექნოლოგიებს, რათა შევქმნათ ხანგრძლივი და ღირსეული წარწერა. ჩვენი სერვისი მოიცავს ტექსტის მომზადებას, ლითონის ასოების დამზადებას და ქვაზე მიმაგრებას. ჩვენ ვმუშაობთ ყველა სახის ქვაზე და ვუზრუნველყოფთ მაღალი ხარისხის შედეგს. ჩვენი გუნდი ზრუნავს ყველა დეტალზე, რათა შედეგი იყოს ღირსეული და ხანგრძლივი.',
      'services.metal_letters_service.alt': 'ლითონის ასოებით წარწერა - რიტუალ სერვისი',

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

      'services.grave_preparation.title': 'სამარხის გაჭრა, მოპირკეთება და ბეტონით მოწყობა',
      'services.grave_preparation.description': 'სამარხის გაჭრა, მოპირკეთება და ბეტონით მოწყობა. კომპლექსური მემორიალური სამუშაოები.',

      'services.stone_engraving.title': 'ქვაზე ხატვა',
      'services.stone_engraving.description': 'ქვაზე ხატვა. პროფესიონალური ხელოვნური მუშაობა თანამედროვე ტექნოლოგიებით.',

      'services.colored_photo.title': 'ფერადი სურათის დამზადება',
      'services.colored_photo.description': 'ფერადი სურათის დამზადება. ხარისხიანი ფოტოები ხანგრძლივი შენახვისთვის.',

      'services.metal_letters.title': 'ლითონის ასოებით წარწერა',
      'services.metal_letters.description': 'ლითონის ასოებით წარწერა. ხანგრძლივი და ღირსეული წარწერები ლითონის ასოებით.'
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
      'breadcrumb.plan_funeral': 'Plan Funeral',
      
      // Breadcrumb translations for URL segments
      'breadcrumb.coffins': 'Coffins',
      'breadcrumb.shrouds': 'Shrouds',
      'breadcrumb.refrigeration': 'Refrigeration',
      'breadcrumb.hearse': 'Hearse',
      'breadcrumb.embalming': 'Embalming',
      'breadcrumb.transportation': 'Transportation',
      'breadcrumb.stone_engraving': 'Stone Engraving',
      'breadcrumb.grave_decoration': 'Grave Decoration',
      'breadcrumb.dressing': 'Dressing and Preparation',
      'breadcrumb.mourning_hall': 'Mourning Hall',
      'breadcrumb.banquet_hall': 'Banquet Hall',
      'breadcrumb.metal_letters': 'Metal Letter Inscriptions',
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
      'services.mourning_hall': 'Mourning Hall',
      'services.mourning_hall_desc': 'Mourning hall with dignified environment. Full service, flexible schedule.',
      'services.banquet_hall': 'Banquet Hall',
      'services.banquet_hall_desc': 'Banquet hall for memorial events. Large capacity, full service.',
      'services.metal_letters': 'Metal Letter Inscriptions',
      'services.metal_letters_desc': 'Creation of metal letter inscriptions on graves. High-quality metal letters.',

      // Products
      'products.coffins': 'Coffins',
      'products.coffins_desc': 'Quality coffins: Georgian, Ukrainian, Italian styles. Wide selection for every budget.',
      'products.shrouds': 'Shrouds',
      'products.shrouds_desc': 'Traditional and modern shrouds. Natural materials, handcrafted work.',
      'products.refrigeration': 'Refrigeration',
      'products.refrigeration_desc': 'Coffin refrigeration, American and standard models for long-term preservation.',
      'products.hearse': 'Hearse',
      'products.hearse_desc': 'Modern hearses with 24/7 service',
      'products.coffins_long': 'Our coffins represent quality wooden coffins with natural materials. Luxury class coffins, economy class coffins and standard coffins - in all price categories.',
      'products.shrouds_long': 'Shrouds - we offer cotton shrouds with natural materials, silk shrouds with quality fabric and artificial fabric shrouds with durable materials.',
      'products.refrigeration_long': 'Refrigerators - our coffin-refrigerators with combined function. Stationary refrigerators with large capacity and mobile refrigerators for transportation.',
      'products.hearse_long': 'Hearse - our modern hearse fleet is ready at any time. Modern hearses latest models and luxury class hearses with highest comfort. Transportation in any direction.',
      'header.phone': '+995 599 069 898',

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

      // Funeral Planning Page
      'funeral_planning.title': 'Funeral Planning',
      'funeral_planning.subtitle': 'Professional Planning and Consultation',
      'funeral_planning.description': 'We will help you plan every detail of the funeral. Free consultation and step-by-step guide.',
      'funeral_planning.call_us': 'Call Us',
      
      // Planning Steps
      'funeral_planning.step_consultation_title': 'Initial Consultation',
      'funeral_planning.step_consultation_desc': 'Our experienced team will meet with you to understand your needs and provide personalized guidance.',
      'funeral_planning.step_consultation_detail1': 'Personal meeting with our funeral director',
      'funeral_planning.step_consultation_detail2': 'Discussion of family wishes and traditions',
      'funeral_planning.step_consultation_detail3': 'Initial cost estimation and service options',
      
      'funeral_planning.step_documentation_title': 'Documentation Preparation',
      'funeral_planning.step_documentation_desc': 'We will help you gather and prepare all necessary legal documents and permits.',
      'funeral_planning.step_documentation_detail1': 'Death certificate and medical documentation',
      'funeral_planning.step_documentation_detail2': 'Burial permits and cemetery arrangements',
      'funeral_planning.step_documentation_detail3': 'Insurance and legal document processing',
      
      'funeral_planning.step_ceremony_title': 'Ceremony Planning',
      'funeral_planning.step_ceremony_desc': 'Together we will plan a meaningful and dignified ceremony that honors your loved one.',
      'funeral_planning.step_ceremony_detail1': 'Selection of ceremony type and venue',
      'funeral_planning.step_ceremony_detail2': 'Music, readings, and personal touches',
      'funeral_planning.step_ceremony_detail3': 'Officiant and participant coordination',
      
      'funeral_planning.step_logistics_title': 'Logistics Coordination',
      'funeral_planning.step_logistics_desc': 'We handle all transportation, timing, and venue arrangements to ensure everything runs smoothly.',
      'funeral_planning.step_logistics_detail1': 'Transportation and hearse arrangements',
      'funeral_planning.step_logistics_detail2': 'Timing coordination with all parties',
      'funeral_planning.step_logistics_detail3': 'Venue preparation and guest organization',
      
      'funeral_planning.step_coordination_title': 'Final Coordination',
      'funeral_planning.step_coordination_desc': 'Final review and coordination to ensure every detail is perfect for the ceremony.',
      'funeral_planning.step_coordination_detail1': 'Final walkthrough and confirmation',
      'funeral_planning.step_coordination_detail2': 'Emergency contact and backup plans',
      'funeral_planning.step_coordination_detail3': 'Day-of coordination and support',
      
      // Planning Sections
      'funeral_planning.pre_planning': 'Pre-Planning',
      'funeral_planning.ceremony_planning': 'Ceremony Planning',
      'funeral_planning.logistics': 'Logistics',
      'funeral_planning.documentation': 'Documentation',
      
      // Checklist Items - Pre-Planning
      'funeral_planning.deceased_wishes': 'Deceased Wishes',
      'funeral_planning.budget_planning': 'Budget Planning',
      'funeral_planning.burial_location': 'Burial Location Selection',
      'funeral_planning.family_consultation': 'Family Consultation',
      
      // Checklist Items - Ceremony
      'funeral_planning.ceremony_type': 'Ceremony Type',
      'funeral_planning.choose_officiant': 'Choose Officiant',
      'funeral_planning.musical_accompaniment': 'Musical Accompaniment',
      'funeral_planning.readings_prayers': 'Readings and Prayers',
      
      // Checklist Items - Logistics
      'funeral_planning.transportation': 'Transportation',
      'funeral_planning.timing_schedule': 'Timing and Schedule',
      'funeral_planning.guest_organization': 'Guest Organization',
      'funeral_planning.venue_booking': 'Venue and Facility Booking',
      
      // Checklist Items - Documentation
      'funeral_planning.death_certificate': 'Death Certificate',
      'funeral_planning.permits': 'Permits',
      'funeral_planning.insurance': 'Insurance',
      'funeral_planning.legal_documents': 'Legal Documents',
      
      // FAQ Section
      'funeral_planning.faq_title': 'Frequently Asked Questions',
      'funeral_planning.faq_early_planning_q': 'How early should we start planning?',
      'funeral_planning.faq_early_planning_a': 'It is recommended to start planning at least 2-3 weeks in advance, although some services may have shorter deadlines.',
      'funeral_planning.faq_documents_q': 'What documents are required?',
      'funeral_planning.faq_documents_a': 'Death certificate, identity documents, family member documents and other permits are required.',
      'funeral_planning.faq_personalized_q': 'Can we have a personalized ceremony?',
      'funeral_planning.faq_personalized_a': 'Yes, we offer fully personalized ceremonies that reflect the personality of the deceased and family wishes.',
      'funeral_planning.faq_timing_q': 'How long does funeral planning take?',
      'funeral_planning.faq_timing_a': 'The planning process typically takes 1-3 days, depending on the complexity of arrangements. We can accommodate urgent situations and work within your timeline.',
      'funeral_planning.faq_cost_q': 'What is included in the funeral cost?',
      'funeral_planning.faq_cost_a': 'Our funeral costs include professional services, transportation, documentation assistance, and ceremony coordination. We provide transparent pricing and can work within various budgets.',
      'funeral_planning.faq_cemetery_q': 'How do I choose a cemetery?',
      'funeral_planning.faq_cemetery_a': 'We can help you explore cemetery options based on location, religious requirements, family preferences, and budget. We have relationships with many local cemeteries.',
      'funeral_planning.faq_transport_q': 'Do you provide transportation services?',
      'funeral_planning.faq_transport_a': 'Yes, we provide comprehensive transportation services including hearse, family transportation, and regional or international transport if needed.',
      'funeral_planning.faq_cremation_q': 'Do you offer cremation services?',
      'funeral_planning.faq_cremation_a': 'Yes, we offer cremation services and can help you plan memorial ceremonies for cremated remains. We respect all religious and personal preferences.',
      'funeral_planning.faq_insurance_q': 'Do you work with funeral insurance?',
      'funeral_planning.faq_insurance_a': 'Yes, we work with most funeral insurance providers and can help you navigate the claims process. We also offer payment plans for families.',
      'funeral_planning.faq_emergency_q': 'What if I need immediate assistance?',
      'funeral_planning.faq_emergency_a': 'We provide 24/7 emergency services. Our team is always available to help you with immediate needs and can respond quickly to urgent situations.',
      
      // Contact Form
      'funeral_planning.contact_title': 'Contact Us',
      'funeral_planning.contact_subtitle': 'Get Free Consultation',
      'funeral_planning.form_name': 'Name',
      'funeral_planning.form_phone': 'Phone',
      'funeral_planning.form_email': 'Email',
      'funeral_planning.form_message': 'Message',
      'funeral_planning.form_preferred_contact': 'Preferred Contact',
      'funeral_planning.form_phone_option': 'Phone',
      'funeral_planning.form_email_option': 'Email',
      'funeral_planning.form_submit': 'Send',
      'funeral_planning.form_submitted': 'Your message has been sent! We will contact you soon.',
      
      // Progress and Status
      'funeral_planning.progress': 'Progress',
      'funeral_planning.completed': 'Completed',
      'funeral_planning.pending': 'Pending',
      'funeral_planning.start_planning': 'Start Planning',

      'funeral_planning.cta_title': 'Ready to Start Planning?',
      'funeral_planning.cta_description': 'Contact us today to discuss how we can help you and your family',

      // Why Choose Us Section
      'why_choose.title': 'Why Choose Ritual Service?',
      'why_choose.subtitle': 'Professional Team',
      'why_choose.experience': '20 Years of Experience',
      'why_choose.quality': 'Quality Service',
      'why_choose.individual_approach': 'Individual Approach',
      'why_choose.agent_visit': 'Agent Visit',

      // About Page
      'about.hero.title': 'About RitualService',
      'about.hero.subtitle': 'Providing compassionate and professional funeral services since 1995',
      
      'about.how_created.title': 'How We Created',
      'about.how_created.description1': 'Founded in 1995 by the Petrov family, RitualService began as a small local funeral home with a simple mission: to provide dignified and respectful funeral services to families during their most difficult times. What started as a single location has grown into one of the most trusted names in funeral services across the region.',
      'about.how_created.description2': 'Our journey began when the Petrov family experienced the loss of a loved one and found that existing services lacked the personal touch and cultural sensitivity that families truly needed. This personal experience became the foundation of our company\'s philosophy - treating every family as if they were our own.',
      'about.how_created.image_alt': 'Our humble beginnings',
      
      'about.what_offer.title': 'What We Offer',
      'about.what_offer.description': 'We provide comprehensive funeral and memorial services designed to honor your loved ones with dignity and respect. Our services include traditional funerals, transportation services, memorial ceremonies, and specialized cultural and religious ceremonies that honor diverse traditions and beliefs.',
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
      'what_makes_us.care.desc': 'Ritual Service staff are ready to help people during this difficult period by going through every detail of the ceremony. Also cares about creating an important and memorable service for your family and loved one.',
      
      // Products Page Specific Translations
      'products.title': 'Ritual Products',
      'products.hero_description': 'High-quality ritual products: coffins, shrouds, refrigeration, hearse. All products are ready 24/7.',
      'products.our_products': 'Our Products',
      'products.quality_description': 'Quality ritual products - complete assortment',
      'products.categories_title': 'Product Categories',
      'products.types_title': 'Product Types',
      'products.gallery_title': 'Photo Gallery',
      'products.related_title': 'Similar Products',
      'products.details_title': 'In Detail',
      'products.features_title': 'Our Advantages',
      
      // Product Keywords for Related Products
      'products.coffins_keywords': 'Coffins - sasaxleebi',
      'products.shrouds_keywords': 'Shrouds - sudarebi',
      'products.refrigeration_keywords': 'Refrigeration - macivrеbi',
      'products.hearse_keywords': 'Hearse - katafalki',
      
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
      
      'products.hearse.modern': 'Modern hearses',
      'products.hearse.luxury': 'Luxury class hearses',
      'products.hearse.standard': 'Standard hearses',
      'products.hearse.special': 'Special hearses',
      
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
      
      'products.hearse.features.modern': 'Modern hearses with latest models',
      'products.hearse.features.luxury': 'Luxury class hearses with highest comfort',
      'products.hearse.features.standard': 'Standard hearses with reliable quality',
      'products.hearse.features.special': 'Special hearses for individual requirements',
      'products.hearse.process_title': 'Hearse Service Process',
      
      // Contact CTA
      'products.contact_now': 'Contact us now - we are by your side 24 hours a day',
      'services.contact_now': 'Contact us now - we are by your side 24 hours a day',
      
      // Services Page
      'services.hero_description': 'Ritual Service offers a complete complex of ritual services: embalming, hearse, stone engraving, transportation, dressing the deceased, grave decoration.',
      'services.hero_keywords.ritual_services': 'Ritual Services',
      'services.hero_keywords.embalming': 'Embalming',
      'services.hero_keywords.hearse': 'Hearse',
      'services.hero_keywords.stone_engraving': 'Stone Engraving',
      'services.hero_keywords.transportation': 'Transportation',
      'services.hero_keywords.dressing': 'Dressing',
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
      'products.refrigeration.hero_keywords': 'Coffin-refrigerators with combined function. Stationary refrigerators with large capacity and mobile refrigerators for transportation.',
      'products.hearse.hero_keywords': 'Professional hearse service. Modern hearses latest models 24/7. Transportation in any direction.',
      
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
      'services.plan_list.grave_preparation': 'Grave cutting, decoration and concrete arrangement.',
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
      'services.hearse_service.description': 'Our modern hearse fleet is ready for dignified transportation at any time. Hearse service includes all necessary preparation, safe transportation and delivery to the ceremony location. Our hearses are equipped with modern equipment and provide comfortable travel. We work in all directions - both in Tbilisi and in regions and abroad. Our team provides professional service and takes care of every detail to ensure the ceremony is conducted with dignity.',
      'services.hearse_service.alt': 'Hearse service - Ritual Service',
      
      'services.transportation_service.title': 'Transportation Service',
      'services.transportation_service.description': 'We offer transportation service for the deceased both within the region and abroad. Our experienced team ensures preparation of all necessary documents, safe transportation and delivery to the ceremony location. We work in all directions and provide dignified service. Our service includes all necessary logistical preparation, document preparation and ceremony organization. We take care that the process is simple and safe for your family.',
      'services.transportation_service.alt': 'Transportation service - Ritual Service',
      
      'services.stone_engraving_service.title': 'Stone Engraving',
      'services.stone_engraving_service.description': 'Our artistic team provides professional stone painting and engraving. We use modern technologies and quality materials to create long-lasting and dignified works. Our service includes colored photo production, metal letter inscriptions and artistic ornaments. We work on all types of stone and ensure high quality results. Our team takes care of every detail to ensure the result is dignified and long-lasting.',
      'services.stone_engraving_service.alt': 'Stone engraving - Ritual Service',
      
      'services.grave_decoration_service.title': 'Grave Decoration',
      'services.grave_decoration_service.description': 'We offer comprehensive grave decoration and memorial work. Our team ensures all necessary work - grave cutting, concrete arrangement, stone work and landscape design. We use quality materials and modern technologies to create dignified and long-lasting memorials. Our service includes all necessary preparation and ensures high quality results.',
      'services.grave_decoration_service.alt': 'Grave decoration - Ritual Service',
      
      'services.mourning_hall_service.title': 'Mourning Hall',
      'services.mourning_hall_service.description': 'Our mourning hall provides a dignified environment for mourning ceremonies. The hall is equipped with all necessary equipment and provides a comfortable environment for family and guests. We offer full service including musical accompaniment, wreath preparation and organization of all necessary details. Our team takes care of every detail to ensure the ceremony is conducted with dignity.',
      'services.mourning_hall_service.alt': 'Mourning hall - Ritual Service',
      
      'services.banquet_hall_service.title': 'Banquet Hall',
      'services.banquet_hall_service.description': 'Our banquet hall is ideal for memorial events. The hall has large capacity and is equipped with all necessary equipment. We offer full service including food preparation, table arrangement and organization of all necessary details. Our team ensures high quality service and takes care of every detail to ensure the event is successful.',
      'services.banquet_hall_service.alt': 'Banquet hall - Ritual Service',
      
      'services.grave_preparation_service.title': 'Grave Digging and Arrangement',
      'services.grave_preparation_service.description': 'Our experienced team provides professional grave digging and arrangement. We use modern equipment and quality materials to ensure safe and long-lasting work. Our service includes grave digging, concrete arrangement, stone work, and arrangement of all necessary details. We work on all types of soil and ensure high-quality results. Our team takes care of every detail to ensure the result is dignified and long-lasting.',
      'services.grave_preparation_service.alt': 'Grave digging and arrangement - Ritual Service',
      
      'services.colored_photo_service.title': 'Colored Photo Production',
      'services.colored_photo_service.description': 'Our specialists ensure high-quality colored photo production on stone. We use modern technologies and quality materials to create long-lasting and dignified works. Our service includes photo processing, transfer to stone, and color preservation. We work on all types of stone and ensure high-quality results. Our team takes care of every detail to ensure the result is dignified and long-lasting.',
      'services.colored_photo_service.alt': 'Colored photo production - Ritual Service',
      
      'services.metal_letters_service.title': 'Metal Letter Inscriptions',
      'services.metal_letters_service.description': 'Our artistic team provides professional metal letter inscriptions on stone. We use quality metal and modern technologies to create long-lasting and dignified inscriptions. Our service includes text preparation, metal letter production, and attachment to stone. We work on all types of stone and ensure high-quality results. Our team takes care of every detail to ensure the result is dignified and long-lasting.',
      'services.metal_letters_service.alt': 'Metal letter inscriptions - Ritual Service',

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

      'services.grave_preparation.title': 'Grave Cutting, Decoration and Concrete Arrangement',
      'services.grave_preparation.description': 'Grave cutting, decoration and concrete arrangement. Complex memorial works.',

      'services.stone_engraving.title': 'Stone Engraving',
      'services.stone_engraving.description': 'Stone engraving. Professional artistic work with modern technologies.',

      'services.colored_photo.title': 'Colored Photo Production',
      'services.colored_photo.description': 'Colored photo production. Quality photos for long-term storage.',

      'services.metal_letters.title': 'Metal Letter Inscriptions',
      'services.metal_letters.description': 'Metal letter inscriptions. Long-lasting and dignified inscriptions with metal letters.'
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
      'breadcrumb.plan_funeral': 'Планировать похороны',
      
      // Breadcrumb translations for URL segments
      'breadcrumb.coffins': 'Гробы',
      'breadcrumb.shrouds': 'Саваны',
      'breadcrumb.refrigeration': 'Холодильники',
      'breadcrumb.hearse': 'Катафалк',
      'breadcrumb.embalming': 'Бальзамирование',
      'breadcrumb.transportation': 'Перевозка',
      'breadcrumb.stone_engraving': 'Роспись на камне',
      'breadcrumb.grave_decoration': 'Благоустройство могил',
      'breadcrumb.dressing': 'Одевание и подготовка',
      'breadcrumb.mourning_hall': 'Траурный зал',
      'breadcrumb.banquet_hall': 'Банкетный зал',
      'breadcrumb.metal_letters': 'Надписи металлическими буквами',
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
      'services.mourning_hall': 'Траурный зал',
      'services.mourning_hall_desc': 'Траурный зал с достойной обстановкой. Полное обслуживание, гибкий график.',
      'services.banquet_hall': 'Банкетный зал',
      'services.banquet_hall_desc': 'Банкетный зал для мемориальных мероприятий. Большая вместимость, полное обслуживание.',
      'services.metal_letters': 'Надписи металлическими буквами',
      'services.metal_letters_desc': 'Изготовление надписей металлическими буквами на могилах. Высококачественные металлические буквы.',

      // Products
      'products.coffins': 'Гробы',
      'products.coffins_desc': 'Качественные гробы: грузинский, украинский, итальянский стили. Широкий выбор для любого бюджета.',
      'products.shrouds': 'Саваны',
      'products.shrouds_desc': 'Традиционные и современные саваны. Натуральные материалы, ручная работа.',
      'products.refrigeration': 'Холодильники',
      'products.refrigeration_desc': 'Гробы-холодильники, американские и стандартные модели для длительного хранения.',
      'products.hearse': 'Катафалк',
      'products.hearse_desc': 'Современные катафалки с обслуживанием 24/7',
      'products.coffins_long': 'Наши гробы представляют собой качественные деревянные гробы из натуральных материалов. Гробы люкс класса, гробы эконом класса и стандартные гробы - во всех ценовых категориях.',
      'products.shrouds_long': 'Саваны - мы предлагаем хлопковые саваны из натуральных материалов, шелковые саваны из качественной ткани и саваны из искусственной ткани с прочными материалами.',
      'products.refrigeration_long': 'Холодильники - наши гробы-холодильники с комбинированной функцией. Стационарные холодильники с большой вместимостью и мобильные холодильники для транспортировки.',
      'products.hearse_long': 'Катафалк - наш современный парк катафалков готов в любое время. Современные катафалки последние модели и катафалки люкс класса с высшим комфортом. Перевозка в любом направлении.',
      'header.phone': '+995 599 069 898',

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

      // About Page
      'about.hero.title': 'О Ритуал Сервисе',
      'about.hero.subtitle': 'Предоставляем сострадательные и профессиональные похоронные услуги с 1995 года',
      
      'about.how_created.title': 'Как мы создавались',
      'about.how_created.description1': 'Основанная в 1995 году семьей Петровых, Ритуал Сервис начал как небольшой местный похоронный дом с простой миссией: предоставлять достойные и уважительные похоронные услуги семьям в их самые трудные времена. То, что начиналось как одно место, выросло в одно из самых доверенных имен в похоронных услугах по всему региону.',
      'about.how_created.description2': 'Наш путь начался, когда семья Петровых пережила потерю близкого человека и обнаружила, что существующие услуги не хватало личного подхода и культурной чувствительности, которые действительно нужны семьям. Этот личный опыт стал основой философии нашей компании - относиться к каждой семье так, как если бы это была наша собственная семья.',
      'about.how_created.image_alt': 'Наши скромные начинания',
      
      'about.what_offer.title': 'Что мы предлагаем',
      'about.what_offer.description': 'Мы предоставляем комплексные похоронные и мемориальные услуги, разработанные для почитания ваших близких с достоинством и уважением. Наши услуги включают традиционные похороны, услуги перевозки, мемориальные церемонии и специализированные культурные и религиозные церемонии, которые почитают разнообразные традиции и верования.',
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
      'what_makes_us.care.desc': 'Персонал Ritual Service готов помочь людям в этот трудный период, пройдя через каждую деталь церемонии. Также заботится о создании важного и запоминающегося обслуживания для вашей семьи и близкого человека.',

      // Funeral Planning Page
      'funeral_planning.title': 'Планирование похорон',
      'funeral_planning.subtitle': 'Профессиональное планирование и консультация',
      'funeral_planning.description': 'Мы поможем вам спланировать каждую деталь похорон. Бесплатная консультация и пошаговое руководство.',
      'funeral_planning.planning_guide': 'Руководство по планированию',
      'funeral_planning.call_us': 'Позвоните нам',
      
      // Planning Steps
      'funeral_planning.step_consultation_title': 'Первоначальная консультация',
      'funeral_planning.step_consultation_desc': 'Наша опытная команда встретится с вами, чтобы понять ваши потребности и предоставить персональные рекомендации.',
      'funeral_planning.step_consultation_detail1': 'Личная встреча с нашим директором похоронного бюро',
      'funeral_planning.step_consultation_detail2': 'Обсуждение пожеланий семьи и традиций',
      'funeral_planning.step_consultation_detail3': 'Первоначальная оценка стоимости и варианты услуг',
      
      'funeral_planning.step_documentation_title': 'Подготовка документации',
      'funeral_planning.step_documentation_desc': 'Мы поможем вам собрать и подготовить все необходимые юридические документы и разрешения.',
      'funeral_planning.step_documentation_detail1': 'Свидетельство о смерти и медицинская документация',
      'funeral_planning.step_documentation_detail2': 'Разрешения на захоронение и договоренности с кладбищем',
      'funeral_planning.step_documentation_detail3': 'Обработка страховых и юридических документов',
      
      'funeral_planning.step_ceremony_title': 'Планирование церемонии',
      'funeral_planning.step_ceremony_desc': 'Вместе мы спланируем значимую и достойную церемонию, которая почтет память вашего близкого.',
      'funeral_planning.step_ceremony_detail1': 'Выбор типа церемонии и места проведения',
      'funeral_planning.step_ceremony_detail2': 'Музыка, чтения и личные штрихи',
      'funeral_planning.step_ceremony_detail3': 'Координация священника и участников',
      
      'funeral_planning.step_logistics_title': 'Координация логистики',
      'funeral_planning.step_logistics_desc': 'Мы управляем всей транспортировкой, временем и подготовкой места, чтобы все прошло гладко.',
      'funeral_planning.step_logistics_detail1': 'Организация транспортировки и катафалка',
      'funeral_planning.step_logistics_detail2': 'Координация времени со всеми сторонами',
      'funeral_planning.step_logistics_detail3': 'Подготовка места и организация гостей',
      
      'funeral_planning.step_coordination_title': 'Финальная координация',
      'funeral_planning.step_coordination_desc': 'Финальный обзор и координация, чтобы каждая деталь была идеальной для церемонии.',
      'funeral_planning.step_coordination_detail1': 'Финальный обход и подтверждение',
      'funeral_planning.step_coordination_detail2': 'Экстренные контакты и резервные планы',
      'funeral_planning.step_coordination_detail3': 'Координация в день церемонии и поддержка',
      
      // Planning Sections
      'funeral_planning.pre_planning': 'Предварительное планирование',
      'funeral_planning.ceremony_planning': 'Планирование церемонии',
      'funeral_planning.logistics': 'Логистика',
      'funeral_planning.documentation': 'Документация',
      
      // Checklist Items - Pre-Planning
      'funeral_planning.deceased_wishes': 'Пожелания усопшего',
      'funeral_planning.budget_planning': 'Планирование бюджета',
      'funeral_planning.burial_location': 'Выбор места захоронения',
      'funeral_planning.family_consultation': 'Консультация с семьей',
      
      // Checklist Items - Ceremony
      'funeral_planning.ceremony_type': 'Тип церемонии',
      'funeral_planning.choose_officiant': 'Выбор священника',
      'funeral_planning.musical_accompaniment': 'Музыкальное сопровождение',
      'funeral_planning.readings_prayers': 'Чтения и молитвы',
      
      // Checklist Items - Logistics
      'funeral_planning.transportation': 'Транспортировка',
      'funeral_planning.timing_schedule': 'Время и расписание',
      'funeral_planning.guest_organization': 'Организация гостей',
      'funeral_planning.venue_booking': 'Бронирование помещений и объектов',
      
      // Checklist Items - Documentation
      'funeral_planning.death_certificate': 'Свидетельство о смерти',
      'funeral_planning.permits': 'Разрешения',
      'funeral_planning.insurance': 'Страхование',
      'funeral_planning.legal_documents': 'Юридические документы',
      
      // FAQ Section
      'funeral_planning.faq_title': 'Часто задаваемые вопросы',
      'funeral_planning.faq_early_planning_q': 'Как рано нужно начинать планирование?',
      'funeral_planning.faq_early_planning_a': 'Рекомендуется начинать планирование минимум за 2-3 недели, хотя для некоторых услуг могут быть более короткие сроки.',
      'funeral_planning.faq_documents_q': 'Какие документы требуются?',
      'funeral_planning.faq_documents_a': 'Требуются свидетельство о смерти, документы, удостоверяющие личность, документы членов семьи и другие разрешения.',
      'funeral_planning.faq_personalized_q': 'Можем ли мы провести персонализированную церемонию?',
      'funeral_planning.faq_personalized_a': 'Да, мы предлагаем полностью персонализированные церемонии, которые отражают личность усопшего и пожелания семьи.',
      'funeral_planning.faq_timing_q': 'Сколько времени занимает планирование похорон?',
      'funeral_planning.faq_timing_a': 'Процесс планирования обычно занимает 1-3 дня, в зависимости от сложности договоренностей. Мы можем учесть срочные ситуации и работать в рамках вашего графика.',
      'funeral_planning.faq_cost_q': 'Что включено в стоимость похорон?',
      'funeral_planning.faq_cost_a': 'Наша стоимость похорон включает профессиональные услуги, транспортировку, подготовку места и координацию всех деталей. Мы предоставляем прозрачное ценообразование без скрытых расходов.',
      'funeral_planning.faq_urgent_q': 'Можете ли вы помочь в срочной ситуации?',
      'funeral_planning.faq_urgent_a': 'Да, мы специализируемся на срочных ситуациях и можем организовать похороны в течение 24 часов. Наша команда доступна 24/7 для экстренных случаев.',
      'funeral_planning.faq_cultural_q': 'Учитываете ли вы культурные и религиозные традиции?',
      'funeral_planning.faq_cultural_a': 'Абсолютно. Мы уважаем и соблюдаем все культурные и религиозные традиции. Наша команда имеет опыт работы с различными верованиями и обычаями.',
      'funeral_planning.faq_support_q': 'Какую поддержку вы оказываете семье?',
      'funeral_planning.faq_support_a': 'Мы предоставляем эмоциональную поддержку, практическую помощь и руководство на каждом этапе. Наша команда понимает, что это трудное время, и мы здесь, чтобы помочь.',
      'funeral_planning.faq_cemetery_q': 'Как выбрать кладбище?',
      'funeral_planning.faq_cemetery_a': 'Мы можем помочь вам изучить варианты кладбищ в зависимости от местоположения, религиозных требований, предпочтений семьи и бюджета. У нас есть связи со многими местными кладбищами.',
      'funeral_planning.faq_transport_q': 'Предоставляете ли вы транспортные услуги?',
      'funeral_planning.faq_transport_a': 'Да, мы предоставляем комплексные транспортные услуги, включая катафалк, транспортировку семьи и региональную или международную транспортировку при необходимости.',
      'funeral_planning.faq_cremation_q': 'Предоставляете ли вы услуги кремации?',
      'funeral_planning.faq_cremation_a': 'Да, мы предоставляем услуги кремации и можем помочь в планировании мемориальных церемоний для кремированных останков. Мы уважаем все религиозные и личные предпочтения.',
      'funeral_planning.faq_insurance_q': 'Работаете ли вы со страховкой похорон?',
      'funeral_planning.faq_insurance_a': 'Да, мы работаем с большинством поставщиков страховки похорон и можем помочь вам пройти процесс подачи претензий. Мы также предлагаем планы платежей для семей.',
      'funeral_planning.faq_emergency_q': 'Что происходит, если мне нужна немедленная помощь?',
      'funeral_planning.faq_emergency_a': 'Мы предлагаем экстренные услуги 24/7. Наша команда всегда доступна для помощи в срочных потребностях и может быстро реагировать на неотложные ситуации.',
      
      // Contact Form
      'funeral_planning.contact_title': 'Свяжитесь с нами',
      'funeral_planning.contact_subtitle': 'Получите бесплатную консультацию',
      'funeral_planning.form_name': 'Имя',
      'funeral_planning.form_phone': 'Телефон',
      'funeral_planning.form_email': 'Электронная почта',
      'funeral_planning.form_message': 'Сообщение',
      'funeral_planning.form_preferred_contact': 'Предпочтительный контакт',
      'funeral_planning.form_phone_option': 'Телефон',
      'funeral_planning.form_email_option': 'Электронная почта',
      'funeral_planning.form_submit': 'Отправить',
      'funeral_planning.form_submitted': 'Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.',
      
      // Progress and Status
      'funeral_planning.progress': 'Прогресс',
      'funeral_planning.completed': 'Завершено',
      'funeral_planning.pending': 'В процессе',
      'funeral_planning.start_planning': 'Начать планирование',
      'funeral_planning.cta_title': 'Готовы начать планирование?',
      'funeral_planning.cta_description': 'Свяжитесь с нами сегодня, чтобы обсудить, как мы можем помочь вам и вашей семье',
      
      // Products Page Specific Translations
      'products.title': 'Ритуальная продукция',
      'products.hero_description': 'Высококачественная ритуальная продукция: гробы, саваны, холодильники, катафалк. Вся продукция готова 24/7.',
      'products.our_products': 'Наша продукция',
      'products.quality_description': 'Качественная ритуальная продукция - полный ассортимент',
      'products.categories_title': 'Категории продукции',
      'products.types_title': 'Типы продукции',
      'products.gallery_title': 'Фото галерея',
      'products.related_title': 'Похожие продукты',
      'products.details_title': 'Подробно',
      'products.features_title': 'Наши преимущества',
      
      // Product Keywords for Related Products
      'products.coffins_keywords': 'Гробы - sasaxleebi',
      'products.shrouds_keywords': 'Саваны - sudarebi',
      'products.refrigeration_keywords': 'Холодильники - macivrеbi',
      'products.hearse_keywords': 'Катафалк - katafalki',
      
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
      
      'products.hearse.modern': 'Современные катафалки',
      'products.hearse.luxury': 'Катафалки люкс класса',
      'products.hearse.standard': 'Стандартные катафалки',
      'products.hearse.special': 'Специальные катафалки',
      
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
      
      'products.hearse.features.modern': 'Современные катафалки с последними моделями',
      'products.hearse.features.luxury': 'Катафалки люкс класса с высшим комфортом',
      'products.hearse.features.standard': 'Стандартные катафалки с надежным качеством',
      'products.hearse.features.special': 'Специальные катафалки для индивидуальных требований',
      'products.hearse.process_title': 'Процесс обслуживания катафалка',
      
      // Contact CTA
      'products.contact_now': 'Свяжитесь с нами сейчас - мы рядом 24 часа в сутки',
      'services.contact_now': 'Свяжитесь с нами сейчас - мы рядом 24 часа в сутки',
      
      // Services Page
      'services.hero_description': 'Ритуал Сервис предлагает полный комплекс ритуальных услуг: бальзамирование, катафалк, роспись на камне, перевозка, одевание усопшего, благоустройство могил.',
      'services.hero_keywords.ritual_services': 'Ритуальные услуги',
      'services.hero_keywords.embalming': 'Бальзамирование',
      'services.hero_keywords.hearse': 'Катафалк',
      'services.hero_keywords.stone_engraving': 'Роспись на камне',
      'services.hero_keywords.transportation': 'Перевозка',
      'services.hero_keywords.dressing': 'Одевание',
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
      'products.refrigeration.hero_keywords': 'Гробы-холодильники с комбинированной функцией. Стационарные холодильники с большой вместимостью и мобильные холодильники для транспортировки.',
      'products.hearse.hero_keywords': 'Профессиональные услуги катафалка. Современные катафалки последние модели 24/7. Перевозка в любом направлении.',
      
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
      'services.plan_list.grave_preparation': 'Выкапывание могилы, украшение и бетонное обустройство.',
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
      'services.hearse_service.description': 'Наш современный парк катафалков готов к достойной перевозке в любое время. Услуги катафалка включают всю необходимую подготовку, безопасную перевозку и доставку к месту церемонии. Наши катафалки оснащены современным оборудованием и обеспечивают комфортное путешествие. Мы работаем во всех направлениях - как в Тбилиси, так и в регионах и за границей. Наша команда обеспечивает профессиональное обслуживание и заботится о каждой детали, чтобы церемония проводилась с достоинством.',
      'services.hearse_service.alt': 'Услуги катафалка - Ритуал Сервис',
      
      'services.transportation_service.title': 'Услуги перевозки',
      'services.transportation_service.description': 'Мы предлагаем услуги перевозки усопшего как в пределах региона, так и за границу. Наша опытная команда обеспечивает подготовку всех необходимых документов, безопасную перевозку и доставку к месту церемонии. Мы работаем во всех направлениях и обеспечиваем достойное обслуживание. Наши услуги включают всю необходимую логистическую подготовку, подготовку документов и организацию церемонии. Мы заботимся о том, чтобы процесс был простым и безопасным для вашей семьи.',
      'services.transportation_service.alt': 'Услуги перевозки - Ритуал Сервис',
      
      'services.stone_engraving_service.title': 'Роспись на камне',
      'services.stone_engraving_service.description': 'Наша художественная команда обеспечивает профессиональную роспись и гравировку на камне. Мы используем современные технологии и качественные материалы для создания долговечных и достойных работ. Наши услуги включают изготовление цветного фото, надписи металлическими буквами и художественные орнаменты. Мы работаем со всеми типами камня и обеспечиваем высококачественные результаты. Наша команда заботится о каждой детали, чтобы результат был достойным и долговечным.',
      'services.stone_engraving_service.alt': 'Роспись на камне - Ритуал Сервис',
      
      'services.grave_decoration_service.title': 'Благоустройство могил',
      'services.grave_decoration_service.description': 'Мы предлагаем комплексное благоустройство могил и мемориальные работы. Наша команда обеспечивает все необходимые работы - выкапывание могилы, бетонное обустройство, работу с камнем и ландшафтный дизайн. Мы используем качественные материалы и современные технологии для создания достойных и долговечных мемориалов. Наши услуги включают всю необходимую подготовку и обеспечивают высококачественные результаты.',
      'services.grave_decoration_service.alt': 'Благоустройство могил - Ритуал Сервис',
      
      'services.mourning_hall_service.title': 'Траурный зал',
      'services.mourning_hall_service.description': 'Наш траурный зал обеспечивает достойную обстановку для траурных церемоний. Зал оснащен всем необходимым оборудованием и обеспечивает комфортную обстановку для семьи и гостей. Мы предлагаем полное обслуживание, включая музыкальное сопровождение, подготовку венков и организацию всех необходимых деталей. Наша команда заботится о каждой детали, чтобы церемония проводилась с достоинством.',
      'services.mourning_hall_service.alt': 'Траурный зал - Ритуал Сервис',
      
      'services.banquet_hall_service.title': 'Банкетный зал',
      'services.banquet_hall_service.description': 'Наш банкетный зал идеален для мемориальных мероприятий. Зал имеет большую вместимость и оснащен всем необходимым оборудованием. Мы предлагаем полное обслуживание, включая приготовление пищи, расстановку столов и организацию всех необходимых деталей. Наша команда обеспечивает высококачественное обслуживание и заботится о каждой детали, чтобы мероприятие прошло успешно.',
      'services.banquet_hall_service.alt': 'Банкетный зал - Ритуал Сервис',
      
      'services.grave_preparation_service.title': 'Копание и обустройство могилы',
      'services.grave_preparation_service.description': 'Наша опытная команда обеспечивает профессиональное копание и обустройство могилы. Мы используем современное оборудование и качественные материалы для обеспечения безопасной и долговечной работы. Наш сервис включает копание могилы, бетонное обустройство, работу с камнем и обустройство всех необходимых деталей. Мы работаем на всех типах почвы и обеспечиваем высококачественные результаты. Наша команда заботится о каждой детали, чтобы результат был достойным и долговечным.',
      'services.grave_preparation_service.alt': 'Копание и обустройство могилы - Ритуал Сервис',
      
      'services.colored_photo_service.title': 'Изготовление цветных фотографий',
      'services.colored_photo_service.description': 'Наши специалисты обеспечивают высококачественное изготовление цветных фотографий на камне. Мы используем современные технологии и качественные материалы для создания долговечных и достойных работ. Наш сервис включает обработку фотографий, перенос на камень и сохранение цветов. Мы работаем на всех типах камня и обеспечиваем высококачественные результаты. Наша команда заботится о каждой детали, чтобы результат был достойным и долговечным.',
      'services.colored_photo_service.alt': 'Изготовление цветных фотографий - Ритуал Сервис',
      
      'services.metal_letters_service.title': 'Гравировка металлическими буквами',
      'services.metal_letters_service.description': 'Наша художественная команда обеспечивает профессиональную гравировку металлическими буквами на камне. Мы используем качественный металл и современные технологии для создания долговечных и достойных надписей. Наш сервис включает подготовку текста, изготовление металлических букв и крепление к камню. Мы работаем на всех типах камня и обеспечиваем высококачественные результаты. Наша команда заботится о каждой детали, чтобы результат был достойным и долговечным.',
      'services.metal_letters_service.alt': 'Гравировка металлическими буквами - Ритуал Сервис',

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

      'services.grave_preparation.title': 'Копание могилы, благоустройство и бетонирование',
      'services.grave_preparation.description': 'Копание могилы, благоустройство и бетонирование. Комплексные мемориальные работы.',

      'services.stone_engraving.title': 'Роспись на камне',
      'services.stone_engraving.description': 'Роспись на камне. Профессиональная художественная работа с использованием современных технологий.',

      'services.colored_photo.title': 'Изготовление цветного фото',
      'services.colored_photo.description': 'Изготовление цветного фото. Качественные фотографии для длительного хранения.',

      'services.metal_letters.title': 'Надписи металлическими буквами',
      'services.metal_letters.description': 'Надписи металлическими буквами. Долговечные и достойные надписи металлическими буквами.'
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
                    { name: 'სასახლეები', url: '/ka/products/coffins', desc: 'ხარისხიანი სასახლეები ყველა სტილში' },
        { name: 'სუდარები', url: '/ka/products/shrouds', desc: 'ტრადიციული და თანამედროვე სუდარები' },
                          { name: 'მაცივრები', url: '/ka/products/refrigeration', desc: 'სასახლე-მაცივრები ხანგრძლივი შენახვისთვის' }
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