import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoQuantidades2Component } from './registo-quantidades2.component';

describe('RegistoQuantidades2Component', () => {
  let component: RegistoQuantidades2Component;
  let fixture: ComponentFixture<RegistoQuantidades2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistoQuantidades2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistoQuantidades2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
