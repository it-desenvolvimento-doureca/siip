import { Component, OnInit } from '@angular/core';
import { utilizadorService } from "app/utilizadorService";
import { Utilizador } from "app/modelos/entidades/utilizador";

@Component({
  selector: 'app-operacao-em-curso-multiref',
  templateUrl: './operacao-em-curso-multiref.component.html',
  styleUrls: ['./operacao-em-curso-multiref.component.css']
})
export class OperacaoEmCursoMultirefComponent implements OnInit {
  utilizadores: Utilizador[]=null;
  cols2: any[];


  constructor(private service: utilizadorService) {
  }

  ngOnInit() {
    this.service.getUtilizadores().subscribe(
      response => {this.utilizadores = response; console.log( this.utilizadores);},
      error => console.log(error)
    )

  }

}
