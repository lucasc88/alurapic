import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new Subject<User>();

  constructor(private tokenService: TokenService) {
    //if the application is closed, the user data won't be available.
    //to avoid this, when user access application again, check for token.
    if (this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }
  }

  setToken(token: string) {
    this.tokenService.setToken(token);



    this.userSubject.next();
  }

  getUser() {
    //when an Observable is returning, who request it can do a subscribe
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;//token is decoded
    this.userSubject.next(user);//emmits the user
  }
}
