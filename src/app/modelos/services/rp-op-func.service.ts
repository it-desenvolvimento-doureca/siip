import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";
import { RP_OF_OP_FUNC } from "app/modelos/entidades/RP_OF_OP_FUNC";

@Injectable()
export class RPOPFUNCService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_OF_OP_FUNC) {
    return this.http
      .post(webUrl.host + '/rest/siip/createRP_OF_OP_FUNC', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteRP_OF_OP_FUNC/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_OF_OP_FUNC[]> {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_FUNC';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  update(data: RP_OF_OP_FUNC) {
    return this.http
      .put(webUrl.host + '/rest/siip/updateRP_OF_OP_FUNC', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  getdataof(id, user, estado) {
    const url = webUrl.host + '/rest/siip/getdataof/' + id + '/' + user;
    return this.http
      .post(url, JSON.stringify(estado), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id, user) {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_FUNCid/' + id + '/' + user;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getUsersbyid_of_cab(id) {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_FUNCusers/' + id
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getUser(id) {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_FUNCuser/' + id
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getallUsersbyid_of_cab(id) {
    const url = webUrl.host + '/rest/siip/getRP_OF_OP_FUNCallusers/' + id
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getallUsersTEMPPREP(id) {
    const url = webUrl.host + '/rest/siip/getallUsersTEMPPREP/' + id
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }
}