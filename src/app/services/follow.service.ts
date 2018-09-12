import { Follow } from '../models/follow';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';


@Injectable()

export class FollowService {

  public url: String;
  public identity;
  public token;
  public stats;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addFollow(token, follow): Observable<any> {
    // console.log(follow)
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    let params = JSON.stringify(follow);

    return this._http.post(this.url + 'follow', params, {headers: headers});
  }

  deleteFollow(token, id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);

    return this._http.delete(this.url + 'follow/' + id, { headers: headers });
  }

  getFollowing(token, user_id = null, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
                                    // console.log(user_id,page)
    let url = this.url + 'following/' + page;
    if (user_id !== null ) {
      url = this.url + 'following/' + page + '/' + user_id;
    }
    return this._http.get(url, { headers: headers });
  }

  getMyFollows(token, id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(this.url + 'get-my-follows', { headers: headers });
  }
}
