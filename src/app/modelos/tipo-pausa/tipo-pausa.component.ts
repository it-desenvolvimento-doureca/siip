import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ofService } from "app/ofService";

@Component({
  selector: 'app-tipo-pausa',
  templateUrl: './tipo-pausa.component.html',
  styleUrls: ['./tipo-pausa.component.css']
})
export class TipoPausaComponent implements OnInit {
  pausas: any[];
  constructor(private _location: Location, private service: ofService) { }

  ngOnInit() {
    this.pausas = [];
    this.service.getTipoFalta().subscribe(
      response => {
        for (var x in response) {
          this.pausas.push({ design: response[x].arrlib, id: response[x].numenr });
        }
        this.pausas = this.pausas.slice();
      },
      error => console.log(error));
  }

  pausa(item) {
    alert(item);
  }

  backClicked() {
    this._location.back();
  }

}
