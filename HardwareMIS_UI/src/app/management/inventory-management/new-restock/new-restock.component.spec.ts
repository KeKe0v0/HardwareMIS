/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewRestockComponent } from './new-restock.component';

describe('NewRestockComponent', () => {
  let component: NewRestockComponent;
  let fixture: ComponentFixture<NewRestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
