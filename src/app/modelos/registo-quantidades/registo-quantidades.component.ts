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
import { RP_OF_OP_ETIQUETA } from 'app/modelos/entidades/RP_OF_OP_ETIQUETA';
import { RPOFOPETIQUETAService } from 'app/modelos/services/rp-of-op-etiqueta.service';
import { RPOFLSTDEFService } from 'app/modelos/services/rp-of-lst-def.service';
import { RP_OF_LST_DEF } from 'app/modelos/entidades/RP_OF_LST_DEF';

@Component({
  selector: 'app-registo-quantidades',
  templateUrl: './registo-quantidades.component.html',
  styleUrls: ['./registo-quantidades.component.css']
})
export class RegistoQuantidadesComponent implements OnInit {
  corfundo_ref: string;
  totaldefeitos_ref: number = 0;
  totalcontrol_ref: number = 0;
  qttboas_ref: number = 0;
  username_cria: any;
  tabSets_temp: any[];
  defeito_desg: string;
  id_obdsdef;
  ref_etiqueta = "";
  mensagemdialog: string;
  bt_class1: string;
  spinner_nova: boolean = false;
  display_etiqueta: string;
  num_etiqueta_nova: any;
  displaynovaetiqueta: boolean = false;
  qtd_etiqueta: any;
  qtdetiquetas;
  id_ref_etiq: any;
  ref_num: string;
  operacao_temp: any = [];
  ref_old: any[];
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
  refresh_nova = true;
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
  displayetiquetaslidas = false;
  location: Location;
  etiquetas = [{ num: "123422", qtt: 12 }]
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('dialogwaiting') dialogwaiting: ElementRef;
  @ViewChild('closewaiting') closewaiting: ElementRef;
  @ViewChild('editarclick2') editarclick2: ElementRef;
  @ViewChild('carregaaltura') carregaaltura: ElementRef;
  @ViewChild('divinput') divinput: ElementRef;


