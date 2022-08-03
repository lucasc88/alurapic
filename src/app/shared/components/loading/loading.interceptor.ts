import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpSentEvent } from "@angular/common/http";
import { HttpHeaderResponse } from "@angular/common/http";
import { HttpProgressEvent } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { HttpUserEvent } from "@angular/common/http"
import { LoadingService } from "./loading.service";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor {

    constructor(private loadingService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent |
            HttpHeaderResponse |
            HttpProgressEvent |
            HttpResponse<any> |
            HttpUserEvent<any>> {

        return next
            .handle(req)
            .pipe(tap(event => {//tap() allows to do a side effect code
                if (event instanceof HttpResponse) {//if the request has a response
                    this.loadingService.stop();
                } else {
                    this.loadingService.start();//if the request is starting
                }
            }))
    }
}