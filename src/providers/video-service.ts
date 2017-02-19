import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the VideoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VideoService {
 videos: any;

  constructor(public http: Http) {
    console.log('Hello videoService Provider');
  }

  load() {
    if (this.videos) {
      return Promise.resolve(this.videos);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get('http://mizikjams-lorisson.rhcloud.com/api/videos.json')
        .map(res => res.json())
        .subscribe(data => {
          this.videos = data.videos;
          resolve(this.videos);
        });
    });
  }  
 

}

