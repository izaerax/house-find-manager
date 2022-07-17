import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { House, HOUSES } from './house.model';


@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private _houseData: House[] = HOUSES
  houses$ = new BehaviorSubject<House[]>(this._houseData)
  private _filterInput$ = new BehaviorSubject<string>('')

  constructor(private http: HttpClient) {}

  /**
   * add a new house in the list
   * @param house
   */
  add(house: House) {
    this._houseData.push(house)
    this.houses$.next(this._houseData)
  }

  /**
   * filter the houses and return the filtered stream
   * @returns the stream of houses
   */
  getFilteredStream() {
    return combineLatest([this.houses$, this._filterInput$]).pipe(
      map(([houses, filterInput]) => {
        return houses.filter(house => {
          let allFieldsStr = ''
          for (const [key, value] of Object.entries(house)) {
            if (key === 'dateCreated') {
              allFieldsStr = allFieldsStr + value.toLocaleString() + ' '
            } else {
              allFieldsStr = allFieldsStr + value + ' '
            }
          }
          return allFieldsStr.toLowerCase().indexOf(filterInput.toLowerCase()) !== -1
        })
      })
    )
  }

  /**
   * set the filter input
   * @param query
   */
  filter(query: string) {
    this._filterInput$.next(query)
  }

  /**
   * Fetch the data from the server if is a valid url
   * @param url url to be fetched by the server
   * @returns an house
   */
  fetch(url: string): Observable<House> {
    return this.http.get<House>('http://localhost:3000', {
      params:{url: url}
    })
      .pipe(
        map((resp) => {
          console.log(resp)
          return resp
        })
      )
  }
}
