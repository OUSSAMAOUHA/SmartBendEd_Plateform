import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMajorComponent } from './edit-major.component';

describe('EditFiliereComponent', () => {
  let component: EditMajorComponent;
  let fixture: ComponentFixture<EditMajorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMajorComponent]
    });
    fixture = TestBed.createComponent(EditMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
