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
  cols2: any[];
  cols: any[];
  displayData: any[];
  constructor() { };
  totaldefeitos: number = 0;
  totalcontrol: number = 0;
  qttboas: number = 0;
  ref: any[];
  ref_name = "";
  ngOnInit() {
    this.cols2 = [
      { "vin": "ref001", "brand": "design1" },
      { "vin": "ref002", "brand": "design2" },
      { "vin": "ref003", "brand": "design3" },
      { "vin": "ref004", "brand": "design4" }
    ];

    this.ref = ["ref01", "ref02", "ref03", "ref04"];
    this.ref_name = this.ref[0];
    this.tabSets = [];
    this.displayData = [];
    for (var i = 1; i <= 3; i++) {
      this.tabSets.push({ label: 'label' + i });
    }
  }

  isplayData2(vars) {
    this.getvalu(vars);
    return this.items;
  }

  getvalu(vars) {
    if (vars == 'label1') {
      this.items = ["teste", "teste2"];
    } else {
      this.items = ["teste3", "teste4"];
    }

  }


  updatetotal(num: number) {
    this.qttboas = num;
    this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
  }

  append1(value: String, event: any) {

    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  nextItem() {
    this.i = this.i + 1; // increase i by one
    this.i = this.i % this.ref.length; // if we've gone too high, start from `0` again
    this.ref_name =  this.ref[this.i]; // give us back the item of where we are now
  }
  prevItem() {
    if (this.i === 0) { // i would become 0
      this.i = this.ref.length; // so put it at the other end of the array
    }
    this.i = this.i - 1; // decrease by one
    this.ref_name = this.ref[this.i]; // give us back the item of where we are now
  }

    submitFunc(value): void {
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

  }

}
