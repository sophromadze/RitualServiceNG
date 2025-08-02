// products.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { isPlatformBrowser } from '@angular/common';

interface Product {
  id: string;
  titleKey: string;
  descKey: string;
  url: string;
  image: string;
  keywords: string;
  types: string[];
  features: string[];
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, CtaComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  currentLanguage: string = 'ka';
  products: Product[] = [];

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.loadProducts();
    this.updateSEO();
  }

  private loadProducts(): void {
    this.products = [
      {
        id: 'coffins',
        titleKey: 'products.coffins',
        descKey: 'products.coffins_desc',
        url: `/${this.currentLanguage}/products/coffins`,
        image: '/images/sasaxleebi2.jpg',
        keywords: 'სასახლეები, sasaxleebi, ხის სასახლეები, ლუქს კლასის სასახლეები',
        types: ['ხის სასახლეები', 'ლუქს კლასის სასახლეები', 'ეკონომ კლასის სასახლეები'],
        features: [
          'products.coffins.features.natural',
          'products.coffins.features.luxury',
          'products.coffins.features.economy',
          'products.coffins.features.standard'
        ]
      },
      {
        id: 'shrouds',
        titleKey: 'products.shrouds',
        descKey: 'products.shrouds_desc',
        url: `/${this.currentLanguage}/products/shrouds`,
        image: '/images/sudarebi2.jpg',
        keywords: 'სუდარები, sudarebi, ბამბის სუდარები, სილკის სუდარები',
        types: ['ბამბის სუდარები', 'სილკის სუდარები', 'ხელოვნური ქსოვილის სუდარები'],
        features: [
          'products.shrouds.features.cotton',
          'products.shrouds.features.silk',
          'products.shrouds.features.artificial',
          'products.shrouds.features.special'
        ]
      },
      {
        id: 'refrigeration',
        titleKey: 'products.refrigeration',
        descKey: 'products.refrigeration_desc',
        url: `/${this.currentLanguage}/products/refrigeration`,
        image: '/images/fridge2.jpeg',
        keywords: 'სასახლე მაცივრები, sasaxle macivrebi, სასახლე-მაცივრები, სტაციონარული მაცივრები',
        types: ['სასახლე-მაცივრები', 'სტაციონარული მაცივრები', 'მობილური მაცივრები'],
        features: [
          'products.refrigeration.features.coffin',
          'products.refrigeration.features.stationary',
          'products.refrigeration.features.mobile',
          'products.refrigeration.features.special'
        ]
      },
      {
        id: 'hearse',
        titleKey: 'products.hearse',
        descKey: 'products.hearse_desc',
        url: `/${this.currentLanguage}/products/hearse`,
        image: '/images/katafalkebi2.jpg',
        keywords: 'კატაფალკი, katafalki, თანამედროვე კატაფალკები, ლუქს კლასის კატაფალკები',
        types: ['თანამედროვე კატაფალკები', 'ლუქს კლასის კატაფალკები', 'სტანდარტული კატაფალკები'],
        features: [
          'products.hearse.features.modern',
          'products.hearse.features.luxury',
          'products.hearse.features.standard',
          'products.hearse.features.special'
        ]
      }
    ];
  }

  private updateSEO(): void {
    const seoData = {
              title: 'სარიტუალო პროდუქტები - სასახლეები, სუდარები, სასახლე მაცივრები, კატაფალკი | Ritual Service',
        description: 'სარიტუალო პროდუქტები უმაღლესი ხარისხით: სასახლეები (sasaxleebi), სუდარები (sudarebi), სასახლე მაცივრები (sasaxle macivrеbi), კატაფალკი (katafalki). ყველა პროდუქტი მზადაა 24/7.',
        keywords: 'სარიტუალო პროდუქტები, სასახლეები, სუდარები, სასახლე მაცივრები, კატაფალკი, sasaxleebi, sudarebi, sasaxle macivrеbi, katafalki, ხის სასახლეები, ბამბის სუდარები, სასახლე-მაცივრები, თანამედროვე კატაფალკები'
    };
    
    this.seoService.updateSEO(seoData, this.currentLanguage);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  navigateToProduct(url: string): void {
    this.router.navigateByUrl(url);
  }

  callPhone(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.location.href = 'tel:+995599069898';
  }
}
