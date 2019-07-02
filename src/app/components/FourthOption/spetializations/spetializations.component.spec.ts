import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpetializationsComponent } from './spetializations.component';

describe('SpetializationsComponent', () => {
  let component: SpetializationsComponent;
  let fixture: ComponentFixture<SpetializationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpetializationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpetializationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
