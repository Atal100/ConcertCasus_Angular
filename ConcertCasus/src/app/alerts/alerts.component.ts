import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnDestroy {
private subs: Subscription;
msg: any;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subs = this.alertService.getMessage().subscribe(msg => {
      this.msg = msg;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
