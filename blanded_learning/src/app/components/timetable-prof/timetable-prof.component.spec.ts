import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableProfComponent } from './timetable-prof.component';

describe('TimetableProfComponent', () => {
  let component: TimetableProfComponent;
  let fixture: ComponentFixture<TimetableProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimetableProfComponent]
    });
    fixture = TestBed.createComponent(TimetableProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
