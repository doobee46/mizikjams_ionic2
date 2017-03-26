import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { VideodetailsPage } from '../videodetails/videodetails';
import { BackandService } from '../../providers/backandService';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  public items:any[] = [];
  public name: string;
  public category_id:string;
  public description:string;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public backandService:BackandService) {
    this.name  = navParams.get('name');
    this.category_id = navParams.get('id')
    this.description = navParams.get('description')
    this.getRelated();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
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

  public playvideo(id,key,title,band,category_id){
    this.navCtrl.push(VideodetailsPage,{
        id :id,
        videokey: key,
        title: title,
        band: band,
        category:category_id
    });
    
    console.log(category_id);
  }
   
  

}
