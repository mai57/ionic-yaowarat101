import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,private inAppBrowser: InAppBrowser,private platform: Platform,private callNumber: CallNumber) {

  }


  OpenUrl(url:string) {
    const options: InAppBrowserOptions ={
      zoom:'no'
    }
    const browser = this.inAppBrowser.create(url,'_system',options);
    browser.show();
    console.log(browser);
  }

  async call(){
    await this.platform.ready();
    try{
      this.callNumber.callNumber('0894245999', true)
      console.log("Opened dialer.");
    }catch(e){
      console.log(e || "Error launching dialer.");
    }
  }
}
