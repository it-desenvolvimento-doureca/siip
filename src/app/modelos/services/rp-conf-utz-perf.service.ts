import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RP_CONF_UTZ_PERF } from "app/modelos/entidades/RP_CONF_UTZ_PERF";
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";

@Injectable()
export class RPCONFUTZPERFService {

    handleError: any;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    create(data: RP_CONF_UTZ_PERF) {
        return this.http
            .post(webUrl.host+'/rest/siip/createRPCONFUTZPERF', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id) {
        return this.http
            .delete(webUrl.host+'/rest/siip/deleteRPCONFUTZPERF/' + id + '')
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }


    getAll(): Observable<RP_CONF_UTZ_PERF[]> {
        const url = webUrl.host+'/rest/siip/getRPCONFUTZPERF';
        return this.http
            .get(url)
            .map(this.extractData)
            .catch((error: any) => Observable.throw('Server error'));
    }

    getbyid(id): Observable<RP_CONF_UTZ_PERF[]> {
        const url = webUrl.host+'/rest/siip/getRPCONFUTZPERFid/' + id + '';
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
