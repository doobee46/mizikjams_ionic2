import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { BackandService } from '../../providers/backandService';
/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {

  public items:any[] = [];
    searchQuery: string;

    constructor(public backandService:BackandService, public navCtrl: NavController ) {   
        this.searchQuery = '';
      
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

        this.getVideos();

    }


   ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');

  }
   
    getVideos(){
     this.backandService.getList('videos').subscribe(
        data => {
          console.log(data);
          this.items = data;
        },
        err => this.backandService.logError(err),
      () => console.log('OK')
      );
     }

   

   public filterItems(searchbar) {
        // set q to the value of the searchbar
        var q = searchbar;

        // if the value is an empty string don't filter the items
        if (!q || q.trim() == '') {
          return;
        }
        else{
            q = q.trim();
        }

        let filter = 
            [
              {
                fieldName: 'title',
                operator: 'contains',
                value: q
              }
            ]
        ;


        this.backandService.getList('videos', null, null, filter)
            .subscribe(
                data => {
                    console.log("subscribe", data);
                    this.items = data;
                },
                err => this.backandService.logError(err),
                () => console.log('OK')
            );
    }

}
