import { Directive, ElementRef, HostListener, Renderer } from "@angular/core";

//Directive is user as an attribute in the tags
@Directive({
    selector: '[darkenOnHover]' //to use the directive as attribute, put it in []
})
export class DarkenOnHoverDirective {

    //ElementRef will give the access in the DOM element
    constructor(private ele: ElementRef, private render: Renderer) { }

    //@HostListener gets the event in the template
    @HostListener('mouseover')
    darkenOn() {
        this.render.setElementStyle(this.ele.nativeElement, 'filter', 'brightness(70%)');
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setElementStyle(this.ele.nativeElement, 'filter', 'brightness(100%)');
    }
}