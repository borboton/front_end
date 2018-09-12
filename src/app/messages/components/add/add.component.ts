import { Message } from './../../../models/message';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Follow } from '../../../models/follow';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FollowService } from '../../../services/follow.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [MessageService, FollowService, UserService]
})
export class AddComponent implements OnInit {
  public title;
  public identity;
  public token;
  public url;
  public status;
  public message;
  public messageStatus;
  public follows;
  @Output() sended = new EventEmitter();


  constructor(
    private _messageService: MessageService,
    private _followService: FollowService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Enviar mensaje';
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.message = new Message('', this.identity._id, '', '', '', '');
    // this.message = new Message('', this.identity._id, '', '', '',  '');
    console.log(this.message)
   }

  ngOnInit() {
    console.log('addComponent');
    this.getMyFollows();
  }
  getMyFollows() {
    this._followService.getMyFollows(this.token, this.identity._id).subscribe(
      resp => {
        console.log(resp);
        this.follows = resp.follows;
      }, err => {

      }
    );
  }
  onSubmit(form) {
    console.log(this.message);
    this._messageService.addMessage(this.token, this.message).subscribe(
      resp => {
        form.reset();
        if (resp.message) {
          this.status = 'success';
          this.messageStatus = 'Mensaje enviado correctamente.';
          this.sended.emit({ send: true });
        } else {

        }
        // console.log(resp);
      }, err => {
        this.status = 'error';
          this.messageStatus = 'No se pudo enviar el mensaje.';

      }
    )
  }
}
