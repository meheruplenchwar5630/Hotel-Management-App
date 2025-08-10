import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelSearchComponent } from './components/hotel-search/hotel-search.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { HotelResolver } from './services/hotel-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: HotelSearchComponent, resolve: { hotels: HotelResolver } },
  { path: 'hotel/:id', component: HotelDetailComponent, resolve: { hotels: HotelResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
