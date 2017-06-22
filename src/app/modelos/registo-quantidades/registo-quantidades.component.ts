import { Component, OnInit, Renderer, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { Router } from "@angular/router";
import { RPOFDEFLINService } from "app/modelos/services/rp-of-def-lin.service";
import { RPCONFOPService } from "app/modelos/services/rp-conf-op.service";
import { RP_OF_DEF_LIN } from "app/modelos/entidades/RP_OF_DEF_LIN";
import { RP_OF_OP_LIN } from "app/modelos/entidades/RP_OF_OP_LIN";

@Component({
  selector: 'app-registo-quantidades',
  templateUrl: './registo-quantidades.component.html',
  styleUrls: ['./registo-quantidades.component.css']
})
export class RegistoQuantidadesComponent implements OnInit {
  corfundo: string;
  qtdof: any;
  positions = [];
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
  disabledrefseguinte = true;
  disabledrefanterior = true;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer, private RPCONFOPService: RPCONFOPService, private RPOFDEFLINService: RPOFDEFLINService, private router: Router, private RPOFOPLINService: RPOFOPLINService) { };

  ngOnInit() {
    this.ref = [];
    this.tabSets = [];

    if (localStorage.getItem('id_op_cab')) {
      //preencher campos
      this.RPOFOPLINService.getAllbyid(JSON.parse(localStorage.getItem('id_op_cab'))).subscribe(
        response => {
          for (var x in response) {
            this.ref.push({ design: response[x].ref_NUM + " - " + response[x].ref_DES, id: response[x].id_OP_LIN, op: response[x].id_OP_LIN, qttboas: response[x].quant_BOAS_TOTAL, totaldefeitos: response[x].quant_DEF_TOTAL, qtdof: response[x].quant_OF });
          }
          this.ref = this.ref.slice();
          this.ref_name = this.ref[0].design;
          this.qttboas = this.ref[0].qttboas;
          this.totaldefeitos = this.ref[0].totaldefeitos;
          this.qttboas = this.ref[0].qttboas;
          this.qtdof = this.ref[0].qtdof;
          this.totalcontrol = this.totaldefeitos + this.qttboas;
          this.getdefeitos(this.ref[0].id);
          if (this.ref.length > 1) {
            this.disabledrefanterior = false;
            this.disabledrefseguinte = false;
          }
        },
        error => console.log(error));

    } else {
      this.router.navigate(['./home']);
    }


  }
  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  //ao alterar tab alterar inputs
  handleChange(event) {
    if (this.positions.find(item => item.index === event.index)) {
      var position = this.positions.find(item => item.index === event.index);
      this.getinputs(position.id);
    }

  }


  //ver lista de defeitos apartir da familia
  getinputs(id) {
    this.items = [];
    this.RPOFDEFLINService.getbyid(id, this.ref[this.i].op).subscribe(res => {
      for (var x in res) {
        this.items.push({ cod: res[x].cod_DEF, des: res[x].desc_DEF.trim(), value: res[x].quant_DEF, id_DEF_LIN: res[x].id_DEF_LIN });
      }
    }, error => console.log(error));

  }


  //atualiza totalcontrol
  updatetotal(num: number) {
    this.qttboas = num;
    this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
    //ao alterar valor qtd. boas atualiza na BD

    this.RPOFOPLINService.getRP_OF_OP_LIN(this.ref[this.i].op).subscribe(resp => {
      var rp_lin = new RP_OF_OP_LIN();
      rp_lin = resp[0];
      this.ref[this.i].qttboas = this.qttboas;
      this.ref[this.i].totaldefeitos = this.totaldefeitos;
      rp_lin.quant_BOAS_TOTAL = this.qttboas;
      rp_lin.quant_DEF_TOTAL = this.totaldefeitos;
      this.RPOFOPLINService.update(rp_lin);

    }, error => console.log(error));
    this.controlaquantidade();
  }


  //passa para a referência seguinte
  nextItem() {
    this.i = this.i + 1;
    this.i = this.i % this.ref.length;
    this.ref_name = this.ref[this.i].design;
    this.qttboas = parseInt(this.ref[this.i].qttboas);
    this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
    this.qtdof = this.ref[this.i].qtdof;
    this.totalcontrol = this.totaldefeitos + this.qttboas;
    this.getdefeitos(this.ref[this.i].id);
  }

  //passa para a referência anterior
  prevItem() {
    if (this.i === 0) {
      this.i = this.ref.length;
    }
    this.i = this.i - 1;
    this.ref_name = this.ref[this.i].design;
    this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
    this.qttboas = parseInt(this.ref[this.i].qttboas);
    this.qtdof = this.ref[this.i].qtdof;
    this.totalcontrol = this.totaldefeitos + this.qttboas;
    this.getdefeitos(this.ref[this.i].id);
  }

  //faz o calculo do total de defeitos e insere na tabela "lista dos defeitos rejeitados"
  submitFunc(value): void {
    this.result = value;
    this.totaldefeitos = 0;
    for (var v in value) {
      if (value[v] != "") {
        this.totaldefeitos += value[v];
      }
      this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
    }

  }

  //carregar defeitos da ref
  getdefeitos(id) {
    this.tabSets = [];
    this.RPOFOPLINService.getRP_OF_OP_LINOp(id).subscribe(res => {
      var index = 0;
      this.RPCONFOPService.getAllbyid(res[0].op_COD).subscribe(res2 => {

        for (var x in res2) {
          index++;
          this.tabSets.push({ label: res2[x].id_OP_SEC + " - " + res2[x].nome_OP_SEC, id: res2[x].id_OP_SEC.trim(), id_op: id });
          this.positions.push({ index: index, id: res2[x].id_OP_SEC.trim() });

        }
        this.getinputs(this.positions[0].id);
      }, error => console.log(error));

    }, error => console.log(error));
    this.controlaquantidade();
  }

  //alterar valor defeitos
  alteraValor(valor, id_DEF_LIN) {
    this.RPOFDEFLINService.getbyidDEF(id_DEF_LIN).subscribe(res => {
      var rp = new RP_OF_DEF_LIN();
      rp = res[0];
      rp.quant_DEF = valor;
      this.RPOFDEFLINService.update(rp);

      this.RPOFOPLINService.getRP_OF_OP_LIN(res[0].id_OP_LIN).subscribe(resp => {
        var rp_lin = new RP_OF_OP_LIN();
        rp_lin = resp[0];
        rp_lin.quant_BOAS_TOTAL = this.qttboas;
        rp_lin.quant_DEF_TOTAL = this.totaldefeitos;
        this.ref[this.i].totaldefeitos = this.totaldefeitos;
        this.RPOFOPLINService.update(rp_lin);

      }, error => console.log(error));
    }, error => console.log(error));

    this.simular();
    this.controlaquantidade();
  }

  //simular click para calcular defeitos
  simular() {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }

  //Se o total controlado é maior que as quantidades da OF (7) apresenta o valor a vermelho, se for menor, apresenta a amarelo;
  controlaquantidade() {
    if (this.totalcontrol == this.qtdof) {
      this.corfundo = "fundoverde";
    } else if (this.totalcontrol < this.qtdof) {
      this.corfundo = "fundoamarelo";
    } else if (this.totalcontrol > this.qtdof) {
      this.corfundo = "fundovermelho";
    }
  }
}
