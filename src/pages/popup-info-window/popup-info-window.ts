import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { WayPointMapPage } from '../way-point-map/way-point-map';

/**
 * Generated class for the PopupInfoWindowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popup-info-window',
  templateUrl: 'popup-info-window.html',
})
export class PopupInfoWindowPage {
  @ViewChild('button') volButton: any;
  title: string;
  quantity: string;
  perishable: string;
  button: any;
  marker: any;
  location: any;
  phone: any;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public events: Events) {
    //I believe position get the LatLng, but if not, you can use
    this.marker = navParams.data.marker;
    this.title = navParams.data.marker.title;
    this.quantity = navParams.data.marker.quantity;
    this.perishable = navParams.data.marker.perishable;
    this.phone = navParams.data.marker.phone;
    this.location = navParams.get('position');

    console.log(this.location + "POPUP");

  }

  ionViewDidLoad() {
    this.buttons();
  }

  buttons() {
    // document.getElementById('button').innerHTML = '<button ion-button (click)="pushPage()" id="volunteerButton">Volunteer!</button>';
  }

  pushPage() {
      console.log(this.location + "POPUP2");
    this.navCtrl.push(WayPointMapPage, {
      title: this.title,
      quantity: this.quantity,
      perishable: this.perishable,
      phone: this.phone,
      location: this.location,
      marker:this.marker
    });

      this.viewCtrl.dismiss();
  }






}
