import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title: String;
  constructor() {
    this.title = 'Bienvenidos !';
  }

  ngOnInit() {
    console.log('home component front_end');
  }

}
