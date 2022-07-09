import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Photo } from "../photo/photo";
import { PhotoComment } from "../photo/photo-comment";
import { PhotoService } from "../photo/photo.service";

//There is no selector because is a scope page component
@Component({
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.css']
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;
    comments$: Observable<PhotoComment[]>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private photoService: PhotoService
    ) { }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(id);
        this.comments$ = this.photoService.getComments(id);
    }

}