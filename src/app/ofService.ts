import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { webUrl } from "webUrl";

@Injectable()
export class ofService {

    constructor(private http: Http) { }


    getOF(ofnum) {
        const url = webUrl.host + '/rest/demo/silver/' + ofnum + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getOP(ofanumenr) {
        const url = webUrl.host + '/rest/demo/operacao/' + ofanumenr + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError2);
    }

    getOPTop1(ofanumenr) {
        const url = webUrl.host + '/rest/demo/operacaoTop1/' + ofanumenr + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getAllOP() {
        const url = webUrl.host + '/rest/demo/allop';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }


    getAllOPNOTIN(data: String) {
        const url = webUrl.host + '/rest/demo/allopNOTIN/' + data + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getAllFAMNOTIN(data: String) {
        const url = webUrl.host + '/rest/demo/allfamNOTIN/' + data + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getMaq(SECNUMENR) {
        const url = webUrl.host + '/rest/demo/maquina/' + SECNUMENR + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getFamilias() {
        const url = webUrl.host + '/rest/demo/familias/';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getfilhos(pai) {
        const url = webUrl.host + '/rest/demo/getfilhos/' + pai;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    defeitos(fam) {
        const url = webUrl.host + '/rest/demo/defeitos/' + fam + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError2);
    }
    private handleError2(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    getAllMaq(SECCOD) {
        const url = webUrl.host + '/rest/demo/allmaquina/' + SECCOD + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getTipoFalta() {
        const url = webUrl.host + '/rest/demo/tipofaltas';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getEtiqueta(etiqueta) {
        const url = webUrl.host + '/rest/demo/getEtiqueta/' + etiqueta + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getRef(OFANUMENR) {
        const url = webUrl.host + '/rest/demo/referencias/' + OFANUMENR + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    criaficheiro(id, estado) {
        const url = webUrl.host + '/rest/siip/ficheiro/' + id + '/' + estado;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    atualizarcampos(id) {
        const url = webUrl.host + '/rest/siip/atualizarcampos/' + id;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    atualizaropenum(id) {
        const url = webUrl.host + '/rest/siip/atualizaropenum/' + id;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }
}
