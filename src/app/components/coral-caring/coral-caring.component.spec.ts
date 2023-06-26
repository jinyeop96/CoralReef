import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoralCaringComponent } from './coral-caring.component';

describe('CoralCaringComponent', () => {
  let component: CoralCaringComponent;
  let fixture: ComponentFixture<CoralCaringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoralCaringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoralCaringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
