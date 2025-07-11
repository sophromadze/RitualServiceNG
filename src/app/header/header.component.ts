import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { LanguageSelectorComponent } from '../shared/components/language-selector/language-selector.component';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSelectorComponent, BreadcrumbComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() currentLanguage: string = 'ka';
  @Output() languageChange = new EventEmitter<string>();

  isMenuOpen = false;
  isServicesDropdownOpen = false;
  isProductsDropdownOpen = false;
  isMobileServicesOpen = false;
  isMobileProductsOpen = false;
  lastClickedLink: string | null = null;
  private routeSubscription: Subscription = new Subscription();

  // Navigation structure with SEO-focused URLs
  navigation = {
    ka: {
      services: [
        { name: 'აგენტის მომსახურება', url: '/ka/services#agent-service', keywords: 'agentic momsaxureba' },
        { name: 'მიცვალებულის ჩაცმა', url: '/ka/services#dressing', keywords: 'micvalebulis chacma' },
        { name: 'ბალზამირება', url: '/ka/services#embalming', keywords: 'balzamireba' },
        { name: 'კატაფალკის მომსახურება', url: '/ka/services#hearse', keywords: 'katafalkis momsaxureba' },
        { name: 'გადასვენება', url: '/ka/services#transportation', keywords: 'gadasveneba' },
        { name: 'ქვაზე ხატვა', url: '/ka/services#stone-engraving', keywords: 'qvaze xatva' },
        { name: 'საფლავის მოპირკეთება', url: '/ka/services#grave-decoration', keywords: 'mopirketeba' },
        { name: 'საპანაშვიდე დარბაზი', url: '/ka/services#mourning-hall', keywords: 'sapanashvide darbazi' },
        { name: 'საბანკეტო დარბაზი', url: '/ka/services#banquet-hall', keywords: 'sabanketo darbazi' },
        { name: 'სამარხის გაჭრა', url: '/ka/services#grave-preparation', keywords: 'samarxis gacra' },
        { name: 'ფერადი სურათის დამზადება', url: '/ka/services#colored-photo', keywords: 'feradi suratis damzadeba' },
        { name: 'ლითონის ასოებით წარწერა', url: '/ka/services#metal-letters', keywords: 'litonis asoebit carcera' }
      ],
      products: [
        { name: 'სასახლეები', url: '/ka/products/coffins', keywords: 'sasaxleebi' },
        { name: 'კატაფალკები', url: '/ka/products/hearse', keywords: 'katafalka' },
        { name: 'სუდარები', url: '/ka/products/shrouds', keywords: 'sudarebi, sudara' },
        { name: 'მაცივრები', url: '/ka/products/refrigeration', keywords: 'macivrebi' }
      ]
    },
    en: {
      services: [
        { name: 'Agent Service', url: '/en/services#agent-service', keywords: 'agent service' },
        { name: 'Dressing the Deceased', url: '/en/services#dressing', keywords: 'dressing deceased' },
        { name: 'Embalming', url: '/en/services#embalming', keywords: 'embalming' },
        { name: 'Hearse Service', url: '/en/services#hearse', keywords: 'hearse service' },
        { name: 'Transportation', url: '/en/services#transportation', keywords: 'transportation' },
        { name: 'Stone Engraving', url: '/en/services#stone-engraving', keywords: 'stone engraving' },
        { name: 'Grave Decoration', url: '/en/services#grave-decoration', keywords: 'grave decoration' },
        { name: 'Memorial Hall', url: '/en/services#mourning-hall', keywords: 'memorial hall' },
        { name: 'Banquet Hall', url: '/en/services#banquet-hall', keywords: 'banquet hall' },
        { name: 'Grave Digging', url: '/en/services#grave-preparation', keywords: 'grave digging' },
        { name: 'Color Photo Production', url: '/en/services#colored-photo', keywords: 'color photo production' },
        { name: 'Metal Letter Engraving', url: '/en/services#metal-letters', keywords: 'metal letter engraving' }
      ],
      products: [
        { name: 'Coffins', url: '/en/products/coffins', keywords: 'coffins' },
        { name: 'Hearse', url: '/en/products/hearse', keywords: 'hearse' },
        { name: 'Shrouds', url: '/en/products/shrouds', keywords: 'shrouds' },
        { name: 'Refrigeration', url: '/en/products/refrigeration', keywords: 'refrigeration' }
      ]
    },
    ru: {
      services: [
        { name: 'Агентское обслуживание', url: '/ru/services#agent-service', keywords: 'агентское обслуживание' },
        { name: 'Одевание покойного', url: '/ru/services#dressing', keywords: 'одевание покойного' },
        { name: 'Бальзамирование', url: '/ru/services#embalming', keywords: 'бальзамирование' },
        { name: 'Услуги катафалка', url: '/ru/services#hearse', keywords: 'услуги катафалка' },
        { name: 'Перевозка', url: '/ru/services#transportation', keywords: 'перевозка' },
        { name: 'Роспись на камне', url: '/ru/services#stone-engraving', keywords: 'роспись на камне' },
        { name: 'Благоустройство могил', url: '/ru/services#grave-decoration', keywords: 'благоустройство могил' },
        { name: 'Поминальный зал', url: '/ru/services#mourning-hall', keywords: 'поминальный зал' },
        { name: 'Банкетный зал', url: '/ru/services#banquet-hall', keywords: 'банкетный зал' },
        { name: 'Копание могилы', url: '/ru/services#grave-preparation', keywords: 'копание могилы' },
        { name: 'Изготовление цветных фотографий', url: '/ru/services#colored-photo', keywords: 'изготовление цветных фотографий' },
        { name: 'Гравировка металлическими буквами', url: '/ru/services#metal-letters', keywords: 'гравировка металлическими буквами' }
      ],
      products: [
        { name: 'Гробы', url: '/ru/products/coffins', keywords: 'гробы' },
        { name: 'Катафалк', url: '/ru/products/hearse', keywords: 'катафалк' },
        { name: 'Саваны', url: '/ru/products/shrouds', keywords: 'саваны' },
        { name: 'Холодильники', url: '/ru/products/refrigeration', keywords: 'холодильники' }
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
      // Only close desktop dropdowns, not mobile dropdowns
      if (!target.closest('.dropdown') && !target.closest('.mobile-menu')) {
        this.closeAllDropdowns();
      }
    });

    // Listen to route changes to update active state
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Clear last clicked link when route changes
      this.lastClickedLink = null;
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  onLanguageChange(language: string): void {
    this.languageChange.emit(language);
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.closeMobileDropdowns();
    }
  }

  toggleServicesDropdown(): void {
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
    this.isProductsDropdownOpen = false;
  }

  toggleProductsDropdown(): void {
    this.isProductsDropdownOpen = !this.isProductsDropdownOpen;
    this.isServicesDropdownOpen = false;
  }

  toggleMobileServices(): void {
    this.isMobileServicesOpen = !this.isMobileServicesOpen;
    this.isMobileProductsOpen = false;
  }

  toggleMobileProducts(): void {
    this.isMobileProductsOpen = !this.isMobileProductsOpen;
    this.isMobileServicesOpen = false;
  }

  closeAllDropdowns(): void {
    this.isServicesDropdownOpen = false;
    this.isProductsDropdownOpen = false;
    // Don't close mobile dropdowns when closing desktop dropdowns
    // this.isMobileServicesOpen = false;
    // this.isMobileProductsOpen = false;
  }

  closeMobileDropdowns(): void {
    this.isMobileServicesOpen = false;
    this.isMobileProductsOpen = false;
  }

  navigateTo(url: string): void {
    // Extract the path and fragment from the URL
    const urlParts = url.split('#');
    const path = urlParts[0];
    const fragment = urlParts[1];
    
    if (fragment) {
      // Navigate with fragment
      this.router.navigate([path], { fragment: fragment });
    } else {
      // Navigate without fragment
      this.router.navigateByUrl(url);
    }
    
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
    // Get current URL path
    const currentUrl = this.router.url;
    
    // If we're on the home page, no navigation links should be active
    if (currentUrl === '/' + this.currentLanguage || currentUrl === '/' + this.currentLanguage + '/') {
      return false;
    }
    
    // Check if the current URL matches the link ID
    if (linkId === 'about' && currentUrl.includes('/about')) {
      return true;
    }
    if (linkId === 'locations' && currentUrl.includes('/locations')) {
      return true;
    }
    if (linkId === 'services' && currentUrl.includes('/services')) {
      return true;
    }
    if (linkId === 'products' && currentUrl.includes('/products')) {
      return true;
    }
    
    // Fallback to last clicked link for immediate feedback
    return this.lastClickedLink === linkId;
  }

  getServicePath(url: string): string[] {
    const urlParts = url.split('#');
    const path = urlParts[0];
    return [path];
  }

  getServiceFragment(url: string): string {
    const urlParts = url.split('#');
    return urlParts[1] || '';
  }
}