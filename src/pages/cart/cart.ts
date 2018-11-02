import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartService } from './cart.service';
import { Cart } from './carts';
import { User } from '../firstpage/user';
import { UserService } from '../firstpage/user.service';
import { EditprofilePage } from '../editprofile/editprofile';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  user = new User;
  userId: number;
  carts: Cart[];
  error: any;
  totalPrice: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private cartService: CartService,
    private userService: UserService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.storage.get('userId').then((val) => {
      this.userId = val;
      this.getCarts(this.userId);
      this.getUser()
    });


  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter CartPage');
    console.log(this.carts);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CartPage');
    console.log(this.carts);
  }

  getUser(): void {
    this.userService.getUser(this.userId).subscribe(user => (this.user = user[0]), error => (console.log(error)));
  }

  getCarts(id: number): void {
    this.cartService
      .getCarts(id)
      .subscribe(
        carts => (this.carts = carts, this.calTotalPrice()),
        error => (this.error = error)
      )
    // console.log(this.carts);
  }

  calTotalPrice(): void {
    var totalPrice = 0;
    this.carts.forEach(cart => {
      totalPrice += (cart.p_Price * Number(cart.p_Amount))
    });
    this.totalPrice = totalPrice;
  }

  plusamount(amount: Cart, index: number) {

    this.carts[index].p_Amount = amount.p_Amount + 1;
    var totalPrice = 0;
    this.carts.forEach(cart => {
      totalPrice += (cart.p_Price * Number(cart.p_Amount))
    });
    this.totalPrice = totalPrice;
  }

  devalueamount(amount: Cart, index: number) {

    if (this.carts[index].p_Amount > 1) {
      this.carts[index].p_Amount = (amount.p_Amount) - 1;
      var totalPrice = 0;
      this.carts.forEach(cart => {
        totalPrice += (cart.p_Price * Number(cart.p_Amount))
      });
      this.totalPrice = totalPrice;
    }
  }


  async proceedCheckout() {
    // console.log(this.carts)
    // console.log(this.user)
    // console.log(this.carts);
    // console.log(this.user);
    // console.log(this.userId);
    // console.log(this.totalPrice)
    if (this.userId != undefined) {
      this.cartService.proceedAddtoCart(this.carts, this.user, this.totalPrice).subscribe(data => {
        // console.log("this.user = " +  this.user.u_Id);
        this.cartService.proceedAddtoCart2(this.carts, this.user).subscribe(res => {
          // console.log("this.carts = " +  this.carts);
          // this.cartService.deleteCartAll(this.userId).subscribe(resp => {
          //   console.log(resp);
          //   this.getCarts(this.userId);
          //   alert("proceed to checkout successfully");
          // });


        })
      })

      this.cartService.deleteCartAll(this.userId).subscribe(async res => {
        console.log("ssssssssss");
      })

    } else {
      console.log("fffffffff");
    }

  }

  deleteCart(cart: Cart): void {

    let prompt = this.alertCtrl.create({
      title: 'สินค้า',
      message: "คุณต้องการลบสินค้าทิ้งหรือไม่",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log('Ok clicked');
            this.cartService.deleteCart(cart, this.userId).subscribe();
            this.getCarts(this.userId);
          }
        }
      ]
    });
    prompt.present();

  }


  toeditprofile(user: User) {
    this.navCtrl.push(EditprofilePage, {
      users: this.user
    });
  }
}
