import { Router, ActivatedRoute, Params } from '@angular/router' ;
import { User } from '../../models/user';
import { Component, OnInit } from '@angular/core' ;
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title: String;
  public user: User;
  public status: String;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User("","","","","","ROLE_USER","","");
    this.title = 'Registrate';
   }
  ngOnInit() {
  }
  onSubmit(form) {
    // console.log(this.user);
    this._userService.register(this.user).subscribe(
      resp => {
        console.log(resp);

        if (resp.user && resp.user._id) {
          console.log(resp.user);
          this.status = 'success';
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
