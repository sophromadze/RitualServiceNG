import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AboutComponent } from './pages/about/about.component';

import { LocationsComponent } from './pages/locations/locations.component';
import { FuneralPlanningComponent } from './pages/funeral-planning/funeral-planning.component';
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
          title: 'მაცივრები - სასახლე მაცივრები | რიტუალ სერვისი',
          description: 'თანამედროვე სასახლე-მაცივრები, ამერიკული და სტანდარტული მოდელები. ხანგრძლივი შენახვა.',
          keywords: 'მაცივრები, macivrеbi, სასახლე მაცივარი, ამერიკული მაცივარი, სტანდარტული მაცივარი'
        }
      },
      { 
        path: 'products/hearse', 
        component: ProductDetailComponent,
        data: { 
          product: 'hearse',
          title: 'კატაფალკი - კატაფალკის მომსახურება | რიტუალ სერვისი',
          description: 'კატაფალკის პროფესიონალური მომსახურება. თანამედროვე კატაფალკები, გადასვენება ნებისმიერ მიმართულებით. 24/7 ხელმისაწვდომობა.',
          keywords: 'კატაფალკი, katafalki, კატაფალკის მომსახურება, გადასვენება, gadasveneba, დამკრძალავი ბიურო'
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
      },
      { 
        path: 'funeral-planning', 
        component: FuneralPlanningComponent,
        data: { 
          title: 'დაკრძალვის დაგეგმვა - პროფესიონალური დაგეგმვა | რიტუალ სერვისი',
          description: 'დაკრძალვის პროფესიონალური დაგეგმვა. უფასო კონსულტაცია, ნაბიჯ-ნაბიჯ გზამკვლევი, ყველა საჭირო დოკუმენტი.',
          keywords: 'დაკრძალვის დაგეგმვა, dakrdzalvis dagegmva, უფასო კონსულტაცია, რიტუალური დაგეგმვა, დამკრძალავი ბიურო'
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
      { path: 'products', component: ProductsComponent },
      { path: 'products/coffins', component: ProductDetailComponent, data: { product: 'coffins' }},
      { path: 'products/shrouds', component: ProductDetailComponent, data: { product: 'shrouds' }},
      { path: 'products/refrigeration', component: ProductDetailComponent, data: { product: 'refrigeration' }},
      { path: 'products/hearse', component: ProductDetailComponent, data: { product: 'hearse' }},
      { path: 'about', component: AboutComponent },
      { path: 'locations', component: LocationsComponent },
      { 
        path: 'funeral-planning', 
        component: FuneralPlanningComponent,
        data: { 
          title: 'Funeral Planning - Professional Planning Services | Ritual Service',
          description: 'Professional funeral planning services. Free consultation, step-by-step guide, all necessary documents.',
          keywords: 'funeral planning, professional planning, free consultation, ritual planning, funeral home'
        }
      }
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
      { path: 'products', component: ProductsComponent },
      { path: 'products/coffins', component: ProductDetailComponent, data: { product: 'coffins' }},
      { path: 'products/shrouds', component: ProductDetailComponent, data: { product: 'shrouds' }},
      { path: 'products/refrigeration', component: ProductDetailComponent, data: { product: 'refrigeration' }},
      { path: 'products/hearse', component: ProductDetailComponent, data: { product: 'hearse' }},
      { path: 'about', component: AboutComponent },
      { path: 'locations', component: LocationsComponent },
      { 
        path: 'funeral-planning', 
        component: FuneralPlanningComponent,
        data: { 
          title: 'Планирование похорон - Профессиональное планирование | Ритуал Сервис',
          description: 'Профессиональные услуги по планированию похорон. Бесплатная консультация, пошаговое руководство, все необходимые документы.',
          keywords: 'планирование похорон, профессиональное планирование, бесплатная консультация, ритуальное планирование, похоронный дом'
        }
      }
    ]
  },
  
  // 404 page
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];