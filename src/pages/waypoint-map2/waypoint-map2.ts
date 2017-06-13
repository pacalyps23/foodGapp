import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapComponent } from '../../components/map/map.component';
import { SignupTypePage } from '../../pages/signup-type/signup-type';
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


  location: Object =  { 
    googleMaps: new google.maps.LatLng(39.7472871, -75.4),
    navigator: [39.7472871, -75.4]
  };

  finalLocation: any;
  buttonText: string = 'Pickup Complete?'
  buttonHandler = this.pickupConfirmed;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mapComponent: MapComponent,
              public launchNavigator: LaunchNavigator) {

      if (this.navParams.data.finalLocation) {
        this.finalLocation = this.navParams.data.finalLocation;
      }
      if (this.navParams.data.location) {
        this.location = this.navParams.data.location;
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
      location: this.finalLocation,
      buttonText: "Dropoff Complete?",
      buttonHandler: this.dropOffComplete
    });
    this.continueNavigating();
  }

  dropOffComplete() {
    this.navCtrl.push(SignupTypePage);
  }

  continueNavigating() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

          let options: LaunchNavigatorOptions = {
            start: [position.coords.latitude, position.coords.longitude]
        };
            this.launchNavigator.navigate(this.location['navigator'], options)
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
