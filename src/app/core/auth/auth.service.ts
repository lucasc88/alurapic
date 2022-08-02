import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

const API_URL = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(userName: string, password: string) {
    return this.http.post( //POST
      API_URL //base URL
      + '/user/login', //path
      {
        userName: userName, //objects
        password: password
      },
      {// to expose the headers and everything in the response
        observe: 'response'
      }
    )
      //between request and response, pipe will run.
      //The component that performs the subcribe, will have the Pipe changes executed before
      .pipe(tap(response => {//tap will run before the subscribe as well, in this case to get the token
        const authToken = response.headers.get('x-access-token');//gets the token in the headers
        this.userService.setToken(authToken);//sets the token in the windows.localStorage
        console.log(`User ${userName} authenticated with token ${authToken}`)
      }))
  }
}
