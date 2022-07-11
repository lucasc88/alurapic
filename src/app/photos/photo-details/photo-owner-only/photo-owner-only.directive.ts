import { Directive, ElementRef, Input, OnInit, Renderer } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";
import { Photo } from "../../photo/photo";

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef<any>,//element on which the directive was added
        private rendered: Renderer,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.getUser().subscribe(user => {
            //if the logged user is null or logged user is different of the photo owner,
            //the specifc element will have its property display changed to none
            if (!user || user.id != this.ownedPhoto.userId) {
                this.rendered.setElementStyle(this.element.nativeElement, 'display', 'none');
            }
        });
    }
}