import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

//There is no selector because is a scope page component
@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {


    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params.photoId;
        console.log('id: ' + id);
    }

}