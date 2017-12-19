import { Component, OnInit } from '@angular/core';
import { utilizadorService } from "app/utilizadorService";
import { Utilizador } from "app/modelos/entidades/utilizador";
import { ConfirmationService } from "primeng/primeng";
import { Router, ActivatedRoute } from "@angular/router";
import { RPOFOPCABService } from "app/modelos/services/rp-of-op-cab.service";
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";
import { RP_OF_OP_CAB } from "app/modelos/entidades/RP_OF_OP_CAB";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { RPOFPARALINService } from "app/modelos/services/rp-of-para-lin.service";
import { RP_OF_PREP_LIN } from "app/modelos/entidades/RP_OF_PREP_LIN";
import { RPOFPREPLINService } from "app/modelos/services/rp-of-prep-lin.service";
import { RP_OF_OP_FUNC } from "app/modelos/entidades/RP_OF_OP_FUNC";
import { RPOPFUNCService } from "app/modelos/services/rp-op-func.service";
import { ofService } from 'app/ofService';
import { GEREVENTOService } from 'app/modelos/services/ger-evento.service';
import { GER_EVENTO } from 'app/modelos/entidades/GER_EVENTO';

@Component({
  selector: 'app-operacao-em-curso',
  templateUrl: './operacao-em-curso.component.html',
  styleUrls: ['./operacao-em-curso.component.css']
})
export class OperacaoEmCursoComponent implements OnInit {
  texto_assunto: string;
  texto_mensagem: string;
  displaymensagem: boolean;
  versao_modif: any;
  id_utz_lider: string;
  utz_lider: any;
  utilizadores: any = [];
  disableEditar: boolean = true;
  permissao_editar: any;
  displayDialogLider: boolean = false;
  displayDialogutz_em_uso: boolean = false;
  disabledAdici: boolean;
  perfil: string;
  concluido: boolean = false;
  modoedicao: boolean = false;
  estado = [];
  count_id: any = 0;
  disabledRegisto: boolean;
  count: number;
  utilizador_insere = "";
  displayDialogutz: boolean = false;
  user: any;
  id_of_cab: any;
  id_op_cab_lista: any;
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
  estados_array = [{ label: "---", value: "" }, { label: "Anulado", value: "A" }, { label: "Execução", value: "E" }, { label: "Concluido", value: "C" }, { label: "Preparação", value: "P" }, { label: "Modificado", value: "M" }];
  estado_val = "";
  utilizadores_adici: any[] = [];

  constructor(private GEREVENTOService: GEREVENTOService, private ofService: ofService, private route: ActivatedRoute, private RPOPFUNCService: RPOPFUNCService, private RPOFPREPLINService: RPOFPREPLINService, private RPOFPARALINService: RPOFPARALINService, private RPOFCABService: RPOFCABService, private RPOFOPLINService: RPOFOPLINService, private confirmationService: ConfirmationService, private router: Router, private RPOFOPCABService: RPOFOPCABService) {
  }

