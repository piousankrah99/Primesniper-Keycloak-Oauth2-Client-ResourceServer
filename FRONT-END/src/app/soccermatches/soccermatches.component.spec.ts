import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccermatchesComponent } from './soccermatches.component';

describe('SoccermatchesComponent', () => {
  let component: SoccermatchesComponent;
  let fixture: ComponentFixture<SoccermatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoccermatchesComponent]
    });
    fixture = TestBed.createComponent(SoccermatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
