import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, NavParams, AlertController, MenuController} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SignupTypePage } from '../signup-type/signup-type';
import { AuthService } from '../../app/services/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage({
})

export class HomePage {
loading: Loading;
registerCredentials = {email: '', password: ''};

constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private menuCtrl:MenuController){
  this.menuCtrl.enable(false);
}

ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public createAccount(){
      this.navCtrl.push(SignupPage);
  }

  public goHome()
  {
    this.navCtrl.push(SignupTypePage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.menuCtrl.enable(true);
        this.navCtrl.setRoot(SignupTypePage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();
    }

    showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
