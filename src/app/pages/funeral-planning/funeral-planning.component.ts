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
  
  // Planning steps
  planningSteps = [
    {
      id: 'initial-consultation',
      titleKey: 'funeral_planning.step_consultation_title',
      descriptionKey: 'funeral_planning.step_consultation_desc',
      details: [
        'funeral_planning.step_consultation_detail1',
        'funeral_planning.step_consultation_detail2',
        'funeral_planning.step_consultation_detail3'
      ]
    },
    {
      id: 'documentation',
      titleKey: 'funeral_planning.step_documentation_title',
      descriptionKey: 'funeral_planning.step_documentation_desc',
      details: [
        'funeral_planning.step_documentation_detail1',
        'funeral_planning.step_documentation_detail2',
        'funeral_planning.step_documentation_detail3'
      ]
    },
    {
      id: 'ceremony-planning',
      titleKey: 'funeral_planning.step_ceremony_title',
      descriptionKey: 'funeral_planning.step_ceremony_desc',
      details: [
        'funeral_planning.step_ceremony_detail1',
        'funeral_planning.step_ceremony_detail2',
        'funeral_planning.step_ceremony_detail3'
      ]
    },
    {
      id: 'logistics',
      titleKey: 'funeral_planning.step_logistics_title',
      descriptionKey: 'funeral_planning.step_logistics_desc',
      details: [
        'funeral_planning.step_logistics_detail1',
        'funeral_planning.step_logistics_detail2',
        'funeral_planning.step_logistics_detail3'
      ]
    },
    {
      id: 'coordination',
      titleKey: 'funeral_planning.step_coordination_title',
      descriptionKey: 'funeral_planning.step_coordination_desc',
      details: [
        'funeral_planning.step_coordination_detail1',
        'funeral_planning.step_coordination_detail2',
        'funeral_planning.step_coordination_detail3'
      ]
    }
  ];

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
    },
    {
      questionKey: 'funeral_planning.faq_timing_q',
      answerKey: 'funeral_planning.faq_timing_a',
      expanded: false
    },
    {
      questionKey: 'funeral_planning.faq_cost_q',
      answerKey: 'funeral_planning.faq_cost_a',
      expanded: false
    },
    {
      questionKey: 'funeral_planning.faq_cemetery_q',
      answerKey: 'funeral_planning.faq_cemetery_a',
      expanded: false
    },
    {
      questionKey: 'funeral_planning.faq_transport_q',
      answerKey: 'funeral_planning.faq_transport_a',
      expanded: false
    },
    {
      questionKey: 'funeral_planning.faq_cremation_q',
      answerKey: 'funeral_planning.faq_cremation_a',
      expanded: false
    },
    {
      questionKey: 'funeral_planning.faq_insurance_q',
      answerKey: 'funeral_planning.faq_insurance_a',
      expanded: false
    },
    {
      questionKey: 'funeral_planning.faq_emergency_q',
      answerKey: 'funeral_planning.faq_emergency_a',
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

  toggleFAQ(index: number): void {
    this.faqItems[index].expanded = !this.faqItems[index].expanded;
  }

  callUs(): void {
    window.location.href = 'tel:+995599069898';
  }

  getStepTitle(step: any): string {
    return this.translate(step.titleKey);
  }

  getStepDescription(step: any): string {
    return this.translate(step.descriptionKey);
  }

  getStepDetail(detailKey: string): string {
    return this.translate(detailKey);
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
}
