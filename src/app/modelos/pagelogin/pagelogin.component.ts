import { Component, OnInit } from '@angular/core';
import { OperacaoEmCursoComponent } from "app/modelos/operacao-em-curso/operacao-em-curso.component";
import { RPCONFUTZPERFService } from "app/modelos/services/rp-conf-utz-perf.service";

@Component({
  selector: 'app-pagelogin',
  templateUrl: './pagelogin.component.html',
  styleUrls: ['./pagelogin.component.css']
})
export class PageloginComponent implements OnInit {
  confirmationService: any;
  displayDialog: boolean;

  operation: string = '';
  count = 1;
  testUser = [{ username: '1233', name: 'Pedro', type: ["1", "2"] }, { username: '1234', name: 'Administrador', type: ["1", "2", "3"] }, { username: '1224', name: 'Ana', type: '2' }];
  edited = false;
  name = "";
  display: boolean = false;
  isHidden1: boolean = true;
  isHidden2: boolean = true;
  isHidden3: boolean = true;

  constructor(private service: RPCONFUTZPERFService, private emitter: OperacaoEmCursoComponent) {

  }

  //adiciona número ao input de login
  append(element: string) {
    if (this.count <= 4) {
      this.operation += element;
      this.count++;
    }

    if (this.count > 3) {
      this.userexists();
    }

  }

  //verificar se utilizador existe
  userexists() {
    this.service.getbyid(this.operation).subscribe(
      response => {

        var count = Object.keys(response).length;
        //se existir uma of vai preencher combobox operações
        if (count > 0) {
          localStorage.setItem('user', JSON.stringify({ username: response[0].id_UTZ, name: response[0].nome_UTZ }));
          this.edited = true;
          this.name = response[0].nome_UTZ;

          //guarda os dados do login
          return true;
        } else {
          this.edited = false;
          this.name = "";
        }
      },
      error => console.log(error));
  }


  //Tecla de limpar número
  undo() {
    if (this.operation != '') {
      this.operation = this.operation.slice(0, -1);
      this.count--;
      if (this.count >= 3) {
        this.userexists();
      }
    }
  }

  //Limpar input 
  reset() {
    this.count = 1;
    this.edited = false;
    this.name = "";
    this.operation = "";
  }

  //adiciona  operador
  redirect() {
    this.emitter.save(this.operation);
    this.reset();
  }


  ngOnInit() {
  }

}
