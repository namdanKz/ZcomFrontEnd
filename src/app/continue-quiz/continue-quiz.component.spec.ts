import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueQuizComponent } from './continue-quiz.component';

describe('ContinueQuizComponent', () => {
  let component: ContinueQuizComponent;
  let fixture: ComponentFixture<ContinueQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContinueQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContinueQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
