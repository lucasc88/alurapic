import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, switchMap, map, first } from "rxjs/operators";
import { SignUpService } from "./signup.service";


//It's an asynchronous validator to check if userName already exist.
//It's a service and validator at the same time.
//It's returns a function validation, an Observable of null or a JS object
@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) { }

    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges//this is an Observable
                .pipe(debounceTime(400))//debounceTime to request each 400 miliseconds
                .pipe(switchMap(userName => //switchMap returns the other Observable(checkUserNameTaken)
                    this.signUpService.checkUserNameTaken(userName)
                ))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))//access the value returned by request (true or false)
                .pipe(first());//first() gets the first emmited value
        }
    }
}