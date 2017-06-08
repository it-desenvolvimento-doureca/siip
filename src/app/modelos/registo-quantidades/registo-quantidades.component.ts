import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registo-quantidades',
  templateUrl: './registo-quantidades.component.html',
  styleUrls: ['./registo-quantidades.component.css']
})
export class RegistoQuantidadesComponent implements OnInit {
  result: any;
  i: number = 0;
  items = [];
  tabSets: any[];
  displayData: any[];
  totaldefeitos: number = 0;
  totalcontrol: number = 0;
  qttboas: number = 0;
  ref: any[];
  ref_name = "";

  constructor() { };
  ngOnInit() {
    this.ref = ["ref01", "ref02", "ref03", "ref04"];
    this.ref_name = this.ref[0];
    this.tabSets = [];
    this.displayData = [];
    for (var i = 1; i <= 3; i++) {
      this.tabSets.push({ label: 'label' + i });
    }
  }

  //ver lista de defeitos apartir da familia
  getinputs(vars) {
    if (vars == 'label1') {
      this.items = ["teste", "teste2", "teste3"];
    } else {
      this.items = ["teste3", "teste4"];
    }
    return this.items;
  }

  //atualiza totalcontrol
  updatetotal(num: number) {
    this.qttboas = num;
    this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
  }

  //só permite introduzir números no input
  onlynumbers(value: String, event: any) {

    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  //passa para a referência seguinte
  nextItem() {
    this.i = this.i + 1;
    this.i = this.i % this.ref.length;
    this.ref_name = this.ref[this.i];
  }

  //passa para a referência anterior
  prevItem() {
    if (this.i === 0) {
      this.i = this.ref.length;
    }
    this.i = this.i - 1;
    this.ref_name = this.ref[this.i];
  }

  //faz o calculo do total de defeitos e insere na tabela "lista dos defeitos rejeitados"
  submitFunc(value): void {
    this.result = value;
    this.totaldefeitos = 0;
    for (var v in value) 
    {
      if (value[v] != "") {
        //insere na BD
        this.totaldefeitos += value[v];
      }
      this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
    }

  }

}
