import { Component } from '@angular/core';
import { NavController, MenuController, Platform, App } from 'ionic-angular';
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
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls:['/home.scss']

})
export class HomePage {
  isAndroid: boolean = false;
  isIos: boolean = false;
  Url = "";

  constructor(public navCtrl: NavController,
    private inAppBrowser: InAppBrowser,
    platform: Platform,
    public appCtrl: App) {
    this.isAndroid = platform.is('android');
    this.isIos = platform.is('ios');
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

  toChat(){
    this.appCtrl.getRootNav().push(ChatPage);
    // this.navCtrl.push(ChatPage);
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

  OpenUrlSizer() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    if(!this.isIos){
      this.Url = "https://play.google.com/store/apps/details?id=com.thesaberteam.ringsizer"
    }else{
      this.Url = "https://itunes.apple.com/th/app/ring-sizer-know-your-ring-size/id1200312086?l=th&mt=8"
    }
    const browser = this.inAppBrowser.create(this.Url, '_system', options);

    browser.show();
    console.log(browser);
  }

  OpenUrlWeight() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    if(!this.isIos){
      this.Url = "https://play.google.com/store/apps/details?id=serg.tano_apps.weigher_scales"
    }else{
      this.Url = "https://yaowarat101.net"
    }
    const browser = this.inAppBrowser.create(this.Url, '_system', options);

    browser.show();
    console.log(browser);
  }
}
