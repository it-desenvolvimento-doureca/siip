import { Component, OnInit } from '@angular/core';
import { RPCONFUTZPERFService } from "app/modelos/services/rp-conf-utz-perf.service";
import { LoginComponent } from '../login/login.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagelogin2',
  templateUrl: './pagelogin.component.html',
  styleUrls: ['./pagelogin.component.css']
})
export class Pagelogin2Component implements OnInit {
  confirmationService: any;
  displayDialog: boolean;

  operation: string = '';
  count = 1;
  edited = false;
  name = "";
  display: boolean = false;
  loading: boolean;
  constructor(private service: RPCONFUTZPERFService, private emitter: LoginComponent, private route: ActivatedRoute,
    private router: Router) {

  }

  //adiciona número ao input de login
  append(element: string) {
    if (this.count <= 4) {
      this.operation += element;
      this.count++;
    }

    if (this.count > 3) {
      this.loading = true;
      setTimeout(() => {
        this.userexists();
      }, 1000);
    }

  }

  //verificar se utilizador existe
  userexists() {
    //apenas verifica se utilizador existe se o código for diferente do dele
    if (this.operation != JSON.parse(localStorage.getItem('user'))["username"]) {
      this.service.getbyid(this.operation).subscribe(
        response => {

          var count = Object.keys(response).length;
          //se existir uma of vai preencher combobox operações
          if (count > 0) {
            this.edited = true;
            this.name = response[0].nome_UTZ;
            this.loading = false;
            //guarda os dados do login
            return true;
          } else {
            this.edited = false;
            this.loading = false;
            this.name = "";
          }
        },
        error => { console.log(error); this.loading = true; });
    } else {
      this.loading = false;
    }

  }


  //Tecla de limpar número
  undo() {
    if (this.operation != '') {
      this.loading = false;
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

    this.emitter.save(this.operation, this.name);

    this.reset();
  }


  ngOnInit() {
  }

}
