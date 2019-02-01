import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";
import { RP_OF_OP_ETIQUETA } from 'app/modelos/entidades/RP_OF_OP_ETIQUETA';
@Injectable()
export class RPOFOPETIQUETAService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_OF_OP_ETIQUETA) {
    return this.http
      .post(webUrl.host + '/rest/siip/createRP_OF_OP_ETIQUETA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RP_OF_OP_ETIQUETA[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_ETIQUETA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteRP_OF_OP_ETIQUETA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RP_OF_OP_ETIQUETA) {
    return this.http
      .put(webUrl.host + '/rest/siip/updateRP_OF_OP_ETIQUETA', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getAllbyid(id): Observable<RP_OF_OP_ETIQUETA[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_ETIQUETAbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllbyid_eti(id, etiqueta): Observable<RP_OF_OP_ETIQUETA[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_ETIQUETAbyid/' + id + '/' + etiqueta;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyid_op_lin(id): Observable<RP_OF_OP_ETIQUETA[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_ETIQUETAbyid_op_lin/' + id + '';
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