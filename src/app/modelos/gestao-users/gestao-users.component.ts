import { Component, OnInit } from '@angular/core';
import { SelectItem } from "primeng/primeng";
import { utilizadorService } from "app/utilizadorService";
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { RP_CONF_UTZ_PERF } from "app/modelos/entidades/RP_CONF_UTZ_PERF";
import { RPCONFUTZPERFService } from "app/modelos/services/rp-conf-utz-perf.service";
import { RPCONFCHEFSECService } from "app/modelos/services/rp-conf-chef-sec.service";
import { RP_CONF_CHEF_SEC } from "app/modelos/entidades/RP_CONF_CHEF_SEC";
import { ofService } from "app/ofService";
import { RPCONFOPService } from "app/modelos/services/rp-conf-op.service";
import { RP_CONF_OP } from "app/modelos/entidades/RP_CONF_OP";
import { RPCONFOPNPREVService } from "app/modelos/services/rp-conf-op-nprev.service";
import { RP_CONF_OP_NPREV } from "app/modelos/entidades/RP_CONF_OP_NPREV";

@Component({
  selector: 'app-gestao-users',
  templateUrl: './gestao-users.component.html',
  styleUrls: ['./gestao-users.component.css']
})
export class GestaoUsersComponent implements OnInit {
  secnumenr1_OP: any;
  selectedoppermitida_name: any;
  selectedfam_name: any;
  selectedallop_name = "";
  selectedop = "";
  selectedallop = "";
  listaop: any[];
  listallop: any[];
  listidfam: any;
  novafam: boolean;
  listid: number;
  seccao_no = "";
  chefe_seccao_no = "";
  seccao = "";
  no6: string;
  no: any;
  no3: any;
  no4: any;
  no5: any;
  fam: SelectItem[];
  list1: any[];
  list2: any[];
  list3: any[];
  list4: any[];
  list5: any[];
  list6: any[];
  nome = "";
  chefe_seccao = "";
  displayDialog: boolean;
  displayfamdialog: boolean;
  novochefe: boolean;
  brand1: SelectItem[];
  brand2: SelectItem[];
  selected1: string = "";
  selected2: string = "";
  selectedfam: string = "";
  selectedoppermitida: string = "";
  selefam = "";
  seleopp= "";

  constructor(private op_service: RPCONFOPNPREVService, private fam_service: RPCONFOPService, private ofservice: ofService, private service: utilizadorService, private conf_service: RPCONFUTZPERFService, private chef_service: RPCONFCHEFSECService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.list1 = [];
    this.fam = [];
    this.list2 = [];
    this.fam = [{ label: 'Seleccione Operação Principal', value: 0 }];
    this.ofservice.getAllOP().subscribe(
      response => {
        for (var x in response) {
          this.fam.push({ label:  response[x].OPECOD +"-"+response[x].OPEDES, value: { code: response[x].OPECOD, name: response[x].OPEDES} });
        }
      },
      error => console.log(error));


    this.brand2 = [{ label: 'Seleccione Secção', value: 0 }];
    this.service.getUtilizadoresSilver().subscribe(
      response => {
        for (var x in response) {
          this.list2.push({ name: response[x].RESDES, no: response[x].RESCOD, field: response[x].RESCOD + " - " + response[x].RESDES });
        }
        this.list2 = this.list2.slice();
        this.service.getSeccoes().subscribe(
          response => {
            for (var x in response) {
              this.brand2.push({ label: response[x].SECLIB, value: response[x].SECCOD });
            }
            this.brand2 = this.brand2.slice();
            this.preenche_op();
          },
          error => console.log(error));
      },
      error => console.log(error));



    this.preenchetabelas();
    this.preenche_chefe();
    this.preenche_fam();
  }

