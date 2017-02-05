import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { IntroPage } from '../pages/intro/intro';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { PlaylistPage } from '../pages/playlist/playlist';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 @ViewChild(Nav) nav: Nav;

  rootPage = IntroPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public alertCtrl: AlertController) {
    this.initializeApp();

    this.pages =[
      {title: 'Profile',  component: ProfilePage},
      {title: 'Playlist', component: PlaylistPage}
    ];
  }

  openPage(page){
    this.nav.setRoot(page.component);
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
  }
  
 initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}