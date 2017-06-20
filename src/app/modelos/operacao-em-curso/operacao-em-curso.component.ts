import { Component, OnInit } from '@angular/core';
import { utilizadorService } from "app/utilizadorService";
import { Utilizador } from "app/modelos/entidades/utilizador";
import { ConfirmationService } from "primeng/primeng";
import { Router } from "@angular/router";
import { RPOFOPCABService } from "app/modelos/services/rp-of-op-cab.service";
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";
import { RP_OF_OP_CAB } from "app/modelos/entidades/RP_OF_OP_CAB";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { RPOFPARALINService } from "app/modelos/services/rp-of-para-lin.service";
import { RP_OF_PREP_LIN } from "app/modelos/entidades/RP_OF_PREP_LIN";
import { RPOFPREPLINService } from "app/modelos/services/rp-of-prep-lin.service";

@Component({
  selector: 'app-operacao-em-curso',
  templateUrl: './operacao-em-curso.component.html',
  styleUrls: ['./operacao-em-curso.component.css']
})
export class OperacaoEmCursoComponent implements OnInit {
  displayDialog: boolean = false;
  defeitos: any[] = null;
  cols2: any[];
  of_num = "";
  op_num = "";
  maq_num = "";
  id_utz = "";
  data_ini = "";
  hora_ini = "";
  data_fim = "";
  hora_fim = "";
  id_op_cab = "";

  constructor(private RPOFPREPLINService: RPOFPREPLINService, private RPOFPARALINService: RPOFPARALINService, private RPOFCABService: RPOFCABService, private RPOFOPLINService: RPOFOPLINService, private confirmationService: ConfirmationService, private router: Router, private RPOFOPCABService: RPOFOPCABService) {
  }

  ngOnInit() {
    //verifica se tem o id_of_cab
    if (localStorage.getItem('id_of_cab')) {
      //preencher campos
      var user = JSON.parse(localStorage.getItem('user'))["username"];
      this.RPOFOPCABService.getdataof(JSON.parse(localStorage.getItem('id_of_cab')), user).subscribe(
        response => {

          for (var x in response) {
            localStorage.setItem('id_op_cab', JSON.stringify(response[x][0].id_OP_CAB));
            this.of_num = response[x][1].of_NUM.trim()
            this.op_num = response[x][1].op_NUM.trim() + " - " + response[x][1].op_DES.trim();
            this.maq_num = response[x][1].maq_NUM.trim() + " - " + response[x][1].maq_DES.trim();
            this.id_utz = response[x][0].id_UTZ_CRIA.trim() + " - " + response[x][1].nome_UTZ_CRIA.trim();
            this.data_ini = response[x][0].data_INI;
            this.hora_ini = response[x][0].hora_INI;
            this.id_op_cab = response[x][0].id_OP_CAB;
            this.listadefeitos(response[x][0].id_OP_CAB);
          }
        },
        error => console.log(error));

    } else {
      this.router.navigate(['./home']);
    }



  }

  //adicionarOP
  adicionaop() {
    this.displayDialog = true
  }
  //fechar popup adicionar operador
  cancel() {
    this.displayDialog = false;
  }

  //adiciona  operador
  save(code_login) {
    this.displayDialog = false;
    var rpofop = new RP_OF_OP_CAB;
    /*
        rpofop.id_OF_CAB = id_OF_CAB;
        rpofop.data_INI = new Date();
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        rpofop.hora_INI = time;
        rpofop.id_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["username"];
        rpofop.nome_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["name"];
        rpofop.perfil_CRIA = JSON.parse(localStorage.getItem('perfil'));
        rpofop.estado = estado;
        this.RPOFOPCABService.create(rpofop).subscribe(
          res => {
            this.criatabelaRPOFOPLIN(res.id_OP_CAB, ref_select);
            if (estado == "P") {
              this.iniciapreparacao(res.id_OP_CAB);
            }
          },
          error => console.log(error));*/
    console.log(code_login);
    this.confirmationService.confirm({
      message: 'Pretende adicionar mais um Operador?',
      accept: () => {
        this.displayDialog = true;
      }
    });
  }

