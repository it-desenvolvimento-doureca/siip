import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { RP_CONF_OP_NPREV } from "app/modelos/entidades/RP_CONF_OP_NPREV";
import { webUrl } from "webUrl";

@Injectable()
export class RPCONFOPNPREVService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_CONF_OP_NPREV) {
    return this.http
      .post(webUrl.host+'/rest/siip/createRP_CONF_OP_NPREV', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id) {
    return this.http
      .delete(webUrl.host+'/rest/siip/deleteRP_CONF_OP_NPREV/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_CONF_OP_NPREV[]> {
    const url = webUrl.host+'/rest/siip/getRP_CONF_OP_NPREV';
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