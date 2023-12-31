import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulationComponent } from './manipulation.component';

describe('ManipulationComponent', () => {
  let component: ManipulationComponent;
  let fixture: ComponentFixture<ManipulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManipulationComponent]
    });
    fixture = TestBed.createComponent(ManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
