import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { RP_OF_PARA_LIN } from "app/modelos/entidades/RP_OF_PARA_LIN";
import { webUrl } from "webUrl";

@Injectable()
export class RPOFPARALINService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_OF_PARA_LIN) {
    return this.http
      .post(webUrl.host + '/rest/siip/createRP_OF_PARA_LIN', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteRP_OF_PARA_LIN/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_OF_PARA_LIN[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_PARA_LIN';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  update(data: RP_OF_PARA_LIN) {
    return this.http
      .put(webUrl.host + '/rest/siip/updateRP_OF_PARA_LIN', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getbyid(id): Observable<RP_OF_PARA_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyidRP_OF_PARA_LIN/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid2(id): Observable<RP_OF_PARA_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyidRP_OF_PARA_LIN2/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyallID_OP_CAB(id): Observable<RP_OF_PARA_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyallID_OP_CAB/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyallUSER(id, user): Observable<RP_OF_PARA_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyallUSER/' + id + '/' + user;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid_op_cab(id): Observable<RP_OF_PARA_LIN[]> {
    const url = webUrl.host + '/rest/siip/getbyid_op_cabRP_OF_PARA_LIN/' + id + '';
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