  //atualizar lista de defeitos
  listadefeitos(id_op_cab) {
    this.RPOFOPLINService.getRP_OF_OP_LINallid(id_op_cab).subscribe(
      res => {
        this.defeitos = [];
        for (var x in res) {
          var total = res[x].quant_BOAS_TOTAL + res[x].quant_DEF_TOTAL;
          this.defeitos.push({ ref_num: res[x].ref_NUM, ref_des: res[x].ref_DES, quant_of: res[x].quant_OF, quant_boas: res[x].quant_BOAS_TOTAL, quant_def_total: res[x].quant_DEF_TOTAL, quant_control: total });
        }
        this.defeitos = this.defeitos.slice();
      },
      error => console.log(error));
  }

  // ao clicar no botão concluir
  createfile() {

    var date = new Date();
    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    this.estados(this.id_op_cab, user, nome, date, time);

  }


  estados(id_op_cab, user, nome, date, time_fim) {

    var pausa_inicio = new Date();
    var total_pausa = pausa_inicio;
    var total_pausa_prep = pausa_inicio;
    var total_pausa_of = pausa_inicio;
    this.RPOFOPCABService.getbyid(id_op_cab).subscribe(result => {

      var rp_of_op_cab = new RP_OF_OP_CAB();
      rp_of_op_cab = result[0][0];

      //estado rp_of_cab
      var rp_of_cab = new RP_OF_CAB();
      rp_of_cab = result[0][1];
      rp_of_cab.id_UTZ_MODIF = user;
      rp_of_cab.nome_UTZ_MODIF = nome;
      rp_of_cab.data_HORA_MODIF = date;
      rp_of_cab.estado = "C"

      //tempo de Pausa
      this.RPOFPARALINService.getbyallID_OP_CAB(id_op_cab).subscribe(result1 => {
        var count = Object.keys(result1).length;
        var time_pausa = "0:0:0";
        var time_pausa_prep = "0:0:0";
        var time_pausa_of = "0:0:0";
        var timedif3 = 0;
        var timedif4 = 0;
        var timedif5 = 0;


        if (count > 0) {
          for (var x in result1) {
            if (result1[x].momento_PARAGEM == "E") {
              var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
              var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
              var timedif = new Date(Math.abs(hora1.getTime() - hora2.getTime()));
              total_pausa = new Date(Math.abs(timedif.getTime() + total_pausa.getTime()));
            }
            if (result1[x].momento_PARAGEM == "P") {
              var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
              var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
              var timedif1 = new Date(Math.abs(hora1.getTime() - hora2.getTime()));
              total_pausa_prep = new Date(Math.abs(timedif1.getTime() + total_pausa_prep.getTime()));
            }

            var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
            var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
            var timedif7 = new Date(Math.abs(hora1.getTime() - hora2.getTime()));
            total_pausa_of = new Date(Math.abs(timedif7.getTime() + total_pausa_of.getTime()));
          }

          var total_diff = new Date(Math.abs(total_pausa.getTime() - pausa_inicio.getTime()));
          var diffhour = total_diff.getHours();
          var diffminute = total_diff.getMinutes();
          var diffsecond = total_diff.getSeconds();

          var total_diff2 = new Date(Math.abs(total_pausa_prep.getTime() - pausa_inicio.getTime()));
          var diffhour2 = total_diff2.getHours();
          var diffminute2 = total_diff2.getMinutes();
          var diffsecond2 = total_diff2.getSeconds();

          var total_diff3 = new Date(Math.abs(total_pausa_of.getTime() - pausa_inicio.getTime()));
          var diffhour3 = total_diff3.getHours();
          var diffminute3 = total_diff3.getMinutes();
          var diffsecond3 = total_diff3.getSeconds();

          time_pausa_of = diffhour3 + ":" + diffminute3 + ":" + diffsecond3;
          time_pausa_prep = diffhour2 + ":" + diffminute2 + ":" + diffsecond2;
          time_pausa = diffhour + ":" + diffminute + ":" + diffsecond;

          var splitted_pausa = time_pausa_of.split(":", 3);
          timedif4 = parseInt(splitted_pausa[0]) * 36000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
        }

        var hora1 = new Date(result[0][0].data_INI + " " + result[0][0].hora_INI);
        var hora2 = new Date(date);
        //tempo da total of
        var timedif2 = Math.abs(hora2.getTime() - hora1.getTime());


        if (result[0][0].tempo_PREP_TOTAL != null) {
          var splitted_prep = result[0][0].tempo_PREP_TOTAL.split(":", 3);
          timedif3 = parseInt(splitted_prep[0]) * 36000 + parseInt(splitted_prep[1]) * 60000 + parseInt(splitted_prep[2]) * 1000;

        } else if (result[0][0].tempo_PARA_TOTAL != null) {

          var splitted_pausa_prep = time_pausa_prep.split(":", 3);
          timedif5 = parseInt(splitted_pausa_prep[0]) * 36000 + parseInt(splitted_pausa_prep[1]) * 60000 + parseInt(splitted_pausa_prep[2]) * 1000;
        }


        //se o estado for em preparação conclui a preparação e calcula tempo
        if (result[0][0].estado == "P") {

          var splitted_pausa = time_pausa_prep.split(":", 3);
          timedif5 = parseInt(splitted_pausa[0]) * 36000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

          //estado rp_of_prep_lin
          var rp_of_prep_lin = new RP_OF_PREP_LIN();
          this.RPOFPREPLINService.getbyid(id_op_cab).subscribe(resu => {

            var date1 = new Date(resu[0].data_INI + " " + resu[0].hora_INI);
            var date2 = new Date(date);
            timedif3 = Math.abs(date1.getTime() - date2.getTime());

            var time = new Date(Math.abs(date2.getTime() - date1.getTime()));
            var diffhour = time.getHours();
            var diffminute = time.getMinutes();
            var diffsecond = time.getSeconds();

            var time_prep = timedif3 - timedif5;
            var seconds1 = time_prep / 1000;
            var hours1 = seconds1 / 3600;
            seconds1 = seconds1 % 3600;
            var minutes1 = seconds1 / 60;
            seconds1 = seconds1 % 60;

            var tempo_prep = Math.floor(hours1) + ":" + Math.floor(minutes1) + ":" + Math.floor(seconds1);

            rp_of_prep_lin = resu[0];
            rp_of_prep_lin.estado = "C";
            rp_of_prep_lin.data_FIM = date;
            rp_of_prep_lin.hora_FIM = time_fim;
            rp_of_prep_lin.data_HORA_MODIF = date;
            rp_of_prep_lin.id_UTZ_MODIF = user;

            this.RPOFPREPLINService.update(rp_of_prep_lin);

            var tempo_total_execucao = "0:0:0";

            //estado rp_of_op_cab
            rp_of_op_cab.id_UTZ_MODIF = user;
            rp_of_op_cab.nome_UTZ_MODIF = nome;
            rp_of_op_cab.data_HORA_MODIF = date;
            rp_of_op_cab.tempo_PARA_TOTAL = time_pausa_prep;
            rp_of_op_cab.tempo_EXEC_TOTAL = tempo_total_execucao;
            rp_of_op_cab.perfil_MODIF = "O";
            rp_of_op_cab.estado = "C";
            rp_of_op_cab.data_FIM = date;
            rp_of_op_cab.hora_FIM = time_fim;
            rp_of_op_cab.tempo_PREP_TOTAL = tempo_prep;

            var date1 = new Date(result[0][0].data_INI + " " + result[0][0].hora_INI);
            var date2 = new Date(date);
            var timeDiff = new Date(Math.abs(date2.getTime() - date1.getTime()));

            this.RPOFCABService.update(rp_of_cab);
            this.RPOFOPCABService.update(rp_of_op_cab);

          }, error => console.log(error));
        } else {

          var tempo_excucao = timedif2 - timedif3 - timedif4;

          var seconds = tempo_excucao / 1000;
          var hours = seconds / 3600;
          seconds = seconds % 3600;
          var minutes = seconds / 60;
          seconds = seconds % 60;

          var tempo_total_execucao = Math.floor(hours) + ":" + Math.floor(minutes) + ":" + Math.floor(seconds)

          //estado rp_of_op_cab
          rp_of_op_cab.id_UTZ_MODIF = user;
          rp_of_op_cab.nome_UTZ_MODIF = nome;
          rp_of_op_cab.data_HORA_MODIF = date;
          rp_of_op_cab.tempo_PARA_TOTAL = time_pausa_of;
          rp_of_op_cab.tempo_EXEC_TOTAL = tempo_total_execucao;
          rp_of_op_cab.perfil_MODIF = "O";
          rp_of_op_cab.estado = "C";
          rp_of_op_cab.data_FIM = date;
          rp_of_op_cab.hora_FIM = time_fim;


          this.RPOFCABService.update(rp_of_cab);
          this.RPOFOPCABService.update(rp_of_op_cab);
        }

        this.router.navigate(['./home']);
      }, error => console.log(error));
    }, error => console.log(error));
  }

}
