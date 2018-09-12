import { GLOBAL } from '../../services/global';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService]

})
export class UserEditComponent implements OnInit {
  public title: string;
  public user: any;
  public identity;
  public token;
  public status: string;
  public filesToUpload: Array<File>;
  public message;
  public url: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
            private _uploadService: UploadService) {
    this.title = 'Mis Datos';
    this.user = _userService.getIdentity();
    this.identity = this.user;
    this.token = _userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

  onSubmit(form) {
    // console.log(form);
    // console.log(this.user);
    this._userService.update(this.user).subscribe(
      resp => {
        // console.log(resp);

        if (resp.user && resp.user._id) {
          // console.log(resp.user);
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
          if (this.filesToUpload.length > 0 && this.filesToUpload ) {
            this._uploadService.makeFileRequest('update-image-user', this.user._id, [], this.filesToUpload, this.token, 'image')
                                .then((result: any) => {
                                  // console.log(result.user);
                                  this.user.image = result.user.image;
                                  localStorage.setItem('identity', JSON.stringify(this.user));

                                }).catch((err) => {
                                  // console.log(err.error.message);
                                });
            }
          // form.reset();
        } else {
          this.status = 'error';
          this.message = resp.message;
        }
      },
      err => {
        this.status = 'error';
        this.message = err.error.message;
        console.log(err);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // console.log(this.filesToUpload);
  }
}
