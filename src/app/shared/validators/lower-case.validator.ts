import { AbstractControl, Validators } from "@angular/forms";

export function lowerCaseValidator(control: AbstractControl) {//control is the element
    //must be lower case and it can have numbers
    if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true };//if there is an invalid value 
    }
    return null;
}