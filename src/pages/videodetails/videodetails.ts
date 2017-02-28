import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-videodetails',
  templateUrl: 'videodetails.html'
})
export class VideodetailsPage {
  public key: any;
  public url: "http://content.jwplatform.com/players/-r7mhaEGG.html";

  constructor(public navCtrl: NavController,private sanitizer: DomSanitizer,
   public navParams: NavParams) {
   this.key = navParams.get('key');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideodetailsPage');
  }

 videoKey(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
