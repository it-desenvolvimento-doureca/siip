import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { webUrl } from "webUrl";

@Injectable()
export class ofService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getSeccao() {
        const url = webUrl.host + '/rest/demo/getSeccao/';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }


    getOF(ofnum) {
        const url = webUrl.host + '/rest/demo/silver/' + ofnum + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getofpai_filho(ofnum) {
        const url = webUrl.host + '/rest/demo/getofpai_filho/' + ofnum + '';
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

    getANALISERAPIDA(data) {
        const url = webUrl.host + '/rest/siip/getANALISERAPIDA';
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getAllOPNOTIN(data) {
        const url = webUrl.host + '/rest/demo/allopNOTIN';
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    getAllFAMNOTIN(data) {
        const url = webUrl.host + '/rest/demo/allfamNOTIN/';
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
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

    getfilhosprimeiro(OFANUMENR) {
        const url = webUrl.host + '/rest/demo/getfilhosprimeiro/' + OFANUMENR;
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

    defeitos2(fam) {
        const url = webUrl.host + '/rest/demo/defeitos2';
        return this.http
            .post(url, fam.toString(), { headers: this.headers })
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

    getOPTIPO(OPECOD) {
        const url = webUrl.host + '/rest/demo/getOPTIPO/' + OPECOD + '';
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

    getEtiquetacaixas(etiqueta) {
        const url = webUrl.host + '/rest/demo/getEtiquetacaixas/' + etiqueta + '';
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }


    gama_embalagem(data) {
        const url = webUrl.host + '/rest/demo/gama_embalagem';
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    consulta_Impressao(proref) {
        const url = webUrl.host + '/rest/demo/consulta_Impressao/' + proref + '';
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

    criaficheiro(id, estado, ficheiros = false, manual, data) {
        const url = webUrl.host + '/rest/siip/ficheiro/' + id + '/' + estado + '/' + ficheiros + '/' + manual;
        return this.http.post(url, JSON.stringify(data), { responseType: ResponseContentType.Blob, headers: this.headers }).map(
            (res) => {
                if (ficheiros) {
                    return new Blob([res.blob()], { type: 'application/zip' });
                }
            });
    }

    criaficheiroManual(data, todos) {
        const url = webUrl.host + '/rest/siip/ficheiroManual/' + todos;
        return this.http.post(url, JSON.stringify(data), { responseType: ResponseContentType.Blob, headers: this.headers }).map(
            (res) => {

                return new Blob([res.blob()], { type: 'application/zip' });

            });
    }

    getList(data) {
        const url = webUrl.host + '/rest/siip/getOFS';
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }


    getOFSCOMPONENTES(data) {
        const url = webUrl.host + '/rest/siip/getOFSCOMPONENTES';
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
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

    testeligacao() {
        const url = webUrl.host + '/rest/siip/testeligacao';
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

    verificaopnum(id) {
        const url = webUrl.host + '/rest/siip/verificaopnum/' + id;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    atualizaestado(id, user, estado) {
        const url = webUrl.host + '/rest/siip/atualizarestado/' + id + '/' + user + '/' + estado;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }


    imprimir(ficheiro, impressora) {
        const url = webUrl.host + '/rest/siip/imprimir/' + ficheiro + '/' + impressora;
        return this.http
            .get(url)
            .map(this.extractData1)
            .catch(this.handleError);
    }

    private extractData1(res: Response) {
        return res;
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    getIMPRESORA(ip) {
        const url = webUrl.host + '/rest/siip/getIMPRESORA/' + ip;
        return this.http
            .get(url)
            .map(this.extractData)
            .catch((error: any) => Observable.throw('Server error'));
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    downloadPDF(format, filename, id, relatorio): any {
        const url = webUrl.host + '/rest/siip/get/' + format + '/' + filename + '/' + id + '/' + relatorio;
        return this.http.get(url, { responseType: ResponseContentType.Blob }).map(
            (res) => {
                if (format == "pdf") {
                    return new Blob([res.blob()], { type: 'application/pdf' });
                } else if (format == "xlsx") {
                    return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                } else if (format == "docx") {
                    return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                }

            });
    }


}
