import { Injectable } from "@angular/core";

export var webUrl = {
  //host: 'http://192.168.30.119:8080/app-0.0.1-SNAPSHOT'
 // host: 'http://localhost:8080/app'
  //host: 'http://192.168.30.119:8080/app'
  host: 'http://192.168.40.126:8080/app'  
  //host: 'http://192.168.40.101:8080/app'
}


@Injectable()
export class AppGlobals {
  login_pausa = false;

  setlogin_pausa(var_login_pausa) {
    this.login_pausa = var_login_pausa;
  }

  getlogin_pausa() {
    return this.login_pausa;
  }
}