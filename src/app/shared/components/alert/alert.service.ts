import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    //attribute to be used by who wants to issue and
    //who wants to get an alert
    alertSubject: Subject<Alert> = new Subject<Alert>();

    //who wants emmit an alert, will request alert()
    private alert(alertType: AlertType, message: string) {
        this.alertSubject.next(new Alert(alertType, message));
    }

    //who wants to know about alerts, will be listening getAlert()
    getAlert() {
        return this.alertSubject.asObservable();
    }

    //methods with each alert type to let easier the creation
    success(message: string) {
        this.alert(AlertType.SUCCESS, message);
    }

    warning(message: string) {
        this.alert(AlertType.WARNING, message);
    }

    danger(message: string) {
        this.alert(AlertType.DANGER, message);
    }

    info(message: string) {
        this.alert(AlertType.INFO, message);
    }

}