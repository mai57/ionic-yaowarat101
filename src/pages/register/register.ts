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
    this.user.u_Name = this.navParams.get("u_Name");
    this.user.u_Email = this.navParams.get("u_Email");
    this.user.u_Password = this.navParams.get("u_Password");
    this.confirmPassword = this.navParams.get("u_Password");
    this.user.u_Tel = " ";
    this.user.u_Gender = " ";
    this.user.u_Address = " ";
  }

  async save() {
    
    // let prompt = this.alertCtrl.create({
    //   title: 'ข้อมูล',
    //   message: "คุณต้องการแก้ไขที่อยู่หรือไม่",
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Save',
    //       handler: data => {
    //         console.log('Saved clicked');
    //         this.cartService.updateUser(Number(this.user.u_Id), this.user).subscribe();
    //         this.navCtrl.pop();
    //       }
    //     }
    //   ]
    // });
    // prompt.present();

    
    if (this.user.u_Name == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Error..',
        subTitle: 'กรุณาใส่ชื่อ-นามสกุล ',
        buttons: ['OK']
      });
      alert.present();
    }else if (this.user.u_Email == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Error..',
        subTitle: 'กรุณาใส่ Email ',
        buttons: ['OK']
      });
      alert.present();
    }else if (this.user.u_Password == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Error..',
        subTitle: 'กรุณาใส่รหัสผ่าน ',
        buttons: ['OK']
      });
      alert.present();
    }else if (this.user.u_Password != this.confirmPassword) {
      let alert = this.alertCtrl.create({
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

    console.log(this.user);
  }

  test() {
    console.log(this.user);
  }

}
