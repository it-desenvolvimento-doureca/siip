import { Component, OnInit } from '@angular/core';
import { utilizadorService } from "app/utilizadorService";
import { Utilizador } from "app/modelos/entidades/utilizador";
import { ConfirmationService } from "primeng/primeng";
import { Router, ActivatedRoute } from "@angular/router";
import { RPOFOPCABService } from "app/modelos/services/rp-of-op-cab.service";
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";
import { RP_OF_OP_CAB } from "app/modelos/entidades/RP_OF_OP_CAB";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { RPOFPARALINService } from "app/modelos/services/rp-of-para-lin.service";
import { RP_OF_PREP_LIN } from "app/modelos/entidades/RP_OF_PREP_LIN";
import { RPOFPREPLINService } from "app/modelos/services/rp-of-prep-lin.service";
import { RP_OF_OP_FUNC } from "app/modelos/entidades/RP_OF_OP_FUNC";
import { RPOPFUNCService } from "app/modelos/services/rp-op-func.service";

@Component({
  selector: 'app-operacao-em-curso',
  templateUrl: './operacao-em-curso.component.html',
  styleUrls: ['./operacao-em-curso.component.css']
})
export class OperacaoEmCursoComponent implements OnInit {
  disabledAdici: boolean;
  perfil: string;
  concluido: boolean = false;
  modoedicao: boolean = false;
  estado;
  count_id: any = 0;
  disabledRegisto: boolean;
  count: number;
  utilizador_insere = "";
  displayDialogutz: boolean = false;
  user: any;
  id_of_cab: any;
  id_op_cab_lista: any;
  displayDialog: boolean = false;
  defeitos: any[] = null;
  cols2: any[];
  of_num = "";
  op_num = "";
  maq_num = "";
  id_utz = "";
  data_ini = "";
  hora_ini = "";
  data_fim = "";
  hora_fim = "";
  id_op_cab = "";
  estados_array = [{ label: "---", value: "" }, { label: "Execução", value: "E" }, { label: "Concluido", value: "C" }, { label: "P", value: "P" }];
  estado_val = "";
  utilizadores_adici: any[] = [];

  constructor(private route: ActivatedRoute, private RPOPFUNCService: RPOPFUNCService, private RPOFPREPLINService: RPOFPREPLINService, private RPOFPARALINService: RPOFPARALINService, private RPOFCABService: RPOFCABService, private RPOFOPLINService: RPOFOPLINService, private confirmationService: ConfirmationService, private router: Router, private RPOFOPCABService: RPOFOPCABService) {
  }

  ngOnInit() {
    this.disabledAdici = false;
    this.perfil = localStorage.getItem('access');
    //verifica se tem o id_of_cab
    if (localStorage.getItem('id_of_cab')) {
      //preencher campos
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      var url = this.router.routerState.snapshot.url;
      url = url.slice(1);
      var urlarray = url.split("/");
      if (urlarray.length > 1) {
        if (urlarray[1].match("view")) {
          this.modoedicao = true;
        }
      }

      if (id != 0) {
        this.user = id;
        this.estado = "T";
      } else {
        this.user = JSON.parse(localStorage.getItem('user'))["username"];
        this.estado = "'C','A','M'";
      }

      this.RPOFOPCABService.getdataof(JSON.parse(localStorage.getItem('id_of_cab')), this.user, this.estado).subscribe(
        response => {
          this.id_op_cab_lista = [];
          for (var x in response) {
            var comp = true;

            if (response[x][1].id_OF_CAB_ORIGEM == null) {
              if (response[x][1].id_UTZ_CRIA != this.user) this.disabledAdici = true;
              comp = false
              localStorage.setItem('id_op_cab', JSON.stringify(response[x][0].id_OP_CAB));
              this.of_num = response[x][1].of_NUM.trim()
              this.op_num = response[x][1].op_NUM.trim() + "/" + response[x][1].op_COD.trim() + " - " + response[x][1].op_DES.trim();
              this.maq_num = response[x][1].maq_NUM.trim() + " - " + response[x][1].maq_DES.trim();
              this.id_utz = response[x][0].id_UTZ_CRIA.trim() + " - " + response[x][0].nome_UTZ_CRIA.trim();
              this.data_ini = response[x][0].data_INI;
              this.hora_ini = response[x][0].hora_INI;
              this.hora_fim = response[x][0].hora_FIM;
              this.data_fim = response[x][0].data_FIM;
              this.id_op_cab = response[x][0].id_OP_CAB;
              this.id_of_cab = response[x][1].id_OF_CAB;
              this.estado_val = response[x][0].estado;
              this.id_op_cab_lista.push({ id: response[x][0].id_OP_CAB, comp: false });
              if (response[x][0].data_FIM != null) {
                this.concluido = true;
              }
            }
            this.id_op_cab_lista.push({ id: response[x][0].id_OP_CAB, comp: true });
            this.defeitos = [];
            this.listadefeitos(response[x][0].id_OP_CAB, comp);
          }
          this.id_op_cab_lista = this.id_op_cab_lista.slice();

          this.verificar_operadores(this.id_of_cab);
        },
        error => console.log(error));

    } else {
      this.router.navigate(['./home']);
    }
  }

