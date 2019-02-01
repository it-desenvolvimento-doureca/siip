import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ofService } from './ofService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  versao = "versão 1.0.1";
  modulo = "Gestão de Registos de Produção";
  semInternet: boolean;
  mostraerro: any = false;
  textoERRO: string;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (localStorage.getItem('time_siip')) {
      var data_storage = new Date(JSON.parse(localStorage.getItem('time_siip'))["data"]).getTime();
      if ((data_storage + 14400000) <= new Date().getTime()) {
        this.time();
      } else {
        localStorage.setItem('time_siip', JSON.stringify({ data: new Date() }));
      }
    }
  }

  constructor(private router: Router, private service: ofService) {
    this.semInternet = false;
    this.onlineCheck();

    setInterval(() => {
      this.onlineCheck();
    }, 2000);

    setInterval(() => {
      this.time();
    }, 14400000);
  }

  onlineCheck() {
    this.textoERRO = "";
    this.service.testeligacao().subscribe(
      response => {

        if (navigator.onLine) {
          this.semInternet = false;
        } else {
          this.semInternet = true;
        }

      },
      error => {
        if (!this.mostraerro) { console.log(error); this.mostraerro = true }
        this.semInternet = true;

        if (error.status == 0) {
          this.semInternet = true;
        } else {

          if (navigator.onLine) {
            this.textoERRO = "Servidor não Responde. Aguarde, por favor...";
            // this.semInternet = false;
          } else {
            this.semInternet = true;
          }
        }

      });

  }

  time() {
    if (localStorage.getItem('time_siip')) {
      var data_storage = new Date(JSON.parse(localStorage.getItem('time_siip'))["data"]).getTime();
      if ((data_storage + 14400000) <= new Date().getTime()) {
        this.logout();
      }
    }
  }

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


