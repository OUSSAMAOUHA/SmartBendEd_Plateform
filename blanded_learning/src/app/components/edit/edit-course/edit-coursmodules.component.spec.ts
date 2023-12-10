import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModuleComponent } from './edit-course.component';

describe('EditProfComponent', () => {
  let component: EditModuleComponent;
  let fixture: ComponentFixture<EditModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditModuleComponent]
    });
    fixture = TestBed.createComponent(EditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
