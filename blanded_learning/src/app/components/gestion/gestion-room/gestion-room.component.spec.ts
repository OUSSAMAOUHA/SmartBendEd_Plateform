import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRoomComponent } from './gestion-room.component';

describe('GestionSallesComponent', () => {
  let component: GestionRoomComponent;
  let fixture: ComponentFixture<GestionRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRoomComponent]
    });
    fixture = TestBed.createComponent(GestionRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
