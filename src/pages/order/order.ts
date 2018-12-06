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
import { PaymentPage } from '../payment/payment';


/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  userId = undefined;
  user = new User;
  userRole: string;
  userName: string;
  userPoint: string;
  //order
  orders = new Array<Order>();
  orderlist = new Array<Order>();
  searchOrderText = "";
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private userService: UserService,
    private orderService: OrderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
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
        this.getOrder(this.userId);
      }
      else {
        this.storage.get('userId').then((val) => {
          this.userId = val;
          this.getOrder(this.userId);
        });
      }
      
    });
    setTimeout(() => {
      console.log(this.orders);
      console.log(this.orderlist);
    }, 3000);
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

  selectOrder(id: number): void {
    this.navCtrl.push(PaymentPage,
      {
        payment: id
      });
  }

}
