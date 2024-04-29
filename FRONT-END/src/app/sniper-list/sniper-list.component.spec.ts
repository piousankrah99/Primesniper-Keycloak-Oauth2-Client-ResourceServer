import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SniperListComponent } from './sniper-list.component';

describe('SniperListComponent', () => {
  let component: SniperListComponent;
  let fixture: ComponentFixture<SniperListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SniperListComponent]
    });
    fixture = TestBed.createComponent(SniperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