  //inserir o utilizador num perfil
  insere(list) {
    var conf_utiliz = new RP_CONF_UTZ_PERF;
    var conf_op = new RP_CONF_OP_NPREV;
    switch (list) {
      //Operador
      case "list3":
        if (this.no != "" && this.nome != "") {
          if (!this.list3.find(item => item.no === this.no)) {
            conf_utiliz.id_UTZ = this.no;
            conf_utiliz.perfil = "O";
            conf_utiliz.nome_UTZ = this.nome;
            this.conf_service.create(conf_utiliz).then(() => {
              this.preenchetabelas();
            });
          }
        }
        break;
      //Gestão
      case "list4":
        if (this.no != "" && this.nome != "") {
          if (!this.list4.find(item => item.no === this.no)) {
            conf_utiliz.id_UTZ = this.no;
            conf_utiliz.perfil = "G";
            conf_utiliz.nome_UTZ = this.nome;
            this.conf_service.create(conf_utiliz).then(() => {
              this.preenchetabelas();
            });
          }
        }
        break;
      //Administrador
      case "list5":
        if (this.no != "" && this.nome != "") {
          if (!this.list5.find(item => item.no === this.no)) {
            conf_utiliz.id_UTZ = this.no;
            conf_utiliz.perfil = "A";
            conf_utiliz.nome_UTZ = this.nome;
            this.conf_service.create(conf_utiliz).then(() => {
              this.preenchetabelas();
            });
          }
        }
        break;
      //Lista das Operações
      case "listop":

        if (this.selectedallop != "") {
          conf_op.id_OP = this.selectedallop;
          conf_op.nome_OP = this.selectedallop_name;
          conf_op.secnumenr1_OP = this.secnumenr1_OP;
          this.op_service.create(conf_op).then(() => {
            this.preenche_op();
          });
        }
        break;
    }
  }

  //remove o utilizador de um perfil
  apagar(list) {
    switch (list) {
      case "list3":
        if (this.no3 != "") {
          this.conf_service.delete(this.no3).then(() => {
            this.preenchetabelas();
          });
          this.no3 = "";
        }
        break;
      case "list4":
        if (this.no4 != "") {
          this.conf_service.delete(this.no4).then(() => {
            this.preenchetabelas();
          });
          this.no4 = "";
        }
        break;
      case "list5":
        if (this.no5 != "") {
          this.conf_service.delete(this.no5).then(() => {
            this.preenchetabelas();
          });
          this.no5 = "";
        }
        break;
      //Lista das Operações
      case "listop":
        if (this.selectedop != "") {
          this.op_service.delete(this.selectedop).then(() => {
            this.preenche_op();
          });
          this.no5 = "";
        }
        break;
    }
  }

  // Ao seleccionar uma tabela é returnado o id do utilizador
  onRowSelect(event) {
    this.no = event.data.no;
    this.nome = event.data.name;
  }
  onRowSelect3(event) {
    this.no3 = event.data.id;
  }
  onRowSelect4(event) {
    this.no4 = event.data.id;
  }
  onRowSelect5(event) {
    this.no5 = event.data.id;
  }
  onRowSelectallop(event) {
    this.selectedallop = event.data.codigoop;
    this.selectedallop_name = event.data.design; 
    this.secnumenr1_OP = event.data.SECNUMENR1;
  }
  onRowSelectop(event) {
    this.selectedop = event.data.id;
  }

  //popup para adicionar responsáveis a uma seccão.
  showDialogToAdd() {
    this.listid = 0;
    this.selected1 = "0";
    this.selected2 = "0";
    this.chefe_seccao = "";
    this.seccao = "";
    this.novochefe = true;
    this.displayDialog = true;
  }

  //guarda os dados do chefe de seccão
  save() {
    var chef_utiliz = new RP_CONF_CHEF_SEC;
    if (this.novochefe) {
      if (this.chefe_seccao != "" && this.seccao != "") {
        chef_utiliz.id_UTZ = this.chefe_seccao_no;
        chef_utiliz.sec_NUM = this.seccao_no;
        chef_utiliz.nome_SEC = this.seccao;
        chef_utiliz.nome_UTZ = this.chefe_seccao;
        this.chef_service.create(chef_utiliz).then(() => {
          this.preenche_chefe();
        });
      }
    } else {
      if (this.chefe_seccao != "" && this.seccao != "") {
        chef_utiliz.id_UTZ = this.chefe_seccao_no;
        chef_utiliz.sec_NUM = this.seccao_no;
        chef_utiliz.nome_SEC = this.seccao;
        chef_utiliz.nome_UTZ = this.chefe_seccao;
        chef_utiliz.id_CONF_CHEF_SEC = this.listid;
        this.chef_service.update(chef_utiliz).then(() => {
          this.preenche_chefe();
        });
      }
    }

    this.chefe_seccao = "";
    this.seccao = "";
    this.seccao_no = "";
    this.chefe_seccao_no = "";
    this.listid = 0;
    this.displayDialog = false;
  }


