import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapComponent } from '../../components/map/map.component';
import { VolStartScreenPage } from '../../pages/vol-start-screen/vol-start-screen';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

declare var google:any;

/**
 * Generated class for the WaypointMap2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-waypoint-map2',
  templateUrl: 'waypoint-map2.html',
})
export class WaypointMap2Page {


  pickupLocation: Object = new google.maps.LatLng(39.7472871, -75.4);

  buttonText: string = 'Pickup Complete?'
  buttonHandler = this.pickupConfirmed;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mapComponent: MapComponent,
              public launchNavigator: LaunchNavigator) {

      if (this.navParams.data.location) {
        this.pickupLocation = this.navParams.data.location;
      }
      if (this.navParams.data.buttonText) {
        this.buttonText = this.navParams.data.buttonText;
      }
      if (this.navParams.data.buttonHandler) {
        this.buttonHandler = this.navParams.data.buttonHandler;
      }
  }

  pickupConfirmed() {
    this.navCtrl.push(WaypointMap2Page, {
      location: new google.maps.LatLng(39.77, -75.5570417),
      buttonText: "Dropoff Complete?",
      buttonHandler: this.dropOffComplete
    });
    //this.buttonText = "DropOff Complete?"
    //this.buttonHandler = this.dropOffComplete
    this.continueNavigating();
  }

  dropOffComplete() {
    this.navCtrl.push(VolStartScreenPage);
  }

  continueNavigating() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

          let options: LaunchNavigatorOptions = {
            start: [position.coords.latitude, position.coords.longitude]
        };
            this.launchNavigator.navigate('Baltimore, MD', options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );

      })
    }

  }

  ionViewDidLoad() {

  }

}
