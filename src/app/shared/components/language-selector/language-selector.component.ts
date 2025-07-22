import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
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