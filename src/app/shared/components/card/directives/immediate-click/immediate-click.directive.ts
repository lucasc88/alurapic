import { Directive, ElementRef, OnInit } from "@angular/core";
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

    constructor(
        private element: ElementRef<any>, //<any> can be anything clickable
        private platformDetector: PlatformDetectorService
    ) { }

    ngOnInit(): void {
        if (this.platformDetector.isPlatformBrowser) {//if it's a browser
            this.element.nativeElement.click();
        }
    }
}