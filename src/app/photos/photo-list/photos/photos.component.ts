import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [];

  //row will have an array of arrays:
  //[1,2,3,],
  //[4,5,6,],
  //[7,8]
  rows: Photo[] = [];

  constructor() { }


  //ngOnChanges() receives all the possible changes in the @Input() variable
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos)//If there is a changes in the @Input()
      this.rows = this.groupColumns(this.photos);
  }


  private groupColumns(photos: Photo[]) {
    const newRows = [];

    for (let i = 0; i < photos.length; i += 3) {
      //it starts spliting in position from 0 to 2
      newRows.push(photos.slice(i, i + 3));
    }
    return newRows;
  }
}
