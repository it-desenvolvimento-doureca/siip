import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
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

    canActivate(route: ActivatedRouteSnapshot, ) {

        if (localStorage.getItem('time_siip')) {
            var data_storage = new Date(JSON.parse(localStorage.getItem('time_siip'))["data"]).getTime();
            if ((data_storage + 14400000) <= new Date().getTime()) {
                this.router.navigate(['./home']);
                //localStorage.clear();
                localStorage.removeItem('time_siip');
                localStorage.removeItem('id_of_cab');
                localStorage.removeItem('id_op_cab');
                localStorage.removeItem('siip_edicao');
                localStorage.removeItem('user');
                localStorage.removeItem('access');
                localStorage.removeItem('sec_num_user');
                localStorage.removeItem('perfil');
            } else {
                localStorage.setItem('time_siip', JSON.stringify({ data: new Date() }));
            }
        }


        var access = JSON.parse(localStorage.getItem('access'));
        if (!localStorage.getItem('user')) {
            //alert('Efetue o Login!');
            this.router.navigate(['./home']);
            return false;
        } else if (!localStorage.getItem('access')) {
            alert('Acesso Negado!');
            this.router.navigate(['./home']);
            return false;
        } else {
            var url = route.url[0].path;

            if (url == "nova-operacao" || url == "registo-quantidades" || url == "operacao-em-curso") {
                if (!access.find(item => item === "O") && !access.find(item => item === "A") && !access.find(item => item === "G")) {
                    alert('Acesso Negado!');
                    this.router.navigate(['./home']);
                    return false;
                }
            }
            else if (url == "controlo") {
                if (!access.find(item => item === "G") && !access.find(item => item === "A")) {
                    alert('Acesso Negado!');
                    this.router.navigate(['./home']);
                    return false;
                }
            }
            else if (url == "gestao-users") {
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

