import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();//Subject is a kind of Observable that remains alive

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //the resolver is used here to load photos firstly, before the component is rendered.
    //data['photosResolver'] is the property defined in the AppRouting.module.ts.
    this.photos = this.activatedRoute.snapshot.data['photosResolver'];

    console.log('ngOnInit');
    //Using debounceTime, it will wait 300 milliseconds to get what the user types
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => {
        this.filter = filter;});
  }


  //To kill the debounce to free up memory avoind memory leaking
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
