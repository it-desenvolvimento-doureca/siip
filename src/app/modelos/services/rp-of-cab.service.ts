import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";
import { webUrl } from "webUrl";
@Injectable()
export class RPOFCABService {


  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_OF_CAB) {
    return this.http
      .post(webUrl.host + '/rest/siip/createRP_OF_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteRP_OF_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  pesquisa_avancada(data, start) {
    return this.http
      .post(webUrl.host + '/rest/siip/pesquisa_avancada/' + start, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  pesquisa_avancada2(data, start) {
    return this.http
      .post(webUrl.host + '/rest/siip/pesquisa_avancada2/' + start, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  updateEstados(data) {
    return this.http
      .post(webUrl.host + '/rest/siip/createupdateESTADOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAll(data, start): Observable<RP_OF_CAB[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_CAB/' + start;
    return this.http
      .post(url, data, { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(data, start): Observable<RP_OF_CAB[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_CAB2/' + start;
    return this.http
      .post(url, data, { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRP_OF_CABbyid(id): Observable<RP_OF_CAB[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_CABbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: RP_OF_CAB) {
    return this.http
      .put(webUrl.host + '/rest/siip/updateRP_OF_CAB', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  listofcurrentof(id) {
    const url = webUrl.host + '/rest/siip/listofcurrentof/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getof(id) {
    const url = webUrl.host + '/rest/siip/getof/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));

  }

  verifica(of_num, op_cod, op_num, user) {
    const url = webUrl.host + '/rest/siip/verifica/' + of_num + '/' + op_cod + '/' + op_num + '/' + user;
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
