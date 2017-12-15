import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { utilizadorService } from "app/utilizadorService";
import { RPCONFUTZPERFService } from "app/modelos/services/rp-conf-utz-perf.service";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";
import { RP_OF_PARA_LIN } from "app/modelos/entidades/RP_OF_PARA_LIN";
import { RP_OF_OP_CAB } from "app/modelos/entidades/RP_OF_OP_CAB";
import { RPOFOPCABService } from "app/modelos/services/rp-of-op-cab.service";
import { RPOFPARALINService } from "app/modelos/services/rp-of-para-lin.service";
import { RP_OF_PREP_LIN } from "app/modelos/entidades/RP_OF_PREP_LIN";
import { RPOFPREPLINService } from "app/modelos/services/rp-of-prep-lin.service";
import { RP_OF_OP_FUNC } from "app/modelos/entidades/RP_OF_OP_FUNC";
import { RPOPFUNCService } from "app/modelos/services/rp-op-func.service";
import { AppGlobals } from 'webUrl';
import { ofService } from 'app/ofService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id_OP_CAB: void;
  estado: any = [];
  displaypausa: boolean = false;
  current_of: any;

  operation: string = '';
  count = 1;
  edited = false;
  name = "";
  display: boolean = false;
  display2: boolean = false;
  isHidden1: boolean = true;
  isHidden2: boolean = true;
  isHidden3: boolean = true;
  displayprep: boolean = false;
  constructor(private ofService: ofService, private AppGlobals: AppGlobals, private elementRef: ElementRef, private RPOPFUNCService: RPOPFUNCService, private RPOFPREPLINService: RPOFPREPLINService, private RPOFOPCABService: RPOFOPCABService, private RPOFPARALINService: RPOFPARALINService, private router: Router, private service: utilizadorService, private service__utz: RPCONFUTZPERFService, private RPOFCABService: RPOFCABService) {

  }

  ngOnInit() {
    //limpar a sessão
    if (this.AppGlobals.getlogin_pausa()) {
      this.displayprep = true;
      this.AppGlobals.setlogin_pausa(false);
    } else {
      localStorage.clear();
    }

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/demo.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  //adiciona número ao input de login
  append(element: string) {
    if (this.count <= 4) {
      this.operation += element;
      this.count++;
    }

    if (this.count > 3) {
      this.userexists();
    }

  }

  //verificar se utilizador existe
  userexists() {

    this.service.searchuser(this.operation).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          localStorage.setItem('user', JSON.stringify({ username: response[0].RESCOD, name: response[0].RESDES }));
          localStorage.setItem('time_siip', JSON.stringify({ data: new Date() }));
          this.edited = true;
          this.name = response[0].RESDES;

          //guarda os dados do login
          return true;
        } else {
          this.edited = false;
          this.name = "";
        }
      },
      error => {
        console.log(error)
        if (error.status == 0) {
          alert("Conexão com o Servidor Perdida!");
        }
      }

    );

  }


  //Tecla de limpar número
  undo() {
    if (this.operation != '') {
      this.operation = this.operation.slice(0, -1);
      this.count--;
      if (this.count > 3) {
        this.userexists();
      } else {
        this.edited = false;
        this.name = "";
      }
    }
  }

  //Limpar input de login
  reset() {
    this.count = 1;
    this.edited = false;
    this.name = "";
    this.operation = "";
    localStorage.clear();
  }

  //Se o utilizador clicar em sim, vai verificar o tipo de utilizador
  redirect() {
    var dataacess: any[] = [];
    var id = JSON.parse(localStorage.getItem('user'))["username"];
    this.RPOFOPCABService.listofcurrentof(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.id_OP_CAB = response[x][1].id_OP_CAB;
            localStorage.setItem('id_of_cab', JSON.stringify(response[x][1].id_OF_CAB));
            dataacess = ["O"];
            localStorage.setItem('access', JSON.stringify(dataacess));
            switch (response[x][0].estado) {
              case "I":
                this.router.navigate(['./operacao-em-curso']);
                break;
              case "P":
                this.displayprep = true;
                break;
              case "S":
                this.displaypausa = true;
                break;
              case "E":
                this.router.navigate(['./operacao-em-curso']);
                break;

            }
          }

        } else {
          this.isHidden1 = true;
          this.isHidden2 = true;
          this.isHidden3 = true;
          dataacess = [];
          this.service__utz.getbyid(id).subscribe(
            response => {
              var count = Object.keys(response).length;
              if (count == 1) {
                for (var x in response) {
                  dataacess.push(response[x].perfil);
                  switch (response[x].perfil) {
                    case "O":
                      localStorage.setItem('perfil', JSON.stringify("O"));
                      this.router.navigate(['./nova-operacao']);
                      break;
                    case "G":
                      localStorage.setItem('perfil', JSON.stringify("G"));
                      this.chefelogin();
                      //this.router.navigate(['./controlo']);
                      break;
                    case "A":
                      localStorage.setItem('perfil', JSON.stringify("A"));
                      this.adminlogin();
                      break;
                  }
                }
              } else if (count == 0) {
                alert("SEM ACESSO");
              } else {
                for (var x in response) {
                  dataacess.push(response[x].perfil);
                  switch (response[x].perfil) {
                    case "O":
                      this.isHidden1 = false;
                      break;
                    case "G":
                      this.isHidden3 = false;
                      break;
                    case "A":
                      this.isHidden2 = false;
                      break;
                  }
                  this.display = true;
                }
              }

              localStorage.setItem('access', JSON.stringify(dataacess));

            },
            error => console.log(error));
        }
      },
      error => {
        console.log(error)
        if (error.status == 0) {
          alert("Conexão com o Servidor Perdida!");
        }
      });
  }

  //popupadministratoa
  adminlogin() {
    this.display = true;
    this.display2 = false;
    this.isHidden1 = false;
    this.isHidden2 = false;
    this.isHidden3 = false;
    localStorage.setItem('perfil', JSON.stringify("G"));
  }

  //popupadministratoa
  chefelogin() {
    this.display = true;
    this.display2 = false;
    this.isHidden1 = false;
    this.isHidden2 = true;
    this.isHidden3 = false;
    localStorage.setItem('perfil', JSON.stringify("A"));
  }

  adminarea() {
    this.router.navigate(['./config']);
  }

  //reencaminha para nova operação
  novaoperacao() {
    localStorage.setItem('perfil', JSON.stringify("O"));
    this.router.navigate(['./nova-operacao']);
  }

  //reencaminha para controlo
  controlo() {
    localStorage.setItem('perfil', JSON.stringify("G"));
    this.router.navigate(['./controlo']);
  }
  //fecahar popup pausa
  cancelar() {
    this.reset();
    this.displaypausa = false;
  }

  //terminar pausa
  finalizarpausa() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var id_of = JSON.parse(localStorage.getItem('id_of_cab'));
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    this.RPOFCABService.getof(id_of).subscribe(result => {

      //estado RP_OF_OP_FUNC
      this.estado = [];
      this.estado.push('T');
      this.RPOPFUNCService.getdataof(id_of, user, this.estado).subscribe(result => {



        var id_op_cab = result[0][0].id_OP_CAB;

        //estado rp_of_para_lin
        var rp_of_para_lin = new RP_OF_PARA_LIN();

        this.RPOFPARALINService.getbyid_op_cab(id_op_cab).subscribe(result2 => {
          rp_of_para_lin = result2[0];
          rp_of_para_lin.data_FIM = date;

          rp_of_para_lin.hora_FIM = time;
          rp_of_para_lin.id_UTZ_MODIF = user;
          rp_of_para_lin.data_HORA_MODIF = date;
          rp_of_para_lin.estado = "C";
          this.RPOFPARALINService.update(rp_of_para_lin);

          for (var x in result) {

            this.estados_pausa_fim(result[x][1], user, nome, date, result2[0].momento_PARAGEM);

            if (result[x][1].id_OF_CAB_ORIGEM == null) {
              this.estadofuncionario(result[x][2].id_OP_CAB, user, nome, date, result2[0].momento_PARAGEM);
            }


          }


        }, error => console.log(error));
      }, error => console.log(error));
    }, error => console.log(error));


    this.reset();
    this.displaypausa = false;


  }
  //FINALIZAR PREPARAÇÃO E INICIAR EXECUÇÃO
  finalizarprep() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var id_of = JSON.parse(localStorage.getItem('id_of_cab'));
    this.estado = [];
    this.estado.push('T');
    this.RPOFOPCABService.getdataof(id_of, user, this.estado).subscribe(
      response => {
        for (var x in response) {

          this.finalizarprep2(date, nome, user, response[x][1].id_OF_CAB);

        }
      },
      error => console.log(error));
  }

  //FINALIZAR PREPARAÇÃO E INICIAR EXECUÇÃO
  finalizarprep2(date, nome, user, id_of) {


    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var total_pausa_prep = 0;

    //estado rp_of_cab
    var rp_of_cab = new RP_OF_CAB();
    this.RPOFCABService.getof(id_of).subscribe(result => {
      rp_of_cab = result[0];
      rp_of_cab.id_UTZ_MODIF = user;
      rp_of_cab.nome_UTZ_MODIF = nome;
      rp_of_cab.data_HORA_MODIF = date;
      rp_of_cab.estado = "E";
      this.RPOFCABService.update(rp_of_cab);
    }, error => console.log(error));

    //estado RP_OF_OP_FUNC
    this.estado = [];
    this.estado.push('T');
    this.RPOPFUNCService.getdataof(id_of, user, this.estado).subscribe(result => {
      var rp_of_op_cab = new RP_OF_OP_CAB;
      var rpfunc = new RP_OF_OP_FUNC();
      rpfunc = result[0][0];
      rp_of_op_cab = result[0][2];
      rpfunc.id_UTZ_MODIF = user;
      rpfunc.nome_UTZ_MODIF = nome;
      rpfunc.data_HORA_MODIF = date;
      rpfunc.perfil_MODIF = "O";
      rpfunc.estado = "E";

      for (var t in result) {
        if (result[t][1].id_OF_CAB_ORIGEM != null) {
          this.RPOPFUNCService.update(rpfunc);
        }
      }

      var id_op_cab = result[0][0].id_OP_CAB;

      if (result[0][1].id_OF_CAB_ORIGEM == null) {
        var rp_of_prep_lin = new RP_OF_PREP_LIN();
        this.RPOFPREPLINService.getbyid(id_op_cab).subscribe(result3 => {
          var countx = Object.keys(result3).length;
          if (countx > 0) {
            rp_of_prep_lin = result3[0];
            rp_of_prep_lin.estado = "C";
            rp_of_prep_lin.data_FIM = date;
            rp_of_prep_lin.hora_FIM = time;
            rp_of_prep_lin.data_HORA_MODIF = date;
            rp_of_prep_lin.id_UTZ_MODIF = user;


            this.RPOFPREPLINService.update(rp_of_prep_lin);
          }
          //tempo de Pausa
          this.RPOFPARALINService.getbyallID_OP_CAB(id_op_cab).subscribe(result1 => {
            var count = Object.keys(result1).length;
            var time_pausa_prep = "0:0:0";
            var timedif3 = 0;
            var timedif4 = 0;

            if (count > 0) {
              for (var x in result1) {
                if (result1[0].momento_PARAGEM == "P") {
                  var hora1 = new Date(result1[0].data_INI + " " + result1[0].hora_INI);
                  var hora2 = new Date(result1[0].data_FIM + " " + result1[0].hora_FIM);
                  var timedif1 = this.timediff(hora1.getTime(), hora2.getTime());
                  var splitted_pausa = timedif1.split(":", 3);
                  total_pausa_prep += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

                }
              }

              time_pausa_prep = this.gettime(total_pausa_prep);

            }

            var date1 = new Date(result3[0].data_INI + " " + result3[0].hora_INI);
            var date2 = new Date(date);

            var splitted_pausa = time_pausa_prep.split(":", 3);
            timedif4 = total_pausa_prep;
            var tempo = this.timediff(date1.getTime(), date2.getTime());
            var splitted_tempo = tempo.split(":", 3);
            timedif3 += parseInt(splitted_tempo[0]) * 3600000 + parseInt(splitted_tempo[1]) * 60000 + parseInt(splitted_tempo[2]) * 1000;

            var time_prep = timedif3 - timedif4;
            var tempo_prep = this.gettime(time_prep);
            rp_of_op_cab.tempo_PREP_TOTAL = tempo_prep;

            rp_of_op_cab.tempo_PREP_TOTAL_M1 = tempo_prep;
            rp_of_op_cab.tempo_PREP_TOTAL_M2 = tempo_prep;


            this.RPOPFUNCService.update(rpfunc);
            this.RPOFOPCABService.update(rp_of_op_cab);
          }, error => console.log(error));


        }, error => console.log(error));
      }
    }, error => console.log(error));

    this.reset();
    this.displayprep = false;
  }

  //FAZER PAUSA NA PREPARAÇÃO"
  pausa() {
    this.AppGlobals.setlogin_pausa(true);
    this.router.navigate(['./pausa']);
  }

  //CONCLUIR TRABALHO
  concluir() {
    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var id_of_cab = JSON.parse(localStorage.getItem('id_of_cab'));
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    this.estado = [];
    this.estado.push('C', 'A', 'M');
    this.RPOFOPCABService.getdataof(id_of_cab, user, this.estado).subscribe(
      response => {
        var count = 0;
        var total = Object.keys(response).length;
        for (var x in response) {
          var comp = true;
          count++;
          if (response[x][1].id_OF_CAB_ORIGEM == null) {
            this.estados(response[x][2].id_OP_CAB, user, nome, date, time, false, count, total);
          } else {
            this.estados(response[x][2].id_OP_CAB, user, nome, date, time, true, count, total);
          }
        }
      },
      error => console.log(error));
    //this.router.navigate(['./operacao-em-curso']);
  }

  //alterar estados
  estados(id_op_cab, user, nome, date, time_fim, comp, count2, total) {
    var id_of = JSON.parse(localStorage.getItem('id_of_cab'));
    var pausa_inicio = new Date();
    var total_pausa = 0;
    var total_pausa_prep = 0;
    var total_pausa_of = 0;
    this.RPOFOPCABService.getbyid(id_op_cab, this.id_OP_CAB).subscribe(result => {

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

        if (result[0][0].tempo_PARA_TOTAL != null) {
          rp_of_op_cab.tempo_PARA_TOTAL = "0:0:0";
          rp_of_op_cab.tempo_PARA_TOTAL_M1 = "0:0:0";
          rp_of_op_cab.tempo_PARA_TOTAL_M2 = "0:0:0";

        }


        var splitted_pausa = time_pausa_prep.split(":", 3);
        timedif5 = parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

        //estado rp_of_prep_lin
        var rp_of_prep_lin = new RP_OF_PREP_LIN();
        this.RPOFPREPLINService.getbyid(id_op_cab).subscribe(resu => {

          var count3 = Object.keys(resu).length;
          if (count3 > 0) {

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
          }
          var tempo_total_execucao = "0:0:0";

          //estado rp_of_op_cab

          rp_of_op_cab.tempo_PREP_TOTAL = tempo_prep;
          rp_of_op_cab.tempo_PARA_TOTAL = time_pausa_prep;
          rp_of_op_cab.tempo_EXEC_TOTAL = tempo_total_execucao;
          rp_of_op_cab.tempo_PREP_TOTAL_M1 = tempo_prep;
          rp_of_op_cab.tempo_PARA_TOTAL_M1 = time_pausa_prep;
          rp_of_op_cab.tempo_EXEC_TOTAL_M1 = tempo_total_execucao;
          rp_of_op_cab.tempo_PREP_TOTAL_M2 = tempo_prep;
          rp_of_op_cab.tempo_PARA_TOTAL_M2 = time_pausa_prep;
          rp_of_op_cab.tempo_EXEC_TOTAL_M2 = tempo_total_execucao;

          rp_of_op_func.id_UTZ_MODIF = user;
          rp_of_op_func.nome_UTZ_MODIF = nome;
          rp_of_op_func.data_HORA_MODIF = date;
          rp_of_op_func.perfil_MODIF = "O";
          rp_of_op_func.estado = "C";
          rp_of_op_func.data_FIM = date;
          rp_of_op_func.hora_FIM = time_fim;

          rp_of_op_func.data_FIM_M1 = date;
          rp_of_op_func.hora_FIM_M1 = time_fim;
          rp_of_op_func.data_FIM_M2 = date;
          rp_of_op_func.hora_FIM_M2 = time_fim;


          this.RPOFCABService.update(rp_of_cab);
          this.RPOPFUNCService.update(rp_of_op_func);
          if (!comp) this.RPOFOPCABService.update(rp_of_op_cab);
          if (count2 == total) this.ficheiroteste(id_of);
          this.displayprep = false;
          this.reset();
        }, error => console.log(error));
      }, error => console.log(error));
    }, error => console.log(error));
  }


  ficheiroteste(id) {
    this.ofService.criaficheiro(id, "O").subscribe(resu => {
    }, error => {
      console.log(error)
    });
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
    return this.pad(hours, 2) + ":" + this.pad(minutes, 2) + ":" + this.pad(seconds, 2);
  }

  pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  }

  estados_pausa_fim(result, user, nome, date, estado) {

    //estado rp_of_cab
    var rp_of_cab = new RP_OF_CAB();
    rp_of_cab = result;
    rp_of_cab.id_UTZ_MODIF = user;
    rp_of_cab.nome_UTZ_MODIF = nome;
    rp_of_cab.data_HORA_MODIF = date;
    rp_of_cab.estado = estado;



    this.RPOFCABService.update(rp_of_cab);
    this.router.navigate(['./home']);
  }


  estadofuncionario(id_op_cab, user, nome, date, estado) {
    //estado rp_of_op_func
    this.RPOPFUNCService.getbyid(id_op_cab, user).subscribe(result => {
      var rpfunc = new RP_OF_OP_FUNC();
      rpfunc = result[0][0];
      rpfunc.id_UTZ_MODIF = user;
      rpfunc.nome_UTZ_MODIF = nome;
      rpfunc.data_HORA_MODIF = date;
      rpfunc.perfil_MODIF = "O";
      rpfunc.estado = estado;

      this.RPOPFUNCService.update(rpfunc);
    }, error => console.log(error));
  }

}
