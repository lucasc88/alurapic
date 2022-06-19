import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //BehaviorSubject<User> holds the data until the template is rendered.
  //Using the Subject<User>, the header.component.html was trying to render the user name
  //but the Subject<User> had already emitted the value.
  private userBehaviorSubject = new BehaviorSubject<User>(null);

  constructor(private tokenService: TokenService) {
    //if the application is closed, the user data won't be available.
    //to avoid this, when user access application again, check for token.
    if (this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    //when an Observable is returning, who request it can do a subscribe
    return this.userBehaviorSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;//token is decoded
    this.userBehaviorSubject.next(user);//emmits the user
  }

  logout() {
    this.tokenService.removeToken();
    this.userBehaviorSubject.next(null);
  }
}
