import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class UserlistService {
  path = 'http://localhost:3000';
  constructor(private http: Http) { }

  // get all users service
  getUserList() {
    return this.http.get(`${this.path}/userlist`).map(response => response.json());
  }

}
