import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tipo-pausa',
  templateUrl: './tipo-pausa.component.html',
  styleUrls: ['./tipo-pausa.component.css']
})
export class TipoPausaComponent implements OnInit {
  pausas: any[];
  constructor(private _location: Location) { }

  ngOnInit() {
    //this.pausas = ["Almoço", "Ida Casa de Banho", "Lanche", "Lanche", "Lanche", "Lanche", "Lanche", "Lanche", "Lanche"];
    this.pausas = [{ design: "Almoço", id: "1" }, { design: "Ida Casa de Banho", id: "2" }, { design: "Lanche", id: "3" }];
  }

  pausa(item) {
    alert(item);
  }

  backClicked() {
    this._location.back();
  }

}
