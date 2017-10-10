import { Component, OnInit, Renderer, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { Router } from "@angular/router";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RPOFDEFLINService } from "app/modelos/services/rp-of-def-lin.service";
import { RPCONFOPService } from "app/modelos/services/rp-conf-op.service";
import { RP_OF_DEF_LIN } from "app/modelos/entidades/RP_OF_DEF_LIN";
import { RP_OF_OP_LIN } from "app/modelos/entidades/RP_OF_OP_LIN";
import { RPOFOUTRODEFLINService } from "app/modelos/services/rp-of-outrodef-lin.service";
import { RP_OF_OUTRODEF_LIN } from "app/modelos/entidades/RP_OF_OUTRODEF_LIN";
import { ofService } from "app/ofService";
import { RPOFOPCABService } from "app/modelos/services/rp-of-op-cab.service";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-registo-quantidades',
  templateUrl: './registo-quantidades.component.html',
  styleUrls: ['./registo-quantidades.component.css']
})
export class RegistoQuantidadesComponent implements OnInit {
  index: any;
  fechou: any;
  username: any;
  num_etiqueta = "";
  verif_adic: any = [];
  id_def: any;
  obdsdef: string = "";
  comp: any;
  num_lote: string;
  bt_class = "btn-primary";
  refresh = true;
  spinner = false;
  corfundo: string;
  qtdof: any;
  positions = [];
  result: any;
  i: number = 0;
  items = [];
  tabSets: any[] = [];
  displayData: any[];
  totaldefeitos: number = 0;
  totalcontrol: number = 0;
  qttboas: number = 0;
  ref: any[];
  ref_name = "";
  disabledrefseguinte = true;
  disabledrefanterior = true;
  displayDialog: boolean;
  displayDialogetiqueta: boolean;
  location: Location;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('dialogwaiting') dialogwaiting: ElementRef;
  @ViewChild('closewaiting') closewaiting: ElementRef;
  @ViewChild('editarclick2') editarclick2: ElementRef;
  @ViewChild('carregaaltura') carregaaltura: ElementRef;

