import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  //selector: 'app-signin', //it's unnecessary 'selector' because this component won't be used in other template component
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  //in the template is used the directive [formGroup]
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      //in the template is used the directive formControlName
      userName: ['', Validators.required],//first position is the value, second is the validators
      password: ['', Validators.required]
    });
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
        });
  }
}
