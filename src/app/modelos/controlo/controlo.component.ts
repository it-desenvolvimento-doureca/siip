import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { DataTable } from "primeng/primeng";
import { CalendarModule } from 'primeng/primeng';
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";

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

  constructor(private RPOFOPLINService: RPOFOPLINService, private RPOFCABService: RPOFCABService) { }

  ngOnInit() {
    this.RPOFCABService.getAll().subscribe(
      res => {
        var count = 0;
        for (var y in res) {
          if (res[y][0].id_OF_CAB_ORIGEM == null) {
            this.preenchetabela(res, y, count)
            count++;
          }
        }
      },
      error => console.log(error));
    //this.selectedCar2= this.tabela[0];
  }

  preenchetabela(res, y, count) {
    this.RPOFOPLINService.getAllbyid(res[y][1].id_OP_CAB).subscribe(
      response => {
        var artigos = [];
        var refs = [];
        var qtd_of = [];
        var qtd_boas = [];
        var total_def = [];
        var perc_def = [];
        var perc_obj = [];
        var cor_qtd_of = "";
        var cor_total_def = "";
        var cor_perc_def = "";
        var perc_def_val = 0;
        var perc_obj_val = 0;
        var inser = false;
        for (var x in response) {
          
          //Amarelo se Quantidade Boas + Total de defeitos > Quantidade OF;
          if ((response[x][0].quant_BOAS_TOTAL + response[x][0].quant_DEF_TOTAL) > response[x][0].quant_OF) cor_qtd_of = "yellow";

          //Total Defeitos e % Defeitos: Amarelo se % Defeitos >= % Objetivos;
          if (true){
            cor_total_def = "yellow";
            cor_perc_def = "yellow";
          }
          artigos.push(response[x][0].ref_DES);
          refs.push(response[x][0].ref_NUM);
          qtd_of.push({ value: response[x][0].quant_OF, cor: cor_qtd_of });
          qtd_boas.push(response[x][0].quant_BOAS_TOTAL);
          total_def.push({ value: response[x][0].quant_DEF_TOTAL, cor: cor_total_def });
          perc_def.push({ value: 30, cor: cor_perc_def });
          perc_obj.push( response[x][0].perc_OBJETIV);

          if (response[x][1].id_OF_CAB_ORIGEM == null && !inser) {
            var estado = "green";
            var cor_of = "green";
            var cor_tempo_prod = "green";
            var cor_estado = "";

            var hora1 = new Date(res[y][0].data_HORA_CRIA)
            var hora2 = new Date();

            var timedif1 = hora2.getTime() - hora1.getTime();

            //Vermelho se data/hora início a mais de 16h e ainda não foi registada a data/hora de fim;
            if (timedif1 > 57600000 && res[y][1].tempo_EXEC_TOTAL == null) {
              cor_tempo_prod = "red";
            }
            /*
              var tempo = res[y][1].tempo_EXEC_TOTAL;
              var splitted_pausa = tempo.split(":", 3);
              var total_tempo = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
            */

            //Amarelo se tempo menor de 15 minutos ou maior que 8 horas;
            if ((timedif1 < 900000 || timedif1 > 28800000) && res[y][1].tempo_EXEC_TOTAL == null) cor_tempo_prod = "yellow";



            if (res[y][0].estado == 'C') estado = "Concluido";
            if (res[y][0].estado == 'I') estado = "Iniciado";
            if (res[y][0].estado == 'M') estado = "Modificado";
            if (res[y][0].estado == 'S') estado = "Pausa";
            if (res[y][0].estado == 'E') estado = "Execução";
            if (res[y][0].estado == 'P') estado = "Preparação";

            this.tabela.push({
              pos: count,
              of: res[y][0].of_NUM,
              operacao: res[y][0].op_NUM,
              maquina: res[y][0].maq_NUM + ' - ' + res[y][0].maq_DES,
              func: res[y][0].nome_UTZ_CRIA,
              qtd_func: 550,
              ref: refs,
              artigo: artigos,
              dt_inicio: new Date(res[y][0].data_HORA_CRIA).toLocaleDateString(),
              hora_inicio: new Date(res[y][0].data_HORA_CRIA).toLocaleTimeString().slice(0, 5),
              dt_fim: new Date().toLocaleDateString(),
              hora_fim: new Date().toLocaleTimeString().slice(0, 5),
              tempo_prod: res[y][1].tempo_EXEC_TOTAL,
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
            inser = true;
          }
        }
        this.tabela = this.tabela.slice();
      },
      error => console.log(error));
  }

  apaga() {
    this.input_pesquisa = "";
    this.dataTableComponent.reset();
  }
  atualiza() {
    this.input_pesquisa = "";
    this.dataTableComponent.reset();
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


}
