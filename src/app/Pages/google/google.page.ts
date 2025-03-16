import { Component, OnInit } from '@angular/core';
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth';
import {isPlatform} from '@ionic/angular';

@Component({
  selector: 'app-google',
  templateUrl: './google.page.html',
  styleUrls: ['./google.page.scss'],
  standalone:false
})
export class GooglePage implements OnInit {
  user = null;

  constructor() { 
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize();
    }
  }


  ngOnInit() {
  }

  async signIn(){
    this.user = await GoogleAuth.signIn();
    console.log('user: ', this.user);
  }

  async refresh(){
    const authCode = await GoogleAuth.refresh();
    console.log('refresh: ', authCode);
  }

}
