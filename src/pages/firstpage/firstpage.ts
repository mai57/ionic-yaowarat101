import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';



/**
 * Generated class for the FirstpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstpage',
  templateUrl: 'firstpage.html',
})
export class FirstpagePage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstpagePage');
    
  }

  onCkickTest(){
    this.navCtrl.push(TabsPage);
  }

  toLogin(){
    this.navCtrl.push(LoginPage);
  }

  toRegister(){
    this.navCtrl.push(RegisterPage);
  }


}
