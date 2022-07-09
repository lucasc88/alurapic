import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Photo } from "../photo/photo";
import { PhotoService } from "../photo/photo.service";

//There is no selector because is a scope page component
@Component({
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.css']
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private photoService: PhotoService
    ) { }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(id);
    }

}