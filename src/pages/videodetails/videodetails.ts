import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Pipe, PipeTransform } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
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
  public views;
  public band;

  constructor(public navCtrl: NavController,private sanitizer: DomSanitizer,
   public navParams: NavParams,public menuCtrl: MenuController,public backandService:BackandService) {
   this.menuCtrl.enable(true);
   this.key = navParams.get('videokey');
   this.title = navParams.get('title');
   this.views = navParams.get('views');
   this.band = navParams.get('band');
   console.log(this.key)
   console.log(this.title)
   console.log( this.views)
   console.log( this.band)
   this.getVideos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideodetailsPage');
  }

  ngOnInit() {
      this.key = this.navParams.get('videokey');
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://content.jwplatform.com/players/'+this.key+'-nKEFTcZg.html');
      console.log(this.key)
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


}



