import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
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
    constructor(private service: ofService) {
        this.operacao = [];

    }

    ngOnInit() {

        this.referencias = [
            { "codigo": "COD01", "design": "DESIGN01" },
            { "codigo": "COD02", "design": "DESIGN02" },
            { "codigo": "COD03", "design": "DESIGN03" },
            { "codigo": "COD04", "design": "DESIGN04" },
        ];

        this.novaopera = [
            { "codigoop": "0004", "design": "OPERA01", "zona": "1"},
            { "codigoop": "0005", "design": "OPERA02", "zona": "1" },
            { "codigoop": "0006", "design": "OPERA03" , "zona": "1"},
            { "codigoop": "0007", "design": "OPERA04" , "zona": "1"},
        ];

    }

    //verificar se existe a OF
    pesquisaof() {
        this.service.getOF().subscribe(
            response => {
                this.operacao = [];
                this.readonly_op = true;
                this.readonly_maq = true;
                this.bt_class = "btn-primary";
                var first = true;
                for (var x in response) {
                    if (response[x].codigo == this.num_of) {

                        if (first) this.operacao.push({ label: "Seleccione a Operação", value: null });
                        first = false;
                        this.operacao.push({ label: response[x].descricao, value: response[x].zona });
                    }
                    if (this.operacao.length > 0) {
                        this.readonly_op = false;
                    } else {
                        this.bt_class = "btn-danger";
                    }
                }
            },
            error => console.log(error));
    }
    //Seleccionar uma referência da Tabela Referência
    onRowSelect(event) {
        this.message = event.data.codigo;

    }

    //fechar popup que abre depois de clicar em "SELECIONAR SÓ 1 REFERÊNCIA"
    cancelar() {
        this.display2 = false;
    }

    //ao alterar a operação preenche SelectItem das maquinas
    carregamaquinas(event) {
        this.cod_ope = event;
        this.service.getOP().subscribe(
            response => {
                this.maquina = [];
                this.readonly_maq = true;
                var first = true;
                for (var x in response) {
                    if (response[x].codigo == this.cod_ope) {
                        if (first) this.maquina.push({ label: "Seleccione a Máquina", value: null });
                        first = false;
                        this.maquina.push({ label: response[x].descricao, value: response[x].codigo });
                    }
                    if (this.maquina.length > 0) {
                        this.readonly_maq = false;
                    }
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
        this.selected = event.data.codigoop;
        this.operacao.push({ label: event.data.codigoop, value: event.data.codigoop });
        this.carregamaquinas(event.data.zona);
        // this.operacao.push({ label: event.data.vin, value: { id: 5, name: 'Paris', code: event.data.vin } });
    }

    //Quando o botão "Selecionar só 1 referencia" é ciclado abre mensagem para confirmar trabalho apenas numa referencia. 
    seleciona1ref() {
        if (this.message != "") {
            this.display2 = true;
        }

    }

}
