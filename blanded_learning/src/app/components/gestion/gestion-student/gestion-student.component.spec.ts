import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStudentComponent } from './gestion-student.component';

describe('GestionEtudiantComponent', () => {
  let component: GestionStudentComponent;
  let fixture: ComponentFixture<GestionStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionStudentComponent]
    });
    fixture = TestBed.createComponent(GestionStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
