//source https://www.youtube.com/watch?v=BVzNDETj-CA&ab_channel=ng-conf
import { Provider } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoggingHttpInterceptor } from './logging-http.interceptor';
import { BusyHttpInterceptor } from './busy-http.interceptor';

export const httpInterceptorProviders: Provider[] = [
  {provide: HTTP_INTERCEPTORS, useClass: LoggingHttpInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: BusyHttpInterceptor, multi: true}
]