  //verifica os operadores que estão em execução nesta of
  verificar_operadores(id) {
    this.disabledRegisto = false;
    this.RPOPFUNCService.getUsersbyid_of_cab(id).subscribe(
      response => {
        this.count = Object.keys(response).length;
        if (this.count > 1) {
          this.disabledRegisto = true;
        }
        for (var x in response) {
          if (response[x].id_UTZ_CRIA != this.user) {
            this.utilizadores_adici.push({ label: response[x].nome_UTZ_CRIA + " - " + response[x].id_UTZ_CRIA, id: response[x].id_UTZ_CRIA });
          }
        }

      }, error => console.log(error));
  }

  //adicionarOP
  adicionaop() {
    this.displayDialog = true
  }
  //fechar popup adicionar operador
  cancel() {
    this.displayDialog = false;
  }

  //adiciona  operador
  save(code_login, nome) {

    if (this.utilizadores_adici.find(item => item.id == code_login) || code_login == this.user) {
      this.displayDialogutz = true;
      this.utilizador_insere = nome;
    } else {
      var user = JSON.parse(localStorage.getItem('user'))["username"];
      this.displayDialog = false;
      var rpofop = new RP_OF_OP_CAB;
      var rpofopfunc = new RP_OF_OP_FUNC;

      this.RPOFOPCABService.getdataof(JSON.parse(localStorage.getItem('id_of_cab')), user, this.estado).subscribe(
        response => {
          this.id_op_cab_lista = [];
          for (var x in response) {

            rpofop.id_OF_CAB = response[x][1].id_OF_CAB;

            this.RPOFOPCABService.create(rpofop).subscribe(
              res => {

                rpofopfunc.id_OP_CAB = res.id_OP_CAB;
                rpofopfunc.data_INI = new Date();
                var date = new Date();
                var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                rpofopfunc.hora_INI = time;
                rpofopfunc.id_UTZ_CRIA = code_login;
                rpofopfunc.nome_UTZ_CRIA = nome;
                rpofopfunc.perfil_CRIA = "O";
                rpofopfunc.estado = response[x][1].estado;
                this.RPOPFUNCService.create(rpofopfunc).subscribe(
                  res => {
                  },
                  error => console.log(error));
              },
              error => console.log(error));


          }
          this.verificar_operadores(this.id_of_cab);
        },
        error => console.log(error));

      this.confirmationService.confirm({
        message: 'Pretende adicionar mais um Operador?',
        accept: () => {
          this.displayDialog = true;
        }, reject: () => {
          this.displayDialog = false;
          this.router.navigate(['./home']);
        }
      });
    }
  }

  //atualizar lista de defeitos
  listadefeitos(id_op_cab, comp) {
    this.count_id++;
    var count = this.count_id;
    this.RPOFOPLINService.getRP_OF_OP_LINallid(id_op_cab).subscribe(
      res => {

        for (var x in res) {
          var total = res[x].quant_BOAS_TOTAL + res[x].quant_DEF_TOTAL;
          var cor = "rgba(255, 255, 0, 0.78)";
          if (total == res[x].quant_OF) cor = "#2be32b";
          if (total > res[x].quant_OF) cor = "rgba(255, 0, 0, 0.68)";

          this.defeitos.push({ id: count, ref_num: res[x].ref_NUM, cor: cor, ref_des: res[x].ref_DES, quant_of: res[x].quant_OF, quant_boas: res[x].quant_BOAS_TOTAL, quant_def_total: res[x].quant_DEF_TOTAL, quant_control: total, comp: comp });
        }
        this.defeitos = this.defeitos.slice();
        this.ordernar();
      },
      error => console.log(error));
  }

