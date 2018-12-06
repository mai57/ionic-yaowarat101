import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { PointPage } from '../point/point';
import { CouponPage } from '../coupon/coupon';
import { CreditPage } from '../credit/credit';
import { AboutPage } from '../about/about';
import { ProductPage } from '../product/product';
import { ContactPage } from '../contact/contact';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CartPage } from '../cart/cart';
import { OtherPage } from '../other/other';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls:['/home.scss']

})
export class HomePage {

  constructor(public navCtrl: NavController,private inAppBrowser: InAppBrowser) {
      
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

  tocart(){
    this.navCtrl.push(CartPage);
  }

  toOther(){
    this.navCtrl.push(OtherPage);
  }

  OpenUrl(url:string) {
    const options: InAppBrowserOptions ={
      zoom:'no'
    }
    const browser = this.inAppBrowser.create(url,'_system',options);
    browser.show();
    console.log(browser);
  }
}
