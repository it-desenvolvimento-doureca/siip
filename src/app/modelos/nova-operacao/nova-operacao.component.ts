import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { CarService } from "app/carservice";
import { Message, SelectItem } from 'primeng/primeng'

@Component({
  selector: 'app-nova-operacao',
  templateUrl: './nova-operacao.component.html',
  styleUrls: ['./nova-operacao.component.css'],
    providers: [CarService],
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

    msgs: Message[];
    cities: SelectItem[];
    cities2: SelectItem[];
    selectedCity: string;
    city = "";
    display: boolean = false;
    display2: boolean = false;

    cols: any[];
    cols2: any[];
    var_teste = "";
    message = "";
    

    constructor() {
        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
    }

    ngOnInit() {
        // this.carService.getCarsMedium().then(cars => this.cars = cars);
        this.cols = [
            { "vin": "a1653d4r", "brand": "VW", "year": 1998, "color": "White" },
            { "vin": "a1er4d", "brand": "VW", "year": 1998, "color": "White" },
            { "vin": "a1653ered4d", "brand": "VW", "year": 1998, "color": "White" },
            { "vin": "a16533434d4d", "brand": "VW", "year": 1998, "color": "White" }
        ];

        this.cols2 = [
            { "vin": "1", "brand": "VW", "year": 1998, "color": "White" },
            { "vin": "2", "brand": "VW", "year": 1998, "color": "White" },
            { "vin": "3", "brand": "VW", "year": 1998, "color": "White" },
            { "vin": "4", "brand": "VW", "year": 1998, "color": "White" }
        ];
    }

    onRowSelect(event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Selected', detail: event.data.vin + ' - ' + event.data.brand });
        this.message = event.data.vin;

    }

    onRowUnselect(event) {
        this.message = "";
    }

    onRowSelect2(event) {

        this.var_teste = event.data.vin;

    }

    onRowUnselect2(event) {
        this.var_teste = "";
    }

    operacao() {
        this.display = false;
        this.message = this.var_teste;
    }

    cancelar() {
        this.display = false;
        this.message = "";
    }
    cancelar2() {
        this.display2 = false;
        this.message = "";
    }
    showDialog() {
        this.display = true;
    }
    carregaoperacoes(event) {
        this.city = event.value.code;
        this.cities2 = [];
        this.cities2.push({ label: this.city + '1', value: null });
        this.cities2.push({ label: this.city + '2', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities2.push({ label: this.city + '3', value: { id: 2, name: 'Rome', code: 'RM' } });
    }

    state: string = 'secondpos';
    teste = true;
    togglestates() {
        this.state = (this.state === 'firstpos' ? 'secondpos' : 'firstpos');
        this.teste = true;
    }

    ontogglestates() {
        if (this.teste == false) {
            this.state = 'secondpos';
            this.teste = true;
        } else {
            this.teste = false;
        }
    }

    onRowSelect3(event) {

        this.state = 'secondpos';
        this.cities = [];
        this.cities.push({ label: event.data.vin, value: { id: 5, name: 'Paris', code: event.data.vin } });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });

    }

    seleciona1ref() {
        if(this.message != ""){
            this.display2 = true;
        }
        
    }

}
