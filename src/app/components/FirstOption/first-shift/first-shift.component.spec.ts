import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstShiftComponent } from './first-shift.component';

describe('FirstShiftComponent', () => {
  let component: FirstShiftComponent;
  let fixture: ComponentFixture<FirstShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
