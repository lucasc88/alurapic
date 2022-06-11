import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { PhotoComponent } from "./photo.component";


@NgModule({
    declarations: [
        PhotoComponent
    ],
    imports: [
        CommonModule, //this module has all the Angular directives (ngFor, ngIf, ngClass, etc)
        HttpClientModule
    ],
    exports: [
        PhotoComponent
    ]
})
export class PhotoModule {

}