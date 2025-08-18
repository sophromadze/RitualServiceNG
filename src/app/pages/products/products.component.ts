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
        url: this.getProductUrl('coffins'),
        image: '/images/kuboebi-2.webp',
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
        url: this.getProductUrl('shrouds'),
        image: '/images/sudarebi.webp',
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
        url: this.getProductUrl('refrigeration'),
        image: '/images/kubo-macivrebi.webp',
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
        id: 'cemetery_accessories',
        titleKey: 'products.cemetery_accessories',
        descKey: 'products.cemetery_accessories_desc',
        url: this.getProductUrl('cemetery-accessories'),
        image: '/images/sasaflaos-aqsesuarebi.webp',
        keywords: 'სასაფლაოს აქსესუარები, sasapleos akseesuarebi, ჯვრები, საყვავილე კონსტრუქციები, სასანთლეები',
        types: ['ჯვრები', 'საყვავილე კონსტრუქციები', 'სასანთლეები', 'მარმარილოს აქსესუარები'],
        features: [
          'products.cemetery_accessories.features.crosses',
          'products.cemetery_accessories.features.flower_structures',
          'products.cemetery_accessories.features.candles',
          'products.cemetery_accessories.features.marble_accessories'
        ]
      }
    ];
  }

  private updateSEO(): void {
    const seoData = {
              title: 'სარიტუალო პროდუქტები - სასახლეები, სუდარები, სასახლე მაცივრები, სასაფლაოს აქსესუარები | Ritual Service',
        description: 'სარიტუალო პროდუქტები უმაღლესი ხარისხით: სასახლეები (sasaxleebi), სუდარები (sudarebi), სასახლე მაცივრები (sasaxle macivrеbi), სასაფლაოს აქსესუარები (sasapleos akseesuarebi). ყველა პროდუქტი მზადაა 24/7.',
        keywords: 'სარიტუალო პროდუქტები, სასახლეები, სუდარები, სასახლე მაცივრები, სასაფლაოს აქსესუარები, sasaxleebi, sudarebi, sasaxle macivrеbi, sasapleos akseesuarebi, ხის სასახლეები, ბამბის სუდარები, სასახლე-მაცივრები, ჯვრები, საყვავილე კონსტრუქციები'
    };
    
    this.seoService.updateSEO(seoData, this.currentLanguage);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  navigateToProduct(url: string): void {
    this.router.navigateByUrl(url);
  }

  getProductUrl(productId: string): string {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return `/products/${productId}`;
    }
    // For other languages, add language prefix
    return `/${this.currentLanguage}/products/${productId}`;
  }

  callPhone(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.location.href = 'tel:+995557556116';
  }
}
