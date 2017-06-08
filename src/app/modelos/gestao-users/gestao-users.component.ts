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

@Component({
  selector: 'app-gestao-users',
  templateUrl: './gestao-users.component.html',
  styleUrls: ['./gestao-users.component.css']
})
export class GestaoUsersComponent implements OnInit {
  listidfam: any;
  novafam: boolean;

  listw1: Response;
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

  constructor(private fam_service: RPCONFOPService, private ofservice: ofService, private service: utilizadorService, private conf_service: RPCONFUTZPERFService, private chef_service: RPCONFCHEFSECService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.list1 = [];
    this.fam = [];
    this.list2 = [];
    this.fam = [{ label: 'Seleccione Operação Principal', value: "0" }];
    this.ofservice.getFamilias().subscribe(
      response => {
        for (var x in response) {
          this.fam.push({ label: response[x].fam, value: response[x].fam });
        }
      },
      error => console.log(error));


    this.brand2 = [{ label: 'Seleccione Secção', value: "0" }];
    this.service.getUtilizadoresSilver().subscribe(
      response => {
        for (var x in response) {
          this.list2.push({ name: response[x].RESDES, no: response[x].RESCOD, field: response[x].RESCOD + " - " + response[x].RESDES });
        }
        this.list2 = this.list2.slice();
      },
      error => console.log(error));

    this.service.getSesoes().subscribe(
      response => {
        for (var x in response) {
          this.brand2.push({ label: response[x].SECLIB, value: response[x].SECCOD });
        }
        this.brand2 = this.brand2.slice();
      },
      error => console.log(error));

    this.preenchetabelas();
    this.preenche_chefe();
    this.preenche_fam();
  }

  //inserir o utilizador num perfil
  insere(list) {
    var conf_utiliz = new RP_CONF_UTZ_PERF;
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
        fam.id_OP_SEC = this.selectedoppermitida;
        console.log(fam);
        this.fam_service.create(fam).then(() => {
          this.preenche_fam();
        });
      }
    } else {
      if (this.selectedfam != "" && this.selectedoppermitida != "") {
        fam.id_CONF_OP = this.listidfam;
        fam.id_OP_PRINC = this.selectedfam;
        fam.id_OP_SEC = this.selectedoppermitida;
        this.fam_service.update(fam).then(() => {
          this.preenche_fam();
        });
      }

    }

    this.selectedfam = "";
    this.selectedfam = "";
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
    this.selectedfam = event.data.fam;
    this.selectedoppermitida = event.data.op;
    this.listidfam = event.data.id;
    this.displayfamdialog = true;
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

  //opup para adicionarà tabela familias de defeitos
  AddFamDef() {
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
          this.list1.push({ fam: response[x].id_OP_PRINC.trim(), op: response[x].id_OP_SEC.trim(), id: response[x].id_CONF_OP });
        }
        this.list1 = this.list1.slice();
      },
      error => console.log(error));
  }
}
