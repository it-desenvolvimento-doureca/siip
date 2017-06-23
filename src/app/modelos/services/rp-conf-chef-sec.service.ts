import { Injectable } from '@angular/core';
import { RP_CONF_CHEF_SEC } from "app/modelos/entidades/RP_CONF_CHEF_SEC";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";

@Injectable()
export class RPCONFCHEFSECService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(data: RP_CONF_CHEF_SEC) {
    return this.http
      .post(webUrl.host+'/rest/siip/createRP_CONF_CHEF_SEC', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id) {
    return this.http
      .delete(webUrl.host+'/rest/siip/deleteRP_CONF_CHEF_SEC/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  getAll(): Observable<RP_CONF_CHEF_SEC[]> {
    const url = webUrl.host+'/rest/siip/getRP_CONF_CHEF_SEC';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  update(data: RP_CONF_CHEF_SEC) {
    return this.http
      .put(webUrl.host+'/rest/siip/updateRP_CONF_CHEF_SEC', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
