import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Renderer } from '@angular/core';
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { Router, ActivatedRoute } from "@angular/router";
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
  selector: 'app-registo-quantidades2',
  templateUrl: './registo-quantidades2.component.html',
  styleUrls: ['./registo-quantidades2.component.css']
})

export class RegistoQuantidades2Component implements OnInit {
  textoloading: string;
  utilizador: boolean = false;
  versao_modif: any;
  modoedicao: boolean;
  ref_desg;
  displayDialog2: boolean;
  obs_ref;
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
  result: any;
  i: number = 0;
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
  etiquetas = [];
  cor_fundo = "";

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('dialogwaiting') dialogwaiting: ElementRef;
  @ViewChild('closewaiting') closewaiting: ElementRef;
  //@ViewChild('editarclick2') editarclick2: ElementRef;
  @ViewChild('divinput') divinput: ElementRef;
  modoedicaoeditor = false;


  constructor(private route: ActivatedRoute, private RPOFLSTDEFService: RPOFLSTDEFService, private RPOFOPETIQUETAService: RPOFOPETIQUETAService, private elementRef: ElementRef, private confirmationService: ConfirmationService, private RPOFCABService: RPOFCABService, private RPOFOPCABService: RPOFOPCABService, private service: ofService, private RPOFOUTRODEFLINService: RPOFOUTRODEFLINService, private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer, private RPCONFOPService: RPCONFOPService, private RPOFDEFLINService: RPOFDEFLINService, private router: Router, private RPOFOPLINService: RPOFOPLINService, location: Location) {
    this.location = location;
  };

