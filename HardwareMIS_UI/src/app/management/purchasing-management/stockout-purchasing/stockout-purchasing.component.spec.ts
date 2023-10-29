/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockoutPurchasingComponent } from './stockout-purchasing.component';

describe('StockoutPurchasingComponent', () => {
  let component: StockoutPurchasingComponent;
  let fixture: ComponentFixture<StockoutPurchasingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockoutPurchasingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockoutPurchasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
