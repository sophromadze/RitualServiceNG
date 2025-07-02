import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SeoService } from './services/seo.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ritual-service-angular';
  currentLanguage: string = 'ka';
  isLoading: boolean = true;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.initializeApp();
    this.setupRouterEvents();
    this.setupLanguageSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeApp(): void {
    // Initialize language from URL or localStorage
    this.initializeLanguage();
    
    // Set loading to false after app initialization
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    // Add Google Analytics tracking if in browser
    if (isPlatformBrowser(this.platformId)) {
      this.setupGoogleAnalytics();
      this.setupPhoneTraking();
    }
  }

  private initializeLanguage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const urlPath = window.location.pathname;
      let language = 'ka'; // default

      if (urlPath.startsWith('/en')) {
        language = 'en';
      } else if (urlPath.startsWith('/ru')) {
        language = 'ru';
      } else if (urlPath.startsWith('/ka')) {
        language = 'ka';
      }

      this.languageService.setLanguage(language);
    }
  }

  private setupRouterEvents(): void {
    this.subscriptions.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        // Scroll to top on route change
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }

        // Update language based on URL
        this.updateLanguageFromUrl(event.url);

        // Track page view
        this.trackPageView(event.url);
      })
    );
  }

  private setupLanguageSubscription(): void {
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
        this.updateHtmlLang(language);
      })
    );
  }

  private updateLanguageFromUrl(url: string): void {
    const segments = url.split('/');
    if (segments.length > 1 && ['ka', 'en', 'ru'].includes(segments[1])) {
      this.languageService.setLanguage(segments[1]);
    }
  }

  private updateHtmlLang(language: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      htmlElement.setAttribute('lang', language === 'ka' ? 'ka-GE' : language === 'en' ? 'en-US' : 'ru-RU');
    }
  }

  private setupGoogleAnalytics(): void {
    // Google Analytics setup
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-125SWN391Z';
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-125SWN391Z', {
      page_title: document.title,
      page_location: window.location.href
    });
  }

  private setupPhoneTraking(): void {
    // Track phone clicks for analytics
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const phoneLink = target.closest('a[href^="tel:"]') as HTMLAnchorElement;
      
      if (phoneLink && (window as any).gtag) {
        (window as any).gtag('event', 'click_to_call', {
          event_category: 'Phone',
          event_label: phoneLink.getAttribute('href'),
          page_title: document.title,
          device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          value: 1
        });
      }
    });
  }

  private trackPageView(url: string): void {
    if (isPlatformBrowser(this.platformId) && (window as any).gtag) {
      (window as any).gtag('config', 'G-125SWN391Z', {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  // Template methods
  onLanguageChange(language: string): void {
    const currentPath = this.router.url;
    const pathSegments = currentPath.split('/').filter(segment => segment);
    
    // Remove current language from path
    if (pathSegments.length > 0 && ['ka', 'en', 'ru'].includes(pathSegments[0])) {
      pathSegments.shift();
    }

    // Navigate to new language path
    const newPath = `/${language}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
    this.router.navigateByUrl(newPath);
  }
}