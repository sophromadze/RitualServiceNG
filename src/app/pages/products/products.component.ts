// products.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'ka';
  private subscriptions: Subscription = new Subscription();

  // Products with heavy SEO focus
  products = [
    {
      id: 'sasaxleebi',
      titleKey: 'products.coffins',
      descKey: 'products.coffins_desc',
      url: 'sasaxleebi',
      image: '/images/coffins.jpg',
      keywords: 'სასახლეები, sasaxleebi, კუბო, sarkofagi',
      types: ['ქართული სტილი', 'უკრაინული სტილი', 'იტალიური სტილი', 'ხის სასახლეები', 'ლუქს სასახლეები']
    },
    {
      id: 'sudarebi',
      titleKey: 'products.shrouds',
      descKey: 'products.shrouds_desc',
      url: 'sudarebi',
      image: '/images/shrouds.jpg',
      keywords: 'სუდარები, sudarebi, sudara, სუდარა',
      types: ['ტრადიციული სუდარები', 'თანამედროვე სუდარები', 'ბრინჯაოს სუდარები', 'შავი სუდარები', 'თეთრი სუდარები']
    },
    {
      id: 'macivrеbi',
      titleKey: 'products.refrigeration',
      descKey: 'products.refrigeration_desc',
      url: 'macivrеbi',
      image: '/images/refrigeration.jpg',
      keywords: 'მაცივრები, macivrеbi, სასახლე მაცივარი',
      types: ['ამერიკული მაცივრები', 'სტანდარტული მაცივრები', 'სასახლე-მაცივრები', 'ლუქს მაცივრები']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
        this.updateSEO();
      })
    );

    this.subscriptions.add(
      this.route.data.subscribe(data => {
        if (data) {
          this.updateSEO(data);
        }
      })
    );

    const urlSegments = this.router.url.split('/');
    if (urlSegments.length > 1 && ['ka', 'en', 'ru'].includes(urlSegments[1])) {
      this.languageService.setLanguage(urlSegments[1]);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private updateSEO(routeData?: any): void {
    const seoData = routeData || {
      title: this.getSEOTitle(),
      description: this.getSEODescription(),
      keywords: this.getSEOKeywords()
    };

    const structuredData = this.generateProductsStructuredData();
    
    this.seoService.updateSEO({
      ...seoData,
      structuredData: structuredData
    }, this.currentLanguage);
  }

  private getSEOTitle(): string {
    const titles = {
      ka: 'პროდუქცია - სასახლეები, სუდარები, მაცივრები | რიტუალ სერვისი',
      en: 'Products - Coffins, Shrouds, Refrigeration | Ritual Service',
      ru: 'Продукция - Гробы, Саваны, Холодильники | Ритуал Сервис'
    };
    return titles[this.currentLanguage as keyof typeof titles] || titles.ka;
  }

  private getSEODescription(): string {
    const descriptions = {
      ka: 'ხარისხიანი სარიტუალო პროდუქცია: სასახლეები (sasaxleebi), სუდარები (sudarebi), მაცივრები (macivrеbi). ფართო არჩევანი, მაღალი ხარისხი. damkrdzalavi biuro',
      en: 'Quality funeral products: coffins, shrouds, refrigeration. Wide selection, high quality from professional funeral home.',
      ru: 'Качественная ритуальная продукция: гробы, саваны, холодильники. Широкий выбор, высокое качество от профессионального похоронного дома.'
    };
    return descriptions[this.currentLanguage as keyof typeof descriptions] || descriptions.ka;
  }

  private getSEOKeywords(): string {
    const keywords = {
      ka: 'სასახლეები, სუდარები, მაცივრები, sudara, sasaxleebi, macivrеbi, კუბო, sarkofagi, სარიტუალო პროდუქცია, damkrdzalavi biuro, sudarebi',
      en: 'coffins, shrouds, refrigeration, funeral products, caskets, burial products, mortuary supplies, funeral home products',
      ru: 'гробы, саваны, холодильники, ритуальная продукция, гробы-холодильники, похоронная продукция, товары для похорон'
    };
    return keywords[this.currentLanguage as keyof typeof keywords] || keywords.ka;
  }

  private generateProductsStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": this.languageService.translate('nav.products'),
      "description": this.getSEODescription(),
      "itemListElement": this.products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": this.languageService.translate(product.titleKey),
          "description": this.languageService.translate(product.descKey),
          "url": `https://ritualservice.ge/${this.currentLanguage}/products/${product.url}`,
          "brand": {
            "@type": "Brand",
            "name": "Ritual Service"
          },
          "offers": {
            "@type": "AggregateOffer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "GEL"
          }
        }
      }))
    };
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  getProductUrl(productUrl: string): string {
    return `/${this.currentLanguage}/products/${productUrl}`;
  }

  navigateToProduct(productUrl: string): void {
    this.router.navigate([this.currentLanguage, 'products', productUrl]);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }
}
