import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    //attribute to be used by who wants to issue and
    //who wants to get an alert
    alertSubject: Subject<Alert> = new Subject<Alert>();

    //after the route changes, the alert disapers
    keepAfterRouteChange = false;

    constructor(router: Router) {
        //if it's a new navigation, the alert can be shown or not
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    //who wants emmit an alert, will request alert()
    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject.next(new Alert(alertType, message));
    }

    //who wants to know about alerts, will be listening getAlert()
    getAlert() {
        return this.alertSubject.asObservable();
    }

    //methods with each alert type to let easier the creation
    success(message: string, keepAfterRouteChange: boolean = false) {//:boolean = false, by default the alert will not appear
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    clear (){
        this.alertSubject.next(null);
    }
}