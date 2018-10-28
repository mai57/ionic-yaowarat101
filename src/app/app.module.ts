import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProductService } from '../pages/product/product.serveice';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../pages/firstpage/user.service';
import { CartService } from '../pages/cart/cart.service';

//Filter
import { SearchProductFilterPipe } from '../pages/product/searchProductFilter.pipe';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { IonicStorageModule } from '@ionic/storage';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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
    CartPage
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
    CartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    CallNumber,
    ProductService,
    UserService,
    CartService
  ]
})
export class AppModule {}
