import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-dropdown">
      <button class="dropdown-button" (click)="toggleDropdown()">
        <img [src]="getFlagSrc()" [alt]="currentLanguage" class="flag-img">
        <span>{{getLanguageName()}}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      
      <div class="dropdown-content" [class.show]="isOpen">
        <div class="language-option" 
             *ngFor="let lang of languages" 
             [class.hidden]="lang.code === currentLanguage"
             (click)="selectLanguage(lang.code)">
          <img [src]="lang.flag" [alt]="lang.name" class="flag-img">
          <span>{{lang.name}}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .language-dropdown {
      position: relative;
      display: inline-block;
    }
    .dropdown-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
    }
    .dropdown-content {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 1000;
      display: none;
    }
    .dropdown-content.show {
      display: block;
    }
    .language-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
    }
    .language-option:hover {
      background-color: #f5f5f5;
    }
    .language-option.hidden {
      display: none;
    }
    .flag-img {
      width: 20px;
      height: 15px;
    }
  `]
})
export class LanguageSelectorComponent {
  @Input() currentLanguage: string = 'ka';
  @Output() languageChange = new EventEmitter<string>();

  isOpen = false;

  languages = [
    { code: 'ka', name: 'ქარ', flag: '/images/ge.svg' },
    { code: 'en', name: 'ENG', flag: '/images/gb.svg' },
    { code: 'ru', name: 'РУС', flag: '/images/ru.svg' }
  ];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(langCode: string) {
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