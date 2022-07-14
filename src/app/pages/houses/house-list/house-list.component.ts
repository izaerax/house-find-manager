import { DataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Observable, filter } from 'rxjs';
import { House } from '../house.model';
import { HouseService } from '../house.service';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseListComponent {
  dataSource: HouseDataSource
  displayedColumns = ['name', 'address', 'costPerMonth', 'deposit', 'mq', 'dateCreated']
  showEditComponent$!: Observable<boolean>

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('input')
  filterInput!: ElementRef;

  constructor(
    private houseService: HouseService,
    route: ActivatedRoute,
    private router: Router
  ) {
    this.dataSource = new HouseDataSource(houseService.getFilteredStream(), this.paginator)

    //https://stackoverflow.com/questions/48977775/activatedroute-subscribe-to-first-child-parameters-observer
    this.showEditComponent$ = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => route),
        map((activeRoute) => {
          if(activeRoute.snapshot.firstChild && activeRoute.snapshot.firstChild.paramMap.get('id') !== null) {
            return true
          } else {
            return false
          }
        })
      )
  }

  onChangeFilter() {
    this.houseService.filter(this.filterInput.nativeElement.value)
  }
}


/**
   * Data source to provide what data should be rendered in the table. Note that the data source
   * can retrieve its data in any way. In this case, the data source is provided a reference
   * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
   * the underlying data. Instead, it only needs to take the data and send the table exactly what
   * should be rendered.
   */
export class HouseDataSource extends DataSource<House> {

  paginator: MatPaginator
  data: Observable<House[]>

  /** Stream of data that is provided to the table. */
  constructor(data: Observable<House[]>, paginator: MatPaginator) {
    super()
    this.data = data
    this.paginator = paginator
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<House[]> {
    return this.data;
  }

  disconnect() {}
}
