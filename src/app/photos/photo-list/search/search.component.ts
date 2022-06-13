import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    debounce: Subject<string> = new Subject<string>();//Subject is a kind of Observable that remains alive

    ngOnInit(): void {
        //Using debounceTime, it will wait 400 milliseconds to get what the user types
        this.debounce
            .pipe(debounceTime(400));
    }

    //To kill the debounce to free up memory avoind memory leaking
    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }
}