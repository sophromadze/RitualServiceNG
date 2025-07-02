import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'ka';
  productType: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.data.subscribe(data => {
        if (data['product']) {
          this.productType = data['product'];
          this.updateSEO();
        }
      })
    );

    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
        this.updateSEO();
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

  private updateSEO(): void {
    const seoData = {
      title: this.getSEOTitle(),
      description: this.getSEODescription(),
      keywords: this.getSEOKeywords()
    };

    this.seoService.updateSEO(seoData, this.currentLanguage);
  }

  private getSEOTitle(): string {
    const titles = {
      'coffins': {
        ka: 'სასახლეები - ხარისხიანი სასახლეები | რიტუალ სერვისი - sasaxleebi',
        en: 'Coffins - Quality Coffins | Ritual Service',
        ru: 'Гробы - Качественные гробы | Ритуал Сервис'
      },
      'shrouds': {
        ka: 'სუდარები - ტრადიციული და თანამედროვე | რიტუალ სერვისი - sudarebi',
        en: 'Shrouds - Traditional and Modern | Ritual Service',
        ru: 'Саваны - Традиционные и современные | Ритуал Сервис'
      },
      'refrigeration': {
        ka: 'მაცივრები - სასახლე მაცივრები | რიტუალ სერვისი - macivrеbi',
        en: 'Refrigeration - Coffin Refrigeration | Ritual Service',
        ru: 'Холодильники - Гробы-холодильники | Ритуал Сервис'
      }
    };

    return titles[this.productType as keyof typeof titles]?.[this.currentLanguage as keyof typeof titles['coffins']] || 
           titles[this.productType as keyof typeof titles]?.ka || 
           'Ritual Service Products';
  }

  private getSEODescription(): string {
    const descriptions = {
      'coffins': {
        ka: 'ხარისხიანი სასახლეები (sasaxleebi): ქართული, უკრაინული, იტალიური სტილი. ფართო არჩევანი, მაღალი ხარისხი. damkrdzalavi biuro პროდუქცია.',
        en: 'Quality coffins: Georgian, Ukrainian, Italian styles. Wide selection, high quality from professional funeral home.',
        ru: 'Качественные гробы: грузинский, украинский, итальянский стили. Широкий выбор, высокое качество от похоронного дома.'
      },
      'shrouds': {
        ka: 'ხარისხიანი სუდარები (sudarebi): ტრადიციული და თანამედროვე დიზაინი. sudara ნატურალური მასალები, ხელნაკეთი მუშაობა.',
        en: 'Quality shrouds: traditional and modern design. Natural materials, handcrafted work.',
        ru: 'Качественные саваны: традиционный и современный дизайн. Натуральные материалы, ручная работа.'
      },
      'refrigeration': {
        ka: 'თანამედროვე სასახლე-მაცივრები (macivrеbi), ამერიკული და სტანდარტული მოდელები. ხანგრძლივი შენახვა.',
        en: 'Modern coffin refrigeration, American and standard models. Long-term preservation.',
        ru: 'Современные гробы-холодильники, американские и стандартные модели. Длительное хранение.'
      }
    };

    return descriptions[this.productType as keyof typeof descriptions]?.[this.currentLanguage as keyof typeof descriptions['coffins']] || 
           descriptions[this.productType as keyof typeof descriptions]?.ka || 
           'Quality funeral products';
  }

  private getSEOKeywords(): string {
    const keywords = {
      'coffins': {
        ka: 'სასახლეები, sasaxleebi, კუბო, sarkofagi, ხარისხიანი სასახლეები, damkrdzalavi biuro, ქართული სასახლეები, უკრაინული სასახლეები, იტალიური სასახლეები',
        en: 'coffins, caskets, quality coffins, funeral home coffins, Georgian coffins, Ukrainian coffins, Italian coffins, burial coffins',
        ru: 'гробы, качественные гробы, гробы похоронного дома, грузинские гробы, украинские гробы, итальянские гробы'
      },
      'shrouds': {
        ka: 'სუდარები, sudarebi, sudara, ტრადიციული სუდარა, თანამედროვე სუდარა, რიტუალური ტანსაცმელი, damkrdzalavi biuro',
        en: 'shrouds, traditional shrouds, modern shrouds, burial clothing, funeral garments, ritual clothing',
        ru: 'саваны, традиционные саваны, современные саваны, погребальная одежда, ритуальная одежда'
      },
      'refrigeration': {
        ka: 'მაცივრები, macivrеbi, სასახლე მაცივარი, ამერიკული მაცივარი, სტანდარტული მაცივარი, damkrdzalavi biuro',
        en: 'refrigeration, coffin refrigeration, American refrigeration, standard refrigeration, funeral refrigeration',
        ru: 'холодильники, гробы-холодильники, американские холодильники, стандартные холодильники, похоронные холодильники'
      }
    };

    return keywords[this.productType as keyof typeof keywords]?.[this.currentLanguage as keyof typeof keywords['coffins']] || 
           keywords[this.productType as keyof typeof keywords]?.ka || 
           'funeral products';
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }
}