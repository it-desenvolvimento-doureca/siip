import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild } from '@angular/core';
import { Message, SelectItem } from 'primeng/primeng'
import { ofService } from "app/ofService";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";
import { RP_OF_OP_CAB } from "app/modelos/entidades/RP_OF_OP_CAB";
import { RPOFOPCABService } from "app/modelos/services/rp-of-op-cab.service";
import { RP_OF_OP_LIN } from "app/modelos/entidades/RP_OF_OP_LIN";
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RP_OF_PREP_LIN } from "app/modelos/entidades/RP_OF_PREP_LIN";
import { RPOFPREPLINService } from "app/modelos/services/rp-of-prep-lin.service";
import { Router } from "@angular/router";
import { RPCONFOPService } from "app/modelos/services/rp-conf-op.service";
import { RPCONFOPNPREVService } from "app/modelos/services/rp-conf-op-nprev.service";
import { RPOFDEFLINService } from "app/modelos/services/rp-of-def-lin.service";
import { RP_OF_DEF_LIN } from "app/modelos/entidades/RP_OF_DEF_LIN";
import { RP_OF_OP_FUNC } from "app/modelos/entidades/RP_OF_OP_FUNC";
import { RPOPFUNCService } from "app/modelos/services/rp-op-func.service";
import { RPCONFFAMILIACOMPService } from "app/modelos/services/rp-conf-familia-comp.service";
import { RPOFOUTRODEFLINService } from "app/modelos/services/rp-of-outrodef-lin.service";
import { RP_OF_OUTRODEF_LIN } from "app/modelos/entidades/RP_OF_OUTRODEF_LIN";
import { RP_OF_LST_DEF } from 'app/modelos/entidades/RP_OF_LST_DEF';
import { RPOFLSTDEFService } from 'app/modelos/services/rp-of-lst-def.service';
import { ST_PEDIDOS } from '../entidades/ST_PEDIDOS';
import { STPEDIDOSService } from '../services/st-pedidos.service';

@Component({
    selector: 'app-nova-operacao',
    templateUrl: './nova-operacao.component.html',
    styleUrls: ['./nova-operacao.component.css'],
    animations: [
        trigger('movementtrigger', [
            state('firstpos', style({ transform: 'translateX(0)' })),
            state('secondpos', style({ transform: 'translateX(100%)', display: 'none' })),
            transition('firstpos => secondpos', [
                animate('300ms ease-in')
            ]),
            transition('secondpos => firstpos', [
                animate('300ms ease-out')
            ])
        ])
    ]
})
export class NovaOperacaoComponent implements OnInit {
    impressao_selected = null;
    display_alertaerro;
    mensagem_erro;
    temp_ope_num;
    PROREF;
    lista_impressao;
    sec_num: any;
    display_sem_referencias: boolean;
    fileURL: string;
    msgs: Message[] = [];
    texto_alerta2: string;
    display_alerta2: boolean;
    [x: string]: any;
    sec_des: any;
    perfil_utz: any;
    nome_utz: any;
    username: any;
    display_op_em_curso: boolean = false;
    pessoa_op_em_curso: string;
    op_NUM: any;
    max_num: number;
    OFBQTEINI: any;
    INDNUMENR: any;
    ref_VAR2: any;
    ref_VAR1: any;
    ref_IND: any;
    op_desc: any;
    op_cod: any = [];
    maq_DES: any;
    maq_NUM: any;
    input_class: string;
    display3: boolean = false;
    operacao: SelectItem[];
    maquina: SelectItem[];
    cod_ope = "";
    display: boolean = false;
    display2: boolean = false;
    state: string = 'secondpos';
    adicionaop = true;
    referencias: any[];
    novaopera: any[];
    novaoperacao = "";
    ref_code = "";
    ref_name = "";
    readonly_op: boolean = true;
    readonly_maq: boolean = true;
    num_of = "";
    bt_class = "btn-primary";
    selected = null;
    spinner = false;
    refresh = true;
    observacoes = "";
    selectedmaq = "";
    displaybtref = true;
    single = "";
    //color = "disabletable";
    color = "";
    displayvermais = false;
    display_of_estado = false;
    estado_of = "";
    operacao_temp = [];
    op_PREVISTA = '1';
    MAQ_NUM_ORIG;
    display_campos_obrigatorios = false;
    campo = "";
    seccoes;
    seccao;
    loadingTable: boolean = false;
    campoofdisabled = false;
    display_lista;
    referencia;

    @ViewChild('inputFocous') inputFocous: any;

    constructor(private STPEDIDOSService: STPEDIDOSService, private RPOFLSTDEFService: RPOFLSTDEFService, private RPOFOUTRODEFLINService: RPOFOUTRODEFLINService, private RPCONFFAMILIACOMPService: RPCONFFAMILIACOMPService, private RPOPFUNCService: RPOPFUNCService, private RPOFDEFLINService: RPOFDEFLINService, private RPCONFOPService: RPCONFOPService, private router: Router, private prepservice: RPOFPREPLINService, private RPOFOPLINService: RPOFOPLINService, private RPOFOPCABService: RPOFOPCABService, private service: ofService, private op_service: RPCONFOPNPREVService, private RPOFCABService: RPOFCABService) {
        this.operacao = [];

    }

