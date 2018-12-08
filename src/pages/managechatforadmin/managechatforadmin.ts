import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage'
import { AngularFireDatabase } from 'angularfire2/database'
import { ChatforadminPage } from '../chatforadmin/chatforadmin';

/**
 * Generated class for the ManagechatforadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-managechatforadmin',
  templateUrl: 'managechatforadmin.html',
})
export class ManagechatforadminPage {

  listChat = []
  // uniquelistChat = []

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase) {

      this.db.object('/chat').valueChanges().subscribe(data => {
        if(data == undefined) return;
        this.listChat = []
        this.listChat = Object.keys(data).map(key => {
          return data[key]
        })
        this.listChat.reverse()
        this.listChat = this.listChat.filter((listChat, index, self) => 
          index === self.findIndex((t) => (
            t.username === listChat.username
          ))
        )
        // console.log(this.listChat)
      })

  }

  onclickChat(userName) {
    this.navCtrl.push(ChatforadminPage, {
      userName: userName
    })

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagechatforadminPage');
  }

}
