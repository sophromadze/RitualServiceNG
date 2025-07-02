import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  // Redirect root to Georgian
  { path: '', redirectTo: '/ka', pathMatch: 'full' },
  
  // Georgian routes (ka) - SEO optimized URLs
  {
    path: 'ka',
    children: [
      { 
        path: '', 
        component: HomeComponent,
        data: { 
          title: 'რიტუალ სერვისი - დამკრძალავი ბიურო | სარიტუალო სახლი',
          description: 'რიტუალ სერვისი - პროფესიონალური დამკრძალავი ბიურო. ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება. სარიტუალო მომსახურება 24/7.',
          keywords: 'დამკრძალავი ბიურო, სარიტუალო სახლი, ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, damkrdzalavi biuro, მიცვალებულის ჩაცმა'
        }
      },
      { 
        path: 'services', 
        component: ServicesComponent,
        data: { 
          title: 'მომსახურება - რიტუალ სერვისი | დაკრძალვის სერვისები',
          description: 'სრული სარიტუალო მომსახურება: ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, საპანაშვიდე დარბაზი. დამკრძალავი ბიურო 24/7.',
          keywords: 'დაკრძალვის სერვისები, ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება, საპანაშვიდე დარბაზი, მიცვალებულის ჩაცმა'
        }
      },
      
      // Service detail pages with SEO-focused Georgian URLs
      { 
        path: 'services/damkrdzalavi-biuro', 
        component: ServiceDetailComponent,
        data: { 
          service: 'funeral-home',
          title: 'დამკრძალავი ბიურო - რიტუალ სერვისი | damkrdzalavi biuro',
          description: 'პროფესიონალური დამკრძალავი ბიურო თბილისში. სრული სარიტუალო მომსახურება, მიცვალებულის ჩაცმა, ბალზამირება. 24/7 მომსახურება.',
          keywords: 'დამკრძალავი ბიურო, damkrdzalavi biuro, სარიტუალო სახლი, მიცვალებულის ჩაცმა, რიტუალური მომსახურება'
        }
      },
      { 
        path: 'services/balzamireba', 
        component: ServiceDetailComponent,
        data: { 
          service: 'embalming',
          title: 'ბალზამირება - პროფესიონალური მომსახურება | რიტუალ სერვისი',
          description: 'ბალზამირების პროფესიონალური მომსახურება. მიცვალებულის დაცვა, ჰიგიენური მომზადება. გამოცდილი სპეციალისტები.',
          keywords: 'ბალზამირება, balzamireba, მიცვალებულის მომზადება, დამკრძალავი ბიურო, რიტუალური მომსახურება'
        }
      },
      { 
        path: 'services/katafalka', 
        component: ServiceDetailComponent,
        data: { 
          service: 'hearse',
          title: 'კატაფალკა - კატაფალკის მომსახურება | რიტუალ სერვისი',
          description: 'კატაფალკის პროფესიონალური მომსახურება. თანამედროვე კატაფალკები, გადასვენება ნებისმიერ მიმართულებით. 24/7 ხელმისაწვდომობა.',
          keywords: 'კატაფალკა, katafalka, კატაფალკის მომსახურება, გადასვენება, gadasveneba, დამკრძალავი ბიურო'
        }
      },
      { 
        path: 'services/gadasveneba', 
        component: ServiceDetailComponent,
        data: { 
          service: 'transportation',
          title: 'გადასვენება - ტრანსპორტირება | რიტუალ სერვისი',
          description: 'მიცვალებულის გადასვენება რაიონში და საზღვარგარეთ. პროფესიონალური ტრანსპორტირება, ყველა საჭირო დოკუმენტი.',
          keywords: 'გადასვენება, gadasveneba, ტრანსპორტირება, კატაფალკა, დამკრძალავი ბიურო, რაიონში გადასვენება'
        }
      },
      { 
        path: 'services/qvaze-xatva', 
        component: ServiceDetailComponent,
        data: { 
          service: 'stone-engraving',
          title: 'ქვაზე ხატვა - ხელოსნური ხატვა | რიტუალ სერვისი',
          description: 'ქვაზე პროფესიონალური ხატვა, ფერადი სურათის დამზადება, ლითონის ასოებით წარწერა. ხელოვნური და ხანგრძლივი.',
          keywords: 'ქვაზე ხატვა, qvaze xatva, ფერადი სურათის დამზადება, ლითონის ასოებით წარწერა, საფლავის მოპირკეთება'
        }
      },
      { 
        path: 'services/mopirketeba', 
        component: ServiceDetailComponent,
        data: { 
          service: 'grave-decoration',
          title: 'საფლავის მოპირკეთება - მემორიალური სამუშაოები | რიტუალ სერვისი',
          description: 'საფლავის პროფესიონალური მოპირკეთება, მემორიალური სამუშაოები, ქვაზე ხატვა, ფერადი სურათის დამზადება.',
          keywords: 'საფლავის მოპირკეთება, mopirketeba, ქვაზე ხატვა, მემორიალური სამუშაოები, ფერადი სურათის დამზადება'
        }
      },
      
      { 
        path: 'products', 
        component: ProductsComponent,
        data: { 
          title: 'პროდუქცია - სასახლეები, სუდარები | რიტუალ სერვისი',
          description: 'სარიტუალო პროდუქცია: სასახლეები, სუდარები, მაცივრები. ხარისხიანი მასალები, ფართო არჩევანი.',
          keywords: 'სასახლეები, სუდარები, მაცივრები, sudara, sasaxleebi, საფლავის ინვენტარი'
        }
      },
      { 
        path: 'products/sasaxleebi', 
        component: ProductDetailComponent,
        data: { 
          product: 'coffins',
          title: 'სასახლეები - ხარისხიანი სასახლეები | რიტუალ სერვისი',
          description: 'ხარისხიანი სასახლეები: ქართული, უკრაინული, იტალიური სტილი. ფართო არჩევანი, მაღალი ხარისხი.',
          keywords: 'სასახლეები, sasaxleebi, კუბო, sarkofagi, ხარისხიანი სასახლეები, დამკრძალავი ბიურო'
        }
      },
      { 
        path: 'products/sudarebi', 
        component: ProductDetailComponent,
        data: { 
          product: 'shrouds',
          title: 'სუდარები - ტრადიციული და თანამედროვე | რიტუალ სერვისი',
          description: 'ხარისხიანი სუდარები: ტრადიციული და თანამედროვე დიზაინი. ნატურალური მასალები, ფართო არჩევანი.',
          keywords: 'სუდარები, sudarebi, sudara, ტრადიციული სუდარა, თანამედროვე სუდარა, რიტუალური ტანსაცმელი'
        }
      },
      { 
        path: 'products/macivrеbi', 
        component: ProductDetailComponent,
        data: { 
          product: 'refrigeration',
          title: 'მაცივრები - სასახლე მაცივრები | რიტუალ სერვისი',
          description: 'თანამედროვე სასახლე-მაცივრები, ამერიკული და სტანდარტული მოდელები. ხანგრძლივი შენახვა.',
          keywords: 'მაცივრები, macivrеbi, სასახლე მაცივარი, ამერიკული მაცივარი, სტანდარტული მაცივარი'
        }
      },
      
      { 
        path: 'about', 
        component: AboutComponent,
        data: { 
          title: 'ჩვენს შესახებ - 20 წლიანი გამოცდილება | რიტუალ სერვისი',
          description: '20 წლიანი გამოცდილება სარიტუალო მომსახურებაში. პროფესიონალური დამკრძალავი ბიურო, ღირსეული მომსახურება.',
          keywords: 'რიტუალ სერვისი ისტორია, გამოცდილება, დამკრძალავი ბიურო, პროფესიონალური გუნდი'
        }
      },
      { 
        path: 'contact', 
        component: ContactComponent,
        data: { 
          title: 'კონტაქტი - 24/7 მომსახურება | რიტუალ სერვისი',
          description: 'დაგვიკავშირდით 24/7. პროფესიონალური კონსულტაცია, სწრაფი რეაგირება. თბილისში 3 ფილიალი.',
          keywords: 'კონტაქტი, 24/7 მომსახურება, უფასო კონსულტაცია, agentic gamodzaxeba, რიტუალ სერვისი ფილიალები'
        }
      },
      { 
        path: 'locations', 
        component: LocationsComponent,
        data: { 
          title: 'ფილიალები - თბილისის ფილიალები | რიტუალ სერვისი',
          description: 'რიტუალ სერვისის ფილიალები თბილისში: გლდანი, დიღომი, ჯიქია. ადვილად მისაწვდომი ლოკაციები.',
          keywords: 'ფილიალები, თბილისის ფილიალები, გლდანი, დიღომი, ჯიქია, დამკრძალავი ბიურო ადგილმდებარეობა'
        }
      }
    ]
  },
  
  // English routes (en)
  {
    path: 'en',
    children: [
      { 
        path: '', 
        component: HomeComponent,
        data: { 
          title: 'Ritual Service - Funeral Home | Professional Funeral Services',
          description: 'Ritual Service - Professional funeral home in Tbilisi. Embalming, hearse services, stone engraving, transportation. 24/7 funeral services.',
          keywords: 'funeral home, funeral services, embalming, hearse, stone engraving, transportation, burial services, memorial services'
        }
      },
      { 
        path: 'services', 
        component: ServicesComponent,
        data: { 
          title: 'Services - Professional Funeral Services | Ritual Service',
          description: 'Complete funeral services: embalming, hearse, stone engraving, transportation, mourning hall. Professional funeral home 24/7.',
          keywords: 'funeral services, embalming, hearse services, stone engraving, transportation, mourning hall, burial preparation'
        }
      },
      { path: 'services/funeral-home', component: ServiceDetailComponent, data: { service: 'funeral-home' }},
      { path: 'services/embalming', component: ServiceDetailComponent, data: { service: 'embalming' }},
      { path: 'services/hearse', component: ServiceDetailComponent, data: { service: 'hearse' }},
      { path: 'services/transportation', component: ServiceDetailComponent, data: { service: 'transportation' }},
      { path: 'services/stone-engraving', component: ServiceDetailComponent, data: { service: 'stone-engraving' }},
      { path: 'services/grave-decoration', component: ServiceDetailComponent, data: { service: 'grave-decoration' }},
      { path: 'products', component: ProductsComponent },
      { path: 'products/coffins', component: ProductDetailComponent, data: { product: 'coffins' }},
      { path: 'products/shrouds', component: ProductDetailComponent, data: { product: 'shrouds' }},
      { path: 'products/refrigeration', component: ProductDetailComponent, data: { product: 'refrigeration' }},
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'locations', component: LocationsComponent }
    ]
  },
  
  // Russian routes (ru)
  {
    path: 'ru',
    children: [
      { 
        path: '', 
        component: HomeComponent,
        data: { 
          title: 'Ритуал Сервис - Похоронный дом | Ритуальные услуги',
          description: 'Ритуал Сервис - профессиональный похоронный дом в Тбилиси. Бальзамирование, катафалк, роспись на камне, перевозка. Ритуальные услуги 24/7.',
          keywords: 'похоронный дом, ритуальные услуги, похоронные услуги, бальзамирование, катафалк, роспись на камне, перевозка покойного'
        }
      },
      { 
        path: 'services', 
        component: ServicesComponent,
        data: { 
          title: 'Услуги - Ритуальные услуги | Ритуал Сервис',
          description: 'Полный комплекс ритуальных услуг: бальзамирование, катафалк, роспись на камне, перевозка, траурный зал. Похоронный дом 24/7.',
          keywords: 'ритуальные услуги, бальзамирование, услуги катафалка, роспись на камне, перевозка покойного, траурный зал'
        }
      },
      { path: 'services/funeral-home', component: ServiceDetailComponent, data: { service: 'funeral-home' }},
      { path: 'services/embalming', component: ServiceDetailComponent, data: { service: 'embalming' }},
      { path: 'services/hearse', component: ServiceDetailComponent, data: { service: 'hearse' }},
      { path: 'services/transportation', component: ServiceDetailComponent, data: { service: 'transportation' }},
      { path: 'services/stone-engraving', component: ServiceDetailComponent, data: { service: 'stone-engraving' }},
      { path: 'services/grave-decoration', component: ServiceDetailComponent, data: { service: 'grave-decoration' }},
      { path: 'products', component: ProductsComponent },
      { path: 'products/coffins', component: ProductDetailComponent, data: { product: 'coffins' }},
      { path: 'products/shrouds', component: ProductDetailComponent, data: { product: 'shrouds' }},
      { path: 'products/refrigeration', component: ProductDetailComponent, data: { product: 'refrigeration' }},
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'locations', component: LocationsComponent }
    ]
  },
  
  // 404 page
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];