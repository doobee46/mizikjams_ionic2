import { Component } from '@angular/core';
import { NavController,Platform, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { StatusBar, Splashscreen } from 'ionic-native';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  splash = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform) {
     this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.hide();
      Splashscreen.hide();
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');

    setTimeout(() => this.splash = false, 10000 );
  }

  navHome() {
    this.navCtrl.setRoot(HomePage);
  }

}




