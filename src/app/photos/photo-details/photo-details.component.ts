import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/core/user/user.service";
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
        private alertService: AlertService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.photoId = this.activatedRoute.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(this.photoId);

        //In case the user click to back the page, in the browser, after delete a photo,
        //it will redirect to not-found page because that photoId was deleted
        this.photo$.subscribe(() => {}, err => {
            this.router.navigate(['/not-found']);
        });
    }

    remove(id: string){
        this.photoService.removePhoto(this.photoId)
            .subscribe(() => {
                this.alertService.success("Photo removed", true);
                this.router.navigate(['/user', this.userService.getUserName()]);
            },
            err => {
                console.log(err);
                this.alertService.warning("Could not delete the photo", true);
            });
    }
}