import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css'],
})
export class RefreshTokenComponent implements OnInit {

  constructor() { 
    console.log('in refresh token component constructor.')
  }

  ngOnInit() {
  }

}
