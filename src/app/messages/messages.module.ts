import { MomentModule } from 'angular2-moment';
import { UserGuard } from '../services/user.guard';
import { UserService } from '../services/user.service';
import { SendedComponent } from './components/sended/sended.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
// RUTAS
import { MessagesRoutingModules } from './messages-routing.component';

@NgModule({
  declarations: [
    MainComponent,
    AddComponent,
    ReceivedComponent,
    SendedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    MessagesRoutingModules
  ],
  exports: [
    MainComponent,
    AddComponent,
    ReceivedComponent,
    SendedComponent
  ],
  providers: [UserGuard, UserService]
})

export class MessagesModule {}