  //guarda os dados das familias de defeito
  savefam() {
    var fam = new RP_CONF_OP;
    if (this.novafam) {
      if (this.selectedfam != "" && this.selectedoppermitida != "") {
        fam.id_OP_PRINC = this.selectedfam;
        fam.nome_OP_PRINC = this.selectedfam_name;
        fam.nome_OP_SEC = this.selectedoppermitida_name;
        fam.id_OP_SEC = this.selectedoppermitida;
        this.fam_service.create(fam).then(() => {
          this.preenche_fam();
        });
      }
    } else {
      if (this.selectedfam != "" && this.selectedoppermitida != "") {
        fam.id_CONF_OP = this.listidfam;
        fam.id_OP_PRINC = this.selectedfam;
        fam.id_OP_SEC = this.selectedoppermitida;
        fam.nome_OP_PRINC = this.selectedfam_name;
        fam.nome_OP_SEC = this.selectedoppermitida_name;
        this.fam_service.update(fam).then(() => {
          this.preenche_fam();
        });
      }

    }
    this.selectedfam = "";
    this.selectedoppermitida = "";
    this.listidfam = 0;
    this.displayfamdialog = false;
  }

  //fechar popups
  cancel() {
    this.displayDialog = false;
  }
  cancelfam() {
    this.displayfamdialog = false;
  }

  //ao clicar na tabela Responsáveis abre popup para editar
  onRowSelect6(event) {
    this.novochefe = false;
    this.selected1 = event.data.no;
    this.selected2 = event.data.seccao_no;
    this.chefe_seccao = event.data.name;
    this.chefe_seccao_no = event.data.no;
    this.seccao = event.data.seccao;
    this.seccao_no = event.data.seccao_no;
    this.listid = event.data.id;
    this.displayDialog = true;
  }

  //ao clicar na tabela Familia de Defeitos abre popup para editar
  onRowSelectfam(event) {
    this.novafam = false;
    this.selectedoppermitida=event.data.op;
    this.selectedfam_name=event.data.fam_name;
    this.selectedoppermitida_name=event.data.op_name;
    this.selectedfam=event.data.fam;
    this.selefam = this.fam.find(item => item.value.code === event.data.fam).value;
    this.seleopp = this.fam.find(item => item.value.code === event.data.op).value;
    this.listidfam = event.data.id;
    this.displayfamdialog = true;
  }

  //carregar dados do chefe 
  carregafam(event, label, value) {
    if (value != "") {
      this.selectedfam = value.code;
      this.selectedfam_name = value.name;
    } else {
      this.selectedfam = "";
      this.selectedfam_name = "";
    }
  }
  //carregar dados do chefe 
  carregaoppermitida(event, label, value) {
    if (value != "") {
      this.selectedoppermitida = value.code;
      this.selectedoppermitida_name = value.name;
    } else {
      this.selectedoppermitida = "";
      this.selectedoppermitida_name = "";
    }
  }


  //carregar dados do chefe 
  carregachefe(event, label, value) {
    if (value != "0") {
      this.chefe_seccao = label;
      this.chefe_seccao_no = value;
    } else {
      this.chefe_seccao = "";
      this.chefe_seccao_no = "";
    }
  }

  //carregar dados da seccão
  carregaseccao(event, label, value) {
    if (value != "0") {
      this.seccao = label;
      this.seccao_no = value;
    } else {
      this.seccao = "";
      this.seccao_no = "";
    }
  }

