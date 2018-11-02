import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../firstpage/user';
import { CartService } from '../cart/cart.service';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  user = new User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private cartService: CartService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
    this.user = this.navParams.get("users");
    console.log(this.user);
  }

  updateUser(): void{

    let prompt = this.alertCtrl.create({
      title: 'ข้อมูล',
      message: "คุณต้องการแก้ไขที่อยู่หรือไม่",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            this.cartService.updateUser(Number(this.user.u_Id), this.user).subscribe();
            this.navCtrl.pop();
          }
        }
      ]
    });
    prompt.present();


  }

}
