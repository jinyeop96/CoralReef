import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoralIntroComponent } from './coral-intro.component';

describe('CoralIntroComponent', () => {
  let component: CoralIntroComponent;
  let fixture: ComponentFixture<CoralIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoralIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoralIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