    ngOnInit() {

        this.inputFocous.nativeElement.focus();
        this.referencias = [];
        this.username = JSON.parse(localStorage.getItem('user'))["username"];
        this.nome_utz = JSON.parse(localStorage.getItem('user'))["name"];
        this.perfil_utz = JSON.parse(localStorage.getItem('perfil'));
        this.novaopera = [];
        this.op_service.getAll().subscribe(
            response => {
                for (var x in response) {

                    this.novaopera.push({ OPECOD: response[x].id_OP.trim(), OPEDES: response[x].nome_OP.trim(), SECNUMENR1: response[x].secnumenr1_OP.trim() });
                }
                this.novaopera = this.novaopera.slice();
            },
            error => console.log(error));

        this.seccoes = [];
        this.service.getSeccao().subscribe(
            response => {
                this.seccoes.push({ label: "Seleccionar Secção", value: null });
                for (var x in response) {

                    this.seccoes.push({ label: response[x].SECCOD + " - " + response[x].SECLIB + " - " + response[x].SECNUMINT, value: { SECLIB: response[x].SECLIB, SECCOD: response[x].SECCOD } });
                }
                this.seccoes = this.seccoes.slice();
            },
            error => console.log(error));

    }

    //verificar se existe a OF
    pesquisaof() {
        this.bt_class = "btn-primary";
        this.refresh = false;
        this.spinner = true;
        this.referencias = [];
        this.maquina = [];
        this.displaybtref = true;
        this.input_class = "";
        this.selected = "";
        this.selectedmaq = "";
        this.observacoes = "";
        this.campoofdisabled = true;
        if (this.num_of != "") {
            this.service.getOF(this.num_of).subscribe(
                response => {
                    this.operacao = [];
                    this.readonly_op = true;
                    this.readonly_maq = true;
                    var first = true;
                    var count = Object.keys(response).length;
                    //se existir uma of vai preencher combobox operações e tabela referencias
                    if (count > 0) {
                        if (response[0].OFETAT != 3 && response[0].OFETAT != 4) {
                            this.observacoes = response[0].ofref;
                            //preenche tabela referencias
                            this.service.getRef(response[0].ofanumenr).subscribe(
                                response2 => {
                                    this.loadingTable = true;
                                    this.referencias = [];
                                    var referencias = [];
                                    for (var x in response2) {
                                        var perc = 0;
                                        if (response2[x].ZPAVAL != null) {
                                            perc = parseFloat(String(response2[x].ZPAVAL).replace(",", "."));
                                        }
                                        referencias.push({ tipo_PECAorder: "PF", tipo_PECA: response2[x].PROTYPCOD, PROQTEFMT: response2[x].PROQTEFMT, GESCOD: response2[x].GESCOD, perc_obj: perc, codigo: response2[x].PROREF, design: response2[x].PRODES1 + " " + response2[x].PRODES2, var1: response2[x].VA1REF, var2: response2[x].VA2REF, INDREF: response2[x].INDREF, OFBQTEINI: parseFloat(response2[x].OFBQTEINI).toFixed(0), INDNUMENR: response2[x].INDNUMENR, tipo: "PF", comp: false });
                                        //verifica familia
                                        this.veirificafam(response2[x].PRDFAMCOD, response2[x].PROREF, null, referencias, response[0].ofanumenr);
                                    }
                                    this.referencias = referencias.slice();
                                },
                                error => {
                                    console.log(error);
                                    this.loadingTable = false;
                                });

                            //preenche comobobox operações
                            this.service.getOP(response[0].ofanumenr).subscribe(
                                response1 => {
                                    this.operacao = [];
                                    for (var x in response1) {
                                        if (first) this.operacao.push({ label: "Seleccione a Operação", value: 0 });
                                        first = false;
                                        this.operacao.push({ label: response1[x].OPENUM + "/" + response1[x].OPECOD + "/" + response1[x].OPEDES, value: { op_PREVISTA: '1', OPENUM: response1[x].OPENUM, OPECOD: response1[x].OPECOD, OPEDES: response1[x].OPEDES, SECNUMENR1: response1[x].SECNUMENR1 } });
                                        this.max_num = response1[x].OPENUM;
                                    }
                                    this.readonly_op = false;
                                    this.selected = "";
                                },
                                error => {
                                    console.log(error)
                                    if (error.status == 0) {
                                        //alert("Conexão com o Servidor Perdida!");
                                        this.texto_alerta2 = "Conexão com o Servidor Perdida!";
                                        this.display_alerta2 = true;
                                    }
                                    this.campoofdisabled = false;
                                });
                        } else {
                            this.display_of_estado = true;
                            this.estado_of = "";
                            if (response[0].OFETAT == 3) {
                                this.estado_of = "está Suspensa!";
                            } else {
                                this.estado_of = "está Fechada!";
                            }
                            this.campoofdisabled = false;
                        }
                    } else {
                        this.bt_class = "btn-danger";
                        this.estado_of = "não existe!";
                        this.display_of_estado = true;
                        this.campoofdisabled = false;
                    }
                    this.refresh = true;
                    this.spinner = false;

                },
                error => console.log(error));
        } else {
            this.input_class = "input_class";
            this.bt_class = "btn-danger";
            this.refresh = true;
            this.spinner = false;
            this.campoofdisabled = false;
        }

    }

