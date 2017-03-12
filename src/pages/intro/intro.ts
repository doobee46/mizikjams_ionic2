import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  splash = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');

    setTimeout(() => this.splash = false, 10000 );
  }

  navHome() {
    this.navCtrl.setRoot(HomePage);
  }
}


