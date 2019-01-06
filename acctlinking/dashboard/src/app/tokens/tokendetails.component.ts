import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-token-details',
  templateUrl: './tokendetails.component.html',
  styleUrls: ['./tokendetails.component.css'],

})
export class TokenDetailsComponent {
  token: string
  tokenInfo : string
  errorMessage: string;

  constructor(private _route: ActivatedRoute,private _apiService: ApiService) {
    this.token = this._route.snapshot.paramMap.get('token');
    console.log('in token details.:' + this.token)
    this._apiService.getTokenDetails(this.token)
      .subscribe(result => this.tokenInfo = JSON.stringify(result,undefined, 4),
        error => this.errorMessage = <any>error.message)
  }

}
