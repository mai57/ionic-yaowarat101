import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { User } from './user';
import { UserService } from '../../pages/firstpage/user.service'
import { FirstpagePage } from '../firstpage/firstpage';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  // user: User ;
  user = new User();
  
  confirmPassword = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     private userService: UserService,
    public alertCtrl: AlertController,
    public appCtrl: App
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.user = new User();
  }

  async save() {
    if (this.user.u_Password != this.confirmPassword) {
      const alert = this.alertCtrl.create({
        title: 'Error..',
        subTitle: 'รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.userService.save(this.user).subscribe(async user => {
        const alert = this.alertCtrl.create({
          title: 'Success..',
          subTitle: 'สมัครสมาชิกสำเร็จ',
          buttons: ['OK']
        });
        alert.present();
        this.appCtrl.getRootNav().setRoot(FirstpagePage);
      });
    }

    // console.log(this.user);
  }

  test(){
    console.log(this.user);
  }

}
