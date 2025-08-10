# 🏨 Hotel Management Dashboard

An **Angular-based hotel management application** for browsing, viewing, and managing hotel details.  
Includes **interactive maps**, **booking analytics**, and **inline editing** for hotel information.

---

## 🚀 Features

- **Hotel Search & Listing**
  - Search hotels with filters
  - Responsive hotel cards with hover effects

- **Hotel Detail View**
  - Address & basic info with edit functionality
  - KPI/stat widgets (Last Used, Upcoming Bookings, Complaints, Payments)
  - Monthly booking overview chart
  - Google Maps location marker

- **Tabs for Organized Info**
  - Home, About, Classification, Products, Terms, Finance, Notes

- **Data**
  - Auto-generated hotel dataset using Node.js script
  - Curated royalty-free hotel images

- **UI/UX**
  - Bootstrap 5 for responsive design
  - SCSS variables for theme colors
  - Toast notifications for actions (e.g., Save)

---

## 🛠 Tech Stack

- **Frontend:** Angular 15+, TypeScript, Bootstrap 5, SCSS
- **Charts:** Chart.js via ng2-charts
- **Maps:** Angular Google Maps (AGM)
- **Data Generation:** Node.js (faker/random data)

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone <git_url>
cd hotel-app

# Install dependencies
npm install

# Run the development server
ng serve
