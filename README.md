# SUPPLY-TRACE-ASSESS Project

## Frontend: React (Vite)

### Project Structure

```plaintext
client/
├── .vite/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .dockerignore
├── .eslintrc.cjs
├── .gitignore
├── Dockerfile
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

### Installation

1. Ensure you have Node.js installed on your system [https://nodejs.org/en](https://nodejs.org/en/download/package-manager).

2. Clone this repository:
   ```bash
   git clone https://github.com/patelhet04/supply-trace-assessment
   ```
3. Navigate to the project directory and install node modules:
   ```bash
   cd supply-trace-assessment/client
   npm install
   ```
4. To start the development server, run:
   ```bash
   npm run dev
   ```
5. To test the components using jest and react-testing library, run:
   ```bash
   npm test -- --clearCache
   npm test
   ```

### Key Features

1. **Vite-powered React**: Utilizes Vite for fast development and optimized production builds.
2. **Component-based Architecture**: Organized in a `components` directory for reusable UI elements.
3. **State Management**: Implements state management across components using Context API with useReducer.
4. **Data Visualization**: Integrates MUI Charts for creating interactive and responsive data visualizations.
5. **Context API**: Uses React's Context API (in the `context` directory) for state management.
6. **Routing**: Utilizes React Router DOM for efficient and declarative routing in the application.
7. **Docker Support**: Includes `Dockerfile` for containerization.
8. **Debounce for Search**: Implements the debounce concept for optimizing search query performance.
9. **Unit Testing**: Utlized Jest and React Testing library for unit testing.

## Backend: Flask API

### Project Structure

```plaintext
server/
├── __pycache__/
├── static/
│   ├── swagger.json/
├── venv/
├── tests/
│   ├── test_app.py
├── .dockerignore
├── .gitignore
├── app.py
├── companies.csv
├── Dockerfile
├── locations.csv
├── models.py
├── requirements.txt
├── services.py
└── utils.py
```

### Setup and Installation

1. Navigate to the project directory and install node modules:
   ```bash
   cd supply-trace-assessment/server
   npm install
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install the required dependencies:
   ```bash
   pip3 install -r requirements.txt
   ```
4. To start the Flask development server, run:
   ```bask
   python app.py
   ```
5. To test the APIs, run:
   ```bask
   pytest -v
   ```

The API will be available at http://localhost:5000 by default.

### Key Features

1. **Flask Framework**: Utilizes Flask for creating a robust and scalable API
2. **Service Layer**: Business logic encapsulated in services.py
3. **Utility Functions**: Common utilities and helper functions in utils.py, mainly logger
4. **CSV Data Integration**: Incorporates data from companies.csv and locations.csv.
5. **Docker Support**: Includes `Dockerfile` for containerization.
6. **Swagger UI Doccumentation**: Provides Swagger documentation for API reference. Accessible at [http://localhost:5000/swagger](http://localhost:5000/swagger).
7. **Unit Testing**: Utlized pytest for unit testing for REST APIs.

## Running the Application Using Docker Compose

To simplify the management of both the frontend and backend services, the project uses Docker Compose. Follow these steps to build and run the application:

1. **Ensure Docker and Docker Compose are Installed**

   - **Docker**: Download and install Docker from [docker.com](https://www.docker.com/products/docker-desktop).
   - **Docker Compose**: Docker Compose is included with Docker Desktop. If using Linux, you may need to install it separately. Follow the [official installation guide](https://docs.docker.com/compose/install/) for details.

2. **Navigate to the Project Directory**

   Make sure you are in the root directory of the project where the `docker-compose.yml` file is located.

3. **Build and Start Containers**:
   Use Docker Compose to build the images and start the containers for both the frontend and backend services.

   ```bash
   docker-compose up --build
   ```

   This command will:

   - Build the Docker images as defined in the Dockerfile for both services.
   - Start the containers as defined in the docker-compose.yml file.

4. **Access the Services:**

- Frontend: The React application will be available at http://localhost:5173.
- Backend: The Flask API will be available at http://localhost:5001.

5. **Stop the Containers**:
   To stop the running containers, use:
   ```bash
   docker-compose down
   ```
   This will stop and remove the containers but will not remove the built images or volumes.
