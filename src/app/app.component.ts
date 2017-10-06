import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Test1Page } from '../pages/test1/test1';
import { Test2Page } from '../pages/test2/test2';

import { FCM } from '@ionic-native/fcm';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  fcmInfo = {
    "token": '0',
    'data': '0'
  }
  rootPage: any = HomePage;
  
  pages: Array<{title: string, component: any}>;

  constructor(
    private fcm: FCM,
    public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Test1 Page', component: Test1Page },
      { title: 'Test2 Page', component: Test2Page }
    ];
  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      
    this.fcm.subscribeToTopic('marketing');
    this.fcm.getToken().then(token=>{
      console.log('>>> getToken() :\n'+ JSON.stringify(token));
      this.fcmInfo.token = token;
      //backend.registerToken(token);
    })
    
    this.fcm.onNotification().subscribe(data=>{
      if(data.wasTapped){
        console.log(">>> Received in background");
        console.log(JSON.stringify(data));
      } else {
        console.log(">>> Received in foreground");
        console.log(JSON.stringify(data));
      };
      this.fcmInfo.data = JSON.stringify(data);
    })
    
    this.fcm.onTokenRefresh().subscribe(token=>{
      console.log('>>> onTokenRefresh() :\n'+ JSON.stringify(token));
      this.fcmInfo.token = token;
      //backend.registerToken(token);
    })
    
    //this.fcm.unsubscribeFromTopic('marketing');



    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  
}
