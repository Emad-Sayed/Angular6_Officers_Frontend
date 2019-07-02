import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpetializationComponent } from './add-spetialization.component';

describe('AddSpetializationComponent', () => {
  let component: AddSpetializationComponent;
  let fixture: ComponentFixture<AddSpetializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpetializationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpetializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
