import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

//Class responsible to detect if the application is running in the browser.
//Its goal is to put conditions to be able to manipulate DOM objects.
//Because if the application is running in the server side (e.g. angular universal),
//it will give an error when trying to manipulate DOM elements.
@Injectable({
    providedIn: 'root'
})
export class PlatformDetectorService {

    constructor(@Inject(PLATFORM_ID) private platformId: string) {
    }

    isPlatformBrowser(){
        return isPlatformBrowser(this.platformId);
    }
}