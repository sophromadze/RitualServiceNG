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
    this.router.navigate([this.currentLanguage, 'locations'], { 
      fragment: location 
    });
  }
}