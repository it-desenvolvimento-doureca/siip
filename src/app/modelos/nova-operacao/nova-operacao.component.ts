import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild } from '@angular/core';
import { Message, SelectItem } from 'primeng/primeng'
import { ofService } from "app/ofService";
import { RPCONFOPNPREVService } from "app/modelos/services/rp-conf-op-nprev.service";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";
import { RP_OF_OP_CAB } from "app/modelos/entidades/RP_OF_OP_CAB";
import { RPOFOPCABService } from "app/modelos/services/rp-of-op-cab.service";
import { RP_OF_OP_LIN } from "app/modelos/entidades/RP_OF_OP_LIN";
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RP_OF_PREP_LIN } from "app/modelos/entidades/RP_OF_PREP_LIN";
import { RPOFPREPLINService } from "app/modelos/services/rp-of-prep-lin.service";
import { Router } from "@angular/router";

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
    OFBQTEINI: any;
    INDNUMENR: any;
    ref_VAR2: any;
    ref_VAR1: any;
    ref_IND: any;
    op_desc: any;
    op_num: any;
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
    @ViewChild('inputFocous') inputFocous: any;

    constructor(private router: Router, private prepservice: RPOFPREPLINService, private RPOFOPLINService: RPOFOPLINService, private RPOFOPCABService: RPOFOPCABService, private service: ofService, private op_service: RPCONFOPNPREVService, private RPOFCABService: RPOFCABService) {
        this.operacao = [];

    }

    ngOnInit() {
        this.inputFocous.nativeElement.focus();
        this.referencias = [];

        this.novaopera = [];
        this.op_service.getAll().subscribe(
            response => {
                for (var x in response) {

                    this.novaopera.push({ OPECOD: response[x].id_OP.trim(), OPEDES: response[x].name_OP.trim(), SECNUMENR1: response[x].secnumenr1_OP.trim() });
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
        if (this.num_of != "") {
            this.service.getOF(this.num_of).subscribe(
                response => {
                    this.operacao = [];
                    this.readonly_op = true;
                    this.readonly_maq = true;
                    var first = true;
                    var count = Object.keys(response).length;
                    //se existir uma of vai preencher combobox operações
                    if (count > 0) {
                        this.observacoes = response[0].ofref;
                        //preenche tabela referencias
                        this.service.getRef(response[0].ofanumenr).subscribe(
                            response2 => {
                                for (var x in response2) {
                                    this.referencias.push({ codigo: response2[x].PROREF, design: response2[x].PRODES1, var1: response2[x].VA1REF, var2: response2[x].VA2REF, INDREF: response2[x].INDREF, OFBQTEINI: response2[x].OFBQTEINI, INDNUMENR: response2[x].INDNUMENR });
                                }
                                this.referencias = this.referencias.slice();
                                if (this.referencias.length > 1) {
                                    this.displaybtref = false;
                                }
                            },
                            error => console.log(error));

                        //preenche comobobox operações
                        this.service.getOP(response[0].ofanumenr).subscribe(
                            response1 => {
                                for (var x in response1) {
                                    if (first) this.operacao.push({ label: "Seleccione a Operação", value: 0 });
                                    first = false;
                                    this.operacao.push({ label: response1[x].OPECOD + "/" + response1[x].OPEDES, value: { OPECOD: response1[x].OPECOD, OPEDES: response1[x].OPEDES, SECNUMENR1: response1[x].SECNUMENR1 } });
                                }
                                this.readonly_op = false;
                                this.selected = "0";
                            },
                            error => console.log(error));
                    } else {
                        this.bt_class = "btn-danger";
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
    carregamaquinas(event) {
        if (event != 0) {
            this.op_num = event.OPECOD;
            this.op_desc = event.OPEDES;
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
                        } else {
                            this.selectedmaq = response[x].ssecod;
                            this.maq_DES = response[x].SSEDES;
                            this.maq_NUM = response[x].ssecod;
                        }
                    }
                    //lista todas as maquinas se op. não utilizar mão de obra
                    if (!find) {
                        this.service.getAllMaq().subscribe(
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
        this.state = 'secondpos';
        if (!this.operacao.find(item => item.value.OPECOD === event.data.OPECOD)) {
            this.operacao.push({ label: event.data.OPECOD + "/" + event.data.OPEDES, value: { OPEDES: event.data.OPEDES, OPECOD: event.data.OPECOD, SECNUMENR1: event.data.SECNUMENR1 } });
            this.selected = this.operacao[this.operacao.length - 1].value;
        } else {
            this.selected = this.operacao.find(item => item.value.OPECOD === event.data.OPECOD).value;
        }

        this.carregamaquinas(event.data);
    }

    //Quando o botão "Seleccionar só 1 referencia" pode seleccionar uma ref da tabela
    seleciona1ref() {
        this.color = "";
        this.single = "single";
    }

    //Quando clica no botão inciar trabalho

    iniciartrab() {
        if (this.num_of != "" && this.selected != "" && this.selectedmaq != "") {
            this.display3 = true;
        }
    }

    //carregar todas as operações não previstas
    carregarmais() {
        this.novaopera = [];
        this.service.getAllOP().subscribe(
            response => {
                for (var x in response) {

                    this.novaopera.push({ codigoop: response[x].OPECOD, design: response[x].OPEDES, SECNUMENR1: response[x].SECNUMENR1 });
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

    criar(estado, ref_select) {
        var rpof = new RP_OF_CAB;
        rpof.data_HORA_CRIA = new Date();
        rpof.estado = estado;
        rpof.of_NUM = this.num_of;
        rpof.op_NUM = this.op_num;
        rpof.op_DES = this.op_desc;
        rpof.maq_NUM = this.maq_NUM;
        rpof.maq_DES = this.maq_DES;;
        rpof.id_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["username"];
        rpof.nome_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["name"];
        rpof.of_OBS = this.observacoes;
        rpof.sec_DES = "1";
        rpof.sec_NUM = "2"

        this.RPOFCABService.create(rpof).subscribe(
            res => {
                this.criatabelaRPOFOPCAB(res.id_CAB, estado, ref_select);
            },
            error => console.log(error));
    }

    criatabelaRPOFOPCAB(id_OF_CAB, estado, ref_select) {
        var rpofop = new RP_OF_OP_CAB;

        rpofop.id_OF_CAB = id_OF_CAB;
        rpofop.data_INI = new Date();
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        rpofop.hora_INI = time;
        rpofop.id_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["username"];
        rpofop.nome_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["name"];
        rpofop.perfil_CRIA = JSON.parse(localStorage.getItem('perfil'));
        rpofop.estado = estado;
        this.RPOFOPCABService.create(rpofop).subscribe(
            res => {
                this.criatabelaRPOFOPLIN(res.id_OP_CAB, ref_select);
                if (estado == "P") {
                    this.iniciapreparacao(res.id_OP_CAB);
                }
            },
            error => console.log(error));
    }

    criatabelaRPOFOPLIN(id_OP_CAB, ref_select) {
        if (ref_select) {
            var rpofoplin = new RP_OF_OP_LIN;
            rpofoplin.id_OP_CAB = id_OP_CAB;
            rpofoplin.ref_NUM = this.ref_code;
            rpofoplin.ref_DES = this.ref_name;
            rpofoplin.ref_IND = this.ref_IND
            rpofoplin.ref_VAR1 = this.ref_VAR1;
            rpofoplin.ref_VAR2 = this.ref_VAR2;
            rpofoplin.ref_INDNUMENR = this.INDNUMENR;
            rpofoplin.quant_OF = parseInt(this.OFBQTEINI);
            this.RPOFOPLINService.create(rpofoplin).subscribe(
                res => {
                    this.router.navigate(['./home']);
                },
                error => console.log(error));
        } else {
            for (var x in this.referencias) {
                var rpofoplin = new RP_OF_OP_LIN;
                rpofoplin.id_OP_CAB = id_OP_CAB;
                rpofoplin.ref_NUM = this.referencias[x].codigo;
                rpofoplin.ref_DES = this.referencias[x].design;
                rpofoplin.ref_IND = this.referencias[x].INDREF;
                rpofoplin.ref_VAR1 = this.referencias[x].var1;
                rpofoplin.ref_VAR2 = this.referencias[x].var2;
                rpofoplin.ref_INDNUMENR = this.referencias[x].INDNUMENR;
                rpofoplin.quant_OF = parseInt(this.referencias[x].OFBQTEINI);
                this.RPOFOPLINService.create(rpofoplin).subscribe(
                    res => {
                        this.router.navigate(['./home']);
                    },
                    error => console.log(error));
            }

        }
    }

    iniciapreparacao(id_OP_CAB) {
        var prep = new RP_OF_PREP_LIN();
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        prep.id_OP_CAB = id_OP_CAB;
        prep.data_INI = date;
        prep.hora_INI = time;
        prep.id_UTZ_CRIA = JSON.parse(localStorage.getItem('user'))["username"];
        prep.estado = "P";

        this.prepservice.create(prep).subscribe(
            res => {
            },
            error => console.log(error));
    }

}
