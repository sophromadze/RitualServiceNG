import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { AboutComponent } from './pages/about/about.component';

import { LocationsComponent } from './pages/locations/locations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  // Georgian routes (default) - no /ka prefix
  {
    path: '',
    children: [
      { 
        path: '', 
        component: HomeComponent,
        data: { 
          title: 'დამკრძალავი ბიურო - Ritual Service',
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
      { 
        path: 'services/agent-service', 
        component: ServiceDetailComponent,
        data: { 
          service: 'agent-service',
          title: 'აგენტის მომსახურება - რიტუალ სერვისი',
          description: 'პროფესიონალური აგენტის მომსახურება დაკრძალვის ორგანიზებისთვის. 24/7 მომსახურება.',
          keywords: 'აგენტის მომსახურება, agent service, damkrdzalavi biuro'
        }
      },
      { 
        path: 'services/dressing', 
        component: ServiceDetailComponent,
        data: { 
          service: 'dressing',
          title: 'მიცვალებულის ჩაცმა - რიტუალ სერვისი',
          description: 'პროფესიონალური მიცვალებულის ჩაცმა და მომზადება. ღირსეული მომსახურება.',
          keywords: 'მიცვალებულის ჩაცმა, micvalebulis chacma, dressing service'
        }
      },
      { 
        path: 'services/embalming', 
        component: ServiceDetailComponent,
        data: { 
          service: 'embalming',
          title: 'ბალზამირება - რიტუალ სერვისი',
          description: 'პროფესიონალური ბალზამირება მიცვალებულის მომზადებისთვის. მაღალი ხარისხი.',
          keywords: 'ბალზამირება, balzamireba, embalming service'
        }
      },
      { 
        path: 'services/hearse', 
        component: ServiceDetailComponent,
        data: { 
          service: 'hearse',
          title: 'კატაფალკა - რიტუალ სერვისი',
          description: 'კატაფალკის პროფესიონალური მომსახურება. 24/7 ხელმისაწვდომობა.',
          keywords: 'კატაფალკა, katafalka, hearse service'
        }
      },
      { 
        path: 'services/transportation', 
        component: ServiceDetailComponent,
        data: { 
          service: 'transportation',
          title: 'გადასვენება - რიტუალ სერვისი',
          description: 'გადასვენების მომსახურება რაიონში და საზღვარგარეთ. უსაფრთხო ტრანსპორტირება.',
          keywords: 'გადასვენება, gadasveneba, transportation service'
        }
      },
      { 
        path: 'services/stone-engraving', 
        component: ServiceDetailComponent,
        data: { 
          service: 'stone-engraving',
          title: 'ქვაზე ხატვა - რიტუალ სერვისი',
          description: 'ქვაზე ხატვის პროფესიონალური მომსახურება. მაღალი ხარისხი.',
          keywords: 'ქვაზე ხატვა, qvaze xatva, stone engraving'
        }
      },
      { 
        path: 'services/grave-decoration', 
        component: ServiceDetailComponent,
        data: { 
          service: 'grave-decoration',
          title: 'საფლავის მოპირკეთება - რიტუალ სერვისი',
          description: 'საფლავის მოპირკეთების მომსახურება. ხარისხიანი მასალები.',
          keywords: 'საფლავის მოპირკეთება, mopirketeba, grave decoration'
        }
      },
      { 
        path: 'services/mourning-hall', 
        component: ServiceDetailComponent,
        data: { 
          service: 'mourning-hall',
          title: 'საპანაშვიდე დარბაზი - რიტუალ სერვისი',
          description: 'საპანაშვიდე დარბაზის მომსახურება. ღირსეული გარემო.',
          keywords: 'საპანაშვიდე დარბაზი, sapanashvide darbazi, mourning hall'
        }
      },
      { 
        path: 'services/banquet-hall', 
        component: ServiceDetailComponent,
        data: { 
          service: 'banquet-hall',
          title: 'საბანკეტო დარბაზი - რიტუალ სერვისი',
          description: 'საბანკეტო დარბაზის მომსახურება. მემორიალური ღონისძიებები.',
          keywords: 'საბანკეტო დარბაზი, sabanketo darbazi, banquet hall'
        }
      },
      { 
        path: 'services/grave-preparation', 
        component: ServiceDetailComponent,
        data: { 
          service: 'grave-preparation',
          title: 'საფლავის მომზადება - რიტუალ სერვისი',
          description: 'საფლავის მომზადების მომსახურება. პროფესიონალური მიდგომა.',
          keywords: 'საფლავის მომზადება, saflavis momzadeba, grave preparation'
        }
      },
      { 
        path: 'services/colored-photo', 
        component: ServiceDetailComponent,
        data: { 
          service: 'colored-photo',
          title: 'ფერადი სურათი - რიტუალ სერვისი',
          description: 'ფერადი სურათის დამზადების მომსახურება. მაღალი ხარისხი.',
          keywords: 'ფერადი სურათი, feradi surati, colored photo'
        }
      },
      { 
        path: 'services/metal-letters', 
        component: ServiceDetailComponent,
        data: { 
          service: 'metal-letters',
          title: 'ლითონის ასოები - რიტუალ სერვისი',
          description: 'ლითონის ასოებით წარწერის მომსახურება. ხანგრძლივი ხარისხი.',
          keywords: 'ლითონის ასოები, litonis asoebi, metal letters'
        }
      },
      { 
        path: 'services/embalming-dressing', 
        component: ServiceDetailComponent,
        data: { 
          service: 'embalming-dressing',
          title: 'ბალზამირება, გრიმი, ჩაცმა - რიტუალ სერვისი',
          description: 'პროფესიონალური ბალზამირება, გრიმი და მიცვალებულის ჩაცმა. ღირსეული მომსახურება.',
          keywords: 'ბალზამირება, გრიმი, ჩაცმა, balzamireba, grimi, chacma'
        }
      },
      { 
        path: 'services/microbus', 
        component: ServiceDetailComponent,
        data: { 
          service: 'microbus',
          title: 'მარშუტკა - რიტუალ სერვისი',
          description: 'მარშუტკის მომსახურება დაკრძალვის ცერემონიებისთვის. უსაფრთხო ტრანსპორტირება.',
          keywords: 'მარშუტკა, marshutka, microbus service'
        }
      },
      { 
        path: 'services/hall', 
        component: ServiceDetailComponent,
        data: { 
          service: 'hall',
          title: 'დარბაზი - რიტუალ სერვისი',
          description: 'დარბაზის მომსახურება მემორიალური ღონისძიებებისთვის. ღირსეული გარემო.',
          keywords: 'დარბაზი, darbazi, hall service'
        }
      },
      { 
        path: 'services/cemetery-decoration', 
        component: ServiceDetailComponent,
        data: { 
          service: 'cemetery-decoration',
          title: 'სასაფლაოს მოპირკეთება - რიტუალ სერვისი',
          description: 'სასაფლაოს მოპირკეთების მომსახურება. ხარისხიანი მასალები და მუშაობა.',
          keywords: 'სასაფლაოს მოპირკეთება, sasapleos mopirketeba, cemetery decoration'
        }
      },
      { 
        path: 'services/grave-stones', 
        component: ServiceDetailComponent,
        data: { 
          service: 'grave-stones',
          title: 'საფლავის ქვები, ქვაზე ხატვა - რიტუალ სერვისი',
          description: 'საფლავის ქვების დამზადება და ქვაზე ხატვის მომსახურება. პროფესიონალური ხელოვნური მუშაობა.',
          keywords: 'საფლავის ქვები, ქვაზე ხატვა, saflavis qvebi, qvaze xatva'
        }
      },
      { 
        path: 'services/lifting-machine', 
        component: ServiceDetailComponent,
        data: { 
          service: 'lifting-machine',
          title: 'ჩასასვენებლი ლიფტი - რიტუალ სერვისი',
          description: 'ჩასასვენებელი ლიფტის მომსახურება. უსაფრთხო და მოსახერხებელი.',
          keywords: 'ჩასასვენებლი ლიფტი, chasasvenebli lifti, lifting machine'
        }
      },
      
      { 
        path: 'products', 
        component: ProductsComponent,
        data: { 
          title: 'პროდუქცია - სასახლეები, სუდარები | რიტუალ სერვისი',
          description: 'სარიტუალო პროდუქცია: სასახლეები, სუდარები, სასახლე მაცივრები. ხარისხიანი მასალები, ფართო არჩევანი.',
          keywords: 'სასახლეები, სუდარები, სასახლე მაცივრები, sudara, sasaxleebi, sasaxle macivrebi, საფლავის ინვენტარი'
        }
      },
      { 
        path: 'products/coffins', 
        component: ProductDetailComponent,
        data: { 
          product: 'coffins',
          title: 'სასახლეები - ხარისხიანი სასახლეები | რიტუალ სერვისი',
          description: 'ხარისხიანი სასახლეები: ქართული, უკრაინული, იტალიური სტილი. ფართო არჩევანი, მაღალი ხარისხი.',
          keywords: 'სასახლეები, sasaxleebi, კუბო, sarkofagi, ხარისხიანი სასახლეები, დამკრძალავი ბიურო'
        }
      },
      { 
        path: 'products/shrouds', 
        component: ProductDetailComponent,
        data: { 
          product: 'shrouds',
          title: 'სუდარები - ტრადიციული და თანამედროვე | რიტუალ სერვისი',
          description: 'ხარისხიანი სუდარები: ტრადიციული და თანამედროვე დიზაინი. ნატურალური მასალები, ფართო არჩევანი.',
          keywords: 'სუდარები, sudarebi, sudara, ტრადიციული სუდარა, თანამედროვე სუდარა, რიტუალური ტანსაცმელი'
        }
      },
      { 
        path: 'products/refrigeration', 
        component: ProductDetailComponent,
        data: { 
          product: 'refrigeration',
          title: 'სასახლე მაცივრები - სასახლე-მაცივრები | რიტუალ სერვისი',
          description: 'თანამედროვე სასახლე-მაცივრები, ამერიკული და სტანდარტული მოდელები. ხანგრძლივი შენახვა.',
          keywords: 'სასახლე მაცივრები, sasaxle macivrеbi, სასახლე-მაცივარი, ამერიკული მაცივარი, სტანდარტული მაცივარი'
        }
      },
      { 
        path: 'products/cemetery-accessories', 
        component: ProductDetailComponent,
        data: { 
          product: 'cemetery_accessories',
          title: 'სასაფლაოს აქსესუარები - ჯვრები, საყვავილე კონსტრუქციები | რიტუალ სერვისი',
          description: 'სასაფლაოს აქსესუარები: ჯვრები, საყვავილე კონსტრუქციები, სასანთლეები, მარმარილოს აქსესუარები. ხარისხიანი მასალები, ფართო არჩევანი.',
          keywords: 'სასაფლაოს აქსესუარები, sasapleos akseesuarebi, ჯვრები, საყვავილე კონსტრუქციები, სასანთლეები, მარმარილოს აქსესუარები, დამკრძალავი ბიურო'
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

  // Legacy /ka route - redirect to root for Georgian
  { path: 'ka', redirectTo: '', pathMatch: 'full' },
  // { path: 'ka/:path*', redirectTo: ':path*', pathMatch: 'full' },
  
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
      { path: 'services/agent-service', component: ServiceDetailComponent, data: { service: 'agent-service' }},
      { path: 'services/dressing', component: ServiceDetailComponent, data: { service: 'dressing' }},
      { path: 'services/embalming', component: ServiceDetailComponent, data: { service: 'embalming' }},
      { path: 'services/hearse', component: ServiceDetailComponent, data: { service: 'hearse' }},
      { path: 'services/transportation', component: ServiceDetailComponent, data: { service: 'transportation' }},
      { path: 'services/stone-engraving', component: ServiceDetailComponent, data: { service: 'stone-engraving' }},
      { path: 'services/grave-decoration', component: ServiceDetailComponent, data: { service: 'grave-decoration' }},
      { path: 'services/mourning-hall', component: ServiceDetailComponent, data: { service: 'mourning-hall' }},
      { path: 'services/banquet-hall', component: ServiceDetailComponent, data: { service: 'banquet-hall' }},
      { path: 'services/grave-preparation', component: ServiceDetailComponent, data: { service: 'grave-preparation' }},
      { path: 'services/colored-photo', component: ServiceDetailComponent, data: { service: 'colored-photo' }},
      { path: 'services/metal-letters', component: ServiceDetailComponent, data: { service: 'metal-letters' }},
      { path: 'services/embalming-dressing', component: ServiceDetailComponent, data: { service: 'embalming-dressing' }},
      { path: 'services/microbus', component: ServiceDetailComponent, data: { service: 'microbus' }},
      { path: 'services/hall', component: ServiceDetailComponent, data: { service: 'hall' }},
      { path: 'services/cemetery-decoration', component: ServiceDetailComponent, data: { service: 'cemetery-decoration' }},
      { path: 'services/grave-stones', component: ServiceDetailComponent, data: { service: 'grave-stones' }},
      { path: 'services/lifting-machine', component: ServiceDetailComponent, data: { service: 'lifting-machine' }},
      { path: 'products', component: ProductsComponent },
      { path: 'products/coffins', component: ProductDetailComponent, data: { product: 'coffins' }},
      { path: 'products/shrouds', component: ProductDetailComponent, data: { product: 'shrouds' }},
      { path: 'products/refrigeration', component: ProductDetailComponent, data: { product: 'refrigeration' }},
      { path: 'products/cemetery-accessories', component: ProductDetailComponent, data: { product: 'cemetery_accessories' }},
      { path: 'about', component: AboutComponent },
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
      { path: 'services/agent-service', component: ServiceDetailComponent, data: { service: 'agent-service' }},
      { path: 'services/dressing', component: ServiceDetailComponent, data: { service: 'dressing' }},
      { path: 'services/embalming', component: ServiceDetailComponent, data: { service: 'embalming' }},
      { path: 'services/hearse', component: ServiceDetailComponent, data: { service: 'hearse' }},
      { path: 'services/transportation', component: ServiceDetailComponent, data: { service: 'transportation' }},
      { path: 'services/stone-engraving', component: ServiceDetailComponent, data: { service: 'stone-engraving' }},
      { path: 'services/grave-decoration', component: ServiceDetailComponent, data: { service: 'grave-decoration' }},
      { path: 'services/mourning-hall', component: ServiceDetailComponent, data: { service: 'mourning-hall' }},
      { path: 'services/banquet-hall', component: ServiceDetailComponent, data: { service: 'banquet-hall' }},
      { path: 'services/grave-preparation', component: ServiceDetailComponent, data: { service: 'grave-preparation' }},
      { path: 'services/colored-photo', component: ServiceDetailComponent, data: { service: 'colored-photo' }},
      { path: 'services/metal-letters', component: ServiceDetailComponent, data: { service: 'metal-letters' }},
      { path: 'services/embalming-dressing', component: ServiceDetailComponent, data: { service: 'embalming-dressing' }},
      { path: 'services/microbus', component: ServiceDetailComponent, data: { service: 'microbus' }},
      { path: 'services/hall', component: ServiceDetailComponent, data: { service: 'hall' }},
      { path: 'services/cemetery-decoration', component: ServiceDetailComponent, data: { service: 'cemetery-decoration' }},
      { path: 'services/grave-stones', component: ServiceDetailComponent, data: { service: 'grave-stones' }},
      { path: 'services/lifting-machine', component: ServiceDetailComponent, data: { service: 'lifting-machine' }},
      { path: 'products', component: ProductsComponent },
      { path: 'products/coffins', component: ProductDetailComponent, data: { product: 'coffins' }},
      { path: 'products/shrouds', component: ProductDetailComponent, data: { product: 'shrouds' }},
      { path: 'products/refrigeration', component: ProductDetailComponent, data: { product: 'refrigeration' }},
      { path: 'products/cemetery-accessories', component: ProductDetailComponent, data: { product: 'cemetery_accessories' }},
      { path: 'about', component: AboutComponent },
      { path: 'locations', component: LocationsComponent }
    ]
  },
  
  // 404 page
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '' }
];