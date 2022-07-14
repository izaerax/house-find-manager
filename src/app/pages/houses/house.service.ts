import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { House, HOUSES } from './house.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  houses$ = new BehaviorSubject<House[]>(HOUSES)
  private _filterInput$ = new BehaviorSubject<string>('')

  constructor() {}

  //https://youtu.be/Z76QlSpYcck?t=832
  getFilteredStream() {
    return combineLatest([this.houses$, this._filterInput$]).pipe(
      map(([houses, filterInput]) => {
        return houses.filter(house => {
          let allFieldsStr = ''
          for (const [key, value] of Object.entries(house)) {
            allFieldsStr = allFieldsStr + value + ' '
          }
          return allFieldsStr.toLowerCase().indexOf(filterInput.toLowerCase()) !== -1
        })
      })
    )
  }

  filter(query: string) {
    this._filterInput$.next(query)
  }
}
