import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
import { MainPage } from '../main/main';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../intro/intro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public storage: Storage, public menuCtrl: MenuController) {
     this.menuCtrl.enable(false);
  }

  navigate(){
    this.navCtrl.push(LoginPage);
  }
  registrate(){
    this.navCtrl.push(RegistrationPage);
  }
  skip(){
    this.navCtrl.push(MainPage);
  }
  
  ionViewDidLoad() {
    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
      }
    });
  }

}
