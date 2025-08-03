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
        
        // Skip language codes that might appear in the URL
        if (['en', 'ru', 'ka'].includes(segment)) {
          continue;
        }
        
        // Skip empty segments
        if (!segment || segment.trim() === '') {
          continue;
        }
        
        if (this.currentLanguage === 'ka') {
          currentUrl += `/${segment}`;
        } else {
          currentUrl += `/${segment}`;
        }
        
        let label = segment;
        
        // Handle URL fragments (e.g., services#mourning-hall or locations#gldani)
        if (segment.includes('#')) {
          const [baseSegment, fragment] = segment.split('#');
          
          // If fragment is empty, just use the base segment without the #
          if (!fragment) {
            currentUrl = currentUrl.replace(`/${segment}`, `/${baseSegment}`);
            // Translate the base segment properly
            label = this.translateSegment(baseSegment);
          } else {
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
          }
        } else {
          // Translate common segments using the helper method
          label = this.translateSegment(segment);
        }
        
        // Only add breadcrumb if label is not empty and not a language code
        if (label && label.trim() !== '' && !['en', 'ru', 'ka'].includes(label)) {
          this.breadcrumbs.push({
            label: label,
            url: currentUrl
          });
        }
      }
    }
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  private translateSegment(segment: string): string {
    // Translate common segments
    switch (segment) {
      case 'services':
        return this.translate('nav.services');
      case 'products':
        return this.translate('nav.products');
      case 'about':
        return this.translate('nav.about');
      case 'contact':
        return this.translate('nav.contact');
      case 'locations':
        return this.translate('nav.locations');
      case 'funeral-planning':
        return this.translate('breadcrumb.funeral_planning');
      // Product-specific translations
      case 'coffins':
        return this.translate('breadcrumb.coffins');
      case 'shrouds':
        return this.translate('breadcrumb.shrouds');
      case 'refrigeration':
        return this.translate('breadcrumb.refrigeration');
      case 'cemetery_accessories':
        return this.translate('breadcrumb.cemetery_accessories');
      case 'cemetery-accessories':
        return this.translate('breadcrumb.cemetery_accessories');
      // Service-specific translations - Legacy services
      case 'embalming':
        return this.translate('breadcrumb.embalming');
      case 'transportation':
        return this.translate('breadcrumb.transportation');
      case 'stone-engraving':
        return this.translate('breadcrumb.stone_engraving');
      case 'grave-decoration':
        return this.translate('breadcrumb.grave_decoration');
      case 'dressing':
        return this.translate('breadcrumb.dressing');
      case 'mourning-hall':
        return this.translate('breadcrumb.mourning_hall');
      case 'banquet-hall':
        return this.translate('breadcrumb.banquet_hall');
      case 'metal-letters':
        return this.translate('breadcrumb.metal_letters');
      case 'agent-service':
        return this.translate('breadcrumb.agent_service');
      case 'lifting-machine':
        return this.translate('breadcrumb.lifting_machine');
      case 'colored-photo':
        return this.translate('breadcrumb.colored_photo');
      // New service translations
      case 'embalming-dressing':
        return this.translate('services.embalming_dressing_service.title') || 'ბალზამირება, გრიმი, ჩაცმა';
      case 'microbus':
        return this.translate('services.microbus_service.title') || 'მარშუტკა';
      case 'hall':
        return this.translate('services.hall_service.title') || 'დარბაზი';
      case 'cemetery-decoration':
        return this.translate('services.cemetery_decoration_service.title') || 'სასაფლაოს მოპირკეთება';
      case 'grave-stones':
        return this.translate('services.grave_stones_service.title') || 'საფლავის ქვები, ქვაზე ხატვა';
      case 'grave-preparation':
        return this.translate('services.grave_preparation_service.title') || 'სამარხის გაჭრა';
      case 'hearse':
        return this.translate('services.hearse_service.title') || 'კატაფალკის მომსახურება';
      // Legacy translations for backward compatibility
      case 'damkrdzalavi-biuro':
        return 'დამკრძალავი ბიურო';
      case 'balzamireba':
        return 'ბალზამირება';
      case 'katafalka':
        return 'კატაფალკები';
      case 'gadasveneba':
        return 'გადასვენება';
      case 'qvaze-xatva':
        return 'ქვაზე ხატვა';
      case 'mopirketeba':
        return 'საფლავის მოპირკეთება';
      default:
        return segment;
    }
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