    //apagar of
    apagardados() {
        this.num_of = "";
        this.bt_class = "btn-primary";
        this.refresh = true;
        this.spinner = false;
        this.referencias = [];
        this.readonly_op = true;
        this.readonly_maq = true;
        this.operacao = [];
        this.maquina = [];
        this.displaybtref = true;
        this.input_class = "";
        this.selected = "";
        this.selectedmaq = "";
        this.observacoes = "";
        this.campoofdisabled = false;
        this.inputFocous.nativeElement.focus();
    }
    //fechar popup estado of
    cancelar_displayof() {
        this.display_of_estado = false;
    }

    //verifica FAM
    veirificafam(codfam, ref, response = null, referencias, OFANUMENR = null) {
        if (codfam != "" && codfam != null) {
            this.RPCONFFAMILIACOMPService.getcodfam(codfam).subscribe(
                response1 => {
                    var count1 = Object.keys(response1).length;
                    if (count1 > 0) {
                        if (response != null) {
                            var perc = null;
                            if (response.ZPAVAL != null) {
                                perc = parseFloat(String(response.ZPAVAL).replace(",", "."));
                            }
                            if (!this.referencias.find(item => item.codigo == response.PROREF)) referencias.push({ tipo_PECAorder: (response.PROTYPCOD == "COM") ? "COM" : "COMP", tipo_PECA: response.PROTYPCOD, PROQTEFMT: response.PROQTEFMT, GESCOD: response.GESCOD, perc_obj: perc, codigo: response.PROREF, design: response.PRODES1 + " " + response.PRODES2, var1: null, var2: null, INDREF: null, OFBQTEINI: null, INDNUMENR: null, tipo: "COMP", comp: true });

                            this.referencias = referencias.slice();
                            this.referencias.sort(this.compareFunction2);
                            this.referencias.sort(this.compareFunction);
                        }
                        if (OFANUMENR != null) {
                            this.get_filhosprimeiro(OFANUMENR, referencias);
                        } else {
                            // this.get_filhos(ref, referencias);
                            this.loadingTable = false;
                        }
                    } else {
                        this.loadingTable = false;
                    }
                },
                error => { console.log(error); this.loadingTable = false; });
        } else if (response.PROTYPCOD == "COM") {
            var perc = null;
            if (response.ZPAVAL != null) {
                perc = parseFloat(String(response.ZPAVAL).replace(",", "."));
            }
            if (!this.referencias.find(item => item.codigo == response.PROREF)) referencias.push({ tipo_PECAorder: (response.PROTYPCOD == "COM") ? "COM" : "COMP", tipo_PECA: response.PROTYPCOD, PROQTEFMT: response.PROQTEFMT, GESCOD: response.GESCOD, perc_obj: perc, codigo: response.PROREF, design: response.PRODES1 + " " + response.PRODES2, var1: null, var2: null, INDREF: null, OFBQTEINI: null, INDNUMENR: null, tipo: "COMP", comp: true });


            this.referencias = referencias.slice();
            this.referencias.sort(this.compareFunction2);
            this.referencias.sort(this.compareFunction);
            this.loadingTable = false;
        } else {
            this.loadingTable = false;
        }

    }

    compareFunction(a, b) {
        if (a.tipo_PECAorder > b.tipo_PECAorder) {
            return -1;
        }
        if (a.tipo_PECAorder < b.tipo_PECAorder) {
            return 1;
        }
        return 0;
    }

    compareFunction2(a, b) {
        if (a.codigo > b.codigo) {
            return 1;
        }
        if (a.codigo < b.codigo) {
            return -1;
        }
        return 0;
    }

    //pesquisar componentes
    get_filhosprimeiro(OFANUMENR, referencias) {
        this.service.getfilhosprimeiro(OFANUMENR).subscribe(
            response1 => {
                var count1 = Object.keys(response1).length;
                if (count1 > 0) {
                    for (var x in response1) {
                        this.veirificafam(response1[x].PRDFAMCOD, response1[x].PROREF, response1[x], referencias);
                    }
                } else {
                    this.loadingTable = false;
                }
            },
            error => { console.log(error); this.loadingTable = false; });
    }

    //pesquisar componentes
    get_filhos(ref, referencias) {
        this.service.getfilhos(ref).subscribe(
            response1 => {
                var count1 = Object.keys(response1).length;
                if (count1 > 0) {
                    for (var x in response1) {
                        this.veirificafam(response1[x].PRDFAMCOD, response1[x].PROREFCST, response1[x], referencias);
                    }
                } else {
                    this.loadingTable = false;
                }
            },
            error => { console.log(error); this.loadingTable = false; });
    }

    //Seleccionar uma referência da Tabela Referência
    onRowSelect(event) {
        this.ref_code = event.data.codigo;
        this.ref_name = event.data.design;
        this.ref_IND = event.data.INDREF;
        this.ref_VAR1 = event.data.var1;
        this.ref_VAR2 = event.data.var2;
        this.INDNUMENR = event.data.INDNUMENR;
        this.OFBQTEINI = event.data.OFBQTEINI;

        if (this.num_of != "" && this.selected != "" && this.selectedmaq != "") {
            this.display2 = true;
        }

    }

    //fechar popup que abre depois de clicar em "SELECIONAR SÓ 1 REFERÊNCIA"
    cancelar() {
        this.display2 = false;
    }

    //fechar popup que abre depois de clicar em "Iniciar Trabalho"
    cancelarinic() {
        this.display3 = false;
    }

