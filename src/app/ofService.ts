import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ofService {

    constructor(private http: Http) { }


    getOF(ofnum) {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/silver/' + ofnum + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getOP(ofanumenr) {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/operacao/' + ofanumenr + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getAllOP() {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/allop';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }


    getAllOPNOTIN(data: String) {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/allopNOTIN/'+data+'';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getMaq(SECNUMENR) {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/maquina/' + SECNUMENR + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getFamilias() {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/familias/';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getAllMaq() {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/allmaquina/';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getTipoFalta() {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/tipofaltas';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getRef(OFANUMENR) {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/referencias/' + OFANUMENR + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }
}
