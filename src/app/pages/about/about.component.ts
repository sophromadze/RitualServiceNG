import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'ka';
  private subscriptions: Subscription = new Subscription();

  // Company statistics and features
  companyStats = [
    {
      number: '20+',
      labelKey: 'about.years_experience',
      descKey: 'about.years_experience_desc'
    },
    {
      number: '5000+',
      labelKey: 'about.satisfied_families',
      descKey: 'about.satisfied_families_desc'
    },
    {
      number: '3',
      labelKey: 'about.locations_tbilisi',
      descKey: 'about.locations_tbilisi_desc'
    },
    {
      number: '24/7',
      labelKey: 'about.round_clock_service',
      descKey: 'about.round_clock_service_desc'
    }
  ];

  teamMembers = [
    {
      name: 'გიორგი წერეთელი',
      position: 'დირექტორი',
      experience: '20 წლიანი გამოცდილება',
      specialization: 'დამკრძალავი ბიურო მენეჯმენტი'
    },
    {
      name: 'ნინო კვარაცხელია',
      position: 'სარიტუალო აგენტი',
      experience: '15 წლიანი გამოცდილება',
      specialization: 'ბალზამირება და მიცვალებულის ჩაცმა'
    },
    {
      name: 'დავით ხუციშვილი',
      position: 'მემორიალური სამუშაოების სპეციალისტი',
      experience: '12 წლიანი გამოცდილება',
      specialization: 'ქვაზე ხატვა და საფლავის მოპირკეთება'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    // Subscribe to language changes
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
        this.updateSEO();
      })
    );

    // Subscribe to route data for SEO
    this.subscriptions.add(
      this.route.data.subscribe(data => {
        if (data) {
          this.updateSEO(data);
        }
      })
    );

    // Set language from route
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
      title: this.getSEOTitle(),
      description: this.getSEODescription(),
      keywords: this.getSEOKeywords()
    };

    const structuredData = this.generateAboutStructuredData();
    
    this.seoService.updateSEO({
      ...seoData,
      structuredData: structuredData
    }, this.currentLanguage);
  }

  private getSEOTitle(): string {
    const titles = {
      ka: 'ჩვენს შესახებ - 20 წლიანი გამოცდილება | რიტუალ სერვისი - დამკრძალავი ბიურო',
      en: 'About Us - 20 Years of Experience | Ritual Service - Funeral Home',
      ru: 'О нас - 20 лет опыта | Ритуал Сервис - Похоронный дом'
    };
    return titles[this.currentLanguage as keyof typeof titles] || titles.ka;
  }

  private getSEODescription(): string {
    const descriptions = {
      ka: '20 წლიანი გამოცდილება სარიტუალო მომსახურებაში. პროფესიონალური დამკრძალავი ბიურო, ღირსეული მომსახურება. ბალზამირება, კატაფალკა, ქვაზე ხატვა, გადასვენება.',
      en: '20 years of experience in funeral services. Professional funeral home, dignified service. Embalming, hearse, stone engraving, transportation.',
      ru: '20 лет опыта в ритуальных услугах. Профессиональный похоронный дом, достойное обслуживание. Бальзамирование, катафалк, роспись на камне, перевозка.'
    };
    return descriptions[this.currentLanguage as keyof typeof descriptions] || descriptions.ka;
  }

  private getSEOKeywords(): string {
    const keywords = {
      ka: 'რიტუალ სერვისი ისტორია, გამოცდილება, დამკრძალავი ბიურო, პროფესიონალური გუნდი, damkrdzalavi biuro, balzamireba, katafalka, qvaze xatva, gadasveneba, mopirketeba, micvalebuli, sudara, samgloviaro, dasaflaveba, dakrdzalva, sapanashvide',
      en: 'Ritual Service history, experience, funeral home, professional team, embalming, hearse, stone engraving, transportation, grave decoration, memorial services',
      ru: 'история Ритуал Сервис, опыт, похоронный дом, профессиональная команда, бальзамирование, катафалк, роспись на камне, перевозка, благоустройство могил'
    };
    return keywords[this.currentLanguage as keyof typeof keywords] || keywords.ka;
  }

  private generateAboutStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "FuneralHome",
        "name": "Ritual Service",
        "foundingDate": "2004",
        "description": this.getSEODescription(),
        "url": `https://ritualservice.ge/${this.currentLanguage}/about`,
        "employee": this.teamMembers.map(member => ({
          "@type": "Person",
          "name": member.name,
          "jobTitle": member.position,
          "worksFor": {
            "@type": "FuneralHome",
            "name": "Ritual Service"
          }
        }))
      }
    };
  }

  // Template methods
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }
}