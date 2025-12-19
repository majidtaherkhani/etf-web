# ETF Analyzer Web App

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

A modern, interactive dashboard designed to visualize Exchange Traded Fund (ETF) data. This application serves as the frontend interface for the ETF Analysis Service, allowing users to upload holdings data and interact with dynamic charts, historical performance metrics, and asset allocation tables.

**Live Demo:** [https://etf-web-wine.vercel.app](https://etf-web-wine.vercel.app)

## 🚀 High-Level Description

This application is designed as a **Single Page Application (SPA)** that prioritizes interactivity and immediate feedback. It acts as a decoupled presentation layer that consumes the calculation power of the Python backend.

The workflow is designed for seamless data exploration:
1.  **Input:** User uploads a CSV file via the UI.
2.  **Processing:** The file is sent to the backend; the frontend awaits the structured JSON response containing NAV history and valuations.
3.  **Visualization:** The state is updated locally, rendering interactive charts (Recharts) without requiring page reloads.

## 🏗 Architecture & Design

The project is built on a **Feature-Based Architecture** designed for scalability. Instead of grouping files by type (e.g., all controllers together), the codebase is organized by **business domain**.

### 1. Shared Component Library (`src/components/`)
This directory contains reusable, domain-agnostic UI primitives used throughout the system. These are "pure" presentational components that ensure visual consistency but contain no business logic.
* **Examples:** `Button`, `Loading`, `Charts` (reusable wrappers), `Card`.

### 2. Feature Modules (`src/features/`)
The core application logic is compartmentalized into features. Currently, the primary feature is **`etf`**. This module is fully self-contained, meaning all logic required for ETF analysis lives here.

Inside `src/features/etf/`, the structure mirrors the global setup but is scoped strictly to this domain:
* `components/`: UI views specific to the ETF dashboard (e.g., `HoldingsTable`, `NavChart`).
* `hooks/`: Custom React hooks handling business logic and state (e.g., `useEtfAnalysis`).
* `api/`: API definitions and endpoints unique to the ETF service.
* `types/`: TypeScript interfaces and models specific to ETF data (e.g., `NavHistory`, `EtfHolding`).
  
### Why this architecture?
* **Encapsulation:** The ETF logic is isolated. Modifying the ETF feature does not risk breaking other potential future features.
* **Scalability:** As the application grows, new features (e.g., `user-profile` or `billing`) can be added as new folders in `features/` without cluttering the existing codebase.
## 🛠 Tech Stack

* **Framework:** React
* **Language:** TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS + PostCSS
* **UI Primitives:** Shadcn UI (Radix UI)
* **Visualization:** Recharts
* **HTTP Client:** Axios
* **Deployment:** Vercel

## ✨ Key Features

* **Interactive Dashboard:** Real-time rendering of ETF metrics including Current NAV and historical performance.
* **Dynamic Charts:** Zoomable history charts using brush tools to inspect specific time ranges.
* **Data Grid:** Sortable and responsive tables for inspecting individual holdings.
* **Responsive Design:** Fully optimized for desktop and mobile viewports.

## 🔌 API Integration

The frontend is configured to communicate with the `etf-service` backend.

* **Base URL:** Configurable via `.env` (backed is up on `https://etf-service-th2v.onrender.com`).
* **Endpoint Used:** `POST /etf/analyze`
* **Data Handling:** The app transforms the backend's JSON response (Snake Case) into frontend-friendly interfaces (Camel Case) where necessary, though direct mapping is preferred for performance.

## 📁 Project Structure

```plaintext
src/
├── api/            # Global API setup (Axios client)
├── components/     # Reusable UI components (Charts, Cards, Buttons)
├── features/       # Business logic features (e.g., ETF Dashboard)
│   ├── api/        # Feature-specific API endpoints
│   ├── components/ # Dashboard-specific views
│   ├── hooks/      # Custom hooks (data fetching, logic)
│   ├── types/      # TypeScript interfaces and models
│   └── utils/      # Data mappers and helpers
├── utils/          # Global utility functions (styling, formatting)
└── App.tsx         # Main application entry
```
## 📋 Assumptions & Constraints

* **Backend Availability:** The application assumes the backend service is running and accessible. No offline-mode or optimistic UI is currently implemented for failed uploads.
* **Currency:** All financial figures (NAV, Share Price) are displayed in **USD**. No currency conversion logic exists on the client side.
* **Browser Support:** The dashboard relies on modern ES6+ features and is optimized for Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported.
* **Single Portfolio Context:** The current design supports analyzing one ETF upload at a time. Uploading a new file replaces the current dashboard state.

## ⚙️ Local Setup & Installation

To run this project locally, you need **Node.js** (v18+) and **npm**.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/majidtaherkhani/etf-web.git
    cd etf-web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Ensure `src/api/client.ts` points to your running backend, or create a `.env` file:
    ```bash
    VITE_API_BASE_URL=https://etf-service-th2v.onrender.com
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view it in your browser.

## ☁️ Deployment

* **Platform:** Vercel (Automatic deployments from Git)
