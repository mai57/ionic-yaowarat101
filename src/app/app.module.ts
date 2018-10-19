import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

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
    RewardsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    RewardsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