    //ao alterar a operação preenche SelectItem das maquinas
    carregamaquinas(event, openum = null, op_prev = null) {
        this.op_PREVISTA = event.op_PREVISTA;
        this.selectedmaq = null;
        this.seccao = null;
        if (this.op_PREVISTA != '2') {
            this.op_cod = [];
            if (event != 0) {
                var ope_num;
                if (openum != null) {
                    ope_num = openum;
                    this.op_PREVISTA = op_prev;
                } else {
                    ope_num = event.OPENUM;
                    this.op_PREVISTA = event.op_PREVISTA;
                }
                for (var x in this.operacao) {
                    if (this.operacao[x].value.OPENUM <= ope_num && this.operacao[x].value.OPECOD != "") {
                        if (this.op_cod.indexOf(this.operacao[x].value.OPECOD) == -1) {
                            this.op_cod.push(this.operacao[x].value.OPECOD);
                        }
                    }
                }
                this.op_desc = event.OPEDES;
                this.op_NUM = ope_num;
                this.service.getMaq(event.SECNUMENR1).subscribe(
                    response => {
                        this.maquina = [];
                        this.readonly_maq = true;
                        var find = false;
                        for (var x in response) {
                            if (response[x].SECTYP == "2") {
                                this.maquina.push({ label: response[x].ssecod + "/" + response[x].SSEDES, value: { code: response[x].ssecod, desc: response[x].SSEDES } });
                                find = true;
                                this.maq_DES = response[x].SSEDES;
                                this.maq_NUM = response[x].ssecod;
                                this.MAQ_NUM_ORIG = response[x].ssecod;
                                this.selectedmaq = response[x].ssecod;
                                this.sec_des = response[x].SECLIB;
                                this.sec_num = response[x].SECCOD;
                            } else if (response[x].SECTYP == "1") {
                                this.selectedmaq = response[x].ssecod;
                                this.maq_DES = response[x].SSEDES;
                                this.maq_NUM = response[x].ssecod;
                                this.MAQ_NUM_ORIG = response[x].ssecod;
                                this.sec_des = response[x].SECLIB;
                                this.sec_num = response[x].SECCOD;

                            } else {
                                find = true;
                            }
                        }
                        //lista todas as maquinas se op. não utilizar mão de obra
                        if (!find) {
                            this.service.getAllMaq(response[0].SECCOD).subscribe(
                                response3 => {
                                    this.readonly_maq = true;

                                    for (var x in response3) {
                                        if (response3[x].ssecod != "000")
                                            this.maquina.push({ label: response3[x].ssecod + "/" + response3[x].SSEDES, value: { code: response3[x].ssecod, desc: response3[x].SSEDES } });
                                    }
                                    this.maquina = this.maquina.slice();
                                    this.selectedmaq = this.maquina.find(item => item.value.code === this.selectedmaq).value;
                                    if (this.maquina.length > 0) {
                                        this.readonly_maq = false;
                                    }
                                },
                                error => console.log(error));
                        }
                        if (this.maquina.length > 0) {
                            this.readonly_maq = false;
                        }
                    },
                    error => console.log(error));
            } else {
                this.maquina = [];
                this.readonly_maq = true;
            }
        } else {
            this.temp_ope_num = event.OPENUM;
            this.op_NUM = event.OPENUM;
            this.op_desc = event.OPEDES;

            this.op_cod = [];
            this.maquina = [];
            this.readonly_maq = true;
        }
    }

    //ao escolher uma secção
    carregamaquiOP_NAO_PREVISTA(event) {
        this.maquina = [];
        var ope_num = this.temp_ope_num;
        this.selectedmaq = null;
        if (event != null) {
            for (var x in this.operacao) {
                if (this.operacao[x].value.OPENUM <= ope_num && this.operacao[x].value.OPECOD != "") {
                    if (this.op_cod.indexOf(this.operacao[x].value.OPECOD) == -1) {
                        this.op_cod.push(this.operacao[x].value.OPECOD);
                    }
                }
            }

            this.service.getOPTIPO(this.selected.OPECOD).subscribe(
                resp => {
                    this.sec_des = event.SECLIB;
                    this.sec_num = event.SECCOD;
                    var find = true;
                    this.maquina = [];
                    for (var x in resp) {
                        if (resp[x].SECTYP == "2") {
                            this.maquina.push({ label: resp[x].SSECOD + "/" + resp[x].SSEDES, value: { code: resp[x].SSECOD, desc: resp[x].SSEDES } });
                            find = true;
                            this.maq_DES = resp[x].SSEDES;
                            this.maq_NUM = resp[x].SSECOD;
                            this.MAQ_NUM_ORIG = resp[x].SSECOD;
                            this.selectedmaq = resp[x].SSECOD;

                        } else if (resp[x].SECTYP == "1") {
                            find = false;
                        }
                    }
                    //lista todas as maquinas se op. não utilizar mão de obra
                    if (!find) {
                        this.service.getAllMaq(event.SECCOD).subscribe(
                            response3 => {
                                this.readonly_maq = true;
                                this.maquina.push({ label: "Seleccionar Máquina", value: null });
                                for (var x in response3) {
                                    if (response3[x].ssecod != "000")
                                        this.maquina.push({ label: response3[x].ssecod + "/" + response3[x].SSEDES, value: { code: response3[x].ssecod, desc: response3[x].SSEDES } });
                                }
                                this.maquina = this.maquina.slice();
                                this.selectedmaq = null;
                                if (this.maquina.length > 0) {
                                    this.readonly_maq = false;
                                }
                            },
                            error => console.log(error));
                    }
                    if (this.maquina.length > 0) {
                        this.readonly_maq = false;
                    }
                },
                error => console.log(error));
        }
    }

