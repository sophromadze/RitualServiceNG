import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { filter } from 'rxjs/operators';

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
    private languageService: LanguageService
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
    
    if (segments.length > 1) {
      // Remove language segment
      segments.shift();
      
      let currentUrl = `/${this.currentLanguage}`;
      
      segments.forEach((segment, index) => {
        currentUrl += `/${segment}`;
        
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
            
            return; // Skip the default push below
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
          case 'hearse':
            label = this.translate('breadcrumb.hearse');
            break;
          // Service-specific translations
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
          case 'funeral-planning':
            label = this.translate('breadcrumb.funeral_planning');
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
      });
    }
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  callPhone(): void {
    window.open('tel:+995599069898', '_self');
  }
}