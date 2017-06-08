import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RP_CONF_UTZ_PERF } from "app/modelos/entidades/RP_CONF_UTZ_PERF";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RPCONFUTZPERFService {

    handleError: any;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    create(data: RP_CONF_UTZ_PERF) {
        return this.http
            .post(`http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/createRPCONFUTZPERF`, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id) {
        return this.http
            .delete('http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/deleteRPCONFUTZPERF/' + id + '')
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }


    getAll(): Observable<RP_CONF_UTZ_PERF[]> {
        const url = `http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getRPCONFUTZPERF`;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch((error: any) => Observable.throw('Server error'));
    }

    getbyid(id): Observable<RP_CONF_UTZ_PERF[]> {
        const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getRPCONFUTZPERFid/' + id + '';
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