    //ao clicar no botão +, mostra tabela com mais operações
    togglestates() {
        this.state = (this.state === 'firstpos' ? 'secondpos' : 'firstpos');
        this.adicionaop = true;
    }

    //esconde a tabela
    ontogglestates() {
        if (this.adicionaop == false) {
            this.state = 'secondpos';
            this.adicionaop = true;
        } else {
            this.adicionaop = false;
        }
    }

    //ao seleccionar uma nova operação da tabela, é adicionada ao SelectItem maquina
    onRowSelect3(event) {
        var OPENUM = this.max_num * 1 + 10 * 1;
        this.state = 'secondpos';
        if (!this.operacao.find(item => item.value.OPECOD === event.data.OPECOD && item.value.OPENUM === OPENUM)) {
            this.operacao.push({ label: OPENUM + "/" + event.data.OPECOD + "/" + event.data.OPEDES, value: { OPEDES: event.data.OPEDES, op_PREVISTA: '2', OPENUM: OPENUM, OPECOD: event.data.OPECOD, SECNUMENR1: event.data.SECNUMENR1 } });
            this.selected = this.operacao[this.operacao.length - 1].value;
        } else {
            this.selected = this.operacao.find(item => item.value.OPECOD === event.data.OPECOD && item.value.OPENUM === OPENUM).value;
        }
        this.op_NUM = this.selected.OPENUM;
        this.op_desc = this.selected.OPEDES;

        this.temp_ope_num = OPENUM;
        this.op_cod = [];
        this.maquina = [];
        this.readonly_maq = true;
        this.op_PREVISTA = '2';
        this.seccao = null;
        //this.carregamaquinas(event.data, OPENUM, '2');
    }

    //Quando o botão "Seleccionar só 1 referencia" pode seleccionar uma ref da tabela
    seleciona1ref() {
        this.color = "";
        this.single = "single";
    }

    //Quando clica no botão inciar trabalho

    iniciartrab() {
        if (this.num_of != "" && this.selected != "" && this.selectedmaq != "" && this.selectedmaq != null && (this.op_PREVISTA == '1'
            || (this.seccao != null && this.op_PREVISTA == '2')) && !this.loadingTable) {
            if (this.referencias.length == 0) {
                this.display_sem_referencias = true;
            } else {
                //verifica se existe alguma of com a mesma operação em execução 
                this.RPOFCABService.verifica(this.num_of, this.op_cod, this.op_NUM, this.username).subscribe(
                    response => {
                        var c = Object.keys(response).length;
                        //console.log(response)
                        //se existir e não for mão de obra
                        if (c > 0 && response[0][1] > 0) {
                            this.pessoa_op_em_curso = "Não é possível iniciar trabalho, utilizador tem um trabalho a decorrer!";
                            this.display_op_em_curso = true;
                        } else {
                            if (c > 0 && this.MAQ_NUM_ORIG != "000") {
                                if (response[0][0].estado == "P") {
                                    this.pessoa_op_em_curso = "Não é possível iniciar trabalho porque o utilizador " + response[0][0].id_UTZ_CRIA + " - " + response[0][0].nome_UTZ_CRIA + " está em Preparação desse trabalho.";
                                } else if (response[0][0].estado == "E") {
                                    this.pessoa_op_em_curso = "Não é possível iniciar trabalho porque já se encontra em Execução! Solicite a " + response[0][0].id_UTZ_CRIA + " - " + response[0][0].nome_UTZ_CRIA + " que o(a) adicione à operação.";
                                }

                                this.display_op_em_curso = true;
                            } else {
                                this.display3 = true;
                            }
                        }
                    },
                    error => console.log(error));
            }
        } else {
            if (this.selected == null || this.selected == 0) {
                this.campo = "Operação";
            } else if (this.seccao == null && this.op_PREVISTA == '2') {
                this.campo = "Secção";
            } else if (this.selectedmaq == null || this.selectedmaq == "") {
                this.campo = "Máquina";
            } else if (this.loadingTable) {
                this.campo = "Referências (aguarde que sejam todas carregadas)";
            }

            this.display_campos_obrigatorios = true;
        }
    }

    fechar() {
        this.display_op_em_curso = false;
    }

    //carregar todas as operações não previstas
    carregarmais() {
        this.novaopera = [];
        this.displayvermais = true;
        this.service.getAllOP().subscribe(
            response => {
                for (var x in response) {

                    this.novaopera.push({ OPECOD: response[x].OPECOD, OPEDES: response[x].OPEDES, SECNUMENR1: response[x].SECNUMENR1 });
                }
                this.novaopera = this.novaopera.slice();
            },
            error => console.log(error));
    }
    //daddosmaquina
    maquinadados(event) {
        this.maq_DES = event.value.desc;
        this.maq_NUM = event.value.code;
        if (this.op_PREVISTA == '2') { this.MAQ_NUM_ORIG = event.value.code; }
    }

