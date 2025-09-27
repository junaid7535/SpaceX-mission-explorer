SpaceX Mission Explorer 🚀
A modern React web application for exploring SpaceX launches, built with performance and user experience in mind.

https://img.shields.io/badge/SpaceX-Mission%2520Explorer-blue?style=for-the-badge&logo=react

Features
🚀 Browse Launches: View all SpaceX missions with key details

🔍 Smart Search: Debounced search by mission name

⚡ Advanced Filtering: Filter by year, success status, and favorites

⭐ Favorites System: Bookmark missions with local storage persistence

📱 Responsive Design: Optimized for desktop and mobile

♿ Accessible: Full keyboard navigation and screen reader support

🎨 Modern UI: Clean, intuitive interface with loading states

🔄 Real-time Data: Live SpaceX API integration

Tech Stack
Frontend Framework
React 18 - Latest React with concurrent features

Vite - Fast build tool and dev server

Styling
Tailwind CSS - Utility-first CSS framework

Custom CSS - Additional styling components

Icons
SVG Icons - Custom SVG components for performance

(Alternative: Lucide React icons available)

State Management
React Hooks (useState, useEffect, useContext)

Local Storage for favorites persistence

API Integration
SpaceX REST API v4 - Official SpaceX data

Fetch API - Modern browser fetch with error handling

Development Tools
ESLint - Code linting

PostCSS - CSS processing

Autoprefixer - CSS vendor prefixes

Prerequisites
Node.js 16.0 or higher

npm or yarn package manager

Modern web browser with JavaScript enabled

Installation & Setup
1. Clone the Repository
bash
git clone <repository-url>
cd spacex-mission-explorer
2. Install Dependencies
bash
npm install
3. Environment Setup
Create a .env file in the root directory (optional for customization):

env
VITE_API_BASE_URL=https://api.spacexdata.com/v4
VITE_APP_TITLE=SpaceX Mission Explorer
4. Start Development Server
bash
npm run dev
The application will open at http://localhost:5173

5. Build for Production
bash
npm run build
6. Preview Production Build
bash
npm run preview
Project Structure
text
src/
├── components/          # React components
│   ├── LaunchCard.jsx  # Individual launch display
│   ├── LaunchModal.jsx # Detailed mission view
│   ├── SearchFilters.jsx # Search and filter controls
│   └── LoadingSkeleton.jsx # Loading state component
├── hooks/              # Custom React hooks
│   └── useFavorites.js # Favorites management
├── services/           # API services
│   └── spacexApi.js    # SpaceX API integration
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── App.css           # Global styles
Available Scripts
npm run dev - Start development server

npm run build - Build for production

npm run preview - Preview production build

npm run lint - Run ESLint (if configured)

API Integration
The application uses the official SpaceX API v4:

Base URL: https://api.spacexdata.com/v4

Endpoints:

GET /launches - Fetch all launches

GET /launches/:id - Fetch specific launch details

Data Structure
javascript
{
  id: string,
  name: string,
  date_utc: string,
  flight_number: number,
  success: boolean,
  upcoming: boolean,
  details: string,
  rocket: { name: string },
  launchpad: { name: string },
  links: {
    patch: { small: string, large: string },
    webcast: string,
    wikipedia: string
  }
}
Browser Support
Chrome 90+

Firefox 88+

Safari 14+

Edge 90+

Performance Features
Code Splitting: Automatic with Vite

Lazy Loading: Components loaded on demand

Image Optimization: Responsive images with lazy loading

Debounced Search: 300ms delay to reduce API calls

Local Storage: Efficient favorites management

Known Limitations
API Limitations
Rate Limiting: SpaceX API has rate limits (30 requests/minute)

Data Consistency: Some launches may have incomplete data

Image Availability: Not all missions have patch images

Functional Limitations
Offline Mode: Limited functionality without internet connection

Data Freshness: Data updates depend on SpaceX API

Historical Data: Some older launches have limited information

Technical Limitations
Browser Storage: Favorites limited to ~5MB per domain

Mobile Performance: Large lists may impact low-end devices

API Errors: No retry mechanism for failed requests

Testing
Running Tests
Currently, the project includes basic testing setup. To run tests:

bash
# Install testing dependencies (if not already included)
npm install --save-dev @testing-library/react @testing-library/jest-dom jsdom

# Run tests
npm test
Test Coverage
Component Testing: Render tests for main components

Hook Testing: Custom hooks functionality

Integration Testing: API service interactions

Adding Tests
Example test structure:

javascript
// src/components/__tests__/LaunchCard.test.jsx
import { render, screen } from '@testing-library/react';
import LaunchCard from '../LaunchCard';

describe('LaunchCard', () => {
  test('renders launch information', () => {
    const mockLaunch = {
      id: '1',
      name: 'Test Mission',
      flight_number: 1,
      date_utc: '2023-01-01T00:00:00.000Z',
      success: true,
      rocket: { name: 'Falcon 9' },
      launchpad: { name: 'LC-39A' }
    };

    render(<LaunchCard launch={mockLaunch} />);
    
    expect(screen.getByText('Test Mission')).toBeInTheDocument();
    expect(screen.getByText('Flight #1')).toBeInTheDocument();
  });
});
Deployment
Vercel (Recommended)
Push code to GitHub

Connect repository to Vercel

Automatic deployments on push

Netlify
bash
# Build project
npm run build

# Deploy dist folder to Netlify
Static Hosting
The build generates static files in dist/ folder that can be served by any web server.

Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Code Style
Use functional components with hooks

Follow React best practices

Implement proper error boundaries

Use semantic HTML for accessibility

Component Patterns
Single responsibility principle

Prop validation (consider adding PropTypes)

Custom hooks for reusable logic

Container/presentational component pattern

Future Enhancements
PWA Support: Offline functionality with service workers

Advanced Filters: More filter options (rocket type, launch site)

Data Visualization: Charts and statistics

Real-time Updates: WebSocket connections for live data

Internationalization: Multi-language support

Advanced Search: Full-text search across mission details

Export Data: CSV/JSON export functionality

User Accounts: Cloud sync for favorites

Troubleshooting
Common Issues
Build Failures

bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
API Errors

Check internet connection

Verify SpaceX API status

Check browser console for CORS issues

Styling Issues

Ensure Tailwind CSS is properly configured

Check PostCSS configuration

Getting Help
Check the browser console for errors

Verify all dependencies are installed

Ensure Node.js version is compatible

Check network connectivity to SpaceX API

License
This project is open source and available under the MIT License.

Acknowledgments
SpaceX for providing the public API

React Team for the amazing framework

Vite Team for the excellent build tool

Tailwind CSS for the utility-first CSS framework

