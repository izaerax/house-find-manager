import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { BusyService } from '../busy/busy.service';

@Injectable()
export class BusyHttpInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const msg = request.method === 'GET' ? 'Looading...' : 'Saving...';
    this.busyService.increment(msg)
    return next.handle(request).pipe(
      finalize(() => {
        this.busyService.decrement()
      })
    );
  }
}
