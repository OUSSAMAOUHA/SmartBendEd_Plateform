import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGradeComponent } from './add-new-grade.component';

describe('AddNewClasseComponent', () => {
  let component: AddNewGradeComponent;
  let fixture: ComponentFixture<AddNewGradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewGradeComponent]
    });
    fixture = TestBed.createComponent(AddNewGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
