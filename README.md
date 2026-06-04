# Weather Dashboard

> A clean, responsive weather dashboard that fetches real-time data from a public weather API and displays it in a minimal, easy-to-read interface. Built with HTML, CSS, and TypeScript.

---

## Overview

A straightforward project with a focused scope: fetch live weather data, handle API state properly, and present it cleanly. No frameworks, no build complexity — just vanilla TypeScript compiled to the browser.

---

## Features

- **Current conditions** — temperature, feels-like, humidity, wind speed, weather description
- **Search by city** — type any city name, get results instantly
- **Unit toggle** — switch between Celsius and Fahrenheit
- **Responsive layout** — works on mobile and desktop
- **Loading and error states** — handled gracefully (no blank screens on failed requests)

---

## Tech Stack

| Technology | Role |
|---|---|
| TypeScript | Application logic + API calls |
| HTML5 | Markup |
| CSS3 | Styling + responsive layout |
| OpenWeatherMap API | Weather data source |

No frameworks. No build tools beyond the TypeScript compiler. Intentionally minimal.

---

## Getting Started

### Prerequisites

- Node.js (for the TypeScript compiler)
- A free [OpenWeatherMap API key](https://openweathermap.org/api)

### Setup

```bash
git clone https://github.com/rahul4018/weather-dashboard.git
cd weather-dashboard

npm install
```

Add your API key. Create a `config.ts` file (or update the existing one):

```typescript
export const API_KEY = 'your_openweathermap_api_key_here';
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';
```

### Build and run

```bash
# Compile TypeScript
npx tsc

# Open in browser
open index.html
```

Or use a dev server:

```bash
npx serve .
```

---

## Project Structure

```
weather-dashboard/
├── src/
│   ├── main.ts         # Entrypoint — event listeners, UI updates
│   ├── api.ts          # API fetch functions
│   ├── types.ts        # TypeScript interfaces for API responses
│   └── config.ts       # API key and base URL
├── dist/               # Compiled JS (generated)
├── styles/
│   └── main.css
├── index.html
├── tsconfig.json
└── package.json
```

---

## Why TypeScript for a small project?

A few reasons worth noting:

- The OpenWeatherMap API response is a deeply nested object. TypeScript interfaces make destructuring it safe — no silent `undefined` errors
- The unit conversion logic (C ↔ F) is a good example of where typed functions prevent subtle bugs
- It's good practice — even small projects benefit from the habit

---

## API Usage

This project uses the [OpenWeatherMap Current Weather API](https://openweathermap.org/current).

Free tier: 1,000 calls/day — more than enough for personal use.

---

## License

MIT