    //criar cabeçalho OF
    criar(estado, ref_select) {
        this.router.navigate(['./home']);
        var rpof = new RP_OF_CAB;
        rpof.data_HORA_CRIA = new Date();
        rpof.estado = estado;
        rpof.of_NUM = this.num_of;
        rpof.op_COD = this.op_cod.toString();
        if (this.op_PREVISTA == '1') {
            rpof.op_NUM = this.op_NUM;
        }
        rpof.op_DES = this.op_desc;
        rpof.maq_NUM = this.maq_NUM;
        rpof.maq_NUM_ORIG = this.MAQ_NUM_ORIG;
        rpof.maq_DES = this.maq_DES;
        rpof.id_UTZ_CRIA = this.username
        rpof.nome_UTZ_CRIA = this.nome_utz;
        rpof.of_OBS = this.observacoes;
        rpof.sec_DES = this.sec_des;
        rpof.sec_NUM = this.sec_num;
        rpof.versao_MODIF = 0;
        rpof.op_PREVISTA = this.op_PREVISTA;
        rpof.op_COD_ORIGEM = this.selected['OPECOD'];

        this.RPOFCABService.create(rpof).subscribe(
            res => {
                this.criatabelaRPOFOPCAB(res.id_OF_CAB, estado, false);
                this.criatabelacomp(res.id_OF_CAB, estado);
            },
            error => console.log(error));
    }

    //criar RP_OF_CAB para os componentes
    criatabelacomp(id, estado) {
        var opnum = 1010;
        for (var x in this.referencias) {
            if (this.referencias[x].tipo == "COMP") {
                var rpof = new RP_OF_CAB;
                rpof.data_HORA_CRIA = new Date();
                rpof.estado = estado;
                rpof.id_OF_CAB_ORIGEM = id;
                rpof.of_NUM = null;
                rpof.op_COD = '60';
                rpof.op_NUM = '';// + opnum;
                rpof.op_DES = null;
                rpof.maq_NUM = '000';
                rpof.maq_NUM_ORIG = '000';
                rpof.maq_DES = 'MÃO DE OBRA';
                rpof.id_UTZ_CRIA = this.username
                rpof.nome_UTZ_CRIA = this.nome_utz;
                rpof.of_OBS = null;
                rpof.versao_MODIF = 0;
                rpof.sec_DES = this.sec_des;
                rpof.sec_NUM = this.sec_num;
                rpof.op_PREVISTA = "2";
                rpof.op_COD_ORIGEM = '60';

                this.createRPOFCABComp(rpof, estado, this.referencias[x].codigo)

                //opnum = opnum + 10;
            }
        }
    }

    createRPOFCABComp(rpof, estado, ref) {

        this.RPOFCABService.create(rpof).subscribe(
            res => {
                this.criatabelaRPOFOPCAB(res.id_OF_CAB, estado, true, ref);
            },
            error => console.log(error));
    }

    //criar cabeçalho Operação OF
    criatabelaRPOFOPCAB(id_OF_CAB, estado, comp, ref = null) {

        var rpofopcab = new RP_OF_OP_CAB;
        rpofopcab.id_OF_CAB = id_OF_CAB;
        this.RPOFOPCABService.create(rpofopcab).subscribe(
            res => {

                if (comp) {
                    this.criatabelaRPOFOPLIN(res.id_OP_CAB, comp, ref);
                } else {
                    this.criartabelaRPOPFUNC(res.id_OP_CAB, estado, comp);
                    this.criatabelaRPOFOPLIN(res.id_OP_CAB, comp, ref);
                }
            },
            error => console.log(error));


    }

    criartabelaRPOPFUNC(id_OP_CAB, estado, comp) {
        var rpofop = new RP_OF_OP_FUNC;

        rpofop.id_OP_CAB = id_OP_CAB;
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        rpofop.data_INI = new Date(this.formatDate(date));
        rpofop.hora_INI = time;

        rpofop.data_INI_M1 = new Date(this.formatDate(date));
        rpofop.hora_INI_M1 = time;
        rpofop.data_INI_M2 = new Date(this.formatDate(date));
        rpofop.hora_INI_M2 = time;

        rpofop.id_UTZ_CRIA = this.username
        rpofop.nome_UTZ_CRIA = this.nome_utz;
        rpofop.perfil_CRIA = this.perfil_utz;
        rpofop.estado = estado;
        this.RPOPFUNCService.create(rpofop).subscribe(
            res => {

                if (estado == "P" && !comp) {
                    this.iniciapreparacao(res.id_OP_CAB, date);
                }
            },
            error => console.log(error));

    }

