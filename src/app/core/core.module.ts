import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RequestInterceptor } from "./auth/request.interceptor";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { AlertModule } from "../shared/components/alert/alert.module";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    providers: [//declaration to use the interceptor
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true//can have multiple interceptors 
        }
    ]
})
export class CoreModule {

}