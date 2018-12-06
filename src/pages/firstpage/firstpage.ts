import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UserService } from './user.service';

import { Storage } from '@ionic/storage';

import { LoadingController } from 'ionic-angular';



/**
 * Generated class for the FirstpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstpage',
  templateUrl: 'firstpage.html',
})
export class FirstpagePage {

  isLoggedIn:boolean = false;
  users: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb:Facebook, private userService: UserService, private storage: Storage, public loadingCtrl: LoadingController) {
  
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstpagePage');
    
  }

  onCkickTest(){
    this.navCtrl.push(TabsPage);
  }

  toLogin(){
    this.navCtrl.push(LoginPage);
  }

  toRegister(){
    this.navCtrl.push(RegisterPage);
  }



  toFacebookLogin() {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.fb.login(['public_profile', 'email'])
    .then(res => {
      if(res.status === "connected") {
        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
        



        loading.present();
        setTimeout(() => {
          var userAll: any;
        this.userService.getUsers().subscribe(async users => {
          // console.log(users)
          userAll = users;
          // console.log(this.users);
          var checkAlreadyEmail;
          checkAlreadyEmail = false;
          var userRole;
          var userName;
          var userPoint;
          var userId;
          userAll.forEach(async user => {
            if (user.u_Email == this.users.email) {
              checkAlreadyEmail = true;
              userRole = user.u_Role;
              userId = user.u_Id;
              userName = user.u_Name;
              userPoint = user.u_Point;
            }
          });

          if (checkAlreadyEmail == false) {
            // console.log("don't have email this go register");
            // await swal({
            //   title: 'เข้าสู่ระบบ',
            //   text: 'โปรดสมัครสมาชิกก่อน',
            //   type: 'error',
            //   showConfirmButton: true
            // })
            // this.user.u_Name = userData.name;
            // this.user.u_Email = userData.email;
            // let element: HTMLElement = document.getElementById('pills-Register-tab') as HTMLElement;
            // element.click();

            this.navCtrl.push(RegisterPage, {
              u_Name: this.users.name,
              u_Email: this.users.email,
              u_Gender: this.users.gender,
              u_Password: this.users.id
            });
          }
          else {
            this.storage.set('userId', userId);
            this.storage.set('userName', userName);
            this.storage.set('userRole', userRole);
            this.storage.set('userPoint', userPoint);

            this.navCtrl.push(TabsPage);



            // console.log(userData)
            // window.location.reload(); //test
          }
        })
        }, 3000);
        
            
        setTimeout(() => {
          loading.dismiss();
        }, 3000);
        






        
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(userData => {
        // console.log(userData);
        this.users = userData;
      })
      .catch(e => {
        console.log(e);
      });
  }


}
