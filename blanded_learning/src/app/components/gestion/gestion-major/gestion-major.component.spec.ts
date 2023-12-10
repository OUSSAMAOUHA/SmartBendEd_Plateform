import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMajorComponent } from './gestion-major.component';

describe('GestionFiliereComponent', () => {
  let component: GestionMajorComponent;
  let fixture: ComponentFixture<GestionMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMajorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
