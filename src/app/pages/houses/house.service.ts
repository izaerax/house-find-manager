import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { House, HOUSES } from './house.model';


declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  houses$ = new BehaviorSubject<House[]>(HOUSES)
  private _filterInput$ = new BehaviorSubject<string>('')

  constructor(private http: HttpClient) {}

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

  fetch(url: string) {
    const data = {
      costPerMonth: 0
    }
    return this.http.get<string>(url)
      .pipe(
        map((htmlString) => {
          console.log(htmlString)
          const htmlPage = jQuery(jQuery.parseHTML(htmlString))
          debugger
          const costPerMonthElement = htmlPage.find('.listing-detail-summary__price-postfix')
          if(costPerMonthElement.length){
            data.costPerMonth = costPerMonthElement.html().split('&')[0]
          }
          return data
        })
      )
  }
}
