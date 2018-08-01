import { Component, OnInit } from '@angular/core';
import { utilizadorService } from "app/utilizadorService";
import { Utilizador } from "app/modelos/entidades/utilizador";
import { ConfirmationService, Message } from "primeng/primeng";
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
import { DomSanitizer } from '@angular/platform-browser';
import { RP_OF_PARA_LIN } from '../entidades/RP_OF_PARA_LIN';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';

@Component({
  selector: 'app-operacao-em-curso',
  templateUrl: './operacao-em-curso.component.html',
  styleUrls: ['./operacao-em-curso.component.css']
})
export class OperacaoEmCursoComponent implements OnInit {
  maq_numcod: any;
  permissao_ficheiroteste: any;
  pausas_array = [];
  displaypausas: boolean = false;
  displayalter: boolean;
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
  display_alerta_opnum = false;
  texto_alerta = "";
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
  id_op_cab_lista = [];
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
  data_ini_preparacao = "";
  hora_ini_preparacao = "";
  data_fim_preparacao = "";
  hora_fim_preparacao = "";
  id_op_cab = "";
  estados_array = [{ label: "---", value: "" }, { label: "Anulado", value: "A" }, { label: "Pausa", value: "S" }, { label: "Execução", value: "E" }, { label: "Concluido", value: "C" }, { label: "Preparação", value: "P" }, { label: "Modificado", value: "M" }, { label: "Em Edição", value: "R" }];
  estado_val = "";
  utilizadores_adici: any[] = [];
  fileURL: any;
  pausas_array_editar: any[];
  displayeditarpausas: boolean;
  estados_pausa: {}[];
  pausa_nomes: any[];
  pos: any;
  msgs: Message[] = [];
  displaygerarficheiros: boolean;
  progressBarDialog: boolean = false;
  datafim_utz_lider: any;
  dataini_utz_lider: Date;
  msgs2: Message[] = [];
  pausas_array_editar_temp: any;
  btdisabled: boolean = true;
  btdisabled2: boolean = true;
  preparacaonovo: boolean = false;
  terminadisabled: boolean;
  utz_edicao: any = null;
  btdisabled3: boolean;
  estado_INICIAL: any;
  verpausas: boolean = true;

  constructor(private service: ofService, private sanitizer: DomSanitizer, private GEREVENTOService: GEREVENTOService, private ofService: ofService, private route: ActivatedRoute, private RPOPFUNCService: RPOPFUNCService, private RPOFPREPLINService: RPOFPREPLINService, private RPOFPARALINService: RPOFPARALINService, private RPOFCABService: RPOFCABService, private RPOFOPLINService: RPOFOPLINService, private confirmationService: ConfirmationService, private router: Router, private RPOFOPCABService: RPOFOPCABService) {
  }

  ngOnInit() {
    this.disabledAdici = false;
    this.perfil = localStorage.getItem('access');
    var access = JSON.parse(localStorage.getItem('access'));
    this.permissao_editar = access.find(item => item === "E");
    this.permissao_ficheiroteste = access.find(item => item === "A");
    //verifica se tem o id_of_cab
    if (localStorage.getItem('id_of_cab')) {

      var url = this.router.routerState.snapshot.url;
      url = url.slice(1);
      var urlarray = url.split("/");
      if (urlarray.length > 1) {

        if (urlarray[1].match("edicao")) {
          this.disableEditar = false;
          // this.preenchecombouUtz(localStorage.getItem('id_of_cab'))
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

        if (id != JSON.parse(localStorage.getItem('user'))["username"]) {
          this.verpausas = false;
        }
      } else {
        this.user = JSON.parse(localStorage.getItem('user'))["username"];
        this.estado.push('C', 'A', 'M');
      }

      if (this.modoedicao) {
        this.preenchecombouUtz(localStorage.getItem('id_of_cab'))
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

              if (response[x][1].op_NUM != null) {
                this.op_num = response[x][1].op_NUM.trim() + "/" + response[x][1].op_COD_ORIGEM + "/ " + response[x][1].op_DES.trim();
              } else {
                this.op_num = "----/" + response[x][1].op_COD_ORIGEM + "/ " + response[x][1].op_DES.trim();
              }
              this.maq_num = response[x][1].maq_NUM.trim() + " - " + response[x][1].maq_DES.trim();
              this.maq_numcod = response[x][1].maq_NUM.trim();
              this.id_utz = response[x][0].id_UTZ_CRIA.trim() + " - " + response[x][0].nome_UTZ_CRIA.trim();
              this.id_utz_lider = response[x][1].id_UTZ_CRIA.trim();

              if (response[x][0].data_FIM_M2 != null) this.datafim_utz_lider = new Date(response[x][0].data_FIM_M2 + ' ' + response[x][0].hora_FIM_M2);
              if (response[x][0].data_INI_M2 != null) this.dataini_utz_lider = new Date(response[x][0].data_INI_M2 + ' ' + response[x][0].hora_INI_M2);

              this.data_ini = response[x][0].data_INI_M2;
              this.hora_ini = response[x][0].hora_INI_M2;
              this.hora_fim = response[x][0].hora_FIM_M2;
              this.data_fim = response[x][0].data_FIM_M2;

              this.data_ini_preparacao = response[x][3];
              this.hora_ini_preparacao = response[x][4];
              this.data_fim_preparacao = response[x][5];
              this.hora_fim_preparacao = response[x][6];
              if (response[x][3] == null && response[x][4] == null) {
                this.preparacaonovo = true;
              }
              if (response[x][1].id_UTZ_EDICAO != null) {
                this.utz_edicao = response[x][1].id_UTZ_EDICAO;
              }
              this.estado_INICIAL = response[x][1].estado_INICIAL;

              if (response[x][0].estado == "S" || response[x][0].estado == "P" || response[x][0].estado == "E") {
                this.modoedicao = false;
              }

              this.id_op_cab = response[x][2].id_OP_CAB;
              this.id_of_cab = response[x][1].id_OF_CAB;
              this.estado_val = response[x][0].estado;
              this.versao_modif = response[x][1].versao_MODIF;
              this.id_op_cab_lista.push({ id: response[x][2].id_OP_CAB, comp: false });
              if (response[x][0].data_FIM != null) {
                this.concluido = true;
              }
              if (this.utilizadores.length > 0) this.utz_lider = this.utilizadores.find(item => item.value.id == this.id_utz_lider).value;
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
      if (!this.disableEditar) this.verpausas = true;
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
            value: { id_OP_FUNC: response[x].id_OP_FUNC, id_OP_CAB: response[x].id_OP_CAB, id: response[x].id_UTZ_CRIA, data_FIM: response[x].data_FIM_M2, hora_FIM: response[x].hora_FIM_M2, data_INI: response[x].data_INI_M2, hora_INI: response[x].hora_INI_M2, estado: response[x].estado }
          });

        }

        this.utilizadores = this.utilizadores.slice();
        if (this.id_utz_lider != null) this.utz_lider = this.utilizadores.find(item => item.value.id == this.id_utz_lider).value;

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
          var total = res[x][0].quant_BOAS_TOTAL_M2 + res[x][0].quant_DEF_TOTAL_M2;
          var cor = "rgba(255, 255, 0, 0.78)";
          if (total == res[x][0].quant_OF) cor = "#2be32b";
          if (total > res[x][0].quant_OF) cor = "rgba(255, 0, 0, 0.68)";
          var tipo = "PF";
          if (res[x][1].id_OF_CAB_ORIGEM) { tipo = "C"; comp = true; };
          this.defeitos.push({ tipo: tipo, id: count, ref_num: res[x][0].ref_NUM, cor: cor, ref_des: res[x][0].ref_DES, quant_of: res[x][0].quant_OF, quant_boas: res[x][0].quant_BOAS_TOTAL_M2, quant_def_total: res[x][0].quant_DEF_TOTAL_M2, quant_control: total, comp: comp });
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

      //Confirmação

      this.confirmationService.confirm({
        message: 'Confirma que os dados foram validados? O trabalho será finalizado.',
        accept: () => {
          var date = new Date();
          var user = JSON.parse(localStorage.getItem('user'))["username"];
          var nome = JSON.parse(localStorage.getItem('user'))["name"];
          var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
          this.terminadisabled = true;
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
      });

    }
  }

