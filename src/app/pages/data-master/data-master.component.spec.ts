import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMasterComponent } from './data-master.component';

describe('DataMasterComponent', () => {
  let component: DataMasterComponent;
  let fixture: ComponentFixture<DataMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataMasterComponent]
    });
    fixture = TestBed.createComponent(DataMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
