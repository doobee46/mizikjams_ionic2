import { Component } from '@angular/core';
import { NavController, NavParams, Events} from 'ionic-angular';
//import { HomePage } from '../home/home';
//import { VideoService} from '../../providers/video-service';
import { LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { VideodetailsPage } from '../videodetails/videodetails';
import { BackandService } from '../../providers/backandService';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})

export class MainPage {
 
  public items:any[] = [];
  public favorite: true;
  public  video : any;
  private pageSize: number = 20;
  private pageNumber: number = 1;
  private canLoadMore:boolean = true;
  private infiniteScroll:any;

 
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController, public menuCtrl: MenuController, 
  public toastCtrl: ToastController,public events: Events, public backandService:BackandService){
    this.menuCtrl.enable(true);
    this.getVideos();

   }

    ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');

    this.events.subscribe('MainPage:reload', () => {
      this.getVideos();
    });

  }

   getVideos() {
   this.backandService.getList('videos').subscribe(
      data => {
        console.log(data);
        this.items = data;
      },
      err => this.backandService.logError(err),
    () => console.log('OK')
    );
   }


   doRefresh(refresher) {
    console.log('async operation');

    if (this.infiniteScroll) {
      this.pageSize = 20;
      this.canLoadMore = true;
      this.infiniteScroll.enable(true);
    }

    refresher.complete();

    this.backandService.getList('videos').subscribe(
      data => {
        refresher.complete();
        console.log(data);
        this.items = data;
      },
      err => this.backandService.logError(err)
    );
  }


   doInfinite(infiniteScroll) {

    this.infiniteScroll = infiniteScroll;

    if (!this.canLoadMore) {
      return;
    }

    console.log('begin async operation');

    this.backandService.getList('videos',this.pageSize++ , this.pageNumber++).subscribe(
      data => {

        console.log(!data);

        if (data.length == 0) {
          this.canLoadMore = false;
          infiniteScroll.enable(false);
          return;
        }

        infiniteScroll.complete();
        console.log(data);
        this.items = this.items.concat(data);
      },
      err => {
        infiniteScroll.complete();
        this.backandService.logError(err)
      }
    );
  }

  search(){
    this.navCtrl.push(SearchPage);
  }

   
  playvideo(key,title,views,band){
    this.navCtrl.push(VideodetailsPage,{
        videokey: key,
        title: title,
        views: views,
        band: band
    });
   console.log(key);
  }
        

 }

