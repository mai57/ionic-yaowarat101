import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Gesture, Content } from 'ionic-angular';
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


  enableProduct1 = "false";
  enableProduct2 = "false";
  enableProduct3 = "false";
  enableProduct4 = "false";
  enableProduct5 = "false";

  styleTransformProduct1 = "";
  styleTransformProduct2 = "";
  styleTransformProduct3 = "";
  styleTransformProduct4 = "";
  styleTransformProduct5 = "";
  

  oldselectedProduct = null
  selectedProduct = -1;

  adjustTransform: {
    scale: number,
    translateX: number,
    translateY: number,
    rotation: number,
  }

  

  count=0;

  listTryproduct = [];
  countlistTryproduct = 0;
  myphoto:any;

  categoryBy = "สร้อยคอ";
  searchProductText = "";

  products: Product[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private camera: Camera,
    private productService: ProductService,
    private _DomSanitizationService: DomSanitizer) {
      this.adjustTransform = {
        scale: 1,
        translateX: 0,
        translateY: 0,
        rotation: 0
      }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TryproductPage');
    this.getProducts();
    this.listTryproduct = this.navParams.get("listTryproduct");
    this.countlistTryproduct = this.navParams.get("countlistTryproduct");
    console.log(this.listTryproduct);
    this.myphoto = "https://yaowarat101.net/image/no-profile.jpg";
    
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      products =>
        (this.products = products, console.log(this.products)),
        
    );
  }

  onselectProduct(){

    this.adjustTransform = {
      scale: 0,
      translateX: 0,
      translateY: 0,
      rotation: 0
    }

    

    if(this.selectedProduct == 1){
      if(this.oldselectedProduct != null){
        let elemOld: HTMLElement = document.getElementById(this.oldselectedProduct)
        let elemSelected: HTMLElement = document.getElementById("idSelected")
        elemOld.style.transform = elemSelected.style.transform
        // this.adjustTransform.scale = Number(elemSelected.style.scale)

      }


      this.enableProduct1 = "true";
      this.enableProduct2 = "false";
      this.enableProduct3 = "false";
      this.enableProduct4 = "false";
      this.enableProduct5 = "false";
      let elementOld: HTMLElement = document.getElementById("1")
      let elementSelected: HTMLElement = document.getElementById("idSelected")
      elementSelected.style.transform = elementOld.style.transform
      this.oldselectedProduct = "1";
      console.log(elementOld.style.transform)
      let temp = elementOld.style.transform.split('scale(')
      let scale = temp[1].split(') translate(')[0]
      let translateX = (temp[1].split(') translate(')[1]).split('px, ')[0]
      let translateY = ((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[0]
      let rotation = (((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[1]).split('deg)')[0]
      this.adjustTransform = {
        scale: Number(scale),
        translateX: Number(translateX),
        translateY: Number(translateY),
        rotation: Number(rotation)
      }
      
      console.log(scale)
      console.log(translateX)
      console.log(translateY)
      console.log(rotation)
    }
    if(this.selectedProduct == 2){
      if(this.oldselectedProduct != null){
        let elemOld: HTMLElement = document.getElementById(this.oldselectedProduct)
        let elemSelected: HTMLElement = document.getElementById("idSelected")
        elemOld.style.transform = elemSelected.style.transform
      }
      
      this.enableProduct1 = "false";
      this.enableProduct2 = "true";
      this.enableProduct3 = "false";
      this.enableProduct4 = "false";
      this.enableProduct5 = "false";

      let elementOld: HTMLElement = document.getElementById("2")
      let elementSelected: HTMLElement = document.getElementById("idSelected")
      elementSelected.style.transform = elementOld.style.transform
      this.oldselectedProduct = "2";
      let temp = elementOld.style.transform.split('scale(')
      let scale = temp[1].split(') translate(')[0]
      let translateX = (temp[1].split(') translate(')[1]).split('px, ')[0]
      let translateY = ((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[0]
      let rotation = (((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[1]).split('deg)')[0]
      this.adjustTransform = {
        scale: Number(scale),
        translateX: Number(translateX),
        translateY: Number(translateY),
        rotation: Number(rotation)
      }
      
      console.log(scale)
      console.log(translateX)
      console.log(translateY)
      console.log(rotation)
    }
    if(this.selectedProduct == 3){
      if(this.oldselectedProduct != null){
        let elemOld: HTMLElement = document.getElementById(this.oldselectedProduct)
        let elemSelected: HTMLElement = document.getElementById("idSelected")
        elemOld.style.transform = elemSelected.style.transform
      }
      this.enableProduct1 = "false";
      this.enableProduct2 = "false";
      this.enableProduct3 = "true";
      this.enableProduct4 = "false";
      this.enableProduct5 = "false";

      let elementOld: HTMLElement = document.getElementById("3")
      let elementSelected: HTMLElement = document.getElementById("idSelected")
      elementSelected.style.transform = elementOld.style.transform
      this.oldselectedProduct = "3";
      let temp = elementOld.style.transform.split('scale(')
      let scale = temp[1].split(') translate(')[0]
      let translateX = (temp[1].split(') translate(')[1]).split('px, ')[0]
      let translateY = ((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[0]
      let rotation = (((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[1]).split('deg)')[0]
      this.adjustTransform = {
        scale: Number(scale),
        translateX: Number(translateX),
        translateY: Number(translateY),
        rotation: Number(rotation)
      }
      
      console.log(scale)
      console.log(translateX)
      console.log(translateY)
      console.log(rotation)
    }
    if(this.selectedProduct == 4){
      if(this.oldselectedProduct != null){
        let elemOld: HTMLElement = document.getElementById(this.oldselectedProduct)
        let elemSelected: HTMLElement = document.getElementById("idSelected")
        elemOld.style.transform = elemSelected.style.transform
      }

      this.enableProduct1 = "false";
      this.enableProduct2 = "false";
      this.enableProduct3 = "false";
      this.enableProduct4 = "true";
      this.enableProduct5 = "false";

      let elementOld: HTMLElement = document.getElementById("4")
      let elementSelected: HTMLElement = document.getElementById("idSelected")
      elementSelected.style.transform = elementOld.style.transform
      this.oldselectedProduct = "4";
      let temp = elementOld.style.transform.split('scale(')
      let scale = temp[1].split(') translate(')[0]
      let translateX = (temp[1].split(') translate(')[1]).split('px, ')[0]
      let translateY = ((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[0]
      let rotation = (((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[1]).split('deg)')[0]
      this.adjustTransform = {
        scale: Number(scale),
        translateX: Number(translateX),
        translateY: Number(translateY),
        rotation: Number(rotation)
      }
      
      console.log(scale)
      console.log(translateX)
      console.log(translateY)
      console.log(rotation)
    }
    if(this.selectedProduct == 5){
      if(this.oldselectedProduct != null){
        let elemOld: HTMLElement = document.getElementById(this.oldselectedProduct)
        let elemSelected: HTMLElement = document.getElementById("idSelected")
        elemOld.style.transform = elemSelected.style.transform
      }

      this.enableProduct1 = "false";
      this.enableProduct2 = "false";
      this.enableProduct3 = "false";
      this.enableProduct4 = "false";
      this.enableProduct5 = "true";

      let elementOld: HTMLElement = document.getElementById("5")
      let elementSelected: HTMLElement = document.getElementById("idSelected")
      elementSelected.style.transform = elementOld.style.transform
      this.oldselectedProduct = "5";
      let temp = elementOld.style.transform.split('scale(')
      let scale = temp[1].split(') translate(')[0]
      let translateX = (temp[1].split(') translate(')[1]).split('px, ')[0]
      let translateY = ((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[0]
      let rotation = (((temp[1].split(') translate(')[1]).split('px, ')[1]).split('px) rotate(')[1]).split('deg)')[0]
      this.adjustTransform = {
        scale: Number(scale),
        translateX: Number(translateX),
        translateY: Number(translateY),
        rotation: Number(rotation)
      }
      
      console.log(scale)
      console.log(translateX)
      console.log(translateY)
      console.log(rotation)
    }
  }

  onclickImageSlide(product: any) {
    if(this.listTryproduct.length >= 5){
      this.listTryproduct[this.count] = product
      this.count++;
      this.countlistTryproduct++;
      if(this.count == 5){
        this.count = 0
        this.countlistTryproduct = 5 
      }
    }
    else{
      this.listTryproduct.push(product)
      this.countlistTryproduct++;
    }

    // console.log(this.listTryproduct)
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
