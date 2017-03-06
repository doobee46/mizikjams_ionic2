import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { IntroPage } from '../pages/intro/intro';
import { PlaylistPage } from '../pages/playlist/playlist';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { MenuController } from 'ionic-angular';
import { BackandService } from '../providers/backandService';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
 @ViewChild(Nav) nav: Nav;

  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  title:string;

  rootPage = IntroPage;


  pages: Array<{title: string, component: any}>;
  

  constructor(platform: Platform, public alertCtrl: AlertController, public menuCtrl: MenuController,private backandService:BackandService) {

    this.auth_type = backandService.getAuthType();
    this.auth_status = backandService.getAuthStatus();
    this.loggedInUser = backandService.getUsername();

   this.pages =[
      {title: 'Home', component: MainPage},
      {title: 'Profile', component: PlaylistPage},
      {title: 'Settings', component: PlaylistPage},
    ];


   platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString('#DF020D');
      Splashscreen.show();
      backandService.setIsMobile(platform.is('mobile'));
      backandService.setAppName('mizikjams');
      backandService.setSignUpToken('f5f41682-8d49-4aae-96c6-2a16b16310f6');
      backandService.setAnonymousToken('94f0ce70-5074-4ed5-8575-221c0a5d60b5');
    });
    
  }

  openPage(page){
    this.nav.setRoot(page.component);
    this.menuCtrl.close();
  }

   public signOut() {
      this.auth_status = null;
      this.backandService.signout();
      this.menuCtrl.close();
      this.nav.setRoot(HomePage);
      
  }


  addToPlaylist() {
    let prompt = this.alertCtrl.create({
      title: 'Create Playlist',
      message: "Enter a title for this new Playlist",
      inputs: [
        {
          name: this.title,
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
 }
  
  openMain(){
    this.nav.setRoot(MainPage);
    this.menuCtrl.close();
  }




}