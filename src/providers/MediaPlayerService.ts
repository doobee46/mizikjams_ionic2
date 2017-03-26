import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

declare var jwplayer: any;

@Injectable()
export class MediaPlayerService {

  constructor() {
    console.log('Hello MediaPlayerService Provider');
  }

  loadMedia(media, isAutoPlay) {
    console.log("Media Sevice running");
    console.log(media.Title,media.Id,media.Location);

    var cfg = {
      title: media.Title,
      mediaid: media.Id,
      "preload": "auto",
      "autostart": true,
      "controls": true,
      "mute": false,
      "useAudioTag": true,
      "file": media.Location,
      "skin": "five",
      "stretching": "exactfit",
      "width": "100%",
      "volume": 50,
      "aspectratio": "16:9",
      image:media.Image,
      "primary": "html5",
      hlshtml: true,
      enableFullscreen: 'true',
      "logo": {
        hide: true
      }
    };


    return Promise.resolve(
      jwplayer("myMediaDiv").setup(cfg))
      .then(
        playerInstance => { if (isAutoPlay) {
          setTimeout(() => {
            return playerInstance.play();
          }, 500);
        }    }
      );
  }

}
