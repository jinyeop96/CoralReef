import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateChangeComponent } from './climate-change.component';

describe('ClimateChangeComponent', () => {
  let component: ClimateChangeComponent;
  let fixture: ComponentFixture<ClimateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimateChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
