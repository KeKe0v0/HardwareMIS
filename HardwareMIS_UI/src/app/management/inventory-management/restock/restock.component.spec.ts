/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RestockComponent } from './restock.component';

describe('RestockComponent', () => {
  let component: RestockComponent;
  let fixture: ComponentFixture<RestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
