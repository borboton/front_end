import { Message } from './../../../models/message';
import { Component, OnInit, DoCheck } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Follow } from '../../../models/follow';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FollowService } from '../../../services/follow.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MessageService, FollowService, UserService]
})
export class MainComponent implements OnInit {
  public title;
  public identity;
  public token;
  public url;
  public status;
  public messages;
  public messageStatus;
  public follows;
  page: number;

  constructor(
    private _messageService: MessageService,
    private _followService: FollowService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Chats';
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
   }

   ngOnInit() {
    // this.getMessages();
    this.getAllMessages();
  }


  getAllMessages() {
    this._messageService.getAllMessages(this.token).subscribe(
      resp => {

        if (resp.messages) {
          this.messages = [];
          this.messages = resp.messages;
        } else {

        }
        console.log(resp);
      }, err => {
        this.status = 'error';
          this.messageStatus = 'No se pudo obtener los mensajes.';

      }
    );
  }
  openConversation(userId) {
    console.log(userId);
  }
  refresh(event) {
    console.log('refreshhh');
  }

}
