import { Component, ViewChild,NgZone } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { IntroPage } from '../pages/intro/intro';
//import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
//import { RegistrationPage } from '../pages/registration /registration';
import { PlaylistPage } from '../pages/playlist/playlist';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { AuthService } from '../providers/auth-service';
import { MenuController } from 'ionic-angular';
import  firebase  from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 @ViewChild(Nav) nav: Nav;

  rootPage: any;

  currentuser = firebase.auth().currentUser;

  pages: Array<{title: string, component: any}>;
  
  zone: NgZone;

  constructor(platform: Platform, public alertCtrl: AlertController,public authData: AuthService, public menuCtrl: MenuController) {
    this.zone = new NgZone({})
    
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = IntroPage;
          unsubscribe();
        } else { 
          this.rootPage = MainPage;
          unsubscribe();
        }
      });     
    });

   this.pages =[
      {title: 'Profile',  component: ProfilePage},
      {title: 'View Playlists', component: PlaylistPage}
    ];


   platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page){
    this.nav.setRoot(page.component);
    this.menuCtrl.close();
  }

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Create Playlist',
      message: "Enter a name for this new Playlist",
      inputs: [
        {
          name: name,
          placeholder: 'name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
 }
  
  openMain(){
    this.nav.setRoot(MainPage);
    this.menuCtrl.close();
  }

  logOut(){
    this.authData.logoutUser().then(() => {
    this.nav.setRoot(HomePage);
  });
  this.menuCtrl.close();
 }  



}