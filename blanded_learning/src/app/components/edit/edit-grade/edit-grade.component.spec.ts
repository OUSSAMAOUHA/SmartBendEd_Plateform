import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGradeComponent } from './edit-grade.component';

describe('EditClasseComponent', () => {
  let component: EditGradeComponent;
  let fixture: ComponentFixture<EditGradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditGradeComponent]
    });
    fixture = TestBed.createComponent(EditGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