  //eliminar linhas das familias de defeitos
  deleterow(row) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar esta familia de defeitos?',
      accept: () => {
        this.fam_service.delete(row.id).then(() => {
          this.preenche_fam();
        });
      }
    });
    ;
  }

  //popup para adicionarà tabela familias de defeitos
  AddFamDef() {
    this.selefam ="";
    this.seleopp = "";
    this.listid = 0;
    this.selectedoppermitida = "0";
    this.selectedfam = "0";
    this.novafam = true;
    this.displayfamdialog = true;

  }


  //eliminar linhas das Responsáveis de cada secção
  deleterespsecc(row) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar o responsável?',
      accept: () => {
        this.chef_service.delete(row.id).then(() => {
          this.preenche_chefe();
        });
      }
    });

  }

  //atualiza as tabelas dos acessos
  preenchetabelas() {
    this.list3 = [];
    this.list4 = [];
    this.list5 = [];
    this.brand1 = [{ label: 'Seleccione Chefe', value: "0" }];

    this.conf_service.getAll().subscribe(
      response => {
        for (var x in response) {
          switch (response[x].perfil) {
            case "O":
              this.list3.push({ id: response[x].id_CONF_UTZ_PERF, no: response[x].id_UTZ.trim(), field: response[x].id_UTZ.trim() + " - " + response[x].nome_UTZ });
              break;
            case "G":
              this.list4.push({ id: response[x].id_CONF_UTZ_PERF, no: response[x].id_UTZ.trim(), field: response[x].id_UTZ.trim() + " - " + response[x].nome_UTZ });
              this.brand1.push({ label: response[x].nome_UTZ, value: response[x].id_UTZ.trim() });
              break;
            case "A":
              this.list5.push({ id: response[x].id_CONF_UTZ_PERF, no: response[x].id_UTZ.trim(), field: response[x].id_UTZ.trim() + " - " + response[x].nome_UTZ });
              break;
          }

        }

        this.list3 = this.list3.slice();
        this.list4 = this.list4.slice();
        this.list5 = this.list5.slice();
        this.brand1 = this.brand1.slice();
      },
      error => console.log(error));
  }

  //atualiza a tabela responsáveis de secção
  preenche_chefe() {
    this.list6 = [];
    this.chef_service.getAll().subscribe(
      response => {
        for (var x in response) {
          this.list6.push({ name: response[x].nome_UTZ, seccao: response[x].nome_SEC, seccao_no: response[x].sec_NUM.trim(), id: response[x].id_CONF_CHEF_SEC, no: response[x].id_UTZ.trim() });
        }
        this.list6 = this.list6.slice();
      },
      error => console.log(error));
  }

  //atualiza a tabela das familias de defeitos
  preenche_fam() {
    this.list1 = [];
    this.fam_service.getAll().subscribe(
      response => {
        for (var x in response) {
          this.list1.push({ fam_field:response[x].id_OP_PRINC.trim()+"-"+response[x].nome_OP_PRINC, op_field:response[x].id_OP_SEC.trim()+"-"+response[x].nome_OP_SEC,fam: response[x].id_OP_PRINC.trim(), op: response[x].id_OP_SEC.trim(), id: response[x].id_CONF_OP , op_name: response[x].nome_OP_SEC, fam_name: response[x].nome_OP_PRINC});
        }
        this.list1 = this.list1.slice();
      },
      error => console.log(error));
  }

  //preenche tabelas operações
  preenche_op() {
    this.listallop = [];
    this.listaop = [];
    var data = "";
    var control = false;
    this.op_service.getAll().subscribe(
      response => {
        for (var x in response) {
          this.listaop.push({ field: response[x].id_OP.trim() + " - " + response[x].nome_OP, id: response[x].id_CONF_OP_NPREV });
          if (control) data += ","
          data += response[x].id_OP.trim();
          control = true;
        }
        this.listaop = this.listaop.slice();
        if (this.listaop.length == 0) data = "null";

        this.ofservice.getAllOPNOTIN(data).subscribe(
          response => {
            for (var x in response) {

              this.listallop.push({ field: response[x].OPECOD + " - " + response[x].OPEDES, codigoop: response[x].OPECOD, design: response[x].OPEDES, SECNUMENR1: response[x].SECNUMENR1 });
            }
            this.listallop = this.listallop.slice();
            this.selectedallop = "";
            this.selectedop = "";
            this.selectedallop_name = "";
            this.secnumenr1_OP = "";
          },
          error => console.log(error));
      },
      error => console.log(error));

  }

  onRowUnselect(event){
    
  }
}
