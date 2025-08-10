import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelService } from './hotel.service';

@Injectable({
  providedIn: 'root'
})
export class HotelResolver implements Resolve<any> {
  constructor(private hotelService: HotelService) {}

  resolve(): Observable<any> {
    return this.hotelService.getHotels();
  }
}
