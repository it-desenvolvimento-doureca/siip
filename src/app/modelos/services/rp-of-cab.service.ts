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
      .post(webUrl.host+'/rest/siip/createRP_OF_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host+'/rest/siip/deleteRP_OF_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_OF_CAB[]> {
    const url = webUrl.host+'/rest/siip/getRP_OF_CAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  update(data: RP_OF_CAB) {
    return this.http
      .put(webUrl.host+'/rest/siip/updateRP_OF_CAB', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  listofcurrentof(id) {
    const url = webUrl.host+'/rest/siip/listofcurrentof/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getof(id) {
    const url = webUrl.host+'/rest/siip/getof/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));

  }

  verifica(of_num, op_cod, op_num) {
    const url = webUrl.host+'/rest/siip/verifica/' + of_num + '/' + op_cod + '/' + op_num + '';
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
