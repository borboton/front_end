import { GLOBAL } from '../../services/global';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService, PublicationService]
})
export class TimelineComponent implements OnInit {
  public title: string;
  public user: any;
  public identity;
  public token;
  public status: string;
  public filesToUpload: Array<File>;
  public message;
  public url: string;
  public page;
  public publications: Publication [];
  public total;
  public pages;
  public items_per_page;
  public noMore = false;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    // this.stats = _userService.getStats();
    this.url = GLOBAL.url;
    this.page = 1;
    // this.publication = new Publication('', this.identity._id, '', '', '');
  }

  ngOnInit() {
    this.getPublications(this.page);
  }

  getPublications(page = 1, adding = false) {
    console.log(page);
    this._publicationService.getPublications(this.token, page).subscribe(
      resp => {
        console.log(resp);
        if (resp.publications) {
          if (!adding) {
            this.publications = resp.publications;
          } else {
            this.publications = this.publications.concat(resp.publications);
            // let arrayA = this.publications;
            // let arrayB = resp.publications;
            $("html, body").animate({ scrollTop: $('body').prop('scrollHeight') }, 500);
          }
          if (this.publications.length === resp.total  ) {
            this.noMore = true;
          }
          this.items_per_page = resp.items_per_page;
          this.total = resp.total;
          this.pages = resp.pages;
          if (page > this.pages) {
            this._router.navigate(['/home']);
          }
          // this.status = 'success';
        } else {
          this.message = resp.message;
          this.status = 'info';
        }
      }, err => {
        this.status = 'error';
        this.message = 'No se pudieron obtener las publicaciones';
      }
    );
  }

  viewMore() {
      this.page += 1;
      this.getPublications(this.page, true);
  }

  refresh(event) {
    this.page = 1;
    this.getPublications(this.page);
  }

  deletePublication(id) {
    this._publicationService.deletePublication(this.token, id).subscribe((resp) => {
      this.refresh(resp);
      this.message = resp.message;
      this.status = 'info';
      $('.alert').slideUp(3000);
    }, err => {
    });
  }
}
