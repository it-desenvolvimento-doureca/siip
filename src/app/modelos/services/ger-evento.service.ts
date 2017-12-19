import { Injectable } from '@angular/core';
import { GER_EVENTO } from 'app/modelos/entidades/GER_EVENTO';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";

@Injectable()
export class GEREVENTOService {



  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: GER_EVENTO) {
    return this.http
      .post(webUrl.host + '/rest/siip/createGER_EVENTO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteGER_EVENTO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<GER_EVENTO[]> {
    const url = webUrl.host + '/rest/siip/getGER_EVENTO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<GER_EVENTO[]> {
    const url = webUrl.host + '/rest/siip/getGER_EVENTObyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidorigem(id,campo): Observable<GER_EVENTO[]> {
    const url = webUrl.host + '/rest/siip/getGER_EVENTObyidOrigem/' + id + '/'+campo;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  update(data: GER_EVENTO) {
    return this.http
      .put(webUrl.host + '/rest/siip/updateGER_EVENTO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