  constructor(private elementRef: ElementRef, private confirmationService: ConfirmationService, private RPOFCABService: RPOFCABService, private RPOFOPCABService: RPOFOPCABService, private service: ofService, private RPOFOUTRODEFLINService: RPOFOUTRODEFLINService, private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer, private RPCONFOPService: RPCONFOPService, private RPOFDEFLINService: RPOFDEFLINService, private router: Router, private RPOFOPLINService: RPOFOPLINService, location: Location) {
    this.location = location;
  };

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/demo.js";
    this.elementRef.nativeElement.appendChild(s);
    this.username = JSON.parse(localStorage.getItem('user'))["username"];
    this.inicia();

  }

  inicia() {
    this.ref = [];
    this.positions = [];
    this.tabSets = [];
    if (localStorage.getItem('id_op_cab')) {
      //preencher campos
      this.carregaref(JSON.parse(localStorage.getItem('id_op_cab')));

    } else {
      this.router.navigate(['./home']);
    }
  }

  //preencher campos
  carregaref(id_op_cab) {
    this.RPOFOPLINService.getAllbyid(id_op_cab).subscribe(
      response => {
        for (var x in response) {
          var comp = true;
          if (response[x][1].id_OF_CAB_ORIGEM == null) {
            comp = false;
          }
          this.ref.push({ comp: comp, of_num: response[x][1].of_NUM, design: response[x][0].ref_NUM + " - " + response[x][0].ref_DES, id: response[x][0].id_OP_LIN, op: response[x][0].id_OP_CAB, qttboas: response[x][0].quant_BOAS_TOTAL, totaldefeitos: response[x][0].quant_DEF_TOTAL, qtdof: response[x][0].quant_OF });
        }
        this.ref = this.ref.slice();
        this.ref_name = this.ref[this.i].design;
        this.qttboas = this.ref[this.i].qttboas;
        this.totaldefeitos = this.ref[this.i].totaldefeitos;
        this.qttboas = this.ref[this.i].qttboas;
        this.qtdof = this.ref[this.i].qtdof;
        this.comp = this.ref[this.i].comp;
        this.num_lote = this.ref[this.i].of_num;
        this.totalcontrol = this.totaldefeitos + this.qttboas;
        this.getdefeitos(this.ref[this.i].id);
        if (this.ref.length > 1) {
          this.disabledrefanterior = false;
          this.disabledrefseguinte = false;
        }
      },
      error => console.log(error));
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  //pesquisar numero etiqueta
  pesquisaetiqueta() {

    this.bt_class = "btn-primary";
    if (this.num_etiqueta != "") {
      this.simular(this.dialogwaiting);
      this.spinner = true;
      this.refresh = false;
      var etiqueta = "0000000000" + this.num_etiqueta;
      this.service.getEtiqueta(etiqueta.substring(etiqueta.length - 10)).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir etiquena com o numero
          if (count > 0) {
            this.simular(this.editarclick2);
            for (var x in response) {
              this.num_lote = response[x].OFNUM;
              this.atualizarRPOFCAB(response[x].OFNUM, response[x].ofref, response[x].ofanumenr, response[x].OFBQTEINI, response[x].INDNUMENR, response[x].VA2REF, response[x].VA1REF, response[x].INDREF);

            }
            this.spinner = false;
            this.refresh = true;
          } else {
            this.simular(this.closewaiting);
            this.bt_class = "btn-danger";
            this.spinner = false;
            this.refresh = true;
            this.displayDialogetiqueta = true;
          }
        },
        error => {
          console.log(error);
          this.bt_class = "btn-danger";
          this.spinner = false;
          this.refresh = true;
        });

    }
  }
  //atualizar dados RP_OF_CAB
  atualizarRPOFCAB(of_NUM, of_OBS, ofanumenr, qtd_of, ref_INDNUMENR, ref_VAR2, ref_VAR1, ref_ind, apagar = false) {
    this.RPOFOPCABService.getbyid(this.ref[this.i].op).subscribe(result => {
      var rp_of_cab = new RP_OF_CAB();
      rp_of_cab = result[0][1];
      rp_of_cab.id_UTZ_MODIF = this.username;
      rp_of_cab.nome_UTZ_MODIF = JSON.parse(localStorage.getItem('user'))["name"];;
      rp_of_cab.data_HORA_MODIF = new Date();
      rp_of_cab.of_NUM = of_NUM;
      rp_of_cab.of_OBS = of_OBS;
      //create
      this.RPOFCABService.update(rp_of_cab).then(
        res => {
          this.atualizarRPOFOPLIN(rp_of_cab, qtd_of, ref_INDNUMENR, ref_VAR2, ref_VAR1, ofanumenr, ref_ind, apagar);
        },
        error => {
          console.log(error);
          this.simular(this.closewaiting);
          this.inicia();
        });

    },
      error => {
        console.log(error);
        this.simular(this.closewaiting);
        this.inicia();
      });
  }

  //atualizar dados RP_OF_OP_LIN
  atualizarRPOFOPLIN(rp_of_cab, qtd_of, ref_INDNUMENR, ref_VAR2, ref_VAR1, ofanumenr, ref_ind, apagar) {

    this.RPOFOPLINService.getRP_OF_OP_LIN(this.ref[this.i].id).subscribe(resp => {
      var rp_lin = new RP_OF_OP_LIN();
      rp_lin = resp[0];
      rp_lin.quant_OF = parseInt(qtd_of);
      rp_lin.ref_VAR1 = ref_VAR1;
      rp_lin.ref_VAR2 = ref_VAR2;
      rp_lin.ref_INDNUMENR = ref_INDNUMENR;
      rp_lin.ref_IND = ref_ind;
      if (apagar) {
        rp_lin.quant_BOAS_TOTAL = 0;
        rp_lin.quant_DEF_TOTAL = 0;
      }
      this.RPOFOPLINService.update(rp_lin).then(
        res => {
          if (apagar) {
            rp_of_cab.op_COD_ORIGEM = null;
            this.RPOFCABService.update(rp_of_cab).then(
              res => {
                this.eliminadef(rp_lin.id_OP_LIN);
              });

          } else {
            this.inserir_def(rp_of_cab, ofanumenr)
          }
        },
        error => {
          console.log(error);
          this.simular(this.closewaiting);
          this.inicia();
        });

    }, error => console.log(error));
  }

  //inserir os defeitos da ref apartir da etiqueta
  inserir_def(rp_of_cab, ofanumenr) {
    this.service.getOPTop1(ofanumenr).subscribe(
      response => {
        //atualiza OPECOD
        rp_of_cab.op_COD_ORIGEM = response[0].OPECOD;
        this.RPOFCABService.update(rp_of_cab).then(
          res => { });

        var count1 = Object.keys(response).length;
        if (count1 > 0) {
          for (var x in response) {
            console.log(response[x].OPECOD)
            this.deftoref(response[x].OPECOD, count1, x);
          }

        } else {
          this.simular(this.closewaiting);
          this.inicia();
        }

      },
      error => {
        console.log(error);
        this.simular(this.closewaiting);
        this.inicia();
      });
  }

  //insere na tabela RP_OF_DEF_LIN
  deftoref(op_cod, total, countto) {
    this.RPCONFOPService.getAllbyid(op_cod).subscribe(
      res => {
        var count1 = Object.keys(res).length;
        if (count1 > 0) {
          //adicionar a lista de defeitos a partir da lista de familias
          for (var x in res) {
            //getdefeitos
            this.getdefeitosop(res, x, countto, total);
          }
        } else {
          if ((parseInt(countto) + 1) == total) {
            this.simular(this.closewaiting);
            this.inicia();
          }
        }
      },
      error => {
        console.log(error);
        this.simular(this.closewaiting);
        this.inicia();
      });
  }

  getdefeitosop(res, x, countto, total) {
    this.service.defeitos(res[x].id_OP_SEC.trim()).subscribe(
      result => {
        var count = Object.keys(result).length;
        if (count > 0) {
          //inserir em RP_OF_DEF_LIN
          for (var y in result) {
            var def = new RP_OF_DEF_LIN();
            def.cod_DEF = result[y].QUACOD;
            def.desc_DEF = result[y].QUALIB;
            def.id_OP_LIN = this.ref[this.i].id;
            def.id_UTZ_CRIA = this.username;
            def.quant_DEF = 0;
            def.data_HORA_REG = new Date();
            this.inserRPOFDEFLINS(def, countto, total, y, count);
          }

        } else {
          if ((parseInt(countto) + 1) == total) {
            if (!this.fechou) {
              this.simular(this.closewaiting);
              this.inicia();
              this.fechou = true;
            }
          }
        }
      },
      error => {
        console.log(error);
        this.simular(this.closewaiting);
        this.inicia();
      });
  }
  inserRPOFDEFLINS(def, countto, total, countto2, total2) {
    this.RPOFDEFLINService.create(def).subscribe(resp => {
      if ((parseInt(countto) + 1) == total && (parseInt(countto2) + 1) == total2) {
        if (!this.fechou) {
          this.simular(this.closewaiting);
          this.inicia();
          this.fechou = true;
        }
      }
    });
  }
  //ao alterar tab alterar inputs
  handleChange(event) {
    if (this.positions.find(item => item.index === (parseInt(event.index) + 1))) {
      var position = this.positions.find(item => item.index === (parseInt(event.index) + 1));
      this.getinputs(position.id);
    }

  }


  //ver lista de defeitos apartir da familia
  getinputs(id) {
    this.items = [];
    this.RPOFDEFLINService.getbyid(id, this.ref[this.i].id).subscribe(res => {
      var countt = Object.keys(res).length;
      //se existir operações
      if (countt > 0) {
        for (var x in res) {
          this.items.push({ cod: res[x].cod_DEF, des: res[x].desc_DEF.trim(), value: res[x].quant_DEF, id_DEF_LIN: res[x].id_DEF_LIN });
          this.obdsdef = res[x].obs_DEF;
        }
        this.simular(this.carregaaltura);
      } else {
        var index = (this.tabSets.findIndex(item => item.id == id));
        this.tabSets.splice(index);
      }
    }, error => console.log(error));

  }


  //atualiza totalcontrol
  updatetotal(num: number) {
    this.qttboas = num;
    this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
    //ao alterar valor qtd. boas atualiza na BD

    this.RPOFOPLINService.getRP_OF_OP_LIN(this.ref[this.i].id).subscribe(resp => {
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
    this.comp = this.ref[this.i].comp;
    this.num_lote = this.ref[this.i].of_num;
    this.spinner = false;
    this.refresh = true;
    this.bt_class = "btn-primary";
    this.num_etiqueta = "";
    this.positions = [];
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
    this.comp = this.ref[this.i].comp;
    this.num_lote = this.ref[this.i].of_num;
    this.spinner = false;
    this.refresh = true;
    this.bt_class = "btn-primary";
    this.num_etiqueta = "";
    this.positions = [];
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
    this.verificacoes_adicionais(id);
    this.RPOFOPLINService.getRP_OF_OP_LINOp(id).subscribe(res => {
      this.index = 0;
      var cod = null;
      if (res[0].op_COD_ORIGEM != null && res[0].op_COD_ORIGEM != "") {
        cod = res[0].op_COD_ORIGEM;
        this.famassociadas(cod, id);
      } else {
        cod = res[0].op_COD.split(',');
        for (var x in cod) {
          this.famassociadas(cod[x], id);
        }

      }

    }, error => console.log(error));
    this.controlaquantidade();
  }

  //pesquisa as familias ligadas à operação
  famassociadas(cod, id) {
    this.RPCONFOPService.getAllbyid(cod).subscribe(res2 => {

      var count = Object.keys(res2).length;
      //se existir operações
      if (count > 0) {
        for (var x in res2) {
          this.index++;
          this.tabSets.push({ label: res2[x].id_OP_SEC + " - " + res2[x].nome_OP_SEC, id: res2[x].id_OP_SEC.trim(), id_op: id });
          this.positions.push({ index: this.index, id: res2[x].id_OP_SEC.trim() });

        }
        this.getinputs(this.positions[0].id);
      }
    }, error => console.log(error));
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

    this.simular(this.fileInput);
    this.controlaquantidade();
  }

  //simular click 
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
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


  //fechar popups
  cancel() {
    this.displayDialog = false;
  }

  adicionarobs(id) {
    this.id_def = id;
    this.displayDialog = true;
  }

  save() {
    this.RPOFDEFLINService.getbyid(this.id_def, this.ref[this.i].id).subscribe(res => {
      for (var x in res) {
        var rpdef = new RP_OF_DEF_LIN;
        rpdef = res[x];
        rpdef.obs_DEF = this.obdsdef;
        this.updateRPOFDEFLIN(rpdef);
      }
    }, error => console.log(error));
  }

  updateRPOFDEFLIN(data) {
    this.RPOFDEFLINService.update(data).then(() => this.displayDialog = false);
  }

  verificacoes_adicionais(id_op_lin) {
    this.verif_adic = [];
    this.RPOFOUTRODEFLINService.getbyid(id_op_lin).subscribe(res => {
      for (var x in res) {
        this.verif_adic[res[x].id_DEF_OUTRO] = res[x].quant_OUTRODEF;
      }
    }, error => console.log(error));
  }

  gravar() {
    this.RPOFOUTRODEFLINService.getbyid(this.ref[this.i].id).subscribe(res => {
      for (var x in res) {
        var data = new RP_OF_OUTRODEF_LIN;
        data = res[x];
        if (this.verif_adic[res[x].id_DEF_OUTRO] == true || this.verif_adic[res[x].id_DEF_OUTRO] == 1) {
          data.quant_OUTRODEF = 1;
        } else {
          data.quant_OUTRODEF = 0;
        }

        this.RPOFOUTRODEFLINService.update(data).then(() => this.displayDialog = false);

      }

    }, error => console.log(error));

  }
  concluir() {
    this.location.back();
  }

  //quando um componente tem of, e foi inserido lista de defeitos por engano limpa dados
  apagardados() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que qyer apagar a lista de defeitos?',
      accept: () => {
        this.atualizarRPOFCAB(null, null, null, null, null, null, null, null, true);
      }
    });
  }

  eliminadef(id_op_lin) {
    this.RPOFDEFLINService.delete(id_op_lin).then(
      res => {
        this.inicia();
      },
      error => {
        console.log(error);
        this.inicia();
      })
  }

  //fechar popup etiqueta nao encontada
  fechar() {
    this.displayDialogetiqueta = false;
  }

}
