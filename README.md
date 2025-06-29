# SAPhackfest-fr_app

A modern, AI-driven platform for reducing food wastage in government canteens, restaurants, and catering services. SAPhackfest-fr_app connects food providers with NGOs and food banks to redistribute surplus food, promotes sustainability, and provides real-time analytics for compliance and reporting.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Target Users](#target-users)
- [How It Works](#how-it-works)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**SAPhackfest-fr_app** is designed to minimize food wastage and maximize the impact of surplus food by leveraging technology and data. The app provides separate dashboards and functionalities for government canteens, restaurants, catering services, and end-users, enabling effective redistribution of surplus food to those in need.

---

## Key Features

- **AI-Driven Forecasting:**  
  Predicts meal demand using historical data, weather, and attendance patterns to minimize waste.

- **Real-Time Inventory Management:**  
  Auto-updates stock levels and alerts for near-expiry ingredients.

- **Surplus Redistribution:**  
  Seamlessly connects with NGOs and food banks to facilitate the donation of excess food.

- **CSR & ESG Reporting:**  
  Tracks food wastage metrics to help organizations comply with CSR and ESG mandates.

- **Role-Based Dashboards:**  
  Personalized experiences for government, restaurant, catering, and user roles.

- **Authentication & Role Management:**  
  Secure login and registration with support for different user roles.

---

## Target Users

- **Government Canteens:**  
  Optimized for schemes like Mid-Day Meals.

- **Restaurants:**  
  Especially suitable for 1-3 star establishments.

- **Catering Services:**  
  Manage surplus from large events and connect with local NGOs.

- **General Users:**  
  View restaurant ratings, hygiene reviews, and contribute feedback.

---

## How It Works

1. **Registration & Login:**  
   Users choose their role (government, restaurant, catering, user) and register or log in.

2. **Dashboard Access:**  
   Each role gets a custom dashboard:
   - **Government:** Staff performance, AI-based meal demand forecasts, event tracking.
   - **Restaurant:** Inventory, surplus tracking, donation options.
   - **Catering:** Event wastage stats, nearby NGO suggestions.
   - **User:** Restaurant ratings, hygiene and safety reviews.

3. **Surplus Food Donation:**  
   Food providers can list surplus food, and the app suggests nearby NGOs for quick redistribution.

4. **Analytics & Reporting:**  
   Instant reports for compliance, auditing, and impact tracking.

---

## Screenshots

<!-- You can add your own screenshots here -->
<!--
![Home Page](assets/home.png)
![Dashboard](assets/dashboard.png)
-->

---

## Getting Started

### Prerequisites

- Node.js & npm
- React Native development environment
- Expo CLI (if using Expo)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/techieRahul17/SAPhackfest-fr_app.git
    cd SAPhackfest-fr_app
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm start
    ```
4. Use an emulator or Expo Go app to preview on your device.

---

## Project Structure

```
/
├── app/
│   ├── index.jsx          # Main Home Page
│   ├── login.jsx          # Login Screen
│   ├── register.jsx       # Registration Screen
│   ├── government/        # Government dashboard
│   ├── restaurant/        # Restaurant dashboard
│   ├── catering/          # Catering dashboard
│   └── user/              # User dashboard
├── context/
│   ├── auth-context.jsx   # Authentication logic & role management
│   └── ...                # Other context providers
├── components/            # Reusable UI components
└── ...
```

---

## Technologies Used

- **React Native**
- **Expo**
- **JavaScript (ES6+)**
- **AsyncStorage** for local data persistence
- **AI/ML** (for demand forecasting – logic can be adapted to real APIs)
- **Modern UI/UX** with animated interactions

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements, bug fixes, or new features.

---

## License

This project is currently unlicensed. Please contact the repository owner for details.

---

**Made with ❤️ for SAP Hackfest.**
