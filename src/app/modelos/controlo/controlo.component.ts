import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { DataTable, OverlayPanel } from "primeng/primeng";
import { CalendarModule } from 'primeng/primeng';
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { Router } from '@angular/router';
import { GEREVENTOService } from 'app/modelos/services/ger-evento.service';
import { GER_EVENTO } from 'app/modelos/entidades/GER_EVENTO';
import { utilizadorService } from '../../utilizadorService';
import { AppGlobals } from 'webUrl';
import { ofService } from '../../ofService';

@Component({
  selector: 'app-controlo',
  templateUrl: './controlo.component.html',
  styleUrls: ['./controlo.component.css'],
  animations: [
    trigger('movementtrigger', [
      state('firstpos', style({ transform: 'translateX(0)' })),
      state('secondpos', style({ transform: 'translateX(100%)', display: 'none' })),
      transition('firstpos => secondpos', [
        animate('300ms ease-in')
      ]),
      transition('secondpos => firstpos', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class ControloComponent implements OnInit {
  campos: any;
  results: any[];
  multiSortMeta = null;
  filtro: boolean;
  seccao = [];
  sec_num_user: any;
  seccoes = [];
  estado: any;
  mensagens: any[];
  displaymensagem: boolean;
  count3 = 0;
  hiddenvermais: boolean;
  count2: any;
  start_row = 0;
  pesquisa = null;
  num_rows; listauser: any[];
  listaglobal: any[];
  atualizacao: boolean = true;
  count: any = 0;
  dados_old: any[];
  dados: any[] = [];
  items = 25;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  tabela: any[] = [];
  input_pesquisa = "";
  selectedCar2 = "";
  state: string = 'secondpos';
  adicionaop = true;
  date1;
  date2;
  date3;
  date4;
  rowData;
  checked: boolean = false;
  estados = [/*{ label: "--", value: null },*/ { label: "Concluido", value: "'C'" }, { label: "Execução", value: "'E'" },
  { label: "Modificado", value: "'M'" }, { label: "Pausa", value: "'S'" }, { label: "Anulado", value: "'A'" }, { label: "Preparação", value: "'P'" }, { label: "Em Edição", value: "'R'" }];

  constructor(private ofservice: ofService, private AppGlobals: AppGlobals, private service: utilizadorService, private GEREVENTOService: GEREVENTOService, private router: Router, private RPOFOPLINService: RPOFOPLINService, private RPOFCABService: RPOFCABService) { }

  ngOnInit() {
    this.count2 = 0;
    this.pesquisa = [];
    this.num_rows = this.items;

    this.sec_num_user = JSON.parse(localStorage.getItem('sec_num_user'));
    var secarray = this.sec_num_user.split(",");
    this.service.getSeccoes().subscribe(
      response => {
        for (var x in response) {
          if (secarray.find(item => item == "'" + response[x].SECCOD + "'")) {
            this.seccoes.push({ label: response[x].SECCOD + " - " + response[x].SECLIB, value: response[x].SECCOD });
          } else if (this.sec_num_user == "ADMIN") {
            this.seccoes.push({ label: response[x].SECCOD + " - " + response[x].SECLIB, value: response[x].SECCOD });
          }
        }
        this.seccoes = this.seccoes.slice();

        if (this.AppGlobals.getfiltros("seccao")) { this.seccao = this.AppGlobals.getfiltros("seccao"); }
        if (this.AppGlobals.getfiltros("estado")) { this.estado = this.AppGlobals.getfiltros("estado"); }
        if (this.AppGlobals.getfiltros("pesquisa")) { this.pesquisa = this.AppGlobals.getfiltros("pesquisa"); }

        var count = 0;
        for (var n in this.pesquisa) {
          if (this.pesquisa[n] != "" && this.pesquisa[n] != null) {
            count++;
          }
        }

        if ((this.estado != null && this.estado != "") || count > 0) {
          this.aplicar();
        } else {
          this.inicia();
        }


      },
      error => console.log(error));

    var input_pesquisa = this.AppGlobals.getfiltros("input_pesquisa");
    if (input_pesquisa != null) { this.input_pesquisa = input_pesquisa; }

    setInterval(() => { if (this.checked) this.atualiza(); }, 60000);

  }

  //atualiza filtro pesquisa
  filtro_pesquisa() {
    this.AppGlobals.setfiltros("input_pesquisa", this.input_pesquisa);
  }

  atualizasec() {

    this.dataTableComponent.reset();
    this.start_row = 0;
    this.num_rows = this.items;
    this.hiddenvermais = false;
    this.dados = [];
    this.count3 = 0;

    if (this.seccao.length > 0) {
      var secc_n = [];
      for (var x in this.seccao) {
        secc_n.push("'" + this.seccao[x] + "'")
      }
      this.sec_num_user = secc_n.toString();
      this.AppGlobals.setfiltros("seccao", this.seccao);
    } else {
      this.sec_num_user = JSON.parse(localStorage.getItem('sec_num_user'));
    }

    var count = 0;
    for (var n in this.pesquisa) {
      if (this.pesquisa[n] != "" && this.pesquisa[n] != null) {
        count++;
      }
    }

    if ((this.estado != null && this.estado != "") || count > 0) {
      this.aplicar();
    } else {
      this.inicia();
    }

  }

  inicia() {
    this.filtro = false;
    if (this.atualizacao) {
      this.atualizacao = false;
      this.dados_old = this.dados;
      //this.dados = [];
      //this.items = 10;
      this.RPOFCABService.getAll(this.sec_num_user).subscribe(
        res => {
          this.count = 0;
          var total = Object.keys(res).length;
          if (total > 0) {
            if (this.start_row >= total) this.start_row = total;
            if (this.num_rows >= total) { this.num_rows = total; this.hiddenvermais = true; }

            for (var y = this.start_row; y < this.num_rows; y++) {
              if (res[y][0].id_OF_CAB_ORIGEM == null) {
                this.preenchetabela(this.count2, this.num_rows, res, y, this.count)
                this.count++;
                this.count2++;
              }
            }
          } else {
            this.tabela = [];
            this.hiddenvermais = true;
            this.atualizacao = true;
          }
        },
        error => {
          console.log(error);
          this.hiddenvermais = true;
          this.atualizacao = true;
        });

    }
  }


  preenchetabela(count2, total, res, y, count) {

    this.RPOFOPLINService.getAllbyid(res[y][1].id_OP_CAB).subscribe(
      response => {
        var artigos = [];
        var refs = [];
        var qtd_of = [];
        var qtd_boas = [];
        var total_def = [];
        var perc_def = [];
        var perc_obj = [];
        var perc_def_val = 0;
        var perc_obj_val = 0;
        var inser = false;
        //var estado = "";

        var cor_of = "green";

        for (var x in response) {
          // var cor_of = "green";
          var cor_tempo_prod = "green";
          var cor_estado = "green";
          var cor_qtd_of = "";
          var cor_total_def = "";
          var cor_perc_def = "";
          var val_perc_def = 0;

          //Amarelo se Quantidade Boas + Total de defeitos > Quantidade OF;
          if ((response[x][0].quant_BOAS_TOTAL_M2 + response[x][0].quant_DEF_TOTAL_M2) > response[x][0].quant_OF) {
            cor_qtd_of = "yellow";
            cor_estado = "yellow";
            if (cor_of != "red") cor_of = "yellow";
          }

          //Total Defeitos e % Defeitos: Amarelo se % Defeitos >= % Objetivos;
          val_perc_def = (response[x][0].quant_DEF_TOTAL_M2 / (response[x][0].quant_BOAS_TOTAL_M2 + response[x][0].quant_DEF_TOTAL_M2)) * 100;
          //val_perc_def = ((response[x][0].quant_DEF_TOTAL_M2 * 100) / response[x][0].quant_OF_M2) || 0;
          if (isNaN(val_perc_def)) val_perc_def = 0;

          var val = response[x][0].perc_OBJETIV;
          if (val == null) val = 0;

          if (val_perc_def == val) {
           // cor_total_def = "yellow";
           // cor_perc_def = "yellow";
           // if (cor_of != "red") cor_of = "yellow";

          }

          if (val_perc_def > val) {
            cor_total_def = "red";
            cor_perc_def = "red";
            cor_of = "red";

          }

          var hora1 = new Date(res[y][2].data_INI_M2 + "," + res[y][2].hora_INI_M2.slice(0, 5))
          var hora2 = new Date();

          var timedif1 = hora2.getTime() - hora1.getTime();
          //Estado: Amarelo se pelo menos 1 dos campos anteriores estiver a amarelo; Vermelho se tempo de produção tiver a vermelho ou estado = Eliminado;
          //Vermelho se data/hora início a mais de 16h e ainda não foi registada a data/hora de fim;
          if (timedif1 > 57600000 && res[y][1].tempo_EXEC_TOTAL_M2 == null) {
            cor_tempo_prod = "red";
            cor_estado = "red";
            cor_of = "red";
          }
          /*
            var tempo = res[y][1].tempo_EXEC_TOTAL;
            var splitted_pausa = tempo.split(":", 3);
            var total_tempo = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
          */

          //Amarelo se tempo menor de 15 minutos ou maior que 8 horas;
          if ((timedif1 < 900000 || timedif1 > 28800000 && timedif1 < 57600000) && res[y][1].tempo_EXEC_TOTAL_M2 == null) {
            cor_tempo_prod = "yellow";
            cor_estado = "yellow";
            if (cor_of != "red") cor_of = "yellow";
          }

          artigos.push(response[x][0].ref_DES.substring(0, 32));
          refs.push(response[x][0].ref_NUM);
          qtd_of.push({ value: response[x][0].quant_OF, cor: cor_qtd_of });
          qtd_boas.push(response[x][0].quant_BOAS_TOTAL_M2);
          total_def.push({ value: response[x][0].quant_DEF_TOTAL_M2, cor: cor_total_def });
          perc_def.push({ value: (val_perc_def.toFixed(2)).toLocaleString() + "%", cor: cor_perc_def });
          var perc = 0;
          if (response[x][0].perc_OBJETIV != null) {
            perc = response[x][0].perc_OBJETIV;
          }
          perc_obj.push(perc.toFixed(2).toLocaleString() + "%");
        }

        this.RPOFCABService.getRP_OF_CABbyid(res[y][0].id_OF_CAB).subscribe(
          res5 => {

            this.inserelinhas(count2, total, count, res5, res, y, response, x, refs, artigos, qtd_of, qtd_boas, total_def, perc_def, perc_obj, cor_of, cor_tempo_prod, cor_estado);

          },
          error => console.log(error));


      },
      error => console.log(error));
  }

  inserelinhas(count2, total, count, res5, res, y, response, x, refs, artigos, qtd_of, qtd_boas, total_def, perc_def, perc_obj, cor_of, cor_tempo_prod, cor_estado) {
    var estado = [];

    var dtfim = [];
    var hfim = [];
    var dt_inicio = [];
    var hora_inicio = [];
    var func = [];
    var qtd_func = 0;
    var tempo_prod = [];


    for (var n in res5) {
      var cor_tempo_prod1 = "green";
      if (res5[n][1].data_FIM_M2 != null) var dtfim2 = this.formatDate(res5[n][1].data_FIM_M2);
      if (res5[n][1].hora_FIM_M2 != null) var hfim2 = res5[n][1].hora_FIM_M2.slice(0, 5);

      dtfim.push(dtfim2);
      hfim.push(hfim2);
      dt_inicio.push(this.formatDate(res5[n][1].data_INI_M2));
      hora_inicio.push(res5[n][1].hora_INI_M2.slice(0, 5));



      var hora1 = new Date(res5[n][1].data_INI_M2 + "," + res5[n][1].hora_INI_M2.slice(0, 5));
      var hora2 = null;
      if (res5[n][1].data_FIM_M2 == null) {
        hora2 = new Date();
      } else {
        hora2 = new Date(dtfim2 + "," + hfim2);
      }

      var timedif1 = hora2.getTime() - hora1.getTime();
      //Estado: Amarelo se pelo menos 1 dos campos anteriores estiver a amarelo; Vermelho se tempo de produção tiver a vermelho ou estado = Eliminado;
      //Vermelho se data/hora início a mais de 16h e ainda não foi registada a data/hora de fim;
      if (timedif1 > 57600000 && res5[n][0].tempo_EXEC_TOTAL_M2 == null) {
        cor_tempo_prod1 = "red";
        cor_estado = "red";
        cor_of = "red";
      }
      //Amarelo se tempo menor de 15 minutos ou maior que 8 horas;
      if ((timedif1 < 900000 || timedif1 > 28800000) && res5[n][0].tempo_EXEC_TOTAL_M2 != null) {
        cor_tempo_prod1 = "yellow";
        cor_estado = "yellow";
        if (cor_of != "red") cor_of = "yellow";
      }
      func.push(res5[n][1].id_UTZ_CRIA + ' - ' + (res5[n][1].nome_UTZ_CRIA).substring(0, 14));

      if (res5[n][1].data_FIM_M2 == null) qtd_func++;
      tempo_prod.push({ tempo: res5[n][0].tempo_EXEC_TOTAL_M2, cor: cor_tempo_prod1 });

      if (res5[n][1].estado == 'C') estado.push("Concluido");
      if (res5[n][1].estado == 'I') estado.push("Iniciado");
      if (res5[n][1].estado == 'M') estado.push("Modificado");
      if (res5[n][1].estado == 'S') estado.push("Pausa");
      if (res5[n][1].estado == 'E') estado.push("Execução");
      if (res5[n][1].estado == 'P') estado.push("Preparação");
      if (res5[n][1].estado == 'R') estado.push("Em Edição");

      if (res5[n][1].estado == 'A') {
        estado.push("Anulado");
        cor_estado = "red";
        cor_of = "red";
      }

    }




    var total_lidas = false;
    if (res[y][3] == res[y][4]) total_lidas = true;

    this.dados.push({
      pos: count2,
      id_of_cab: res[y][0].id_OF_CAB,
      of: res[y][0].of_NUM,
      operacao: res[y][0].op_COD_ORIGEM + " - " + res[y][0].op_DES.trim(),
      maquina: res[y][0].maq_NUM + ' - ' + res[y][0].maq_DES,
      func: func,
      id_func: res[y][2].id_UTZ_CRIA,
      qtd_func: qtd_func,
      ref: refs,
      artigo: artigos,
      dt_inicio: dt_inicio,
      hora_inicio: hora_inicio,
      dt_fim: dtfim,
      hora_fim: hfim,
      tempo_prod: tempo_prod,
      qtd_of: qtd_of,
      qtd_boas: qtd_boas,
      total_def: total_def,
      perc_def: perc_def,
      perc_obj: perc_obj,
      estado: estado,
      cor_of: cor_of,
      //cor_tempo_prod: cor_tempo_prod1,
      cor_estado: cor_estado,
      total_lidas: total_lidas,
      mensagens: res[y][3]
    });
    this.count3++;
    if (this.count3 == this.num_rows) {
      this.atualizacao = true;
      if (this.dados.find(item => item.pos == count)) {
        this.dados.find(item => item.pos == count).cor_estado = cor_estado;
        this.dados.find(item => item.pos == count).cor_of = cor_of;
      }

      this.tabela = this.dados;
      this.tabela = this.tabela.slice();


      this.ordernar();

      var sorttab = this.AppGlobals.getfiltros("sorttabela");

      this.multiSortMeta = null;
      if (sorttab && sorttab.length > 0) {
        this.multiSortMeta = [];
        for (var v in sorttab) {
          //this.multiSortMeta.push({ field: sorttab[v].field, order: sorttab[v].order });
          this.dataTableComponent.sortField = sorttab[v].field;
          this.dataTableComponent.sortOrder = sorttab[v].order;
        }

      }


    }


  }

  apaga() {
    this.dataTableComponent.reset();
    this.input_pesquisa = "";
    this.multiSortMeta = [];
    this.AppGlobals.setfiltros("sorttabela", "limpar");
    this.AppGlobals.setfiltros("input_pesquisa", null);
    this.dataTableComponent.value = this.tabela;
    this.dataTableComponent.reset();

  }

  atualiza() {
    this.input_pesquisa = "";
    this.dataTableComponent.reset();
    this.start_row = 0;
    this.num_rows = this.items;
    this.hiddenvermais = false;
    this.dados = [];
    this.count3 = 0;

    var count = 0;
    for (var n in this.pesquisa) {
      if (this.pesquisa[n] != "" && this.pesquisa[n] != null) {
        count++;
      }
    }

    if (count > 0 || (this.estado != null && this.estado != "")) {
      this.aplicar();
    } else {
      this.inicia();
    }

  }

  onRowSelect(event) {

  }

  //ao clicar no pesquisa avançada 
  togglestates() {
    this.state = (this.state === 'firstpos' ? 'secondpos' : 'firstpos');
    this.adicionaop = true;
  }

  //ao clicar no botão fechar pesquisa avançada 
  closepesquisa() {
    this.state = (this.state === 'firstpos' ? 'secondpos' : 'firstpos');
    this.adicionaop = false;
  }
  //esconde a tabela
  ontogglestates(e) {
    var combo = false;
    if (e.srcElement.parentElement) {
      if (e.srcElement.parentElement.className.search("ui-dropdown-ite") != 0 && e.srcElement.parentElement.className.search("ui-autocomplete-token") != 0) {
        combo = true;
      }
    }
    if (combo) {
      if (this.adicionaop == false) {
        this.state = 'secondpos';
        this.adicionaop = true;
      } else {
        this.adicionaop = false;
      }
    }
  }

  //limpar filtros pesquisa avançada
  limpar() {
    this.estado = null;
    this.pesquisa = [];
    this.atualiza();
    this.AppGlobals.limpaFiltros();
    /*var dirtyFormID = 'formArranque';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();*/
  }

  //aplicar filtro pesquisa avançada
  aplicar(atualiza = false) {
    if (atualiza) {
      this.start_row = 0;
      this.num_rows = this.items;
      this.input_pesquisa = "";
      this.dataTableComponent.reset();

      this.dados = [];
      this.count3 = 0;

    }

    this.hiddenvermais = false;
    this.filtro = true;
    var data = [];
    var innerObj = {};

    this.AppGlobals.setfiltros("pesquisa", this.pesquisa);

    for (var n in this.pesquisa) {
      if (this.pesquisa[n] != "" && this.pesquisa[n] != null) {
        if (n.match("date")) {
          innerObj[n] = new Date(this.pesquisa[n]).toLocaleDateString();
        } else if (n == "ordenacao") {
          var ord = []
          for (var v in this.pesquisa[n]) {
            ord.push(this.campos.find(item => item.nome == this.pesquisa[n][v].nome).value)
          }
          innerObj[n] = ord.toString();
        } else {
          innerObj[n] = this.pesquisa[n];
        }
      }

    }
    if (this.seccao.length > 0) {
      var secc_n = [];
      for (var x in this.seccao) {
        secc_n.push("'" + this.seccao[x] + "'")
      }
      innerObj["sec_num"] = secc_n.toString();
      this.AppGlobals.setfiltros("seccao", this.seccao);
    } else {
      innerObj["sec_num"] = JSON.parse(localStorage.getItem('sec_num_user'));
    }

    if (this.estado && this.estado != "" && this.estado != null) {
      innerObj["estado"] = this.estado.toString();
      this.AppGlobals.setfiltros("estado", this.estado);
    }
    data.push(innerObj)
    if (this.atualizacao) {
      this.atualizacao = false;
      this.dados_old = this.dados;
      //this.dados = [];
      //this.items = 10;

      this.RPOFCABService.pesquisa_avancada(data).subscribe(
        res => {
          this.count = 0;
          var total = Object.keys(res).length;
          if (total > 0) {
            if (this.start_row >= total) this.start_row = total;
            if (this.num_rows >= total) { this.num_rows = total; this.hiddenvermais = true; }
            for (var y = this.start_row; y < this.num_rows; y++) {
              if (res[y][0].id_OF_CAB_ORIGEM == null) {
                this.preenchetabela(this.count2, this.num_rows, res, y, this.count)
                this.count++;
                this.count2++;
              }
            }
          } else {
            this.hiddenvermais = true;
            this.atualizacao = true;
            this.tabela = [];
          }
        },
        error => {
          console.log(error);
          this.atualizacao = true;
        });

    }
  }

  //ordernar tabela
  ordernar() {
    this.tabela.sort((n1, n2) => {
      if (n1.pos > n2.pos) {
        return 1;
      }

      if (n1.pos < n2.pos) {
        return -1;
      }

      return 0;
    });
  }

  //ver mais dados
  vermais() {
    /* this.items += this.num_rows;
     if (this.dados_old.length == 0) {
       this.tabela = this.dados.slice(0, this.items);
     } else {
       this.tabela = this.dados_old.slice(0, this.items);
     }
     this.ordernar();*/
    this.num_rows += this.items;
    this.start_row += this.items;

    var count = 0;
    for (var n in this.pesquisa) {
      if (this.pesquisa[n] != "" && this.pesquisa[n] != null) {
        count++;
      }
    }
    if ((this.estado != null && this.estado != "") || count > 0) {
      this.aplicar();
    } else {
      this.inicia();
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


  onRowDblclick(event) {

    localStorage.setItem('id_of_cab', JSON.stringify((event.data.id_of_cab)));

    this.router.navigate(['./operacao-em-curso'], { queryParams: { id: event.data.id_func } });
  }


  //abrir popup de mensagens
  ver_mensagens(id, pos) {
    this.displaymensagem = true;
    document.getElementById("page_html").style.overflow = 'hidden';
    this.mensagens = [];
    this.GEREVENTOService.getbyidorigem(id, "ID_OF_CAB").subscribe(result => {
      for (var x in result) {
        var data = new Date(result[x].data_HORA_CRIA).toLocaleString();
        this.mensagens.push({ nome: result[x].nome_UTZ_CRIA, data: data, mensagem: result[x].mensagem, assunto: result[x].assunto });
        if (result[x].estado == "C") {
          this.marcarMensagemLida(result[x]);
        }
      }

      this.dados.find(item => item.pos == pos).total_lidas = true;
    },
      error => {
        console.log(error);
      });

    //this.verifica();
  }



  //marcar mensagens por ler como lidas
  marcarMensagemLida(mensagem) {
    var mensag = new GER_EVENTO;
    var userid = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    mensag = mensagem;
    mensag.estado = "L";
    mensag.id_UTZ_LEITURA = userid;
    mensag.nome_UTZ_LEITURA = nome;
    mensag.data_HORA_LEITURA = new Date();
    this.GEREVENTOService.update(mensag);
  }


  //ao fecahr popup
  fechar() {
    document.getElementById("page_html").style.overflow = 'auto';
  }


  sortabela(event) {
    this.AppGlobals.setfiltros("sorttabela", event);
  }

  search(event) {
    let query = event.query;
    var campos = [{ nome: "Data Início", value: "c.DATA_INI_M2" },
    { nome: "Data Início Desc", value: "c.DATA_INI_M2 desc" },
    { nome: "Hora Início", value: "c.HORA_INI_M2" },
    { nome: "Hora Início Desc", value: "c.HORA_INI_M2 desc" },
    { nome: "Data Fim", value: "c.DATA_FIM_M2" },
    { nome: "Data Fim Desc", value: "c.DATA_FIM_M2 desc" },
    { nome: "Hora Fim", value: "c.HORA_FIM_M2 desc" },
    { nome: "Hora Fim Desc", value: "c.HORA_FIM_M2 desc" },
    { nome: "Estado", value: "c.ESTADO" },
    { nome: "Estado Desc", value: "c.ESTADO desc" },
    { nome: "OF", value: "a.OF_NUM" },
    { nome: "OF Desc", value: "a.OF_NUM desc" },
    { nome: "Número Operação", value: "a.OP_COD_ORIGEM" },
    { nome: "Número Operação Desc", value: "a.OP_COD_ORIGEM desc" },
    { nome: "Operação", value: "a.OP_DES" },
    { nome: "Operação Desc", value: "a.OP_DES desc" },
    { nome: "Máquina", value: "a.MAQ_DES" },
    { nome: "Máquina Desc", value: "a.MAQ_DES desc" },
    { nome: "Número Máquina", value: "a.MAQ_NUM" },
    { nome: "Número Máquina Desc", value: "a.MAQ_NUM desc" },
    { nome: "Funcionário", value: "c.NOME_UTZ_CRIA" },
    { nome: "Funcionário Desc", value: "c.NOME_UTZ_CRIA desc" },
    { nome: "Número Funcionário", value: "c.ID_UTZ_CRIA" },
    { nome: "Número Funcionário Desc", value: "c.ID_UTZ_CRIA desc" },
    { nome: "Tempo Produção", value: "h.TEMPO_EXEC_TOTAL_M2" },
    { nome: "Tempo Produção Desc", value: "h.TEMPO_EXEC_TOTAL_M2 desc" },
    { nome: "Referência", value: "a.REF_NUM" },
    { nome: "Referência Desc", value: "a.REF_NUM desc" },
    { nome: "Nome Referência", value: "a.REF_DES" },
    { nome: "Nome Referência Desc", value: "a.REF_DES desc" },
    { nome: "Estado", value: "c.ESTADO" },
    { nome: "Estado Desc", value: "c.ESTADO desc" }];
    this.campos = campos;
    this.results = this.filterCountry(query, campos);
  }

  filterCountry(query, campos: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < campos.length; i++) {
      let campo = campos[i];

      var nome = campo.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      var query2 = query.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      if (nome.toLowerCase().match(query2.toLowerCase())) {
        filtered.push(campo);
      }
    }
    return filtered;
  }

  onSelectcampo(event) {
    if (this.pesquisa.ordenacao.find(item => item.nome.replace("Desc", "").trim().toLowerCase() == event.nome.replace("Desc", "").trim().toLowerCase() && item.nome != event.nome)) {
      this.pesquisa.ordenacao.splice(this.pesquisa.ordenacao.length - 1, 1)
    }

  }

  //mostra analise rápida sobre o utilizador e aquela ref/of/operacao
  analiserapida(event, id, overlaypanel: OverlayPanel) {
    /*var data = [];
    this.ofservice.getANALISERAPIDA(data).subscribe(
      response => {
        console.log(response)
      },
      error => console.log(error));
     this.listauser = [{user:"001",data:"Atual",valor:12},{user:"001",data:"1 Mês",valor:200},{user:"001",data:"3 Meses",valor:300}];
     this.listaglobal = [{user:"002",data:"1 Mês",valor:255}];
     */
    //console.log(id)
    //overlaypanel.toggle(event);
  }

}
