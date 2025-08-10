import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelSearchComponent } from './components/hotel-search/hotel-search.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelSearchComponent,
    HotelDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule, // ✅ For Chart.js
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCMBNOLQSuwWGUQL-rmlvP70tdv1H7qslk' // ✅ Replace with actual Google Maps API key
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
