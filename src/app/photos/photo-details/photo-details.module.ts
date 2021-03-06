import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PhotoModule } from "../photo/photo.module";
import { PhotoDetailsComponent } from "./photo-details.component";
import { PhotoCommentsComponent } from './photo-comment/photo-comments.component';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { VMessageModule } from "src/app/shared/components/vmessage.module";
import { PhotoOwnerOnlyDirective } from "./photo-owner-only/photo-owner-only.directive";
import { showIfLoggedModule } from "src/app/shared/components/card/directives/show-if-logged/show-if-logged.module";

@NgModule({
    declarations: [
        PhotoDetailsComponent,
        PhotoCommentsComponent,
        PhotoOwnerOnlyDirective//the other declared components can use PhotoOwnerOnlyDirective
        //however it's not in exports because it doesn't make sense to be used on other external components
    ],
    exports: [
        PhotoDetailsComponent,
        PhotoCommentsComponent
    ],
    imports: [
        CommonModule,
        PhotoModule,
        RouterModule,
        ReactiveFormsModule,
        VMessageModule,
        showIfLoggedModule
    ]
})
export class PhotoDetailsModule{

}