import { Component, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WaypointMap2Page } from '../waypoint-map2/waypoint-map2';
import { MapComponent } from '../../components/map/map.component';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { PickupService } from '../../app/services/pickup.service';

declare var google: any;

@IonicPage()
@Component({
  selector: 'way-point-map',
  templateUrl: 'way-point-map.html',
})
export class WayPointMapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  //map: any;

  pageTitle: string = 'Pickup Details';
  restaurantName: string;
  buttonText: string = 'Accept';
  buttonHandler: Function = this.confirm;

  //currentLocation: Object = new google.maps.LatLng(39.7472871, -75.54704149999999);

  // Array of lat, lng instead of LatLng object so it can be used
  // with native navigation
  currentLocation = []
  pickupLocation: Object =  { 
    googleMaps: new google.maps.LatLng(39.7472871, -75.4),
    navigator: [39.7472871, -75.4]
  };
  dropOffLocation: Object = {
    googleMaps: new google.maps.LatLng(39.77, -75.5570417),
    navigator: [39.77, -75.5570417]
  };
  location: any;
  pickup: any;
  // currentLocation: any;
  // pickupLocation: any;
  // dropOffLocation: any;

  quantity: any;
  perishable: any;
  phone: any;
  zoom: number = 13;
  loader: any;

  confirmed: boolean = false;
  payload: string;
  locationName: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private launchNavigator: LaunchNavigator, 
              private mapComponent: MapComponent, 
              private pickupService: PickupService) {

    this.quantity = this.navParams.get('quantity');
    this.restaurantName = this.navParams.get('title');
    this.perishable = this.navParams.get('perishable');
    this.phone = this.navParams.get('phone');
    console.log("THIS PICKUPLOCATION")
    this.location = this.navParams.get('location')
    console.log(this.location)

    this.pickupLocation['navigator'] = this.location;
    console.log(typeof this.location)
             
  }

  navigateTo(end) {
    let options: LaunchNavigatorOptions = {
        start: this.currentLocation
    };
    
    this.launchNavigator.navigate(end, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  confirm() {
    // navigate from current location to pickup
    this.navCtrl.push(WaypointMap2Page, {
      location: this.pickupLocation,
      finalLocation: this.dropOffLocation
    });
    this.navigateTo(this.pickupLocation['navigator']);
     
  }

  ionViewDidLoad() {  
    navigator.geolocation.getCurrentPosition((position) => {

      // current location used for native navigation only
      this.currentLocation = [ position.coords.latitude, position.coords.longitude ]
      this.mapComponent
    })
  }
}
