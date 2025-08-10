import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  // --------------------------------------------------------
  // Core state for the detail page
  // --------------------------------------------------------
  hotel: any;                  // Current hotel object being displayed
  loading = true;              // Controls loader visibility
  activeTab = 'Home';          // Default tab on load
  editAddressMode = false;     // Inline edit toggle for Address section
  editInfoMode = false;        // Inline edit toggle for Basic Info section

  // --------------------------------------------------------
  // Toast Notification State
  // Shown after a save action to confirm success to the user
  // --------------------------------------------------------
  showToast = false;
  toastMessage = '';

  // --------------------------------------------------------
  // Chart.js Configuration for Bookings Overview
  // Responsive & minimal grid lines for a cleaner dashboard look
  // --------------------------------------------------------
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{ gridLines: { display: false } }],
      yAxes: [{
        ticks: { beginAtZero: true },
        gridLines: { color: 'rgba(0,0,0,0.05)' }
      }]
    },
    legend: { display: true, position: 'top' }
  };
  
  barChartLabels: Label[] = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [];

  // KPI/Stats widgets displayed above the chart
  statWidgets: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) {}

  // --------------------------------------------------------
  // Lifecycle Hook: OnInit
  // Fetches hotel list, finds the one matching the URL param,
  // and initializes chart + KPI widgets.
  // --------------------------------------------------------
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.hotelService.getHotels().subscribe(
      (hotels: any[]) => {
        // Try matching by ID, fallback to first hotel
        this.hotel = hotels.find(h => String(h.id) === String(id)) || hotels[0] || null;

        if (this.hotel) {
          this.ensureValidCoordinates(); // Prevents Google Maps from breaking
          this.setupChartData();
          this.setupStatWidgets();
        }

        this.loading = false;
      },
      err => {
        console.error('Error fetching hotel details:', err);
        this.loading = false;
      }
    );
  }

  // --------------------------------------------------------
  // Map Helper: Ensure valid coordinates are set.
  // Defaults to Mumbai if data is missing.
  // --------------------------------------------------------
  private ensureValidCoordinates(): void {
    if (!this.hotel.latitude || !this.hotel.longitude) {
      this.hotel.latitude = 19.0760; // Mumbai Lat
      this.hotel.longitude = 72.8777; // Mumbai Lng
    }
  }

  // --------------------------------------------------------
  // Prepares data for the bookings bar chart
  // Fallback data used if bookingsPerMonth is missing.
  // --------------------------------------------------------
  private setupChartData(): void {
    const monthlyData = this.hotel.bookingsPerMonth || 
      [5, 10, 8, 12, 15, 9, 14, 7, 6, 10, 12, 8];

    this.barChartData = [
      {
        data: monthlyData,
        label: 'Bookings',
        backgroundColor: '#4daff7',       // Brand primary blue
        hoverBackgroundColor: '#3aa8f2'   // Slightly darker hover
      }
    ];
  }

  // --------------------------------------------------------
  // Builds the list of KPI/stat widgets for the Home tab
  // --------------------------------------------------------
  private setupStatWidgets(): void {
    this.statWidgets = [
      { label: 'Last Used', value: this.hotel.lastUsed || '-', color: 'primary' },
      { label: 'Upcoming Confirmed', value: this.hotel.upcomingConfirmed ?? 0, color: 'success' },
      { label: 'Upcoming Request', value: this.hotel.upcomingOnRequest ?? 0, color: 'warning' },
      { label: 'Next Booking Date', value: this.hotel.nextBookingDate || '-', color: 'info' },
      { label: 'Complaints', value: `${this.hotel.openComplaints ?? 0}/${this.hotel.totalComplaints ?? 0}`, color: 'danger' },
      { label: 'To Be Paid', value: this.hotel.amountToBePaid || '-', color: 'secondary' }
    ];
  }

  // --------------------------------------------------------
  // UI Toggle Handlers for Edit Modes
  // --------------------------------------------------------
  toggleEditAddress(): void {
    this.editAddressMode = !this.editAddressMode;
  }

  toggleEditInfo(): void {
    this.editInfoMode = !this.editInfoMode;
  }

  // --------------------------------------------------------
  // Save Handlers
  // In a real app, these would send changes to a backend service.
  // Here they just toggle modes off and show a toast.
  // --------------------------------------------------------
  saveAddress(): void {
    this.editAddressMode = false;
    this.showFeedback('Address updated successfully!');
  }

  saveInfo(): void {
    this.editInfoMode = false;
    this.showFeedback('Basic info updated successfully!');
  }

  // --------------------------------------------------------
  // Toast Utility
  // Displays feedback messages for ~2.5 seconds.
  // --------------------------------------------------------
  private showFeedback(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.toastMessage = '';
    }, 2500);
  }

  // --------------------------------------------------------
  // Tab Navigation Handler
  // --------------------------------------------------------
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // --------------------------------------------------------
  // Router Navigation: Back to Search Page
  // --------------------------------------------------------
  goBack(): void {
    this.router.navigate(['/search']);
  }
}
