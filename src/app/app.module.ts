import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { MainPage } from '../pages/main/main';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../pages/intro/intro';
//import { ProfilePage } from '../pages/profile/profile';
import { PlaylistPage } from '../pages/playlist/playlist';
import { AuthService } from '../providers/auth-service';
import { VideoService } from '../providers/video-service';
import { SearchPage } from  '../pages/search/search';
import { ResetPasswordPage } from '../pages/resetpassword/resetpassword';


 
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '4d86ccd8'
  }
};

import * as firebase from 'firebase';

    export const firebaseConfig = {
      apiKey: "AIzaSyCf4h-LHMweQH7sJPgUgSpwhBphjMk-WHI",
      authDomain: "mizikjams.firebaseapp.com",
      databaseURL: "https://mizikjams.firebaseio.com",
      storageBucket: "mizikjams.appspot.com",
      messagingSenderId: "243758758487"
    };
    firebase.initializeApp(firebaseConfig); 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    MainPage,
    IntroPage,
    //ProfilePage,
    PlaylistPage,
    SearchPage,
    ResetPasswordPage
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
    RegistrationPage,
    MainPage,
    IntroPage,
    //ProfilePage,
    PlaylistPage,
    SearchPage,
    ResetPasswordPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage,AuthService,VideoService]
})
export class AppModule {}
