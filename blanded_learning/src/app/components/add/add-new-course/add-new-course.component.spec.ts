import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCoursmodelComponent } from './add-new-course.component';

describe('AddNewProfComponent', () => {
  let component: AddNewCoursmodelComponent;
  let fixture: ComponentFixture<AddNewCoursmodelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewCoursmodelComponent]
    });
    fixture = TestBed.createComponent(AddNewCoursmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
