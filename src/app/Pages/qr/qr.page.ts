import { Component, OnInit } from '@angular/core';
import { QrService } from 'src/app/Services/qr.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: false
})
export class QrPage implements OnInit {

  
  constructor(public qr: QrService) { }

  ngOnInit() {}
  
Scaneo(){
  this.qr.StartScan()
}

Flashlight(){
  this.qr.flash()
}

}
