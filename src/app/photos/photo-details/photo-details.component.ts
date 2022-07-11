import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AlertService } from "src/app/shared/components/alert/alert.service";
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
    photoId: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.photoId = this.activatedRoute.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(this.photoId);

    }

    remove(id: string){
        this.photoService.removePhoto(this.photoId)
            .subscribe(() => {
                this.alertService.success("Photo removed");
                this.router.navigate(['']);
            },
            err => {
                console.log(err);
                this.alertService.warning("Could not delete the photo");
            });
    }
}