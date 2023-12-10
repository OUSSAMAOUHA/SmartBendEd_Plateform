import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCriteriaComponent } from './gestion-criteria.component';

describe('GestionCriteriaComponent', () => {
  let component: GestionCriteriaComponent;
  let fixture: ComponentFixture<GestionCriteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCriteriaComponent]
    });
    fixture = TestBed.createComponent(GestionCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
