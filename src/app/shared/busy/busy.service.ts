import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyState$ = new BehaviorSubject<{isBusy: boolean, message: string}>({isBusy: false, message: ''})
  private counter = 0

  constructor() { }

  increment(msg: string) {
    this.counter++
    this.busyState$.next({isBusy: true, message: msg})
  }

  decrement() {
    this.counter--
    if (this.counter === 0) this.busyState$.next({isBusy: false, message: ''})
  }
}
