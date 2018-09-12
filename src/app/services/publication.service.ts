import { Publication } from '../models/publication';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  public url: String;
  public identity;
  public token;
  public stats;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addPublication(token, publication): Observable <any> {
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.post(this.url + 'publication', params, { headers: headers });
  }

  getPublications(token, page = 1): Observable <any> {
    // let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(this.url + 'publications/' + page, { headers: headers });
  }
  getPublicationsUser(token, userId, page = 1): Observable <any> {
    // let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(this.url + 'publications-user/' + userId + '/' + page, { headers: headers });
  }
  deletePublication(token, id): Observable <any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.delete(this.url + 'publication/' + id, { headers: headers });

  }



}
