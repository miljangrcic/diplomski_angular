import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../modules/shared/models/login-credentials';
import { TokenWrapper } from '../modules/shared/models/token-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject(false);
  get isLoggedIn$() : Observable<boolean> {return this.isLoggedInSubject.asObservable() }

  constructor(private http: HttpClient) { 
    this.initializeLoggedInState();
  }

  public login(loginCredentials: LoginCredentials) {
    let url = `${environment.API_BASE_URL}/auth/login`;
    return this.http.post<TokenWrapper>(url, loginCredentials).pipe(tap(response => {
      this.storeToken(response);
      this.isLoggedInSubject.next(true);
    }))
  }

  public logout() : void {
    this.removeToken();
    this.isLoggedInSubject.next(false);
  }

  public getToken() : TokenWrapper {
    let tokenWrapper : TokenWrapper = {
      token: this.getTokenString(),
      expirationTime: this.getTokenExpiration(),
    }

    return tokenWrapper;
  }


  private initializeLoggedInState() : void {
    
    let token = this.getToken();

    if(this.isValidToken(token)) 
      this.isLoggedInSubject.next(true);
    else 
      this.removeToken();
    
  }

  private getTokenString() : string {
    return localStorage.getItem("JWT");
  }

  private getTokenExpiration() : Date {
    let expirationString = localStorage.getItem("Expiration");
    let expiration = new Date(expirationString);
    return expiration;
  }

  private isValidToken(tokenWrapper: TokenWrapper) : boolean {
    let currentTime = new Date();
    let isExpired = currentTime > tokenWrapper.expirationTime;

    return tokenWrapper.token && !isExpired;
  }

  private storeToken(tokenWrapper: TokenWrapper) : void {
    localStorage.setItem("JWT", tokenWrapper.token);
    localStorage.setItem("Expiration", tokenWrapper.expirationTime.toString());
  }

  private removeToken() : void {
    localStorage.removeItem("JWT");
    localStorage.removeItem("Expiration");
  }
}