  ngOnInit() {
    this.disabledAdici = false;
    this.perfil = localStorage.getItem('access');
    var access = JSON.parse(localStorage.getItem('access'));
    this.permissao_editar = access.find(item => item === "E");

    //verifica se tem o id_of_cab
    if (localStorage.getItem('id_of_cab')) {

      var url = this.router.routerState.snapshot.url;
      url = url.slice(1);
      var urlarray = url.split("/");
      if (urlarray.length > 1) {

        if (urlarray[1].match("edicao")) {
          this.disableEditar = false;
          this.preenchecombouUtz(localStorage.getItem('id_of_cab'))
        }
      }

      //preencher campos
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      if (id != 0) {
        this.modoedicao = true;
        this.user = id;
        this.estado.push('T')
      } else {
        this.user = JSON.parse(localStorage.getItem('user'))["username"];
        this.estado.push('C', 'A', 'M');
      }


      this.RPOFOPCABService.getdataof(JSON.parse(localStorage.getItem('id_of_cab')), this.user, this.estado).subscribe(
        response => {
          this.id_op_cab_lista = [];
          var count = 0;
          for (var x in response) {
            var comp = true;

            if (response[x][1].id_OF_CAB_ORIGEM == null) {
              if (response[x][1].id_UTZ_CRIA != this.user) this.disabledAdici = true;
              comp = false
              localStorage.setItem('id_op_cab', JSON.stringify(response[x][2].id_OP_CAB));
              this.of_num = response[x][1].of_NUM.trim()
              this.op_num = response[x][1].op_NUM.trim() + "/" + response[x][1].op_COD_ORIGEM + "/ " + response[x][1].op_DES.trim();
              this.maq_num = response[x][1].maq_NUM.trim() + " - " + response[x][1].maq_DES.trim();
              this.id_utz = response[x][0].id_UTZ_CRIA.trim() + " - " + response[x][0].nome_UTZ_CRIA.trim();
              this.id_utz_lider = response[x][0].id_UTZ_CRIA.trim();
              this.data_ini = response[x][0].data_INI_M2;
              this.hora_ini = response[x][0].hora_INI_M2;
              this.hora_fim = response[x][0].hora_FIM_M2;
              this.data_fim = response[x][0].data_FIM_M2;
              this.id_op_cab = response[x][2].id_OP_CAB;
              this.id_of_cab = response[x][1].id_OF_CAB;
              this.estado_val = response[x][0].estado;
              this.versao_modif = response[x][1].versao_MODIF;
              this.id_op_cab_lista.push({ id: response[x][2].id_OP_CAB, comp: false });
              if (response[x][0].data_FIM != null) {
                this.concluido = true;
              }
              if (!this.disableEditar && this.utilizadores.length > 0) this.utz_lider = this.utilizadores.find(item => item.value.id == this.id_utz_lider).value;
            } else {
              this.id_op_cab_lista.push({ id: response[x][2].id_OP_CAB, comp: true });
            }

            this.defeitos = [];
            this.listadefeitos(response[x][2].id_OP_CAB, comp, count);
            count++;
          }

          this.id_op_cab_lista = this.id_op_cab_lista.slice();

          this.verificar_operadores(this.id_of_cab);
        },
        error => console.log(error));

    } else {
      this.router.navigate(['./home']);
    }
  }

  //verifica os operadores que estão em execução nesta of
  verificar_operadores(id) {
    this.disabledRegisto = false;
    this.RPOPFUNCService.getUsersbyid_of_cab(id).subscribe(
      response => {
        this.count = Object.keys(response).length;
        if (this.count > 1) {
          this.disabledRegisto = true;
        }
        for (var x in response) {
          if (response[x].id_UTZ_CRIA != this.user) {
            this.utilizadores_adici.push({ label: response[x].nome_UTZ_CRIA, id: response[x].id_UTZ_CRIA });
          }
        }

      }, error => console.log(error));
  }

