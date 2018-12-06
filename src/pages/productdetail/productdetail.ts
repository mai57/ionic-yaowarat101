import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../product/products';
import { Storage } from '@ionic/storage';
import { ProductService } from '../product/product.serveice'


/**
 * Generated class for the ProductdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {
  detail = new Product;
  userRole = "";
  error: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
    private productService: ProductService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailPage');
    this.detail = this.navParams.get("products");
    console.log(this.detail);
    this.storage.get('userRole').then((val) => {
      this.userRole = val;
      // console.log('Your age is', this.userRole);
    });
  }

  save(): void {
    console.log(this.detail)
    this.productService.save(this.detail).subscribe(detail => {
      this.detail = detail;
      // this.textAfterSave = 'Add product successfully';
      // this.uploader.uploadAll();
      // this.close.emit(null);
      window.location.reload();
    }, error => (this.error = error));
  }

}
