import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { RegistrationPage } from '../registration/registration';
import { EmailValidator } from '../../validators/email';
import { ResetPasswordPage } from '../resetpassword/resetpassword';
import { MainPage } from '../main/main';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public nav: NavController, public authData: AuthService, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController, public menuCtrl: MenuController ) {
    
    this.menuCtrl.enable(false);

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
 
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  loginUser(){

    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, 
        this.loginForm.value.password).then( authData => {
        this.loading.dismiss().then( () =>{
          this.nav.setRoot(MainPage);
        })
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();          
        });
      });

      this.loading = this.loadingCtrl.create({ });
      this.loading.present();
    }
  }

  goToSignup(){
    this.nav.push(RegistrationPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

 
}
