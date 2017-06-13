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

  title: string = 'Pickup Details';
  buttonText: string = 'Accept';
  buttonHandler: Function = this.confirm;

  // currentLocation: Object = new google.maps.LatLng(39.7472871, -75.54704149999999);
  // pickupLocation: Object = new google.maps.LatLng(39.7472871, -75.4);
  // dropOffLocation: Object = new google.maps.LatLng(39.77, -75.5570417);
  pickup: any;
  // currentLocation: any;
  // pickupLocation: any;
  // dropOffLocation: any;
  currentLocation: Object = new google.maps.LatLng(39.7472871, -75.54704149999999);
  pickupLocation: Object = new google.maps.LatLng(39.7472871, -75.4);
  dropOffLocation: Object = new google.maps.LatLng(39.77, -75.5570417);

  quantity: any;
  perishable: any;
  phone: any;
  location: any;

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
    this.perishable = this.navParams.get('perishable');
    this.phone = this.navParams.get('phone');
    this.location = this.navParams.get('location');
    console.log(this.phone);
    console.log(this.location);
    //this.pickupLocation = this.navParams.get('location');
    //this.dropOffLocation = new google.maps.LatLng(this.navParams.get('location'));
    console.log("THIS PICKUPLOCATION")
    console.log(typeof this.pickupLocation)
    
              
  }

  navigate(start, end) {
    let options: LaunchNavigatorOptions = {
        start: start
    };
    
    this.launchNavigator.navigate(end, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  confirm() {
    // navigate from current location to pickup
    this.navCtrl.push(WaypointMap2Page)
    this.navigate('Philadelphia, PA', 'Baltimore, MD');
     
  }

  pickupConfirmed() {
    //TODO: update pickup object to indicate the pickup was successfully made

    // navigate to dropoff location
    this.navigate('Wilmington, DE', 'Philadelphia, PA')
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['pickup']) {
  //       this.payload = this.pickup.quantity;
  //       this.locationName = this.pickup.destination.destinationName;
  //       this.phone = this.pickup.destination.destinationPhone;
  //       this.mapComponent;
  //   }
  // }

  ionViewDidLoad() {
    
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        this.mapComponent
        



      // this.pickupService.retrieveData((data) => {
      //   this.pickup = data[0];
      //   console.log(this.pickup)
      //   this.currentLocation = new google.maps.LatLng(
      //     position.coords.latitude,
      //     position.coords.longitude
      //   );
      //   this.pickupLocation = new google.maps.LatLng(
      //     this.pickup.destination.destinationLocation.lat,
      //     this.pickup.destination.destinationLocation.lng
      //   );
      //   this.dropOffLocation = new google.maps.LatLng(39.77, -75.5570417);
      //   console.log(this.pickupLocation);
      //   console.log(this.dropOffLocation);
      //   //this.mapComponent;
      // });
  
    })
  }
}
