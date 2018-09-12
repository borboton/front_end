import { Follow } from '../../models/follow';
import { GLOBAL } from '../../services/global';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;
  public stats;
  public followed;
  public following;
  public status: string;
  public message;
  public url: string;
  public followUserOver;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
              private _followService: FollowService
            ) {
    this.title = 'Datos de usuario';
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.url = GLOBAL.url;
    this.followed = false;
    this.following = false;
  }

  ngOnInit() {
    this.loadPage();
  }
  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);
    }, err => {

    });
  }
  getUser(id) {
    this._userService.getUser(id).subscribe(
      resp => {
        console.log(resp);
        if (resp.user) {
          this.user = resp.user;
          if (resp.follows.following && resp.follows.following._id) {
            this.following = true;
          } else {
            this.following = false;
          }
          if (resp.follows.followed && resp.follows.followed._id) {
            this.followed = true;
          } else {
            this.followed = false;
          }
        } else {
          this.status = 'error';
        }
      }, err => {
        this.status = 'error';
      });
  }
  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      resp => {
        console.log(resp);
        this.stats = resp;
      }, err => {
        this.status = 'error';
      });
  }

  followUser(id) {
    let follow = new Follow('', this.identity._id, id);
    this._followService.addFollow(this.token,follow).subscribe(
      resp => {
        this.following = true;
      }, err => {
        console.error(err);
      }
    );
  }

  unfollowUser(id) {
    this._followService.deleteFollow(this.token, id).subscribe(
      resp => {
        this.following = false;
      }, err => {
        console.error(err);
      }
    );
  }

  mouseEnter(id) {
    this.followUserOver = id;

  }

  mouseLeave() {
    this.followUserOver = 0;

  }
}
