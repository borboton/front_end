import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public url: String;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addMessage(token, message): Observable <any> {
    let params = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.post(this.url + 'message', params, { headers: headers });

  }

  getMyMessages(token, page = 1): Observable <any> {
    // let params = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(this.url + 'my-messages/' + page , { headers: headers });

  }

  getSendMessages(token, page = 1): Observable <any> {
    // let params = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(this.url + 'messages/' + page , { headers: headers });

  }
  getAllMessages(token, page = 1): Observable <any> {

    // let params = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(this.url + 'all-messages' , { headers: headers });

  }
}