  preenchecombouUtz(id) {
    this.RPOPFUNCService.getallUsersbyid_of_cab(id).subscribe(
      response => {
        this.count = Object.keys(response).length;
        for (var x in response) {
          this.utilizadores.push({
            label: response[x].id_UTZ_CRIA + " - " + response[x].nome_UTZ_CRIA,
            value: { id_OP_FUNC: response[x].id_OP_FUNC, id: response[x].id_UTZ_CRIA, data_FIM: response[x].data_FIM_M2, hora_FIM: response[x].hora_FIM_M2, data_INI: response[x].data_INI_M2, hora_INI: response[x].hora_INI_M2 }
          });
        }
        this.utilizadores = this.utilizadores.slice();
        if (!this.disableEditar && this.id_utz_lider != null) this.utz_lider = this.utilizadores.find(item => item.value.id == this.id_utz_lider).value;

      }, error => console.log(error));
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
  save(code_login, nome) {

    this.RPOFOPCABService.listofcurrentof(code_login).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          if (this.utilizadores_adici.find(item => item.id == code_login) || code_login == this.user) {
            this.displayDialogutz = true;
            this.utilizador_insere = nome;
          } else {
            var user = JSON.parse(localStorage.getItem('user'))["username"];
            this.displayDialog = false;
            var rpofop = new RP_OF_OP_CAB;
            var rpofopfunc = new RP_OF_OP_FUNC;

            this.RPOFOPCABService.getdataof(JSON.parse(localStorage.getItem('id_of_cab')), user, this.estado).subscribe(
              response => {
                this.id_op_cab_lista = [];
                for (var x in response) {

                  rpofop.id_OF_CAB = response[x][1].id_OF_CAB;

                  this.RPOFOPCABService.create(rpofop).subscribe(
                    res => {

                      rpofopfunc.id_OP_CAB = res.id_OP_CAB;
                      rpofopfunc.data_INI = new Date();
                      rpofopfunc.data_INI_M1 = new Date();
                      rpofopfunc.data_INI_M2 = new Date();
                      var date = new Date();
                      var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                      rpofopfunc.hora_INI = time;
                      rpofopfunc.hora_INI_M1 = time;
                      rpofopfunc.hora_INI_M2 = time;
                      rpofopfunc.id_UTZ_CRIA = code_login;
                      rpofopfunc.nome_UTZ_CRIA = nome;
                      rpofopfunc.perfil_CRIA = "O";
                      rpofopfunc.estado = response[x][1].estado;
                      this.RPOPFUNCService.create(rpofopfunc).subscribe(
                        res => {
                        },
                        error => console.log(error));
                    },
                    error => console.log(error));


                }
                this.verificar_operadores(this.id_of_cab);
              },
              error => console.log(error));

            this.confirmationService.confirm({
              message: 'Pretende adicionar mais um Operador?',
              accept: () => {
                this.displayDialog = true;
              }, reject: () => {
                this.displayDialog = false;
                this.router.navigate(['./home']);
              }
            });
          }
        } else {
          this.displayDialogutz_em_uso = true;
          this.utilizador_insere = nome;
        }
      },
      error => console.log(error));
  }

  //atualizar lista de defeitos
  listadefeitos(id_op_cab, comp, count) {
    this.count_id++;
    var count = this.count_id;
    this.RPOFOPLINService.getRP_OF_OP_LINallid(id_op_cab).subscribe(
      res => {
        for (var x in res) {
          var total = res[x].quant_BOAS_TOTAL_M2 + res[x].quant_DEF_TOTAL_M2;
          var cor = "rgba(255, 255, 0, 0.78)";
          if (total == res[x].quant_OF) cor = "#2be32b";
          if (total > res[x].quant_OF) cor = "rgba(255, 0, 0, 0.68)";
          var tipo = "PF";
          if (comp) tipo = "C";
          this.defeitos.push({ tipo: tipo, id: count, ref_num: res[x].ref_NUM, cor: cor, ref_des: res[x].ref_DES, quant_of: res[x].quant_OF, quant_boas: res[x].quant_BOAS_TOTAL_M2, quant_def_total: res[x].quant_DEF_TOTAL_M2, quant_control: total, comp: comp });
        }
        this.defeitos = this.defeitos.slice();
        this.ordernar();
      },
      error => console.log(error));
  }

  ordernar() {
    this.defeitos.sort((n1, n2) => {
      if (n1.id > n2.id) {
        return 1;
      }

      if (n1.id < n2.id) {
        return -1;
      }

      return 0;
    });
  }


  // ao clicar no botão concluir
  createfile(estado, perfil) {
    var lider = true
    if (this.utilizadores_adici.length > 0) {
      if (this.disabledAdici) {
        lider = false;
      }
    } else {
      lider = false;
    }

    if (lider) {
      this.displayDialogLider = true;
    } else {

      var date = new Date();
      var user = JSON.parse(localStorage.getItem('user'))["username"];
      var nome = JSON.parse(localStorage.getItem('user'))["name"];
      var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      var num_count = 0;
      var total = this.id_op_cab_lista.length;
      for (var x in this.id_op_cab_lista) {
        num_count++;

        if (this.count > 1) {
          this.estados(this.id_op_cab_lista[x].id, user, nome, date, time, this.id_op_cab_lista[x].comp, false, num_count, total, estado, perfil, this.id_op_cab);
        } else {
          this.estados(this.id_op_cab_lista[x].id, user, nome, date, time, this.id_op_cab_lista[x].comp, true, num_count, total, estado, perfil, this.id_op_cab);
        }
      }
    }
  }

  //alterar estados
  estados(id_op_cab, user, nome, date, time_fim, comp, utz_count, num_count, total, estado, perfil, id_op_cab2) {

    var pausa_inicio = new Date();
    var total_pausa = 0;
    var total_pausa_prep = 0;
    var total_pausa_of = 0;

    this.RPOFOPCABService.getbyid(id_op_cab, id_op_cab2).subscribe(result => {

      var rp_of_op_cab = new RP_OF_OP_CAB();
      var rp_of_op_func = new RP_OF_OP_FUNC();
      rp_of_op_cab = result[0][0];
      rp_of_op_func = result[0][2];
      //estado rp_of_cab
      var rp_of_cab = new RP_OF_CAB();
      rp_of_cab = result[0][1];
      rp_of_cab.id_UTZ_MODIF = user;
      rp_of_cab.nome_UTZ_MODIF = nome;
      rp_of_cab.data_HORA_MODIF = date;
      rp_of_cab.estado = estado;
      if (estado == "M") rp_of_cab.versao_MODIF = (this.versao_modif + 1);

      //tempo de Pausa
      this.RPOFPARALINService.getbyallID_OP_CAB(id_op_cab).subscribe(result1 => {
        var count = Object.keys(result1).length;
        var time_pausa = "0:0:0";
        var time_pausa_prep = "0:0:0";
        var time_pausa_of = "0:0:0";
        var timedif3 = 0;
        var timedif4 = 0;
        var timedif5 = 0;
        var soma_pausa = 0;


        if (count > 0) {
          for (var x in result1) {
            if (result1[x].momento_PARAGEM == "E") {
              var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
              var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
              var timedif = this.timediff(hora1.getTime(), hora2.getTime())
              var splitted_pausa = timedif.split(":", 3);
              total_pausa += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
            }
            if (result1[x].momento_PARAGEM == "P") {
              var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
              var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
              var timedif1 = this.timediff(hora1.getTime(), hora2.getTime())
              var splitted_pausa = timedif1.split(":", 3);
              total_pausa_prep += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
            }

            var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
            var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
            var timep = this.timediff(hora1.getTime(), hora2.getTime())

            var splitted_pausa = timep.split(":", 3);
            soma_pausa += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
          }

          time_pausa_of = this.gettime(soma_pausa);
          time_pausa_prep = this.gettime(total_pausa_prep);
          time_pausa = this.gettime(total_pausa);

          var splitted_pausa = time_pausa_of.split(":", 3);
          timedif4 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
        }
        var hora1 = new Date(result[0][2].data_INI_M2 + " " + result[0][2].hora_INI_M2);
        var hora2 = new Date(date);
        if (estado == "M") hora2 = new Date(result[0][2].data_FIM_M2 + " " + result[0][2].hora_FIM_M2);
        //tempo da total of
        var timedif2 = Math.abs(hora2.getTime() - hora1.getTime());


        if (result[0][0].tempo_PREP_TOTAL != null) {
          var splitted_prep = result[0][0].tempo_PREP_TOTAL.split(":", 3);
          timedif3 = parseInt(splitted_prep[0]) * 3600000 + parseInt(splitted_prep[1]) * 60000 + parseInt(splitted_prep[2]) * 1000;

        } else if (result[0][0].tempo_PARA_TOTAL != null) {

          var splitted_pausa_prep = time_pausa_prep.split(":", 3);
          timedif5 = parseInt(splitted_pausa_prep[0]) * 3600000 + parseInt(splitted_pausa_prep[1]) * 60000 + parseInt(splitted_pausa_prep[2]) * 1000;
        }

        if (result[0][0].tempo_PARA_TOTAL != null) {
          rp_of_op_cab.tempo_PARA_TOTAL = "0:0:0";

          rp_of_op_cab.tempo_PARA_TOTAL_M1 = "0:0:0";
          rp_of_op_cab.tempo_PARA_TOTAL_M2 = "0:0:0";
        }

        //se o estado for em preparação conclui a preparação e calcula tempo
        if (result[0][2].estado == "P") {

          var splitted_pausa = time_pausa_prep.split(":", 3);
          timedif5 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

          //estado rp_of_prep_lin
          var rp_of_prep_lin = new RP_OF_PREP_LIN();
          this.RPOFPREPLINService.getbyid(id_op_cab).subscribe(resu => {

            var date1 = new Date(resu[0].data_INI + " " + resu[0].hora_INI);
            var date2 = new Date(date);
            var timedif1 = this.timediff(hora1.getTime(), hora2.getTime());
            var splitted_pausa = timedif1.split(":", 3);
            timedif3 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

            var time_prep = timedif3 - timedif5;

            var tempo_prep = this.gettime(time_prep);

            rp_of_prep_lin = resu[0];
            rp_of_prep_lin.estado = estado;
            rp_of_prep_lin.data_FIM = date;
            rp_of_prep_lin.hora_FIM = time_fim;
            rp_of_prep_lin.data_HORA_MODIF = date;
            rp_of_prep_lin.id_UTZ_MODIF = user;

            this.RPOFPREPLINService.update(rp_of_prep_lin);

            var tempo_total_execucao = "0:0:0";

            //estado rp_of_op_cab

            rp_of_op_cab.tempo_PREP_TOTAL = tempo_prep;
            rp_of_op_cab.tempo_PARA_TOTAL = time_pausa_prep;
            rp_of_op_cab.tempo_EXEC_TOTAL = tempo_total_execucao;


            rp_of_op_cab.tempo_PREP_TOTAL_M1 = tempo_prep;
            rp_of_op_cab.tempo_PARA_TOTAL_M1 = time_pausa_prep;
            rp_of_op_cab.tempo_EXEC_TOTAL_M1 = tempo_total_execucao;
            rp_of_op_cab.tempo_PREP_TOTAL_M2 = tempo_prep;
            rp_of_op_cab.tempo_PARA_TOTAL_M2 = time_pausa_prep;
            rp_of_op_cab.tempo_EXEC_TOTAL_M2 = tempo_total_execucao;


            rp_of_op_func.id_UTZ_MODIF = user;
            rp_of_op_func.nome_UTZ_MODIF = nome;
            rp_of_op_func.data_HORA_MODIF = date;
            rp_of_op_func.perfil_MODIF = perfil;

            if (estado != "M") {
              rp_of_op_func.estado = estado;
              rp_of_op_func.data_FIM = date;
              rp_of_op_func.hora_FIM = time_fim;

              rp_of_op_func.data_FIM_M1 = date;
              rp_of_op_func.hora_FIM_M1 = time_fim;
              rp_of_op_func.data_FIM_M2 = date;
              rp_of_op_func.hora_FIM_M2 = time_fim;
            }



            if (utz_count) this.RPOFCABService.update(rp_of_cab);
            this.RPOPFUNCService.update(rp_of_op_func);

            if (!comp) this.RPOFOPCABService.update(rp_of_op_cab);
          }, error => console.log(error));
        } else {

          var tempo_excucao = timedif2 - timedif3 - timedif4;


          var tempo_total_execucao = this.gettime(tempo_excucao)

          //estado rp_of_op_cab

          if (estado != "M") {
            rp_of_op_cab.tempo_PARA_TOTAL = time_pausa_of;
            rp_of_op_cab.tempo_EXEC_TOTAL = tempo_total_execucao;

            rp_of_op_cab.tempo_PARA_TOTAL_M1 = time_pausa_of;
            rp_of_op_cab.tempo_EXEC_TOTAL_M1 = tempo_total_execucao;
            rp_of_op_cab.tempo_PARA_TOTAL_M2 = time_pausa_of;
            rp_of_op_cab.tempo_EXEC_TOTAL_M2 = tempo_total_execucao;
          } else {
            rp_of_op_cab.tempo_PARA_TOTAL_M1 = rp_of_op_cab.tempo_PARA_TOTAL_M2;
            rp_of_op_cab.tempo_EXEC_TOTAL_M1 = rp_of_op_cab.tempo_EXEC_TOTAL_M2;
            rp_of_op_cab.tempo_PARA_TOTAL_M2 = time_pausa_of;
            rp_of_op_cab.tempo_EXEC_TOTAL_M2 = tempo_total_execucao;
          }


          rp_of_op_func.id_UTZ_MODIF = user;
          rp_of_op_func.nome_UTZ_MODIF = nome;
          rp_of_op_func.data_HORA_MODIF = date;
          rp_of_op_func.perfil_MODIF = perfil;
          rp_of_op_func.estado = estado;

          if (estado != "M") {
            rp_of_op_func.data_FIM = date;
            rp_of_op_func.hora_FIM = time_fim;
            rp_of_op_func.data_FIM_M1 = date;
            rp_of_op_func.hora_FIM_M1 = time_fim;
            rp_of_op_func.data_FIM_M2 = date;
            rp_of_op_func.hora_FIM_M2 = time_fim;
          }

          if (utz_count) this.RPOFCABService.update(rp_of_cab);
          if (!comp) this.RPOFOPCABService.update(rp_of_op_cab);
          this.RPOPFUNCService.update(rp_of_op_func);

        }
        if (num_count == total && this.id_utz_lider == this.user) this.ficheiroteste(estado);
        if (this.disableEditar) {
          this.router.navigate(['./home']);
        } else {
          this.editar();
        }

      }, error => console.log(error));
    }, error => console.log(error));
  }

  //ver diferenças entre datas
  timediff(timeStart, timeEnd) {
    var hourDiff = timeEnd - timeStart; //in ms
    var hours = Math.floor(hourDiff / 3.6e6);
    var minutes = Math.floor((hourDiff % 3.6e6) / 6e4);
    var seconds = Math.floor((hourDiff % 6e4) / 1000);
    return hours + ":" + minutes + ":" + seconds;
  }

  //devolve tempo
  gettime(time_prep) {
    var hourDiff = time_prep; //in ms
    var hours = Math.floor(hourDiff / 3.6e6);
    var minutes = Math.floor((hourDiff % 3.6e6) / 6e4);
    var seconds = Math.floor((hourDiff % 6e4) / 1000);
    return this.pad(hours, 2) + ":" + this.pad(minutes, 2) + ":" + this.pad(seconds, 2);
  }

  pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  }

  //botãocancelar
  cancelar() {
    if (this.modoedicao) {
      this.router.navigate(['./controlo']);
    } else {
      this.router.navigate(['./home']);
    }
  }

  mensagem() {
    this.texto_mensagem = "";
    this.texto_assunto = "";
    this.displaymensagem = true;
  }


  gravarmensagem() {
    var userid = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var evento = new GER_EVENTO;

    evento.campo_ORIGEM = "ID_OF_CAB";
    evento.mensagem = this.texto_mensagem;
    evento.assunto = this.texto_assunto;
    evento.id_UTZ_CRIA = userid;
    evento.nome_UTZ_CRIA = nome;
    evento.data_HORA_CRIA = new Date();
    evento.modulo = 2;
    evento.id_ORIGEM = this.id_of_cab;
    evento.estado = "C";
    this.GEREVENTOService.create(evento).subscribe(result => {
      this.displaymensagem = false;
    }, error => console.log(error));

  }

  ficheiroteste(estado) {
    this.ofService.criaficheiro(this.id_of_cab, estado).subscribe(resu => {
      //alert("FICHEIRO CRIADO")
    }, error => {
      //alert("ERRO CRIAR FICHEIRO");
      console.log(error)
    });
  }


  lookupRowStyleClass(rowData) {
    return !rowData.comp ? 'disabled-account-row' : '';
  }

  editar() {
    if (this.disableEditar) {
      this.router.navigate(['./operacao-em-curso/edicao'], { queryParams: { id: this.user, v: this.versao_modif } });
    } else {
      this.router.navigate(['./operacao-em-curso'], { queryParams: { id: this.user } });
    }
  }

  editarquantidades() {
    if (this.modoedicao) {
      if (!this.disableEditar) {
        this.router.navigate(['./registo-quantidades/edicao'], { queryParams: { id: this.user, v: this.versao_modif } });
      } else {
        this.router.navigate(['./registo-quantidades'], { queryParams: { id: this.user } });
      }
    } else {
      this.router.navigate(['./registo-quantidades']);
    }

  }

  atualizaDados(event) {
    this.data_ini = event.value.data_INI;
    this.hora_ini = event.value.hora_INI;
    this.hora_fim = event.value.hora_FIM;
    this.data_fim = event.value.data_FIM;
  }


  atualizartempofunc(campo) {
    var utz = this.utilizadores.find(item => item.value.id == this.utz_lider.id).value;
    switch (campo) {
      case "data_ini":
        utz.data_INI = this.data_ini;
        break;
      case "hora_ini":
        utz.hora_INI = this.hora_ini + ":00";
        break;
      case "data_fim":
        utz.data_FIM = this.data_fim;
        break;
      case "hora_fim":
        utz.hora_FIM = this.hora_fim + ":00";
        break;
    }
  }

  gravar() {
    this.confirmationService.confirm({
      message: 'Tem a Certeza que pretende Gravar?',
      accept: () => {
        var total = this.utilizadores.length;
        var count = 0;
        for (var x in this.utilizadores) {
          count++;
          this.atualizarFUNC(this.utilizadores[x].value, total, count);
        }
      }
    });
  }

  atualizarFUNC(user, total, count) {
    var userid = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    this.RPOPFUNCService.getUser(user.id_OP_FUNC).subscribe(
      response => {
        var rpfunc = new RP_OF_OP_FUNC;
        for (var x in response) {
          rpfunc = response[0];
          if (response[0].data_FIM == null) {
            rpfunc.data_FIM_M1 = user.data_FIM;
            rpfunc.hora_FIM_M1 = user.hora_FIM;

            rpfunc.data_FIM = user.data_FIM;
            rpfunc.hora_FIM = user.hora_FIM;
          } else {
            rpfunc.data_INI_M1 = rpfunc.data_INI_M2
            rpfunc.hora_INI_M1 = rpfunc.hora_INI_M2;
            rpfunc.data_FIM_M1 = rpfunc.data_FIM_M2
            rpfunc.hora_FIM_M1 = rpfunc.hora_FIM_M2
          }
          rpfunc.data_INI_M2 = user.data_INI;
          rpfunc.hora_INI_M2 = user.hora_INI;
          rpfunc.data_FIM_M2 = user.data_FIM;
          rpfunc.hora_FIM_M2 = user.hora_FIM;
          rpfunc.id_UTZ_MODIF = userid;
          rpfunc.nome_UTZ_MODIF = nome;
          rpfunc.perfil_MODIF = "E";
          rpfunc.data_HORA_MODIF = new Date();
          rpfunc.estado = "M"
        }

        this.RPOPFUNCService.update(rpfunc).then(res => {
          if (total == count) {
            this.createfile("M", "E");
          }
        });

      }, error => console.log(error));
  }

  eliminar() {
    this.confirmationService.confirm({
      message: 'Tem a Certeza que pretende Eliminar?',
      accept: () => {
        var user = JSON.parse(localStorage.getItem('user'))["username"];
        var nome = JSON.parse(localStorage.getItem('user'))["name"];
        var data = new Date();
        var dados = [{ VERSAO_MODIF: (this.versao_modif + 1), ID_OF_CAB: this.id_of_cab, ID_UTZ_MODIF: user, ESTADO: "A", DATA_HORA_MODIF: data, PERFIL_MODIF: 'E', NOME_UTZ_MODIF: nome }];
        this.RPOFCABService.updateEstados(dados).subscribe(res => {
          window.location.reload();
        });
      }
    });
  }
}
