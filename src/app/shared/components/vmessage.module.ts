import { NgModule } from "@angular/core";
import { VMessageComponent } from "./vmessage.component";
import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    declarations: [
        VMessageComponent,
        LoadingComponent
    ],
    exports: [
        VMessageComponent
    ]
})
export class VMessageModule { }