import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { HomePage } from '../home/home';
import { VideoService} from '../../providers/video-service';
import { LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})

export class MainPage {
  public videos: any;
  public favorite: true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController, public videoService: VideoService, 
  public menuCtrl: MenuController,public toastCtrl: ToastController){
    //this.videos = this.videoService.getVideos();
    this.menuCtrl.enable(true);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    //this.videos = this.videoService.getVideos();
    let loader = this.loadingCtrl.create({
      content: 'Loading...',
    });

    loader.present().then(() => {
      this.videoService.getVideos()
        .subscribe(res => {
          setTimeout(() => {
            this.videos = this.videoService.getVideos();
            loader.dismiss();
          }); 
        });
        
    });

 }
  
  search(){
    this.navCtrl.push(SearchPage);
  }

  tapEvent(e){
    this.favorite = true;
    let toast = this.toastCtrl.create({
      message: `you just hearted a video`,
      duration: 2000
    });
    toast.present();
  }


}