  ngOnInit() {
    var versionUpdate = (new Date()).getTime();
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/demo.js?v=" + versionUpdate;
    this.elementRef.nativeElement.appendChild(s);
    this.username = JSON.parse(localStorage.getItem('user'))["username"];


    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });

    var versao;
    var sub2 = this.route
      .queryParams
      .subscribe(params => {
        versao = params['v'] || 0;
      });

    this.versao_modif = versao;

    if (id != 0) {
      var url = this.router.routerState.snapshot.url;
      url = url.slice(1);
      var urlarray = url.split("/");
      if (urlarray.length > 1) {

        if (urlarray[1].match("edicao")) {
          this.modoedicao = true;
          this.modoedicaoeditor = true;
        } else {
          this.modoedicao = false;
          this.modoedicaoeditor = false;
        }
      }
    } else {
      this.modoedicao = true;
      this.utilizador = true;
    }

    this.inicia();

  }

  inicia(apagar = false, closewaiting = false) {
    this.ref = [];
    this.tabSets = [];
    this.operacao_temp = [];
    if (localStorage.getItem('id_op_cab')) {
      //preencher campos
      this.carregaref(JSON.parse(localStorage.getItem('id_op_cab')), apagar, closewaiting);

    } else {
      this.router.navigate(['./home']);
    }
  }

  //preencher campos
  carregaref(id_op_cab, apagar, closewaiting) {
    this.RPOFOPLINService.getAllbyid(id_op_cab).subscribe(
      response => {
        for (var x in response) {
          this.username_cria = response[x][1].id_UTZ_CRIA;
          var comp = true;
          var cor_fundo = ""
          if (response[x][1].id_OF_CAB_ORIGEM == null) {
            comp = false;
            cor_fundo = "rgba(254, 188, 89, 0.2)"
          }
          this.ref.push({
            qtd_etiqueta: null, id_ref_etiq: null, etiqueta: null, comp: comp, of_num: response[x][1].of_NUM, ref_NUM: response[x][0].ref_NUM, design: response[x][0].ref_NUM + " - " + response[x][0].ref_DES, id: response[x][0].id_OP_LIN, op: response[x][0].id_OP_CAB,
            qttboas: response[x][0].quant_BOAS_TOTAL_M2, totaldefeitos: response[x][0].quant_DEF_TOTAL_M2, qtdof: response[x][0].quant_OF, cor_fundo: cor_fundo,
            qttboas_ref: response[x][0].quant_BOAS_TOTAL_M2, totaldefeitos_ref: response[x][0].quant_DEF_TOTAL_M2, qtdof_ref: response[x][0].quant_OF, obs_ref: response[x][0].obs_REF
          });
        }

        this.ref = this.ref.slice();
        this.ref_old = this.ref;
        this.getetiquetas(this.i, apagar, closewaiting);

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
      if (this.etiquetas.find(item => ("0000000000" + item.num).substring(("0000000000" + item.num).length - 10) ==
        ("0000000000" + this.num_etiqueta_nova).substring(("0000000000" + this.num_etiqueta_nova).length - 10))) existe_etiqueta = true;
    } else {
      this.display_etiqueta = this.num_etiqueta;
    }
    if (!existe_etiqueta) {
      this.bt_class = "btn-primary";
      if (this.display_etiqueta != "" && this.display_etiqueta != null) {
        this.simular(this.dialogwaiting);
        this.textoloading = "A Pesquisar...";
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
                localStorage.setItem('siip_edicao', 'true');
                //this.simular(this.editarclick2);
                this.textoloading = "A Inserir Dados...";
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
              if (this.closewaiting) this.simular(this.closewaiting);
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
        rp_lin.quant_BOAS_TOTAL_M1 = 0;
        rp_lin.quant_DEF_TOTAL_M1 = 0;
        rp_lin.quant_BOAS_TOTAL_M2 = 0;
        rp_lin.quant_DEF_TOTAL_M2 = 0;
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
          // this.simular(this.closewaiting);
          this.inicia(false, true);
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
        //rp_of_op_etiqueta.op_NUM = '1010';
        rp_of_op_etiqueta.ref_LOTE = ofref;
        rp_of_op_etiqueta.ref_ETIQUETA = this.display_etiqueta;
        rp_of_op_etiqueta.ref_NUM = this.ref_num;
        rp_of_op_etiqueta.id_OP_LIN = this.ref[this.i].id;
        rp_of_op_etiqueta.quant_ETIQUETA = parseInt(qtd_eti);
        rp_of_op_etiqueta.quant_BOAS = 0;
        rp_of_op_etiqueta.quant_DEF = 0;
        rp_of_op_etiqueta.quant_BOAS_M1 = 0;
        rp_of_op_etiqueta.quant_DEF_M1 = 0;
        rp_of_op_etiqueta.quant_BOAS_M2 = 0;
        rp_of_op_etiqueta.quant_DEF_M2 = 0;
        //create
        if (this.modoedicaoeditor) {
          rp_of_op_etiqueta.novo = true;
        }

        var count1 = Object.keys(response).length;
        var op_cod = [];
        if (count1 > 0) {
          var ult = false;

          for (var x in response) {
            if (parseInt(x) + 1 == count1) ult = true;
            if (op_cod.indexOf(response[x].OPECOD) == -1) {
              op_cod.push(response[x].OPECOD);
              this.deftoref(response[x].OPECOD, ult, id);
            }
          }

          rp_of_op_etiqueta.op_COD_FAM = op_cod.toString();
          this.RPOFOPETIQUETAService.create(rp_of_op_etiqueta).then(
            res => {

            },
            error => {
              console.log(error);
              // this.simular(this.closewaiting);
              this.inicia(false, true);
            });

        } else {
          //this.simular(this.closewaiting);
          this.inicia(false, true);
        }

      },
      error => {
        console.log(error);
        //this.simular(this.closewaiting);
        this.inicia(false, true);
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

          this.getdefeitosop(res, id, count1);
        } else {
          if (ultimo) {
            //  this.simular(this.closewaiting);
            this.displaynovaetiqueta = false;
            this.inicia(false, true);
          }
        }
      },
      error => {
        console.log(error);
        //this.simular(this.closewaiting);
        this.inicia(false, true);
      });
  }

  getdefeitosop(res, id, count1) {
    var ultimo = false;
    this.RPOFLSTDEFService.getDef(id).subscribe(
      resultdef => {
        var count = Object.keys(resultdef).length;
        if (count == 0) {
          for (var x in res) {
            //getdefeitos
            if (parseInt(x) + 1 == count1) ultimo = true;
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
                      //this.inicia(false, true);
                      this.fechou = true;
                    }
                  }
                }
              },
              error => {
                console.log(error);
                if (ultimo) {
                  this.simular(this.closewaiting);
                  //this.inicia(false, true);
                }
              });


          }
        } else {
          if (!this.fechou) {
            // this.simular(this.closewaiting);
            this.inicia(false, true);
            this.displaynovaetiqueta = false;
            this.fechou = true;
          }
        }
      },
      error => {
        console.log(error);
        if (ultimo) this.simular(this.closewaiting);
        this.inicia(false, true);
      });

  }

  inserRPOFLSTDEF(def, ultimo) {
    this.RPOFLSTDEFService.create(def).subscribe(resp => {
      if (ultimo) {
        if (!this.fechou) {
          // this.simular(this.closewaiting);
          this.inicia(false, true);
          this.fechou = true;
          this.displaynovaetiqueta = false;
        }
      }
    });
  }


  setactive(tab) {
    for (var x in this.tabSets) {
      if (tab == this.tabSets[x]) {
        this.tabSets[x].ative = "active";
      } else {
        this.tabSets[x].ative = "";
      }
    }
  }

  //verifica se familia tem defeitos
  verificadefeitos(id, tab, count3, total) {
    if (this.operacao_temp.indexOf(id) == -1) {
      this.operacao_temp.push(id);
      this.tabSets_temp.push(tab);
      if (this.closewaiting) this.simular(this.closewaiting);

      this.RPOFDEFLINService.getbyid(id, this.ref[this.i].id, this.ref[this.i].id_ref_etiq).subscribe(res => {
        var countt = Object.keys(res).length;
        var pos = 0;
        if (countt > 0) {
          this.index++;

          this.ordernar();
          var count = 1;
          if (this.tabSets_temp.find(item => item.id == id)) {
            this.tabSets_temp.find(item => item.id == id).defeitos = [];
          }
          for (var x in res) {
            if (res[x][0].substring(2, 4) != '00') {
              pos++;
              if (this.tabSets_temp.find(item => item.id == id)) {
                this.tabSets_temp.find(item => item.id == id).defeitos.push({ cod: res[x][0], des: res[x][1].trim(), value: res[x][2], id_DEF_LIN: res[x][3], pos: pos, obs: res[x][4] });
              }
            }
          }
          this.tabSets = this.tabSets_temp;

          if (count3 == total) {
            //this.tabSets = this.tabSets_temp;
            if (this.tabSets.length > 0) this.tabSets[0].ative = "active";
          }
        } else {
          var index = (this.tabSets_temp.findIndex(item => item.id == id));
          this.tabSets_temp.splice(index, 1);
          if (this.tabSets.length > 0) {
            this.setAll(this.tabSets, "ative", "");
            this.tabSets[0].ative = "active";
          }
        }

      }, error => console.log(error));
    }

  }

  //alterar campo num array
  setAll(array, campo, valor) {
    var i, n = array.length;
    for (var x in array) {
      array[x][campo] = valor;
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


  //atualiza totalcontrol
  updatetotal(num, i, totaldefeitos, qttboas, versao_modif, totaldefeitos_ref, qttboas_ref) {
    localStorage.setItem('siip_edicao', 'true');
    this.qttboas = (num != '') ? num : 0;
    this.totalcontrol = totaldefeitos * 1 + qttboas * 1;
    //ao alterar valor qtd. boas atualiza na BD
    this.RPOFOPLINService.getRP_OF_OP_LIN(this.ref[i].id).subscribe(resp => {
      var rp_lin = new RP_OF_OP_LIN();
      rp_lin = resp[0];
      this.ref[i].qttboas = qttboas;
      if (this.ref[i].comp) {
        this.RPOFOPETIQUETAService.getAllbyid_eti(this.ref[i].id, this.ref[i].id_ref_etiq).subscribe(res => {
          var etiq = new RP_OF_OP_ETIQUETA();
          etiq = res[0];

          if (this.modoedicaoeditor) {

            if (res[0].versao_MODIF == versao_modif) {
              etiq.quant_BOAS_M2 = qttboas;
              etiq.quant_DEF_M2 = totaldefeitos;
            } else {
              etiq.quant_BOAS_M1 = etiq.quant_BOAS_M2;
              etiq.quant_DEF_M1 = etiq.quant_DEF_M2;
              etiq.quant_BOAS_M2 = qttboas;
              etiq.quant_DEF_M2 = totaldefeitos;
              etiq.versao_MODIF = versao_modif;
            }
          } else {
            etiq.quant_BOAS = qttboas;
            etiq.quant_DEF = totaldefeitos;
            etiq.quant_BOAS_M1 = qttboas;
            etiq.quant_DEF_M1 = totaldefeitos;
            etiq.quant_BOAS_M2 = qttboas;
            etiq.quant_DEF_M2 = totaldefeitos;
          }


          this.RPOFOPETIQUETAService.update(etiq).then(rest => {
            var temp_qtd_boas = 0;
            this.RPOFOPETIQUETAService.getbyid_op_lin(this.ref[i].id).subscribe(result => {
              for (var n in result) {
                temp_qtd_boas += result[n].quant_BOAS_M2;
              }

              this.ref[i].qttboas_ref = temp_qtd_boas;
              this.qttboas_ref = parseInt(this.ref[i].qttboas_ref);
              this.totalcontrol_ref = totaldefeitos_ref + qttboas_ref;

              if (this.modoedicaoeditor) {
                if (rp_lin.versao_MODIF == versao_modif) {
                  rp_lin.quant_BOAS_TOTAL_M2 = temp_qtd_boas;
                  rp_lin.quant_DEF_TOTAL_M2 = totaldefeitos;
                } else {
                  rp_lin.quant_BOAS_TOTAL_M1 = rp_lin.quant_BOAS_TOTAL_M2;
                  rp_lin.quant_DEF_TOTAL_M1 = rp_lin.quant_DEF_TOTAL_M2;
                  rp_lin.quant_BOAS_TOTAL_M2 = temp_qtd_boas;
                  rp_lin.quant_DEF_TOTAL_M2 = totaldefeitos;
                  rp_lin.versao_MODIF = versao_modif;
                }
              } else {
                rp_lin.quant_BOAS_TOTAL = temp_qtd_boas;
                rp_lin.quant_DEF_TOTAL = totaldefeitos;

                rp_lin.quant_BOAS_TOTAL_M1 = temp_qtd_boas;
                rp_lin.quant_DEF_TOTAL_M1 = totaldefeitos;
                rp_lin.quant_BOAS_TOTAL_M2 = temp_qtd_boas;
                rp_lin.quant_DEF_TOTAL_M2 = totaldefeitos;
              }

              this.RPOFOPLINService.update(rp_lin);

              this.controlaquantidade();

            }, error => console.log(error));
          });
        }, error => console.log(error));

      } else {

        this.ref[i].totaldefeitos = this.totaldefeitos;

        if (this.modoedicaoeditor) {
          if (rp_lin.versao_MODIF == this.versao_modif) {
            rp_lin.quant_BOAS_TOTAL_M2 = this.qttboas;
            rp_lin.quant_DEF_TOTAL_M2 = this.totaldefeitos;
          } else {
            rp_lin.quant_BOAS_TOTAL_M1 = rp_lin.quant_BOAS_TOTAL_M2;
            rp_lin.quant_DEF_TOTAL_M1 = rp_lin.quant_DEF_TOTAL_M2;
            rp_lin.quant_BOAS_TOTAL_M2 = this.qttboas;
            rp_lin.quant_DEF_TOTAL_M2 = this.totaldefeitos;
            rp_lin.versao_MODIF = this.versao_modif;
          }
        } else {
          rp_lin.quant_BOAS_TOTAL = this.qttboas;
          rp_lin.quant_DEF_TOTAL = this.totaldefeitos;

          rp_lin.quant_BOAS_TOTAL_M1 = this.qttboas;
          rp_lin.quant_DEF_TOTAL_M1 = this.totaldefeitos;
          rp_lin.quant_BOAS_TOTAL_M2 = this.qttboas;
          rp_lin.quant_DEF_TOTAL_M2 = this.totaldefeitos;
        }


        this.RPOFOPLINService.update(rp_lin);
      }


    }, error => console.log(error));
    this.controlaquantidade();
  }

  //preenchar tabela etiquetas
  getetiquetas(i, apagar = false, closewaiting) {
    this.RPOFOPETIQUETAService.getbyid_op_lin(this.ref[i].id).subscribe(resp => {
      var ind = i;
      this.i = ind;
      this.qtdetiquetas = 0;
      var count = Object.keys(resp).length;
      var index = count - 1;
      this.etiquetas = [];
      for (var x in resp) {
        this.qtdetiquetas++;
        this.etiquetas.push({ num: resp[x].ref_ETIQUETA, qtt: resp[x].quant_ETIQUETA });
        this.etiquetas = this.etiquetas.slice();
        if (this.ref_etiqueta == resp[x].ref_ETIQUETA) index = parseInt(x);
      }
      if (count > 0 && this.ref.length > 0) {
        this.ref[ind].id_ref_etiq = resp[index].id_REF_ETIQUETA;
        this.ref[ind].of_num = resp[index].of_NUM_ORIGEM;
        this.ref[ind].qtd_etiqueta = resp[index].quant_ETIQUETA;
        this.ref[ind].etiqueta = resp[index].ref_ETIQUETA;
        this.ref[ind].totaldefeitos = resp[index].quant_DEF_M2;
        this.ref[ind].qttboas = resp[index].quant_BOAS_M2;

        if (apagar) {
          this.submitFunc(true, this.ref[ind].id, this.ref[ind].id_ref_etiq, this.ref[ind].comp, ind);
        }
      }
      if (this.ref.length > 0) {
        this.ref_name = this.ref[ind].design;
        this.totaldefeitos = this.ref[ind].totaldefeitos;
        this.qttboas = this.ref[ind].qttboas;
        this.qtdof = this.ref[ind].qtdof;
        this.comp = this.ref[ind].comp;
        this.num_lote = this.ref[ind].of_num;
        this.qtd_etiqueta = this.ref[ind].qtd_etiqueta;
        this.num_etiqueta = this.ref[ind].etiqueta;
        this.ref_num = this.ref[ind].ref_NUM;
        this.cor_fundo = this.ref[ind].cor_fundo;
        this.obs_ref = this.ref[ind].obs_ref;
        this.ref_name = this.ref[ind].design;
        this.id_ref_etiq = this.ref[ind].id_ref_etiq;
        this.qttboas = parseInt(this.ref[ind].qttboas);
        this.totaldefeitos = parseInt(this.ref[ind].totaldefeitos);
        this.qtdof = this.ref[ind].qtdof;
        this.totalcontrol = this.totaldefeitos + this.qttboas;

        this.totaldefeitos_ref = parseInt(this.ref[ind].totaldefeitos_ref);
        this.qttboas_ref = parseInt(this.ref[ind].qttboas_ref);
        this.totalcontrol_ref = this.totaldefeitos_ref + this.qttboas_ref;

        this.comp = this.ref[ind].comp;
        this.num_lote = this.ref[ind].of_num;
        this.spinner = false;
        this.refresh = true;
        this.bt_class = "btn-primary";
        this.num_etiqueta = this.ref[ind].etiqueta;
        this.qtd_etiqueta = this.ref[ind].qtd_etiqueta;

        this.operacao_temp = [];
        this.id_obdsdef = null;

        this.totalcontrol = this.totaldefeitos * 1 + this.qttboas * 1;
        this.getdefeitos(this.ref[ind].id, this.comp);
      }

      if (closewaiting) this.simular(this.closewaiting);

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

    //this.getdefeitos(this.ref[this.i].id, this.comp);
    this.getetiquetas(this.i, false, false);
    setTimeout(() => {
      if (document.getElementById('inputFocous2')) document.getElementById('inputFocous2').focus();
    }, 200);
  }

  //passa para a referência anterior
  prevItem() {
    if (this.i === 0) {
      this.i = this.ref.length;
    }
    this.i = this.i - 1;

    //this.getdefeitos(this.ref[this.i].id, this.comp);
    this.getetiquetas(this.i, false, false);
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

        var totaldefeitos = 0;

        for (var t in this.tabSets) {
          for (var h in this.tabSets[t].defeitos) {
            totaldefeitos += this.tabSets[t].defeitos[h].value;
          }
        }

        this.ref[i].totaldefeitos = totaldefeitos;
        this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
        this.totalcontrol = parseInt(this.ref[this.i].totaldefeitos) + parseInt(this.ref[this.i].qttboas);

        this.controlaquantidade();
        if (!apaga) {
          this.RPOFOPETIQUETAService.getAllbyid_eti(id, id_ref_etiq).subscribe(res => {
            var etiq = new RP_OF_OP_ETIQUETA();
            etiq = res[0];

            if (!this.modoedicaoeditor) {
              etiq.quant_BOAS = this.ref[i].qttboas;
              etiq.quant_DEF = totaldefeitos;
              etiq.versao_MODIF = this.versao_modif;
            }

            etiq.quant_BOAS_M1 = this.ref[i].qttboas;
            etiq.quant_DEF_M1 = totaldefeitos;
            etiq.quant_BOAS_M2 = this.ref[i].qttboas;
            etiq.quant_DEF_M2 = totaldefeitos;

            this.RPOFOPETIQUETAService.update(etiq);
          }, error => console.log(error));
        }
      }


      this.RPOFDEFLINService.getbyid_op_lin(this.ref[i].id).subscribe(res2 => {
        var count = Object.keys(res2).length;
        if (count > 0) {

          if (!this.ref[i].comp) {
            var totaldefeitos2 = 0;
            for (var x in res2) {
              totaldefeitos2 += res2[x].quant_DEF_M2;
            }
            this.ref[i].totaldefeitos = totaldefeitos2;
            this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
            this.totalcontrol = parseInt(this.ref[this.i].totaldefeitos) + parseInt(this.ref[this.i].qttboas);
            rp_lin.quant_BOAS_TOTAL = this.ref[i].qttboas;
            rp_lin.quant_DEF_TOTAL = totaldefeitos2;

            rp_lin.quant_BOAS_TOTAL_M1 = this.ref[i].qttboas;
            rp_lin.quant_DEF_TOTAL_M1 = totaldefeitos2;
            rp_lin.quant_BOAS_TOTAL_M2 = this.ref[i].qttboas;
            rp_lin.quant_DEF_TOTAL_M2 = totaldefeitos2;
            this.controlaquantidade();
            this.RPOFOPLINService.update(rp_lin);
          } else {
            var temp_totaldefeitos = 0;
            var temp_qtd_boas = 0;
            for (var x in res2) {
              temp_totaldefeitos += res2[x].quant_DEF_M2;
            }
            this.RPOFOPETIQUETAService.getbyid_op_lin(this.ref[i].id).subscribe(result => {
              for (var n in result) {
                temp_qtd_boas += result[n].quant_BOAS_M2;
              }
              rp_lin.quant_BOAS_TOTAL = temp_qtd_boas;
              rp_lin.quant_DEF_TOTAL = temp_totaldefeitos;

              rp_lin.quant_BOAS_TOTAL_M1 = temp_qtd_boas;
              rp_lin.quant_DEF_TOTAL_M1 = temp_totaldefeitos;
              rp_lin.quant_BOAS_TOTAL_M2 = temp_qtd_boas;
              rp_lin.quant_DEF_TOTAL_M2 = temp_totaldefeitos;

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

          rp_lin.quant_BOAS_TOTAL_M1 = this.ref[i].qttboas;
          rp_lin.quant_DEF_TOTAL_M1 = 0;
          rp_lin.quant_BOAS_TOTAL_M2 = this.ref[i].qttboas;
          rp_lin.quant_DEF_TOTAL_M2 = 0;

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
      this.alteraValor(item.value, item.id_DEF_LIN, item.pos, item.cod, item.des);
      this.totalcontrol_ref--;
      this.totalcontrol--;
      this.totaldefeitos--;
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
    this.alteraValor(item.value, item.id_DEF_LIN, item.pos, item.cod, item.des);
    this.totalcontrol_ref++;
    this.totalcontrol++;
    this.totaldefeitos++;

  }


  //subtrair valor ao input  qtd boas
  menosqtdboas() {
    if (this.qttboas > 0) {
      this.qttboas--;
      this.updatetotal(this.qttboas, this.i, this.totaldefeitos, this.qttboas, this.versao_modif, this.totaldefeitos_ref, this.qttboas_ref);
    }
  }

  //somar valor ao input qtd boas
  maisqtdboas() {
    this.qttboas++;
    this.updatetotal(this.qttboas, this.i, this.totaldefeitos, this.qttboas, this.versao_modif, this.totaldefeitos_ref, this.qttboas_ref);
  }

  limpardados() {
    this.num_etiqueta = "";
    setTimeout(() => {
      document.getElementById('inputFocous2').focus();
    }, 200);
  }

  limpardados2() {
    this.num_etiqueta_nova = "";
    setTimeout(() => {
      document.getElementById('inputFocous').focus();
    }, 200);
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
        if (count > 0) {
          if (res[0].op_COD_ORIGEM != null && res[0].op_COD_ORIGEM != "") {
            //cod = res[0].op_COD_ORIGEM;
            cod = res[0].op_COD_FAM.split(',');
            for (var x in cod) {
              this.famassociadas(cod[x], id);
            }
          }

        }
      }, error => console.log(error));

      if (this.closewaiting) this.simular(this.closewaiting);

    } else {
      this.RPOFOPLINService.getRP_OF_OP_LINOp(id).subscribe(res => {
        this.index = 0;
        var cod = null;
        //alterar
        cod = res[0].op_COD.split(',');
        for (var x in cod) {
          this.famassociadas(cod[x], id);
        }

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
            var ative = "";
            //if (parseInt(x) == 0) ative = "active";
            var tab = { ative: ative, label: res2[x].id_OP_SEC + " - " + res2[x].nome_OP_SEC, id: res2[x].id_OP_SEC.trim(), id_op: id, defeitos: [] }
            this.verificadefeitos(res2[x].id_OP_SEC.trim(), tab, count, total);
          }
        }
      }, error => console.log(error));
    }
  }

  //alterar valor defeitos
  alteraValor(valor, id_DEF_LIN, pos, cod, desc) {
    localStorage.setItem('siip_edicao', 'true');
    var i = this.i;
    var comp = this.ref[this.i].comp;
    var id_ref_etiq = this.ref[this.i].id_ref_etiq;
    var id = this.ref[this.i].id;

    if (id_DEF_LIN == 0 && (valor == 0 || valor == "")) {
      //não faz nada

    } else if (valor > 0 || (this.modoedicaoeditor)) {
      var rp = new RP_OF_DEF_LIN();

      if (this.modoedicaoeditor) {
        rp.versao_MODIF = this.versao_modif;
        rp.quant_DEF_M1 = valor;
        rp.quant_DEF_M2 = valor;
      } else {
        rp.quant_DEF = valor;
        rp.quant_DEF_M1 = valor;
        rp.quant_DEF_M2 = valor;
      }

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

        this.tabSets.find(item => item.id == cod.substring(0, 2)).defeitos.find(item => item.pos == pos).id_DEF_LIN = rest[0][0];
        //this.submitFunc(false, id, id_ref_etiq, comp, i);

        this.atualizarvalordefeitos(id, comp, id_ref_etiq, i, rest[0][1], rest[0][2]);
      })

    } else if (id_DEF_LIN != 0 && (valor == 0 || valor == "")) {

      this.RPOFDEFLINService.delete_id_def(id_DEF_LIN).then(rest => {
        this.tabSets.find(item => item.id == cod.substring(0, 2)).defeitos.find(item => item.pos == pos).id_DEF_LIN = 0;
        this.submitFunc(false, id, id_ref_etiq, comp, i);
      })

    }

  }

  atualizarvalordefeitos(id, comp, id_ref_etiq, i, total_ref, total_etique) {
    this.RPOFOPLINService.getRP_OF_OP_LIN(id).subscribe(resp => {
      var rp_lin = new RP_OF_OP_LIN();
      rp_lin = resp[0];



      var totaldefeitos = 0;
      var totaldefeitos2 = 0;
      if (total_ref != null) totaldefeitos = total_ref;

      if (total_etique != null) totaldefeitos2 = total_etique;

      if (comp) {
        this.ref[i].totaldefeitos = totaldefeitos;
        this.ref[i].totaldefeitos_ref = totaldefeitos2;

        if (this.modoedicaoeditor) {
          if (resp[0].versao_MODIF == this.versao_modif) {
            rp_lin.quant_BOAS_TOTAL_M2 = this.ref[i].qttboas_ref;
            rp_lin.quant_DEF_TOTAL_M2 = this.ref[i].totaldefeitos_ref;
          } else {
            rp_lin.quant_BOAS_TOTAL_M1 = rp_lin.quant_BOAS_TOTAL_M2;
            rp_lin.quant_DEF_TOTAL_M1 = rp_lin.quant_DEF_TOTAL_M2;
            rp_lin.quant_BOAS_TOTAL_M2 = this.ref[i].qttboas_ref;
            rp_lin.quant_DEF_TOTAL_M2 = this.ref[i].totaldefeitos_ref;
            rp_lin.versao_MODIF = this.versao_modif;
          }
        } else {
          rp_lin.quant_DEF_TOTAL = this.ref[i].totaldefeitos_ref;
          rp_lin.quant_BOAS_TOTAL = this.ref[i].qttboas_ref;

          rp_lin.quant_BOAS_TOTAL_M1 = this.ref[i].qttboas_ref;
          rp_lin.quant_DEF_TOTAL_M1 = this.ref[i].totaldefeitos_ref;
          rp_lin.quant_BOAS_TOTAL_M2 = this.ref[i].qttboas_ref;
          rp_lin.quant_DEF_TOTAL_M2 = this.ref[i].totaldefeitos_ref;
        }

      } else {
        this.ref[i].totaldefeitos = totaldefeitos;
        if (this.modoedicaoeditor) {
          if (resp[0].versao_MODIF == this.versao_modif) {
            rp_lin.quant_BOAS_TOTAL_M2 = this.ref[i].qttboas;
            rp_lin.quant_DEF_TOTAL_M2 = this.ref[i].totaldefeitos;
          } else {
            rp_lin.quant_BOAS_TOTAL_M1 = rp_lin.quant_BOAS_TOTAL_M2;
            rp_lin.quant_DEF_TOTAL_M1 = rp_lin.quant_DEF_TOTAL_M2;
            rp_lin.quant_BOAS_TOTAL_M2 = this.ref[i].qttboas;
            rp_lin.quant_DEF_TOTAL_M2 = this.ref[i].totaldefeitos;
          }
        } else {
          rp_lin.quant_DEF_TOTAL = this.ref[i].totaldefeitos;
          rp_lin.quant_BOAS_TOTAL = this.ref[i].qttboas;

          rp_lin.quant_BOAS_TOTAL_M1 = this.ref[i].qttboas;
          rp_lin.quant_DEF_TOTAL_M1 = this.ref[i].totaldefeitos;
          rp_lin.quant_BOAS_TOTAL_M2 = this.ref[i].qttboas;
          rp_lin.quant_DEF_TOTAL_M2 = this.ref[i].totaldefeitos;
        }
      }


      this.totaldefeitos = parseInt(this.ref[this.i].totaldefeitos);
      this.totaldefeitos_ref = parseInt(this.ref[this.i].totaldefeitos_ref);
      this.totalcontrol = parseInt(this.ref[this.i].totaldefeitos) + parseInt(this.ref[this.i].qttboas);

      this.RPOFOPLINService.update(rp_lin);
      this.controlaquantidade();

      if (comp) {
        this.RPOFOPETIQUETAService.getAllbyid_eti(id, id_ref_etiq).subscribe(res => {
          var etiq = new RP_OF_OP_ETIQUETA();
          etiq = res[0];

          if (!this.modoedicaoeditor) {

            etiq.quant_BOAS = this.ref[i].qttboas;

            etiq.quant_DEF = totaldefeitos;
          }

          etiq.quant_BOAS_M1 = this.ref[i].qttboas;
          etiq.quant_DEF_M1 = totaldefeitos;
          etiq.quant_BOAS_M2 = this.ref[i].qttboas;
          etiq.quant_DEF_M2 = totaldefeitos;
          etiq.versao_MODIF = this.versao_modif;

          this.RPOFOPETIQUETAService.update(etiq);
          this.controlaquantidade();
        }, error => console.log(error));
      }
    }, error => console.log(error));
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
      this.inicia(false, true);
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
    localStorage.setItem('siip_edicao', 'true');
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
      this.tabSets.find(item => item.id == data.cod_DEF.substring(0, 2)).defeitos.find(item => item.id_DEF_LIN == id).obs = data.obs_DEF;
      this.displayDialog = false;
    });
  }

  verificacoes_adicionais(id_op_lin) {
    this.verif_adic = [];
    this.RPOFOUTRODEFLINService.getbyid(id_op_lin).subscribe(res => {
      for (var x in res) {
        this.verif_adic[res[x].id_DEF_OUTRO] = res[x].quant_OUTRODEF_M1;
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
          data.quant_OUTRODEF_M1 = 1;
        } else {
          data.quant_OUTRODEF = 0;
          data.quant_OUTRODEF_M1 = 0;
        }

        this.RPOFOUTRODEFLINService.update(data);

      }

    }, error => console.log(error));

  }
  concluir() {
    if (localStorage.getItem('id_op_cab') && localStorage.getItem('siip_edicao') == 'true') {
      this.RPOFDEFLINService.atualizatotais(localStorage.getItem('id_op_cab'), this.modoedicaoeditor).subscribe(resu => {
        this.location.back();
      }, error => {
        this.location.back();
        console.log(error)
      });
    } else {
      this.location.back();
    }

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

  getdef(id) {
    var totaldefeitos = 0;
    for (var t in this.tabSets) {
      if (this.tabSets[t].id == id) {
        for (var h in this.tabSets[t].defeitos) {
          totaldefeitos += this.tabSets[t].defeitos[h].value;
        }
      }
    }
    return totaldefeitos;
  }

  abrirobsref() {
    this.ref_desg = this.ref_name;
    this.displayDialog2 = true;
  }


  cancel_obs() {
    this.displayDialog2 = false;
  }

  //guardar observação defeito
  save_obs() {
    localStorage.setItem('siip_edicao', 'true');
    this.RPOFOPLINService.getRP_OF_OP_LIN(this.ref[this.i].id).subscribe(res => {
      for (var x in res) {
        var rpdef = new RP_OF_OP_LIN;
        rpdef = res[x];
        rpdef.obs_REF = this.obs_ref;
        this.ref[this.i].obs_ref = this.obs_ref;
        this.RPOFOPLINService.update(rpdef);
        this.displayDialog2 = false;
      }
    }, error => console.log(error));
  }

  selectText(event) {
    if (event.srcElement.value == 0) {
      event.srcElement.value = '';
    }
  }

  blurText(event) {
    if (event.srcElement.value == '' || event.srcElement.value == null) {
      event.srcElement.value = 0;
    }
  }


}
