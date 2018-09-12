import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit {
  public title;

   constructor(private route: ActivatedRoute) {
    this.title = 'Mensajes';
   }

   ngOnInit() {

     this.route.params.subscribe(params => {
       let user = params['user'];
      console.log(params)
     });
   }

}
