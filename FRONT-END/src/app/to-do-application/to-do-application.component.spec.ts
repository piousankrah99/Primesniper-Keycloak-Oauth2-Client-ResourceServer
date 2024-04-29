import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoApplicationComponent } from './to-do-application.component';

describe('ToDoApplicationComponent', () => {
  let component: ToDoApplicationComponent;
  let fixture: ComponentFixture<ToDoApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoApplicationComponent]
    });
    fixture = TestBed.createComponent(ToDoApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
