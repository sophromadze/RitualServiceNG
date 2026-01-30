import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-floating-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-action-buttons.component.html',
  styleUrl: './floating-action-buttons.component.scss'
})
export class FloatingActionButtonsComponent {
  private isBrowser: boolean;
  
  constructor(
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  callPhone() {
    if (this.isBrowser) {
      window.location.href = 'tel:+995557556116';
    }
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 