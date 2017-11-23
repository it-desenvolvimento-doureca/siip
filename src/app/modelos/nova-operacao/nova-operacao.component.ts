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
    selected = "";
    spinner = false;
    refresh = true;
    observacoes = "";
    selectedmaq = "";
    displaybtref = true;
    single = "";
    color = "disabletable";
    displayvermais = false;
    display_of_estado = false;
    estado_of = "";
    operacao_temp = [];
    op_PREVISTA = '1';
    @ViewChild('inputFocous') inputFocous: any;

    constructor(private RPOFLSTDEFService: RPOFLSTDEFService, private RPOFOUTRODEFLINService: RPOFOUTRODEFLINService, private RPCONFFAMILIACOMPService: RPCONFFAMILIACOMPService, private RPOPFUNCService: RPOPFUNCService, private RPOFDEFLINService: RPOFDEFLINService, private RPCONFOPService: RPCONFOPService, private router: Router, private prepservice: RPOFPREPLINService, private RPOFOPLINService: RPOFOPLINService, private RPOFOPCABService: RPOFOPCABService, private service: ofService, private op_service: RPCONFOPNPREVService, private RPOFCABService: RPOFCABService) {
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
                                    this.referencias = [];
                                    for (var x in response2) {
                                        this.referencias.push({ perc_obj: response2[x].ZPAVAL, codigo: response2[x].PROREF, design: response2[x].PRODES1 + " " + response2[x].PRODES2, var1: response2[x].VA1REF, var2: response2[x].VA2REF, INDREF: response2[x].INDREF, OFBQTEINI: parseFloat(response2[x].OFBQTEINI).toFixed(0), INDNUMENR: response2[x].INDNUMENR, tipo: "PF" });
                                        //verifica familia
                                        this.veirificafam(response2[x].PRDFAMCOD, response2[x].PROREF);
                                    }
                                    this.referencias = this.referencias.slice();
                                },
                                error => console.log(error));

                            //preenche comobobox operações
                            this.service.getOP(response[0].ofanumenr).subscribe(
                                response1 => {
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
                                        alert("Conexão com o Servidor Perdida!");
                                    }
                                });;
                        } else {
                            this.display_of_estado = true;
                            this.estado_of = "";
                            if (response[0].OFETAT == 3) {
                                this.estado_of = "está Suspensa!";
                            } else {
                                this.estado_of = "está Fechada!";
                            }
                        }
                    } else {
                        this.bt_class = "btn-danger";
                        this.estado_of = "não existe!";
                        this.display_of_estado = true;
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

        this.inputFocous.nativeElement.focus();
    }
    //fechar popup estado of
    cancelar_displayof() {
        this.display_of_estado = false;
    }

    //verifica FAM
    veirificafam(codfam, ref, response = null) {
        if (codfam != "") {
            this.RPCONFFAMILIACOMPService.getcodfam(codfam).subscribe(
                response1 => {
                    var count1 = Object.keys(response1).length;
                    if (count1 > 0) {
                        if (response != null) {
                            this.referencias.push({ codigo: response.PROREF, design: response.PRODES1 + " " + response.PRODES2, var1: null, var2: null, INDREF: null, OFBQTEINI: null, INDNUMENR: null, tipo: "COMP" });
                            this.referencias = this.referencias.slice();
                        }
                        this.get_filhos(ref);
                    }
                },
                error => console.log(error));
        }

    }

    //pesquisar componentes
    get_filhos(ref) {
        this.service.getfilhos(ref).subscribe(
            response1 => {
                var count1 = Object.keys(response1).length;
                if (count1 > 0) {
                    for (var x in response1) {
                        this.veirificafam(response1[x].PRDFAMCOD, response1[x].PROREFCST, response1[x]);
                    }
                }
            },
            error => console.log(error));
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
                        if (response[x].ssecod == "000") {
                            this.maquina.push({ label: response[x].ssecod + "/" + response[x].SSEDES, value: { code: response[x].ssecod, desc: response[x].SSEDES } });
                            find = true;
                            this.maq_DES = response[x].SSEDES;
                            this.maq_NUM = response[x].ssecod;
                            this.selectedmaq = response[x].ssecod;
                            this.sec_des = response[x].SECLIB;
                            this.sec_num = response[x].SECCOD;
                        } else {
                            this.selectedmaq = response[x].ssecod;
                            this.maq_DES = response[x].SSEDES;
                            this.maq_NUM = response[x].ssecod;
                            this.sec_des = response[x].SECLIB;
                            this.sec_num = response[x].SECCOD;

                        }
                    }
                    //lista todas as maquinas se op. não utilizar mão de obra
                    if (!find) {
                        this.service.getAllMaq(response[0].SECCOD).subscribe(
                            response3 => {
                                this.readonly_maq = true;

                                for (var x in response3) {
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

        this.carregamaquinas(event.data, OPENUM, '2');
    }

    //Quando o botão "Seleccionar só 1 referencia" pode seleccionar uma ref da tabela
    seleciona1ref() {
        this.color = "";
        this.single = "single";
    }

    //Quando clica no botão inciar trabalho

    iniciartrab() {
        if (this.num_of != "" && this.selected != "" && this.selectedmaq != "") {

            //verifica se existe alguma of com a mesma operação em execução 
            this.RPOFCABService.verifica(this.num_of, this.op_cod, this.op_NUM).subscribe(
                response => {
                    var c = Object.keys(response).length;
                    if (c > 0) {
                        if (response[0].estado == "P") {
                            this.pessoa_op_em_curso = "Não é possível iniciar trabalho porque o utilizador " + response[0].nome_UTZ_CRIA + " está em Preparação desse trabalho.";
                        } else if (response[0].estado == "E") {
                            this.pessoa_op_em_curso = "Não é possível iniciar trabalho porque já se encontra em Execução! Solicite a " + response[0].nome_UTZ_CRIA + " que o(a) adicione à operação.";
                        }

                        this.display_op_em_curso = true;
                    } else {
                        this.display3 = true;
                    }
                },
                error => console.log(error));
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
    }

    //criar cabeçalho OF
    criar(estado, ref_select) {
        this.router.navigate(['./home']);
        var rpof = new RP_OF_CAB;
        rpof.data_HORA_CRIA = new Date();
        rpof.estado = estado;
        rpof.of_NUM = this.num_of;
        rpof.op_COD = this.op_cod.toString();
        rpof.op_NUM = this.op_NUM;
        rpof.op_DES = this.op_desc;
        rpof.maq_NUM = this.maq_NUM;
        rpof.maq_DES = this.maq_DES;;
        rpof.id_UTZ_CRIA = this.username
        rpof.nome_UTZ_CRIA = this.nome_utz;
        rpof.of_OBS = this.observacoes;
        rpof.sec_DES = this.sec_des;
        rpof.sec_NUM = this.sec_num;
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
                rpof.op_NUM = '' + opnum;
                rpof.op_DES = null;
                rpof.maq_NUM = '000';
                rpof.maq_DES = 'MÃO DE OBRA';
                rpof.id_UTZ_CRIA = this.username
                rpof.nome_UTZ_CRIA = this.nome_utz;
                rpof.of_OBS = null;
                rpof.sec_DES = this.sec_des;
                rpof.sec_NUM = this.sec_num;

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
                this.criartabelaRPOPFUNC(res.id_OP_CAB, estado, comp);
                if (comp) {
                    this.criatabelaRPOFOPLIN(res.id_OP_CAB, comp, ref);
                } else {
                    this.criatabelaRPOFOPLIN(res.id_OP_CAB, comp, ref);
                }
            },
            error => console.log(error));


    }

    criartabelaRPOPFUNC(id_OP_CAB, estado, comp) {

        var rpofop = new RP_OF_OP_FUNC;

        rpofop.id_OP_CAB = id_OP_CAB;
        rpofop.data_INI = new Date();
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        rpofop.hora_INI = time;
        rpofop.id_UTZ_CRIA = this.username
        rpofop.nome_UTZ_CRIA = this.nome_utz;
        rpofop.perfil_CRIA = this.perfil_utz;
        rpofop.estado = estado;
        this.RPOPFUNCService.create(rpofop).subscribe(
            res => {

                if (estado == "P" && !comp) {
                    this.iniciapreparacao(res.id_OP_CAB);
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
            rpofoplin.ref_NUM = ref.codigo;
            rpofoplin.ref_DES = ref.design;
            rpofoplin.ref_IND = ref.INDREF;
            rpofoplin.ref_VAR1 = ref.var1;
            rpofoplin.ref_VAR2 = ref.var2;
            rpofoplin.quant_BOAS_TOTAL = 0;
            rpofoplin.quant_DEF_TOTAL = 0;
            rpofoplin.quant_OF = parseInt(this.referencias[0].OFBQTEINI);
            rpofoplin.perc_OBJETIV = parseFloat(ref.perc_obj);
            rpofoplin.ref_INDNUMENR = ref.INDNUMENR;
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
                    rpofoplin.perc_OBJETIV = parseFloat(this.referencias[x].perc_obj);
                    rpofoplin.ref_INDNUMENR = this.referencias[x].INDNUMENR;
                    rpofoplin.quant_OF = parseInt(this.referencias[x].OFBQTEINI);
                    this.insereref(rpofoplin, false);
                }
            }
        }

    }

    insereref(rpofoplin, comp) {
        this.RPOFOPLINService.create(rpofoplin).subscribe(
            res => {
                if (!comp) this.deftoref(res.id_OP_LIN);
                this.cria_RP_OF_OUTRODEF_LIN(res.id_OP_LIN, 1);
                this.cria_RP_OF_OUTRODEF_LIN(res.id_OP_LIN, 2);
                this.cria_RP_OF_OUTRODEF_LIN(res.id_OP_LIN, 3);
                this.cria_RP_OF_OUTRODEF_LIN(res.id_OP_LIN, 4);
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
    iniciapreparacao(id_OP_CAB) {
        var prep = new RP_OF_PREP_LIN();
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        prep.id_OP_CAB = id_OP_CAB;
        prep.data_INI = date;
        prep.hora_INI = time;
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
        for (var x in this.op_cod) {
            this.famassociadas(id_OP_LIN, this.op_cod[x]);
        }
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
        if (this.operacao_temp.indexOf(res[x].id_OP_SEC) == -1) {
            this.operacao_temp.push(res[x].id_OP_SEC);
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

}
