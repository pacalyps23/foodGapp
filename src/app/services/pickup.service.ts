import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class PickupService {

  data:any;

  constructor(private http: Http) {
    this.http = http;
    this.data = null;
  }

  retrieveData(callback) {
    this.http.get('../../assets/data/pickups.json')
  
    .subscribe(data => {
      callback(data.json())
    });
  }

  toRadians(num: number) {
    return num*Math.PI/180;
  }

  findDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    let lat1Rads = this.toRadians(lat1);
    let lat2Rads = this.toRadians(lat2);
    let latDiff = this.toRadians(lat2-lat1);
    let lngDiff = this.toRadians(lng2-lng1);
    let a = Math.sin(latDiff/2) * Math.sin(latDiff/2) +
          Math.cos(lat1Rads) * Math.cos(lat2Rads) *
          Math.sin(lngDiff/2) * Math.sin(lngDiff/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return c * 3959; //radius of earth = 3959mi
  }

  getPickupsForVolunteer(lat: number, lng: number) {
    this.retrieveData((data) => {
      console.log(data)
        return data.filter((item) => item["status"] === "open"
            && this.findDistance(item.donor.donorLocation.lat,
              item.donor.donorLocation.lng, lat, lng) <= 15)
    });

  }


  getPickupByPickupid(pickupid: number) {
    this.retrieveData((data) => {
      return data.filter((item) => item["pickupid"] === pickupid);
    });
    
  }

  getNumberOfPickupsByUserid(userid: number) {
    //this would be used to get the number of pickups
    //made by an individual driver so that we can
    //gamify the app.
    return 0;
  }

}
