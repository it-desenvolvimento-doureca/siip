import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { RP_OF_OP_CAB } from "app/modelos/entidades/RP_OF_OP_CAB";

@Injectable()
export class RPOFOPCABService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_OF_OP_CAB) {
    return this.http
      .post(`http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/createRP_OF_OP_CAB`, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete('http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/deleteRP_OF_OP_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_OF_OP_CAB[]> {
    const url = `http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getRP_OF_OP_CAB`;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getMaxID() {
    const url = `http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getMaxID`;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: RP_OF_OP_CAB) {
    return this.http
      .put(`http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/updateRP_OF_OP_CAB`, JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getdataof(id, user) {
    const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getdataof/' + id + '/' + user + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id) {
    const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getRP_OF_OP_CABid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  listofcurrentof(id) {
    const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/checkuser/' + id + '';
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
