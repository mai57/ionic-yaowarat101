import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { FirstpagePage } from '../firstpage/firstpage';
import { Storage } from '@ionic/storage';
import { UserService } from '../firstpage/user.service';
import { User } from '../firstpage/user';
import { EditprofilePage } from '../editprofile/editprofile';

//order
import { Order } from '../../service/order';
import { OrderService } from '../../service/order.service';
import { OrderPage } from '../order/order';
import { PointPage } from '../point/point';
import { ContactPage } from '../contact/contact';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  userId = undefined;
  user = new User;
  userRole: string;
  userName: string;
  userPoint: string;
  //order
  orders = new Array<Order>();
  orderlist = new Array<Order>();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private userService: UserService,
    private orderService: OrderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('userId').then((val) => {
      this.userId = val;
      this.getUser()
    });
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter ProfilePage');
    this.storage.get('userName').then((val) => {
      this.userName = val;
    });
    this.storage.get('userPoint').then((val) => {
      this.userPoint = val;
    });
    this.storage.get('userRole').then((val) => {
      this.userRole = val;
      if (this.userRole == 'admin') {
        this.userId = '1 or 1=1';
      }
      else {
        this.storage.get('userId').then((val) => {
          this.userId = val;
          this.getOrder(val);
        });
      }
    });
    setTimeout(() => {
      console.log(this.orders);
      console.log(this.orderlist);
    }, 3000);
  }

  getUser(): void {
    this.userService.getUser(this.userId).subscribe(user => (this.user = user[0]), error => (console.log(error)));
  }

  getOrder(Id : number): void{
    this.orderService.getOrders(Id).subscribe(orders => (
      this.orders = orders,
      // console.log(this.orders),
      // console.log(orders),
      this.orderService.getOrderList(Id).subscribe(orderlist => (
        this.orderlist = orderlist,
        this.orderlist.reverse()
      ),
        error => (console.log(error))
      )

    ),
      error => (console.log(error))
    );
  }

  toeditprofile(user: User) {
    this.navCtrl.push(EditprofilePage, {
      users: this.user
    });
  }

  toOrder(){
    this.navCtrl.push(OrderPage);
  }
  toPoint(){
    this.navCtrl.push(PointPage);
  }

  toContact(){
    this.navCtrl.push(ContactPage);
  }

  async logout() {
    // this.userName = null;
    this.storage.remove('userName');
    this.storage.remove('userId');
    this.storage.remove('userRole');
    this.storage.remove('userPoint');
    let loading = this.loadingCtrl.create({
      content: "กำลังออกจากระบบ..."
    });

    loading.present();
    setTimeout(() => {
      this.appCtrl.getRootNav().setRoot(FirstpagePage);
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 3000);

  }
}
