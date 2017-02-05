import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { HomePage } from '../home/home';
import { VideoService} from '../../providers/video-service';
import { LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search'

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [VideoService]
})

export class MainPage {
  public video: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public videoService: VideoService){
     this.loadVideos();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
 }
   loadVideos() {
    this.videoService.load()
      .then(videos => { 
        this.video = videos;
      });
  }

  search(){
    this.navCtrl.push(SearchPage);
  }
}