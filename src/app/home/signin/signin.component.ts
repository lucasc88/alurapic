import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  //selector: 'app-signin', //it's unnecessary 'selector' because this component won't be used in other template component
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  //in the template is used the directive [formGroup]
  loginForm: FormGroup;

  @ViewChild('userNameInput')
  userNameInput: ElementRef<HTMLInputElement>; //ElementRef is a shell to let angular handle the component to put focus

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      //in the template is used the directive formControlName
      userName: ['', Validators.required],//first position is the value, second is the validators
      password: ['', Validators.required]
    });
    //when this component is initialized, the userName input gains focus
    if (this.platformDetectorService.isPlatformBrowser()) {
      this.userNameInput.nativeElement.focus();
    }
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.authService
      .authenticate(userName, password)
      .subscribe(() => {
        this.router.navigate(['user', userName]); //it will be user/:userName
      },
        error => {
          alert('Invalid user credentials');
          this.loginForm.reset();

          if (this.platformDetectorService.isPlatformBrowser()) {
            this.userNameInput.nativeElement.focus();
          }

        });
  }
}
