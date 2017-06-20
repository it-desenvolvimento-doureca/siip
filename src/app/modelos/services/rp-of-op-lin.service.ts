import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { RP_OF_OP_LIN } from "app/modelos/entidades/RP_OF_OP_LIN";
import { RP_OF_CAB } from "app/modelos/entidades/RP_OF_CAB";

@Injectable()
export class RPOFOPLINService {


  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_OF_OP_LIN) {
    return this.http
      .post(`http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/createRP_OF_OP_LIN`, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete('http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/deleteRP_OF_OP_LIN/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_OF_OP_LIN[]> {
    const url = `http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getRP_OF_OP_LIN`;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllbyid(id): Observable<RP_OF_OP_LIN[]> {
    const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getRP_OF_OP_LINid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRP_OF_OP_LINallid(id): Observable<RP_OF_OP_LIN[]> {
    const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getRP_OF_OP_LINallid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRP_OF_OP_LINOp(id): Observable<RP_OF_CAB[]> {
    const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getRP_OF_OP_LINOp/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRP_OF_OP_LIN(id): Observable<RP_OF_OP_LIN[]> {
    const url = 'http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/getRP_OF_OP_LIN/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: RP_OF_OP_LIN) {
    return this.http
      .put(`http://localhost:8080/app-0.0.1-SNAPSHOT/rest/siip/updateRP_OF_OP_LIN`, JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
