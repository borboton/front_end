import { UserGuard } from './../services/user.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SendedComponent } from './components/sended/sended.component';
import { MainComponent } from './components/main/main.component';
import { CommonModule } from '@angular/common';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';


const messagesRoutes: Routes = [
  {
    path: 'mensajes',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'enviar', pathMatch: 'full'},
      {path: 'enviar', component: AddComponent, canActivate: [UserGuard]},
      {path: 'ver', component: ReceivedComponent, canActivate: [UserGuard]},

      {path: 'recibidos', component: ReceivedComponent, canActivate: [UserGuard]},
      {path: 'enviados', component: SendedComponent, canActivate: [UserGuard]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(messagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class MessagesRoutingModules {}
