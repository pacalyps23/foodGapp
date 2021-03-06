import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapComponent } from '../../components/map/map.component';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

var google:any;
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mapComponent: MapComponent,
              public launchNavigator: LaunchNavigator) {
  }

  pickupConfirmed() {

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
