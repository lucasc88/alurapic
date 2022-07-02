import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../token/token.service";

//Class responsible for intercepting requests to the server API to check the token
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();
            //cloning the request to put the token
            req = req.clone({
                setHeaders: {//set the headers
                    'x-access-token': token
                }
            });
            console.log('request has been cloned to set the token');
        }
        return next.handle(req);
    }

}