import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { LanguageSelectorComponent } from '../shared/components/language-selector/language-selector.component';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSelectorComponent, BreadcrumbComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() currentLanguage: string = 'ka';
  @Output() languageChange = new EventEmitter<string>();

  isMenuOpen = false;
  isServicesDropdownOpen = false;
  isProductsDropdownOpen = false;
  lastClickedLink: string | null = null;

  // Navigation structure with SEO-focused URLs
  navigation = {
    ka: {
      services: [
        { name: 'დამკრძალავი ბიურო', url: '/ka/services/damkrdzalavi-biuro', keywords: 'damkrdzalavi biuro' },
        { name: 'ბალზამირება', url: '/ka/services/balzamireba', keywords: 'balzamireba' },
        { name: 'მიცვალებულის ჩაცმა', url: '/ka/services/micvalebulis-chacma', keywords: 'micvalebulis chacma' },
        { name: 'საპანაშვიდე დარბაზი', url: '/ka/services/sapanashvide-darbazi', keywords: 'sapanashvide darbazi' },
        { name: 'საბანკეტო დარბაზი', url: '/ka/services/sabanketo-darbazi', keywords: 'sabanketo darbazi' },
        { name: 'სამარხის გაჭრა', url: '/ka/services/samarxis-gacra', keywords: 'samarxis gacra' },
        { name: 'ფერადი სურათის დამზადება', url: '/ka/services/feradi-suratis-damzadeba', keywords: 'feradi suratis damzadeba' },
        { name: 'ლითონის ასოებით წარწერა', url: '/ka/services/litonis-asoebit-carcera', keywords: 'litonis asoebit carcera' },
        { name: 'გადასვენება', url: '/ka/services/gadasveneba', keywords: 'gadasveneba' },
        { name: 'ქვაზე ხატვა', url: '/ka/services/qvaze-xatva', keywords: 'qvaze xatva' },
        { name: 'საფლავის მოპირკეთება', url: '/ka/services/mopirketeba', keywords: 'mopirketeba' }
      ],
      products: [
        { name: 'სასახლეები', url: '/ka/products/sasaxleebi', keywords: 'sasaxleebi' },
        { name: 'სუდარები', url: '/ka/products/sudarebi', keywords: 'sudarebi, sudara' },
        { name: 'მაცივრები', url: '/ka/products/macivrеbi', keywords: 'macivrеbi' },
        { name: 'კატაფალკი', url: '/ka/products/katafalki', keywords: 'katafalki' }
      ]
    },
    en: {
      services: [
        { name: 'Funeral Home', url: '/en/services/funeral-home', keywords: 'funeral home' },
        { name: 'Embalming', url: '/en/services/embalming', keywords: 'embalming' },
        { name: 'Dressing the Deceased', url: '/en/services/dressing-deceased', keywords: 'dressing deceased' },
        { name: 'Memorial Hall', url: '/en/services/memorial-hall', keywords: 'memorial hall' },
        { name: 'Banquet Hall', url: '/en/services/banquet-hall', keywords: 'banquet hall' },
        { name: 'Grave Digging', url: '/en/services/grave-digging', keywords: 'grave digging' },
        { name: 'Color Photo Production', url: '/en/services/color-photo-production', keywords: 'color photo production' },
        { name: 'Metal Letter Engraving', url: '/en/services/metal-letter-engraving', keywords: 'metal letter engraving' },
        { name: 'Transportation', url: '/en/services/transportation', keywords: 'transportation' },
        { name: 'Stone Engraving', url: '/en/services/stone-engraving', keywords: 'stone engraving' },
        { name: 'Grave Decoration', url: '/en/services/grave-decoration', keywords: 'grave decoration' }
      ],
      products: [
        { name: 'Coffins', url: '/en/products/coffins', keywords: 'coffins' },
        { name: 'Shrouds', url: '/en/products/shrouds', keywords: 'shrouds' },
        { name: 'Refrigeration', url: '/en/products/refrigeration', keywords: 'refrigeration' },
        { name: 'Hearse', url: '/en/products/hearse', keywords: 'hearse' }
      ]
    },
    ru: {
      services: [
        { name: 'Похоронный дом', url: '/ru/services/funeral-home', keywords: 'похоронный дом' },
        { name: 'Бальзамирование', url: '/ru/services/embalming', keywords: 'бальзамирование' },
        { name: 'Одевание покойного', url: '/ru/services/dressing-deceased', keywords: 'одевание покойного' },
        { name: 'Поминальный зал', url: '/ru/services/memorial-hall', keywords: 'поминальный зал' },
        { name: 'Банкетный зал', url: '/ru/services/banquet-hall', keywords: 'банкетный зал' },
        { name: 'Копание могилы', url: '/ru/services/grave-digging', keywords: 'копание могилы' },
        { name: 'Изготовление цветных фотографий', url: '/ru/services/color-photo-production', keywords: 'изготовление цветных фотографий' },
        { name: 'Гравировка металлическими буквами', url: '/ru/services/metal-letter-engraving', keywords: 'гравировка металлическими буквами' },
        { name: 'Перевозка', url: '/ru/services/transportation', keywords: 'перевозка' },
        { name: 'Роспись на камне', url: '/ru/services/stone-engraving', keywords: 'роспись на камне' },
        { name: 'Благоустройство могил', url: '/ru/services/grave-decoration', keywords: 'благоустройство могил' }
      ],
      products: [
        { name: 'Гробы', url: '/ru/products/coffins', keywords: 'гробы' },
        { name: 'Саваны', url: '/ru/products/shrouds', keywords: 'саваны' },
        { name: 'Холодильники', url: '/ru/products/refrigeration', keywords: 'холодильники' },
        { name: 'Катафалк', url: '/ru/products/hearse', keywords: 'катафалк' }
      ]
    }
  };

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    // Set up click outside listener for dropdowns
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        this.closeAllDropdowns();
      }
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  onLanguageChange(language: string): void {
    this.languageChange.emit(language);
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleServicesDropdown(): void {
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
    this.isProductsDropdownOpen = false;
  }

  toggleProductsDropdown(): void {
    this.isProductsDropdownOpen = !this.isProductsDropdownOpen;
    this.isServicesDropdownOpen = false;
  }

  closeAllDropdowns(): void {
    this.isServicesDropdownOpen = false;
    this.isProductsDropdownOpen = false;
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
    this.closeAllDropdowns();
    this.isMenuOpen = false;
  }



  getCurrentServices() {
    return this.navigation[this.currentLanguage as keyof typeof this.navigation]?.services || this.navigation.ka.services;
  }

  getCurrentProducts() {
    return this.navigation[this.currentLanguage as keyof typeof this.navigation]?.products || this.navigation.ka.products;
  }

  onLinkClick(linkId: string): void {
    this.lastClickedLink = linkId;
  }

  isLinkActive(linkId: string): boolean {
    return this.lastClickedLink === linkId;
  }
}