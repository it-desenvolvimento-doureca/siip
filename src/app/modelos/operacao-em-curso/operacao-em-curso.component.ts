import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { ConfirmationService } from "primeng/primeng";

@Component({
  selector: 'app-operacao-em-curso',
  templateUrl: './operacao-em-curso.component.html',
  styleUrls: ['./operacao-em-curso.component.css'],
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
export class OperacaoEmCursoComponent implements OnInit {
<<<<<<< HEAD
  adicionadef: boolean = true;
=======

  display: boolean = false;
>>>>>>> origin/master
  tabSets: any[];
  cols: any[];
  result: string = "";
  hideLable: boolean = false;
  items = [];
  totaldefeitos: number = 0;
  totalcontrol: number = 0;
  qttboas: number = 0;
  state: string = 'secondpos';
  displayData: any[];
  displayDialog: boolean = false;

  constructor(private confirmationService: ConfirmationService) {
  }

  ngOnInit() {


    this.tabSets = [];
    this.displayData = [];
    for (var i = 1; i <= 3; i++) {
      this.tabSets.push({ label: 'label' + i });
    }

  }

<<<<<<< HEAD
=======
  //mostra lista de defeitos
  showDialog() {
    this.display = true;
  }
>>>>>>> origin/master

  //ver lista de defeitos apartir da familia
  getinputs(vars) {
    if (vars == 'label1') {
      this.items = ["teste", "teste2"];
    } else {
      this.items = ["teste3", "teste4"];
    }
    return this.items;
  }

  //faz o calculo do total de defeitos e insere na tabela "lista dos defeitos rejeitados"
  submitFunc(value): void {
    this.hideLable = true;
    this.result = value;
    this.cols = [];
    this.totaldefeitos = 0;
    for (var v in value) // for acts as a foreach 
    {
      if (value[v] != "") {
        this.cols.push({ "vin": v, "brand": value[v], "year": "desnandsada" });
        this.totaldefeitos += value[v];
      }
      this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
    }
    this.ontogglestates();

  }


  //atualiza totalcontrol
  updatetotal(num: number) {
    this.qttboas = num;
    this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
  }

<<<<<<< HEAD
  //ao clicar no botão +, mostra tabela com mais operações
  togglestates() {
    this.state = (this.state === 'firstpos' ? 'secondpos' : 'firstpos');
    this.adicionadef = true;
  }

  //esconde a lista de defeitos
  ontogglestates() {
    if (this.adicionadef == false) {
      this.state = 'secondpos';
      this.adicionadef = true;
    } else {
      this.adicionadef = false;
    }
  }

  //adicionarOP
  adicionaop() {
    this.displayDialog = true
  }

  //fechar popup adicionar operador
  cancel(){
    this.displayDialog = false;
  }

  //adiciona  operador
  save() {
    this.displayDialog = false;
    this.confirmationService.confirm({
      message: 'Pretende adicionar mais um Operador?',
      accept: () => {
        this.displayDialog = true;
      }
    });
=======
  //só permite introduzir números no input
  onlynumbers(value: String, event: any) {

    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  //atualiza totalcontrol
  updatetotal(num: number) {
    this.qttboas = num;
    this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
>>>>>>> origin/master
  }

}
