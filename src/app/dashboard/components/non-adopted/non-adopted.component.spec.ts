import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAdoptedComponent } from './non-adopted.component';

describe('NonAdoptedComponent', () => {
  let component: NonAdoptedComponent;
  let fixture: ComponentFixture<NonAdoptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonAdoptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAdoptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
