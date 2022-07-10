import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;
  comments$: Observable<PhotoComment[]>;
  commentForm: FormGroup;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    })
  }

  //After the POST to add a comment, using the same Observable flow, the list of comments
  //is updated by switchMap. SwitchMap changes the data flow from addComments to getComments
  //and then, the subscribe will use the last data flow result (getComments()), so,
  //just update the comments$.
  //It doesn't work to make a POST and then a GET because they are asynchronous requests.
  //One can run before the other.
  save() {
    const comment = this.commentForm.get('comment').value;
    this.comments$ = this.photoService
      .addComment(this.photoId, comment)
      //pipe to use the switchMap
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      //pipe to use tap(). Tap doesn't change the flow. It's usefull to run others procedures
      .pipe(tap(() => {
        this.commentForm.reset();
        alert('Comment registered successfully');
      }));
  }
}
