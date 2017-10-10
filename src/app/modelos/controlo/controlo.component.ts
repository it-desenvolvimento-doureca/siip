import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { DataTable } from "primeng/primeng";
import { CalendarModule } from 'primeng/primeng';
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { Router } from '@angular/router';

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
  atualizacao: boolean = true;
  count: any = 0;
  dados_old: any[];
  dados: any[] = [];
  items;
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

  constructor(private router: Router, private RPOFOPLINService: RPOFOPLINService, private RPOFCABService: RPOFCABService) { }

  ngOnInit() {
    this.inicia();

    setInterval(() => { if (this.checked) this.inicia(); }, 10000);

  }

  inicia() {
    if (this.atualizacao) {
      this.atualizacao = false;
      this.dados_old = this.dados;
      this.dados = [];
      this.items = 5;
      this.RPOFCABService.getAll().subscribe(
        res => {
          this.count = 0;
          var total = Object.keys(res).length;
          for (var y in res) {
            if (res[y][0].id_OF_CAB_ORIGEM == null) {
              this.preenchetabela(total, res, y, this.count)
              this.count++;
            }
          }
        },
        error => console.log(error));
    }
  }

  preenchetabela(total, res, y, count) {
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
        var estado = "green";
        var cor_of = "green";
        var cor_tempo_prod = "green";
        var cor_estado = "green";
        var cor_qtd_of = "";
        var cor_total_def = "";
        var cor_perc_def = "";
        var val_perc_def = 0;

        for (var x in response) {

          //Amarelo se Quantidade Boas + Total de defeitos > Quantidade OF;
          if ((response[x][0].quant_BOAS_TOTAL + response[x][0].quant_DEF_TOTAL) > response[x][0].quant_OF) {
            cor_qtd_of = "yellow";
            cor_estado = "yellow";
            cor_of = "yellow";
          }

          //Total Defeitos e % Defeitos: Amarelo se % Defeitos >= % Objetivos;
          val_perc_def = ((response[x][0].quant_DEF_TOTAL * 100) / response[x][0].quant_OF) || 0;

          if (val_perc_def >= response[x][0].perc_OBJETIV) {
            cor_total_def = "yellow";
            cor_perc_def = "yellow";
            cor_estado = "yellow";
            cor_of = "yellow";

          }

          var hora1 = new Date(res[y][2].data_INI + "," + res[y][2].hora_INI.slice(0, 5))
          var hora2 = new Date();

          var timedif1 = hora2.getTime() - hora1.getTime();
          //Estado: Amarelo se pelo menos 1 dos campos anteriores estiver a amarelo; Vermelho se tempo de produção tiver a vermelho ou estado = Eliminado;
          //Vermelho se data/hora início a mais de 16h e ainda não foi registada a data/hora de fim;
          if (timedif1 > 57600000 && res[y][1].tempo_EXEC_TOTAL == null) {
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
          if ((timedif1 < 900000 || timedif1 > 28800000 && timedif1 < 57600000) && res[y][1].tempo_EXEC_TOTAL == null) {
            cor_tempo_prod = "yellow";
            cor_estado = "yellow";
            cor_of = "yellow";
          }

          artigos.push(response[x][0].ref_DES.substring(0, 35));
          refs.push(response[x][0].ref_NUM);
          qtd_of.push({ value: response[x][0].quant_OF, cor: cor_qtd_of });
          qtd_boas.push(response[x][0].quant_BOAS_TOTAL);
          total_def.push({ value: response[x][0].quant_DEF_TOTAL, cor: cor_total_def });
          perc_def.push({ value: (val_perc_def.toFixed(2)).toLocaleString(), cor: cor_perc_def });
          perc_obj.push(response[x][0].perc_OBJETIV);
        }

        this.RPOFCABService.getRP_OF_CABbyid(res[y][0].id_OF_CAB).subscribe(
          res5 => {

            this.inserelinhas(total, count, res5, res, y, response, x, refs, artigos, qtd_of, qtd_boas, total_def, perc_def, perc_obj, cor_of, cor_tempo_prod, cor_estado);

          },
          error => console.log(error));


      },
      error => console.log(error));
  }

  inserelinhas(total, count, res5, res, y, response, x, refs, artigos, qtd_of, qtd_boas, total_def, perc_def, perc_obj, cor_of, cor_tempo_prod, cor_estado) {
    var estado;

    var dtfim = [];
    var hfim = [];
    var dt_inicio = [];
    var hora_inicio = [];
    var func = [];
    var qtd_func = [];
    var tempo_prod = [];

    for (var n in res5) {

      if (res5[n][1].data_FIM != null) var dtfim2 = this.formatDate(res5[n][1].data_FIM);
      if (res5[n][1].hora_FIM != null) var hfim2 = res5[n][1].hora_FIM.slice(0, 5);

      dtfim.push(dtfim2);
      hfim.push(hfim2);
      dt_inicio.push(this.formatDate(res5[n][1].data_INI));
      hora_inicio.push(res5[n][1].hora_INI.slice(0, 5));
      func.push(res5[n][1].id_UTZ_CRIA + ' - ' + (res5[n][1].nome_UTZ_CRIA).substring(0, 15));
      qtd_func.push('12');
      tempo_prod.push(res5[n][0].tempo_EXEC_TOTAL);
    }



    if (res[y][0].estado == 'C') estado = "Concluido";
    if (res[y][0].estado == 'I') estado = "Iniciado";
    if (res[y][0].estado == 'M') estado = "Modificado";
    if (res[y][0].estado == 'S') estado = "Pausa";
    if (res[y][0].estado == 'E') estado = "Execução";
    if (res[y][0].estado == 'P') estado = "Preparação";

    this.dados.push({
      pos: count,
      id_of_cab: response[x][1].id_OF_CAB,
      of: res[y][0].of_NUM,
      operacao: res[y][0].op_NUM,
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
      cor_estado: cor_estado
    });


    if (this.dados.length == total) {
      this.atualizacao = true
      if (this.dados.find(item => item.pos == count)) {
        this.dados.find(item => item.pos == count).cor_estado = cor_estado;
        this.dados.find(item => item.pos == count).cor_of = cor_of;
      }
      if (this.dados_old.length == 0) {
        this.tabela = this.dados.slice(0, 5);
      } else {
        this.tabela = this.dados_old.slice(0, 5);
      }
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
  ontogglestates() {
    if (this.adicionaop == false) {
      this.state = 'secondpos';
      this.adicionaop = true;
    } else {
      this.adicionaop = false;
    }
  }

  onRowUnselect(event) {

  }

  aplicar() {

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
    this.items += 5;
    if (this.dados_old.length == 0) {
      this.tabela = this.dados.slice(0, this.items);
    } else {
      this.tabela = this.dados_old.slice(0, this.items);
    }
    this.ordernar();

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
    this.router.navigate(['./operacao-em-curso/view'], { queryParams: { id: event.data.id_func } });
  }

}
