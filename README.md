# Doctor Listing Application

A modern, responsive web application for browsing and filtering doctor listings with detailed profile information.

![Doctor Listing Application](https://i.imgur.com/placeholder-image.jpg)

## Features

- **Doctor Listings**: View a comprehensive list of medical professionals
- **Search Functionality**: Search for doctors by name with autocomplete suggestions
- **Advanced Filtering**: Filter doctors by specialty and consultation mode (Video/In-Clinic)
- **Sorting Options**: Sort doctors by fees or experience
- **Detailed Profiles**: View complete doctor information in a modal popup
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **URL Parameter Integration**: Filter states are reflected in URL parameters for easy sharing

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - TanStack Query for data fetching
  - Tailwind CSS for styling
  - Shadcn UI component library
  - Wouter for routing

- **Backend**:
  - Express.js server
  - RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/doctor-listing-app.git
   cd doctor-listing-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

Start the development server with:

```
npm run dev
```

This will start both the frontend and backend services on port 5000. Open your browser and navigate to:

```
http://localhost:5000
```

## Project Structure

```
doctor-listing-app/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   └── types/           # TypeScript type definitions
├── server/                  # Backend Express server
│   ├── index.ts             # Server entry point
│   └── routes.ts            # API routes
└── shared/                  # Shared code between frontend and backend
    └── schema.ts            # Data schemas
```

## API Integration

The application fetches doctor data from an external API at `https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json`. The data is then transformed to match the application's internal data structure.

## Features In Detail

### Search Functionality

- Real-time search with suggestions as you type
- Highlights matching text in suggestions
- Updates URL parameters to share search results

### Filtering System

- Filter by consultation type (Video/In-Clinic)
- Filter by medical specialty
- Active filters display with easy removal
- All filters are reflected in the URL for sharing

### Doctor Profiles

- Click "View Profile" to see detailed information
- Complete profile information includes:
  - Name and photo
  - Specialties
  - Years of experience
  - Consultation fee
  - Languages spoken
  - Available consultation modes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by medical API service
- UI design inspired by modern healthcare platforms