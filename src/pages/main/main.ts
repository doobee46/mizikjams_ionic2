import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { HomePage } from '../home/home';
import { VideoService} from '../../providers/video-service';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [VideoService]
})

export class MainPage {
  public video: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public videoService: VideoService){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }


}
