import { Component, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { TabsPage } from '../pages/tabs/tabs';
import { FirstpagePage } from '../pages/firstpage/firstpage';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { ProductPage } from '../pages/product/product';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