    //Adiciona referências seleccionadas
    criatabelaRPOFOPLIN(id_OP_CAB, comp, ref) {

        if (comp) {
            var ref = this.referencias.find(item => item.codigo == ref);
            var rpofoplin = new RP_OF_OP_LIN;
            rpofoplin.id_OP_CAB = id_OP_CAB;
            rpofoplin.proqtefmt = (ref.PROQTEFMT == "1") ? true : false;
            rpofoplin.tipo_PECA = ref.tipo_PECA;
            rpofoplin.ref_NUM = ref.codigo;
            rpofoplin.ref_DES = ref.design;
            rpofoplin.ref_IND = ref.INDREF;
            rpofoplin.ref_VAR1 = ref.var1;
            rpofoplin.ref_VAR2 = ref.var2;
            rpofoplin.quant_BOAS_TOTAL = 0;
            rpofoplin.quant_DEF_TOTAL = 0;
            rpofoplin.quant_BOAS_TOTAL_M1 = 0;
            rpofoplin.quant_DEF_TOTAL_M1 = 0;
            rpofoplin.quant_BOAS_TOTAL_M2 = 0;
            rpofoplin.quant_DEF_TOTAL_M2 = 0;
            rpofoplin.quant_OF = parseInt(this.referencias[0].OFBQTEINI);
            rpofoplin.perc_OBJETIV = ref.perc_obj;
            rpofoplin.ref_INDNUMENR = ref.INDNUMENR;
            rpofoplin.gescod = ref.GESCOD;
            this.insereref(rpofoplin, true);
        } else {
            for (var x in this.referencias) {
                if (this.referencias[x].tipo == "PF") {
                    var rpofoplin = new RP_OF_OP_LIN;
                    rpofoplin.id_OP_CAB = id_OP_CAB;
                    rpofoplin.ref_NUM = this.referencias[x].codigo;
                    rpofoplin.ref_DES = this.referencias[x].design;
                    rpofoplin.ref_IND = this.referencias[x].INDREF;
                    rpofoplin.ref_VAR1 = this.referencias[x].var1;
                    rpofoplin.ref_VAR2 = this.referencias[x].var2;
                    rpofoplin.quant_BOAS_TOTAL = 0;
                    rpofoplin.quant_DEF_TOTAL = 0;
                    rpofoplin.proqtefmt = (this.referencias[x].PROQTEFMT == "1") ? true : false;
                    rpofoplin.tipo_PECA = this.referencias[x].tipo_PECA;
                    rpofoplin.quant_BOAS_TOTAL_M1 = 0;
                    rpofoplin.quant_DEF_TOTAL_M1 = 0;
                    rpofoplin.quant_BOAS_TOTAL_M2 = 0;
                    rpofoplin.quant_DEF_TOTAL_M2 = 0;
                    rpofoplin.perc_OBJETIV = this.referencias[x].perc_obj;
                    rpofoplin.ref_INDNUMENR = this.referencias[x].INDNUMENR;
                    rpofoplin.quant_OF = parseInt(this.referencias[x].OFBQTEINI);

                    rpofoplin.gescod = this.referencias[x].GESCOD;
                    this.insereref(rpofoplin, false);
                }
            }
        }

    }

    insereref(rpofoplin, comp) {
        this.RPOFOPLINService.create(rpofoplin).subscribe(
            res => {
                if (!comp) {
                    this.deftoref(res.id_OP_LIN);
                    this.cria_RP_OF_OUTRODEF_LIN(res.id_OP_LIN, 1);
                    this.cria_RP_OF_OUTRODEF_LIN(res.id_OP_LIN, 2);
                    this.cria_RP_OF_OUTRODEF_LIN(res.id_OP_LIN, 3);
                    this.cria_RP_OF_OUTRODEF_LIN(res.id_OP_LIN, 4);
                }
            },
            error => console.log(error));
    }

    cria_RP_OF_OUTRODEF_LIN(id, id_outro) {
        var data = new RP_OF_OUTRODEF_LIN;
        data.id_OP_LIN = id;
        data.id_UTZ_CRIA = this.username;
        data.id_DEF_OUTRO = id_outro;
        this.RPOFOUTRODEFLINService.create(data).subscribe(
            res => {

            },
            error => console.log(error));
    }

    //cria tabela preparação
    iniciapreparacao(id_OP_CAB, date) {
        var prep = new RP_OF_PREP_LIN();
        //var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        prep.id_OP_CAB = id_OP_CAB;
        prep.data_INI = new Date(this.formatDate(date));
        prep.hora_INI = time;
        prep.data_INI_M1 = new Date(this.formatDate(date));
        prep.hora_INI_M1 = time;
        prep.data_INI_M2 = new Date(this.formatDate(date));
        prep.hora_INI_M2 = time;
        prep.id_UTZ_CRIA = this.username
        prep.estado = "P";

        this.prepservice.create(prep).subscribe(
            res => {
            },
            error => console.log(error));
    }

    //adicionar lista de defeitos às referencias
    //id= id operação 
    deftoref(id_OP_LIN) {
        var op_cod = [];
        for (var x in this.op_cod) {
            // this.famassociadas(id_OP_LIN, this.op_cod[x]);
            op_cod.push(this.op_cod[x]);
        }
        this.famassociadas(id_OP_LIN, op_cod);

    }

    //pesquisa as familias ligadas à operação
    famassociadas(id_OP_LIN, op_cod) {

        this.RPCONFOPService.getAllbyid(op_cod).subscribe(
            res => {
                var count1 = Object.keys(res).length;
                if (count1 > 0) {
                    //adicionar a lista de defeitos a partir da lista de familias
                    for (var x in res) {
                        this.getdefeitosop(res, x, id_OP_LIN);
                    }
                }

                //adicionar a própria lista de defeitos da operação
                /*   this.service.defeitos(this.op_cod).subscribe(
                       result => {
                           console.log(result);
                           var count = Object.keys(result).length;
                            if (count > 0) {
                                //inserir em RP_OF_DEF_LIN
                                for (var x in result) {
                                    var def = new RP_OF_DEF_LIN();
                                    def.cod_DEF = result[x].QUACOD;
                                    def.desc_DEF = result[x].QUALIB;
                                    def.id_OP_LIN = id_OP_LIN;
                                    def.id_UTZ_CRIA =  this.username
                                    def.quant_DEF = 0;
                                    def.data_HORA_REG = new Date();
                                    this.RPOFDEFLINService.create(def);
                                }
                            }
                       },
                       error => console.log(error));*/
            },
            error => console.log(error));
    }

