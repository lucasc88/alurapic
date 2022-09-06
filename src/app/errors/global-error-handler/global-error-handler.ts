import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/core/user/user.service";
import { environment } from "src/environments/environment";
import * as StackTrace from "stacktrace-js";
import { ServerLogService } from "./server-log.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    //Firstly, the injection in the GlobalErrorHandler is on demand using
    //Injector because a direct injection is made (e.g. UserService), the
    //UserService will be created first and then the GlobalErrorHandler. However
    //if we have an error in the UserService, the GlobalErrorHandler will not be able
    //to let us know because it was not created yet.
    constructor(private injector: Injector) {

    }

    handleError(error: any): void {
        console.log('passed through the Error Handler');

        //to get the URL and the userName using injector
        const location = this.injector.get(LocationStrategy);

        //check if it's a instanceof PathLocationStrategy to get the URL, otherwise is a empty string
        const url = location instanceof PathLocationStrategy ? location.path() : '';

        //inject the UserService
        const userService = this.injector.get(UserService);

        const serverLogService = this.injector.get(ServerLogService);

        const router = this.injector.get(Router);

        //if there is message, get it. Otherwise, get the whole error
        const message = error.message ? error.message : error.toString();

        //check if it's a Production environment to redirect.
        //Otherwise, the error will stay in the page.
        if(environment.production){
            router.navigate(['/error']);
        }

        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');

                console.log("Message: " + message);
                console.log("StackAsString: " + stackAsString);
                
                console.log('*********What will be sent to the server*********');
                serverLogService.log({
                    message,
                    url,
                    userName: userService.getUserName(),
                    stack: stackAsString
                }
                ).subscribe(
                    () => console.log('Error logged on server'),
                    err => {
                        console.log(err);
                        console.log('Fail to send error log to server');
                    }
                )
            });
    }
}