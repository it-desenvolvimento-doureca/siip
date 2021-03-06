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
import { RPCONFFAMILIACOMPService } from '../services/rp-conf-familia-comp.service';
import { RP_OF_OP_LIN } from '../entidades/RP_OF_OP_LIN';
import { RP_OF_OUTRODEF_LIN } from '../entidades/RP_OF_OUTRODEF_LIN';
import { ST_PEDIDOS } from '../entidades/ST_PEDIDOS';
import { STPEDIDOSService } from '../services/st-pedidos.service';
import { RPCAIXASINCOMPLETASService } from '../services/rp-caixas-incompletas.service';
import { RP_CAIXAS_INCOMPLETAS } from '../entidades/RP_CAIXAS_INCOMPLETAS';

@Component({
  selector: 'app-operacao-em-curso',
  host: { '(window:keydown)': 'hotkeys($event)' },
  templateUrl: './operacao-em-curso.component.html',
  styleUrls: ['./operacao-em-curso.component.css']
})
export class OperacaoEmCursoComponent implements OnInit {
  maq_numcod: any;
  displaypreparacao;
  permissao_ficheiroteste: any;
  permissao_atualizar_ref = false;
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
  display_alerta: boolean;
  temp_confirma = true;
  id_OP_CAB: any;
  data_ini_preparacao_lider: Date;
  data_fim_preparacao_lider: Date;
  loadingTable: boolean;
  sec_des: any;
  sec_num: any;
  display_alerta_pausa: boolean;
  referencia: string;
  display_lista: boolean;
  display_caixa: boolean;
  caixasincoompletas = [];
  lista_impressao: any[];
  templinha = 0;
  mensagem_caixa = "";
  display_alerta_caixas;
  PROREF: any;
  mensagem_erro: string;
  display_alertaerro: boolean;
  impressao_selected: any;
  display_alerta_etiquetas: boolean;
  mensagem_erro_etiquetas: string;
  temp_estado: any;
  temp_perfil: any;

  constructor(private RPCAIXASINCOMPLETASService: RPCAIXASINCOMPLETASService, private STPEDIDOSService: STPEDIDOSService, private RPCONFFAMILIACOMPService: RPCONFFAMILIACOMPService, private service: ofService, private sanitizer: DomSanitizer, private GEREVENTOService: GEREVENTOService, private ofService: ofService, private route: ActivatedRoute, private RPOPFUNCService: RPOPFUNCService, private RPOFPREPLINService: RPOFPREPLINService, private RPOFPARALINService: RPOFPARALINService, private RPOFCABService: RPOFCABService, private RPOFOPLINService: RPOFOPLINService, private confirmationService: ConfirmationService, private router: Router, private RPOFOPCABService: RPOFOPCABService) {
  }

