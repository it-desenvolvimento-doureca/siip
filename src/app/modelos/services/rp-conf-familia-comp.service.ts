import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";
import { RP_CONF_FAMILIA_COMP } from "app/modelos/entidades/RP_CONF_FAMILIA_COMP";


@Injectable()
export class RPCONFFAMILIACOMPService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_CONF_FAMILIA_COMP) {
    return this.http
      .post(webUrl.host+'/rest/siip/createRP_CONF_FAMILIA_COMP', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id) {
    return this.http
      .delete(webUrl.host+'/rest/siip/deleteRP_CONF_FAMILIA_COMP/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_CONF_FAMILIA_COMP[]> {
    const url = webUrl.host+'/rest/siip/getRP_CONF_FAMILIA_COMP';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getcodfam(codfam): Observable<RP_CONF_FAMILIA_COMP[]> {
    const url = webUrl.host+'/rest/siip/getRP_CONF_FAMILIA_COMPcodfam/'+codfam;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: RP_CONF_FAMILIA_COMP) {
    return this.http
      .put(webUrl.host+'/rest/siip/updateRP_CONF_FAMILIA_COMP', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}