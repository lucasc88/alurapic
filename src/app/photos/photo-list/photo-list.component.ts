import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';

  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    //when the same URL is resquested, the line bellow will not work because the component
    //was already loaded. To solve this problem, just run a subscribe in the URL to listen
    //the parameters changes in the URL.
    //this.userName = this.activatedRoute.snapshot.params.userName;
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;

      //the resolver is used here to load photos firstly, before the component is rendered.
      //data['photosResolver'] is the property defined in the AppRouting.module.ts.
      this.photos = this.activatedRoute.snapshot.data['photosResolver'];
    }
    );
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
