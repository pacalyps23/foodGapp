import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FakePopUpPage } from './fake-popup';

@NgModule({
  declarations: [
    FakePopUpPage,
  ],
  imports: [
    IonicPageModule.forChild(FakePopUpPage),
  ],
  exports: [
    FakePopUpPage
  ]
})
export class FakePopUpPageModule {}
