import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  //selector: 'app-signup', it will have a page scope, so is not necessary 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignUpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName:
        [
          '',//here is the default validator value
          [Validators.required, Validators.minLength(2), Validators.maxLength(40)],//synchronous validators
          this.userNotTakenValidatorService.checkUserNameTaken()//asynchronous validators
        ],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
    });
  }

  signup() {
    //getRawValue will take all the form fields and convert to NewUser
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signupService.signup(newUser)
      .subscribe(() => 
        this.router.navigate(['']),
        error => console.log(error)
      );
  }
}
