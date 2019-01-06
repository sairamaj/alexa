import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api-service';
import { Token } from '../models/Token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent {
  title = 'Alex test utility';
  url = "";
  errorMessage: string;
  tokens: Token[];

  constructor(private _apiService: ApiService,
    private _router: Router) {
    console.log('in app.component constructor.')
    this._apiService.getAccountLinkingUrl()
      .subscribe(result => this.url = result.url,
        error => this.errorMessage = <any>error.message)

    this._apiService.getTokens()
      .subscribe(result => this.tokens = result,
        error => this.errorMessage = <any>error.message)
  }

  onRefreshToken(token: string): void {
    console.log('token:' + token)
    this._router.navigate(['/refreshtoken/' + token]);
    console.log('navigated.')
  }
}
