import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-funeral-planning',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './funeral-planning.component.html',
  styleUrls: ['./funeral-planning.component.scss']
})
export class FuneralPlanningComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'ka';
  private languageSubscription: Subscription = new Subscription();
  
  // Planning sections
  planningSections = [
    {
      id: 'pre-planning',
      icon: 'fa-calendar-check',
      completed: false
    },
    {
      id: 'ceremony',
      icon: 'fa-church',
      completed: false
    },
    {
      id: 'logistics',
      icon: 'fa-truck',
      completed: false
    },
    {
      id: 'documentation',
      icon: 'fa-file-alt',
      completed: false
    }
  ];

  // Planning checklist items
  checklistItems = {
    'pre-planning': [
      { id: 'wishes', translationKey: 'funeral_planning.deceased_wishes', completed: false },
      { id: 'budget', translationKey: 'funeral_planning.budget_planning', completed: false },
      { id: 'location', translationKey: 'funeral_planning.burial_location', completed: false },
      { id: 'family', translationKey: 'funeral_planning.family_consultation', completed: false }
    ],
    'ceremony': [
      { id: 'type', translationKey: 'funeral_planning.ceremony_type', completed: false },
      { id: 'officiant', translationKey: 'funeral_planning.choose_officiant', completed: false },
      { id: 'music', translationKey: 'funeral_planning.musical_accompaniment', completed: false },
      { id: 'readings', translationKey: 'funeral_planning.readings_prayers', completed: false }
    ],
    'logistics': [
      { id: 'transport', translationKey: 'funeral_planning.transportation', completed: false },
      { id: 'timing', translationKey: 'funeral_planning.timing_schedule', completed: false },
      { id: 'guests', translationKey: 'funeral_planning.guest_organization', completed: false },
      { id: 'facilities', translationKey: 'funeral_planning.venue_booking', completed: false }
    ],
    'documentation': [
      { id: 'death-cert', translationKey: 'funeral_planning.death_certificate', completed: false },
      { id: 'permits', translationKey: 'funeral_planning.permits', completed: false },
      { id: 'insurance', translationKey: 'funeral_planning.insurance', completed: false },
      { id: 'legal', translationKey: 'funeral_planning.legal_documents', completed: false }
    ]
  };

  // Contact form
  contactForm = {
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredContact: 'phone'
  };

  // FAQ items
  faqItems = [
    {
      questionKey: 'funeral_planning.faq_early_planning_q',
      answerKey: 'funeral_planning.faq_early_planning_a',
      expanded: false
    },
    {
      questionKey: 'funeral_planning.faq_documents_q',
      answerKey: 'funeral_planning.faq_documents_a',
      expanded: false
    },
    {
      questionKey: 'funeral_planning.faq_personalized_q',
      answerKey: 'funeral_planning.faq_personalized_a',
      expanded: false
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  toggleChecklistItem(sectionId: string, itemId: string): void {
    const item = this.checklistItems[sectionId as keyof typeof this.checklistItems]
      .find(i => i.id === itemId);
    if (item) {
      item.completed = !item.completed;
    }
  }

  toggleFAQ(index: number): void {
    this.faqItems[index].expanded = !this.faqItems[index].expanded;
  }

  getSectionProgress(sectionId: string): number {
    const items = this.checklistItems[sectionId as keyof typeof this.checklistItems];
    const completed = items.filter(item => item.completed).length;
    return (completed / items.length) * 100;
  }

  submitContactForm(): void {
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', this.contactForm);
    alert(this.translate('funeral_planning.form_submitted'));
  }

  getTitle(section: any): string {
    const translationKeys = {
      'pre-planning': 'funeral_planning.pre_planning',
      'ceremony': 'funeral_planning.ceremony_planning',
      'logistics': 'funeral_planning.logistics',
      'documentation': 'funeral_planning.documentation'
    };
    return this.translate(translationKeys[section.id as keyof typeof translationKeys] || '');
  }

  getText(item: any): string {
    return this.translate(item.translationKey);
  }

  getQuestion(item: any): string {
    return this.translate(item.questionKey);
  }

  getAnswer(item: any): string {
    return this.translate(item.answerKey);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getChecklistItems(sectionId: string): any[] {
    return this.checklistItems[sectionId as keyof typeof this.checklistItems] || [];
  }
}
