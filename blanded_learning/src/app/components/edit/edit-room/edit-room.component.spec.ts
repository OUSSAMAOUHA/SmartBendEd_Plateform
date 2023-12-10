import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomComponent } from './edit-room.component';

describe('EditSalleComponent', () => {
  let component: EditRoomComponent;
  let fixture: ComponentFixture<EditRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRoomComponent]
    });
    fixture = TestBed.createComponent(EditRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
