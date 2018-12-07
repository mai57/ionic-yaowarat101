import { Component, Inject, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { TabsPage } from '../pages/tabs/tabs';
import { FirstpagePage } from '../pages/firstpage/firstpage';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { ProductPage } from '../pages/product/product';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { OrderPage } from '../pages/order/order';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'ล่าสุด', component: AboutPage },
      { title: 'ตะกร้าสินค้า', component: OrderPage },
      { title: 'เกี่ยวกับ', component: AboutPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
