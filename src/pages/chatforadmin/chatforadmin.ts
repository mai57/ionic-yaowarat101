import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, DateTime } from 'ionic-angular';

import { Storage } from '@ionic/storage'
import { AngularFireDatabase } from 'angularfire2/database'

/**
 * Generated class for the ChatforadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatforadmin',
  templateUrl: 'chatforadmin.html',
})
export class ChatforadminPage {
  isAndroid: boolean = false;
  isIos: boolean = false;

  userName: string = '';
  messageText: string = '';
  s;
  chatLogs = []

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public actionChat: ActionSheetController, 
    private storage: Storage,
    private db: AngularFireDatabase) {

    this.isAndroid = platform.is('android');
    this.isIos = platform.is('ios');
    
    this.userName = this.navParams.get('userName');
    
    // this.storage.get('userName').then(val => {
    //   this.userName = val
    // })

    this.db.object('/chat').valueChanges().subscribe(data => {
      if(data == undefined) return;
      this.chatLogs = Object.keys(data).map(key => {
        return data[key]
      })
      this.chatLogs.sort(function(a,b) {
        return Date.parse(a.time) - Date.parse(b.time)
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');

    
    
  }



  sendMessage() {
    let t = new Date(Date.now())
    let tempname = 'Admin Yaowarat101 ' + t.toString()
    this.db.list('/chat').set(tempname,{
      username: 'Admin Yaowarat101',
      message: this.messageText,
      sendto: this.userName,
      time: t.toString(),
      read: false
    })
    this.messageText = '';
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
