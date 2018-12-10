import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, DateTime } from 'ionic-angular';

import { Storage } from '@ionic/storage'
import { AngularFireDatabase } from 'angularfire2/database'
import { Time } from '@angular/common';

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
    
    
    this.storage.get('userName').then(val => {
      this.userName = val
    })

    this.db.object('/chat').valueChanges().subscribe(data => {
      if(data == undefined) return;
      this.chatLogs = Object.keys(data).map(key => {
        return data[key]
      })
      this.chatLogs.sort(function(a,b) {
        return Date.parse(a.time) - Date.parse(b.time)
      })

      // console.log(this.chatLogs)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');

    
    
  }



  sendMessage() {
    let t = new Date(Date.now())
    // console.log(new Date("Sat Dec 08 2018 13:53:42 GMT+0700 (Indochina Time)"))
    let tempname = this.userName + ' ' + t.toString()
    this.db.list('/chat').set(tempname,{
      username: this.userName,
      message: this.messageText,
      sendto: 'admin',
      time: t.toString(),
      read: false
    })
    this.messageText = '';
    // console.log(t)
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