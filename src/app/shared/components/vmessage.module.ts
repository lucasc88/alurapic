import { NgModule } from "@angular/core";
import { VMessageComponent } from "./vmessage.component";
import { AlertComponent } from './alert/alert.component';

@NgModule({
    declarations: [
        VMessageComponent
    ],
    exports: [
        VMessageComponent
    ]
})
export class VMessageModule { }