import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

//service
import { ProductService } from '../pages/product/product.serveice';
import { UserService } from '../pages/firstpage/user.service';
import { CartService } from '../pages/cart/cart.service';
import { OrderService } from '../service/order.service'

//Filter
import { SearchProductFilterPipe } from '../pages/product/searchProductFilter.pipe';
import { SearchOrderFilterPipe } from '../pages/order/searchOrderFilter.pipe'

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { IonicStorageModule } from '@ionic/storage';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FirstpagePage } from '../pages/firstpage/firstpage';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { PointPage } from '../pages/point/point';
import { CouponPage } from '../pages/coupon/coupon';
import { CreditPage } from '../pages/credit/credit';
import { ProductPage } from '../pages/product/product';
import { RewardsPage } from '../pages/rewards/rewards';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { ProductdetailPage } from '../pages/productdetail/productdetail';
import { CartPage } from '../pages/cart/cart';
import { from } from 'rxjs/observable/from';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { OrderPage } from '../pages/order/order';
import {PaymentPage } from '../pages/payment/payment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OtherPage } from '../pages/other/other';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FirstpagePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    PointPage,
    CouponPage,
    CreditPage,
    ProductPage,
    RewardsPage,
    AddproductPage,
    ProductdetailPage,
    SearchProductFilterPipe,
    SearchOrderFilterPipe,
    CartPage,
    EditprofilePage,
    OrderPage,
    PaymentPage,
    OtherPage
    // WebStorageService
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FirstpagePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    PointPage,
    CouponPage,
    CreditPage,
    ProductPage,
    RewardsPage,
    AddproductPage,
    ProductdetailPage,
    CartPage,
    EditprofilePage,
    OrderPage,
    PaymentPage,
    OtherPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    CallNumber,
    ProductService,
    UserService,
    CartService,
    OrderService,
    Facebook
  ]
})
export class AppModule {}
