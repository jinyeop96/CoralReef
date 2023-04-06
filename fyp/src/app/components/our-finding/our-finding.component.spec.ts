import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurFindingComponent } from './our-finding.component';

describe('OurFindingComponent', () => {
  let component: OurFindingComponent;
  let fixture: ComponentFixture<OurFindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurFindingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
