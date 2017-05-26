import { Component, OnInit } from '@angular/core';
import { SelectItem } from "primeng/primeng";
import { CarService } from "app/carservice";


@Component({
  selector: 'app-gestao-users',
  templateUrl: './gestao-users.component.html',
  styleUrls: ['./gestao-users.component.css']
})
export class GestaoUsersComponent implements OnInit {

   listw1: Response;
  listid = "";
  seccao_no = "";
  chefe_seccao_no = "";
  seccao = "";
  no6: string;
  no: any;
  no3: any;
  no4: any;
  no5: any;
  list1: any[];
  list2: any[];
  list3: any[];
  list4: any[];
  list5: any[];
  list6: any[];
  nome = "";
  chefe_seccao = "";
  displayDialog: boolean;
  novochefe: boolean;
  brand1: SelectItem[];
  brand2: SelectItem[];
  selected1: string = "";
  selected2: string = "";

  constructor(private service: CarService) { }

  ngOnInit() {
    this.list1 = [{ name: "F57", op: "1", id: 1 }, { name: "F44", op: "2", id: 2 }, { name: "F33", op: "3", id: 3 }];
    this.list2 = [{ name: "José", no: "1" }, { name: "Maria", no: "2" }, { name: "Manuel", no: "3" }];
    this.list3 = [];
    this.list4 = [];
    this.list5 = [];
    this.list6 = [];
    this.brand1 = [{ label: 'Seleccione Chefe', value: "0" }];
    this.brand2 = [{ label: 'Seleccione Secção', value: "0" }, { label: "Pintura", value: "1" }, { label: "Armazém", value: "2" }];
    this.service.getHero().then(val => {this.listw1 = val.json()});
  }

  //inserir o utilizador num perfil
  insere(list) {
    switch (list) {
      case "list3":
        if (this.no != "" && this.nome != "") {
          if (!this.list3.find(item => item.no === this.no)) {
            this.list3.push({ name: this.nome, no: this.no });
            this.list3 = this.list3.slice();
          }
        }
        break;
      case "list4":
        if (this.no != "" && this.nome != "") {
          if (!this.list4.find(item => item.no === this.no)) {
            this.list4.push({ name: this.nome, no: this.no });
            this.brand1.push({ label: this.nome, value: { id: this.no, name: this.nome, code: this.no } });
            this.list4 = this.list4.slice();
            this.brand1 = this.brand1.slice();

          }
        }
        break;
      case "list5":
        if (this.no != "" && this.nome != "") {
          if (!this.list5.find(item => item.no === this.no)) {
            this.list5.push({ name: this.nome, no: this.no });
            this.list5 = this.list5.slice();
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
          for (var x in this.list3) {
            if (this.list3[x].no == this.no3) {
              this.list3.splice(parseInt(x), 1);
            }
          }
          this.list3 = this.list3.slice();
        }
        break;
      case "list4":
        this.brand1 = [];
        this.brand1.push({ label: 'Seleccione Chefe', value: "0" });
        if (this.no4 != "") {
          for (var x in this.list4) {
            if (this.list4[x].no == this.no4) {
              this.list4.splice(parseInt(x), 1);
            } else {
              this.brand1.push({ label: this.list4[x].name, value: this.no });
            }
          }
          this.list4 = this.list4.slice();
          this.brand1 = this.brand1.slice();

        }
        break;
      case "list5":
        if (this.no5 != "") {
          for (var x in this.list5) {
            if (this.list5[x].no == this.no5) {
              this.list5.splice(parseInt(x), 1);
            }
          }
          this.list5 = this.list5.slice();

        }
        break;
      case "list6":
        if (this.listid != "") {
          for (var x in this.list6) {
            if (this.list6[x].id == this.listid) {
              this.list6.splice(parseInt(x), 1);
            }
          }
          this.list6 = this.list6.slice();
          this.listid = "";
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
    this.no3 = event.data.no;
  }
  onRowSelect4(event) {
    this.no4 = event.data.no;
  }
  onRowSelect5(event) {
    this.no5 = event.data.no;
  }

  //popup para adicionar responsáveis a uma seccão.
  showDialogToAdd() {
    this.listid = "";
    this.selected1 = "0";
    this.selected2 = "0";
    this.chefe_seccao = "";
    this.seccao = "";
    this.novochefe = true;
    this.displayDialog = true;
  }

  //guarda os dados do chefe de seccão
  save() {

    if (this.novochefe) {
      if (this.chefe_seccao != "" && this.seccao != "") {
        let num = parseInt(this.getmaxid()) + 1;
        this.list6.push({ name: this.chefe_seccao, seccao: this.seccao, seccao_no: this.seccao_no, id: num, no: this.chefe_seccao_no });
      }
    } else {
      if (this.chefe_seccao != "" && this.seccao != "") {
        for (var x in this.list6) {

          if (this.list6[x].id == this.listid) {
            this.list6[x].name = this.chefe_seccao;
            this.list6[x].no = this.chefe_seccao_no;
            this.list6[x].seccao = this.seccao;
            this.list6[x].seccao_no = this.seccao_no;
          }
        }
      }
    }

    this.chefe_seccao = "";
    this.seccao = "";
    this.seccao_no = "";
    this.chefe_seccao_no = "";
    this.listid == "";
    this.list6 = this.list6.slice();
    this.displayDialog = false;
  }

  //apaga um campo dos Responsáveis de seccção
  delete() {
    this.apagar("list6");
    this.displayDialog = false;
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

  //ver o ultimo id de um array
 getmaxid() {
    if (this.list6.length > 0) {
      return Math.max.apply(Math, this.list6.map(function (o) { return o.id; }))
    } else {
      return 0;
    }
  }

  editar(event) {
    //guardar valores na base de dados
  }

  //eliminar linhas das familias de defeitos
  deleterow(row) {

    for (var x in this.list1) {
      if (this.list1[x].id == row.id) {
        this.list1.splice(parseInt(x), 1);
      }
    }
    this.list1 = this.list1.slice();
  }

  //adicionar linha à tabela familias de defeitos
  AddFamDef() {
    var x = "0";
    if (this.list1.length > 0) {
      x = Math.max.apply(Math, this.list1.map(function (o) { return o.id; }));
    } 
    var num = parseInt(x) + 1;
    this.list1.push({ name: "", op: "", id: num });
    this.list1 = this.list1.slice();
  }
}
