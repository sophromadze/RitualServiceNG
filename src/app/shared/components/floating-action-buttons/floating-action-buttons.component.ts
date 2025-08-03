import { Component, HostListener, ElementRef, Inject, PLATFORM_ID, OnInit } from '@angular/core';
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
export class FloatingActionButtonsComponent implements OnInit {
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

  ngOnInit(): void {
    // Set up click outside listener only in browser
    if (this.isBrowser) {
      document.addEventListener('click', (event) => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.isExpanded = false;
        }
      });
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
      window.location.href = 'tel:+995557556116';
    }
  }

  planFuneral() {
    // Get current language from URL
    const urlSegments = this.router.url.split('/');
    const currentLanguage = urlSegments.length > 1 && ['ka', 'en', 'ru'].includes(urlSegments[1]) ? urlSegments[1] : 'ka';
    
    // For Georgian (default), don't add language prefix
    if (currentLanguage === 'ka') {
      this.router.navigate(['funeral-planning']);
    } else {
      // For other languages, add language prefix
      this.router.navigate([currentLanguage, 'funeral-planning']);
    }
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 