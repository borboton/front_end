import { GLOBAL } from '../../services/global';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PublicationService, UploadService]
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public url;
  public stats;
  public status;
  public publication: any;
  public filesToUpload: Array<File>;

  @Output() sended = new EventEmitter();

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _updloadService: UploadService
  ) {
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.stats = _userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication('', this.identity._id, '', '', '');
  }

  ngOnInit() {
  }

  fileChangeEvent(fileInput: any ) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }
  onSubmit(form) {
    // console.log(this.filesToUpload);
    this._publicationService.addPublication(this.token, this.publication).subscribe(
          resp => {

            if (resp.publication) {
              // console.log(resp);
              this.publication = resp.publication;


              if (this.filesToUpload && this.filesToUpload.length > 0  ) {
                // console.log('this.filesToUpload > 0');
                this._updloadService.makeFileRequest('upload-image-pub', resp.publication._id, [], this.filesToUpload, this.token, 'image')
                                    .then( (response: any) => {
                                      console.log('upload ok: ' , response);
                                      form.reset();
                                      this.status = 'success';
                                      $('.alert').slideUp(3000);
                                      this.publication.file = response.image;
                                      this.sendPublication(response);
                                    }).catch(

                                    );
                } else {
                  this.status = 'success';
                  $('.alert').slideUp(3000);
                  form.reset();
                  this.sendPublication(resp);
                  this._router.navigate(['/timeline']);
                }
            } else {
              this.status = 'error';

            }
          }, err => {
            this.status = 'error';
          }
     );
  }

  sendPublication(event) {

    this.sended.emit({ send: true });
  }

}
