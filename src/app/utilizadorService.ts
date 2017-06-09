import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Utilizador } from "app/modelos/entidades/utilizador";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class utilizadorService {

    handleError: any;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }
        
    searchuser(RESCOD) {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/searchuser/' + RESCOD + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    /*createHero() {
        return this.http
            .put(`http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/user3`, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    getUtilizadores(): Observable<Utilizador[]> {
        const url = `http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/user`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch((error: any) => Observable.throw('Server error'));
    }*/

    getUtilizadoresSilver() {
        const url = `http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/users`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch((error: any) => Observable.throw('Server error'));
    }

    getSeccoes() {
        const url = `http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/sessoes`;
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
