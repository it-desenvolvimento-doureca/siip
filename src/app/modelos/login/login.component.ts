import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
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
import { AppGlobals, webUrl } from 'webUrl';
import { ofService } from 'app/ofService';
import { RP_CONF_UTZ_PERF } from '../entidades/RP_CONF_UTZ_PERF';
import { GEREVENTOService } from '../services/ger-evento.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  id_OP_CAB: void;
  //estado: any = [];
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
  displayPasswordADMIN: boolean;
  operation2: string;
  password: string = "";
  passworderrada: boolean;
  displayDialog: boolean;
  disabledRegisto: boolean;
  displayDialogutz_em_uso: boolean;
  utilizador_insere: any;
  id_op_cab_lista: any[];
  displayDialogutz: boolean;
  operadorPrincipal: boolean;
  display_alerta: boolean;
  texto_alerta: string;
  maquina: boolean;
  concluir_bt: boolean;
  utilizadores: any[];
  utilizadores_todos: any;
  texto_alerta2: string;
  display_alerta2: boolean;
  constructor(private confirmationService: ConfirmationService, private GEREVENTOService: GEREVENTOService, private ofService: ofService, private AppGlobals: AppGlobals, private elementRef: ElementRef, private RPOPFUNCService: RPOPFUNCService, private RPOFPREPLINService: RPOFPREPLINService, private RPOFOPCABService: RPOFOPCABService, private RPOFPARALINService: RPOFPARALINService, private router: Router, private service: utilizadorService, private service__utz: RPCONFUTZPERFService, private RPOFCABService: RPOFCABService) {

  }

  ngOnInit() {
    //limpar a sessão
    if (this.AppGlobals.getlogin_pausa()) {
      this.displayprep = true;
      this.AppGlobals.setlogin_pausa(false);
    } else {
      //localStorage.clear();
      localStorage.removeItem('time_siip');
      localStorage.removeItem('id_of_cab');
      localStorage.removeItem('id_op_cab');
      localStorage.removeItem('siip_edicao');
      localStorage.removeItem('user');
      localStorage.removeItem('access');
      localStorage.removeItem('sec_num_user');
      localStorage.removeItem('perfil');
    }
    var versionUpdate = (new Date()).getTime();
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/demo.js?v=" + versionUpdate;
    this.elementRef.nativeElement.appendChild(s);



    //verifica a versão nos cookies se for igual não faz nada se for diferente atualiza a página e os cookies
    this.verificaversao();

  }
  verificaversao() {
    this.service.getversao().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var username = this.getCookie("app_producao_versao");
          if (username != null) {
            if (username != response[0].versao) {
              window.location.reload(true);
              this.setCookie("app_producao_versao", response[0].versao);
            }
          } else {
            window.location.reload(true);
            this.setCookie("app_producao_versao", response[0].versao);

          }
        }
      },
      error => {
        console.log(error);
      }

    );
  }


  setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  //adiciona número ao input de login
  append(element: string) {

    if (this.count != (this.operation.length + 1)) { this.count = (this.operation.length + 1) }
    if (this.count <= 4) {
      this.operation += element;
      this.count++;
    }

    if (this.count > 3) {
      this.loading = true;
      var count = this.count;
      setTimeout(() => {
        if (this.count == count) this.userexists();
      }, 1500);
    }

  }

  //adiciona número ao input de login
  append2(element: string) {
    this.passworderrada = false;
    this.operation2 += element;
  }

  //verificar se utilizador existe
  userexists() {
    if (this.count > 3 && this.operation != "" && this.operation != null) {
      this.service.searchuser(this.operation).subscribe(
        response => {
          var count = Object.keys(response).length;

          if (count > 0) {
            localStorage.setItem('user', JSON.stringify({ username: response[0].RESCOD, name: response[0].RESDES }));
            localStorage.setItem('time_siip', JSON.stringify({ data: new Date() }));
            this.edited = true;
            this.name = response[0].RESDES;
            this.loading = false;
            //guarda os dados do login
            return true;
          } else {
            this.edited = false;
            this.name = "";
            this.loading = false;
            //alert("Utilizador não foi encontrado!");
            this.texto_alerta2 = "<h4>Utilizador não foi encontrado</h4>";
            this.display_alerta2 = true;
            this.reset();
          }
        },
        error => {
          console.log(error)
          if (error.status == 0) {
            //alert("Conexão com o Servidor Perdida!");
            this.texto_alerta2 = "Conexão com o Servidor Perdida!";
            this.display_alerta2 = true;
            this.loading = false;
          }
        }

      );
    } else {
      this.loading = false;
    }

  }

  //Tecla de limpar número
  undo2() {
    this.passworderrada = false;
    if (this.operation2 != '') {
      this.operation2 = this.operation2.slice(0, -1);
    }
  }

  //Tecla de limpar número
  undo() {
    if (this.operation != '') {
      this.operation = this.operation.slice(0, -1);
      this.count--;
      if (this.count > 3) {
        this.loading = true;
        setTimeout(() => {
          this.userexists();
        }, 1500);
      } else {
        this.edited = false;
        this.name = "";
        this.loading = false;
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
    localStorage.removeItem('time_siip');
    localStorage.removeItem('id_of_cab');
    localStorage.removeItem('id_op_cab');
    localStorage.removeItem('siip_edicao');
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('sec_num_user');
    localStorage.removeItem('perfil');
  }

  //Se o utilizador clicar em sim, vai verificar o tipo de utilizador
  redirect() {
    var dataacess: any[] = [];
    var id = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];

    this.RPOFOPCABService.listofcurrentof(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.id_OP_CAB = response[x][1].id_OP_CAB;
            localStorage.setItem('id_of_cab', JSON.stringify(response[x][1].id_OF_CAB));
            dataacess = ["O"];
            localStorage.setItem('access', JSON.stringify(dataacess));

            if (response[x][0].id_UTZ_CRIA == response[x][2].id_UTZ_CRIA) {
              this.operadorPrincipal = false;
            } else {
              this.operadorPrincipal = true;
            }

            if (response[x][2].maq_NUM == '000') {
              this.maquina = true;
            }

            switch (response[x][0].estado) {
              case "I":
                this.router.navigate(['./operacao-em-curso']);
                this.verificaversao();
                break;
              case "P":
                this.displayprep = true;
                break;
              case "S":
                this.displaypausa = true;
                break;
              case "E":
                this.router.navigate(['./operacao-em-curso']);
                this.verificaversao();
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
              var total = 0;
              if (count > 0) {
                for (var x in response) {
                  if (response[x].perfil != "E") total++;
                }
              }
              count = total;
              this.service__utz.getSEC(id).subscribe(
                response2 => {
                  var sec_num = [];
                  for (var y in response2) {
                    sec_num.push("'" + response2[y].sec_NUM + "'");
                  }
                  localStorage.setItem('sec_num_user', JSON.stringify(sec_num.toString()));
                  if (count == 1) {
                    for (var x in response) {
                      dataacess.push(response[x].perfil);
                      switch (response[x].perfil) {
                        case "O":
                          localStorage.setItem('perfil', JSON.stringify("O"));
                          this.router.navigate(['./nova-operacao']);
                          this.verificaversao();
                          break;
                        case "G":
                          localStorage.setItem('perfil', JSON.stringify("G"));
                          this.chefelogin();
                          //this.router.navigate(['./controlo']);
                          break;
                        case "A":
                          localStorage.setItem('perfil', JSON.stringify("A"));
                          localStorage.setItem('sec_num_user', JSON.stringify("ADMIN"));
                          this.password = response[x].password;
                          this.adminlogin();
                          break;
                      }
                    }
                  } else if (count == 0) {
                    //alert("SEM ACESSO");

                    var conf_utiliz = new RP_CONF_UTZ_PERF;
                    conf_utiliz.id_UTZ = id;
                    conf_utiliz.perfil = "O";
                    conf_utiliz.nome_UTZ = nome;
                    dataacess.push("O");
                    localStorage.setItem('perfil', JSON.stringify("O"));
                    this.service__utz.create(conf_utiliz).then(() => {
                      this.router.navigate(['./nova-operacao']);
                      this.verificaversao();
                      this.verifica(id, nome);
                    });

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
                          localStorage.setItem('sec_num_user', JSON.stringify("ADMIN"));
                          this.password = response[x].password;
                          this.isHidden2 = false;
                          break;
                      }
                    }
                    this.abrirpopupdisplay();
                  }

                  localStorage.setItem('access', JSON.stringify(dataacess));
                },
                error => console.log(error));

            },
            error => console.log(error));
        }
      },
      error => {
        console.log(error)
        if (error.status == 0) {
          //alert("Conexão com o Servidor Perdida!");
          this.texto_alerta2 = "Conexão com o Servidor Perdida!";
          this.display_alerta2 = true;
        }
      });
  }

  //verificar enventos
  verifica(id, utilizador) {
    var dados = "{id::" + id + ";#;utilizador::" + utilizador + "}"
    var data = [{ MODULO: 4, MOMENTO: "Utilizador Não Existe nos Acessos", PAGINA: "Login", ESTADO: true, DADOS: dados }];

    this.GEREVENTOService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }


  abrirpopupdisplay() {
    if (this.password != "" && this.password != null) {
      if (JSON.parse(localStorage.getItem('sec_num_user')) != null && JSON.parse(localStorage.getItem('sec_num_user')) == "ADMIN") {
        this.displayPasswordADMIN = true;
        this.operation2 = "";
      } else {
        this.display = true;
      }
    } else {
      this.display = true;
    }
  }

  continuar() {
    if (this.operation2 == this.password) {
      this.displayPasswordADMIN = false;
      this.display = true;
    } else {
      this.passworderrada = true;
    }
  }

  //popupadministratoa
  adminlogin() {
    this.display2 = false;
    this.isHidden1 = false;
    this.isHidden2 = false;
    this.isHidden3 = false;
    localStorage.setItem('perfil', JSON.stringify("G"));

    this.abrirpopupdisplay();
  }

  //popupadministratoa
  chefelogin() {
    this.display2 = false;
    this.isHidden1 = false;
    this.isHidden2 = true;
    this.isHidden3 = false;
    localStorage.setItem('perfil', JSON.stringify("A"));
    this.abrirpopupdisplay();
  }

  adminarea() {
    this.router.navigate(['./config']);
    this.verificaversao();
  }

  //reencaminha para nova operação
  novaoperacao() {
    localStorage.setItem('perfil', JSON.stringify("O"));
    this.router.navigate(['./nova-operacao']);
    this.verificaversao();
  }

  //reencaminha para controlo
  controlo() {
    localStorage.setItem('perfil', JSON.stringify("G"));
    this.router.navigate(['./controlo']);
    this.verificaversao();
  }
  //fecahar popup pausa
  cancelar() {
    this.reset();
    this.displaypausa = false;
  }

  //terminar pausa
  finalizarpausa(user_ = null, nome_ = null, data = null, cria = false, continua = false, concluir = false, y = null, id_of_cab = null) {
    var date = (data != null) ? data : new Date();
    var user = (user_ != null) ? user_ : JSON.parse(localStorage.getItem('user'))["username"];
    var nome = (nome_ != null) ? nome_ : JSON.parse(localStorage.getItem('user'))["name"];
    var id_of = JSON.parse(localStorage.getItem('id_of_cab'));
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if (id_of == null) id_of = id_of_cab;

    this.RPOFCABService.getof(id_of).subscribe(result => {

      //estado RP_OF_OP_FUNC
      var estados = [];
      estados.push('T');
      this.RPOPFUNCService.getdataof(id_of, user, estados).subscribe(result => {

        var id_op_cab = result[0][0].id_OP_CAB;

        for (var z in result) {
          if (result[z][0].estado == 'S') {
            id_op_cab = result[z][0].id_OP_CAB;
          }
        }

        //estado rp_of_para_lin
        var rp_of_para_lin = new RP_OF_PARA_LIN();

        this.RPOFPARALINService.getbyid_op_cab(id_op_cab).subscribe(result2 => {
          var count = Object.keys(result2).length;

          if (count > 0) {
            rp_of_para_lin = result2[0];
            var data1 = new Date(rp_of_para_lin.data_INI_M2 + ' ' + rp_of_para_lin.hora_INI_M2);
            var data2 = date;

            if (data1.getTime() > data2.getTime()) {
              this.texto_alerta2 = "A data início da pausa é superior à data atual. Data início pausa: <b>"
                + rp_of_para_lin.data_INI_M2 + " " + rp_of_para_lin.hora_INI_M2 + "</b>";
              this.display_alerta2 = true;
            }
            else {
              rp_of_para_lin.data_FIM = new Date(this.formatDate(date));
              rp_of_para_lin.hora_FIM = time;

              rp_of_para_lin.data_FIM_M1 = new Date(this.formatDate(date));
              rp_of_para_lin.hora_FIM_M1 = time;
              rp_of_para_lin.data_FIM_M2 = new Date(this.formatDate(date));
              rp_of_para_lin.hora_FIM_M2 = time;

              rp_of_para_lin.id_UTZ_MODIF = user;
              rp_of_para_lin.data_HORA_MODIF = date;
              rp_of_para_lin.estado = "C";
              this.RPOFPARALINService.update(rp_of_para_lin).then(result3 => {


                if (continua && concluir) {
                  this.concluir2(this.utilizadores_todos[y].user, this.utilizadores_todos[y].nome, parseInt(y) + 1, this.utilizadores_todos.length, !this.operadorPrincipal, data, id_of_cab);
                }
                if (continua && !concluir) {
                  this.finalizarprepfin(this.utilizadores_todos[y].user, this.utilizadores_todos[y].nome, data, id_of, (cria) ? "S" : "E");
                }

                this.RPOFPARALINService.apagapausasbyid_op_cab(id_op_cab).subscribe(result4 => {
                  if (cria) this.criarPAUSAS(id_op_cab, date, time, user, result2[0].tipo_PARAGEM_M1, result2[0].des_PARAGEM_M1);
                }, error => console.log(error));
              });

              if (!continua) {
                for (var x in result) {
                  if (result[x][0].estado == 'S') {
                    this.estados_pausa_fim(result[x][1], user, nome, date, result2[0].momento_PARAGEM);

                    if (result[x][1].id_OF_CAB_ORIGEM == null) {
                      this.estadofuncionario(result[x][2].id_OP_CAB, user, nome, date, result2[0].momento_PARAGEM);
                    }
                  }
                }
              }
            }
          } else {
            this.estadofuncionario(result[0][2].id_OP_CAB, user, nome, date, result[0][1].estado);
          }


        }, error => console.log(error));
      }, error => console.log(error));
    }, error => console.log(error));


    if (!continua) this.reset();
    this.displaypausa = false;


  }

  //CRIAR PAUSAS
  criarPAUSAS(id_op_cab, date, time, user, item, design) {

    var id_op_cab = id_op_cab;
    var rp_of_para_lin = new RP_OF_PARA_LIN();
    rp_of_para_lin.data_INI = new Date(this.formatDate(date));
    rp_of_para_lin.hora_INI = time;

    rp_of_para_lin.data_INI_M1 = new Date(this.formatDate(date));
    rp_of_para_lin.hora_INI_M1 = time;

    rp_of_para_lin.data_INI_M2 = new Date(this.formatDate(date));
    rp_of_para_lin.hora_INI_M2 = time;

    rp_of_para_lin.id_UTZ_CRIA = user;
    rp_of_para_lin.id_OP_CAB = id_op_cab;
    rp_of_para_lin.tipo_PARAGEM = item;
    rp_of_para_lin.tipo_PARAGEM_M1 = item;
    rp_of_para_lin.tipo_PARAGEM_M2 = item;
    rp_of_para_lin.des_PARAGEM = design;
    rp_of_para_lin.des_PARAGEM_M1 = design;
    rp_of_para_lin.des_PARAGEM_M2 = design;
    rp_of_para_lin.momento_PARAGEM = "E";
    rp_of_para_lin.momento_PARAGEM_M1 = "E";
    rp_of_para_lin.momento_PARAGEM_M2 = "E";
    rp_of_para_lin.estado = "S";
    this.RPOFPARALINService.create(rp_of_para_lin).subscribe(
      res => {
      },
      error => console.log(error));
  }

  // AO FINALIZAR PREPARAÇÃO E INICIAR EXECUÇÃO verifica users
  finalizarprep() {
    var date = new Date();
    var id_of_cab = JSON.parse(localStorage.getItem('id_of_cab'));
    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    this.texto_alerta = "";
    var encontrou = false;
    this.RPOPFUNCService.getUsersbyid_of_cab(id_of_cab).subscribe(
      response => {
        this.count = Object.keys(response).length;
        this.utilizadores = [];
        this.utilizadores_todos = [];
        var utilizadores_live = "";
        for (var x in response) {
          if (response[x].estado == 'S') {
            this.texto_alerta += "Utilizador: " + response[x].id_UTZ_CRIA + ' - ' + response[x].nome_UTZ_CRIA + ', encontra-se em Pausa. <br>';
            encontrou = true;
          } if (response[x].estado == 'P') {
            this.utilizadores.push({ nome: response[x].nome_UTZ_CRIA, user: response[x].id_UTZ_CRIA, estado: response[x].estado });
            if (response[x].id_UTZ_CRIA != user) utilizadores_live += "<br>" + response[x].id_UTZ_CRIA + ' - ' + response[x].nome_UTZ_CRIA
          }
          if (response[x].estado == 'P' || response[x].estado == 'S') this.utilizadores_todos.push({ nome: response[x].nome_UTZ_CRIA, user: response[x].id_UTZ_CRIA, estado: response[x].estado });
        }

        if (encontrou) {
          this.display_alerta = true;
          this.concluir_bt = false;
        } else {
          if (this.utilizadores.length > 1) {
            this.confirmationService.confirm({
              message: 'Existem Operários em Preparação, pretende continuar?' + utilizadores_live,
              accept: () => {
                for (var y in this.utilizadores) {
                  this.finalizarprepfin(this.utilizadores[y].user, this.utilizadores[y].nome, date, id_of_cab)
                }
              }, reject: () => {
              }
            });

          } else {
            this.confirmationService.confirm({
              message: 'Finalizar Preparação e Iniciar Execução?',
              accept: () => {
                this.finalizarprepfin(user, nome, date, id_of_cab)
              }, reject: () => {
              }
            });
          }
        }

      }, error => {
        console.log(error);
        var user = JSON.parse(localStorage.getItem('user'))["username"];
        var nome = JSON.parse(localStorage.getItem('user'))["name"];
        this.finalizarprepfin(user, nome, date, id_of_cab)
      });
  }

  //FINALIZAR PREPARAÇÃO E INICIAR EXECUÇÃO
  finalizarprepfin(user, nome, date, id_of_cab, estado = "E") {

    // var user = JSON.parse(localStorage.getItem('user'))["username"];
    //var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var id_of = JSON.parse(localStorage.getItem('id_of_cab'));
    if (id_of == null) id_of = id_of_cab;
    var estados = [];
    estados.push('T');
    this.RPOFOPCABService.getdataof(id_of, user, estados).subscribe(
      response => {
        for (var x in response) {

          this.finalizarprep2(date, nome, user, response[x][1].id_OF_CAB, estado);

        }
      },
      error => console.log(error));
  }

  //FINALIZAR PREPARAÇÃO E INICIAR EXECUÇÃO
  finalizarprep2(date, nome, user, id_of, estado) {


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
    var estados = [];
    estados.push('T');
    this.RPOPFUNCService.getdataof(id_of, user, estados).subscribe(result => {
      var rp_of_op_cab = new RP_OF_OP_CAB;
      var rpfunc = new RP_OF_OP_FUNC();
      rpfunc = result[0][0];
      rp_of_op_cab = result[0][2];
      rpfunc.id_UTZ_MODIF = user;
      rpfunc.nome_UTZ_MODIF = nome;
      rpfunc.data_HORA_MODIF = date;
      rpfunc.perfil_MODIF = "O";
      rpfunc.estado = estado;

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
            rp_of_prep_lin.data_FIM = new Date(this.formatDate(date));
            rp_of_prep_lin.hora_FIM = time;
            rp_of_prep_lin.data_FIM_M1 = new Date(this.formatDate(date));
            rp_of_prep_lin.hora_FIM_M1 = time;
            rp_of_prep_lin.data_FIM_M2 = new Date(this.formatDate(date));
            rp_of_prep_lin.hora_FIM_M2 = time;

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
                if (result1[x].momento_PARAGEM == "P") {
                  var hora1 = new Date(result1[x].data_INI + " " + result1[x].hora_INI);
                  var hora2 = new Date(result1[x].data_FIM + " " + result1[x].hora_FIM);
                  var timedif1 = this.timediff(hora1.getTime(), hora2.getTime());
                  var splitted_pausa = timedif1.split(":", 3);
                  total_pausa_prep += parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;

                }
              }

              time_pausa_prep = this.gettime(total_pausa_prep);

            }

            var date1 = new Date(result3[0].data_INI + " " + result3[0].hora_INI);
            var date2 = new Date(date);

            //var splitted_pausa = time_pausa_prep.split(":", 3);
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
    this.verificaversao();
  }

  continuar_concluir() {
    var id_of_cab = JSON.parse(localStorage.getItem('id_of_cab'));
    this.confirmationService.confirm({
      message: 'Pretende Continuar?',
      accept: () => {
        this.display_alerta = false;
        //se for para concluir
        var data = new Date();
        if (this.concluir_bt) {

          for (var y in this.utilizadores_todos) {
            if (this.utilizadores_todos[y].estado == "S") {
              this.finalizarpausa(this.utilizadores_todos[y].user, this.utilizadores_todos[y].nome, data, false, true, true, y, id_of_cab);
            } else if (this.utilizadores_todos[y].estado == "P") {
              this.concluir2(this.utilizadores_todos[y].user, this.utilizadores_todos[y].nome, parseInt(y) + 1, this.utilizadores_todos.length, !this.operadorPrincipal, data, id_of_cab);
            }
          }
        } else {
          for (var y in this.utilizadores_todos) {
            if (this.utilizadores_todos[y].estado == "S") {
              this.finalizarpausa(this.utilizadores_todos[y].user, this.utilizadores_todos[y].nome, data, true, true, false, y, id_of_cab);
            } else if (this.utilizadores_todos[y].estado == "P") {
              this.finalizarprepfin(this.utilizadores_todos[y].user, this.utilizadores_todos[y].nome, data, id_of_cab);
            }
          }
        }
      }, reject: () => {
      }
    });
  }


  //CONCLUIR TRABALHO verifica users
  concluir(lider) {
    var user = JSON.parse(localStorage.getItem('user'))["username"];
    var nome = JSON.parse(localStorage.getItem('user'))["name"];
    var id_of_cab = JSON.parse(localStorage.getItem('id_of_cab'));
    this.texto_alerta = "";
    var encontrou = false;
    this.RPOPFUNCService.getUsersbyid_of_cab(id_of_cab).subscribe(
      response => {
        this.count = Object.keys(response).length;
        this.utilizadores = [];
        this.utilizadores_todos = [];
        var utilizadores_live = "";
        for (var x in response) {
          if (response[x].estado == 'S') {
            this.texto_alerta += "Utilizador: " + response[x].id_UTZ_CRIA + ' - ' + response[x].nome_UTZ_CRIA + ', encontra-se em Pausa. <br>';
            encontrou = true;
          } else if (response[x].estado == 'P') {
            this.utilizadores.push({ nome: response[x].nome_UTZ_CRIA, user: response[x].id_UTZ_CRIA, estado: response[x].estado })
            if (response[x].id_UTZ_CRIA != user) utilizadores_live += "<br>" + response[x].id_UTZ_CRIA + ' - ' + response[x].nome_UTZ_CRIA
          }
          if (response[x].estado == 'P' || response[x].estado == 'S') this.utilizadores_todos.push({ nome: response[x].nome_UTZ_CRIA, user: response[x].id_UTZ_CRIA, estado: response[x].estado });
        }

        if (encontrou && lider) {
          this.display_alerta = true;
          this.concluir_bt = true;
        } else {

          if (this.utilizadores.length > 1 && lider) {
            this.confirmationService.confirm({
              message: 'Existem Operários em Preparação, pretende continuar?' + utilizadores_live,
              accept: () => {
                for (var y in this.utilizadores) {
                  this.concluir2(this.utilizadores[y].user, this.utilizadores[y].nome, parseInt(y) + 1, this.utilizadores.length, lider, null, id_of_cab);
                }
              }, reject: () => {
              }
            });

          } else {
            this.confirmationService.confirm({
              message: 'Terminar Trabalho?',
              accept: () => {
                this.concluir2(user, nome, 1, 1, lider, null, id_of_cab);
              }, reject: () => {
              }
            });

          }

        }

      }, error => {
        console.log(error);
        var user = JSON.parse(localStorage.getItem('user'))["username"];
        var nome = JSON.parse(localStorage.getItem('user'))["name"];

        this.concluir2(user, nome, 1, 1, lider, null, id_of_cab)
      });
  }

  concluir2(user, nome, user_count, total_user, lider, data = null, id_of_cab) {


    var date = (data == null) ? new Date() : data;
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var estados = [];
    estados.push('C', 'A', 'M');
    this.RPOFOPCABService.getdataof(id_of_cab, user, estados).subscribe(
      response => {
        var count = 0;
        var total = Object.keys(response).length;

        for (var x in response) {
          var comp = true;
          count++;
          if (response[x][1].id_OF_CAB_ORIGEM == null) {

            this.estados(response[x][2].id_OP_CAB, user, nome, date, time, false, count, total, user_count, total_user, lider, id_of_cab);
          } else {
            this.estados(response[x][2].id_OP_CAB, user, nome, date, time, true, count, total, user_count, total_user, lider, id_of_cab);
          }
        }
      },
      error => console.log(error));
    //this.router.navigate(['./operacao-em-curso']);
  }

  //alterar estados
  estados(id_op_cab, user, nome, date, time_fim, comp, count2, total, user_count, total_user, lider, id_of_cab) {
    var id_of = JSON.parse(localStorage.getItem('id_of_cab'));
    var pausa_inicio = new Date();
    var total_pausa = 0;
    var total_pausa_prep = 0;
    var total_pausa_of = 0;
    if (id_of == null) id_of = id_of_cab;
    this.RPOFOPCABService.getbyid(id_op_cab, id_op_cab).subscribe(result => {
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
      //if (count2 == total && user_count == total_user) rp_of_cab.estado = "C"
      if (lider) rp_of_cab.estado = "C"

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
            rp_of_prep_lin.data_FIM = new Date(this.formatDate(date));
            rp_of_prep_lin.hora_FIM = time_fim;

            rp_of_prep_lin.data_FIM_M1 = new Date(this.formatDate(date));
            rp_of_prep_lin.hora_FIM_M1 = time_fim;
            rp_of_prep_lin.data_FIM_M2 = new Date(this.formatDate(date));
            rp_of_prep_lin.hora_FIM_M2 = time_fim;

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
          rp_of_op_func.data_FIM = new Date(this.formatDate(date));
          rp_of_op_func.hora_FIM = time_fim;

          rp_of_op_func.data_FIM_M1 = new Date(this.formatDate(date));
          rp_of_op_func.hora_FIM_M1 = time_fim;
          rp_of_op_func.data_FIM_M2 = new Date(this.formatDate(date));
          rp_of_op_func.hora_FIM_M2 = time_fim;


          if (lider) this.RPOFCABService.update(rp_of_cab);
          this.RPOPFUNCService.update(rp_of_op_func);
          if (!comp) this.RPOFOPCABService.update(rp_of_op_cab);
          if (count2 == total && user_count == total_user) this.ficheiroteste(id_of);
          this.displayprep = false;
          this.reset();
        }, error => console.log(error));
      }, error => console.log(error));
    }, error => console.log(error));
  }


  ficheiroteste(id) {
    var data = [{ ip_posto: this.getCookie("IP_CLIENT") }];
    this.ofService.criaficheiro(id, "O", false, false, data).subscribe(resu => {
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

  //detecta evento tecclado escreve no popup se estiver aberto 
  @HostListener('window:keydown', ['$event'])
  doSomething(event) {

    if (!this.displayDialog) {
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        if (this.displayPasswordADMIN) {
          this.append2(event.key)
        } else {
          this.append(event.key)
        }
      } else if (event.keyCode == 8) {
        if (this.displayPasswordADMIN) {
          this.undo2();
        } else {
          this.undo();
        }
      } else if (event.keyCode == 13) {

        if (this.displayPasswordADMIN) {
          if (event.target.localName == "button") {
            this.continuar();
            return false;
          } else {
            this.continuar();
          }
        } else {
          if (event.target.localName == "button") {
            return false;
          }
        }
      }
    }

  }


  //adicionarOP
  adicionarOperario() {
    this.displayDialog = true
  }
  //fechar popup adicionar operador
  cancel() {
    this.displayDialog = false;
  }

  //adiciona  operador
  save(code_login, nome) {
    var user = JSON.parse(localStorage.getItem('user'))["username"];
    this.RPOFOPCABService.listofcurrentof(code_login).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          if (code_login == user) {
            this.displayDialogutz = true;
            this.utilizador_insere = nome;
          } else {
            this.displayDialog = false;
            this.displayprep = false;
            var rpofop = new RP_OF_OP_CAB;
            var rpofopfunc = new RP_OF_OP_FUNC;
            var estado = [];
            estado.push('C', 'A', 'M');
            this.RPOFOPCABService.getdataof(JSON.parse(localStorage.getItem('id_of_cab')), user, estado).subscribe(
              response => {
                this.id_op_cab_lista = [];
                for (var x in response) {

                  rpofop.id_OF_CAB = response[x][1].id_OF_CAB;

                  this.RPOFOPCABService.create(rpofop).subscribe(
                    res => {
                      var date = new Date();
                      rpofopfunc.id_OP_CAB = res.id_OP_CAB;
                      rpofopfunc.data_INI = new Date(this.formatDate(date));
                      rpofopfunc.data_INI_M1 = new Date(this.formatDate(date));
                      rpofopfunc.data_INI_M2 = new Date(this.formatDate(date));

                      var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                      rpofopfunc.hora_INI = time;
                      rpofopfunc.hora_INI_M1 = time;
                      rpofopfunc.hora_INI_M2 = time;
                      rpofopfunc.id_UTZ_CRIA = code_login;
                      rpofopfunc.nome_UTZ_CRIA = nome;
                      rpofopfunc.perfil_CRIA = "O";
                      rpofopfunc.estado = 'P';//response[x][0].estado;
                      this.RPOPFUNCService.create(rpofopfunc).subscribe(
                        res => {
                          var prep = new RP_OF_PREP_LIN();
                          //var date = new Date();
                          var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                          prep.id_OP_CAB = res.id_OP_CAB;
                          prep.data_INI = new Date(this.formatDate(date));
                          prep.hora_INI = time;
                          prep.data_INI_M1 = new Date(this.formatDate(date));
                          prep.hora_INI_M1 = time;
                          prep.data_INI_M2 = new Date(this.formatDate(date));
                          prep.hora_INI_M2 = time;
                          prep.id_UTZ_CRIA = user;
                          prep.estado = "P";

                          this.RPOFPREPLINService.create(prep).subscribe(
                            res => {
                              this.reset();
                            },
                            error => console.log(error));
                        },
                        error => console.log(error));
                    },
                    error => console.log(error));


                }
                //this.verificar_operadores(this.id_of_cab);
              },
              error => console.log(error));

            /*this.confirmationService.confirm({
              message: 'Pretende adicionar mais um Operador?',
              accept: () => {
                this.displayDialog = true;
              }, reject: () => {
                this.displayDialog = false;
                this.router.navigate(['./home']);
              }
            });*/
          }
        } else {
          this.displayDialogutz_em_uso = true;
          this.utilizador_insere = nome;
        }
      },
      error => console.log(error));
  }

  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