  //alterar estados
  estados(id_op_cab, user, nome, date, time_fim, comp, utz_count, num_count, total, estado, perfil, id_op_cab2) {

    var pausa_inicio = new Date();
    var total_pausa = 0;
    var total_pausa_prep = 0;
    var total_pausa_of = 0;


    this.RPOFOPCABService.getbyid(id_op_cab, id_op_cab).subscribe(result => {

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
              var hora1 = new Date(result1[x].data_INI_M2 + " " + result1[x].hora_INI_M2);
              var hora2 = new Date(result1[x].data_FIM_M2 + " " + result1[x].hora_FIM_M2);
              var timedif = this.timediff(hora1.getTime(), hora2.getTime())
              var splitted_pausa = timedif.split(":", 3);
              total_pausa += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
            }
            if (result1[x].momento_PARAGEM == "P") {
              var hora1 = new Date(result1[x].data_INI_M2 + " " + result1[x].hora_INI_M2);
              var hora2 = new Date(result1[x].data_FIM_M2 + " " + result1[x].hora_FIM_M2);
              var timedif1 = this.timediff(hora1.getTime(), hora2.getTime())
              var splitted_pausa = timedif1.split(":", 3);
              total_pausa_prep += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
            }

            var hora1 = new Date(result1[x].data_INI_M2 + " " + result1[x].hora_INI_M2);
            var hora2 = new Date(result1[x].data_FIM_M2 + " " + result1[x].hora_FIM_M2);
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

        if (estado == "M" && this.data_fim_preparacao != null && this.data_ini_preparacao != null && id_op_cab2 == id_op_cab) {
          var splitted_pausa = time_pausa_prep.split(":", 3);
          timedif5 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

          //estado rp_of_prep_lin
          var rp_of_prep_lin = new RP_OF_PREP_LIN();
          this.RPOFPREPLINService.getbyid2(id_op_cab).subscribe(resu => {

            var date1 = new Date(resu[0].data_INI_M2 + " " + resu[0].hora_INI_M2);
            var date2 = new Date(resu[0].data_FIM_M2 + " " + resu[0].hora_FIM_M2);
            var timedif1 = this.timediff(date1.getTime(), date2.getTime());
            var splitted_pausa = timedif1.split(":", 3);
            timedif3 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

            var time_prep = timedif3 - timedif5;

            var tempo_prep = this.gettime(time_prep);

            rp_of_op_cab.tempo_PREP_TOTAL_M2 = tempo_prep;

            if (!comp) {
              this.RPOFOPCABService.update(rp_of_op_cab).then(res => {
                this.estados2(result, timedif3, time_pausa_prep, timedif5, id_op_cab, date, hora1, hora2, estado, time_fim, user, nome, perfil,
                  utz_count, comp, rp_of_op_cab, rp_of_op_func, rp_of_cab, timedif2, timedif4, time_pausa_of, num_count, total);
              });
            }
          }, error => console.log(error));
        } else {
          this.estados2(result, timedif3, time_pausa_prep, timedif5, id_op_cab, date, hora1, hora2, estado, time_fim, user, nome, perfil,
            utz_count, comp, rp_of_op_cab, rp_of_op_func, rp_of_cab, timedif2, timedif4, time_pausa_of, num_count, total)
        }


      }, error => console.log(error));
    }, error => console.log(error));
  }

  estados2(result, timedif3, time_pausa_prep, timedif5, id_op_cab, date, hora1, hora2, estado, time_fim, user, nome, perfil,
    utz_count, comp, rp_of_op_cab, rp_of_op_func, rp_of_cab, timedif2, timedif4, time_pausa_of, num_count, total) {

    if (result[0][0].tempo_PREP_TOTAL_M2 != null) {
      var splitted_prep = result[0][0].tempo_PREP_TOTAL_M2.split(":", 3);
      timedif3 = parseInt(splitted_prep[0]) * 3600000 + parseInt(splitted_prep[1]) * 60000 + parseInt(splitted_prep[2]) * 1000;

    } else if (result[0][0].tempo_PARA_TOTAL != null) {

      var splitted_pausa_prep = time_pausa_prep.split(":", 3);
      timedif5 = parseInt(splitted_pausa_prep[0]) * 3600000 + parseInt(splitted_pausa_prep[1]) * 60000 + parseInt(splitted_pausa_prep[2]) * 1000;
    }

    if (result[0][0].tempo_PARA_TOTAL != null) {
      /* rp_of_op_cab.tempo_PARA_TOTAL = "0:0:0";

       rp_of_op_cab.tempo_PARA_TOTAL_M1 = "0:0:0";
       rp_of_op_cab.tempo_PARA_TOTAL_M2 = "0:0:0";*/
    }

    //se o estado for em preparação conclui a preparação e calcula tempo
    if (result[0][2].estado == "P") {

      var splitted_pausa = time_pausa_prep.split(":", 3);
      timedif5 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

      //estado rp_of_prep_lin
      var rp_of_prep_lin = new RP_OF_PREP_LIN();
      this.RPOFPREPLINService.getbyid(id_op_cab).subscribe(resu => {

        var date1 = new Date(resu[0].data_INI_M2 + " " + resu[0].hora_INI_M2);
        var date2 = new Date(date);
        var timedif1 = this.timediff(date1.getTime(), date2.getTime());
        var splitted_pausa = timedif1.split(":", 3);
        timedif3 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

        var time_prep = timedif3 - timedif5;

        var tempo_prep = this.gettime(time_prep);

        rp_of_prep_lin = resu[0];
        rp_of_prep_lin.estado = estado;
        rp_of_prep_lin.data_FIM = date;
        rp_of_prep_lin.hora_FIM = time_fim;
        rp_of_prep_lin.data_FIM_M1 = date;
        rp_of_prep_lin.hora_FIM_M1 = time_fim;
        rp_of_prep_lin.data_FIM_M2 = date;
        rp_of_prep_lin.hora_FIM_M2 = time_fim;
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
          //rp_of_op_func.estado = "M";
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
        /*rp_of_op_cab.tempo_PARA_TOTAL = rp_of_op_cab.tempo_PARA_TOTAL;
        rp_of_op_cab.tempo_PARA_TOTAL_M1 = rp_of_op_cab.tempo_PARA_TOTAL_M2;
        rp_of_op_cab.tempo_EXEC_TOTAL_M1 = rp_of_op_cab.tempo_EXEC_TOTAL_M2;*/
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
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });

    if (this.modoedicao || id != 0) {
      this.router.navigate(['./controlo']);
    } else {
      this.router.navigate(['./home']);
    }
  }

  mensagem() {
    this.texto_mensagem = "";
    this.texto_assunto = "Alerta";
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
      this.verifica(this.of_num, this.texto_assunto, this.texto_mensagem, nome);
    }, error => console.log(error));

  }

  //verificar enventos
  verifica(of, assunto, mensagem, utilizador) {
    var dados = "{of:" + of + ",assunto:" + assunto + ",mensagem:" + mensagem + ",utilizador:" + utilizador + "}"
    var data = [{ MODULO: 4, MOMENTO: "Ao Criar Mensagem", PAGINA: "Execução", ESTADO: true, DADOS: dados }];

    this.GEREVENTOService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }

  ficheiroteste(estado, ficheiros = false, dialog = false) {

    if (dialog) {
      this.displaygerarficheiros = true;
    } else {
      if (this.displaygerarficheiros) { this.progressBarDialog = true; }
      this.ofService.criaficheiro(this.id_of_cab, estado, ficheiros).subscribe(resu => {

        if (this.displaygerarficheiros) {
          this.progressBarDialog = false;
          this.displaygerarficheiros = false;
        }
        if (ficheiros) {
          var a = document.createElement('a');
          a.href = URL.createObjectURL(resu);
          a.download = "ficherios_interface.zip";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }, error => {
        //alert("ERRO CRIAR FICHEIRO");
        //this.ficheiroteste(estado)
        console.log(error)
      });
    }
  }

  lookupRowStyleClass(rowData) {
    return !rowData.comp ? 'disabled-account-row' : '';
  }

  editar() {

    this.btdisabled = true;
    this.btdisabled2 = true;
    this.btdisabled3 = true;
    localStorage.setItem('siip_edicao', 'false');

    if (JSON.parse(localStorage.getItem('user'))["username"] != this.utz_edicao && this.estado_val == "R") {
      this.display_alerta_opnum = true;
      this.btdisabled = false;
      this.texto_alerta = "O Utilizador " + this.utz_edicao + " terá de terminar a edição primeiro."
    } else {
      if (this.disableEditar) {
        if (this.estado_val != "R") {
          this.display_alerta_opnum = true;
          this.texto_alerta = "Aguarde..."
          this.ofService.atualizaropenum(this.id_of_cab).subscribe(resu => {
            this.ofService.verificaopnum(this.id_of_cab).subscribe(result => {
              var countx = Object.keys(result).length;

              if (countx > 0) {
                if (result[0][2] != 0) {
                  this.display_alerta_opnum = true;
                  this.texto_alerta = "Valor de Origem para a PF não foi encontrado!"
                  this.btdisabled = false;
                  if (this.permissao_ficheiroteste) this.btdisabled2 = false;
                } else if (result[0][0] != result[0][1]) {
                  this.display_alerta_opnum = true;
                  this.btdisabled = false;
                  if (this.permissao_ficheiroteste) this.btdisabled2 = false;
                  this.texto_alerta = "Valor de Origem para o(s) Componente(s) não foi encontrado!"
                } else {
                  this.editarGoTo();
                }
              } else {
                this.editarGoTo();
              }


            }, error => {
              console.log(error)
            });

          }, error => {
            console.log(error)
          });
        } else {
          this.editarGoTo();
        }


      } else {
        this.router.navigate(['./operacao-em-curso'], { queryParams: { id: this.user } });
      }
    }
  }



  cancelaredicao() {

    this.confirmationService.confirm({
      message: 'Tem a Certeza que pretende Cancelar Edição?',
      accept: () => {
        var estado = "C";
        if (this.estado_INICIAL != null) {
          estado = this.estado_INICIAL;
        }
        this.ofService.atualizaestado(this.id_of_cab, JSON.parse(localStorage.getItem('user'))["username"], estado).subscribe(resu => {
          this.router.navigate(['./operacao-em-curso'], { queryParams: { id: this.user } });
        }, error => {
          console.log(error)
        });
      }
    });
  }

  editarGoTo() {

    if (this.estado_val != "R") {
      this.ofService.atualizarcampos(this.id_of_cab).subscribe(resu => {

      }, error => {
        console.log(error)
      });
    }


    if (this.estado_val != "R") {
      this.ofService.atualizaestado(this.id_of_cab, JSON.parse(localStorage.getItem('user'))["username"], "R").subscribe(resu => {
        this.router.navigate(['./operacao-em-curso/edicao'], { queryParams: { id: this.user, v: this.versao_modif } });
      }, error => {
        console.log(error)
      });
    } else {
      this.router.navigate(['./operacao-em-curso/edicao'], { queryParams: { id: this.user, v: this.versao_modif } });

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
    this.estado_val = event.value.estado;
  }


  atualizartempofunc(campo) {
    localStorage.setItem('siip_edicao', 'true');
    var utz = this.utilizadores.find(item => item.value.id == this.utz_lider.id).value;
    switch (campo) {
      case "data_ini":
        utz.data_INI = this.data_ini;
        break;
      case "hora_ini":
        utz.hora_INI = this.hora_ini;
        break;
      case "data_fim":
        utz.data_FIM = this.data_fim;
        break;
      case "hora_fim":
        utz.hora_FIM = this.hora_fim;
        break;
    }
  }
  gravar() {
    this.msgs2 = [];
    this.pausas_array_editar_temp = [];
    for (var y in this.utilizadores) {
      this.verificapausas(this.utilizadores[y].value.id_OP_CAB, this.utilizadores[y].value.id, this.utilizadores.length, y);
    }
  }

  verificapausas(id_OP_CAB, id, total, count) {

    this.RPOFPARALINService.getbyallUSER(id_OP_CAB, id).subscribe(
      response => {
        var pausas = [];
        var pos = 0;
        for (var x in response) {
          pausas.push({
            data_ini: response[x].data_INI_M2,
            hora_ini: response[x].hora_INI_M2,
            data_fim: response[x].data_INI_M2,
            hora_fim: response[x].hora_FIM_M2,
            paragem: response[x].tipo_PARAGEM_M2,
            momento: response[x].momento_PARAGEM_M2,
            id_op_cab: response[x].id_OP_CAB,
            id: response[x].id_PARA_LIN,
            utz: response[x].id_UTZ_CRIA,
            pos: pos++
          });
        }
        if (pausas.length > 0) this.pausas_array_editar_temp.push({ id: id, value: pausas });
        if (total == parseInt(count) + 1) {
          this.pausasvalidar();
        }
      }, error => console.log(error));

  }

  pausasvalidar() {
    var continuar = true;
    for (var y in this.pausas_array_editar_temp) {
      if (this.utilizadores.find(item => item.value.id == this.pausas_array_editar_temp[y].id)) {
        var utz = this.utilizadores.find(item => item.value.id == this.pausas_array_editar_temp[y].id).value;
        var utznome = this.utilizadores.find(item => item.value.id == this.pausas_array_editar_temp[y].id).label;
        if (!this.validapausas(this.pausas_array_editar_temp[y].value, utz.data_INI, utz.hora_INI, utz.data_FIM, utz.hora_FIM,
          this.data_ini_preparacao, this.hora_ini_preparacao, this.data_fim_preparacao, this.hora_fim_preparacao, utznome)) {
          continuar = false;
          break;
        }
      }
    }

    this.gravar2(continuar);
  }
  gravar2(continuar) {
    if (localStorage.getItem('siip_edicao') == 'true') {
      if (this.validar() && continuar) {
        this.confirmationService.confirm({
          message: 'Tem a Certeza que pretende Gravar?',
          accept: () => {
            var total = this.utilizadores.length;
            var count = 0;
            for (var x in this.utilizadores) {
              count++;
              this.atualizarFUNC(this.utilizadores[x].value, total, count, true);

              if (!this.id_op_cab_lista.find(item => item.id == this.utilizadores[x].value.id_OP_CAB)) {
                this.id_op_cab_lista.push({ id: this.utilizadores[x].value.id_OP_CAB, comp: false });
              }
            }
          }
        });
      }
    } else {
      this.displayalter = true;
    }
  }

  validar() {
    var continuar = true;
    //this.msgs2 = [];
    for (var x in this.utilizadores) {
      var data_inicio = null;
      var data_fim = null;
      var data_prepinicio = null;
      var data_prepfim = null;

      if (this.utilizadores[x].value.data_INI != null && this.utilizadores[x].value.data_INI != '') data_inicio = new Date(this.utilizadores[x].value.data_INI + ' ' + this.utilizadores[x].value.hora_INI);
      if (this.utilizadores[x].value.data_FIM != null && this.utilizadores[x].value.data_FIM != '') data_fim = new Date(this.utilizadores[x].value.data_FIM + ' ' + this.utilizadores[x].value.hora_FIM);

      if (this.data_ini_preparacao != null && this.data_ini_preparacao != '') data_prepinicio = new Date(this.data_ini_preparacao + ' ' + this.hora_ini_preparacao);
      if (this.data_fim_preparacao != null && this.data_fim_preparacao != '') data_prepfim = new Date(this.data_fim_preparacao + ' ' + this.hora_fim_preparacao);

      if (this.utilizadores[x].value.id == this.id_utz_lider) {

        if (data_prepinicio != null && data_prepfim != null) {
          if (data_inicio.getTime() != data_prepinicio.getTime()) {
            this.msgs2.push({
              severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Trabalho e Data/Hora Início Preparação são diferentes! Utilizador: ' + this.utilizadores[x].label + ''
            });
            continuar = false;
            break;
          } else if (data_fim.getTime() < data_prepfim.getTime()) {
            this.msgs2.push({
              severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Preparação superior à Data/Hora Fim Trabalho! Utilizador: ' + this.utilizadores[x].label + ''
            });
            continuar = false;
            break;
          } else if (data_inicio.getTime() > data_prepfim.getTime()) {
            this.msgs2.push({
              severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Preparação inferior à Data/Hora Início Trabalho! Utilizador: ' + this.utilizadores[x].label + ''
            });
            continuar = false;
            break;
          } else if (data_prepfim.getTime() < data_prepinicio.getTime()) {
            this.msgs2.push({
              severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Preparação inferior à Data/Hora Início Preparação! Utilizador: ' + this.utilizadores[x].label + ''
            });
            continuar = false;
            break;
          }
        }

      } else {
        if (data_inicio.getTime() < this.dataini_utz_lider.getTime()) {
          this.msgs2.push({
            severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Trabalho inferior à  Data/Hora Início Trabalho! Utilizador: ' + this.utilizadores[x].label + ''
          });
          continuar = false;
          break;

        } else if (data_fim.getTime() > this.datafim_utz_lider.getTime()) {
          this.msgs2.push({
            severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Trabalho superior à Data/Hora Fim Trabalho! Utilizador: ' + this.utilizadores[x].label + ''
          });
          continuar = false;
          break;

        } else if (data_fim.getTime() < data_inicio.getTime()) {
          this.msgs2.push({
            severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Trabalho inferior à Data/Hora Início Trabalho! Utilizador:' + this.utilizadores[x].label + ''
          });
          continuar = false;
          break;
        } else if (data_prepinicio != null && data_prepfim != null) {
          if (data_inicio.getTime() < data_prepfim.getTime()) {
            this.msgs2.push({
              severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Trabalho tem que ser superior à Data/Hora Fim Preparação! Utilizador: ' + this.utilizadores[x].label + ''
            });
            continuar = false;
            break;

          }
        }
      }
    }


    return continuar;
  }

  validapausas(pausas_array_editar, data_ini, hora_ini, data_fim, hora_fim, data_ini_preparacao, hora_ini_preparacao, data_fim_preparacao, hora_fim_preparacao, utznome = "") {
    //this.msgs2 = [];
    for (var x in pausas_array_editar) {
      var continuar = true;
      var dataini = new Date(pausas_array_editar[x].data_ini + ' ' + pausas_array_editar[x].hora_ini);
      var datafim = new Date(pausas_array_editar[x].data_fim + ' ' + pausas_array_editar[x].hora_fim);

      if (dataini.getTime() > datafim.getTime()) {
        this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Pausa Superior à Data/Hora Fim Pausa! ' + utznome });
        break;
      }
      var datainip = new Date(data_ini_preparacao + ' ' + hora_ini_preparacao).getTime();
      var datafimp = new Date(data_fim_preparacao + ' ' + hora_fim_preparacao).getTime();
      if (pausas_array_editar[x].momento == "E") {
        if (dataini.getTime() > new Date(data_fim + ' ' + hora_fim).getTime()) {
          this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Pausa Superior à Data/Hora Fim do Trabalho! ' + utznome });
          continuar = false;
          break;
        } else if (dataini.getTime() < new Date(data_ini + ' ' + hora_ini).getTime()) {
          this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Pausa Inferior à Data/Hora Início do Trabalho! ' + utznome });
          continuar = false;
          break;
        } else if (datafim.getTime() > new Date(data_fim + ' ' + hora_fim).getTime()) {
          this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Pausa Superior à Data/Hora Fim do Trabalho! ' + utznome });
          continuar = false;
          break;
        } else if (datafim.getTime() < new Date(data_ini + ' ' + hora_ini).getTime()) {
          this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Pausa Inferior à Data/Hora Início do Trabalho! ' + utznome });
          continuar = false;
          break;
        } else if (datainip && datafimp) {
          if (dataini.getTime() < datafimp) {
            this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Pausa tem que ser maior à Data/Hora Fim de Preparação! ' + utznome });
            continuar = false;
            break;
          }
        }

      } else if (pausas_array_editar[x].momento == "P") {
        if (dataini.getTime() > new Date(data_fim + ' ' + hora_fim).getTime()) {
          this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Pausa Superior à Data Fim do Trabalho! ' + utznome });
          continuar = false;
          break;
        } else if (dataini.getTime() < new Date(data_ini_preparacao + ' ' + hora_ini_preparacao).getTime()) {
          this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Pausa Inferior à Data/Hora Início da Preparação! ' + utznome });
          continuar = false;
          break;
        } else if (datafim.getTime() > new Date(data_fim_preparacao + ' ' + hora_fim_preparacao).getTime()) {
          this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Pausa Superior à Data/Hora Fim da Preparação! ' + utznome });
          continuar = false;
          break;
        } else if (datafim.getTime() < new Date(data_ini_preparacao + ' ' + hora_ini_preparacao).getTime()) {
          this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Pausa Inferior à Data/Hora Início da Preparação! ' + utznome });
          continuar = false;
          break;
        }

      }
      if (!this.validPeriod(dataini, datafim, pausas_array_editar, pausas_array_editar[x].pos)) {
        this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Valide o período das Datas! ' + utznome });
        continuar = false;
        break;
      }
    }
    return continuar;
  }

  validPeriod(start, end, datas, pos) {
    var valid = true;
    for (var i = 0; i < datas.length; i++) {
      if (datas[i].pos != pos) {
        var datei = new Date(datas[i].data_ini + ' ' + datas[i].hora_ini);
        var datef = new Date(datas[i].data_fim + ' ' + datas[i].hora_fim);
        if (start.getTime() <= datef.getTime() && datei.getTime() <= end.getTime()) {
          valid = false;
          break;
        } else if (datei.getTime() <= end.getTime() && datei.getTime() >= end.getTime()) {
          valid = false;
          break;
        }
      }
    }

    return valid;
  }

  gravar_utilizadores() {
    this.msgs2 = [];
    if (this.validar()) {
      var total = this.utilizadores.length;
      var count = 0;
      for (var x in this.utilizadores) {
        count++;
        //console.log(this.utilizadores)
        this.atualizarFUNC(this.utilizadores[x].value, total, count, false);
      }
    }
  }

  gravar_preparacao() {
    this.msgs2 = [];
    if (this.validar()) {
      var rp_of_prep_lin = new RP_OF_PREP_LIN();

      if (!this.preparacaonovo) {
        this.RPOFPREPLINService.getbyid2(this.utz_lider.id_OP_CAB).subscribe(result3 => {
          var countx = Object.keys(result3).length;

          if (countx > 0) {
            rp_of_prep_lin = result3[0];

            /*if (rp_of_prep_lin.data_INI_M1 != rp_of_prep_lin.data_INI_M2) rp_of_prep_lin.data_INI_M1 = rp_of_prep_lin.data_INI_M2;
            if (rp_of_prep_lin.data_FIM_M1 != rp_of_prep_lin.data_FIM_M2) rp_of_prep_lin.data_FIM_M1 = rp_of_prep_lin.data_FIM_M2
            if (rp_of_prep_lin.hora_INI_M1 != rp_of_prep_lin.hora_FIM_M2) rp_of_prep_lin.hora_INI_M1 = rp_of_prep_lin.hora_FIM_M2;
            if (rp_of_prep_lin.hora_FIM_M1 != rp_of_prep_lin.hora_FIM_M2) rp_of_prep_lin.hora_FIM_M1 = rp_of_prep_lin.hora_FIM_M2;*/


            rp_of_prep_lin.data_INI_M2 = new Date(this.data_ini_preparacao);
            rp_of_prep_lin.data_FIM_M2 = new Date(this.data_fim_preparacao);
            rp_of_prep_lin.hora_INI_M2 = (this.hora_ini_preparacao + ":00").substr(0, 8);
            rp_of_prep_lin.hora_FIM_M2 = (this.hora_fim_preparacao + ":00").substr(0, 8);
            rp_of_prep_lin.data_HORA_MODIF = new Date();
            rp_of_prep_lin.id_UTZ_MODIF = JSON.parse(localStorage.getItem('user'))["username"];


            this.RPOFPREPLINService.update(rp_of_prep_lin).then(res => {
              this.msgs = [];
              this.msgs.push({ severity: 'success', summary: 'Atualização', detail: 'Atualizado com Sucesso' });
            });
          }
        }, error => console.log(error));
      } else {
        this.cria_preparacao(this.utz_lider.id_OP_CAB);
      }
    }
  }


  cria_preparacao(id_OP_CAB) {
    var prep = new RP_OF_PREP_LIN();

    prep.id_OP_CAB = id_OP_CAB;

    prep.data_INI_M2 = new Date(this.data_ini_preparacao);
    prep.data_FIM_M2 = new Date(this.data_fim_preparacao);
    prep.hora_INI_M2 = (this.hora_ini_preparacao + ":00").substr(0, 8);
    prep.hora_FIM_M2 = (this.hora_fim_preparacao + ":00").substr(0, 8);


    prep.data_INI = new Date(this.data_ini_preparacao);
    prep.data_FIM = new Date(this.data_fim_preparacao);
    prep.hora_INI = (this.hora_ini_preparacao + ":00").substr(0, 8);
    prep.hora_FIM = (this.hora_fim_preparacao + ":00").substr(0, 8);

    prep.data_HORA_MODIF = new Date();
    prep.id_UTZ_MODIF = JSON.parse(localStorage.getItem('user'))["username"];
    prep.id_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["username"];
    prep.estado = "C";

    this.RPOFPREPLINService.create(prep).subscribe(
      res => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Atualização', detail: 'Atualizado com Sucesso' });
      },
      error => console.log(error));
  }

  atualizarFUNC(user, total, count, file) {
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
            rpfunc.hora_FIM = user.hora_FIM.substr(0, 8);
          } else {
            rpfunc.data_INI_M1 = rpfunc.data_INI_M2;
            rpfunc.hora_INI_M1 = rpfunc.hora_INI_M2;
            rpfunc.data_FIM_M1 = rpfunc.data_FIM_M2;
            rpfunc.hora_FIM_M1 = rpfunc.hora_FIM_M2;
          }
          rpfunc.data_INI_M2 = user.data_INI;
          rpfunc.hora_INI_M2 = (user.hora_INI + ":00").substr(0, 8);
          rpfunc.data_FIM_M2 = user.data_FIM;
          rpfunc.hora_FIM_M2 = (user.hora_FIM + ":00").substr(0, 8);
          rpfunc.id_UTZ_MODIF = userid;
          rpfunc.nome_UTZ_MODIF = nome;
          rpfunc.perfil_MODIF = "E";
          rpfunc.data_HORA_MODIF = new Date();
          if (file) {
            rpfunc.estado = "M";
          }

        }
        this.RPOPFUNCService.update(rpfunc).then(res => {
          if (total == count && file) {
            this.createfile("M", "E");
          } else if (total == count) {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Atualização', detail: 'Atualizado com Sucesso' });
          }
        });

      }, error => console.log(error));
  }

  eliminar() {
    this.btdisabled2 = true;
    this.btdisabled3 = true;
    this.confirmationService.confirm({
      message: 'Tem a Certeza que pretende Eliminar?',
      accept: () => {

        this.display_alerta_opnum = true;
        this.texto_alerta = "Aguarde..."
        this.ofService.atualizaropenum(this.id_of_cab).subscribe(resu => {
          this.ofService.verificaopnum(this.id_of_cab).subscribe(result => {
            var countx = Object.keys(result).length;

            if (countx > 0) {
              if (result[0][2] != 0) {
                this.display_alerta_opnum = true;
                this.texto_alerta = "Valor de Origem para a PF não foi encontrado!"
                this.btdisabled = false;
                if (this.permissao_ficheiroteste) this.btdisabled3 = false;
              } else if (result[0][0] != result[0][1]) {
                this.display_alerta_opnum = true;
                this.btdisabled = false;
                if (this.permissao_ficheiroteste) this.btdisabled3 = false;
                this.texto_alerta = "Valor de Origem para o(s) Componente(s) não foi encontrado!"
              } else {
                this.anularof();
              }
            } else {
              this.anularof();
            }

          }, error => {
            console.log(error)
          });

        }, error => {
          console.log(error)
        });



      }
    });
  }

  anularof() {

    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var data = new Date();

    var dados = [{ VERSAO_MODIF: (this.versao_modif + 1), ID_OF_CAB: this.id_of_cab, ID_UTZ_MODIF: user, ESTADO: "A", DATA_HORA_MODIF: data, PERFIL_MODIF: 'E', NOME_UTZ_MODIF: nome }];
    this.display_alerta_opnum = false;
    this.RPOFCABService.updateEstados(dados).subscribe(res => {
      if (this.estado_val == "C") this.ficheiroteste('A');
      window.location.reload();
    });
  }


  //mostrar pausas
  pausas() {
    this.pausas_array = [];
    this.displaypausas = true;
    this.RPOFPARALINService.getbyallUSER(this.utz_lider.id_OP_CAB, this.utz_lider.id).subscribe(
      response => {
        for (var x in response) {
          var estado = this.estados_array.find(item => item.value == response[x].momento_PARAGEM).label;
          this.pausas_array.push({
            datahora_ini: response[x].data_INI_M2 + ' ' + response[x].hora_INI_M2,
            datahora_fim: response[x].data_FIM_M2 + ' ' + response[x].hora_FIM_M2,
            paragem: response[x].des_PARAGEM,
            momento: estado,
            id: response[x].id_PARA_LIN
          });
        }

        this.pausas_array = this.pausas_array.slice();
      }, error => console.log(error));
  }

  //mostrar pausas
  pausas_editar() {
    this.pos = 0;
    this.pausa_nomes = [];
    this.pausa_nomes.push({ label: "Sel. Pausa", value: "" });
    this.service.getTipoFalta().subscribe(
      response => {
        for (var x in response) {
          this.pausa_nomes.push({ label: response[x].arrlib, value: response[x].ARRCOD });
        }
        this.pausa_nomes = this.pausa_nomes.slice();


        this.estados_pausa = [{ label: "Execução", value: "E" }];

        if (this.data_ini_preparacao != null && this.data_ini_preparacao != '' && this.utz_lider.id == this.id_utz_lider) {
          this.estados_pausa.push({ label: "Preparação", value: "P" });
        }

        this.pausas_array_editar = [];
        this.displayeditarpausas = true;
        this.RPOFPARALINService.getbyallUSER(this.utz_lider.id_OP_CAB, this.utz_lider.id).subscribe(
          response => {
            for (var x in response) {
              this.pausas_array_editar.push({
                data_ini: response[x].data_INI_M2,
                hora_ini: response[x].hora_INI_M2,
                data_fim: response[x].data_INI_M2,
                hora_fim: response[x].hora_FIM_M2,
                paragem: response[x].tipo_PARAGEM_M2,
                momento: response[x].momento_PARAGEM_M2,
                id_op_cab: response[x].id_OP_CAB,
                id: response[x].id_PARA_LIN,
                pos: this.pos++
              });
            }

            this.pausas_array_editar = this.pausas_array_editar.slice();
          }, error => console.log(error));
      },
      error => console.log(error));
  }

  nova_pausas() {

    this.pausas_array_editar.push({
      data_ini: null,
      hora_ini: null,
      data_fim: null,
      hora_fim: null,
      paragem: null,
      momento: "E",
      id_op_cab: this.utz_lider.id_OP_CAB,
      id: null,
      pos: this.pos++
    });
    this.pausas_array_editar = this.pausas_array_editar.slice();
  }

  onShow() {
    // overflow: hidden;
    document.body.style.overflow = "hidden";
  }
  onHide() {
    document.body.style.overflow = "auto";
  }

  gravar_pausas() {
    localStorage.setItem('siip_edicao', 'true');
    this.msgs2 = [];
    if (this.validapausas(this.pausas_array_editar, this.data_ini, this.hora_ini, this.data_fim, this.hora_fim, this.data_ini_preparacao, this.hora_ini_preparacao, this.data_fim_preparacao, this.hora_fim_preparacao)) {
      for (var x in this.pausas_array_editar) {
        if (this.pausas_array_editar[x].id != null) {

          this.atualizar_pausa(this.pausas_array_editar[x].paragem, this.pausa_nomes.find(item => item.value == this.pausas_array_editar[x].paragem).label,
            this.pausas_array_editar[x].data_ini, this.pausas_array_editar[x].hora_ini, this.pausas_array_editar[x].data_fim,
            this.pausas_array_editar[x].hora_fim, this.pausas_array_editar[x].id_op_cab, this.pausas_array_editar[x].momento, this.pausas_array_editar[x].id);

        } else if (this.pausas_array_editar[x].data_ini != null) {

          this.criar_pausa(this.pausas_array_editar[x].paragem, this.pausa_nomes.find(item => item.value == this.pausas_array_editar[x].paragem).label,
            this.pausas_array_editar[x].data_ini, this.pausas_array_editar[x].hora_ini, this.pausas_array_editar[x].data_fim,
            this.pausas_array_editar[x].hora_fim, this.pausas_array_editar[x].id_op_cab, this.pausas_array_editar[x].momento);
        }
      }
      this.displayeditarpausas = false;
    }
  }

  atualizar_pausa(item, design, date_ini, time_ini, date_fim, time_fim, id_OP_CAB, momento, id) {
    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var rp_of_para_lin = new RP_OF_PARA_LIN();
    this.RPOFPARALINService.getbyid2(id).subscribe(result2 => {
      rp_of_para_lin = result2[0];

      rp_of_para_lin.data_INI_M2 = date_ini;
      rp_of_para_lin.hora_INI_M2 = (time_ini + ":00").substr(0, 8);

      rp_of_para_lin.data_FIM_M2 = date_fim;
      rp_of_para_lin.hora_FIM_M2 = (time_fim + ":00").substr(0, 8);

      rp_of_para_lin.id_UTZ_MODIF = user;
      rp_of_para_lin.data_HORA_MODIF = new Date();
      rp_of_para_lin.estado = "C";

      rp_of_para_lin.des_PARAGEM_M2 = design;
      rp_of_para_lin.momento_PARAGEM_M2 = momento;
      rp_of_para_lin.tipo_PARAGEM_M2 = item;

      this.RPOFPARALINService.update(rp_of_para_lin);

    }, error => console.log(error));
  }

  criar_pausa(item, design, date_ini, time_ini, date_fim, time_fim, id_OP_CAB, momento) {


    var user = JSON.parse(localStorage.getItem('user'))["username"];
    //var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var id_op_cab = id_OP_CAB;
    var rp_of_para_lin = new RP_OF_PARA_LIN();

    rp_of_para_lin.data_INI = date_ini;
    rp_of_para_lin.hora_INI = (time_ini + ":00").substr(0, 8);
    rp_of_para_lin.data_FIM = date_fim;
    rp_of_para_lin.hora_FIM = (time_fim + ":00").substr(0, 8);

    rp_of_para_lin.data_INI_M1 = null;
    rp_of_para_lin.hora_INI_M1 = null;
    rp_of_para_lin.data_FIM_M1 = null;
    rp_of_para_lin.hora_FIM_M1 = null;

    rp_of_para_lin.data_INI_M2 = date_ini;
    rp_of_para_lin.hora_INI_M2 = (time_ini + ":00").substr(0, 8);
    rp_of_para_lin.data_FIM_M2 = date_fim;
    rp_of_para_lin.hora_FIM_M2 = (time_fim + ":00").substr(0, 8);

    rp_of_para_lin.id_UTZ_CRIA = this.utz_lider.id;
    rp_of_para_lin.id_OP_CAB = id_op_cab;
    rp_of_para_lin.tipo_PARAGEM_M2 = item;
    rp_of_para_lin.tipo_PARAGEM = item;
    rp_of_para_lin.des_PARAGEM_M2 = design;
    rp_of_para_lin.des_PARAGEM = design;
    rp_of_para_lin.momento_PARAGEM_M2 = momento;
    rp_of_para_lin.momento_PARAGEM = momento;
    rp_of_para_lin.estado = "C";

    rp_of_para_lin.id_UTZ_MODIF = user;
    rp_of_para_lin.data_HORA_MODIF = new Date();

    this.RPOFPARALINService.create(rp_of_para_lin).subscribe(
      res => {
        // this.displayeditarpausas = false;
      },
      error => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Erro ao Gravar!' });
        console.log(error);
      });

  }

  apagarlinha(event) {
    var index = this.pausas_array_editar.findIndex(item => item.pos == event.pos)

    if (index > -1) {
      this.pausas_array_editar.splice(index, 1);
      this.pausas_array_editar = this.pausas_array_editar.slice();
    }
  }


}
