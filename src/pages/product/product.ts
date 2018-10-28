import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App, ActionSheetController, AlertController } from 'ionic-angular';
import { Product } from "../product/products";
import { ProductService } from './product.serveice';
import { Storage } from '@ionic/storage';
import { AddproductPage } from '../addproduct/addproduct';
import { ProductdetailPage } from '../productdetail/productdetail';
import { CartService } from '../cart/cart.service';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    private productService: ProductService,
    private storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    private cartService: CartService,
    public alertCtrl: AlertController) {
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
                products: this.products[productID - 1]
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
            console.log('Favorite clicked');
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
                products: this.products[productID - 1]
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
              this.cartService.post(product, id).subscribe(async res => {
                const alert = this.alertCtrl.create({
                  title: 'ตะกร้าสินค้า',
                  subTitle: 'เพิ่มในตะกร้าสินค้าสำเร็จ',
                  buttons: ['OK']
                });
                alert.present();
              });
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
