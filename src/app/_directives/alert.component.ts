import { OnInit, OnDestroy, Component } from '@angular/core';
import { AlertService } from '../_services';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({selector: 'alert', templateUrl: 'alert.component.html'})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private autoCloseSubscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });

    this.autoCloseSubscription = this.alertService.getMessage().pipe(
      debounceTime(5000)
    ).subscribe(() => this.message = null);
  }

  toType(msg: any) {
    switch (msg.type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning':
      default:
      return 'warning';
    }
  }

  closeAlert() {
    this.message = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.autoCloseSubscription.unsubscribe();
  }
}
