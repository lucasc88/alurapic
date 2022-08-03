import { Directive, ElementRef, Input, OnInit, Renderer } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";

//Directive responsible to show some tags if the user is logged
@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    currentDisplay: string;

    constructor(
        private element: ElementRef<any>,//element on which the directive was added
        private rendered: Renderer,
        private userService: UserService
    ) { }

    //to hide the side menu, is necessary to get the current menu style and change if necessary.
    //it's because the header is loaded only once in the application.
    //This does not affect the others components that use ShowIfLoggedDirective.
    ngOnInit(): void {
        //getComputedStyle() gives the current style of the element
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;

        this.userService.getUser().subscribe(user => {
            if(user){//user is logged
                this.rendered.setElementStyle(this.element.nativeElement, 'display', this.currentDisplay);
            } else {//user is not logged
                this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
                this.rendered.setElementStyle(this.element.nativeElement, 'display', 'none');
            }
        });
    }
}