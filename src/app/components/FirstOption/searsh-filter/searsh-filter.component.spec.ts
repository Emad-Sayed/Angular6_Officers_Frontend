import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearshFilterComponent } from './searsh-filter.component';

describe('SearshFilterComponent', () => {
  let component: SearshFilterComponent;
  let fixture: ComponentFixture<SearshFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearshFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearshFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
