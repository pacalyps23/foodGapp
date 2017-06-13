import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2PushApp } from './push-notification';

@NgModule({
  declarations: [
    Ionic2PushApp,
  ],
  imports: [
    IonicPageModule.forChild(Ionic2PushApp),
  ],
  exports: [
    Ionic2PushApp
  ]
})
export class PushNotificationPageModule {}
