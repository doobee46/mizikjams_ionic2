import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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

  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages =[
      {title: 'Profile',  component: ProfilePage},
      {title: 'Playlist', component: PlaylistPage}
    ];
  }

  openPage(page){
    this.nav.setRoot(page.component);
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