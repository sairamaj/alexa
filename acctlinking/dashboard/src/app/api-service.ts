import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './Configuration';
import { Observable, throwError, Observer } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Token } from './models/Token';
import { AccountLinkInfo } from './models/AccountLinkInfo';

@Injectable()
export class ApiService {
  Configuration: Configuration;
  constructor(private _http: HttpClient) {
    this.Configuration = new Configuration()
  }

  public getAccountLinkingUrl(): Observable<AccountLinkInfo> {
    return this._http.get<AccountLinkInfo>(this.Configuration.getAccountLinkingUrl()).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError), );
  }

  public getTokens(): Observable<Token[]>{
    return this._http.get<Token[]>(this.Configuration.getTokensUrl()).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError), );
  }
  
  public getTokenDetails(token:string): Observable<any>{
    return this._http.get<Token[]>(this.Configuration.getTokenDetailsUrl(token)).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError), );
  }
  
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        const additionalMessage = JSON.stringify(err.error, null, '\t');
        errorMessage = `Server returned code: ${err},
                error message is: ${err.message}
                additional info: ${additionalMessage}`;
    }
    console.error(errorMessage);
    return throwError({ message: errorMessage, error: err});
}
 

}
