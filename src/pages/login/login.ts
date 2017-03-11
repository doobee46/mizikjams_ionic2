import {Component} from '@angular/core';
// import {bootstrap} from '@angular/platform-browser-dynamic';
import 'rxjs/Rx'
import { NavController} from 'ionic-angular';
import { BackandService } from '../../providers/backandService'
import { SignupPage } from '../signup/signup';
import { FrontPage } from '../front/front';
import { HomePage } from '../home/home';
import { MenuController } from 'ionic-angular';

@Component({
    templateUrl: 'login.html',
    selector: 'page-login',
})
export class LoginPage {
    
    username:string = '';
    password:string = '';
    auth_type:string = "N/A";
    is_auth_error:boolean = false;
    auth_status:string = null;
    loggedInUser: string = '';


    oldPassword: string = '';
    newPassword: string = '';
    confirmNewPassword: string = '';


    constructor(public backandService:BackandService,  public navCtrl: NavController, public menuCtrl: MenuController) { 
        this.menuCtrl.enable(false);
        this.auth_type = backandService.getAuthType();
        this.auth_status = backandService.getAuthStatus();
        this.loggedInUser = backandService.getUsername();
    }


    public getAuthTokenSimple() {

        this.auth_type = 'Token';
        var $obs = this.backandService.signin(this.username, this.password);
        $obs.subscribe(
            data => {
                this.auth_status = 'OK';
                this.is_auth_error = false;
                this.loggedInUser = this.username;
                this.username = '';
                this.password = '';
                
            },
            err => {
                var errorMessage = this.backandService.extractErrorMessage(err);

                this.auth_status = `Error: ${errorMessage}`;
                this.is_auth_error = true;
                this.backandService.logError(err)
            },
            () => console.log('Finish Auth'));
            
    }

    public useAnonymousAuth() {
        this.backandService.useAnonymousAuth();
        this.auth_status = 'OK';
        this.is_auth_error = false;
        this.auth_type = 'Anonymous';
        this.loggedInUser = 'Moblie User';
        this.navCtrl.setRoot(FrontPage);
    }

    public signOut() {
        this.auth_status = null;
        this.backandService.signout();
        this.navCtrl.setRoot(HomePage);
    }

    goToSignup(){
      this.navCtrl.push(SignupPage);
    }


   public socialSignin(provider) {
    var $obs = this.backandService.socialSignin(provider);
    $obs.subscribe(                
        data => {
            console.log('Sign up succeeded with:' + provider); 
            this.navCtrl.setRoot(FrontPage);          
        },
        err => {
            this.backandService.logError(err)
        },
        () => console.log('Finish Auth'));
        
    }


   public changePassword() {
      if (this.newPassword != this.confirmNewPassword){
          alert('Passwords should match');
          return;
      }
      var $obs = this.backandService.changePassword(this.oldPassword, this.newPassword);
      $obs.subscribe(
          data => {
              alert('Password changed');
              this.oldPassword = this.newPassword = this.confirmNewPassword = '';
              this.navCtrl.setRoot(HomePage);
          },
          err => {
              this.backandService.logError(err)
          },
          () => console.log('Finish change password'));
  }

}
