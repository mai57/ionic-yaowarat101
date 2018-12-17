import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App, ActionSheetController, AlertController } from 'ionic-angular';
import { Product } from "../product/products";
import { ProductService } from './product.serveice';
import { Storage } from '@ionic/storage';
import { AddproductPage } from '../addproduct/addproduct';
import { ProductdetailPage } from '../productdetail/productdetail';
import { CartService } from '../cart/cart.service';
import { CartPage } from '../cart/cart';
import { TabsPage } from '../tabs/tabs';
import { TryproductPage } from '../tryproduct/tryproduct';
// import { SESSION_STORAGE, WebStorageService } from "angular-webstorage-service";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  typproduct: string = "necklace";
  isAndroid: boolean = false;
  isIos: boolean = false;

  categoryBy = "สร้อยคอ";
  searchProductText = "";

  products: Product[];

  userRole = "";
  userId = "";

  listTryproduct = [];
  counttry = 0;
  tryproduct1: Product;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    private productService: ProductService,
    private storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    private cartService: CartService,
    public alertCtrl: AlertController,
    public appCtrl: App) {
    this.isAndroid = platform.is('android');
    this.isIos = platform.is('ios');

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.getProducts();
    this.storage.get('userRole').then((val) => {
      this.userRole = val;
      // console.log('Your age is', this.userRole);
    });
    this.storage.get('userId').then((val) => {
      this.userId = val;
      // console.log('Your age is', this.userRole);
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter tabs');
    // this.getProducts();
    // setTimeout(() => {
    //   console.log(this.carts.length);
    //   this.badges = this.carts.length;
    // }, 3000);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      products =>
        (this.products = products),

    );
  }

  showdata(test: number) {
    // console.log(this.products[test - 1]);
    this.navCtrl.push(ProductdetailPage,
      {
        products: this.products[test - 1]
      });
  }

  openMenu(productID: number, product: Product, id: number) {
    let actionSheetAdmin = this.actionSheetCtrl.create({
      title: 'Menu',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.isIos ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'View & Edit',
          icon: !this.isIos ? 'eye' : null,
          handler: () => {
            this.navCtrl.push(ProductdetailPage,
              {
                products: productID
              });
          }
        },
        {
          text: 'ลอง',
          icon: !this.isIos ? 'images' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'เพิ่มในตะกร้า',
          icon: !this.isIos ? 'cart' : null,
          handler: () => {
            if (this.userId != undefined) {
              // console.log(product , id);
              const alert = this.alertCtrl.create({
                title: 'ตะกร้าสินค้า',
                message: "คุณต้องการเพิ่มสินค้าลงตะกล้าหรือไม่",
                buttons: [
                  {
                    text: 'Cancel',
                    handler: () => {
                      console.log('Disagree clicked');
                    }
                  },
                  {
                    text: 'OK',
                    handler: () => {
                      console.log('Agree clicked');
                      this.cartService.post(product, id).subscribe(async res => {
                        this.navCtrl.push(TabsPage);
                      });
                    }
                  }]
              });
              alert.present();

            } else {
              const alert = this.alertCtrl.create({
                title: 'Error..',
                subTitle: 'โปรดเข้าสู่ระบบ',
                buttons: ['OK']
              });
              alert.present();
            }
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
    let actionSheetUser = this.actionSheetCtrl.create({
      title: 'Menu',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'View',
          icon: !this.isIos ? 'eye' : null,
          handler: () => {
            this.navCtrl.push(ProductdetailPage,
              {
                products: productID
              });
          }
        },
        {
          text: 'ลอง',
          icon: !this.isIos ? 'images' : null,
          handler: () => {
            if (this.listTryproduct.length < 5) {
              this.listTryproduct.push({ p_Id: product.p_Id, p_Name: product.p_Name });
            }

            let text = "";
            this.listTryproduct.forEach(data => {
              text += "<div>";
              text += "(" + data.p_Id + ")" + data.p_Name;
              text += "</div>";
            });

            const alert = this.alertCtrl.create({
              title: 'ลองสินค้า',
              message: "คุณต้องการลอง" + text ,
              buttons: [
                {
                  text: 'เลือกต่อ',
                  handler: () => {
                    // this.counttry++
                    // console.log(this.counttry);
                    console.log(this.listTryproduct);
                  }
                },
                {
                  text: 'ไปลองสินค้า',
                  handler: () => {
                    console.log('Agree clicked');
                    // this.cartService.post(product, id).subscribe(async res => {
                      this.appCtrl.getRootNav().push(TryproductPage,{
                        listTryproduct : this.listTryproduct,
                        countlistTryproduct: this.listTryproduct.length
                      });
                    // });
                  }
                }]
            });
            alert.present();

            console.log('Play clicked');

          }
        },
        {
          text: 'เพิ่มในตะกร้า',
          icon: !this.isIos ? 'cart' : null,
          handler: () => {
            if (this.userId != undefined) {
              // console.log(product , id);
              const alert = this.alertCtrl.create({
                title: 'ตะกร้าสินค้า',
                message: "คุณต้องการเพิ่มสินค้าลงตะกล้าหรือไม่",
                buttons: [
                  {
                    text: 'Cancel',
                    handler: () => {
                      console.log('Disagree clicked');
                    }
                  },
                  {
                    text: 'OK',
                    handler: () => {
                      console.log('Agree clicked');
                      this.cartService.post(product, id).subscribe(async res => {
                        this.navCtrl.push(TabsPage,
                          {
                            cart: true
                          });
                        // this.navCtrl.setRoot(this.navCtrl.getActive().component);
                      });
                    }
                  }]
              });
              alert.present();

            } else {
              const alert = this.alertCtrl.create({
                title: 'Error..',
                subTitle: 'โปรดเข้าสู่ระบบ',
                buttons: ['OK']
              });
              alert.present();
            }
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
    if (this.userRole == "admin") {
      actionSheetAdmin.present();
    } else {
      actionSheetUser.present();
    }
  }

  toaddproduct() {
    this.navCtrl.push(AddproductPage);
  }

  async addtoCart(product: Product, id: number) {
    if (this.userId != undefined) {
      this.cartService.post(product, id).subscribe(async res => {
        console.log("ssssssssss");
      });
    } else {
      console.log("fffffffff");
    }
  }

}
