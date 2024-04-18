import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(number:string,password:string): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', {number,password});
  }
}
