import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  @Input() currentLanguage: string = 'ka';
  @Output() languageChange = new EventEmitter<string>();

  isOpen = false;
  isMobile = false;

  languages = [
    { code: 'ka', name: 'ქარ', flag: '/images/ge.svg' },
    { code: 'en', name: 'ENG', flag: '/images/gb.svg' },
    { code: 'ru', name: 'РУС', flag: '/images/ru.svg' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 850;
      
      // Listen for window resize to update mobile detection
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth <= 850;
      });

      // Add click outside listener
      document.addEventListener('click', this.handleClickOutside.bind(this));
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.handleClickOutside.bind(this));
    }
  }

  private handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-dropdown')) {
      this.isOpen = false;
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  onMouseEnter(): void {
    if (!this.isMobile) {
      this.isOpen = true;
    }
  }

  onMouseLeave(): void {
    if (!this.isMobile) {
      this.isOpen = false;
    }
  }

  selectLanguage(langCode: string): void {
    this.languageChange.emit(langCode);
    this.isOpen = false;
  }

  getFlagSrc(): string {
    return this.languages.find(lang => lang.code === this.currentLanguage)?.flag || '/images/ge.svg';
  }

  getLanguageName(): string {
    return this.languages.find(lang => lang.code === this.currentLanguage)?.name || 'ქარ';
  }
}