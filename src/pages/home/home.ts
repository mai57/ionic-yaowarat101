import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { PointPage } from '../point/point';
import { CouponPage } from '../coupon/coupon';
import { CreditPage } from '../credit/credit';
import { AboutPage } from '../about/about';
import { ProductPage } from '../product/product';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls:['/home.scss']

})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  toProfile(){
    this.navCtrl.push(ProfilePage);
  }

  toPoint(){
    this.navCtrl.push(PointPage);
  }

  toCoupon(){
    this.navCtrl.push(CouponPage);
  }

  toCredit(){
    this.navCtrl.push(CreditPage);
  }

  toAbout(){
    this.navCtrl.push(AboutPage);
  }

  toProduct(){
    this.navCtrl.push(ProductPage);
  }

  toContact(){
    this.navCtrl.push(ContactPage);
  }
}
