import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RewardsPage } from '../rewards/rewards';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PointPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point',
  templateUrl: 'point.html',
})
export class PointPage {
  userPoint = "";
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointPage');
    this.storage.get('userPoint').then((val) => {
      this.userPoint = val;
    });
  }

  toRewards(){
    this.navCtrl.push(RewardsPage);
    console.log('ionViewDidLoad PointPage');
  }

  

}
