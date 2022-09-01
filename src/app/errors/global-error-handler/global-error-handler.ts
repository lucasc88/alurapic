import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";
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
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService);

        //if there is message, get it. Otherwise, get the whole error
        const message = error.message ? error.message : error.toString();

        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');

                console.log(message);
                console.log(stackAsString);
                console.log('o que será enviado para o servidor');

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