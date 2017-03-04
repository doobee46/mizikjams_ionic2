import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pipe, PipeTransform } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-videodetails',
  templateUrl: 'videodetails.html'
})

export class VideodetailsPage {
  key;
  url;
  title;
  views;
  band;

  constructor(public navCtrl: NavController,private sanitizer: DomSanitizer,
   public navParams: NavParams,public menuCtrl: MenuController) {
   this.menuCtrl.enable(true);
   this.key = navParams.get('videokey');
   this.title = navParams.get('title');
   this.views = navParams.get('views');
   this.band = navParams.get('band');
   console.log(this.key)
   console.log(this.title)
   console.log( this.views)
   console.log( this.band)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideodetailsPage');
  }

  ngOnInit() {
      this.key = this.navParams.get('videokey');
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://content.jwplatform.com/players/'+this.key+'-nKEFTcZg.html');
      console.log(this.key)
  }

}



