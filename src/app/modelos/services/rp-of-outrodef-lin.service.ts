import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";
import { RP_OF_OUTRODEF_LIN } from "app/modelos/entidades/RP_OF_OUTRODEF_LIN";

@Injectable()
export class RPOFOUTRODEFLINService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_OF_OUTRODEF_LIN) {
    return this.http
      .post(webUrl.host + '/rest/siip/createRP_OF_OUTRODEF_LIN', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteRP_OF_OUTRODEF_LIN/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_OF_OUTRODEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_OUTRODEF_LIN';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<RP_OF_OUTRODEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyidRP_OF_OUTRODEF_LINF/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyidetiqueta(id, etiqueta): Observable<RP_OF_OUTRODEF_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyidRP_OF_OUTRODEF_LINFetiqueta/' + id + '/' + etiqueta;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  update(data: RP_OF_OUTRODEF_LIN) {
    return this.http
      .put(webUrl.host + '/rest/siip/updateRP_OF_OUTRODEF_LIN', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
