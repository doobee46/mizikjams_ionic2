import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../intro/intro';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main/main';
import { BackandService } from '../../providers/backandService';
import 'rxjs/Rx'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

auth_type:string = "N/A";
is_auth_error:boolean = false;
auth_status:string = null;
loggedInUser: string = '';

constructor(public navCtrl: NavController,public storage: Storage, public menuCtrl: MenuController,public backandService:BackandService) {
    this.menuCtrl.enable(false);
    this.auth_type = backandService.getAuthType();
    this.auth_status = backandService.getAuthStatus();
    this.loggedInUser = backandService.getUsername();
}

  navigate(){
    this.navCtrl.push(LoginPage);
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

 public signOut() {
      this.auth_status = null;
      this.backandService.signout();
  }


public useAnonymousAuth() {
    this.backandService.useAnonymousAuth();
    this.auth_status = 'OK';
    this.is_auth_error = false;
    this.auth_type = 'Anonymous';
    this.loggedInUser = 'Anonymous';
    this.navCtrl.setRoot(MainPage);
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