    onRowUnselect(event) {

    }

    getdefeitosop(res, x, id_OP_LIN) {
        if (!this.operacao_temp[id_OP_LIN]) this.operacao_temp[id_OP_LIN] = [];
        if (this.operacao_temp[id_OP_LIN].indexOf(res[x].id_OP_SEC) == -1) {
            this.operacao_temp[id_OP_LIN].push(res[x].id_OP_SEC);
            this.service.defeitos(res[x].id_OP_SEC.trim()).subscribe(
                result => {
                    var count = Object.keys(result).length;
                    if (count > 0) {
                        //inserir em RP_OF_LST_DEF
                        for (var y in result) {
                            if (result[y].QUACOD.substring(2, 4) != '00') {
                                var def = new RP_OF_LST_DEF();
                                def.cod_DEF = result[y].QUACOD;
                                def.desc_DEF = result[y].QUALIB;
                                def.id_OP_LIN = id_OP_LIN;
                                def.id_UTZ_CRIA = this.username
                                def.data_HORA_MODIF = new Date();
                                this.RPOFLSTDEFService.create(def).subscribe(resp => {
                                });
                            }
                        }
                    }
                },
                error => {
                    console.log(error)
                    /* if (error.status == 0) {
                         this.getdefeitosop(res, x, id_OP_LIN);
                     }*/
                });
        }
    }

    lookupRowStyleClass(rowData) {
        return !rowData.comp ? 'disabled-account-row' : '';
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

    abrirlista(ref, design) {
        this.impressao_selected = [];
        this.PROREF = ref;
        this.referencia = ref + "-" + design;
        this.lista_impressao = [];
        this.service.consulta_Impressao(ref).subscribe(result => {
            var countx = Object.keys(result).length;

            if (countx > 0) {
                for (var x in result) {
                    this.lista_impressao.push({
                        ARMAZEM: result[x].ARMAZEM,
                        DATA: result[x].DATA,
                        DESREF: result[x].DESREF,
                        LOCAL: result[x].LOCAL,
                        LOTE: result[x].LOTE,
                        NUMETIQ: result[x].NUMETIQ,
                        QUANT: result[x].QUANT,
                        REF: result[x].REF
                    })
                }
            }
            this.lista_impressao = this.lista_impressao.slice();
            this.display_lista = true;

        }, error => {
            console.log(error);
            this.display_lista = true;
        });
    }

    informa_armazem() {
        if (this.impressao_selected.length == 0) {
            this.display_alertaerro = true;
            this.mensagem_erro = "Seleccione um linha!";
        } else {
            //console.log(this.impressao_selected)
            if (this.selected == null || this.selected == 0) {

                this.campo = "Operação";

                this.display_campos_obrigatorios = true;
            } else {


                this.msgs = [];
                for (var x in this.impressao_selected) {
                    var linha = new ST_PEDIDOS;
                    linha.armazem = this.impressao_selected[x].ARMAZEM;
                    linha.local = this.impressao_selected[x].LOCAL;
                    linha.data_CRIA = new Date();
                    linha.utz_CRIA = this.username;
                    linha.proref = this.impressao_selected[x].REF;
                    linha.descricao = this.impressao_selected[x].DESREF;
                    linha.lote = this.impressao_selected[x].LOTE;
                    linha.etqnum = this.impressao_selected[x].NUMETIQ;
                    linha.quant = (this.impressao_selected[x].QUANT) * 1;

                    linha.ip_POSTO = this.getCookie("IP_CLIENT");
                    linha.cod_SECTOR_OF = this.sec_num;
                    linha.des_SECTOR_OF = this.sec_des;
                    //console.log(linha)
                    this.insertPEDIDO(linha);
                }
                this.display_lista = false;
            }
        }
    }


    imprimir() {

        var filename = new Date().toLocaleString().replace(/\D/g, '');
        this.service.downloadPDF("pdf", filename, this.PROREF, "consulta_FIFOS").subscribe(
            (res) => {
                this.fileURL = URL.createObjectURL(res);
                //this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL); ´

                this.service.getIMPRESORA(this.getCookie("IP_CLIENT")).subscribe(
                    (res2) => {

                        var count = Object.keys(res2).length;

                        if (count > 0 && res2[0][3] != "" && res2[0][3] != null) {
                            this.service.imprimir(filename, res2[0][3]).subscribe(
                                response => {
                                    //enviado para impressora
                                }, error => {
                                    //console.log(error.status);

                                    console.log(error._body);
                                });

                        } else {
                            var iframe;
                            if (!iframe) {
                                iframe = document.createElement('iframe');
                                document.body.appendChild(iframe);

                                iframe.style.display = 'none';
                                iframe.onload = function () {
                                    setTimeout(function () {
                                        iframe.focus();
                                        iframe.contentWindow.print();
                                    }, 1);
                                };
                            }
                            iframe.src = this.fileURL;
                        }
                    }, error => console.log(error));
            }
        );
    }

    //ver cookies
    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    insertPEDIDO(linha) {
        this.STPEDIDOSService.create(linha).subscribe(
            res => {
                this.msgs.push({ severity: 'success', summary: 'Info', detail: 'Armazém Informado. Ref.: ' + linha.proref });
            }, error => {
                this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Erro ao Informar Armazém. Ref.: ' + linha.proref });
            });
    }

}
