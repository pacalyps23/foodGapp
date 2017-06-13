import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Deeplinks } from '@ionic-native/deeplinks';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Push, PushObject, PushOptions } from "@ionic-native/push";

import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module'
import { ListPage } from '../pages/list/list';
import { PendingPage } from '../pages/pending/pending';
import { WaitingPage } from '../pages/waiting/waiting';
import { DeliveredPage } from '../pages/delivered/delivered';
import { CompletePage } from '../pages/complete/complete';
import { PostPage } from '../pages/post/post';
import { ProgressPage } from '../pages/progress/progress';
import { SignupPage } from '../pages/signup/signup';
import { Geolocation } from '@ionic-native/geolocation';
import { VolStartScreenPage } from '../pages/vol-start-screen/vol-start-screen';
import { WayPointMapPage } from '../pages/way-point-map/way-point-map';
import { WaypointMap2Page } from '../pages/waypoint-map2/waypoint-map2';
import { PopupInfoWindowPage } from '../pages/popup-info-window/popup-info-window';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SignupTypePage } from '../pages/signup-type/signup-type';
import { HomePage } from '../pages/home/home';
import { MapComponent } from '../components/map/map.component';
import { SetAvailabilityPage } from '../pages/set-availability/set-availability';
import { HealthPartnerPage } from '../pages/health-partner/health-partner';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AuthService } from '../app/services/auth-service';

import { PickupService } from '../app/services/pickup.service';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MyApp,
    ListPage,
    PendingPage,
    WaitingPage,
    CompletePage,
    DeliveredPage,
    PostPage,
    ProgressPage,
    SignupPage,
    VolStartScreenPage,
    PopupInfoWindowPage,
    WayPointMapPage,
    WaypointMap2Page,
    SignupTypePage,
    MapComponent,
    SetAvailabilityPage,
    HealthPartnerPage,
    SignupTypePage
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PendingPage,
    WaitingPage,
    CompletePage,
    DeliveredPage,
    PostPage,
    ProgressPage,
    SignupPage,
    VolStartScreenPage,
    PopupInfoWindowPage,
    WayPointMapPage,
    WaypointMap2Page,
    SignupTypePage,
    SetAvailabilityPage,
    HealthPartnerPage,
    SignupTypePage

  ],
  providers: [
    LaunchNavigator,
    StatusBar,
    MapComponent,
    Geolocation,
    GoogleMaps,
    SplashScreen,
    Deeplinks,
    PickupService,

    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LaunchNavigator,
    AuthService
  ]
})
export class AppModule { }
