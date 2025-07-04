import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  currentLanguage: string = 'ka';

  constructor(private languageService: LanguageService) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }

  // Component can be extended with input properties if needed
  // @Input() title: string = 'Ready to Learn More?';
  // @Input() description: string = 'Contact us today to discuss how we can help you and your family';
  // @Input() buttonText: string = 'Get in Touch';
  // @Input() buttonLink: string = '/contact';
} 