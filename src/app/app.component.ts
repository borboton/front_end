import { GLOBAL } from './services/global';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from './services/user.service';
import { Component, OnInit, DoCheck } from '@angular/core' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent implements OnInit, DoCheck {
  title = 'WebRedSocial';
  public identity;
  public url;

  constructor( private _userService: UserService,
              private _route: ActivatedRoute,
              private _router: Router ) {
                this.url = GLOBAL.url;
  }
  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/home']);
  }
}
