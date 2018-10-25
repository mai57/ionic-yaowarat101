import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { LinkApi } from '../../app/app.link-api';
import { User } from '../firstpage/user';
import { UserService } from './user.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

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
  linkApi = LinkApi.link;
  picApi = LinkApi.pic;
  user: User;
  users: User[];
  userName: string;
  login = {
    email: "",
    password: ""
  };
  confirmPassword = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstpagePage');
    // this.userName = this.storage.get('userName');
    // console.log(this.storage.get('userRole'));
    // console.log(this.storage.get('userName'))
    // console.log(this.storage.get('userId'));
    this.user = new User();
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
