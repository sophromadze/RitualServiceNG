import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() currentLanguage: string = 'ka';
  breadcrumbs: Array<{label: string, url: string}> = [];

  constructor(
    private router: Router,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.buildBreadcrumbs();
    });
    
    this.buildBreadcrumbs();
  }

  private buildBreadcrumbs() {
    const url = this.router.url;
    const segments = url.split('/').filter(segment => segment);
    
    this.breadcrumbs = [];
    
    // Handle Georgian (no language prefix) vs other languages
    let startIndex = 0;
    let currentUrl = '';
    
    if (this.currentLanguage === 'ka') {
      // For Georgian, no language prefix, start from the first segment
      startIndex = 0;
      currentUrl = '';
    } else {
      // For other languages, skip the language segment and start building URL with language prefix
      startIndex = 1;
      currentUrl = `/${this.currentLanguage}`;
    }
    
    if (segments.length > startIndex) {
      // Process segments starting from the appropriate index
      for (let i = startIndex; i < segments.length; i++) {
        const segment = segments[i];
        
        if (this.currentLanguage === 'ka') {
          currentUrl += `/${segment}`;
        } else {
          currentUrl += `/${segment}`;
        }
        
        let label = segment;
        
        // Handle URL fragments (e.g., services#mourning-hall or locations#gldani)
        if (segment.includes('#')) {
          const [baseSegment, fragment] = segment.split('#');
          currentUrl = currentUrl.replace(`/${segment}`, `/${baseSegment}#${fragment}`);
          
          // Special handling for locations with fragments
          if (baseSegment === 'locations') {
            // Set the base label to "ფილიალები" (locations)
            label = this.translate('nav.locations');
            
            // Add the specific location as a separate breadcrumb
            let locationLabel = '';
            switch (fragment) {
              case 'gldani':
                locationLabel = this.translate('locations.gldani_title') || 'გლდანი';
                break;
              case 'dighomi':
                locationLabel = this.translate('locations.dighomi_title') || 'დიღომი';
                break;
              case 'jiqia':
                locationLabel = this.translate('locations.saburtalo_title') || 'საბურთალო';
                break;
              default:
                locationLabel = fragment;
            }
            
            // Add the location breadcrumb
            this.breadcrumbs.push({
              label: locationLabel,
              url: currentUrl
            });
            
            continue; // Skip the default push below
          } else {
            // Handle other fragments (services, etc.)
            const fragmentKey = `breadcrumb.${fragment.replace(/-/g, '_')}`;
            const baseKey = `breadcrumb.${baseSegment.replace(/-/g, '_')}`;
            
            if (this.translate(fragmentKey) !== fragmentKey) {
              label = this.translate(fragmentKey);
            } else if (this.translate(baseKey) !== baseKey) {
              label = this.translate(baseKey);
            }
          }
        } else {
          // Translate common segments
        switch (segment) {
          case 'services':
            label = this.translate('nav.services');
            break;
          case 'products':
            label = this.translate('nav.products');
            break;
          case 'about':
            label = this.translate('nav.about');
            break;
          case 'contact':
            label = this.translate('nav.contact');
            break;
          case 'locations':
            label = this.translate('nav.locations');
            break;
          case 'funeral-planning':
            label = this.translate('breadcrumb.funeral_planning');
            break;
          // Product-specific translations
          case 'coffins':
            label = this.translate('breadcrumb.coffins');
            break;
          case 'shrouds':
            label = this.translate('breadcrumb.shrouds');
            break;
          case 'refrigeration':
            label = this.translate('breadcrumb.refrigeration');
            break;
          case 'cemetery_accessories':
            label = this.translate('breadcrumb.cemetery_accessories');
            break;
          case 'cemetery-accessories':
            label = this.translate('breadcrumb.cemetery_accessories');
            break;
          // Service-specific translations - Legacy services
          case 'embalming':
            label = this.translate('breadcrumb.embalming');
            break;
          case 'transportation':
            label = this.translate('breadcrumb.transportation');
            break;
          case 'stone-engraving':
            label = this.translate('breadcrumb.stone_engraving');
            break;
          case 'grave-decoration':
            label = this.translate('breadcrumb.grave_decoration');
            break;
          case 'dressing':
            label = this.translate('breadcrumb.dressing');
            break;
          case 'mourning-hall':
            label = this.translate('breadcrumb.mourning_hall');
            break;
          case 'banquet-hall':
            label = this.translate('breadcrumb.banquet_hall');
            break;
          case 'metal-letters':
            label = this.translate('breadcrumb.metal_letters');
            break;
          case 'agent-service':
            label = this.translate('breadcrumb.agent_service');
            break;
          case 'lifting-machine':
            label = this.translate('breadcrumb.lifting_machine');
            break;
          case 'colored-photo':
            label = this.translate('breadcrumb.colored_photo');
            break;
          // New service translations
          case 'embalming-dressing':
            label = this.translate('services.embalming_dressing_service.title') || 'ბალზამირება, გრიმი, ჩაცმა';
            break;
          case 'microbus':
            label = this.translate('services.microbus_service.title') || 'მარშუტკა';
            break;
          case 'hall':
            label = this.translate('services.hall_service.title') || 'დარბაზი';
            break;
          case 'cemetery-decoration':
            label = this.translate('services.cemetery_decoration_service.title') || 'სასაფლაოს მოპირკეთება';
            break;
          case 'grave-stones':
            label = this.translate('services.grave_stones_service.title') || 'საფლავის ქვები, ქვაზე ხატვა';
            break;
          case 'grave-preparation':
            label = this.translate('services.grave_preparation_service.title') || 'სამარხის გაჭრა';
            break;
          case 'hearse':
            label = this.translate('services.hearse_service.title') || 'კატაფალკის მომსახურება';
            break;
          // Legacy translations for backward compatibility
          case 'damkrdzalavi-biuro':
            label = 'დამკრძალავი ბიურო';
            break;
          case 'balzamireba':
            label = 'ბალზამირება';
            break;
          case 'katafalka':
            label = 'კატაფალკები';
            break;
          case 'gadasveneba':
            label = 'გადასვენება';
            break;
          case 'qvaze-xatva':
            label = 'ქვაზე ხატვა';
            break;
          case 'mopirketeba':
            label = 'საფლავის მოპირკეთება';
            break;
        }
        }
        
        this.breadcrumbs.push({
          label: label,
          url: currentUrl
        });
      }
    }
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  isHomePage(): boolean {
    const url = this.router.url;
    const segments = url.split('/').filter(segment => segment);
    
    // For Georgian (default), home page is just "/" (no segments)
    if (this.currentLanguage === 'ka') {
      return segments.length === 0;
    }
    
    // For other languages, home page has language segment
    return segments.length === 1 && ['en', 'ru'].includes(segments[0]);
  }

  getHomeLink(): string[] {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return ['/'];
    }
    // For other languages, add language prefix
    return [this.currentLanguage];
  }

  onHomeClick(event: Event): void {
    if (this.isHomePage()) {
      event.preventDefault();
      return;
    }
  }

  callPhone(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.open('tel:+995557556116', '_self');
  }
}