import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  versao = "versão 1.0.1";
  modulo = "Gestão de Banhos Químicos";

  constructor(private router: Router) { }

  ishome(path) {
    var titlee = this.router.routerState.snapshot.url;
    titlee = titlee.slice(1);
    if (titlee == 'login') {

    }
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }
  isnome() {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem('user'))["name"];
    } else {
      return "";
    }
  }

  logout() {
    this.router.navigate(['./home']);
  }
}


