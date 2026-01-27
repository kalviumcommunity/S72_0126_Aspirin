# BharatRail - Smart Train Companion

A modern web application that helps commuters make informed decisions about their train journeys. Get real-time train status, community reports, and smart travel suggestions for Indian Railways.

## Features

✨ **Real-Time Train Status** - Live updates on train delays and crowd levels
📱 **Smart Search** - Find the best train option for your journey
👥 **Community Reports** - Share and view real-time updates from fellow commuters
💡 **Smart Suggestions** - Get AI-powered recommendations based on your route
🚀 **Fast & Responsive** - Built with React and modern web technologies

## Project Structure

```
train-buddy-main/
├── frontend/          # React TypeScript application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── data/          # Static data (deprecated - use APIs)
│   │   └── lib/           # Utilities
│   └── package.json
├── backend/          # Node.js/Express API server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   └── data/          # Mock data
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup & Installation

### Frontend Setup

1. Navigate to the project root:
```bash
cd train-buddy-main
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# .env.local
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

Or with development mode (auto-reload):
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

### Backend

- `npm start` - Start the server
- `npm run dev` - Start with auto-reload (requires nodemon)

## API Documentation

The backend provides REST APIs for:

- **Trains** - Get train status, delays, and crowd levels
- **Stations** - List all stations and filter by line
- **Community Reports** - View and create delay reports
- **Travel Suggestions** - Get personalized suggestions
- **Routes** - Get alternative route options

For detailed API documentation, see [backend/README.md](backend/README.md)

## Architecture

### Frontend (React + TypeScript)

- **Components**: Reusable UI components built with Shadcn UI
- **Pages**: Main application pages (Home, Live Status, Community Reports)
- **Services**: API layer for backend communication
- **State Management**: React hooks and React Query for data fetching

### Backend (Node.js + Express)

- **Routes**: RESTful API endpoints
- **Data**: Mock data that can be replaced with a database
- **Middleware**: CORS and JSON parsing

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- React Router
- React Query
- Lucide Icons

### Backend
- Node.js
- Express.js
- CORS

## Data Flow

1. User interacts with the frontend
2. Frontend calls API service methods
3. API service makes HTTP requests to the backend
4. Backend processes request and returns data
5. Frontend displays data to user

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication and profiles
- [ ] Advanced analytics and predictions
- [ ] Mobile app
- [ ] Real API integration with Indian Railways
- [ ] Real-time WebSocket updates
- [ ] Machine learning for crowd prediction
- [ ] Push notifications

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**BharatRail** - Making train journeys smarter and easier for everyone! 🚆
