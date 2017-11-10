import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RPCONFUTZPERFService } from "app/modelos/services/rp-conf-utz-perf.service";

@Injectable()
export class LoginService implements CanActivate {

    headers = new Headers({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
    constructor(private router: Router, private service: RPCONFUTZPERFService) { }

    private userIsAuthenticated: boolean;

    canActivate() {
       
        if (localStorage.getItem('time_siip')) {
            var data_storage = new Date(JSON.parse(localStorage.getItem('time_siip'))["data"]).getTime();
            if ((data_storage + 14400000) <= new Date().getTime()) {
                localStorage.clear();
            } else {
                localStorage.setItem('time_siip', JSON.stringify({ data: new Date() }));
            }
        }

        
        var access = JSON.parse(localStorage.getItem('access'));
        if (!localStorage.getItem('user') ) {
            alert('Efetue o Login!');
            this.router.navigate(['./home']);
            return false;
        } else if (!localStorage.getItem('access')) {
            alert('Acesso Negado!');
            this.router.navigate(['./home']);
            return false;
        } else {

            if (location.pathname == "/nova-operacao" || location.pathname == "/registo-quantidades" || location.pathname == "/operacao-em-curso") {
                if (!access.find(item => item === "O") && !access.find(item => item === "A")) {
                    alert('Acesso Negado!');
                    this.router.navigate(['./home']);
                    return false;
                }
            }
            else if (location.pathname == "/controlo") {
                if (!access.find(item => item === "G") && !access.find(item => item === "A")) {
                    alert('Acesso Negado!');
                    this.router.navigate(['./home']);
                    return false;
                }
            }
            else if (location.pathname == "/gestao-users") {
                if (!access.find(item => item === "A")) {
                    alert('Acesso Negado!');
                    this.router.navigate(['./home']);
                    return false;
                }
            }
        }

        return true;
    }
}

