import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operacao-em-curso',
  templateUrl: './operacao-em-curso.component.html',
  styleUrls: ['./operacao-em-curso.component.css']
})
export class OperacaoEmCursoComponent implements OnInit {

 display: boolean = false;
  tabSets: any[];
  cols2: any[];
  cols: any[];
  defeito_sel = "";
  defeito_sel2 = "";
  result: string = "";
  hideLable: boolean = false;
  items = [];
  totaldefeitos: number= 0;
  totalcontrol: number = 0;
  qttboas: number = 0;

  displayData: any[];

  constructor() {
  }

  ngOnInit() {

    this.cols2 = [
      { "vin": "ref001", "brand": "design1" },
      { "vin": "ref002", "brand": "design2" },
      { "vin": "ref003", "brand": "design3" },
      { "vin": "ref004", "brand": "design4" }
    ];

    this.tabSets = [];
    this.displayData = [];
    for (var i = 1; i <= 3; i++) {
      this.tabSets.push({ label: 'label' + i });
    }

  }

  showDialog() {
    this.display = true;
  }

  onRowSelect(event) {
    this.defeito_sel = event.data.vin;
    this.defeito_sel2 = event.data.brand;

  }


  getvalu(vars) {
    if (vars == 'label1') {
      this.items = ["teste", "teste2"];
    } else {
      this.items = ["teste3", "teste4"];
    }

  }

  isplayData2(vars) {
    this.getvalu(vars);
    return this.items;
  }

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
      this.totalcontrol = this.totaldefeitos *1 + this.qttboas * 1;
    }
    this.display = false;

  }

  append1(value: String,event: any){
     
     const pattern = /[0-9\ ]/;
     let inputChar = String.fromCharCode(event.charCode);
 
     if (!pattern.test(inputChar)) {
       // invalid character, prevent input
       event.preventDefault();
     }
   }
   updatetotal(num : number){
     this.qttboas = num;
     this.totalcontrol = this.totaldefeitos* 1+ this.qttboas* 1;
   }

   createfile(){
     
   }

}
