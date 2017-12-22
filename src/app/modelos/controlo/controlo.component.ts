import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { DataTable } from "primeng/primeng";
import { CalendarModule } from 'primeng/primeng';
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { Router } from '@angular/router';
import { GEREVENTOService } from 'app/modelos/services/ger-evento.service';
import { GER_EVENTO } from 'app/modelos/entidades/GER_EVENTO';

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
  mensagens: any[];
  displaymensagem: boolean;
  count3 = 0;
  hiddenvermais: boolean;
  count2: any;
  start_row = 0;
  pesquisa = null;
  num_rows;;
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
  estados = [{ label: "--", value: null }, { label: "Concluido", value: "C" }, { label: "Execução", value: "E" }]

  constructor(private GEREVENTOService: GEREVENTOService, private router: Router, private RPOFOPLINService: RPOFOPLINService, private RPOFCABService: RPOFCABService) { }

  ngOnInit() {
    this.count2 = 0;
    this.pesquisa = [];
    this.num_rows = this.items;
    this.inicia();

    setInterval(() => { if (this.checked) this.atualiza(); }, 60000);

  }

  inicia() {
    if (this.atualizacao) {
      this.atualizacao = false;
      this.dados_old = this.dados;
      //this.dados = [];
      //this.items = 10;
      this.RPOFCABService.getAll().subscribe(
        res => {
          this.count = 0;
          var total = Object.keys(res).length; if (total > 0) {
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
            this.atualizacao = true;
          }
        },
        error => {
          console.log(error);
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
        var cor_tempo_prod = "green";
        var cor_estado = "green";
        var cor_qtd_of = "";
        var cor_total_def = "";
        var cor_perc_def = "";
        var val_perc_def = 0;

        for (var x in response) {

          //Amarelo se Quantidade Boas + Total de defeitos > Quantidade OF;
          if ((response[x][0].quant_BOAS_TOTAL_M2 + response[x][0].quant_DEF_TOTAL_M2) > response[x][0].quant_OF) {
            cor_qtd_of = "yellow";
            cor_estado = "yellow";
            cor_of = "yellow";
          }

          //Total Defeitos e % Defeitos: Amarelo se % Defeitos >= % Objetivos;
          val_perc_def = ((response[x][0].quant_DEF_TOTAL_M2 * 100) / response[x][0].quant_OF_M2) || 0;

          if (val_perc_def >= response[x][0].perc_OBJETIV) {
            cor_total_def = "yellow";
            cor_perc_def = "yellow";
            cor_estado = "yellow";
            cor_of = "yellow";

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
            cor_of = "yellow";
          }

          artigos.push(response[x][0].ref_DES.substring(0, 32));
          refs.push(response[x][0].ref_NUM);
          qtd_of.push({ value: response[x][0].quant_OF, cor: cor_qtd_of });
          qtd_boas.push(response[x][0].quant_BOAS_TOTAL_M2);
          total_def.push({ value: response[x][0].quant_DEF_TOTAL_M2, cor: cor_total_def });
          perc_def.push({ value: (val_perc_def.toFixed(2)).toLocaleString(), cor: cor_perc_def });
          perc_obj.push(response[x][0].perc_OBJETIV);
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

      if (res5[n][1].data_FIM_M2 != null) var dtfim2 = this.formatDate(res5[n][1].data_FIM_M2);
      if (res5[n][1].hora_FIM_M2 != null) var hfim2 = res5[n][1].hora_FIM_M2.slice(0, 5);

      dtfim.push(dtfim2);
      hfim.push(hfim2);
      dt_inicio.push(this.formatDate(res5[n][1].data_INI_M2));
      hora_inicio.push(res5[n][1].hora_INI_M2.slice(0, 5));
      func.push(res5[n][1].id_UTZ_CRIA + ' - ' + (res5[n][1].nome_UTZ_CRIA).substring(0, 14));

      if (res5[n][1].data_FIM_M2 == null) qtd_func++;
      tempo_prod.push(res5[n][0].tempo_EXEC_TOTAL_M2);

      if (res5[n][1].estado == 'C') estado.push("Concluido");
      if (res5[n][1].estado == 'I') estado.push("Iniciado");
      if (res5[n][1].estado == 'M') estado.push("Modificado");
      if (res5[n][1].estado == 'S') estado.push("Pausa");
      if (res5[n][1].estado == 'E') estado.push("Execução");
      if (res5[n][1].estado == 'P') estado.push("Preparação");
      if (res5[n][1].estado == 'A') estado.push("Anulado");
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
      cor_tempo_prod: cor_tempo_prod,
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
    }


  }

  apaga() {
    this.input_pesquisa = "";
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
    this.inicia();
  }

  onRowSelect(event) {

  }

  //ao clicar no pesquisa avançada 
  togglestates() {
    this.state = (this.state === 'firstpos' ? 'secondpos' : 'firstpos');
    this.adicionaop = true;
  }

  //esconde a tabela
  ontogglestates(e) {
    var combo = false;
    if (e.srcElement.parentElement) {
      if (e.srcElement.parentElement.className.search("ui-dropdown-ite") != 0) {
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
    this.pesquisa = [];
    this.atualiza();
    /*var dirtyFormID = 'formArranque';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();*/
  }

  //aplicar filtro pesquisa avançada
  aplicar() {
    this.input_pesquisa = "";
    this.dataTableComponent.reset();
    this.start_row = 0;
    this.num_rows = this.items;
    this.hiddenvermais = false;
    this.dados = [];
    this.count3 = 0;
    var data = [];
    var innerObj = {};
    for (var n in this.pesquisa) {
      if (this.pesquisa[n] != "" && this.pesquisa[n] != null) {
        if (n.match("date")) {
          innerObj[n] = new Date(this.pesquisa[n]).toLocaleDateString();
        } else {
          innerObj[n] = this.pesquisa[n];
        }
      }

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
    this.inicia();

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


  //verificar enventos
  verifica() {
    var data = [{ MODULO: 1, MOMENTO: "Ao Criar Mensagem", PAGINA: "Execução", ESTADO: true }];

    this.GEREVENTOService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
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
}
