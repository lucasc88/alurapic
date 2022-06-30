import { Component, OnInit } from '@angular/core';

@Component({
  //selector: 'app-home', it has no selector because is a scope page component
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
