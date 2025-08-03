import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { LanguageSelectorComponent } from '../shared/components/language-selector/language-selector.component';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { filter, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


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
        { name: 'ბალზამირება, გრიმი, ჩაცმა', url: '/ka/services/embalming-dressing', keywords: 'balzamireba grimi chacma' },
        { name: 'გადასვენება', url: '/ka/services/transportation', keywords: 'gadasveneba' },
        { name: 'საპანაშვიდე დარბაზი', url: '/ka/services/mourning-hall', keywords: 'sapanashvide darbazi' },
        { name: 'კატაფალკის მომსახურება', url: '/ka/services/hearse', keywords: 'katafalkis momsaxureba' },
        { name: 'მარშუტკა', url: '/ka/services/microbus', keywords: 'marshutka' },
        { name: 'დარბაზი', url: '/ka/services/hall', keywords: 'darbazi' },
        { name: 'სასაფლაოს მოპირკეთება', url: '/ka/services/cemetery-decoration', keywords: 'sasapleos mopirketeba' },
        { name: 'საფლავის ქვები, ქვაზე ხატვა', url: '/ka/services/grave-stones', keywords: 'saplavis qvebi qvaze xatva' },
        { name: 'ლითონის წარწერები', url: '/ka/services/metal-letters', keywords: 'litonis tsartserebi' },
        { name: 'სამარხის გაჭრა', url: '/ka/services/grave-preparation', keywords: 'samarxis gacra' },
        { name: 'ჩასასვენებლი ლიფტი', url: '/ka/services/lifting-machine', keywords: 'chasasvenebli lifti' }
      ],
      products: [
        { name: 'სასახლეები', url: '/ka/products/coffins', keywords: 'sasaxleebi' },
        { name: 'სასაფლაოს აქსესუარები', url: '/ka/products/cemetery-accessories', keywords: 'sasapleos akseesuarebi' },
        { name: 'სუდარები', url: '/ka/products/shrouds', keywords: 'sudarebi, sudara' },
        { name: 'სასახლე მაცივრები', url: '/ka/products/refrigeration', keywords: 'sasaxle macivrebi' }
      ]
    },
    en: {
      services: [
        { name: 'Embalming, Makeup, Dressing', url: '/en/services/embalming-dressing', keywords: 'embalming makeup dressing' },
        { name: 'Transportation', url: '/en/services/transportation', keywords: 'transportation' },
        { name: 'Memorial Hall', url: '/en/services/mourning-hall', keywords: 'memorial hall' },
        { name: 'Hearse Service', url: '/en/services/hearse', keywords: 'hearse service' },
        { name: 'Microbus', url: '/en/services/microbus', keywords: 'microbus' },
        { name: 'Hall', url: '/en/services/hall', keywords: 'hall' },
        { name: 'Cemetery Decoration', url: '/en/services/cemetery-decoration', keywords: 'cemetery decoration' },
        { name: 'Grave Stones, Stone Painting', url: '/en/services/grave-stones', keywords: 'grave stones stone painting' },
        { name: 'Metal Inscriptions', url: '/en/services/metal-letters', keywords: 'metal inscriptions' },
        { name: 'Grave Digging', url: '/en/services/grave-preparation', keywords: 'grave digging' },
        { name: 'Lifting Machine', url: '/en/services/lifting-machine', keywords: 'lifting machine' }
      ],
      products: [
        { name: 'Coffins', url: '/en/products/coffins', keywords: 'coffins' },
        { name: 'Cemetery Accessories', url: '/en/products/cemetery-accessories', keywords: 'cemetery accessories' },
        { name: 'Shrouds', url: '/en/products/shrouds', keywords: 'shrouds' },
        { name: 'Refrigeration', url: '/en/products/refrigeration', keywords: 'refrigeration' }
      ]
    },
    ru: {
      services: [
        { name: 'Бальзамирование, грим, одевание', url: '/ru/services/embalming-dressing', keywords: 'бальзамирование грим одевание' },
        { name: 'Перевозка', url: '/ru/services/transportation', keywords: 'перевозка' },
        { name: 'Поминальный зал', url: '/ru/services/mourning-hall', keywords: 'поминальный зал' },
        { name: 'Услуги катафалка', url: '/ru/services/hearse', keywords: 'услуги катафалка' },
        { name: 'Маршрутка', url: '/ru/services/microbus', keywords: 'маршрутка' },
        { name: 'Зал', url: '/ru/services/hall', keywords: 'зал' },
        { name: 'Благоустройство кладбища', url: '/ru/services/cemetery-decoration', keywords: 'благоустройство кладбища' },
        { name: 'Надгробные камни, роспись на камне', url: '/ru/services/grave-stones', keywords: 'надгробные камни роспись на камне' },
        { name: 'Надписи металлическими буквами', url: '/ru/services/metal-letters', keywords: 'надписи металлическими буквами' },
        { name: 'Копание могилы', url: '/ru/services/grave-preparation', keywords: 'копание могилы' },
        { name: 'Подъемная машина', url: '/ru/services/lifting-machine', keywords: 'подъемная машина' }
      ],
      products: [
        { name: 'Гробы', url: '/ru/products/coffins', keywords: 'гробы' },
        { name: 'Кладбищенские аксессуары', url: '/ru/products/cemetery-accessories', keywords: 'кладбищенские аксессуары' },
        { name: 'Саваны', url: '/ru/products/shrouds', keywords: 'саваны' },
        { name: 'Холодильники', url: '/ru/products/refrigeration', keywords: 'холодильники' }
      ]
    }
  };

  constructor(
    private router: Router,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Only run browser-specific code if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Set up click outside listener for dropdowns
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        // Only close desktop dropdowns, not mobile dropdowns
        if (!target.closest('.dropdown') && !target.closest('.mobile-menu')) {
          this.closeAllDropdowns();
        }
      });
    }

    // Listen to route changes to update active state
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Clear last clicked link when route changes
      this.lastClickedLink = null;
      // Close all dropdowns when route changes
      this.closeAllDropdowns();
      this.isMenuOpen = false;
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
    // For new service URLs, return the full path
    return [url];
  }

  getServiceFragment(url: string): string {
    // No fragments needed for new service URLs
    return '';
  }

  isHomePage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl === `/${this.currentLanguage}` || currentUrl === `/${this.currentLanguage}/`;
  }
}