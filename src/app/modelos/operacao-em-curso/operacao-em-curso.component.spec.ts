import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoEmCursoComponent } from './operacao-em-curso.component';

describe('OperacaoEmCursoComponent', () => {
  let component: OperacaoEmCursoComponent;
  let fixture: ComponentFixture<OperacaoEmCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacaoEmCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoEmCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
