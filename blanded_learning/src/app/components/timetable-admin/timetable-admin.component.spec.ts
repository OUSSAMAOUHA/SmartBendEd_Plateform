import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableAdminComponent } from './timetable-admin.component';

describe('TimetableAdminComponent', () => {
  let component: TimetableAdminComponent;
  let fixture: ComponentFixture<TimetableAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimetableAdminComponent]
    });
    fixture = TestBed.createComponent(TimetableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
