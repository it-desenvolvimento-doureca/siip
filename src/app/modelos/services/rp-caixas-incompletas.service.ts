import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";
import { RP_CAIXAS_INCOMPLETAS } from '../entidades/RP_CAIXAS_INCOMPLETAS';

@Injectable()
export class RPCAIXASINCOMPLETASService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_CAIXAS_INCOMPLETAS) {
    return this.http
      .post(webUrl.host + '/rest/siip/createRP_CAIXAS_INCOMPLETAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/siip/deleteRP_CAIXAS_INCOMPLETAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_CAIXAS_INCOMPLETAS[]> {
    const url = webUrl.host + '/rest/siip/getRP_CAIXAS_INCOMPLETAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<RP_CAIXAS_INCOMPLETAS[]> {
    const url = webUrl.host + '/rest/siip/getRP_CAIXAS_INCOMPLETASbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid_of_cab(id): Observable<RP_CAIXAS_INCOMPLETAS[]> {
    const url = webUrl.host + '/rest/siip/getRP_CAIXAS_INCOMPLETASbyid_of_cab/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  update(data: RP_CAIXAS_INCOMPLETAS) {
    return this.http
      .put(webUrl.host + '/rest/siip/updateRP_CAIXAS_INCOMPLETAS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
