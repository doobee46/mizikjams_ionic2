import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage }from '../main/main';
import { MenuController } from 'ionic-angular';
import { VideodetailsPage } from '../videodetails/videodetails';
import { BackandService } from '../../providers/backandService';



@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class FrontPage {
  public  items:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,
  public backandService:BackandService) {
   this.menuCtrl.enable(true);
   this.getCategory();

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
    console.log('ionViewDidLoad FrontPage');
  }
  
  public browseVideos(){
    this.navCtrl.push(MainPage)
  }

 getCategory(){
   this.backandService.getList('categories').subscribe(
      data => {
        console.log(data);
        this.items = data;
      },
      err => this.backandService.logError(err),
    () => console.log('OK')
    );
  } 


}
