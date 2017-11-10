import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControloComponent } from './controlo.component';

describe('ControloComponent', () => {
  let component: ControloComponent;
  let fixture: ComponentFixture<ControloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
