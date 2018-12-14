import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { CartService } from '../cart/cart.service';
import { UserService } from '../firstpage/user.service';
import { User } from '../firstpage/user';
import { Cart } from '../cart/carts';
import { ProfilePage } from '../profile/profile';
import { NavParams, NavController } from 'ionic-angular';

import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = CartPage;
  tab5Root: any = ProfilePage;
  

  userId: number;
  user = new User;
  carts: Cart[];
  error: any;
  private badges:number = 0;
  test: string = "dasfsdfs";
  cart:boolean ;

  constructor(
    private storage: Storage,
    private cartService: CartService,
    private userService: UserService,
    public navParams: NavParams,
    public navCtrl: NavController,
    public events: Events
  ) {

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad tabs');
    
    this.storage.get('userId').then((val) => {
      this.userId = val;
      this.getCarts(this.userId);
      this.getUser()
      
    });
    
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter tabs');
    
    // setTimeout(() => {
    //   console.log(this.carts.length);
    //   this.badges = this.carts.length;
    // }, 3000);
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter tabs');
    // console.log(this.carts);
    this.cart = this.navParams.get("cart");
    // console.log(this.cart);
    if(this.cart == true){
      this.updateTabBadge();
      // console.log("sdfsdf");
    }
  }

  public updateTabBadge(): void {
    this.events.publish('cart:updated', ++this.badges);
  }

  getUser(): void {
    this.userService.getUser(this.userId).subscribe(user => (this.user = user[0]), error => (console.log(error)));
  }

  getCarts(id: number): void {
    this.cartService
      .getCarts(id)
      .subscribe(
        carts => (this.carts = carts
          ,this.badges = this.carts.length,console.log(this.badges)),
        error => (this.error = error)
      )
    // console.log(this.carts);
  }
}
