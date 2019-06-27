import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsDutiesComponent } from './hospitals-duties.component';

describe('HospitalsDutiesComponent', () => {
  let component: HospitalsDutiesComponent;
  let fixture: ComponentFixture<HospitalsDutiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalsDutiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
