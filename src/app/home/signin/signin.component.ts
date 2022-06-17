import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  //selector: 'app-signin', //it's unnecessary 'selector' because this component won't be used in other template component
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  //in the template is used the directive [formGroup]
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      //in the template is used the directive formControlName
      userName: ['', Validators.required],//first position is the value, second is the validators
      password: ['', Validators.required]
    });
  }

}
