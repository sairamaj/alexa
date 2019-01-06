import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LinkingComponent } from './linking/linking.component';
import { RefreshTokenComponent } from './refreshtoken/refresh.component';
import { RouterModule } from '@angular/router';
import { TokenDetailsComponent } from './tokens/tokendetails.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkingComponent,
    RefreshTokenComponent,
    TokenDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'tokens/:token', component: TokenDetailsComponent },
      { path: 'refreshtoken/:token', component: RefreshTokenComponent },
      { path: '', component: HomeComponent },
      { path: '*', component: HomeComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
