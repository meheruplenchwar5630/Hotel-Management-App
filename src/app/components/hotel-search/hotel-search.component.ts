import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit {

  /**
   * Master list of all hotels fetched from resolver
   */
  hotels: any[] = [];

  /**
   * Filtered list based on user search
   */
  filteredHotels: any[] = [];

  /**
   * Paginated slice of filteredHotels for current page
   */
  pagedHotels: any[] = [];

  /**
   * Search keyword bound to input box
   */
  searchTerm: string = '';

  /**
   * Number of results per page
   */
  pageSize: number = 20;

  /**
   * Current active page number in pagination
   */
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * OnInit lifecycle hook
   * --------------------------------
   * - Retrieves hotels from route resolver before rendering the component
   * - Ensures every hotel has a valid image (adds a random one if missing)
   * - Initializes pagination
   */
  ngOnInit(): void {
    this.hotels = this.route.snapshot.data['hotels'] || [];

    // Ensure every hotel has an image; if missing, assign a random one
    this.hotels = this.hotels.map(hotel => ({
      ...hotel,
      image: hotel.image || this.getRandomHotelImage()
    }));

    // Start with unfiltered dataset
    this.filteredHotels = [...this.hotels];
    this.setPage(1);
  }

  /**
   * Generates a random placeholder hotel image from Unsplash.
   * Random seed ensures the images vary and cache doesn't serve the same image repeatedly.
   */
  private getRandomHotelImage(): string {
    const randomSeed = Math.floor(Math.random() * 1000);
    return `https://source.unsplash.com/400x300/?hotel,resort,luxury&sig=${randomSeed}`;
  }

  /**
   * Filters hotels based on searchTerm.
   * Matches against both `name` and `location` fields (case-insensitive).
   * Resets to page 1 after search to ensure relevant results are shown immediately.
   */
  search(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredHotels = this.hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(term) ||
      hotel.location?.toLowerCase().includes(term)
    );
    this.setPage(1);
  }

  /**
   * Updates the visible hotels based on selected page number.
   * Uses array slicing to avoid unnecessary DOM rendering for all results.
   */
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    this.pagedHotels = this.filteredHotels.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * Computed property for total page count
   * Avoids storing redundant values and recalculates on demand.
   */
  get totalPages(): number {
    return Math.ceil(this.filteredHotels.length / this.pageSize);
  }

  /**
   * Navigates to hotel detail page for the selected hotel.
   * Keeps routing logic clean and centralized in one method.
   */
  goToHotelDetail(id: number): void {
    this.router.navigate(['/hotel', id]);
  }
}
