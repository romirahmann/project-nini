import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThresholdComponent } from './add-threshold.component';

describe('AddThresholdComponent', () => {
  let component: AddThresholdComponent;
  let fixture: ComponentFixture<AddThresholdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddThresholdComponent]
    });
    fixture = TestBed.createComponent(AddThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
