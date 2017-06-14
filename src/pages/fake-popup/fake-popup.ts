import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeliveredPage } from '../delivered/delivered';
import { ProgressPage } from '../progress/progress';

/**
 * Generated class for the HealthPartnerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var window;
@IonicPage()
@Component({
    selector: 'page-fake-popup',
    templateUrl: 'fake-popup.html',
})
export class FakePopUpPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Fake');
    }

    volunteerInfo() {
        this.navCtrl.push(ProgressPage);
    }



}
