import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { DataTable } from "primeng/primeng";
import {CalendarModule} from 'primeng/primeng';

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

  ngOnInit() {
    this.tabela = [{
      codigo: "teste",
      codigo2: "teste",
      codigo3: "teste",
      codigo4: "teste",
      codigo5: "teste",
      codigo6: "teste",
      codigo7: "teste",
      codigo8: "teste",
      codigo9: "teste",
      codigo11: "teste",
      codigo12: "teste",
      codigo13: "teste",
      codigo14: "teste",
      codigo15: "teste",
      codigo16: "teste",
      codigo17: "teste",
      codigo18: "teste",
      codigo19: "teste",
      color: "red",
      color1: "red",
      color2: "yellow",
      color3: "green",
      color4: "green",
      color5: "red",
    },
    {
      codigo: "teste3",
      codigo2: "teste2",
      codigo3: "teste1",
      codigo4: "teste1",
      codigo5: "teste1",
      codigo6: "teste1",
      codigo7: "teste2",
      codigo8: "teste3",
      codigo9: "teste1",
      codigo11: "teste2",
      codigo12: "teste7",
      codigo13: "teste6",
      codigo14: "teste5",
      codigo15: "teste4",
      codigo16: "teste3",
      codigo17: "teste2",
      codigo18: "teste1",
      codigo19: "teste1",
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

}
