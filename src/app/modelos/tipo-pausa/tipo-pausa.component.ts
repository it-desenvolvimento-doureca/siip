import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ofService } from "app/ofService";
import { RPOFOPCABService } from "app/modelos/services/rp-of-op-cab.service";
import { RPOFPARALINService } from "app/modelos/services/rp-of-para-lin.service";
import { RP_OF_PARA_LIN } from "app/modelos/entidades/RP_OF_PARA_LIN";
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { RP_OF_OP_CAB } from "app/modelos/entidades/RP_OF_OP_CAB";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { Router } from "@angular/router";
import { RPOPFUNCService } from "app/modelos/services/rp-op-func.service";
import { RP_OF_OP_FUNC } from "app/modelos/entidades/RP_OF_OP_FUNC";
import { AppGlobals } from 'webUrl';

@Component({
  selector: 'app-tipo-pausa',
  templateUrl: './tipo-pausa.component.html',
  styleUrls: ['./tipo-pausa.component.css']
})
export class TipoPausaComponent implements OnInit {
  estado: any = [];
  pausas: any[];
  display_alerta: boolean;
  mensagem_alerta: string;
  pausasANTIGAS: any[];
  constructor(private AppGlobals: AppGlobals, private RPOPFUNCService: RPOPFUNCService, private router: Router, private RPOFCABService: RPOFCABService, private confirmationService: ConfirmationService, private RPOFPARALINService: RPOFPARALINService, private RPOFOPCABService: RPOFOPCABService, private _location: Location, private service: ofService) { }

  ngOnInit() {
    this.pausas = [];
    this.pausasANTIGAS = [];

    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var id_of = JSON.parse(localStorage.getItem('id_of_cab'));
    this.RPOFPARALINService.getbyallUSERIDOFCAB(id_of, user).subscribe(result => {

      var total = Object.keys(result).length;
      if (total > 0) {
        for (var x in result) {
          this.pausasANTIGAS.push(result[x]);
        }
        this.carregaPAUSAS()
      } else {
        this.carregaPAUSAS()
      }
    },
      error => { console.log(error); this.carregaPAUSAS() });
  }


  carregaPAUSAS() {
    this.service.getTipoFalta().subscribe(
      response => {
        for (var x in response) {
          var disabled_pausa = false;
          if (this.pausasANTIGAS.find(item => item == response[x].ARRCOD)) { disabled_pausa = true; }

          this.pausas.push({ design: response[x].arrlib, id: response[x].ARRCOD, disabled_pausa: disabled_pausa });
        }
        this.pausas = this.pausas.slice();
      },
      error => console.log(error));
  }

  pausa(item, design) {

    this.confirmationService.confirm({
      message: 'Confirma a entrada em pausa devido a ' + design + '?',
      accept: () => {

        this.AppGlobals.setlogin_pausa(false);
        var date = new Date();
        var user = JSON.parse(localStorage.getItem('user'))["username"];
        var nome = JSON.parse(localStorage.getItem('user'))["name"];
        var id_of = JSON.parse(localStorage.getItem('id_of_cab'));
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        //this.estado.push('T');
        this.estado.push('C', 'A', 'M');
        this.RPOFOPCABService.getdataof(id_of, user, this.estado).subscribe(result => {

          var x = '0';
          for (var y in result) {
            if (result[y][2].id_OP_CAB == JSON.parse(localStorage.getItem('id_op_cab'))) {
              x = y;
            }
          }
          if (result[x][0].estado != "S" && result[x][0].estado != "C" && result[x][0].estado != "A") {

            var id_op_cab = result[x][2].id_OP_CAB;
            var rp_of_para_lin = new RP_OF_PARA_LIN();
            rp_of_para_lin.data_INI = new Date(this.formatDate(date));
            rp_of_para_lin.hora_INI = time;

            rp_of_para_lin.data_INI_M1 = new Date(this.formatDate(date));
            rp_of_para_lin.hora_INI_M1 = time;

            rp_of_para_lin.data_INI_M2 = new Date(this.formatDate(date));
            rp_of_para_lin.hora_INI_M2 = time;

            rp_of_para_lin.id_UTZ_CRIA = user;
            rp_of_para_lin.id_OP_CAB = id_op_cab;
            rp_of_para_lin.tipo_PARAGEM = item;
            rp_of_para_lin.tipo_PARAGEM_M1 = item;
            rp_of_para_lin.tipo_PARAGEM_M2 = item;
            rp_of_para_lin.des_PARAGEM = design;
            rp_of_para_lin.des_PARAGEM_M1 = design;
            rp_of_para_lin.des_PARAGEM_M2 = design;
            rp_of_para_lin.momento_PARAGEM = result[x][0].estado;
            rp_of_para_lin.momento_PARAGEM_M1 = result[x][0].estado;
            rp_of_para_lin.momento_PARAGEM_M2 = result[x][0].estado;
            rp_of_para_lin.estado = "S";
            
            this.RPOFPARALINService.create(rp_of_para_lin).subscribe(
              res => {
                for (var x in result) {
                  this.estados(result[x][1], user, nome, date);

                  if (result[x][1].id_OF_CAB_ORIGEM == null) {
                    this.estadofuncionario(result[x][2].id_OP_CAB, user, nome, date);
                  }

                }

              },
              error => console.log(error));
          } else if (result[x][0].estado == "C") {

            this.mensagem_alerta = "Não é possível entrar em pausa, o utilizador atual já concluiu o Trabalho!";
            this.display_alerta = true;
          } else {
            //se o utilizador já se encontrar em pausa
            this.mensagem_alerta = "Não é possível entrar em pausa, o utilizador atual já se encontra em Pausa!";
            this.display_alerta = true;
          }

        }, error => console.log(error));

      }
    });
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

  backClicked() {
    this._location.back();

  }

  estadofuncionario(id_op_cab, user, nome, date) {
    //estado rp_of_op_func
    this.RPOPFUNCService.getbyid(id_op_cab, user).subscribe(result => {
      var rpfunc = new RP_OF_OP_FUNC();
      rpfunc = result[0][0];
      rpfunc.id_UTZ_MODIF = user;
      rpfunc.nome_UTZ_MODIF = nome;
      rpfunc.data_HORA_MODIF = date;
      rpfunc.perfil_MODIF = "O";
      rpfunc.estado = "S";

      this.RPOPFUNCService.update(rpfunc);
    }, error => console.log(error));
  }

  estados(result, user, nome, date) {

    //estado rp_of_cab
    var rp_of_cab = new RP_OF_CAB();
    rp_of_cab = result;
    rp_of_cab.id_UTZ_MODIF = user;
    rp_of_cab.nome_UTZ_MODIF = nome;
    rp_of_cab.data_HORA_MODIF = date;
    rp_of_cab.estado = "S"

    this.RPOFCABService.update(rp_of_cab);

    this.router.navigate(['./home']);

  }
}
