import { GLOBAL } from '../../services/global';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FollowService } from '../../services/follow.service';
import { Follow } from '../../models/follow';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, FollowService]
})
export class UsersComponent implements OnInit {
  public title: string;
  public url: string;
  public token: string;
  public identity;
  public page: number;
  public next_page: number;
  public prev_page: number;
  public status: string;
  public total;
  public pages;
  public users: any;
  public follows: any;
  public followUserOver: any;



   constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
            private _followService: FollowService) {
    this.title = 'Usuarios';
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe( params => {
      let page = +params['page'];
      this.page = page;

      if (!params['page']) {
        page = 1;
      }


      if (!page) {
        this.page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;
        if ( this.prev_page <= 0 ) {
          this.prev_page = 1;
        }
      }
      this.getUsers();
    });
  }

  getUsers() {
    this._userService.getUsers(this.page).subscribe( resp => {
      if (!resp.users) {
        this.status = 'error';
      } else {
        console.log(resp);
        this.total = resp.total;
        this.users = resp.users;
        this.pages = resp.pages;
        this.follows = resp.users_following;
        if ( this.page > this.pages) {
          this._router.navigate(['/users/' + this.prev_page]);
        }
        // console.log(resp);
      }
    }, err => {
      this.status = 'error';
    });
  }

  mouseEnter(id) {
    this.followUserOver = id;

  }

  mouseLeave() {
    this.followUserOver = 0;

  }

  followUser(followed) {
    let follow = new Follow('', this.identity._id, followed);
    console.log(follow);
    this._followService.addFollow(this.token, follow).subscribe( resp => {
      if (!resp.follow) {
        this.status = 'error';
      } else {
        this.follows.push(followed);
      }
    }, err => {
      console.log(err);
    });
  }

  unfollowUser(id) {
    this._followService.deleteFollow(this.token, id).subscribe( resp => {
        let i = this.follows.indexOf(id);
        if (i !== -1) {
          this.follows.splice(i, 1);
        }

    }, err => {
      console.log(err);
    });
  }
}
