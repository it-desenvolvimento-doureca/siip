import { Component, OnInit } from '@angular/core';
import { utilizadorService } from "app/utilizadorService";
import { Utilizador } from "app/modelos/entidades/utilizador";
import { ConfirmationService } from "primeng/primeng";

@Component({
  selector: 'app-operacao-em-curso',
  templateUrl: './operacao-em-curso.component.html',
  styleUrls: ['./operacao-em-curso.component.css']
})
export class OperacaoEmCursoComponent implements OnInit {
  displayDialog: boolean = false;
  utilizadores: Utilizador[] = null;
  cols2: any[];


  constructor(private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
   

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
  save(code_login) {
    this.displayDialog = false;
    console.log(code_login);
    this.confirmationService.confirm({
      message: 'Pretende adicionar mais um Operador?',
      accept: () => {
        this.displayDialog = true;
      }
    });
  }


}