  ordernar() {
    this.defeitos.sort((n1, n2) => {
      if (n1.id > n2.id) {
        return 1;
      }

      if (n1.id < n2.id) {
        return -1;
      }

      return 0;
    });
  }


  // ao clicar no botão concluir
  createfile() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    for (var x in this.id_op_cab_lista) {
      if (this.count > 1) {
        this.estados(this.id_op_cab_lista[x].id, user, nome, date, time, this.id_op_cab_lista[x].comp, false);
      } else {
        this.estados(this.id_op_cab_lista[x].id, user, nome, date, time, this.id_op_cab_lista[x].comp, true);
      }
    }
  }

  //alterar estados
  estados(id_op_cab, user, nome, date, time_fim, comp, utz_count) {

    var pausa_inicio = new Date();
    var total_pausa = 0;
    var total_pausa_prep = 0;
    var total_pausa_of = 0;
    this.RPOFOPCABService.getbyid(id_op_cab).subscribe(result => {

      var rp_of_op_cab = new RP_OF_OP_CAB();
      var rp_of_op_func = new RP_OF_OP_FUNC();
      rp_of_op_cab = result[0][0];
      rp_of_op_func = result[0][2];
      //estado rp_of_cab
      var rp_of_cab = new RP_OF_CAB();
      rp_of_cab = result[0][1];
      rp_of_cab.id_UTZ_MODIF = user;
      rp_of_cab.nome_UTZ_MODIF = nome;
      rp_of_cab.data_HORA_MODIF = date;
      rp_of_cab.estado = "C"

      //tempo de Pausa
      this.RPOFPARALINService.getbyallID_OP_CAB(id_op_cab).subscribe(result1 => {
        var count = Object.keys(result1).length;
        var time_pausa = "0:0:0";
        var time_pausa_prep = "0:0:0";
        var time_pausa_of = "0:0:0";
        var timedif3 = 0;
        var timedif4 = 0;
        var timedif5 = 0;
        var soma_pausa = 0;


        if (count > 0) {
          for (var x in result1) {
            if (result1[x].momento_PARAGEM == "E") {
              var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
              var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
              var timedif = this.timediff(hora1.getTime(), hora2.getTime())
              var splitted_pausa = timedif.split(":", 3);
              total_pausa += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
            }
            if (result1[x].momento_PARAGEM == "P") {
              var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
              var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
              var timedif1 = this.timediff(hora1.getTime(), hora2.getTime())
              var splitted_pausa = timedif1.split(":", 3);
              total_pausa_prep += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
            }

            var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
            var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
            var timep = this.timediff(hora1.getTime(), hora2.getTime())

            var splitted_pausa = timep.split(":", 3);
            soma_pausa += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
          }

          time_pausa_of = this.gettime(soma_pausa);
          time_pausa_prep = this.gettime(total_pausa_prep);
          time_pausa = this.gettime(total_pausa);

          var splitted_pausa = time_pausa_of.split(":", 3);
          timedif4 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
        }
        var hora1 = new Date(result[0][2].data_INI + " " + result[0][2].hora_INI);
        var hora2 = new Date(date);
        //tempo da total of
        var timedif2 = Math.abs(hora2.getTime() - hora1.getTime());


        if (result[0][0].tempo_PREP_TOTAL != null) {
          var splitted_prep = result[0][0].tempo_PREP_TOTAL.split(":", 3);
          timedif3 = parseInt(splitted_prep[0]) * 3600000 + parseInt(splitted_prep[1]) * 60000 + parseInt(splitted_prep[2]) * 1000;

        } else if (result[0][0].tempo_PARA_TOTAL != null) {

          var splitted_pausa_prep = time_pausa_prep.split(":", 3);
          timedif5 = parseInt(splitted_pausa_prep[0]) * 3600000 + parseInt(splitted_pausa_prep[1]) * 60000 + parseInt(splitted_pausa_prep[2]) * 1000;
        }

        if (result[0][0].tempo_PARA_TOTAL != null) rp_of_op_cab.tempo_PARA_TOTAL = "0:0:0";

        //se o estado for em preparação conclui a preparação e calcula tempo
        if (result[0][2].estado == "P") {

          var splitted_pausa = time_pausa_prep.split(":", 3);
          timedif5 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

          //estado rp_of_prep_lin
          var rp_of_prep_lin = new RP_OF_PREP_LIN();
          this.RPOFPREPLINService.getbyid(id_op_cab).subscribe(resu => {

            var date1 = new Date(resu[0].data_INI + " " + resu[0].hora_INI);
            var date2 = new Date(date);
            var timedif1 = this.timediff(hora1.getTime(), hora2.getTime());
            var splitted_pausa = timedif1.split(":", 3);
            timedif3 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

            var time_prep = timedif3 - timedif5;

            var tempo_prep = this.gettime(time_prep);

            rp_of_prep_lin = resu[0];
            rp_of_prep_lin.estado = "C";
            rp_of_prep_lin.data_FIM = date;
            rp_of_prep_lin.hora_FIM = time_fim;
            rp_of_prep_lin.data_HORA_MODIF = date;
            rp_of_prep_lin.id_UTZ_MODIF = user;

            this.RPOFPREPLINService.update(rp_of_prep_lin);

            var tempo_total_execucao = "0:0:0";

            //estado rp_of_op_cab

            rp_of_op_cab.tempo_PREP_TOTAL = tempo_prep;
            rp_of_op_cab.tempo_PARA_TOTAL = time_pausa_prep;
            rp_of_op_cab.tempo_EXEC_TOTAL = tempo_total_execucao;

            rp_of_op_func.id_UTZ_MODIF = user;
            rp_of_op_func.nome_UTZ_MODIF = nome;
            rp_of_op_func.data_HORA_MODIF = date;
            rp_of_op_func.perfil_MODIF = "O";
            rp_of_op_func.estado = "C";
            rp_of_op_func.data_FIM = date;
            rp_of_op_func.hora_FIM = time_fim;


            if (utz_count) this.RPOFCABService.update(rp_of_cab);
            this.RPOPFUNCService.update(rp_of_op_func);
            if (!comp) this.RPOFOPCABService.update(rp_of_op_cab);

          }, error => console.log(error));
        } else {

          var tempo_excucao = timedif2 - timedif3 - timedif4;


          var tempo_total_execucao = this.gettime(tempo_excucao)

          //estado rp_of_op_cab

          rp_of_op_cab.tempo_PARA_TOTAL = time_pausa_of;
          rp_of_op_cab.tempo_EXEC_TOTAL = tempo_total_execucao;


          rp_of_op_func.id_UTZ_MODIF = user;
          rp_of_op_func.nome_UTZ_MODIF = nome;
          rp_of_op_func.data_HORA_MODIF = date;
          rp_of_op_func.perfil_MODIF = "O";
          rp_of_op_func.estado = "C";
          rp_of_op_func.data_FIM = date;
          rp_of_op_func.hora_FIM = time_fim;

          if (utz_count) this.RPOFCABService.update(rp_of_cab);
          if (!comp) this.RPOFOPCABService.update(rp_of_op_cab);
          this.RPOPFUNCService.update(rp_of_op_func);
        }

        this.router.navigate(['./home']);
      }, error => console.log(error));
    }, error => console.log(error));
  }

  //ver diferenças entre datas
  timediff(timeStart, timeEnd) {
    var hourDiff = timeEnd - timeStart; //in ms
    var hours = Math.floor(hourDiff / 3.6e6);
    var minutes = Math.floor((hourDiff % 3.6e6) / 6e4);
    var seconds = Math.floor((hourDiff % 6e4) / 1000);
    return hours + ":" + minutes + ":" + seconds;
  }

  //devolve tempo
  gettime(time_prep) {
    var hourDiff = time_prep; //in ms
    var hours = Math.floor(hourDiff / 3.6e6);
    var minutes = Math.floor((hourDiff % 3.6e6) / 6e4);
    var seconds = Math.floor((hourDiff % 6e4) / 1000);
    return hours + ":" + minutes + ":" + seconds;
  }

  //botãocancelar
  cancelar() {
    if (this.modoedicao) {
      this.router.navigate(['./controlo']);
    } else {
      this.router.navigate(['./home']);
    }
  }

}