  constructor(private RPOFLSTDEFService: RPOFLSTDEFService, private RPOFOPETIQUETAService: RPOFOPETIQUETAService, private elementRef: ElementRef, private confirmationService: ConfirmationService, private RPOFCABService: RPOFCABService, private RPOFOPCABService: RPOFOPCABService, private service: ofService, private RPOFOUTRODEFLINService: RPOFOUTRODEFLINService, private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer, private RPCONFOPService: RPCONFOPService, private RPOFDEFLINService: RPOFDEFLINService, private router: Router, private RPOFOPLINService: RPOFOPLINService, location: Location) {
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

  inicia(apagar = false) {
    this.ref = [];
    this.positions = [];
    this.tabSets = [];
    this.operacao_temp = [];
    if (localStorage.getItem('id_op_cab')) {
      //preencher campos
      this.carregaref(JSON.parse(localStorage.getItem('id_op_cab')), apagar);

    } else {
      this.router.navigate(['./home']);
    }
  }

  //preencher campos
  carregaref(id_op_cab, apagar) {
    this.RPOFOPLINService.getAllbyid(id_op_cab).subscribe(
      response => {
        for (var x in response) {
          this.username_cria = response[x][1].id_UTZ_CRIA;
          var comp = true;
          if (response[x][1].id_OF_CAB_ORIGEM == null) {
            comp = false;
          }
          this.ref.push({
            qtd_etiqueta: null, id_ref_etiq: null, etiqueta: null, comp: comp, of_num: response[x][1].of_NUM, ref_NUM: response[x][0].ref_NUM, design: response[x][0].ref_NUM + " - " + response[x][0].ref_DES, id: response[x][0].id_OP_LIN, op: response[x][0].id_OP_CAB,
            qttboas: response[x][0].quant_BOAS_TOTAL, totaldefeitos: response[x][0].quant_DEF_TOTAL, qtdof: response[x][0].quant_OF,
            qttboas_ref: response[x][0].quant_BOAS_TOTAL, totaldefeitos_ref: response[x][0].quant_DEF_TOTAL, qtdof_ref: response[x][0].quant_OF
          });
        }

        this.ref = this.ref.slice();
        this.ref_old = this.ref;
        this.getetiquetas(apagar);

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
  pesquisaetiqueta(nova = false) {
    this.fechou = false;
    this.display_etiqueta = "";
    var existe_etiqueta = false;
    if (nova) {
      this.display_etiqueta = this.num_etiqueta_nova;
      if (this.etiquetas.find(item => item.num == this.num_etiqueta_nova)) existe_etiqueta = true;
    } else {
      this.display_etiqueta = this.num_etiqueta;
    }
    if (!existe_etiqueta) {
      this.bt_class = "btn-primary";
      if (this.display_etiqueta != "" && this.display_etiqueta != null) {
        this.simular(this.dialogwaiting);
        if (!nova) this.spinner = true;
        if (!nova) this.refresh = false;

        if (nova) this.spinner_nova = true;
        if (nova) this.refresh_nova = false;

        if (this.display_etiqueta.substr(0, 1).toUpperCase() == "S") this.display_etiqueta = this.display_etiqueta.substring(1);
        var etiqueta = "0000000000" + this.display_etiqueta;
        this.service.getEtiqueta(etiqueta.substring(etiqueta.length - 10)).subscribe(
          response => {
            var count = Object.keys(response).length;
            //se existir etiquena com o numero
            if (count > 0) {
              if (response[0].PROREF == this.ref_num) {

                this.simular(this.editarclick2);
                for (var x in response) {
                  this.num_lote = response[x].OFNUM;
                  this.atualizarRPOFOPLIN(response[x].OFNUM, response[x].ofref, response[x].ofanumenr, response[x].ETQEMBQTE, response[x].INDNUMENR, response[x].VA2REF, response[x].VA1REF, response[x].INDREF);

                }
                if (!nova) {
                  this.spinner = false;
                  this.refresh = true;
                }
                if (nova) {
                  this.spinner_nova = false;
                  this.refresh_nova = true;
                }
              } else {
                this.simular(this.closewaiting);
                if (!nova) {
                  this.bt_class = "btn-danger";
                  this.spinner = false;
                  this.refresh = true;
                }
                if (nova) {
                  this.bt_class1 = "btn-danger";
                  this.spinner_nova = false;
                  this.refresh_nova = true;
                }
                this.displayDialogetiqueta = true;
                this.mensagemdialog = "não pertence a esta referência!";
              }
            } else {
              this.simular(this.closewaiting);
              if (!nova) {
                this.bt_class = "btn-danger";
                this.spinner = false;
                this.refresh = true;
              }
              if (nova) {
                this.bt_class1 = "btn-danger";
                this.spinner_nova = false;
                this.refresh_nova = true;
              }
              this.displayDialogetiqueta = true;
              this.mensagemdialog = "não foi encontrada!";
            }
          },
          error => {
            console.log(error);
            this.simular(this.closewaiting);

            if (!nova) {
              this.bt_class = "btn-danger";
              this.spinner = false;
              this.refresh = true;
            }
            if (nova) {
              this.bt_class1 = "btn-danger";
              this.spinner_nova = false;
              this.refresh_nova = true;
            }
          });
      }
    } else {
      this.displayDialogetiqueta = true;
      this.mensagemdialog = "já foi inserida!";
    }
  }

  //atualizar dados RP_OF_OP_LIN
  atualizarRPOFOPLIN(of_NUM, of_OBS, ofanumenr, qtd_eti, ref_INDNUMENR, ref_VAR2, ref_VAR1, ref_ind, apagar = false, id_eti = null) {

    this.RPOFOPLINService.getRP_OF_OP_LIN(this.ref[this.i].id).subscribe(resp => {
      var rp_lin = new RP_OF_OP_LIN();
      rp_lin = resp[0];
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

            this.eliminadef(rp_lin.id_OP_LIN, id_eti);

          } else {
            this.inserir_def(ofanumenr, of_NUM, qtd_eti, this.ref[this.i].id, of_OBS)
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
  inserir_def(ofanumenr, of_NUM, qtd_eti, id, ofref) {
    this.service.getOPTop1(ofanumenr).subscribe(
      response => {
        //atualiza OPECOD
        var rp_of_op_etiqueta = new RP_OF_OP_ETIQUETA();
        rp_of_op_etiqueta.op_COD_ORIGEM = response[0].OPECOD;
        rp_of_op_etiqueta.id_UTZ_CRIA = this.username;
        rp_of_op_etiqueta.data_HORA_MODIF = new Date();
        rp_of_op_etiqueta.of_NUM_ORIGEM = of_NUM;
        rp_of_op_etiqueta.ref_LOTE = ofref;
        rp_of_op_etiqueta.ref_ETIQUETA = this.display_etiqueta;
        rp_of_op_etiqueta.ref_NUM = this.ref_num;
        rp_of_op_etiqueta.id_OP_LIN = this.ref[this.i].id;
        rp_of_op_etiqueta.quant_ETIQUETA = parseInt(qtd_eti);
        rp_of_op_etiqueta.quant_BOAS = 0;
        rp_of_op_etiqueta.quant_DEF = 0;
        //create
        this.RPOFOPETIQUETAService.create(rp_of_op_etiqueta).then(
          res => {

          },
          error => {
            console.log(error);
            this.simular(this.closewaiting);
            this.inicia();
          });

        var count1 = Object.keys(response).length;
        if (count1 > 0) {
          var ult = false;
          for (var x in response) {
            if (parseInt(x) + 1 == count1) ult = true;
            this.deftoref(response[x].OPECOD, ult, id);
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

  //ver familias de defeitos
  deftoref(op_cod, ultimo, id) {
    this.RPCONFOPService.getAllbyid(op_cod).subscribe(
      res => {
        var count1 = Object.keys(res).length;
        if (count1 > 0) {
          //adicionar a lista de defeitos a partir da lista de familias
          var ult = false;
          for (var x in res) {
            //getdefeitos
            if (parseInt(x) + 1 == count1) ult = true;
            this.getdefeitosop(res, x, ult, id);
          }
        } else {
          if (ultimo) {
            this.simular(this.closewaiting);
            this.displaynovaetiqueta = false;
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

  getdefeitosop(res, x, ultimo, id) {
    this.RPOFLSTDEFService.getDef(id).subscribe(
      resultdef => {
        var count = Object.keys(resultdef).length;
        if (count == 0) {
          this.service.defeitos(res[x].id_OP_SEC.trim()).subscribe(
            result => {
              var count = Object.keys(result).length;
              if (count > 0) {
                //inserir em RP_OF_DEF_LIN
                var ult = false;
                for (var y in result) {
                  if (result[y].QUACOD.substring(2, 4) != '00') {
                    var def = new RP_OF_LST_DEF();
                    def.cod_DEF = result[y].QUACOD;
                    def.desc_DEF = result[y].QUALIB;
                    def.id_OP_LIN = id;
                    def.id_UTZ_CRIA = this.username
                    def.data_HORA_MODIF = new Date();
                    if (parseInt(y) + 1 == count && ultimo) ult = true;
                    this.inserRPOFLSTDEF(def, ult);
                  }
                }

              } else {
                if (ultimo) {
                  if (!this.fechou) {
                    this.simular(this.closewaiting);
                    this.displaynovaetiqueta = false;
                    this.inicia();
                    this.fechou = true;
                  }
                }
              }
            },
            error => {
              console.log(error);
              if (ultimo) {
                this.simular(this.closewaiting);
                this.inicia();
              }
            });
        } else {
          if (ultimo) {
            if (!this.fechou) {
              this.simular(this.closewaiting);
              this.inicia();
              this.displaynovaetiqueta = false;
              this.fechou = true;
            }
          }
        }
      },
      error => {
        console.log(error);
        if (ultimo) this.simular(this.closewaiting);
        this.inicia();
      });

  }

  inserRPOFLSTDEF(def, ultimo) {
    this.RPOFLSTDEFService.create(def).subscribe(resp => {
      if (ultimo) {
        if (!this.fechou) {
          this.simular(this.closewaiting);
          this.inicia();
          this.fechou = true;
          this.displaynovaetiqueta = false;
        }
      }
    });
  }
  //ao alterar tab alterar inputs
  handleChange(event) {

    this.id_obdsdef = null;
    if (this.positions.find(item => item.index === (parseInt(event.index) + 1))) {
      var position = this.positions.find(item => item.index === (parseInt(event.index) + 1));
      this.getinputs(position.id);
    }

  }

  //verifica se famili tem defeitos
  verificadefeitos(id, tab, count3, total) {
    if (this.operacao_temp.indexOf(id) == -1) {
      this.operacao_temp.push(id);
      this.items = [];
      this.tabSets_temp.push(tab);
      this.RPOFDEFLINService.getbyid(id, this.ref[this.i].id, this.ref[this.i].id_ref_etiq).subscribe(res => {
        var countt = Object.keys(res).length;
        if (countt > 0) {
          this.index++;

          this.ordernar();
          var count = 1;
          //this.positions = [];
          if (count3 == total) {

            for (var x in this.tabSets_temp) {
              this.positions.push({ index: count, id: this.tabSets_temp[x].id });
              count++;
            }

            if (this.positions.length == this.tabSets_temp.length) {

              if (this.positions.length > 0) {
                this.getinputs(this.positions[0].id);
              }
            }
          }
        } else {
          var index = (this.tabSets_temp.findIndex(item => item.id == id));
          this.tabSets_temp.splice(index, 1);
        }

      }, error => console.log(error));
    }

  }


  //ordernar tabSets
  ordernar() {
    this.tabSets_temp.sort((n1, n2) => {
      if (n1.id > n2.id) {
        return 1;
      }

      if (n1.id < n2.id) {
        return -1;
      }

      return 0;
    });
  }

  //ver lista de defeitos apartir da familia
  getinputs(id) {
    this.items = [];
    this.RPOFDEFLINService.getbyid(id, this.ref[this.i].id, this.ref[this.i].id_ref_etiq).subscribe(res => {
      var countt = Object.keys(res).length;
      var pos = 0;
      if (countt > 0) {
        for (var x in res) {
          pos++;
          this.items.push({ cod: res[x][0], des: res[x][1].trim(), value: res[x][2], id_DEF_LIN: res[x][3], pos: pos, obs: res[x][4] });
        }
        this.tabSets = this.tabSets_temp;
        this.simular(this.carregaaltura);
      } else {
        var index = (this.tabSets_temp.findIndex(item => item.id == id));
        this.tabSets_temp.splice(index, 1);
        var index2 = 1;
        this.positions = [];
        for (var x in this.tabSets_temp) {
          this.positions.push({ index: index2, id: this.tabSets_temp[x].id });
          index2++;
        }
        this.tabSets = this.tabSets_temp;
        if (this.positions.length > 0) {
          this.getinputs(this.positions[0].id);
        }

      }
    }, error => console.log(error));

  }

  carregaraltura() {
    // this.simular(this.carregaaltura);
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
      if (this.ref[this.i].comp) {
        this.RPOFOPETIQUETAService.getAllbyid_eti(this.ref[this.i].id, this.ref[this.i].id_ref_etiq).subscribe(res => {
          var etiq = new RP_OF_OP_ETIQUETA();
          etiq = res[0];
          etiq.quant_BOAS = this.qttboas;
          etiq.quant_DEF = this.totaldefeitos;
          this.RPOFOPETIQUETAService.update(etiq).then(rest => {
            var temp_qtd_boas = 0;
            this.RPOFOPETIQUETAService.getbyid_op_lin(this.ref[this.i].id).subscribe(result => {
              for (var n in result) {
                temp_qtd_boas += result[n].quant_BOAS;
              }

              this.ref[this.i].qttboas_ref = temp_qtd_boas;
              this.qttboas_ref = parseInt(this.ref[this.i].qttboas_ref);
              this.totalcontrol_ref = this.totaldefeitos_ref + this.qttboas_ref;

              rp_lin.quant_BOAS_TOTAL = temp_qtd_boas;
              rp_lin.quant_DEF_TOTAL = this.totaldefeitos;
              this.RPOFOPLINService.update(rp_lin);

              this.controlaquantidade();

            }, error => console.log(error));
          });
        }, error => console.log(error));

      } else {

        this.ref[this.i].totaldefeitos = this.totaldefeitos;
        rp_lin.quant_BOAS_TOTAL = this.qttboas;
        rp_lin.quant_DEF_TOTAL = this.totaldefeitos;
        this.RPOFOPLINService.update(rp_lin);
      }


    }, error => console.log(error));
    this.controlaquantidade();
  }

  //preenchar tabela etiquetas
  getetiquetas(apagar = false) {
    this.etiquetas = [];
    this.qtdetiquetas = 0;

    this.RPOFOPETIQUETAService.getbyid_op_lin(this.ref[this.i].id).subscribe(resp => {
      var count = Object.keys(resp).length;
      var index = count - 1;
      for (var x in resp) {
        this.qtdetiquetas++;
        this.etiquetas.push({ num: resp[x].ref_ETIQUETA, qtt: resp[x].quant_ETIQUETA });
        this.etiquetas = this.etiquetas.slice();
        if (this.ref_etiqueta == resp[x].ref_ETIQUETA) index = parseInt(x);
      }
      if (count > 0) {
        this.ref[this.i].id_ref_etiq = resp[index].id_REF_ETIQUETA;
        this.ref[this.i].of_num = resp[index].of_NUM_ORIGEM;
        this.ref[this.i].qtd_etiqueta = resp[index].quant_ETIQUETA;
        this.ref[this.i].etiqueta = resp[index].ref_ETIQUETA;
        this.ref[this.i].totaldefeitos = resp[index].quant_DEF;
        this.ref[this.i].qttboas = resp[index].quant_BOAS;

        if (apagar) {
          this.submitFunc(true, this.ref[this.i].id, this.ref[this.i].id_ref_etiq, this.ref[this.i].comp, this.i);
        }
      }

      this.ref_name = this.ref[this.i].design;
      this.totaldefeitos = this.ref[this.i].totaldefeitos;
      this.qttboas = this.ref[this.i].qttboas;
      this.qtdof = this.ref[this.i].qtdof;
      this.comp = this.ref[this.i].comp;
      this.num_lote = this.ref[this.i].of_num;
      this.qtd_etiqueta = this.ref[this.i].qtd_etiqueta;
      this.num_etiqueta = this.ref[this.i].etiqueta;
      this.ref_num = this.ref[this.i].ref_NUM;



      this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
      this.getdefeitos(this.ref[this.i].id, this.comp);


    }, error => console.log(error));
  }
  //abre popup nova etiqueta
  novaetiqueta() {
    this.spinner_nova = false;
    this.refresh_nova = true;
    this.bt_class1 = "btn-primary";
    this.num_etiqueta_nova = "";
    this.displaynovaetiqueta = true;

    setTimeout(() => {
      document.getElementById('inputFocous').focus();
    }, 200);

  }
  cancelnova() {
    this.displaynovaetiqueta = false;
  }

  //passa para a referência seguinte
  nextItem() {
    this.i = this.i + 1;
    this.i = this.i % this.ref.length;
    this.ref_name = this.ref[this.i].design;
    this.id_ref_etiq = this.ref[this.i].id_ref_etiq;
    this.qttboas = parseInt(this.ref[this.i].qttboas);
    this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
    this.qtdof = this.ref[this.i].qtdof;
    this.totalcontrol = this.totaldefeitos + this.qttboas;

    this.totaldefeitos_ref = parseInt(this.ref[this.i].totaldefeitos_ref);
    this.qttboas_ref = parseInt(this.ref[this.i].qttboas_ref);
    this.totalcontrol_ref = this.totaldefeitos_ref + this.qttboas_ref;

    this.comp = this.ref[this.i].comp;
    this.num_lote = this.ref[this.i].of_num;
    this.spinner = false;
    this.refresh = true;
    this.bt_class = "btn-primary";
    this.num_etiqueta = this.ref[this.i].etiqueta;
    this.qtd_etiqueta = this.ref[this.i].qtd_etiqueta;
    this.positions = [];
    this.operacao_temp = [];
    this.id_obdsdef = null;
    //this.getdefeitos(this.ref[this.i].id, this.comp);
    this.getetiquetas();

    setTimeout(() => {
      if (document.getElementById('inputFocous2')) document.getElementById('inputFocous2').focus();
    }, 200);
  }

  //passa para a referência anterior
  prevItem() {
    if (this.i === 0) {
      this.i = this.ref.length;
    }
    this.id_obdsdef = null;
    this.i = this.i - 1;
    this.ref_name = this.ref[this.i].design;
    this.id_ref_etiq = this.ref[this.i].id_ref_etiq;
    this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
    this.qttboas = parseInt(this.ref[this.i].qttboas);
    this.qtdof = this.ref[this.i].qtdof;
    this.totalcontrol = this.totaldefeitos + this.qttboas;

    this.totaldefeitos_ref = parseInt(this.ref[this.i].totaldefeitos_ref);
    this.qttboas_ref = parseInt(this.ref[this.i].qttboas_ref);
    this.totalcontrol_ref = this.totaldefeitos_ref + this.qttboas_ref;

    this.comp = this.ref[this.i].comp;
    this.num_lote = this.ref[this.i].of_num;
    this.qtd_etiqueta = this.ref[this.i].qtd_etiqueta;
    this.spinner = false;
    this.refresh = true;
    this.bt_class = "btn-primary";
    this.num_etiqueta = this.ref[this.i].etiqueta;
    this.positions = [];
    this.operacao_temp = [];
    //this.getdefeitos(this.ref[this.i].id, this.comp);
    this.getetiquetas();

    setTimeout(() => {
      if (document.getElementById('inputFocous2')) document.getElementById('inputFocous2').focus();
    }, 200);
  }

  //faz o calculo do total de defeitos e insere na tabela "lista dos defeitos rejeitados"
  submitFunc(apaga = false, id, id_ref_etiq, comp, i): void {

    this.RPOFOPLINService.getRP_OF_OP_LIN(id).subscribe(resp => {
      var rp_lin = new RP_OF_OP_LIN();
      rp_lin = resp[0];

      if (comp) {
        //se for componente vai pesquisar a lista de defeitos com o id_op_lin e id_ref_etiqueta
        this.RPOFDEFLINService.getbyid_op_lin_eti(id, id_ref_etiq).subscribe(res => {
          var count = Object.keys(res).length;
          var totaldefeitos = 0;
          if (count > 0) {
            for (var x in res) {
              totaldefeitos += res[x].quant_DEF;
            }
            this.ref[i].totaldefeitos = totaldefeitos;
            this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
            this.totalcontrol = parseInt(this.ref[this.i].totaldefeitos) + parseInt(this.ref[this.i].qttboas);
          } else {
            this.totalcontrol = totaldefeitos + parseInt(this.ref[this.i].qttboas);
            this.ref[i].totaldefeitos = totaldefeitos;
            this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
          }
          this.controlaquantidade();
          if (!apaga) {
            this.RPOFOPETIQUETAService.getAllbyid_eti(id, id_ref_etiq).subscribe(res => {
              var etiq = new RP_OF_OP_ETIQUETA();
              etiq = res[0];
              etiq.quant_BOAS = this.ref[i].qttboas;
              etiq.quant_DEF = totaldefeitos;
              this.RPOFOPETIQUETAService.update(etiq);
            }, error => console.log(error));
          }
        }, error => console.log(error));

      }

      this.RPOFDEFLINService.getbyid_op_lin(this.ref[i].id).subscribe(res2 => {
        var count = Object.keys(res2).length;
        if (count > 0) {

          if (!this.ref[i].comp) {
            var totaldefeitos = 0;
            for (var x in res2) {
              totaldefeitos += res2[x].quant_DEF;
            }
            this.ref[i].totaldefeitos = totaldefeitos;
            this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
            this.totalcontrol = parseInt(this.ref[this.i].totaldefeitos) + parseInt(this.ref[this.i].qttboas);
            rp_lin.quant_BOAS_TOTAL = this.ref[i].qttboas;
            rp_lin.quant_DEF_TOTAL = totaldefeitos;
            this.controlaquantidade();
            this.RPOFOPLINService.update(rp_lin);
          } else {
            var temp_totaldefeitos = 0;
            var temp_qtd_boas = 0;
            for (var x in res2) {
              temp_totaldefeitos += res2[x].quant_DEF;
            }
            this.RPOFOPETIQUETAService.getbyid_op_lin(this.ref[i].id).subscribe(result => {
              for (var n in result) {
                temp_qtd_boas += result[n].quant_BOAS;
              }
              rp_lin.quant_BOAS_TOTAL = temp_qtd_boas;
              rp_lin.quant_DEF_TOTAL = temp_totaldefeitos;

              this.ref[i].totaldefeitos_ref = temp_totaldefeitos;
              this.totaldefeitos_ref = parseInt(this.ref[this.i].totaldefeitos_ref);

              this.ref[i].qttboas_ref = temp_qtd_boas;
              this.qttboas_ref = parseInt(this.ref[this.i].qttboas_ref);
              this.totalcontrol_ref = this.totaldefeitos_ref + this.qttboas_ref;
              this.controlaquantidade();
              this.RPOFOPLINService.update(rp_lin);
            }, error => console.log(error));

          }

        } else {
          var totaldefeitos = 0;
          if (!this.ref[i].comp) this.totalcontrol = totaldefeitos + parseInt(this.ref[this.i].qttboas);

          rp_lin.quant_BOAS_TOTAL = this.ref[i].qttboas;
          rp_lin.quant_DEF_TOTAL = 0;
          this.ref[i].totaldefeitos = 0;
          this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);


          this.ref[i].totaldefeitos_ref = 0;
          this.totaldefeitos_ref = parseInt(this.ref[this.i].totaldefeitos_ref);

          this.qttboas_ref = parseInt(this.ref[this.i].qttboas_ref);
          this.totalcontrol_ref = this.totaldefeitos_ref + this.qttboas_ref;

          this.RPOFOPLINService.update(rp_lin);

        }
        this.controlaquantidade();
      }, error => console.log(error));
    }, error => console.log(error));
  }

  //subtrair valor ao input defeito
  menos(code, item) {
    //var input = (<HTMLInputElement>document.getElementById(code));
    if (parseInt(item.value) > 0) {
      /* input.value = (parseInt(input.value) - 1).toString();
       let evt = document.createEvent('Event');
       evt.initEvent('input', true, false);
       input.dispatchEvent(evt);*/
      item.value = item.value - 1;
      this.alteraValor(item.value, item.id_DEF_LIN, item.pos, item.cod, item.des)
    }
  }

  //somar valor ao input defeito
  mais(code, item) {
    /*var input = (<HTMLInputElement>document.getElementById(code));
    input.value = (parseInt(input.value) + 1).toString();
    let evt = document.createEvent('Event');
    evt.initEvent('input', true, false);
    input.dispatchEvent(evt);*/
    item.value = item.value + 1;
    this.alteraValor(item.value, item.id_DEF_LIN, item.pos, item.cod, item.des)

  }


  //subtrair valor ao input  qtd boas
  menosqtdboas() {
    if (this.qttboas > 0) {
      this.qttboas--;
      this.updatetotal(this.qttboas);
    }
  }

  //somar valor ao input qtd boas
  maisqtdboas() {
    this.qttboas++;
    this.updatetotal(this.qttboas)
  }

  limpardados() {
    this.num_etiqueta = "";
  }

  limpardados2() {
    this.num_etiqueta_nova = "";
  }

  //carregar defeitos da ref
  getdefeitos(id, comp) {
    this.tabSets = [];
    this.tabSets_temp = [];
    this.verificacoes_adicionais(id);
    if (comp) {
      this.RPOFOPETIQUETAService.getbyid_op_lin(id).subscribe(res => {
        this.index = 0;
        var cod = null;
        var count = Object.keys(res).length;
        this.simular(this.carregaaltura);
        if (count > 0) {
          if (res[0].op_COD_ORIGEM != null && res[0].op_COD_ORIGEM != "") {
            cod = res[0].op_COD_ORIGEM;
            this.famassociadas(cod, id);
          }
          this.simular(this.carregaaltura);
        }
      }, error => console.log(error));

    } else {
      this.RPOFOPLINService.getRP_OF_OP_LINOp(id).subscribe(res => {
        this.index = 0;
        var cod = null;
        //alterar
        cod = res[0].op_COD.split(',');
        for (var x in cod) {
          this.famassociadas(cod[x], id);
        }
        this.simular(this.carregaaltura);

      }, error => console.log(error));

    }

    this.controlaquantidade();
  }

  //pesquisa as familias ligadas à operação
  famassociadas(cod, id) {
    if (cod != "") {
      this.RPCONFOPService.getAllbyid(cod).subscribe(res2 => {
        var total = Object.keys(res2).length;
        var count = 0;
        //se existir operações
        if (total > 0) {
          for (var x in res2) {
            count++;
            var tab = { label: res2[x].id_OP_SEC + " - " + res2[x].nome_OP_SEC, id: res2[x].id_OP_SEC.trim(), id_op: id }
            this.verificadefeitos(res2[x].id_OP_SEC.trim(), tab, count, total);
          }
        }
      }, error => console.log(error));
    }
  }

  //alterar valor defeitos
  alteraValor(valor, id_DEF_LIN, pos, cod, desc) {
    var i = this.i;
    var comp = this.ref[this.i].comp;
    var id_ref_etiq = this.ref[this.i].id_ref_etiq;
    var id = this.ref[this.i].id;

    if (id_DEF_LIN == 0 && (valor == 0 || valor == "")) {
      //não faz nada

    } else if (valor > 0) {
      var rp = new RP_OF_DEF_LIN();
      rp.quant_DEF = valor;
      rp.id_UTZ_CRIA = this.username;
      rp.id_UTZ_MODIF = this.username;
      if (this.username != this.username_cria) {
        rp.id_UTZ_CRIA = this.username_cria;
      }
      rp.data_HORA_REG = new Date();
      rp.cod_DEF = cod;
      rp.desc_DEF = desc;
      rp.id_OP_LIN = this.ref[this.i].id;
      if (this.ref[this.i].comp) rp.id_REF_ETIQUETA = this.ref[this.i].id_ref_etiq;

      this.RPOFDEFLINService.create_update(rp).subscribe(rest => {
        this.items.find(item => item.pos == pos).id_DEF_LIN = rest.id_DEF_LIN;
        this.submitFunc(false, id, id_ref_etiq, comp, i);
      })

    } else if (id_DEF_LIN != 0 && (valor == 0 || valor == "")) {
      this.RPOFDEFLINService.delete_id_def(id_DEF_LIN).then(rest => {
        this.items.find(item => item.pos == pos).id_DEF_LIN = 0;
        this.submitFunc(false, id, id_ref_etiq, comp, i);
      })

    }
    /*else if ((insert) && valor > 0) {
      var id = this.items.find(item => item.pos == pos).id_DEF_LIN;
      this.RPOFDEFLINService.getbyidDEF(id).subscribe(res => {
        var rp = new RP_OF_DEF_LIN();
        rp = res[0];
        rp.quant_DEF = valor;
        rp.id_UTZ_MODIF = this.username;
        this.RPOFDEFLINService.update(rp).then(rest => {
          this.simular(this.fileInput);
        })
      }, error => console.log(error));
    }*/


  }

  //simular click 
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //Se o total controlado é maior que as quantidades da OF (7) apresenta o valor a vermelho, se for menor, apresenta a amarelo;
  controlaquantidade() {
    if (this.ref[this.i].comp) {

      if (this.totalcontrol == this.qtd_etiqueta) {
        this.corfundo = "fundoverde";
      } else if (this.totalcontrol < this.qtd_etiqueta) {
        this.corfundo = "fundoamarelo";
      } else if (this.totalcontrol > this.qtd_etiqueta) {
        this.corfundo = "fundovermelho";
      }

      if (this.totalcontrol_ref == this.qtdof) {
        this.corfundo_ref = "fundoverde";
      } else if (this.totalcontrol_ref < this.qtdof) {
        this.corfundo_ref = "fundoamarelo";
      } else if (this.totalcontrol_ref > this.qtdof) {
        this.corfundo_ref = "fundovermelho";
      }

    } else {
      if (this.totalcontrol == this.qtdof) {
        this.corfundo = "fundoverde";
      } else if (this.totalcontrol < this.qtdof) {
        this.corfundo = "fundoamarelo";
      } else if (this.totalcontrol > this.qtdof) {
        this.corfundo = "fundovermelho";
      }
    }
  }


  //fechar popups
  cancel() {
    this.displayDialog = false;
  }

  //abrir popup editar etiquetas lidas
  editaretiquetas() {
    this.displayetiquetaslidas = true;
  }

  //ao seleccionar item da tabela
  onRowSelect(num) {
    if (this.ref_etiqueta != num) {
      this.ref_etiqueta = num;
      //this.displayetiquetaslidas = false;
      this.inicia();
    }

  }

  canceleti() {
    this.displayetiquetaslidas = false;
  }

  adicionarobs() {
    if (this.id_obdsdef != null && this.id_obdsdef != 0) {
      this.displayDialog = true;
    }

  }

  //ao clicar no defeito preenche o campo
  selectinput(id, obs, design) {
    this.obdsdef = "";
    this.id_obdsdef = null;
    this.defeito_desg = "";

    if (id != 0) {
      this.obdsdef = obs;
      this.id_obdsdef = id;
      this.defeito_desg = design;
    }


  }

  //guardar observação defeito
  save() {
    this.RPOFDEFLINService.getbyidDEF(this.id_obdsdef).subscribe(res => {
      for (var x in res) {
        var rpdef = new RP_OF_DEF_LIN;
        rpdef = res[x];
        rpdef.id_UTZ_MODIF = this.username;
        rpdef.obs_DEF = this.obdsdef;
        this.updateRPOFDEFLIN(rpdef, this.id_obdsdef);
      }
    }, error => console.log(error));
  }

  updateRPOFDEFLIN(data, id) {
    this.RPOFDEFLINService.update(data).then(() => {
      this.items.find(item => item.id_DEF_LIN == id).obs = data.obs_DEF;
      this.displayDialog = false;
    });
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

        this.RPOFOUTRODEFLINService.update(data);

      }

    }, error => console.log(error));

  }
  concluir() {
    this.location.back();
  }

  //quando um componente tem of, e foi inserido lista de defeitos por engano limpa dados
  apagardados() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que quer apagar a Etiqueta ' + this.num_etiqueta + ' de defeitos?',
      accept: () => {
        this.atualizarRPOFOPLIN(null, null, null, null, null, null, null, null, true, this.ref[this.i].id_ref_etiq);
      }
    });
  }

  eliminadef(id_op_lin, id_eti) {
    this.RPOFDEFLINService.delete(id_op_lin, this.ref[this.i].id_ref_etiq).then(
      res => {
        this.RPOFOPETIQUETAService.delete(id_eti).then(
          res => {
            if (this.etiquetas.length == 1) {
              this.RPOFLSTDEFService.delete_id_op_lin(id_op_lin).then(
                res => {

                });
            }
            this.inicia(true);

          });
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
