import { Component } from '@angular/core';
import { NavController ,Platform} from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fcm_status = {
    "onNotification" : false,
    "wasTapped" : false,
    "NotificationData" : 'none'

  }
  constructor(
    private fcm: FCM,
   private platform : Platform,
    public navCtrl: NavController) {

      this.platform.ready().then(() => {
      
      this.fcm.onNotification().subscribe(data=>{
        this.fcm_status.onNotification = true;
        if(data.wasTapped){
          this.fcm_status.wasTapped = true;
          console.log(JSON.stringify(data));
        } else {
          this.fcm_status.wasTapped = false;
          console.log(">>> Received in foreground");
          console.log(JSON.stringify(data));
        };
        this.fcm_status.NotificationData = JSON.stringify(data);
      })
      

      
      //this.fcm.unsubscribeFromTopic('marketing');
  
  
  
      });

  }

}
