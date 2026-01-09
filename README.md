# Auth Demo App - Frontend Assignment

![Project Status](https://img.shields.io/badge/Status-Complete-success)
![Tech Stack](https://img.shields.io/badge/Stack-React_Vite_Tailwind-blue)

A high-fidelity frontend application demonstrating robust authentication flows, protected routes, and interactive dashboard features. Built for the Bayone Solutions frontend developer assignment.

## 🚀 Live Demo

[Live Demo Application](https://bayonesolutions.netlify.app)

## ✨ Key Features

- **Split-Screen Authentication**: A modern, responsive login page with simulated backend connectivity.
- **Resilient Connectivity**: Automatically degrades to "Mock/Offline Mode" if the backend API (`reqres.in`) is unreachable or blocks requests (CORS), ensuring the demo never breaks.
- **SaaS-Style Dashboard**:
  - **Bento Grid Layout**: Responsive data visualization.
  - **Real-Time Filtering**: Instant search across team members.
  - **View Switching**: Toggle between Overview, Team, and Analytics views.
- **Smart Navigation**: Sidebar for desktop, optimized top bar for mobile.
- **Secure Architecture**:
  - `localStorage` token management with expiry.
  - `Axios` interceptors for automatic header injection and 401 handling.
  - Protected Route wrappers.

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3 (Custom configuration with 'Outfit' typography)
- **HTTP Client**: Axios & Fetch API
- **Routing**: React Router DOM v6
- **Icons**: Heroicons (SVG)

## 🏃‍♂️ Getting Started

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd auth-demo-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Login Credentials (Pre-filled)**
    - **Email**: `eve.holt@reqres.in`
    - **Password**: `cityslicka`

## 🏗️ Build for Production

```bash
npm run build
```

## 📂 Project Structure

```
src/
├── api/            # Axios instance and interceptors
├── components/     # Reusable UI components (LogoutButton, ProtectedRoute)
├── pages/          # Full page views (Login, Dashboard)
├── utils/          # Auth helpers (token management)
└── main.jsx        # App entry point
```

---
*Submitted by [Your Name]*
