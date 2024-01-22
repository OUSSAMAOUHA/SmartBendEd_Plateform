import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectModelComponent } from './affect-model.component';

describe('AffectModelComponent', () => {
  let component: AffectModelComponent;
  let fixture: ComponentFixture<AffectModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectModelComponent]
    });
    fixture = TestBed.createComponent(AffectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
