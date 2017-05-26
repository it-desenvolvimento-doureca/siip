import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = '';
  count = 1;
  testUser = [{ username: '1233', name: 'Pedro', type: ["1", "2"] }, { username: '1234', name: 'Administrador', type: ["1", "2", "3"] }, { username: '1224', name: 'Ana', type: '2' }];
  edited = false;
  name = "";
  display: boolean = false;
  isHidden1: boolean = true;
  isHidden2: boolean = true;
  isHidden3: boolean = true;

  constructor(private router: Router) {
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
    for (var x in this.testUser) {
      if (this.operation === this.testUser[x].username) {
        this.edited = true;
        this.name = this.testUser[x].name;
        
        //guarda os dados do login
        localStorage.setItem('user', JSON.stringify({ username: this.testUser[x].username, name: this.testUser[x].name, type: this.testUser[x].type }));
        return true;
      } else {
        this.edited = false;
        this.name = "";
      }
    }
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
    var type = JSON.parse(localStorage.getItem('user'))["type"];
    if (type.length == 1) {
      this.router.navigate(['./nova-operacao']);
    } else {
      for (var i in type) {
        if (type[i] == '1') {
          this.isHidden1 = false;
        } else if (type[i] == '2') {
          this.isHidden2 = false;
        } else if (type[i] == '3') {
          this.isHidden3 = false;
        }
      }
      this.display = true;
    }
  }


  ngOnInit() {
  }

}
