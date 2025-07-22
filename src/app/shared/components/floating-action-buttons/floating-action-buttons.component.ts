import { Component, HostListener, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-floating-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-action-buttons.component.html',
  styleUrl: './floating-action-buttons.component.scss'
})
export class FloatingActionButtonsComponent {
  isExpanded = false;
  private isBrowser: boolean;
  
  constructor(
    private router: Router, 
    private elementRef: ElementRef,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isExpanded = false;
    }
  }
  
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  closeExpanded() {
    this.isExpanded = false;
  }
  
  callPhone() {
    if (this.isBrowser) {
      window.location.href = 'tel:+995599069898';
    }
  }

  planFuneral() {
    // Get current language from URL
    const urlSegments = this.router.url.split('/');
    const currentLanguage = urlSegments.length > 1 && ['ka', 'en', 'ru'].includes(urlSegments[1]) ? urlSegments[1] : 'ka';
    this.router.navigate([currentLanguage, 'funeral-planning']);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 