import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { RP_OF_DEF_LIN } from "app/modelos/entidades/RP_OF_DEF_LIN";
import { webUrl } from "webUrl";

@Injectable()
export class RPOFDEFLINService {


  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_OF_DEF_LIN) {
    return this.http
      .post(webUrl.host + '/rest/siip/createRP_OF_DEF_LIN', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  create_update(data: RP_OF_DEF_LIN) {
    return this.http
      .post(webUrl.host + '/rest/siip/createupdateRP_OF_DEF_LIN', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RP_OF_DEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_DEF_LIN';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id, id2, id_ref): Observable<RP_OF_DEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyidRP_OF_DEF_LIN/' + id + '/' + id2 + '/' + id_ref;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidall(id2, id_ref): Observable<RP_OF_DEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyidRP_OF_DEF_LINall/' + id2 + '/' + id_ref;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidDEF(id): Observable<RP_OF_DEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyidDEF/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid_op_lin_eti(id, id_ref): Observable<RP_OF_DEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyidRP_OF_DEF_LINidoplin_etiq/' + id + '/' + id_ref;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }
  getbyid_op_lin(id): Observable<RP_OF_DEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyidRP_OF_DEF_LINidoplin/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid_op_lindef(id): Observable<RP_OF_DEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_ETIQUETAbyid_op_lindef/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id, etiqueta) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteRP_OF_DEF_LIN/' + id + '/' + etiqueta)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  delete_id_def(id) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteRP_OF_DEF_LIN2/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RP_OF_DEF_LIN) {
    return this.http
      .put(webUrl.host + '/rest/siip/updateRP_OF_DEF_LIN', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  atualizatotais(id, modo) {
    const url = webUrl.host + '/rest/siip/atualizartotais/' + id + '/' + modo;
    return this.http
      .get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}

