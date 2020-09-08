import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";
import { ST_PEDIDOS } from '../entidades/ST_PEDIDOS';


@Injectable()
export class STPEDIDOSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: ST_PEDIDOS) {
    return this.http
      .post(webUrl.host + '/rest/siip/createST_PEDIDOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteST_PEDIDOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<ST_PEDIDOS[]> {
    const url = webUrl.host + '/rest/siip/getST_PEDIDOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<ST_PEDIDOS[]> {
    const url = webUrl.host + '/rest/siip/getST_PEDIDOSbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: ST_PEDIDOS) {
    return this.http
      .put(webUrl.host + '/rest/siip/updateST_PEDIDOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
