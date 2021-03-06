import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage }from '../main/main';
import { MenuController } from 'ionic-angular';
import { VideodetailsPage } from '../videodetails/videodetails';
import { CategoryPage }from '../category/category';
import { BackandService } from '../../providers/backandService';

@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class FrontPage {
  public  items:any[] = [];
  public  elements:any;
  public key;
  public url;
  public title;
  public band;
  public category_id:string;
  public popular:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,
  public backandService:BackandService) {
   this.menuCtrl.enable(true);
   this.getCategory();
   this.getnewReleases();
   this.mostViewed();
 

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

  public postViews(id) {
      this.backandService.create('views',{ views: id }).subscribe(
              data => {
                 /*   add to beginning of array
                  this.items.unshift({ id: null, name: this.name, description: this.description });
                  console.log(this.items);
                  this.views = id;
                  console.log(this.views);
                  //this.description = '';*/
              },
              err => this.backandService.logError(err),
              () => console.log('OK')
          );
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

  getnewReleases(){
    this.backandService.getRelease().subscribe(
        data => {
        console.log(data);
        this.elements = data;
      },
      err => this.backandService.logError(err),
    () => console.log('OK')
    );
  }

public mostViewed(){
     this.backandService.getPopular().subscribe(
       data =>{
          this.popular = data;
          console.log(data);     
       },
       err => this.backandService.logError(err),
       () => console.log('OK')
     );
   }
     
   public playvideo(id,key,title,band,category_id,viewcount){
    this.postViews(id);
    this.navCtrl.push(VideodetailsPage,{
        id :id,
        videokey: key,
        title: title,
        band: band,
        category:category_id,
        viewcount:viewcount
    });
    
    console.log(category_id);
  }

  selectCategory(id, name, description){
    this.navCtrl.push(CategoryPage,{
      id :id,
      name: name,
      description:description
    });
  }



}
