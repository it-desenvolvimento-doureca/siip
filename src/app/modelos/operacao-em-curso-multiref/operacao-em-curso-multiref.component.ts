import { Component, OnInit } from '@angular/core';
import { utilizadorService } from "app/utilizadorService";
import { Utilizador } from "app/modelos/entidades/utilizador";
import { ConfirmationService } from "primeng/primeng";

@Component({
  selector: 'app-operacao-em-curso-multiref',
  templateUrl: './operacao-em-curso-multiref.component.html',
  styleUrls: ['./operacao-em-curso-multiref.component.css']
})
export class OperacaoEmCursoMultirefComponent implements OnInit {
  displayDialog: boolean = false;
  utilizadores: Utilizador[] = null;
  cols2: any[];


  constructor(private service: utilizadorService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.service.getUtilizadores().subscribe(
      response => { this.utilizadores = response; console.log(this.utilizadores); },
      error => console.log(error)
    )

  }

  //adicionarOP
  adicionaop() {
    this.displayDialog = true
  }
  //fechar popup adicionar operador
  cancel(){
    this.displayDialog = false;
  }

  //adiciona  operador
  save() {
    this.displayDialog = false;
    this.confirmationService.confirm({
      message: 'Pretende adicionar mais um Operador?',
      accept: () => {
        this.displayDialog = true;
      }
    });
  }


}
