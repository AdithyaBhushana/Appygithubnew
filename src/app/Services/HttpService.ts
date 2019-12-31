import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }
  getData(uri: string): Observable<any> {
    return this.http.get(uri);
  }

}
