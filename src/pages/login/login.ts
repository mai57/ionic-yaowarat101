import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LinkApi } from '../../app/app.link-api';
import { UserService } from '../firstpage/user.service';
// import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  linkApi = LinkApi.link;
  picApi = LinkApi.pic;
  errorUser = "";
  login = {
    email: "",
    password: ""
  };
  confirmPassword = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, 
    private userService: UserService,
    private storage: Storage,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async loginBtn() {
    // console.log(this.login)
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.userService.getUsers().subscribe(async data => {
      // console.log(data);
      // console.log(this.login);
      // console.log(" ");
      var checkEmail = false;
      data.forEach(async val => {
        if (val.u_Email == this.login.email) {
          // console.log(val.u_Email + " ==== " + this.login.email)
          checkEmail = true;
          if (val.u_Password == this.login.password) {
            // console.log(val.u_Password + " ==== " + this.login.password)
            this.storage.set('userId', val.u_Id);
            this.storage.set('userName', val.u_Name);
            this.storage.set('userRole', val.u_Role);
            this.storage.set('userPoint', val.u_Point);
            
            loading.present();
            setTimeout(() => {
              this.navCtrl.push(TabsPage);
            }, 1000);
        
            setTimeout(() => {
              loading.dismiss();
            }, 3000);
            
          }
          else {
            // alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
            // await swal({
            //   title: 'เข้าสู่ระบบ',
            //   text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
            //   type: 'error',
            //   showConfirmButton: true
            // })
            this.errorUser = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
          }
        }

      });
      if (checkEmail == false) {
        this.errorUser = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
      }
    })




    // console.log()
  }

}
