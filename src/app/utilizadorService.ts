import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Utilizador } from "app/modelos/entidades/utilizador";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { webUrl } from "webUrl";

@Injectable()
export class utilizadorService {

    handleError: any;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }
        
    searchuser(RESCOD) {
        const url = webUrl.host+'/rest/demo/searchuser/' + RESCOD + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    /*createHero() {
        return this.http
            .put(webUrl.host+'/rest/demo/user3', JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    getUtilizadores(): Observable<Utilizador[]> {
        const url = webUrl.host+'/rest/demo/user';
        return this.http
            .get(url)
            .map(this.extractData)
            .catch((error: any) => Observable.throw('Server error'));
    }*/

    getUtilizadoresSilver() {
        const url = webUrl.host+'/rest/demo/users';
        return this.http
            .get(url)
            .map(this.extractData)
            .catch((error: any) => Observable.throw('Server error'));
    }

    getSeccoes() {
        const url = webUrl.host+'/rest/demo/sessoes';
        return this.http
            .get(url)
            .map(this.extractData)
            .catch((error: any) => Observable.throw('Server error'));
    }



    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
}
