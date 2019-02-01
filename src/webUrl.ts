import { Injectable } from "@angular/core";

export var webUrl = {
  //host: 'http://192.168.30.119:8080/app-0.0.1-SNAPSHOT'
  // host: 'http://localhost:8080/app'
  //host: 'http://192.168.30.119:8080/app'
  //host: 'http://192.168.40.126:8080/app'
  host: location.protocol + '//' + location.host.replace('4200', '8080') + '/app'
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

      if (filtro == "limpar") {
        this.filtros[var_item] = [];
      } else {

        if (this.filtros[var_item]) {
          var index = this.filtros[var_item].findIndex(item => item.field == filtro.field);

          if (index != -1) {
            this.filtros[var_item].splice(index, 1)
            this.filtros[var_item].push({ field: filtro.field, order: filtro.order });
          } else {
            this.filtros[var_item].push({ field: filtro.field, order: filtro.order });
          }

        } else {
          this.filtros[var_item] = [];
          this.filtros[var_item].push({ field: filtro.field, order: filtro.order });
        }
      }

    } else {
      this.filtros[var_item] = filtro;
    }

    if (var_item == "pesquisa") {
      var pesquisa = {};
      for (var n in filtro) {
        if (filtro[n] != "" && filtro[n] != null) {

          if (n.match("date")) {
            pesquisa[n] = this.formatDate(filtro[n]);
          } else if (n == "ordenacao") {
            pesquisa[n] = [];

            for (var v in filtro[n]) {
              pesquisa[n].push(filtro[n][v]);
            }

          } else {
            pesquisa[n] = filtro[n];
          }

        }

      }
      localStorage["pesquisa_app"] = JSON.stringify(pesquisa);
    }


  }

  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }


  getfiltros(var_item) {
    if (var_item == "pesquisa") {
      this.filtros[var_item] = JSON.parse(localStorage.getItem("pesquisa_app"));
      return this.filtros[var_item];
    } else {
      return this.filtros[var_item];
    }
  }
  limpaFiltros() {
    this.filtros = [];
    localStorage.removeItem('pesquisa_app');
  }
}