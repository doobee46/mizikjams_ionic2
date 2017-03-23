import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { BackandService } from '../../providers/backandService';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  public items:any[] = [];
  public name: string;
  public category_id:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public backandService:BackandService) {
    this.name  = navParams.get('name');
    this.category_id = navParams.get('id')
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


}
