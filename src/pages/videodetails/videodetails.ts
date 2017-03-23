import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Pipe, PipeTransform } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { Platform,ActionSheetController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { MainPage } from '../main/main';
import { BackandService } from '../../providers/backandService';
import { AdMobPro } from '../../providers/admobpro';

@Component({
  selector: 'page-videodetails',
  templateUrl: 'videodetails.html',
  providers: [AdMobPro]
})

export class VideodetailsPage {

  public items:any[] = [];
  public key;
  public url;
  public title;
  public band;
  public category_id:string;
  public heart:any;
  public params:any;


  constructor(public navCtrl: NavController,private sanitizer: DomSanitizer,
   public navParams: NavParams,public loadingCtrl: LoadingController,public actionsheetCtrl: ActionSheetController,
   public menuCtrl: MenuController,public backandService:BackandService,public platform: Platform,private adMobPro: AdMobPro) {

   this.menuCtrl.enable(true);
   this.key   = navParams.get('videokey');
   this.title = navParams.get('title');
   this.band  = navParams.get('band');
   this.category_id = navParams.get('category')
   this.heart = navParams.get('heart')
   /*console.log(this.key)
   console.log(this.title)
   console.log(this.band)
   console.log(this.category_id)
   this.getVideos();*/
   this.getRelated();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideodetailsPage');
  }

  ngOnInit() {
      this.key = this.navParams.get('videokey');
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://content.jwplatform.com/players/'+this.key+'-nKEFTcZg.html');
      // console.log(this.key)
  }

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

    openMenu() {
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
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
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




}
  






