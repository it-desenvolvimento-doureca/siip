import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class CarService {

    handleError: any;
    teste: any[] = [];
    constructor(private http: Http) { }
    getHero() {
        const url = `http://localhost:8080/app-0.0.1-SNAPSHOT/rest/demo/user`;
        return this.http.get(url).toPromise()
            .then(response => {//console.log(response.json())
            return response})
            .catch(this.handleError);
    }

    getCarsMedium() {
        /*  return this.http.get('src/app/resources/data/cars-medium.json')
                      .toPromise()
                      .then(res => <Car[]> res.json().data)
                      .then(data => { return data; });*/
    }
}
