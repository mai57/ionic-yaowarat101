import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Product } from "../product/products";
import { ProductService } from './product.serveice';

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

  categoryBy = "สร้อยคอ";
  searchProductText = "";

  products: Product[];

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,private productService: ProductService) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.getProducts();
    // console.log(this.products);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      products =>
        (this.products = products),
        // this.getPageArray()
        
    );
  }

  showdata(){
    console.log(this.products);
  }

}
