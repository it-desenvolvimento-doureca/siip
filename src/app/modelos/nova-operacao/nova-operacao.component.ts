import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild } from '@angular/core';
import { Message, SelectItem } from 'primeng/primeng'
import { ofService } from "app/ofService";

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
    message = "";
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
    @ViewChild('inputFocous') inputFocous: any;

    constructor(private service: ofService) {
        this.operacao = [];

    }

    ngOnInit() {
        this.inputFocous.nativeElement.focus();
        this.referencias = [];

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
                                    this.referencias.push({ codigo: response2[x].PROREF, design: response2[x].PRODES1 });
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
                                    if (first) this.operacao.push({ label: "Seleccione a Operação", value: "0" });
                                    first = false;
                                    this.operacao.push({ label: response1[x].OPEDES, value: { OPECOD: response1[x].OPECOD, SECNUMENR1: response1[x].SECNUMENR1 } });
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
        this.message = event.data.codigo;

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
        this.service.getMaq(event.SECNUMENR1).subscribe(
            response => {
                this.maquina = [];
                this.readonly_maq = true;
                var find = false;
                for (var x in response) {
                    if (response[x].ssecod == "000") {
                        this.maquina.push({ label: response[x].SSEDES, value: response[x].ssecod });
                        find = true;
                    } else {
                        this.selectedmaq = response[x].ssecod;
                    }
                }
                //lista todas as maquinas se op. não utilizar mão de obra
                if (!find) {
                    this.service.getAllMaq().subscribe(
                        response3 => {
                            this.readonly_maq = true;

                            for (var x in response3) {
                                this.maquina.push({ label: response3[x].SSEDES, value: response3[x].ssecod });
                            }
                            this.maquina = this.maquina.slice();
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

    //ao seleccionar uma nova operação da tabela, ela é adicionada ao SelectItem
    onRowSelect3(event) {
        this.state = 'secondpos';
        if (!this.operacao.find(item => item.value.OPECOD === event.data.codigoop)) {
            this.operacao.push({ label: event.data.design, value: { OPECOD: event.data.codigoop, SECNUMENR1: event.data.SECNUMENR1 } });
            this.selected = this.operacao[this.operacao.length - 1].value;
        } else {
            this.selected = this.operacao.find(item => item.value.OPECOD === event.data.codigoop).value;
        }

        this.carregamaquinas(event.data);
        // this.operacao.push({ label: event.data.vin, value: { id: 5, name: 'Paris', code: event.data.vin } });
    }

    //Quando o botão "Selecionar só 1 referencia" é ciclado abre mensagem para confirmar trabalho apenas numa referencia. 
    seleciona1ref() {
        if (this.message != "") {
            this.display2 = true;
        }

    }

    //Quando clica no botão inciar trabalho

    iniciartrab() {
        if(this.num_of != "" && this.selected != "" && this.selectedmaq != ""){
            this.display3 = true;
        }
    }

}
