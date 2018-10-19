import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RewardsPage } from '../rewards/rewards';

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

  public press: number = 0;
  public pan: number = 0;
  public swipe: number = 0;
  public tap: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointPage');
  }

  toRewards(){
    this.navCtrl.push(RewardsPage);
    console.log('ionViewDidLoad PointPage');
  }

  pressEvent(e) {
    this.press++
  }
  panEvent(e) {
    this.pan++
  }
  swipeEvent(e) {
    this.swipe++
  }
  tapEvent(e) {
    this.tap++
  }

}
