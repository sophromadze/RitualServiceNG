import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() currentLanguage: string = 'ka';

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  navigateToLocation(location: string): void {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      this.router.navigate(['locations'], { 
        fragment: location 
      });
    } else {
      // For other languages, add language prefix
      this.router.navigate([this.currentLanguage, 'locations'], { 
        fragment: location 
      });
    }
  }

  getServicesLink(): string[] {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return ['services'];
    }
    // For other languages, add language prefix
    return [this.currentLanguage, 'services'];
  }

  getProductsLink(): string[] {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return ['products'];
    }
    // For other languages, add language prefix
    return [this.currentLanguage, 'products'];
  }

  getAboutLink(): string[] {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return ['about'];
    }
    // For other languages, add language prefix
    return [this.currentLanguage, 'about'];
  }

  getLocationsLink(): string[] {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return ['locations'];
    }
    // For other languages, add language prefix
    return [this.currentLanguage, 'locations'];
  }

  getFuneralPlanningLink(): string[] {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return ['funeral-planning'];
    }
    // For other languages, add language prefix
    return [this.currentLanguage, 'funeral-planning'];
  }

  getHomeLink(): string[] {
    // For Georgian (default), don't add language prefix
    if (this.currentLanguage === 'ka') {
      return ['/'];
    }
    // For other languages, add language prefix
    return [this.currentLanguage];
  }
}