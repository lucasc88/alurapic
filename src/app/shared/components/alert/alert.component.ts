import { Component, Input, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() timeout = 3000;//after 3 seconds, it disapears

  //this array will keep all the alerts
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {

    this.alertService
      .getAlert()
      .subscribe(alert => {
        if (!alert) {//if a null alert is emmited, all the array will be cleaned
          this.alerts = [];
          return;
        }
        //if there is a value, add into array
        this.alerts.push(alert);
        //after 3 seconds, the alert will be removed
        setTimeout(() => this.removeAlert(alert), this.timeout);
      }
      );
  }

  //it filters all the alerts that are different from the last one that was added
  removeAlert(alertToRemove: Alert) {
    this.alerts = this.alerts
      .filter(alert => alert != alertToRemove);
  }

  //just add the specific bootstrap class
  getAlertClass(alert: Alert) {
    if (!alert) {
      return '';
    }

    switch (alert.alertType) {
      case AlertType.DANGER:
        return 'alert alert-danger';
      case AlertType.INFO:
        return 'alert alert-info';
      case AlertType.SUCCESS:
        return 'alert alert-success';
      case AlertType.WARNING:
        return 'alert alert-warning';
    }
  }

}