  ngOnInit() {
    this.disabledAdici = false;
    this.perfil = localStorage.getItem('access');
    var access = JSON.parse(localStorage.getItem('access'));
    this.permissao_editar = access.find(item => item === "E");
    this.permissao_ficheiroteste = access.find(item => item === "A");
    this.permissao_atualizar_ref = access.find(item => item === "E");
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
              this.of_num = response[x][1].of_NUM.trim();
              this.sec_des = response[x][1].sec_DES;
              this.sec_num = response[x][1].sec_NUM


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

              this.data_ini_preparacao_lider = (response[x][3] != null) ? new Date(this.formatDate(response[x][3]) + ' ' + response[x][4]) : null;

              this.data_fim_preparacao_lider = (response[x][5] != null) ? new Date(this.formatDate(response[x][5]) + ' ' + response[x][6]) : null;



              this.data_ini = response[x][0].data_INI_M2;
              this.hora_ini = response[x][0].hora_INI_M2;
              this.hora_fim = response[x][0].hora_FIM_M2;
              this.data_fim = response[x][0].data_FIM_M2;

              this.data_ini_preparacao = (response[x][3] != null) ? this.formatDate(response[x][3]) : "";
              this.hora_ini_preparacao = response[x][4];
              this.data_fim_preparacao = (response[x][5] != null) ? this.formatDate(response[x][5]) : "";
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
              } else {
                this.concluido = false;
              }
              if (this.utilizadores.length > 0) {
                this.utz_lider = this.utilizadores.find(item => item.value.id == this.id_utz_lider).value;
                this.id_OP_CAB = this.utz_lider.id_OP_CAB;
              } else {
                this.utz_lider = [];
                this.utz_lider.id_OP_CAB = response[x][2].id_OP_CAB;
                this.utz_lider.id = response[x][0].id_UTZ_CRIA;
              }
            } else {
              this.id_op_cab_lista.push({ id: response[x][2].id_OP_CAB, comp: true });
            }

            this.defeitos = [];
            if (count == 0) this.listadefeitos(response[x][2].id_OP_CAB, comp, count);
            count++;
          }
          if (JSON.parse(localStorage.getItem('user'))["username"] == this.utz_edicao && response[x][0].estado == "R") { this.editarGoTo(); }
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
    this.RPOPFUNCService.getallUsersTEMPPREP(id).subscribe(
      response => {
        this.count = Object.keys(response).length;
        for (var x in response) {
          this.utilizadores.push({
            label: response[x][0].id_UTZ_CRIA + " - " + response[x][0].nome_UTZ_CRIA,
            value: {
              id_OP_FUNC: response[x][0].id_OP_FUNC, id_OP_CAB: response[x][0].id_OP_CAB, id: response[x][0].id_UTZ_CRIA,
              data_FIM: response[x][0].data_FIM_M2, hora_FIM: response[x][0].hora_FIM_M2, data_INI: response[x][0].data_INI_M2, hora_INI: response[x][0].hora_INI_M2, estado: response[x][0].estado
              , HORA_INI_PREP: response[x][1], DATA_INI_PREP: response[x][2], DATA_FIM_PREP: response[x][3], HORA_FIM_PREP: response[x][4]
            }
          });

        }

        this.utilizadores = this.utilizadores.slice();
        if (this.id_utz_lider != null) {
          this.utz_lider = this.utilizadores.find(item => item.value.id == this.id_utz_lider).value;
          this.id_OP_CAB = this.utilizadores.find(item => item.value.id == this.id_utz_lider).value.id_OP_CAB;
        }

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
                      var date = new Date();
                      rpofopfunc.id_OP_CAB = res.id_OP_CAB;
                      rpofopfunc.data_INI = new Date(this.formatDate(date));
                      rpofopfunc.data_INI_M1 = new Date(this.formatDate(date));
                      rpofopfunc.data_INI_M2 = new Date(this.formatDate(date));

                      var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                      rpofopfunc.hora_INI = time;
                      rpofopfunc.hora_INI_M1 = time;
                      rpofopfunc.hora_INI_M2 = time;
                      rpofopfunc.id_UTZ_CRIA = code_login;
                      rpofopfunc.nome_UTZ_CRIA = nome;
                      rpofopfunc.perfil_CRIA = "O";
                      rpofopfunc.estado = 'E';//response[x][0].estado;
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
          if (res[x][1].id_OF_CAB_ORIGEM) { tipo = "COMP"; comp = true; };
          if (res[x][0].tipo_PECA == "COM") { tipo = "COM"; comp = true; };
          this.defeitos.push({ tipo_PECA: res[x][0].tipo_PECA, tipo_PECAorder: tipo, tipo: tipo, id: count, ref_num: res[x][0].ref_NUM, cor: cor, ref_des: res[x][0].ref_DES, quant_of: res[x][0].quant_OF, quant_boas: res[x][0].quant_BOAS_TOTAL_M2, quant_def_total: res[x][0].quant_DEF_TOTAL_M2, quant_control: total, comp: comp });
        }
        this.defeitos = this.defeitos.slice();
        //this.ordernar();
        this.defeitos.sort(this.compareFunction2);
        this.defeitos.sort(this.compareFunction);
      },
      error => console.log(error));
  }

  compareFunction2(a, b) {
    if (a.ref_num > b.ref_num) {
      return 1;
    }
    if (a.ref_num < b.ref_num) {
      return -1;
    }
    return 0;
  }

  compareFunction(a, b) {
    if (a.tipo_PECAorder > b.tipo_PECAorder) {
      return -1;
    }
    if (a.tipo_PECAorder < b.tipo_PECAorder) {
      return 1;
    }
    return 0;
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



  validaconclusao(estado, perfil) {
    var pfs = [];
    for (var z in this.defeitos) {
      if (this.defeitos[z].tipo == "PF") {
        pfs.push(this.defeitos[z]);
      }
    }
    this.RPOFCABService.verificaetiquetas(this.id_of_cab).subscribe(res => {

      var count = Object.keys(res).length;
      if (count > 0) {
      }
      var mensagem = "";
      for (var x in res) {
        if (res[x][2] > res[x][3]) {
          mensagem += "Etiqueta <b>" + res[x][0] + " ( " + res[x][1] + " )</b> com quantidades inseridas maiores que a quantidade da etiqueta.<br> Corrija para continuar. <br>";
          break;
        } else if (res[x][2] == 0) {
          mensagem += "Etiqueta <b>" + res[x][0] + " ( " + res[x][1] + " )</b> sem quantidades registadas.<br> Corrija para continuar. <br>";
          break;
        }
      }

      if (mensagem == "") {

        this.ofService.getofpai_filho(this.of_num).subscribe(res => {

          for (var p in res) {
            var comp = null;
            var pf = null;

            var valor_comp = 0;
            var valor_pf = 0;
            comp = this.defeitos.find(item => item.ref_num == res[p].PROREF);
            pf = this.defeitos.find(item => item.ref_num == res[p].PAI);
            if (comp && pf) {
              if (pf.quant_boas != comp.quant_boas) {
                mensagem = "O nº de Componentes utilizados não corresponde ao nº de Peças Finais boas registadas no trabalho. <br>Corrija para poder continuar.<br>";
                break;
              }
            }
            /*if (pfs[y].ref_num != this.defeitos[t].ref_num) {
              if (pfs[y].quant_boas != this.defeitos[t].quant_boas) {
                mensagem = "O nº de Componentes utilizados não corresponde ao nº de Peças Finais boas registadas no trabalho. <br>Corrija para poder continuar.<br>";
                break;
              }
            }*/

          }

          this.valida_continua(mensagem, estado, perfil, pfs);

        }, error => {
          this.valida_continua(mensagem, estado, perfil, pfs);
        });
      } else {
        this.valida_continua(mensagem, estado, perfil, pfs);
      }



    }, error => {
      this.numero_caixas(estado, perfil, pfs);
    });

  }

  valida_continua(mensagem, estado, perfil, pfs) {

    if (mensagem != "") {
      this.mensagem_erro = mensagem;
      this.display_alertaerro = true;
    } else {
      var confirmation = false;
      this.RPCAIXASINCOMPLETASService.getbyid_of_cab(this.id_of_cab).subscribe(
        response => {
          for (var u in pfs) {
            var countpfs = 0;
            for (var f in response) {
              if (pfs[u].ref_num == response[f].ref_NUM) {
                countpfs++;
              }

            }
            if (countpfs == 0) {
              confirmation = true;
              this.confirmationService.confirm({
                message: "Não definiu nenhuma caixa Incompleta para a referência " + pfs[u].ref_num + ". Deseja finalizar o trabalho?",
                accept: () => {
                  this.numero_caixas(estado, perfil, pfs);
                }
              });

              break;
            } else if (pfs[u].quant_boas == 0) {
              confirmation = true;
              this.confirmationService.confirm({
                message: "Foram lidas etiquetas de caixas incompletas da referência " + pfs[u].ref_num
                  + " mas não foram registadas quantidades de peças boas para essa referência. <br> Deseja concluir o trabalho?",
                accept: () => {
                  this.numero_caixas(estado, perfil, pfs);
                }
              });
              break;
            }
          }

          if (!confirmation) {
            this.numero_caixas(estado, perfil, pfs);
          }

        }, error => console.log(error));

    }

  }

  numero_caixas(estado, perfil, refs) {

    var pf = [];
    for (var x in refs) {
      pf.push("'" + refs[x].ref_num + "'");
    }
    var data = [{ id_of_cab: this.id_of_cab, proref: pf.toString() }]
    this.ofService.gama_embalagem(data).subscribe(res => {

      var count = Object.keys(res).length;
      var message = "";
      if (count > 0) {
        for (var y in res) {
          var qtd_boas = refs.find(item => item.ref_num == res[y].proref).quant_boas;
          var gama = (res[y].QuantidadeCaixa) * 1;
          var total_caixas = res[y].total_caixas;
          var total_pecas = (qtd_boas) * 1 + (total_caixas) * 1;
          var total_etiquetas = Math.floor(total_pecas / gama);
          var total_etiquetas1 = (total_pecas / gama) % 1;

          message += "Referência <b>" + res[y].proref + "</b> irá gerar: ";
          if (total_etiquetas > 0) message += "" + total_etiquetas + " " + ((total_etiquetas > 1) ? "etiquetas" : "etiqueta") + " de " + gama;
          if (total_etiquetas > 0 && total_etiquetas1 > 0) {
            message += " e";
          } else if (total_etiquetas1 <= 0) {
            message += " peças";
          }
          if (total_etiquetas1 > 0) message += " 1 etiqueta de " + Math.ceil(Math.floor((total_etiquetas1 * gama) * 100) / 100) + " peças";
          message += ".<br>";
        }

        this.mensagem_erro_etiquetas = message;
        this.display_alerta_etiquetas = true;
        this.temp_estado = estado;
        this.temp_perfil = perfil;
      } else {
        this.continuavalidacao(estado, perfil);
      }
    }, error => {
      this.continuavalidacao(estado, perfil);
    });
  }

  continuavalidacao(estado, perfil) {
    this.RPOFCABService.getof(this.id_of_cab).subscribe(res => {
      var count = Object.keys(res).length;

      if (count > 0) {
        if (res[0].estado == "C") {
          this.display_alerta = true;
        } else {
          this.createfile(estado, perfil);
        }
      } else {
        this.createfile(estado, perfil);
      }
    }, error => {
      this.createfile(estado, perfil);
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
          if (this.temp_confirma) {
            this.temp_confirma = false;
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
      if (result[0][2].estado == "S") {
        this.texto_alerta = "Encontra-se em Pausa. Termine primeiro a Pausa!";
        this.display_alerta_pausa = true;
      } else {
        if (result[0][1].estado != 'C' || estado != 'C') {
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
                if (result1[x].momento_PARAGEM_M2 == "E") {
                  var hora1 = new Date(result1[x].data_INI_M2 + " " + result1[x].hora_INI_M2);
                  var hora2 = new Date(result1[x].data_FIM_M2 + " " + result1[x].hora_FIM_M2);
                  var timedif = this.timediff(hora1.getTime(), hora2.getTime())
                  var splitted_pausa = timedif.split(":", 3);
                  total_pausa += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
                }
                if (result1[x].momento_PARAGEM_M2 == "P") {
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

              var splitted_pausa = time_pausa.split(":", 3);
              timedif4 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

            }
            var hora1 = new Date(result[0][2].data_INI_M2 + " " + result[0][2].hora_INI_M2);
            var hora2 = new Date(date);

            if (estado == "M") hora2 = new Date(result[0][2].data_FIM_M2 + " " + result[0][2].hora_FIM_M2);
            //tempo da total of
            var timedif2 = Math.abs(hora2.getTime() - hora1.getTime());

            if (/*estado == "M" &&*/ this.data_fim_preparacao != null && this.data_ini_preparacao != null /*&& id_op_cab2 == id_op_cab*/) {

              var splitted_pausa = time_pausa_prep.split(":", 3);
              timedif5 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

              //estado rp_of_prep_lin
              var rp_of_prep_lin = new RP_OF_PREP_LIN();
              this.RPOFPREPLINService.getbyid2(id_op_cab).subscribe(resu => {
                var countxresu = Object.keys(resu).length;

                if (countxresu > 0) {
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
                } else {
                  this.estados2(result, timedif3, time_pausa_prep, timedif5, id_op_cab, date, hora1, hora2, estado, time_fim, user, nome, perfil,
                    utz_count, comp, rp_of_op_cab, rp_of_op_func, rp_of_cab, timedif2, timedif4, time_pausa_of, num_count, total)
                }
              }, error => console.log(error));
            } else {

              this.estados2(result, timedif3, time_pausa_prep, timedif5, id_op_cab, date, hora1, hora2, estado, time_fim, user, nome, perfil,
                utz_count, comp, rp_of_op_cab, rp_of_op_func, rp_of_cab, timedif2, timedif4, time_pausa_of, num_count, total)
            }


          }, error => console.log(error));

        } else {
          this.display_alerta = true;
        }
      }
    }, error => console.log(error));
  }

  estados2(result, timedif3, time_pausa_prep, timedif5, id_op_cab, date, hora1, hora2, estado, time_fim, user, nome, perfil,
    utz_count, comp, rp_of_op_cab, rp_of_op_func, rp_of_cab, timedif2, timedif4, time_pausa_of, num_count, total) {
    if (isNaN(timedif4)) timedif4 = 0;
    if (result[0][0].tempo_PREP_TOTAL_M2 != null) {
      //var splitted_prep = result[0][0].tempo_PREP_TOTAL_M2.split(":", 3);
      //timedif3 = parseInt(splitted_prep[0]) * 3600000 + parseInt(splitted_prep[1]) * 60000 + parseInt(splitted_prep[2]) * 1000;

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
        rp_of_prep_lin.data_FIM = new Date(this.formatDate(date));
        rp_of_prep_lin.hora_FIM = time_fim;
        rp_of_prep_lin.data_FIM_M1 = new Date(this.formatDate(date));
        rp_of_prep_lin.hora_FIM_M1 = time_fim;
        rp_of_prep_lin.data_FIM_M2 = new Date(this.formatDate(date));
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
          rp_of_op_func.data_FIM = new Date(this.formatDate(date));
          rp_of_op_func.hora_FIM = time_fim;

          rp_of_op_func.data_FIM_M1 = new Date(this.formatDate(date));
          rp_of_op_func.hora_FIM_M1 = time_fim;
          rp_of_op_func.data_FIM_M2 = new Date(this.formatDate(date));
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
        rp_of_op_func.data_FIM = new Date(this.formatDate(date));
        rp_of_op_func.hora_FIM = time_fim;
        rp_of_op_func.data_FIM_M1 = new Date(this.formatDate(date));
        rp_of_op_func.hora_FIM_M1 = time_fim;
        rp_of_op_func.data_FIM_M2 = new Date(this.formatDate(date));
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
    var dados = "{of::" + of + ";#;assunto::" + assunto + ";#;mensagem::" + mensagem + ";#;utilizador::" + utilizador + "}"
    var data = [{ MODULO: 4, MOMENTO: "Ao Criar Mensagem", PAGINA: "Execução", ESTADO: true, DADOS: dados }];

    this.GEREVENTOService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }

  ficheiroteste(estado, ficheiros = false, dialog = false, original = false) {

    if (dialog) {
      this.displaygerarficheiros = true;
    } else {
      if (this.displaygerarficheiros) { this.progressBarDialog = true; }
      var data = [{ ip_posto: this.getCookie("IP_CLIENT") }];
      this.ofService.criaficheiro(this.id_of_cab, estado, ficheiros, original, data).subscribe(resu => {

        if (this.displaygerarficheiros) {
          this.progressBarDialog = false;
          this.displaygerarficheiros = false;
        }
        if (ficheiros) {
          var a = document.createElement('a');
          a.href = URL.createObjectURL(resu);
          a.download = "ficheiros_interface.zip";
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
        this.estadoedicao();
      }, error => {
        this.estadoedicao();
        console.log(error);
      });
    } else {
      this.estadoedicao();
    }



  }

  estadoedicao() {
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

    this.id_OP_CAB = event.value.id_OP_CAB;
    this.data_ini_preparacao = (event.value.DATA_INI_PREP != null) ? this.formatDate(event.value.DATA_INI_PREP) : "";
    this.hora_ini_preparacao = event.value.HORA_INI_PREP;
    this.data_fim_preparacao = (event.value.DATA_FIM_PREP) ? this.formatDate(event.value.DATA_FIM_PREP) : "";
    this.hora_fim_preparacao = event.value.HORA_FIM_PREP;
    if (this.id_utz_lider == event.value.id) {
      this.dataini_utz_lider = new Date(event.value.data_INI + ' ' + event.value.hora_INI);
      this.datafim_utz_lider = new Date(event.value.data_FIM + ' ' + event.value.hora_FIM);
    }
    if (this.data_ini_preparacao == null || this.data_ini_preparacao == "") {
      this.preparacaonovo = true;
    } else {
      this.preparacaonovo = false;
    }

  }


  atualizartempofunc(campo) {
    localStorage.setItem('siip_edicao', 'true');
    var utz = this.utilizadores.find(item => item.value.id_OP_CAB == this.utz_lider.id_OP_CAB).value;
    if (this.id_utz_lider == utz.id) {
      this.dataini_utz_lider = new Date(this.data_ini + ' ' + this.hora_ini);
      this.datafim_utz_lider = new Date(this.data_fim + ' ' + this.hora_fim);
    }
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
      case "data_ini_preparacao":
        utz.DATA_INI_PREP = this.data_ini_preparacao;
        break;
      case "hora_ini_preparacao":
        utz.HORA_INI_PREP = this.hora_ini_preparacao;
        break;
      case "data_fim_preparacao":
        utz.DATA_FIM_PREP = this.data_fim_preparacao;
        break;
      case "hora_fim_preparacao":
        utz.HORA_FIM_PREP = this.hora_fim_preparacao;
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

        var datpreini = (utz.DATA_INI_PREP == null || utz.DATA_INI_PREP == "") ? null : new Date(utz.DATA_INI_PREP).toDateString();
        var datprefim = (utz.DATA_FIM_PREP == null || utz.DATA_FIM_PREP == "") ? null : new Date(utz.DATA_FIM_PREP).toDateString();

        if (!this.validapausas(this.pausas_array_editar_temp[y].value, utz.data_INI, utz.hora_INI, utz.data_FIM, utz.hora_FIM,
          datpreini, utz.HORA_INI_PREP, datprefim, utz.HORA_FIM_PREP, utznome)) {
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

      if (this.utilizadores[x].value.DATA_INI_PREP != null && this.utilizadores[x].value.DATA_INI_PREP != '') data_prepinicio = new Date(this.formatDate(this.utilizadores[x].value.DATA_INI_PREP) + ' ' + this.utilizadores[x].value.HORA_INI_PREP);
      if (this.utilizadores[x].value.DATA_FIM_PREP != null && this.utilizadores[x].value.DATA_FIM_PREP != '') data_prepfim = new Date(this.formatDate(this.utilizadores[x].value.DATA_FIM_PREP) + ' ' + this.utilizadores[x].value.HORA_FIM_PREP);


      if (this.utilizadores[x].value.id == this.id_utz_lider) {
        this.data_fim_preparacao_lider = data_prepfim;
      }

      if (data_prepinicio != null && data_prepfim != null) {
        if (data_inicio.getTime() != data_prepinicio.getTime() /*&& this.utilizadores[x].value.id == this.id_utz_lider*/) {
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
        } else if (data_inicio.getTime() > data_prepfim.getTime()) {
          this.msgs2.push({
            severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Preparação inferior à Data/Hora Início Trabalho! Utilizador: ' + this.utilizadores[x].label + ''
          });
          continuar = false;
          break;
        }
      }

      //} else {

      if (this.utilizadores[x].value.id != this.id_utz_lider) {
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
        } else if (data_prepfim != null && data_inicio.getTime() > data_prepfim.getTime()) {
          this.msgs2.push({
            severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Preparação inferior à Data/Hora Início Trabalho! Utilizador: ' + this.utilizadores[x].label + ''
          });
          continuar = false;
          break;
        } else if (data_prepinicio != null && data_inicio.getTime() > data_prepinicio.getTime()) {
          this.msgs2.push({
            severity: 'error', summary: 'Alerta', detail: 'Data/Hora Início Preparação inferior à Data/Hora Início Trabalho! Utilizador: ' + this.utilizadores[x].label + ''
          });
          continuar = false;
          break;
        } else if (this.data_fim_preparacao_lider != null && data_prepfim != null && this.data_fim_preparacao_lider.getTime() < data_prepfim.getTime()) {
          this.msgs2.push({
            severity: 'error', summary: 'Alerta', detail: 'Data/Hora Fim Preparação Superior à Data/Hora Fim Preparação (Líder)! Utilizador: ' + this.utilizadores[x].label + ''
          });
          continuar = false;
          break;
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
        continuar = false;
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

        if (data_ini_preparacao == "" || data_ini_preparacao == null || data_fim_preparacao == "" || data_fim_preparacao == null) {
          this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Verifique as Datas da Preparação! ' + utznome });
          continuar = false;
          break;
        } else {
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
      }
      if (!this.validPeriod(dataini, datafim, pausas_array_editar, pausas_array_editar[x].pos, pausas_array_editar[x].momento)) {
        this.msgs2.push({ severity: 'error', summary: 'Alerta', detail: 'Valide o período das Datas! ' + utznome });
        continuar = false;
        break;
      }
    }
    return continuar;
  }

  //Valida Pausas
  validPeriod(start, end, datas, pos, momento) {

    var valid = true;
    for (var i = 0; i < datas.length; i++) {
      if (datas[i].pos != pos /*&& datas[i].momento == momento*/) {
        var datei = new Date(datas[i].data_ini + ' ' + datas[i].hora_ini);
        var datef = new Date(datas[i].data_fim + ' ' + datas[i].hora_fim);
        if (start.getTime() < datef.getTime() && datei.getTime() < end.getTime()) {
          valid = false;
          break;
        } else if (datei.getTime() < end.getTime() && datei.getTime() > end.getTime()) {
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
        this.RPOFPREPLINService.getbyid2(this.id_OP_CAB).subscribe(result3 => {
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
    this.id_OP_CAB = id_OP_CAB;
    prep.id_OP_CAB = id_OP_CAB;

    prep.data_INI_M2 = new Date(this.data_ini_preparacao);
    prep.data_FIM_M2 = new Date(this.data_fim_preparacao);
    prep.hora_INI_M2 = (this.hora_ini_preparacao + ":00").substr(0, 8);
    prep.hora_FIM_M2 = (this.hora_fim_preparacao + ":00").substr(0, 8);


    /*prep.data_INI = new Date(this.data_ini_preparacao);
    prep.data_FIM = new Date(this.data_fim_preparacao);
    prep.hora_INI = (this.hora_ini_preparacao + ":00").substr(0, 8);
    prep.hora_FIM = (this.hora_fim_preparacao + ":00").substr(0, 8);*/

    prep.data_HORA_MODIF = new Date();
    prep.id_UTZ_MODIF = JSON.parse(localStorage.getItem('user'))["username"];
    prep.id_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["username"];
    prep.estado = "C";

    this.RPOFPREPLINService.create(prep).subscribe(
      res => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Atualização', detail: 'Atualizado com Sucesso' });
        this.preparacaonovo = false;
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
            /*rpfunc.data_INI_M1 = rpfunc.data_INI_M2;
            rpfunc.hora_INI_M1 = rpfunc.hora_INI_M2;
            rpfunc.data_FIM_M1 = rpfunc.data_FIM_M2;
            rpfunc.hora_FIM_M1 = rpfunc.hora_FIM_M2;*/
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
                this.continuar_anular();
              }
            } else {
              this.continuar_anular();
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

  continuar_anular() {
    this.display_alerta_opnum = false;
    this.confirmationService.confirm({
      message: 'Pretende duplicar o registo?',
      accept: () => {
        this.display_alerta_opnum = true;
        this.texto_alerta = "Aguarde..."
        this.RPOFCABService.duplicarRegistos(this.id_of_cab).subscribe(res => {
          this.display_alerta_opnum = false;
          //console.log(res)
          this.anularof();
        }, error => {
          this.display_alerta_opnum = false;
          //this.anularof();
          console.log(error);
        });
      },
      reject: () => {
        this.anularof();
      }
    });
  }

  anularof() {

    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var data = new Date();

    var dados = [{ VERSAO_MODIF: (this.versao_modif + 1), ID_OF_CAB: this.id_of_cab, ID_UTZ_MODIF: user, ESTADO: "A", DATA_HORA_MODIF: data, PERFIL_MODIF: 'E', NOME_UTZ_MODIF: nome }];

    this.RPOFCABService.updateEstados(dados).subscribe(res => {
      if (this.estado_val == "C" || this.estado_val == "M" || this.estado_val == "R") this.ficheiroteste('A');

      if (this.estado_val == "R") {
        this.editar();
      } else {
        window.location.reload();
      }
    });
  }


  //mostrar pausas
  pausas() {
    this.pausas_array = [];
    this.displaypausas = true;
    this.RPOFPARALINService.getbyallUSER(this.utz_lider.id_OP_CAB, this.utz_lider.id).subscribe(
      response => {
        for (var x in response) {
          var estado = this.estados_array.find(item => item.value == response[x].momento_PARAGEM_M2).label;
          this.pausas_array.push({
            datahora_ini: response[x].data_INI_M2 + ' ' + response[x].hora_INI_M2,
            datahora_fim: response[x].data_FIM_M2 + ' ' + response[x].hora_FIM_M2,
            paragem: response[x].des_PARAGEM_M2,
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

        //if (this.data_ini_preparacao != null && this.data_ini_preparacao != '' && this.utz_lider.id == this.id_utz_lider) {
        this.estados_pausa.push({ label: "Preparação", value: "P" });
        // }

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

    /*rp_of_para_lin.data_INI = date_ini;
    rp_of_para_lin.hora_INI = (time_ini + ":00").substr(0, 8);
    rp_of_para_lin.data_FIM = date_fim;
    rp_of_para_lin.hora_FIM = (time_fim + ":00").substr(0, 8);*/

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
    //rp_of_para_lin.tipo_PARAGEM = item;
    rp_of_para_lin.des_PARAGEM_M2 = design;
    //rp_of_para_lin.des_PARAGEM = design;
    rp_of_para_lin.momento_PARAGEM_M2 = momento;
    //rp_of_para_lin.momento_PARAGEM = momento;
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


  //ao clicar nas teclas 
  hotkeys(event) {
    var access = JSON.parse(localStorage.getItem('access'));
    if (event.keyCode == 73 && event.ctrlKey && event.altKey) {
      alert('ID_OF_CAB: ' + this.id_of_cab)
    }
  }

  atualizarreferencias() {
    this.confirmationService.confirm({
      message: 'Pretende atualizar referências?',
      accept: () => {
        this.atualizarreferencias2();
      }, reject: () => {
      }
    });
  }

  //atualoizareferencias
  atualizarreferencias2() {
    this.loadingTable = true;
    this.service.getOF(this.of_num).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir uma of vai preencher combobox operações e tabela referencias
        if (count > 0) {
          // if (response[0].OFETAT != 3 && response[0].OFETAT != 4) {

          //preenche tabela referencias
          this.service.getRef(response[0].ofanumenr).subscribe(
            response2 => {
              var referencias = [];
              for (var x in response2) {
                var perc = 0;
                if (response2[x].ZPAVAL != null) {
                  perc = parseFloat(String(response2[x].ZPAVAL).replace(",", "."));
                }
                referencias.push({ tipo_PECAorder: "PF", tipo_PECA: response2[x].PROTYPCOD, PROQTEFMT: response2[x].PROQTEFMT, GESCOD: response2[x].GESCOD, perc_obj: perc, codigo: response2[x].PROREF, design: response2[x].PRODES1 + " " + response2[x].PRODES2, var1: response2[x].VA1REF, var2: response2[x].VA2REF, INDREF: response2[x].INDREF, OFBQTEINI: parseFloat(response2[x].OFBQTEINI).toFixed(0), INDNUMENR: response2[x].INDNUMENR, tipo: "PF", comp: false });
                //verifica familia
                this.veirificafam(response2[x].PRDFAMCOD, response2[x].PROREF, null, referencias, response[0].ofanumenr);
              }
              if (this.defeitos.find(item => item.ref_num == response2[x].PROREF)) {
                //se existir não faz anda
              } else {
                //se não existir insere
              }
            },
            error => {
              console.log(error);
              this.loadingTable = false;
            });
        }
        //}
      },
      error => { console.log(error); this.loadingTable = false; });
  }


  //verifica FAM
  veirificafam(codfam, ref, response = null, referencias, OFANUMENR = null) {
    if (codfam != "" && codfam != null) {
      this.RPCONFFAMILIACOMPService.getcodfam(codfam).subscribe(
        response1 => {
          var count1 = Object.keys(response1).length;
          if (count1 > 0) {
            if (response != null) {
              var perc = null;
              if (response.ZPAVAL != null) {
                perc = parseFloat(String(response.ZPAVAL).replace(",", "."));
              }
              referencias.push({ tipo_PECA: response.PROTYPCOD, PROQTEFMT: response.PROQTEFMT, GESCOD: response.GESCOD, perc_obj: perc, codigo: response.PROREF, design: response.PRODES1 + " " + response.PRODES2, var1: null, var2: null, INDREF: null, OFBQTEINI: null, INDNUMENR: null, tipo: "COMP", comp: true });

              if (this.defeitos.find(item => item.ref_num == response.PROREF)) {
                //se existir não faz anda

              } else {
                //se não existir insere
                this.defeitos.push({
                  tipo_PECA: response.PROTYPCOD, tipo_PECAorder: (response.PROTYPCOD == "COM") ? "COM" : "COMP",
                  tipo: "C", ref_num: response.PROREF, cor: "rgba(255, 255, 0, 0.78)", ref_des: response.PRODES1 + " " + response.PRODES2
                  , quant_of: parseInt(this.defeitos[0].quant_of), quant_boas: 0, quant_def_total: 0, quant_control: 0, comp: true
                });
                this.defeitos = this.defeitos.slice();
                this.defeitos.sort(this.compareFunction2);
                this.defeitos.sort(this.compareFunction);
                var refcomp = [];
                refcomp.push({ tipo_PECA: response.PROTYPCOD, PROQTEFMT: response.PROQTEFMT, GESCOD: response.GESCOD, perc_obj: perc, codigo: response.PROREF, design: response.PRODES1 + " " + response.PRODES2, var1: null, var2: null, INDREF: null, OFBQTEINI: null, INDNUMENR: null, tipo: "COMP", comp: true });

                this.criatabelacomp(this.id_of_cab, this.estado_val, refcomp);
              }
            }
            if (OFANUMENR != null) {
              this.get_filhosprimeiro(OFANUMENR, referencias);
            } else {
              //this.get_filhos(ref, referencias);
              this.loadingTable = false;
            }
          } else {
            this.loadingTable = false;
          }
        },
        error => { console.log(error); this.loadingTable = false; });
    } else if (response.PROTYPCOD == "COM") {
      referencias.push({ tipo_PECA: response.PROTYPCOD, PROQTEFMT: response.PROQTEFMT, GESCOD: response.GESCOD, perc_obj: 0, codigo: response.PROREF, design: response.PRODES1 + " " + response.PRODES2, var1: null, var2: null, INDREF: null, OFBQTEINI: null, INDNUMENR: null, tipo: "COMP", comp: true });

      if (this.defeitos.find(item => item.ref_num == response.PROREF)) {
        //se existir não faz anda

      } else {
        //se não existir insere
        this.defeitos.push({
          tipo_PECA: response.PROTYPCOD, tipo_PECAorder: (response.PROTYPCOD == "COM") ? "COM" : "COMP",
          tipo: "C", ref_num: response.PROREF, cor: "rgba(255, 255, 0, 0.78)", ref_des: response.PRODES1 + " " + response.PRODES2
          , quant_of: parseInt(this.defeitos[0].quant_of), quant_boas: 0, quant_def_total: 0, quant_control: 0, comp: true
        });
        this.defeitos = this.defeitos.slice();
        this.defeitos.sort(this.compareFunction2);
        this.defeitos.sort(this.compareFunction);
        var refcomp = [];
        refcomp.push({ tipo_PECA: response.PROTYPCOD, PROQTEFMT: response.PROQTEFMT, GESCOD: response.GESCOD, perc_obj: 0, codigo: response.PROREF, design: response.PRODES1 + " " + response.PRODES2, var1: null, var2: null, INDREF: null, OFBQTEINI: null, INDNUMENR: null, tipo: "COMP", comp: true });

        this.criatabelacomp(this.id_of_cab, this.estado_val, refcomp);
      }

      this.loadingTable = false;
    } else {
      this.loadingTable = false;
    }

  }


  //pesquisar componentes
  get_filhosprimeiro(OFANUMENR, referencias) {
    this.service.getfilhosprimeiro(OFANUMENR).subscribe(
      response1 => {
        var count1 = Object.keys(response1).length;
        if (count1 > 0) {
          for (var x in response1) {
            this.veirificafam(response1[x].PRDFAMCOD, response1[x].PROREF, response1[x], referencias);
          }
        } else {
          this.loadingTable = false;
        }
      },
      error => { console.log(error); this.loadingTable = false; });
  }

  //pesquisar componentes
  get_filhos(ref, referencias) {
    this.service.getfilhos(ref).subscribe(
      response1 => {
        var count1 = Object.keys(response1).length;
        if (count1 > 0) {
          for (var x in response1) {
            this.veirificafam(response1[x].PRDFAMCOD, response1[x].PROREFCST, response1[x], referencias);
          }
        } else {
          this.loadingTable = false;
        }
      },
      error => { console.log(error); this.loadingTable = false; });
  }


  criatabelacomp(id, estado, proref) {
    var opnum = 1010;

    var rpof = new RP_OF_CAB;
    rpof.data_HORA_CRIA = new Date();
    rpof.estado = estado;
    rpof.id_OF_CAB_ORIGEM = id;
    rpof.of_NUM = null;
    rpof.op_COD = '60';
    rpof.op_NUM = '';// + opnum;
    rpof.op_DES = null;
    rpof.maq_NUM = '000';
    rpof.maq_NUM_ORIG = '000';
    rpof.maq_DES = 'MÃO DE OBRA';
    rpof.id_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["username"];
    rpof.nome_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["name"]
    rpof.of_OBS = null;
    rpof.versao_MODIF = 0;
    rpof.sec_DES = this.sec_des;
    rpof.sec_NUM = this.sec_num;
    rpof.op_PREVISTA = "2";
    rpof.op_COD_ORIGEM = '60';

    this.createRPOFCABComp(rpof, estado, proref)

    //opnum = opnum + 10;
  }

  createRPOFCABComp(rpof, estado, ref) {

    this.RPOFCABService.create(rpof).subscribe(
      res => {
        this.criatabelaRPOFOPCAB(res.id_OF_CAB, estado, true, ref);
      },
      error => console.log(error));
  }


  //criar cabeçalho Operação OF
  criatabelaRPOFOPCAB(id_OF_CAB, estado, comp, ref = null) {

    var rpofopcab = new RP_OF_OP_CAB;
    rpofopcab.id_OF_CAB = id_OF_CAB;
    this.RPOFOPCABService.create(rpofopcab).subscribe(
      res => {

        if (comp) {
          this.criatabelaRPOFOPLIN(res.id_OP_CAB, comp, ref);
        } else {
          /* this.criartabelaRPOPFUNC(res.id_OP_CAB, estado, comp);
           this.criatabelaRPOFOPLIN(res.id_OP_CAB, comp, ref);*/
        }
      },
      error => console.log(error));


  }

  criatabelaRPOFOPLIN(id_OP_CAB, comp, refcomp) {
    var ref = refcomp[0];
    var rpofoplin = new RP_OF_OP_LIN;
    rpofoplin.proqtefmt = (ref.PROQTEFMT == "1") ? true : false;
    rpofoplin.tipo_PECA = ref.tipo_PECA;
    rpofoplin.id_OP_CAB = id_OP_CAB;
    rpofoplin.ref_NUM = ref.codigo;
    rpofoplin.ref_DES = ref.design;
    rpofoplin.ref_IND = ref.INDREF;
    rpofoplin.ref_VAR1 = ref.var1;
    rpofoplin.ref_VAR2 = ref.var2;
    rpofoplin.quant_BOAS_TOTAL = 0;
    rpofoplin.quant_DEF_TOTAL = 0;
    rpofoplin.quant_BOAS_TOTAL_M1 = 0;
    rpofoplin.quant_DEF_TOTAL_M1 = 0;
    rpofoplin.quant_BOAS_TOTAL_M2 = 0;
    rpofoplin.quant_DEF_TOTAL_M2 = 0;
    rpofoplin.quant_OF = parseInt(this.defeitos[0].quant_of);
    rpofoplin.perc_OBJETIV = ref.perc_obj;
    rpofoplin.ref_INDNUMENR = ref.INDNUMENR;
    rpofoplin.gescod = ref.GESCOD;
    this.insereref(rpofoplin, true);
  }

  insereref(rpofoplin, comp) {
    this.RPOFOPLINService.create(rpofoplin).subscribe(
      res => {
      },
      error => console.log(error));
  }

  abrirlista(ref, design) {
    this.impressao_selected = [];
    this.PROREF = ref;
    this.referencia = ref + "-" + design;
    this.lista_impressao = [];
    this.ofService.consulta_Impressao(ref).subscribe(result => {
      var countx = Object.keys(result).length;

      if (countx > 0) {
        for (var x in result) {
          this.lista_impressao.push({
            ARMAZEM: result[x].ARMAZEM,
            DATA: result[x].DATA,
            DESREF: result[x].DESREF,
            LOCAL: result[x].LOCAL,
            LOTE: result[x].LOTE,
            NUMETIQ: result[x].NUMETIQ,
            QUANT: result[x].QUANT,
            REF: result[x].REF
          })
        }
      }
      this.lista_impressao = this.lista_impressao.slice();
      this.display_lista = true;

    }, error => {
      console.log(error);
      this.display_lista = true;
    });
  }

  pesquisalote(lote, index) {
    if (lote != "" && lote != null) {
      this.caixasincoompletas[index].disabled = true;
      lote = lote + "";
      if (lote.substr(0, 1).toUpperCase() == "S") lote = lote.substring(1);
      var etiqueta = "0000000000" + lote;
      if (this.caixasincoompletas.find(item => item.id != this.caixasincoompletas[index].id && item.numero == etiqueta.substring(etiqueta.length - 10))) {
        this.mensagem_caixa = "Etiqueta já foi inserida!";
        this.apagarlinhacaixa(index);
        this.display_alerta_caixas = true;
        this.caixasincoompletas[index].disabled = false;
      } else {
        this.service.getEtiquetacaixas(etiqueta.substring(etiqueta.length - 10)).subscribe(
          response => {
            var count = Object.keys(response).length;
            if (count > 0) {
              var ref = response[0].PROREF;
              if (ref == null) ref = response[0].PROREFCOMP;

              if (!this.defeitos.find(item => item.ref_num == ref)) {
                this.mensagem_caixa = "Etiqueta não pertence a nenhuma Referência!";
                this.display_alerta_caixas = true;
                this.caixasincoompletas[index].disabled = false;
                this.apagarlinhacaixa(index)
              } else if (this.defeitos.find(item => item.ref_num == ref && item.tipo != "PF")) {
                this.mensagem_caixa = "Etiquetas só para a Referência Principal!";
                this.display_alerta_caixas = true;
                this.caixasincoompletas[index].disabled = false;
                this.apagarlinhacaixa(index)
              } else {
                this.caixasincoompletas[index].produto = response[0].PROREF;
                this.caixasincoompletas[index].qtd = response[0].ETQEMBQTE;
                this.caixasincoompletas[index].numero = etiqueta.substring(etiqueta.length - 10);
                this.verificaqtd(response[0].PROREF, index);
              }
            } else {
              this.mensagem_caixa = "Etiqueta não foi encontrada!";
              this.display_alerta_caixas = true;
              this.caixasincoompletas[index].disabled = false;
            }

          }, error => {
            this.caixasincoompletas[index].disabled = false;
            console.log(error);
          });
      }
    }
  }

  verificaqtd(proref, index) {
    var array_count = [];
    var arrayref_count = [];
    /*for (var y in this.defeitos) {
      arrayref_count[this.defeitos[y].ref_num] = 0;

      for (var t in this.caixasincoompletas) {
        if (this.caixasincoompletas[t].produto == this.defeitos[y].ref_num) arrayref_count[this.defeitos[y].ref_num]++;
        if (arrayref_count[this.defeitos[y].ref_num] == 5) array_count.push("Máximo de Etiquetas de caixas incompletas da Referência " + this.defeitos[y].ref_num + " atingido")

      }
    }*/

    arrayref_count[proref] = 0;

    for (var t in this.caixasincoompletas) {
      if (arrayref_count[proref] == 5) array_count.push("Máximo de Etiquetas de caixas incompletas da Referência " + proref + " atingido");
      if (this.caixasincoompletas[t].produto == proref) arrayref_count[proref]++;
    }


    if (array_count.length > 0) {
      this.display_alerta_caixas = true;
      this.mensagem_caixa = array_count.toString().replace(",", "<br>");
      this.apagarlinhacaixa(index)
    } else {
      this.caixa_linha();
    }
  }

  adicionarcaixas() {

    this.caixasincoompletas = [];
    /*array_count.push("Máximo de Etiquetas de caixas incompletas da Referência " + this.defeitos[y].ref_num + " atingido")
    array_count.push("Máximo de Etiquetas de caixas incompletas da Referência " + this.defeitos[y].ref_num + " atingido")*/

    this.RPCAIXASINCOMPLETASService.getbyid_of_cab(this.id_of_cab).subscribe(
      response => {
        for (var x in response) {
          this.caixasincoompletas.push({
            id_CAIXA_INCOMPLETA: response[x].id_CAIXA_INCOMPLETA, id: "idd" + response[x].id_CAIXA_INCOMPLETA, numero: response[x].etqnum, produto: response[x].ref_NUM, qtd: response[x].quant_ETIQUETA,
            unidade: response[x].unidade, disabled: true
          });
        }
        if (!this.modoedicao) {
          this.caixa_linha();
        } else {
          this.display_caixa = true;

        }
      }, error => {
        if (!this.modoedicao) {
          this.caixa_linha();
        } else {
          this.display_caixa = true;

        }
        console.log(error);
      });

  }

  caixa_linha() {
    this.templinha++;
    this.caixasincoompletas.push({
      id: "id" + this.templinha, numero: "", produto: "", qtd: "", unidade: "", disabled: false, descricao: "", id_CAIXA_INCOMPLETA: null
    });
    this.display_caixa = true;
    setTimeout(() => {
      this.inputfocus("id" + this.templinha);
    }, 30);
  }


  guardarcaixasincompletas() {

    if (this.caixasincoompletas.length > 0) {
      for (var x in this.caixasincoompletas) {
        if (this.caixasincoompletas[x].id_CAIXA_INCOMPLETA == null && this.caixasincoompletas[x].numero != "" && this.caixasincoompletas[x].numero != null) {
          var caixa = new RP_CAIXAS_INCOMPLETAS;
          caixa.id_OF_CAB = this.id_of_cab;
          caixa.utz_CRIA = this.user;
          caixa.data_CRIA = new Date;
          caixa.etqnum = this.caixasincoompletas[x].numero;
          caixa.unidade = this.caixasincoompletas[x].unidade;
          caixa.quant_ETIQUETA = this.caixasincoompletas[x].qtd * 1;
          caixa.ref_NUM = this.caixasincoompletas[x].produto;
          this.insertcaixa(caixa);
        }
      }
      this.display_caixa = false;
    } else {
      this.display_caixa = false;
    }

  }

  insertcaixa(caixa) {
    this.RPCAIXASINCOMPLETASService.create(caixa).subscribe(
      res => {
      }, error => {
      });
  }

  inputfocus(id) {
    if (id == null) id = this.caixasincoompletas[this.caixasincoompletas.length - 1].id;
    let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('#tabelacaixas>tbody>tr>td #' + id + '')[0];
    inputField && inputField.focus();
  }

  addlinhacaixa() {
    this.caixasincoompletas = [];
  }

  apagarlinhacaixa(index) {
    if (this.caixasincoompletas[index].id_CAIXA_INCOMPLETA != null) {
      this.RPCAIXASINCOMPLETASService.delete(this.caixasincoompletas[index].id_CAIXA_INCOMPLETA).then(
        res => {
          this.caixasincoompletas.splice(index, 1)
        }, error => {
        });
    } else {
      this.caixasincoompletas.splice(index, 1);
    }

    if (this.caixasincoompletas.length == 0) {
      this.caixa_linha();
    } else if (!this.caixasincoompletas.find(item => item.disabled == false)) {
      this.caixa_linha();
    }
  }

  informa_armazem() {
    if (this.impressao_selected.length == 0) {
      this.display_alertaerro = true;
      this.mensagem_erro = "Seleccione uma linha!";
    } else {
      //console.log(this.impressao_selected)
      this.msgs = [];
      for (var x in this.impressao_selected) {
        var linha = new ST_PEDIDOS;
        linha.armazem = this.impressao_selected[x].ARMAZEM;
        linha.local = this.impressao_selected[x].LOCAL;
        linha.data_CRIA = new Date();
        linha.utz_CRIA = this.user;
        linha.proref = this.impressao_selected[x].REF;
        linha.descricao = this.impressao_selected[x].DESREF;
        linha.lote = this.impressao_selected[x].LOTE;
        linha.etqnum = this.impressao_selected[x].NUMETIQ;
        linha.quant = (this.impressao_selected[x].QUANT) * 1;

        linha.ip_POSTO = this.getCookie("IP_CLIENT");
        linha.cod_SECTOR_OF = this.sec_num;
        linha.des_SECTOR_OF = this.sec_des;
        //console.log(linha)

        this.insertPEDIDO(linha);
      }
      this.display_lista = false;
    }
  }

  insertPEDIDO(linha) {
    this.STPEDIDOSService.create(linha).subscribe(
      res => {
        this.msgs.push({ severity: 'success', summary: 'Info', detail: 'Armazém Informado. Ref.: ' + linha.proref });
      }, error => {
        this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Erro ao Informar Armazém. Ref.: ' + linha.proref });
      });
  }

  imprimir() {

    var filename = new Date().toLocaleString().replace(/\D/g, '');
    this.ofService.downloadPDF("pdf", filename, this.PROREF, "consulta_FIFOS").subscribe(
      (res) => {
        this.fileURL = URL.createObjectURL(res);
        //this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL); ´

        this.ofService.getIMPRESORA(this.getCookie("IP_CLIENT")).subscribe(
          (res2) => {

            var count = Object.keys(res2).length;

            if (count > 0 && res2[0][3] != "" && res2[0][3] != null) {
              this.ofService.imprimir(filename, res2[0][3]).subscribe(
                response => {
                  //enviado para impressora
                }, error => {
                  //console.log(error.status);

                  console.log(error._body);
                });

            } else {
              var iframe;
              if (!iframe) {
                iframe = document.createElement('iframe');
                document.body.appendChild(iframe);

                iframe.style.display = 'none';
                iframe.onload = function () {
                  setTimeout(function () {
                    iframe.focus();
                    iframe.contentWindow.print();
                  }, 1);
                };
              }
              iframe.src = this.fileURL;
            }
          }, error => console.log(error));
      }
    );
  }

  //ver cookies
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
}
