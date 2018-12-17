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
import { Storage } from '@ionic/storage'
import { ManagechatforadminPage } from '../managechatforadmin/managechatforadmin';
import { User } from '../firstpage/user';
import { UserService } from '../firstpage/user.service';
import { Cart } from '../cart/carts';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls:['/home.scss']

})
export class HomePage {
  isAndroid: boolean = false;
  isIos: boolean = false;
  userRole: string = 'user';
  userId: number;
  user = new User;
  carts: Cart[];
  badges:number = 0;
  error: any;
  Url = "";

  constructor(public navCtrl: NavController,
    private inAppBrowser: InAppBrowser,
    platform: Platform,
    public appCtrl: App,
    private storage: Storage,
    private userService: UserService,
    private cartService: CartService) {
    this.isAndroid = platform.is('android');
    this.isIos = platform.is('ios');
    this.storage.get('userRole').then(val => {
      this.userRole = val
    })
    this.storage.get('userId').then((val) => {
      this.userId = val;
      this.getCarts(this.userId);
      this.getUser()
      
    });
  }

  getUser(): void {
    this.userService.getUser(this.userId).subscribe(user => (this.user = user[0]), error => (console.log(error)));
  }

  getCarts(id: number): void {
    this.cartService
      .getCarts(id)
      .subscribe(
        carts => (this.carts = carts
          ,this.badges = this.carts.length,console.log(this.badges)),
        error => (this.error = error)
      )
    // console.log(this.carts);
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
    if(this.userRole == 'user'){
      this.appCtrl.getRootNav().push(ChatPage);
    }
    else if(this.userRole == 'admin'){
      this.appCtrl.getRootNav().push(ManagechatforadminPage);
    }
    
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
