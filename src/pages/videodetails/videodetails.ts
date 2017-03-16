import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Pipe, PipeTransform } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { MainPage } from '../main/main';
import { BackandService } from '../../providers/backandService';

@Component({
  selector: 'page-videodetails',
  templateUrl: 'videodetails.html'
})

export class VideodetailsPage {
  public items:any[] = [];
  public key;
  public url;
  public title;
  public band;
  public category_id:string;
  public params:any;

  constructor(public navCtrl: NavController,private sanitizer: DomSanitizer,
   public navParams: NavParams,public loadingCtrl: LoadingController,
   public menuCtrl: MenuController,public backandService:BackandService) {
   this.menuCtrl.enable(true);
   this.key   = navParams.get('videokey');
   this.title = navParams.get('title');
   this.band  = navParams.get('band');
   this.category_id = navParams.get('category')
   console.log(this.key)
   console.log(this.title)
   console.log(this.band)
   console.log(this.category_id)
   //this.getVideos();
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

 getRelated() {
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

  


}



