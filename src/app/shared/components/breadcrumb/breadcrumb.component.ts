import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
          <a [routerLink]="[currentLanguage]">
            <i class="fa-solid fa-home"></i>
            {{translate('nav.home')}}
          </a>
        </li>
        <li class="breadcrumb-item" *ngFor="let crumb of breadcrumbs; let last = last" [class.active]="last">
          <span class="separator">/</span>
          <a *ngIf="!last" [routerLink]="crumb.url">{{crumb.label}}</a>
          <span *ngIf="last">{{crumb.label}}</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      padding: 8px 0;
      background-color: #f8f9fa;
    }
    .breadcrumb-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .breadcrumb-item {
      display: flex;
      align-items: center;
    }
    .breadcrumb-item a {
      color: #007bff;
      text-decoration: none;
    }
    .breadcrumb-item a:hover {
      text-decoration: underline;
    }
    .breadcrumb-item.active span {
      color: #6c757d;
    }
    .separator {
      margin: 0 8px;
      color: #6c757d;
    }
  `]
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
          // Service-specific translations
          case 'damkrdzalavi-biuro':
            label = 'დამკრძალავი ბიურო';
            break;
          case 'balzamireba':
            label = 'ბალზამირება';
            break;
          case 'katafalka':
            label = 'კატაფალკა';
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
}