import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoEmCursoMultirefComponent } from './operacao-em-curso-multiref.component';

describe('OperacaoEmCursoMultirefComponent', () => {
  let component: OperacaoEmCursoMultirefComponent;
  let fixture: ComponentFixture<OperacaoEmCursoMultirefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacaoEmCursoMultirefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoEmCursoMultirefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
