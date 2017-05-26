import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPausaComponent } from './tipo-pausa.component';

describe('TipoPausaComponent', () => {
  let component: TipoPausaComponent;
  let fixture: ComponentFixture<TipoPausaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPausaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPausaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
