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
import { AdMobPro } from '../../providers/admobpro';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})

export class MainPage {
 
  public  items:any[] = [];
  public  favorite: true;
  public  views:any;
  public  deep: true;
  public  id:string;
  public  heart:number;
  private pageSize: number = 20;
  private pageNumber: number = 1;
  private canLoadMore:boolean = true;
  private infiniteScroll:any;

  searchQuery: string;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController, public menuCtrl: MenuController, 
  public toastCtrl: ToastController,public events: Events, public backandService:BackandService,
  private adMobPro: AdMobPro){
    this.searchQuery = '';
    this.menuCtrl.enable(true);
    this.getVideos();
   

    this.backandService.on("items_updated")
            .subscribe(
                data => {
                    console.log("items_updated", data);
                    let a = data as any[];
                    let newItem = {};
                    a.forEach((kv)=> newItem[kv.Key] = kv.Value);
                    this.items.unshift(newItem);
                },
                err => {
                    console.log(err);
                },
                () => console.log('received update from socket')
        );

   }


    ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');

    this.events.subscribe('MainPage:reload', () => {
      //this.getVideos();
     let loader = this.loadingCtrl.create({
        content: 'Getting latest entries...',
      })
      loader.present().then(() => {

         /*this.backandService.getList('videos',null,null,null,null,this.deep=true,null,).subscribe(
            data => {
              console.log(data);
              this.items = data;
            },
            err => this.backandService.logError(err),
          () => console.log('OK')
          );*/
        loader.dismiss();
      });
    });

  }

   public getVideos() {
   this.backandService.getList('videos',null,null,null,null,this.deep=true,null ).subscribe(
      data => {
        console.log(data);
        this.items = data;
      },
      err => this.backandService.logError(err),
    () => console.log('OK')
    );
   }


  public postViews(id) {
        this.backandService.create('views',{ views: id }).subscribe(
                data => {
                   /*  add to beginning of array
                    this.items.unshift({ id: null, name: this.name, description: this.description });
                    console.log(this.items);*/
                    this.views = id;
                    console.log(this.views);
                    //this.description = '';
                },
                err => this.backandService.logError(err),
                () => console.log('OK')
            );
    }

    public postLike(id, heart) {
        this.backandService.update('videos',id,{ hearts: 2  }).subscribe(
                data => {
                 
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

    this.backandService.getList('videos',this.pageSize++ , this.pageNumber++,null,null,this.deep=true,null).subscribe(
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

   
  public playvideo(id,key,title,band,category_id,heart){
    this.postViews(id);
    this.navCtrl.push(VideodetailsPage,{
        videokey: key,
        title: title,
        band: band,
        category:category_id,
        heart:heart
    }).then(()=>{
      
       console.log(id);
    });

  }


  showBanner(){
    console.log('showBanner');
    this.adMobPro.showBanner();
  }

  removeBanner(){
    console.log('removeBanner');
    this.adMobPro.removeAds();
  }


  showInterstitial(){
    console.log('showInterstitial');
    this.adMobPro.showInterstitial();
  }


   public filterItems(searchbar) {
        // set q to the value of the searchbar
        var q = searchbar;

        // if the value is an empty string don't filter the items
        if (!q || q.trim() == '') {
          return;
        }
        else{
            q = q.trim();
        }

        let filter = 
            [
              {
                fieldName: 'title',
                operator: 'contains',
                value: q
              }
            ]
        ;


        this.backandService.getList('videos', null, null, filter)
            .subscribe(
                data => {
                    console.log("subscribe", data);
                    this.items = data;
                },
                err => this.backandService.logError(err),
                () => console.log('OK')
            );
    }


        
}

