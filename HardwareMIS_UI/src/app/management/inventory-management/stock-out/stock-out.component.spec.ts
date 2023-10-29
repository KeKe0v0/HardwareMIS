/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockOutComponent } from './stock-out.component';

describe('StockOutComponent', () => {
  let component: StockOutComponent;
  let fixture: ComponentFixture<StockOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
