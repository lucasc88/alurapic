import { Directive, ElementRef, Input, OnInit, Renderer } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";

//Directive responsible to show some tags if the user is logged
@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {


    constructor(
        private element: ElementRef<any>,//element on which the directive was added
        private rendered: Renderer,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        !this.userService.isLogged()
            && this.rendered.setElementStyle(this.element.nativeElement, 'display', 'none');
    }
}