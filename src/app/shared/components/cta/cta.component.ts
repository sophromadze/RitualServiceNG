import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  currentLanguage: string = 'ka';

  constructor(
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  callPhone(): void {
    // Only run if we're in the browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    window.location.href = 'tel:+995599069898';
  }

  // Component can be extended with input properties if needed
  // @Input() title: string = 'Ready to Learn More?';
  // @Input() description: string = 'Contact us today to discuss how we can help you and your family';
  // @Input() buttonText: string = 'Get in Touch';
  // @Input() buttonLink: string = '/contact';
} 