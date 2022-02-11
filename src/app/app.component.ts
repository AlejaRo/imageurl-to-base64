import { Component, OnInit } from '@angular/core';
import { Base64Service } from './core/services/base64.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private base64Service: Base64Service
  ) {}

  async ngOnInit(): Promise<void> {
    const base64 = await this.base64Service.getBase64(
      'https://e7.pngegg.com/pngimages/44/431/png-clipart-cute-stars-star-yellow-star.png'
    );

    console.log('Test', base64.substring(22));
  }
}
