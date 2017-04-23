import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
//import { Pipe, PipeTransform } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { Platform,ActionSheetController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { MainPage } from '../main/main';
import { BackandService } from '../../providers/backandService';
import { MediaPlayerService } from '../../providers/MediaPlayerService';
import { ToastController } from 'ionic-angular';
import { AdMobPro } from '../../providers/admobpro';

@Component({
  selector: 'page-videodetails',
  templateUrl: 'videodetails.html',
  providers: [AdMobPro,MediaPlayerService]
})

export class VideodetailsPage {

  public items:any[] = [];
  public key;
  public url;
  public title;
  public viewcount;
  public band;
  public deep:any;
  public popular:any;
  public category_id:string;
  public heart:any;
  public params:any;
  public media_url="http://content.jwplatform.com/videos/"
  public template_id ="-VlTpug2y"


  constructor(public navCtrl: NavController,private sanitizer: DomSanitizer,
   public navParams: NavParams,public loadingCtrl: LoadingController,public actionsheetCtrl: ActionSheetController,
   public menuCtrl: MenuController,public backandService:BackandService,public platform: Platform,
   private adMobPro: AdMobPro, public mplayer: MediaPlayerService,public toastCtrl: ToastController,public events: Events) {

   this.menuCtrl.enable(true);
   this.key   = navParams.get('videokey');
   this.title = navParams.get('title');
   this.band  = navParams.get('band');
   this.category_id = navParams.get('category')
   this.heart = navParams.get('heart')
   this.viewcount=navParams.get('viewcount')
   /*console.log(this.key)
   console.log(this.title)
   console.log(this.band)
   console.log(this.category_id)
   this.getVideos();*/
   this.getRelated();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideodetailsPage');
    this.mplayer.loadMedia({"Location":this.media_url+this.key+this.template_id+".mp4",
                             "Title":this.title,
                             "Id":this.key,
                             "Image":this.media_url+this.key+"-640.jpg"
                              }
                             ,true);
  }

 /* ngOnInit() {
      this.key = this.navParams.get('videokey');
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://content.jwplatform.com/players/'+this.key+'-nKEFTcZg.html');
      // console.log(this.key)
  }*/

 public getRelated() {
   let loader = this.loadingCtrl.create({
        //content: '...',
      })
      loader.present().then(() => {
         this.backandService.getRelated(this.category_id).subscribe(
           data => {
              this.items = data;
              console.log(this.items);
            },
            err => this.backandService.logError(err),
          () => console.log('OK')
          );
        loader.dismiss();
      });
    }
 
   goBack(){
     this.navCtrl.pop(MainPage);
    
   }

  

    openMenu(id,key,title,band,category_id) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Videos',
      cssClass: 'action-sheets-basic-page',
      buttons: [
       /* {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },*/
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: data => {
            this.playvideo(id,key,title,band,category_id);
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: data => {
            this.postLike(id);
            console.log(id +'was added to favorite')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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

 
public postLike(id) {
  this.backandService.create('hearts',{video_id: id  }).subscribe(
          data => {
            this.heart = id;
            console.log(this.heart);
          },
          err => this.backandService.logError(err),
          () => console.log('OK')
      );
          let toast = this.toastCtrl.create({
            message: `you just hearted a video`,
            duration: 3000,
            position: 'top',
            cssClass: 'toast'
          });
        toast.present();
    }

public playvideo(id,key,title,band,category_id){
    this.postViews(id);
    this.navCtrl.push(VideodetailsPage,{
        videokey: key,
        title: title,
        band: band,
        category:category_id,
    }).then(()=>{
      
       console.log(id);
    });

  }

 public postViews(id) {
        this.backandService.create('views',{ video_id: id }).subscribe(
                data => {
                  //  /*  add to beginning of array
                  //   this.items.unshift({ id: null, name: this.name, description: this.description });
                  //   console.log(this.items);*/
                  //   this.views = id;
                  //   console.log(this.views);
                  //   //this.description = '';
                },
                err => this.backandService.logError(err),
                () => console.log('OK')
            );
    }


}
  






