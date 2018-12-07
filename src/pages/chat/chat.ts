import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  isAndroid: boolean = false;
  isIos: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    platform: Platform,
    public actionChat: ActionSheetController,) {
    this.isAndroid = platform.is('android');
    this.isIos = platform.is('ios');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  OpenImage() {
    let actionChat = this.actionChat.create({
      title: 'Menu',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'ถ่ายรูป',
          icon: !this.isIos ? 'camera' : null,
          handler: () => {
            console.log("ถ่ายรูป");
          }
        },
        {
          text: 'เลือกรูป',
          icon: !this.isIos ? 'images' : null,
          handler: () => {
            console.log("เลือกรูป");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.isIos ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionChat.present();
  }

}
