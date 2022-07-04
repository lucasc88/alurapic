import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ImmediateClickModule } from "src/app/shared/components/card/directives/immediate-click/immediate-click.module";
import { VMessageModule } from "src/app/shared/components/vmessage.module";
import { PhotoModule } from "../photo/photo.module";

import { PhotoFormComponent } from './photo-form.component';

@NgModule({
    declarations: [
        PhotoFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VMessageModule,
        RouterModule,
        PhotoModule,
        ImmediateClickModule
    ]
})
export class PhotoFormModule {

}