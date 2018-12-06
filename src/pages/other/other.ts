import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the OtherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other',
  templateUrl: 'other.html',
})
export class OtherPage {
  isAndroid: boolean = false;
  isIos: boolean = false;
  Url = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser,
    platform: Platform, ) {
    this.isAndroid = platform.is('android');
    this.isIos = platform.is('ios');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherPage');
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
