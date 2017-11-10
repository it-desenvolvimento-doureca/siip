import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { RP_CONF_OP } from "app/modelos/entidades/RP_CONF_OP";
import { webUrl } from "webUrl";

@Injectable()
export class RPCONFOPService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_CONF_OP) {
    return this.http
      .post(webUrl.host+'/rest/siip/createRP_CONF_OP', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getAll(): Observable<RP_CONF_OP[]> {
    const url = webUrl.host+'/rest/siip/getRP_CONF_OP';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

    delete(id) {
    return this.http
      .delete(webUrl.host+'/rest/siip/deleteRP_CONF_OP/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RP_CONF_OP) {
    return this.http
      .put(webUrl.host+'/rest/siip/updateRP_CONF_OP', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

    getAllbyid(id): Observable<RP_CONF_OP[]> {
    const url = webUrl.host+'/rest/siip/getRP_CONF_OPbyid/'+id+'';
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
