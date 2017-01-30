import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  navigate(){
    this.navCtrl.push(LoginPage);
  }
  registrate(){
    this.navCtrl.push(RegistrationPage);
  }
  skip(){
    this.navCtrl.push(MainPage);
  }
}
