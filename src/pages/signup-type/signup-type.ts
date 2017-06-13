import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostPage } from '../post/post';
import { VolStartScreenPage } from '../vol-start-screen/vol-start-screen';
import { SetAvailabilityPage } from '../set-availability/set-availability';
import { AuthService } from '../../app/services/auth-service';
import { MyApp } from '../../app/app.component';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the SignupTypePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup-type',
  templateUrl: 'signup-type.html',
})


export class SignupTypePage {
  email = 'N/A';
  name = 'Guest';


  constructor(private navCtrl: NavController, private auth: AuthService) {
    let info = this.auth.getUserInfo();
    if(info == undefined)
    {
      this.email;
      this.name;
    }
    else{

      this.email = info['email'];
      this.name = info['fname'];

    }

  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot('HomePage');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupTypePage');
  }
  volunteer: boolean;
  donate: boolean;
  acceptDonate: boolean;

 continue() {
    if (this.volunteer) {
      this.navCtrl.push(VolStartScreenPage);
    }
    else if(this.donate)
    {
      this.navCtrl.push(PostPage);
    }
    else if(this.acceptDonate)
    {
      this.navCtrl.push(SetAvailabilityPage);
    }
  }

  volunteerTrue(){
    this.volunteer =true;
    this.donate = false;
    this.acceptDonate=false;
  }

  donateTrue(){
    this.donate =true;
    this.volunteer = false;
    this.acceptDonate=false;
  }
  partnerTrue(){
    this.acceptDonate=true;
    this.volunteer = false;
    this.donate = false;
  }

}
