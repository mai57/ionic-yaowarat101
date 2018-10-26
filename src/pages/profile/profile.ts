import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FirstpagePage } from '../firstpage/firstpage';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userName = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public appCtrl: App,
    private storage: Storage) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('userName').then((val) => {
      this.userName = val;
      // console.log('Your age is', this.userName);
    });
  }

  // toLogout(){
  //   this.navCtrl.popToRoot ();
  //   this.navCtrl.setRoot(FirstpagePage);
  // }

  logout() {
    this.appCtrl.getRootNav().setRoot(FirstpagePage);
  }
}
