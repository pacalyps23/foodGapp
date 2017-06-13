import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DeliveredPage} from '../delivered/delivered';

/**
 * Generated class for the HealthPartnerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var window;
@IonicPage()
@Component({
  selector: 'page-health-partner',
  templateUrl: 'health-partner.html',
})
export class HealthPartnerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     setTimeout(function(){navCtrl.push(DeliveredPage)},5000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthPartnerPage');
  }

  driverNumber: string = "tel:7184963016";
 
  callDriver() {
    window.location = this.driverNumber;
  }


}
