# Weather Dashboard

A weather dashboard built with Next.js (App Router), TypeScript, and Tailwind CSS. Fetches current weather data from the OpenWeatherMap API and displays it in a clean, responsive interface.

---

## Overview

This is a learning project for working with Next.js App Router conventions, TypeScript, and component-based UI via shadcn/ui. It fetches live weather data from a public API, handles loading and error states, and renders the result in a responsive layout.

---

## Features

- Current weather conditions by city name: temperature, feels-like, humidity, wind speed, description
- Unit toggle between Celsius and Fahrenheit
- Loading and error states handled in the UI
- Responsive layout via Tailwind CSS

---

## Tech Stack

| Technology      | Role                                         |
|-----------------|----------------------------------------------|
| Next.js 14      | Framework — App Router, server components    |
| TypeScript      | Type safety across components and API layer  |
| Tailwind CSS    | Styling and responsive layout                |
| shadcn/ui       | UI component primitives                      |
| OpenWeatherMap  | Weather data API (free tier)                 |
| pnpm            | Package manager                              |

---

## Project Structure

```
weather-dashboard/
├── app/              # Next.js App Router — pages and layouts
├── components/       # React UI components (some via shadcn/ui)
├── hooks/            # Custom React hooks (data fetching, state)
├── lib/              # Utility functions, API client
├── styles/           # Global CSS
├── public/           # Static assets
├── components.json   # shadcn/ui config
├── next.config.mjs   # Next.js config
└── tsconfig.json
```

---

## Setup

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- An [OpenWeatherMap API key](https://openweathermap.org/api) (free tier)

### Installation

```bash
git clone https://github.com/rahul4018/weather-dashboard.git
cd weather-dashboard
pnpm install
```

### Environment variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Testing

No tests have been implemented.

---

## Limitations

- No caching — each search triggers a fresh API call
- No forecast data, only current conditions
- No geolocation support; city search only
- Free tier API key rate limits apply (60 calls/minute, 1,000,000/month)
- No persistent state — search history is not saved between sessions

---

## License

MIT
