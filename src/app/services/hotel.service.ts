import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private hotelsCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  getHotels(): Observable<any[]> {
    if (this.hotelsCache) {
      // Return cached data instantly
      return of(this.hotelsCache);
    } else {
      // First time fetch from JSON
      return this.http.get<any[]>('/assets/data/hotels.json').pipe(
        tap(data => this.hotelsCache = data), // store in cache
        catchError(error => {
          console.error('Error fetching hotels:', error);
          return throwError(() => new Error('Failed to load hotel data.'));
        })
      );
    }
  }
}
