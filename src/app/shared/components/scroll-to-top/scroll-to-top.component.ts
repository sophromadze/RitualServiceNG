import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {
  isVisible = false;
  private isBrowser: boolean;
  private scrollThreshold = 300; // Show button after scrolling 300px
  
  constructor(
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.isVisible = window.pageYOffset > this.scrollThreshold;
    }
  }
  
  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  
  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 