# Hotspot Frontend

React TypeScript frontend for the Hotspot location-based messaging app.

## Tech Stack

- React & TypeScript
- Vite
- Tailwind CSS & shadcn/ui
- MapBox GL JS
- STOMP.js for WebSocket communication

## Setup

1. **Requirements**: Node.js, MapBox account

2. **Environment Variables** (create `.env` file):
   ```env
   VITE_WS_STOMPJS_URL=ws://localhost:8080/ws
   VITE_WS_CLIENT_PREFIX=/topic
   VITE_WS_CLIENT_URL=/ws
   VITE_WS_SERVER_PREFIX=/app
   VITE_MAPBOX_TOKEN=your_mapbox_access_token
   VITE_BASE_URL=http://localhost:8080
   ```

3. **Run locally**:
   ```bash
   npm install
   npm run dev
   ```

Frontend runs on `http://localhost:5173`

## Features

- Interactive MapBox-powered map
- Real-time chat with WebSocket connection
- Hotspot voting system
- Responsive design with modern UI components
