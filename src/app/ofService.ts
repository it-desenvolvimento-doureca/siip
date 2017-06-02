import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ofService {

    constructor(private http: Http) { }


    getOF() {
        return this.http
            .get('assets/of.json')
            .map((res: Response) => res.json().data)
            .catch((error: any) => Observable.throw('Server error'));
    }

    getOP() {
        return this.http
            .get('assets/op.json')
            .map((res: Response) => res.json().data)
            .catch((error: any) => Observable.throw('Server error'));
    }
}
