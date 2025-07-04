import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralPlanningComponent } from './funeral-planning.component';

describe('FuneralPlanningComponent', () => {
  let component: FuneralPlanningComponent;
  let fixture: ComponentFixture<FuneralPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuneralPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
