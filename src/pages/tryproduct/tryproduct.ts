import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Product } from "../product/products";
import { ProductService } from '../product/product.serveice';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the TryproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tryproduct',
  templateUrl: 'tryproduct.html',
})
export class TryproductPage {

  listTryproduct = [];
  myphoto:any;
  product="สร้อยคอ";

  products: Product[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private camera: Camera,
    private productService: ProductService,
    private _DomSanitizationService: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TryproductPage');
    this.getProducts();
    this.listTryproduct = this.navParams.get("listTryproduct");
    console.log(this.listTryproduct);
    this.myphoto = "https://yaowarat101.net/image/no-profile.jpg";
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      products =>
        (this.products = products, console.log(this.products)),
        
    );
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
