import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDutyComponent } from './new-duty.component';

describe('NewDutyComponent', () => {
  let component: NewDutyComponent;
  let fixture: ComponentFixture<NewDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
