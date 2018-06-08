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
  filtros = [];
  setlogin_pausa(var_login_pausa) {
    this.login_pausa = var_login_pausa;
  }

  getlogin_pausa() {
    return this.login_pausa;
  }

  setfiltros(var_item, filtro) {
    if (var_item == "sorttabela") {

      if (filtro = "limpar") {
        this.filtros[var_item] = [];
      } else {

        if (this.filtros[var_item]) {
          var index = this.filtros[var_item].findIndex(item => item.field == filtro[0].field);

          if (index != -1) {
            this.filtros[var_item].splice(index, 1)
            this.filtros[var_item].push({ field: filtro[0].field, order: filtro[0].order });
          } else {
            this.filtros[var_item].push({ field: filtro[0].field, order: filtro[0].order });
          }

        } else {
          this.filtros[var_item] = [];
          this.filtros[var_item].push({ field: filtro[0].field, order: filtro[0].order });
        }
      }

    } else {
      this.filtros[var_item] = filtro;
    }
  }

  getfiltros(var_item) {
    return this.filtros[var_item];
  }
  limpaFiltros() {
    this.filtros = [];
  }
}