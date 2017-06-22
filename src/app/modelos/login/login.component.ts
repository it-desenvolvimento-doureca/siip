import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  constructor(private RPOFPREPLINService: RPOFPREPLINService, private RPOFOPCABService: RPOFOPCABService, private RPOFPARALINService: RPOFPARALINService, private router: Router, private service: utilizadorService, private service__utz: RPCONFUTZPERFService, private RPOFCABService: RPOFCABService) {
    //limpar a sessão
    //localStorage.clear();
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
        //se existir uma of vai preencher combobox operações
        if (count > 0) {
          localStorage.setItem('user', JSON.stringify({ username: response[0].RESCOD, name: response[0].RESDES }));
          this.edited = true;
          this.name = response[0].RESDES;

          //guarda os dados do login
          return true;
        } else {
          this.edited = false;
          this.name = "";
        }
      },
      error => console.log(error));


  }


  //Tecla de limpar número
  undo() {
    if (this.operation != '') {
      this.operation = this.operation.slice(0, -1);
      this.count--;
      if (this.count >= 3) {
        this.userexists();
      }
    }
  }

  //Limpar input de login
  reset() {
    this.count = 1;
    this.edited = false;
    this.name = "";
    this.operation = "";
    //localStorage.clear();
  }

  //Se o utilizador clicar em sim, vai verificar o tipo de utilizador
  redirect() {
    var id = JSON.parse(localStorage.getItem('user'))["username"];
    this.RPOFOPCABService.listofcurrentof(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            localStorage.setItem('id_of_cab', JSON.stringify(response[x].id_OF_CAB));
            switch (response[x].estado) {
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
          var dataacess: any[] = [];
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
                      this.router.navigate(['./controlo']);
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
      error => console.log(error));
  }

  //popupadministratoa
  adminlogin() {
    this.display = false;
    this.display2 = true;
    localStorage.setItem('perfil', JSON.stringify("A"));
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

    //estado rp_of_cab
    var rp_of_cab = new RP_OF_CAB();
    this.RPOFCABService.getof(id_of).subscribe(result => {
      rp_of_cab = result[0];
      rp_of_cab.id_UTZ_MODIF = user;
      rp_of_cab.nome_UTZ_MODIF = nome;
      rp_of_cab.data_HORA_MODIF = date;


      //estado rp_of_op_cab
      this.RPOFOPCABService.getdataof(id_of, user).subscribe(result => {
        var rp_of_op_cab = new RP_OF_OP_CAB();
        rp_of_op_cab = result[0][0];
        rp_of_op_cab.id_UTZ_MODIF = user;
        rp_of_op_cab.nome_UTZ_MODIF = nome;
        rp_of_op_cab.data_HORA_MODIF = date;
        rp_of_op_cab.perfil_MODIF = "O";


        var id_op_cab = result[0][0].id_OP_CAB;

        //estado rp_of_para_lin
        var rp_of_para_lin = new RP_OF_PARA_LIN();

        this.RPOFPARALINService.getbyid_op_cab(id_op_cab).subscribe(result => {
          rp_of_para_lin = result[0];
          rp_of_para_lin.data_FIM = date;

          rp_of_para_lin.hora_FIM = time;
          rp_of_para_lin.id_UTZ_MODIF = user;
          rp_of_para_lin.data_HORA_MODIF = date;
          rp_of_para_lin.estado = "C";
          this.RPOFPARALINService.update(rp_of_para_lin);
          // console.log(result[0].momento_PARAGEM);
          rp_of_cab.estado = result[0].momento_PARAGEM;
          rp_of_op_cab.estado = result[0].momento_PARAGEM;
          this.RPOFOPCABService.update(rp_of_op_cab);
          this.RPOFCABService.update(rp_of_cab);

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
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var total_pausa_prep = date;

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

    //estado rp_of_op_cab
    this.RPOFOPCABService.getdataof(id_of, user).subscribe(result => {
      var rp_of_op_cab = new RP_OF_OP_CAB();
      rp_of_op_cab = result[0][0];
      rp_of_op_cab.id_UTZ_MODIF = user;
      rp_of_op_cab.nome_UTZ_MODIF = nome;
      rp_of_op_cab.data_HORA_MODIF = date;
      rp_of_op_cab.perfil_MODIF = "O";
      rp_of_op_cab.estado = "E";

      var id_op_cab = result[0][0].id_OP_CAB;


      //estado rp_of_prep_lin
      var rp_of_prep_lin = new RP_OF_PREP_LIN();
      this.RPOFPREPLINService.getbyid(id_op_cab).subscribe(result => {
        rp_of_prep_lin = result[0];
        rp_of_prep_lin.estado = "C";
        rp_of_prep_lin.data_FIM = date;
        rp_of_prep_lin.hora_FIM = time;
        rp_of_prep_lin.data_HORA_MODIF = date;
        rp_of_prep_lin.id_UTZ_MODIF = user;

        this.RPOFPREPLINService.update(rp_of_prep_lin);

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
                var timedif = new Date(Math.abs(hora1.getTime() - hora2.getTime()));
                total_pausa_prep = new Date(Math.abs(timedif.getTime() + total_pausa_prep.getTime()));
              }
            }
            var total_diff2 = new Date(Math.abs(total_pausa_prep.getTime() - date.getTime()));
            var diffhour2 = total_diff2.getHours();
            var diffminute2 = total_diff2.getMinutes();
            var diffsecond2 = total_diff2.getSeconds();
            time_pausa_prep = diffhour2 + ":" + diffminute2 + ":" + diffsecond2;

          }

          var date1 = new Date(result[0].data_INI + " " + result[0].hora_INI);
          var date2 = new Date(date);

          var splitted_pausa = time_pausa_prep.split(":", 3);
          timedif4 = parseInt(splitted_pausa[0]) * 36000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
          timedif3 = Math.abs(date1.getTime() - date2.getTime());

          var time_prep = timedif3 - timedif4;
          var seconds1 = time_prep / 1000;
          var hours1 = seconds1 / 3600;
          seconds1 = seconds1 % 3600;
          var minutes1 = seconds1 / 60;
          seconds1 = seconds1 % 60;
          var tempo_prep = Math.floor(hours1) + ":" + Math.floor(minutes1) + ":" + Math.floor(seconds1)
          rp_of_op_cab.tempo_PREP_TOTAL = tempo_prep;

          this.RPOFOPCABService.update(rp_of_op_cab);
        }, error => console.log(error));


      }, error => console.log(error));
    }, error => console.log(error));

    this.reset();
    this.displayprep = false;
  }

  //FAZER PAUSA NA PREPARAÇÃO"
  pausa() {
    this.router.navigate(['./pausa']);
  }

  //CONCLUIR TRABALHO
  concluir() {
    this.router.navigate(['./operacao-em-curso']);
  }

  ngOnInit() {

  }


}
