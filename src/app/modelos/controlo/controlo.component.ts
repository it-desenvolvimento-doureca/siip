import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { DataTable } from "primeng/primeng";
import { CalendarModule } from 'primeng/primeng';

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
  tabela: any[];
  input_pesquisa = "";
  constructor() { }
  selectedCar2 = "";
  state: string = 'secondpos';
  adicionaop = true;
  date1;
  date2;
  date3;
  date4;
  rowData;

  ngOnInit() {
    this.tabela = [{
      codigo: "1",
      codigo2: "teste",
      codigo3: "teste",
      codigo4: "teste",
      codigo5: "teste",
      codigo6: ["ref1", "ref2", "ref3"],
      codigo7: ["ref1", "ref2", "ref3"],
      codigo8: "teste",
      codigo9: "teste",
      codigo11: "teste",
      codigo12: "teste",
      codigo13: "teste",
      codigo14: ["ref1", "ref2", "ref3"],
      codigo15: ["ref1", "ref2", "ref3"],
      codigo16: ["ref1", "ref2", "ref3"],
      codigo17: ["ref1", "ref2", "ref3"],
      codigo18: ["ref1", "ref2", "ref3"],
      codigo19: "teste",
      color: "red",
      color1: "red",
      color2: "yellow",
      color3: "green",
      color4: "green",
      color5: "red",
    },
    {
      codigo: "2",
      codigo2: "teste2",
      codigo3: "teste1",
      codigo4: "teste1",
      codigo5: "teste1",
      codigo6: ["ref1", "ref2", "ref3"],
      codigo7: ["ref7", "ref22", "ref31"],
      codigo8: "teste3",
      codigo9: "teste1",
      codigo11: "teste2",
      codigo12: "teste7",
      codigo13: "teste6",
      codigo14: ["222", "3333", "4444"],
      codigo15: ["1", "2", "3"],
      codigo16: ["22", "20", "40"],
      codigo17: ["5", "2", "1"],
      codigo18: ["10", "80", "90"],
      codigo19: "teste6",
      color: "yellow",
      color1: "yellow",
      color2: "red",
      color3: "green",
      color4: "green",
      color5: "green",
    }];
    //this.selectedCar2= this.tabela[0];
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
