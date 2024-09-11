# Dashboard Project

This project is a web application featuring a dashboard with multiple charts, built using Next.js for the frontend and Django for the backend API.

## Setup Instructions

### Using Docker (Recommended)

1. Make sure you have Docker and Docker Compose installed on your system.

2. Clone the repository and navigate to the project root directory.

3. Build and start the containers:
   ````
   docker-compose up --build
   ```

4. The application will be available at:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`

5. To stop the containers, press `Ctrl+C` in the terminal where docker-compose is running, or run:
   ````
   docker-compose down
   ```

### Manual Setup

#### Backend (Django)

1. Navigate to the backend directory:
   ````
   cd backend
   ```

2. Create a virtual environment:
   ````
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ````
   pip install django djangorestframework django-cors-headers
   ```

4. Apply migrations:
   ````
   python manage.py migrate
   ```

5. Start the Django development server:
   ````
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`.

#### Frontend (Next.js)

1. Navigate to the frontend directory:
   ````
   cd frontend
   ```

2. Install the required packages:
   ````
   npm install
   ```

3. Start the Next.js development server:
   ````
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`.

## Libraries and Tools Used

### Backend
- Django: Web framework for building the API
- Django REST Framework: Toolkit for building Web APIs
- django-cors-headers: Handles Cross-Origin Resource Sharing (CORS)

### Frontend
- Next.js: React framework for building the user interface
- React: JavaScript library for building user interfaces
- Axios: Promise-based HTTP client for making API requests
- Recharts: Composable charting library for React
- ApexCharts: Modern charting library that helps to create interactive charts and visualizations
- Tailwind CSS: Utility-first CSS framework for rapid UI development

## Approach and Thought Process

1. **Project Structure**: 
   - Separated the project into frontend and backend directories for clear organization.
   - Used Next.js for the frontend to leverage its built-in features like routing and API routes.
   - Implemented a Django backend to serve data through RESTful API endpoints.

2. **Data Flow**:
   - Created API endpoints in Django to serve mock data for each chart type.
   - Implemented data fetching in the frontend using Axios to make HTTP requests to the backend.
   - Used React's useState and useEffect hooks to manage and update chart data.

3. **Chart Implementation**:
   - Utilized Recharts for Line, Bar, and Pie charts due to its simplicity and React integration.
   - Implemented the Candlestick chart using ApexCharts for its financial chart capabilities.
   - Ensured responsive design for charts using Tailwind CSS and ResponsiveContainer from Recharts.

4. **Code Organization**:
   - Kept the main dashboard logic in a single component for simplicity, but it can be further modularized for larger applications.
   - Used TypeScript for type safety and better developer experience.

5. **Error Handling and Performance**:
   - Implemented basic error logging for API calls.
   - Used dynamic imports for ApexCharts to improve initial load time.

6. **Styling**:
   - Utilized Tailwind CSS for consistent and responsive design across the application.

7. **Future Improvements**:
   - Implement server-side rendering or static generation for improved performance.
   - Add user authentication and personalized dashboards.
   - Implement real-time data updates using WebSockets.
   - Enhance error handling with user-friendly error messages and fallback UI.
   - Add unit and integration tests for both frontend and backend.

## Docker Configuration

The project uses Docker to containerize both the frontend and backend services:

- `docker-compose.yml`: Defines the services, networks, and volumes for the application.
- `frontend/Dockerfile`: Configures the Node.js environment for the Next.js application.
- `backend/Dockerfile`: Sets up the Python environment for the Django application.

This containerization ensures consistency across different development and deployment environments.

This project demonstrates the integration of a React-based frontend with a Django backend, showcasing various chart types and data visualization techniques. It serves as a foundation that can be extended and customized for more complex dashboard applications.