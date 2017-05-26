import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaOperacaoComponent } from './nova-operacao.component';

describe('NovaOperacaoComponent', () => {
  let component: NovaOperacaoComponent;
  let fixture: ComponentFixture<NovaOperacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaOperacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaOperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
