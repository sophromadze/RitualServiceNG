import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'ka';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
        this.updateSEO();
      })
    );

    this.subscriptions.add(
      this.route.data.subscribe(data => {
        if (data) {
          this.updateSEO(data);
        }
      })
    );

    const urlSegments = this.router.url.split('/');
    if (urlSegments.length > 1 && ['ka', 'en', 'ru'].includes(urlSegments[1])) {
      this.languageService.setLanguage(urlSegments[1]);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private updateSEO(routeData?: any): void {
    const seoData = routeData || {
      title: 'კონტაქტი - 24/7 მომსახურება | რიტუალ სერვისი - damkrdzalavi biuro',
      description: 'დაგვიკავშირდით 24/7. პროფესიონალური კონსულტაცია, სწრაფი რეაგირება. დამკრძალავი ბიურო თბილისში 3 ფილიალი.',
      keywords: 'კონტაქტი, 24/7 მომსახურება, უფასო კონსულტაცია, damkrdzalavi biuro, რიტუალ სერვისი ფილიალები'
    };

    this.seoService.updateSEO(seoData, this.currentLanguage);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }
}