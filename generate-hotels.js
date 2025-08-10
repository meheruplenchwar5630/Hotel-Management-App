/**
 * Hotel Data Generator Script
 * ----------------------------
 * This script generates mock hotel data for development/demo purposes.
 * 
 * Improvements over earlier version:
 * 1. Curated Unsplash hotel images instead of random picsum images.
 * 2. Real-world city coordinates for each state to avoid ocean map markers.
 * 3. Slight coordinate randomization to distribute hotels within the city area.
 */

const fs = require('fs');

// Hotel providers for diversity in mock data
const providers = ['Expedia', 'Booking.com', 'Agoda', 'MakeMyTrip', 'Goibibo', 'Cleartrip'];

// Supported states for mock hotels
const states = ['Maharashtra', 'Karnataka', 'Goa', 'Rajasthan', 'Kerala', 'Tamil Nadu'];

// Single-country mock (India)
const countries = ['India'];

// Currency codes to simulate multi-currency listings
const currencies = ['INR', 'USD', 'EUR'];

// Hotel classifications to make results more realistic
const classifications = ['Luxury', 'Budget', 'Boutique', 'Resort', 'Business'];

// Curated royalty-free hotel images (Unsplash) for better visual quality
const hotelImages = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39"
];

// Real-world city coordinates mapped to states
// Ensures hotels appear on land, not in the sea
const stateCoordinates = {
  Maharashtra:    { lat: 19.0760, lng: 72.8777 }, // Mumbai
  Karnataka:      { lat: 12.9716, lng: 77.5946 }, // Bengaluru
  Goa:            { lat: 15.2993, lng: 74.1240 }, // Panaji
  Rajasthan:      { lat: 26.9124, lng: 75.7873 }, // Jaipur
  Kerala:         { lat: 9.9312,  lng: 76.2673 }, // Kochi
  'Tamil Nadu':   { lat: 13.0827, lng: 80.2707 }  // Chennai
};

// Utility to generate a random integer within a range
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility to generate 12 months of booking data
function generateBookings() {
  return Array.from({ length: 12 }, () => randomInt(5, 30));
}

// Array to hold all generated hotel objects
const hotels = [];

// Generate 200 mock hotels
for (let i = 1; i <= 200; i++) {
  const state = states[randomInt(0, states.length - 1)];
  const provider = providers[randomInt(0, providers.length - 1)];

  // Base coordinates for the chosen state
  const baseCoords = stateCoordinates[state];
  // Slightly randomize to avoid all hotels being in one spot (approx ±5km)
  const latitude  = baseCoords.lat + (Math.random() - 0.5) * 0.05;
  const longitude = baseCoords.lng + (Math.random() - 0.5) * 0.05;

  hotels.push({
    id: i,
    name: `Hotel ${i}`,
    shortName: `H${i}`,
    provider: provider,
    street: `Street ${i}`,
    state: state,
    country: countries[0],
    pincode: `4${randomInt(10000, 99999)}`,
    email: `hotel${i}@example.com`,
    phone: `+91-${randomInt(7000000000, 9999999999)}`,
    type: classifications[randomInt(0, classifications.length - 1)],
    currency: currencies[randomInt(0, currencies.length - 1)],
    location: `${state}, India`,

    // Assign hotel image from curated list, resize & crop to consistent dimensions
    image: `${hotelImages[i % hotelImages.length]}?w=400&h=300&fit=crop`,

    latitude,
    longitude,

    lastUsed: `2025-${String(randomInt(1, 12)).padStart(2, '0')}-${randomInt(10, 28)}`,
    upcomingConfirmed: randomInt(0, 15),
    upcomingOnRequest: randomInt(0, 10),
    nextBookingDate: `2025-${String(randomInt(1, 12)).padStart(2, '0')}-${randomInt(10, 28)}`,
    openComplaints: randomInt(0, 5),
    totalComplaints: randomInt(0, 10),
    amountToBePaid: `₹${randomInt(5000, 50000)}`,
    bookingsPerMonth: generateBookings(),

    about: `Hotel ${i} is a top-rated property in ${state} with premium facilities, outstanding service, and prime location.`,

    classification: {
      stars: randomInt(1, 5),
      category: classifications[randomInt(0, classifications.length - 1)],
      rooms: randomInt(20, 200),
      facilities: ['Free WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Restaurant', 'Bar']
    },

    products: [
      { name: 'Deluxe Room', price: `₹${randomInt(3000, 7000)}` },
      { name: 'Suite Room', price: `₹${randomInt(7000, 15000)}` },
      { name: 'Family Room', price: `₹${randomInt(5000, 12000)}` }
    ],

    terms: "Check-in time is 2 PM, and check-out is 11 AM. Free cancellation up to 48 hours before check-in.",

    finance: {
      totalRevenue: `₹${randomInt(100000, 500000)}`,
      totalExpenses: `₹${randomInt(50000, 250000)}`,
      profitMargin: `${randomInt(10, 40)}%`
    },

    notes: `Special seasonal offer available for bookings in ${state}.`
  });
}

// Write output to hotels.json
fs.writeFileSync('./src/assets/data/hotels.json', JSON.stringify(hotels, null, 2));
console.log('✅ 200 Hotels generated successfully with curated images & realistic coordinates!');
