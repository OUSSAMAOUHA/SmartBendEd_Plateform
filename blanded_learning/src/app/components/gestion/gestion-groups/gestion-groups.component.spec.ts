import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGroupsComponent } from './gestion-groups.component';

describe('GestionGroupsComponent', () => {
  let component: GestionGroupsComponent;
  let fixture: ComponentFixture<GestionGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionGroupsComponent]
    });
    fixture = TestBed.createComponent(GestionGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
