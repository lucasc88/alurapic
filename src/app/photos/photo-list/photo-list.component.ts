import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //the resolver is used here to load photos firstly, before the component is rendered.
    //data['photosResolver'] is the property defined in the AppRouting.module.ts.
    this.photos = this.activatedRoute.snapshot.data['photosResolver'];
  }

}
