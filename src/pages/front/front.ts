import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage }from '../main/main';


@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class FrontPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
  }
  
  public browseVideos(){
    this.navCtrl.push(MainPage)
  }
}
