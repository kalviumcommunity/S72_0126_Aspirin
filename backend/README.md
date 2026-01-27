# BharatRail Backend API

A simple Node.js/Express backend server that provides REST APIs for the BharatRail application. This server manages real-time train data, community reports, and travel suggestions.

## Features

- REST APIs for trains, stations, community reports, and travel suggestions
- CORS enabled for frontend communication
- Real-time data management
- Simple and scalable architecture

## API Endpoints

### Trains
- `GET /api/trains` - Get all trains (supports filters: ?line=Western&status=on-time)
- `GET /api/trains/:id` - Get a specific train by ID

### Stations
- `GET /api/stations` - Get all stations (supports filter: ?line=Western)
- `GET /api/stations/:id` - Get a specific station by ID

### Community Reports
- `GET /api/reports` - Get all community reports
- `GET /api/reports/:id` - Get a specific report
- `POST /api/reports` - Create a new report

### Travel Suggestions
- `GET /api/suggestions` - Get all travel suggestions

### Routes
- `GET /api/routes` - Get all route options

### Health Check
- `GET /health` - Check server status

## Setup & Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start the server:
```bash
npm start
```

Or with auto-reload during development:
```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

## Environment Variables

Create a `.env` file in the backend directory:
```
PORT=5000
```

## Data Structure

### Train Object
```json
{
  "id": "1",
  "name": "Churchgate Fast",
  "number": "90101",
  "line": "Western",
  "route": { "start": "Virar", "end": "Churchgate" },
  "scheduledTime": "08:15",
  "delayMinutes": 0,
  "crowdLevel": "medium",
  "status": "on-time",
  "isSystemEstimated": true
}
```

### Station Object
```json
{
  "id": "1",
  "name": "Churchgate",
  "code": "CCG",
  "lines": ["Western"]
}
```

### Community Report Object
```json
{
  "id": "1",
  "trainId": "3",
  "trainName": "Virar Fast (90305)",
  "delayType": "15-30 min",
  "additionalInfo": "Signal failure near Bandra",
  "timestamp": "2024-01-25T10:30:00Z",
  "reportCount": 8
}
```

## Technologies Used

- **Express.js** - Web framework
- **CORS** - Cross-Origin Resource Sharing
- **Node.js** - Runtime environment

## Development

For development with hot reload:
```bash
npm run dev
```

This requires `nodemon` to be installed.

## Production Deployment

1. Set up environment variables
2. Build if needed
3. Run with `npm start`

Consider using a process manager like PM2 for production:
```bash
npm install -g pm2
pm2 start server.js --name "bharatrail-backend"
```

## License

MIT
