import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { utilizadorService } from "app/utilizadorService";
import { RPCONFUTZPERFService } from "app/modelos/services/rp-conf-utz-perf.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = '';
  count = 1;
  edited = false;
  name = "";
  display: boolean = false;
  display2: boolean = false;
  isHidden1: boolean = true;
  isHidden2: boolean = true;
  isHidden3: boolean = true;

  constructor(private router: Router, private service: utilizadorService, private service__utz: RPCONFUTZPERFService) {
    //limpar a sessão
    //localStorage.clear();
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

    this.service.searchuser(this.operation).subscribe(
      response => {

        var count = Object.keys(response).length;
        //se existir uma of vai preencher combobox operações
        if (count > 0) {
          localStorage.setItem('user', JSON.stringify({ username: response[0].RESCOD, name: response[0].RESDES }));
          this.edited = true;
          this.name = response[0].RESDES;

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

  //Limpar input de login
  reset() {
    this.count = 1;
    this.edited = false;
    this.name = "";
    this.operation = "";
  }

  //Se o utilizador clicar em sim, vai verificar o tipo de utilizador
  redirect() {
    this.isHidden1 = true;
    this.isHidden2 = true;
    this.isHidden3 = true;
    var dataacess: any[] = [];

    this.service__utz.getbyid(JSON.parse(localStorage.getItem('user'))["username"]).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 1) {
          for (var x in response) {
            dataacess.push(response[x].perfil);
            switch (response[x].perfil) {
              case "O":
                localStorage.setItem('perfil', JSON.stringify("O"));
                this.router.navigate(['./nova-operacao']);
                break;
              case "G":
                localStorage.setItem('perfil', JSON.stringify("G"));
                this.router.navigate(['./controlo']);
                break;
              case "A":
                localStorage.setItem('perfil', JSON.stringify("A"));
                this.adminlogin();
                break;
            }
          }
        } else if (count == 0) {
          alert("SEM ACESSO");
        } else {
          for (var x in response) {
            dataacess.push(response[x].perfil);
            switch (response[x].perfil) {
              case "O":
                this.isHidden1 = false;
                break;
              case "G":
                this.isHidden3 = false;
                break;
              case "A":
                this.isHidden2 = false;
                break;
            }
            this.display = true;
          }
        }

        localStorage.setItem('access', JSON.stringify(dataacess));

      },
      error => console.log(error));
  }

  //popupadministratoa
  adminlogin() {
    this.display = false;
    this.display2 = true;
    localStorage.setItem('perfil', JSON.stringify("A"));
  }

  //reencaminha para nova operação
  novaoperacao() {
    localStorage.setItem('perfil', JSON.stringify("O"));
    this.router.navigate(['./nova-operacao']);
  }

  //reencaminha para controlo
  controlo() {
    localStorage.setItem('perfil', JSON.stringify("G"));
    this.router.navigate(['./controlo']);
  }
  ngOnInit() {
  }

}
