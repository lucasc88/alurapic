import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();//Subject is a kind of Observable that remains alive

  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    //the resolver is used here to load photos firstly, before the component is rendered.
    //data['photosResolver'] is the property defined in the AppRouting.module.ts.
    this.photos = this.activatedRoute.snapshot.data['photosResolver'];

    this.userName = this.activatedRoute.snapshot.params.userName;

    //Using debounceTime, it will wait 300 milliseconds to get what the user types
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => {
        this.filter = filter;
      });
  }


  //To kill the debounce to free up memory avoind memory leaking
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  load() {
    //++ because the second time need to be 2, so a pre increment is necessary
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        //concat the new photos from the backend to the this.photos
        //in this way, the OnChanges() in photos.component will get this modification.
        //Angular only detect a modification in a @Input() when there is a new assignment in it
        this.photos = this.photos.concat(photos);
        if (!photos.length) {//when no more photos
          this.hasMore = false;
        }
      });
  }
}
