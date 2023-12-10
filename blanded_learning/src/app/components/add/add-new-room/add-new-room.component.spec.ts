import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRoomComponent } from './add-new-room.component';

describe('AddNewSalleComponent', () => {
  let component: AddNewRoomComponent;
  let fixture: ComponentFixture<AddNewRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewRoomComponent]
    });
    fixture = TestBed.createComponent(AddNewRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
