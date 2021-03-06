import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API_KEY, API_ROOT } from '../constants/constants';

@Injectable()
export class WeatherService {

  constructor(private jsonp: Jsonp) {

  }

  getCurrentLocation(): Observable<any> {

    if (navigator.geolocation) {
      return Observable.create(observer => {
        navigator.geolocation.getCurrentPosition(position => {
          observer.next(position)
        }),
          err => {
            return Observable.throw(err);
          }
      });
    }
    else {
      return Observable.throw("Geolocation not available")
    }
  }

  getCurrentWeather(lat: number, long: number): Observable<any> {

    const url = API_ROOT + API_KEY + "/" + lat + "," + long;
    const queryParams = "?callback=JSONP_CALLBACK";

    return this.jsonp.get(url + queryParams)
      .map(data => data.json())
      .catch(err => {
        console.error("Unable to get weather data - ", err);
        return Observable.throw(err.json());
      });

  }

}
