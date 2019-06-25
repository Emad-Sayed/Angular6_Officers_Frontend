import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatnaAlbReportComponent } from './batna-alb-report.component';

describe('BatnaAlbReportComponent', () => {
  let component: BatnaAlbReportComponent;
  let fixture: ComponentFixture<BatnaAlbReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatnaAlbReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatnaAlbReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
