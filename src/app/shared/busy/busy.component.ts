import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BusyService } from './busy.service';

@Component({
  selector: 'app-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnInit {

  busyState$: Observable<{isBusy: boolean, message: string}>

  constructor(busyService: BusyService) {
    this.busyState$ = busyService.busyState$.asObservable()
  }

  ngOnInit(): void {
  }

}
