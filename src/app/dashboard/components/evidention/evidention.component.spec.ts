import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidentionComponent } from './evidention.component';

describe('EvidentionComponent', () => {
  let component: EvidentionComponent;
  let fixture: ComponentFixture<EvidentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
