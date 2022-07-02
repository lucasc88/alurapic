import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  //selector: 'app-signup', it will have a page scope, so is not necessary 
  templateUrl: './signup.component.html',
  providers: [
    UserNotTakenValidatorService//before, this service was provideIn:'root', now it's used only here
  ]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  //to handle the input email to put focus
  @ViewChild('inputEmail') inputEmail: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
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

    //when this component is initialized, the userName input gains focus
    if (this.platformDetectorService.isPlatformBrowser()) {
      this.inputEmail.nativeElement.focus();
    }
  }

  signup() {
    //getRawValue will take all the form fields and convert to NewUser
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signupService.signup(newUser)
      .subscribe(() =>
        this.router.navigate(['']),//navigate to SignIn page
        error => console.log(error)
      );
  }
}
