import { User } from '../models/user' ;
import { Observable } from 'rxjs/observable' ;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core' ;
import { GLOBAL } from './global' ;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: String;
  public identity;
  public token;
  public stats;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any> {
    // user.role = 'ROLE_USER';
    let params = JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'register', params, {headers: headers} );
  }

  login(user: any, gettoken = null): Observable<any> {
    // user.role = 'ROLE_USER';
    user.gettoken = gettoken;

    let params = JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', params, {headers: headers} );
  }

  update(user: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());

      let params = JSON.stringify(user);
      return this._http.put(this.url + 'update-user/' + user._id, params, {headers: headers} );

  }


  getUsers(page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());
    return this._http.get(this.url + 'users/' + page, {headers: headers});
  }

  getUser(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());
    return this._http.get(this.url + 'user/' + id, {headers: headers});
  }






  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== 'undefined') {
      this.identity = identity;
    }
    return this.identity;
  }

  getCounters(userId = null) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());

    if ( userId != null) {
      return this._http.get(this.url + 'counters/' + userId, { headers: headers });
    } else {
      return this._http.get(this.url + 'counters', { headers: headers });

    }

  }

  getStats(){
    let stats = JSON.parse(localStorage.getItem('stats'));

    if (stats !== 'undefined'){
      this.stats = stats;
    } else {
      this.stats = null;
    }

    return this.stats;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token !== 'undefined') {
      this.token = token;
    }
    return this.token;
  }
}
