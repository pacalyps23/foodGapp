
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '../../shared/location';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CompletePage } from '../complete/complete';
import { PopupInfoWindowPage } from '../popup-info-window/popup-info-window';
/**
 * Generated class for the ProgressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var window;
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html',
})
export class ProgressPage {



  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  title: string = 'Pickup Details';
  buttonText: string = 'Accept';
  currentLocation: any;
  pickupLocation: any;
  dropOffLocation: Location;
  zoom: number = 13;
  loader: any;
  lat: number;
  lng: number;
  confirmed: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private launchNavigator: LaunchNavigator) {
      console.log(navParams.data);
     setTimeout(function(){navCtrl.push(CompletePage)},15000);
  }



  confirm() {
    let options: LaunchNavigatorOptions = {
      start: 'London, ON'
    };

    this.launchNavigator.navigate('Toronto, ON', options)
      .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
      );

    // this.confirmed = true;
    // this.buttonText = 'Dropoff Complete!'
  }

  loadMap() {
    let LatLng = new google.maps.LatLng(39.7472871, -75.54704149999999);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      })
    }

    let mapOptions = {
      center: LatLng,
      zoom: 14,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  startNavigating() {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);

    directionsService.route({
      origin: new google.maps.LatLng(39.7472871, -75.54704149999999),
      destination: new google.maps.LatLng(39.7472879, -75.3),
      waypoints: [{
        location: new google.maps.LatLng(39.7472871, -75.4),
        stopover: true

      }],
      travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(res);

      } else {
        console.warn(status);
      }
    })
  }

  driverNumber: string = "tel:7184963016";
  callDriver() {
    window.location = this.driverNumber;
  }

  ionViewDidLoad() {

    this.startNavigating();
  }

  ionViewWillEnter() {
    this.loadMap();
  }
}






