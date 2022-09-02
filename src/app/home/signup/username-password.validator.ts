import { FormGroup, ValidatorFn } from "@angular/forms";

/**
 * Function validation responsible to check if the userName is different of password using corssfield
 * 
 * @param formGroup 
 * @returns 
 */
export const userNamePasswordValidator: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;

    //check if there is something to valid
    if (userName.trim() + password.trim()) {
        //if the userName is different of password, returns null
        return userName != password ? null : { userNameEqualPassword: true };
    } else {
        return null;
    }

}