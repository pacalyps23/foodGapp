import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, Events, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { PopupInfoWindowPage } from '../popup-info-window/popup-info-window';
import { Http } from '@angular/http';
import { Deeplinks } from '@ionic-native/deeplinks';
import { NgZone } from '@angular/core';
import 'rxjs/add/operator/map';
import { DataService } from '../../app/services/data.service';
import { PickupService } from '../../app/services/pickup.service';


declare var google;


@IonicPage()

@Component({
  providers: [DataService, PickupService],
  selector: 'page-vol-start-screen',
  templateUrl: 'vol-start-screen.html',
})
export class VolStartScreenPage {

  @ViewChild('map') mapContainer: any;
  map: any;
  infoWindows: any;
  loader: any;
  public info: any;

  constructor(public navCtrl: NavController,
    private http: Http,
    public geolocation: Geolocation,
    public ngZone: NgZone,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public events: Events,
    public data: DataService,
    public pickupService: PickupService,
    public loadingCtrl: LoadingController,
    private deeplinks: Deeplinks) {
    this.infoWindows = [];
  }




  ionViewDidLoad() {
    this.loader = this.getLoader();
    this.loader.present();
    this.displayGoogleMap();
    //this.loadPeople();


  }


  getLoader() {
    let loader = this.loadingCtrl.create({
      content: "Loading. . ."
    });
    return loader;
  }

  displayGoogleMap() {
    this.geolocation.getCurrentPosition().then(position => {
      this.loader.dismiss();
      // let zipCode = new google.maps.LatLng( 39.746323, -75.563192);
      let current = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: current,
        disableDefaultUI: true,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      this.myMarker(current);

      const markers = function () {
        this.getMarkers();
        // this.loader.dismiss();
      }
      setTimeout(markers.bind(this), 1000);

    }).catch((error) => {
      console.log('Error getting location', error);
    });




  }
  myMarker(position) {
    //var position = new google.maps.LatLng(marker.latitude, marker.longitude);
    var image = {
      icon: new google.maps.MarkerImage('assets/img/ball4.gif'),
      size: new google.maps.Size(10, 8),

    };
    var currentPositionIcon = new google.maps.Marker({
      optimized: false,
      position: position,
      icon: image.icon
    });
    currentPositionIcon.setMap(this.map);

  }

  getMarkers() {

    this.http.get('assets/data/pickups.json')
      .map((res) => res.json())
      .subscribe(data => {
        this.addMarkersToMap(data);
      });

  }

  loadPeople() {
    // this.pickupService.retrieveData((data) => {
    //   this.addMarkersToMap(data);
    // });

    // this.pickupService.retrieveData(this.data)
    // .then(data => {
    //   this.info = data;
    // });
  }



  markerInfo(marker) {

    marker.addListener('click', () => {
      var position = marker.position;
      //console.log(marker.position+ "THIS");
      //console.log(position+" VOL SCREEN HERE TOO");
      let popover = this.popoverCtrl.create(PopupInfoWindowPage, { marker: marker, position: position });
      popover.present({

      });
      
    });

  }



  addMarkersToMap(markers) {

    for (let marker of markers) {
      console.log(marker);
      console.log();
      // var position2 = new google.maps.LatLng(marker.latitude, marker.longitude);
      var position = new google.maps.LatLng(marker.donor.donorLocation.lat, marker.donor.donorLocation.lng);
    console.log(position)
      var restaurantMarkerClick = new google.maps.Marker({
        position: position,
        title: marker.donor.donorName,
        quantity: marker.quantity,
        perishable: marker.isPerishable,
        latitude: marker.latitude,
        pickupId:marker.donor.pickupid,
        longitude: marker.longitude,
        animation: google.maps.Animation.DROP
      });

      console.log();
      restaurantMarkerClick.setMap(this.map);
      this.markerInfo(restaurantMarkerClick);


    }
  }





}
