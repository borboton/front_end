import { UserService } from '../../services/user.service' ;
import { User } from '../../models/user' ;
import { Component, OnInit } from '@angular/core' ;  
import { Router, ActivatedRoute, Params } from '@angular/router' ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {
  public title: String;
  public user: User;
  public status: String;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User("","","","","","ROLE_USER","","");
    this.title = 'Login';
   }

  ngOnInit() {
  }
  onSubmit(form) {

    this._userService.login(this.user).subscribe(
      resp => {
        if (resp.user ) {
          this.identity = resp.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.getToken();
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      err => {
        console.log(err);
        this.status = 'error';
      }
    );
  }

  getToken() {
    this._userService.login(this.user, 'true').subscribe(
      resp => {
        console.log(resp);

        if (resp.token && resp.token.length > 0) {
          this.token = resp.token;
          localStorage.setItem('token', this.token);

          this.getCounters();
        } else {
          this.status = 'error';
        }
      },
      err => {
        console.log(err);
        this.status = 'error';
      }
    );
  }

  getCounters() {
    this._userService.getCounters().subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.following >= 0) {
          localStorage.setItem('stats', JSON.stringify(resp));

          this.status = 'success';
          this._router.navigate(['/home']);
        }

      },
      err => {
        console.log(err);
        this.status = 'error';
      }
    );
  }




}


