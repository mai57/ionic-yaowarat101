import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, DateTime } from 'ionic-angular';

import { Storage } from '@ionic/storage'
import { AngularFireDatabase } from 'angularfire2/database'

import { Camera, CameraOptions } from '@ionic-native/camera'

import { DomSanitizer } from '@angular/platform-browser';

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

  base64Image: string = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public actionChat: ActionSheetController, 
    private storage: Storage,
    private db: AngularFireDatabase,
    private camera: Camera,
    private _DomSanitizationService: DomSanitizer) {

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
      read: false,
      messageType: this.base64Image ? 'image':'text'
    })
    this.messageText = '';
    this.base64Image = '';
  }



  clearImage() {
    this.messageText = '';
    this.base64Image = '';
  }

  takePicture(){

    this.camera.getPicture({
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.messageText = this.base64Image
    }, (err) => {
        console.log(err);
    });
  }


  loadPicture(){

    this.camera.getPicture({
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.messageText = this.base64Image
    }, (err) => {
        console.log(err);
    });
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
            this.takePicture()
          }
        },
        {
          text: 'เลือกรูป',
          icon: !this.isIos ? 'images' : null,
          handler: () => {
            console.log("เลือกรูป");
            this.loadPicture();
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
