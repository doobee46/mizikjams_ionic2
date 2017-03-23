import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MainPage } from '../pages/main/main';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../pages/intro/intro';
import { FrontPage } from '../pages/front/front';
//import { ProfilePage } from '../pages/profile/profile';
import { PlaylistPage } from '../pages/playlist/playlist';
import { BackandService } from '../providers/backandService';
import { AdMobPro } from '../providers/admobpro';
import { SearchPage } from  '../pages/search/search';
//import { ResetPasswordPage } from '../pages/resetpassword/resetpassword';
import { VideodetailsPage } from'../pages/videodetails/videodetails';
import { CategoryPage }from '../pages/category/category';

 
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '4d86ccd8'
  }
};

/*import * as firebase from 'firebase';

    export const firebaseConfig = {
      apiKey: "AIzaSyCf4h-LHMweQH7sJPgUgSpwhBphjMk-WHI",
      authDomain: "mizikjams.firebaseapp.com",
      databaseURL: "https://mizikjams.firebaseio.com",
      storageBucket: "mizikjams.appspot.com",
      messagingSenderId: "243758758487"
    };
    firebase.initializeApp(firebaseConfig); */

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    MainPage,
    IntroPage,
    //ProfilePage,
    PlaylistPage,
    SearchPage,
    //ResetPasswordPage,
    VideodetailsPage,
    FrontPage,
    CategoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    MainPage,
    IntroPage,
    //ProfilePage,
    PlaylistPage,
    SearchPage,
    //ResetPasswordPage,
    VideodetailsPage,
    FrontPage,
    CategoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage, BackandService,AdMobPro]
})
export class AppModule {}
