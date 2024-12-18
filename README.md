
---

# AI Assistant Project

![image](https://github.com/user-attachments/assets/a577fa9a-870b-4488-96f4-4660115384e1)


**AI Assistant Project** is an advanced AI-powered personalized learning assistant designed to enhance the educational experience for students and educators alike. Leveraging Google's Gemini 2.0 API, seamlessly integrated with a React frontend and Flask backend, this application provides dynamic, user-tailored learning content. Deployed on Google Cloud Run and utilizing Firestore for data storage, the AI Assistant Project ensures scalability, reliability, and real-time data handling.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
  - [AI Integration](#ai-integration)
  - [Deployment](#deployment)
  - [Tools](#tools)
- [Architecture Overview](#architecture-overview)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Deployment Instructions](#deployment-instructions)
  - [Deploying the Backend to Google Cloud Run](#deploying-the-backend-to-google-cloud-run)
  - [Deploying the Frontend](#deploying-the-frontend)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
- [Blog](#blog)

## Features

- **Text Generation:** Generate personalized educational content using Gemini 2.0 API.
- **Search Functionality:** Enhance content retrieval with integrated search tools.
- **Live Content Generation:** Real-time AI-driven content creation based on user inputs.
- **Voice Interaction:** Enable voice-to-voice interactions for a hands-free experience.
- **User Management:** Secure user registration and data storage with Firestore.
- **Scalable Deployment:** Backend services deployed on Google Cloud Run for automatic scaling.
- **Responsive Design:** User-friendly interface built with React and Material-UI.
- **PDF Generation:** Export content and reports as PDF documents using jsPDF.

## Technologies Used

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Material-UI (MUI):** React components for faster and easier web development.
- **React Markdown:** Render Markdown content in React components.
- **React Syntax Highlighter:** Highlight code syntax within React applications.
- **jsPDF:** Generate PDF documents from web pages.
- **CSS/SCSS:** Styling the application with responsive design principles.

### Backend

- **Flask:** A lightweight WSGI web application framework for Python.
- **Firebase Admin SDK:** Manage Firebase services from the server.
- **Google GenAI SDK:** Integrate Google’s Gemini 2.0 API for generative AI capabilities.
- **Python-dotenv:** Manage environment variables in Python projects.

### Database

- **Firestore (Firebase):** A flexible, scalable NoSQL cloud database for storing and syncing data.

### AI Integration

- **Gemini 2.0 API:** Advanced generative AI model from Google for content generation.
- **Vertex AI:** Managed machine learning platform for deploying AI models.

### Deployment

- **Google Cloud Run:** A fully managed compute platform that automatically scales stateless containers.

### Tools

- **Docker:** Containerize applications for consistent environments across development and production.
- **Git:** Version control system for tracking changes in source code.
- **Postman:** API development environment for testing backend endpoints.
- **Visual Studio Code:** Code editor for development.
- **Babel:** JavaScript compiler to convert modern JS into backward-compatible versions.

## Architecture Overview
**High-Level Architecture:**

1. **Frontend (React):**
   - **User Interface:** Interactive UI for user input and display of AI-generated content.
   - **API Communication:** Sends requests to the backend via API endpoints.
   - **State Management:** Handles application state and user interactions.
   - **Routing:** Manages navigation between different sections of the app.

2. **Backend (Flask):**
   - **API Endpoints:** Handles requests from the frontend for content generation, user management, and voice interactions.
   - **Gemini 2.0 Integration:** Interfaces with the Gemini 2.0 API to generate AI-driven content based on user inputs.
   - **Firestore Interaction:** Manages data storage and retrieval for user information and generated content.
   - **Authentication:** Secures API endpoints and manages user sessions.

3. **Database (Firestore):**
   - **User Data:** Stores registered user information and authentication details.
   - **Content Storage:** Keeps records of user inputs and AI-generated content for analytics and retrieval.
   - **Real-time Sync:** Enables real-time updates and synchronization between frontend and backend.

4. **AI Integration (Gemini 2.0 API via Vertex AI):**
   - **Content Generation:** Processes user inputs to generate personalized educational content.
   - **Scalability:** Handles multiple concurrent requests efficiently through Vertex AI's managed services.

5. **Deployment (Google Cloud Run):**
   - **Containerization:** Packages the Flask backend into Docker containers for consistent deployment environments.
   - **Scalability:** Automatically scales backend services based on incoming traffic and demand.
   - **Reliability:** Ensures high availability and fault tolerance for backend services.

## Setup Instructions

### Prerequisites

- **Software & Tools:**
  - **Node.js & npm:** [Download Node.js](https://nodejs.org/)
  - **Python 3.9+:** [Download Python](https://www.python.org/downloads/)
  - **Git:** [Download Git](https://git-scm.com/downloads)
  - **Docker:** [Download Docker](https://www.docker.com/get-started)
  - **Postman:** [Download Postman](https://www.postman.com/downloads/)
  - **Visual Studio Code or any preferred IDE:** [Download VS Code](https://code.visualstudio.com/)

- **Frameworks & Libraries:**
  - **React:** Frontend library.
  - **Flask:** Backend framework.
  - **Firebase Admin SDK:** Manage Firestore.
  - **Google GenAI SDK:** Integrate Gemini 2.0 API.

- **Knowledge:**
  - Basic understanding of React and Flask.
  - Familiarity with RESTful APIs.
  - Basic knowledge of Google Cloud services.

### Frontend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/bhragavvc/ai-assistant-project.git
   cd ai-assistant-project/frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `frontend` directory:

   ```env
   REACT_APP_BACKEND_URL=https://ai-assistant-backend-xyz.a.run.app
   ```

   **Note:** Replace `https://ai-assistant-backend-xyz.a.run.app` with your actual backend URL after deployment.

4. **Start the Development Server:**

   ```bash
   npm start
   ```

   The application should be accessible at [http://localhost:3000](http://localhost:3000).

### Backend Setup

1. **Navigate to Backend Directory:**

   ```bash
   cd ../backend
   ```

2. **Set Up a Virtual Environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the `backend` directory:

   ```env
   GOOGLE_CLOUD_PROJECT=your_project_id
   GOOGLE_CLOUD_LOCATION=your_region
   GOOGLE_GENAI_USE_VERTEXAI=True
   GEMINI_API_KEY=your_gemini_api_key
   FIREBASE_SERVICE_ACCOUNT_KEY=path/to/serviceAccountKey.json
   PORT=8080
   ```

   **Notes:**
   - **GOOGLE_CLOUD_PROJECT:** Your Google Cloud project ID.
   - **GOOGLE_CLOUD_LOCATION:** The region for your Cloud Run service (e.g., `your_region`).
   - **GEMINI_API_KEY:** Your Gemini 2.0 API key.
   - **FIREBASE_SERVICE_ACCOUNT_KEY:** Path to your Firebase service account JSON file.
   - **PORT:** The port Flask will run on (default is `8080`).

5. **Initialize Firebase Admin SDK:**

   Ensure you have a Firebase project set up and have downloaded the service account key JSON file. Update the path in `main.py` accordingly.

6. **Run the Flask Application Locally:**

   ```bash
   python main.py
   ```

   The backend should be running at [http://localhost:8080](http://localhost:8080).

## Deployment Instructions

### Deploying the Backend to Google Cloud Run

1. **Authenticate with Google Cloud:**

   ```bash
   gcloud auth login
   gcloud config set project your_project_id
   ```

2. **Build the Docker Image:**

   ```bash
   docker build -t ai-assistant-backend .
   ```

3. **Tag the Image:**

   ```bash
   docker tag ai-assistant-backend gcr.io/your_project_id/ai-assistant-backend
   ```

4. **Push the Image to Google Container Registry:**

   ```bash
   docker push gcr.io/your_project_id/ai-assistant-backend
   ```

5. **Deploy to Cloud Run:**

   ```bash
   gcloud run deploy backend-service \
     --image gcr.io/your_project_id/ai-assistant-backend \
     --platform managed \
     --region your_region \
     --allow-unauthenticated \
     --port 8080
   ```

   **Parameters:**
   - `--allow-unauthenticated`: Allows public access. Adjust based on your security needs.
   - `--port 8080`: Ensure it matches the port your Flask app listens on.

6. **Assign Permissions to the Custom Service Account:**

   ```bash
   # Grant Cloud Run Admin role
   gcloud projects add-iam-policy-binding your_project_id \
     --member='user:your_email' \
     --role='roles/run.admin'

   # Grant Cloud Build Editor role
   gcloud projects add-iam-policy-binding your_project_id \
     --member='user:your_email' \
     --role='roles/cloudbuild.builds.editor'

   # Grant Service Account User role
   gcloud projects add-iam-policy-binding your_project_id \
     --member='user:your_email' \
     --role='roles/iam.serviceAccountUser'
   ```

### Deploying the Frontend

1. **Build the React Application:**

   ```bash
   cd ../frontend
   npm run build
   ```

2. **Choose a Hosting Platform:**

   - **Firebase Hosting**
   - **Vercel**
   - **Netlify**
   - **Google Cloud Storage + Cloud CDN**

3. **Deploy to Firebase Hosting (Example):**

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy --only hosting
   ```

   **Steps:**
   - **Initialize Firebase:** Follow the prompts to set up Firebase Hosting.
   - **Deploy:** Upload your built React application to Firebase.

4. **Update Environment Variables:**

   After deployment, update the `REACT_APP_BACKEND_URL` in the frontend’s `.env` file with the Cloud Run backend URL.

5. **Verify Deployment:**

   Access your frontend via the provided Firebase Hosting URL (e.g., [https://your-project-id.web.app](https://your-project-id.web.app)).

## Usage

1. **Access the Application:**

   Open your browser and navigate to your frontend hosting URL (e.g., [https://your-frontend-domain.com](https://your-frontend-domain.com)).

2. **Register a New User:**

   - Navigate to the registration section.
   - Enter your username and email to create an account.

3. **Generate Content:**

   - Use the "Text Generation" tab to input topics or preferences.
   - Receive AI-generated personalized learning content instantly.

4. **Search as a Tool:**

   - Utilize the search functionality to find specific content or resources.

5. **Live Generation:**

   - Engage with real-time content generation based on your inputs.

6. **Voice Interaction (Optional):**

   - Click "Start Recording" to input voice commands.
   - Receive AI-generated audio responses.

7. **Export Content:**

   - Use the PDF generation feature to export content and reports as PDF documents.

## Contributing

Contributions are welcome! Please follow these steps to contribute to the AI Assistant Project:

1. **Fork the Repository:**

   Click the "Fork" button at the top-right corner of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/your-username/ai-assistant-project.git
   cd ai-assistant-project
   ```

3. **Create a New Branch:**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Changes and Commit:**

   ```bash
   git commit -m "Add your feature"
   ```

5. **Push to Your Fork:**

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Open a Pull Request:**

   Navigate to the original repository and click "New Pull Request."

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

**Bhargav**  
*Developer and AI enthusiast focused on building scalable, user-focused solutions.*

- **Email:** bhargav@example.com
- **LinkedIn:** [linkedin.com/in/bhargav](https://linkedin.com/in/bhargav_chitteti)
- **GitHub:** [github.com/bhargav](https://github.com/bhargavvc)

## Acknowledgements

- **Google Cloud:** For providing the robust infrastructure and AI services that power this project.
- **Firebase:** For the seamless integration and real-time database capabilities.
- **Material-UI:** For the beautiful and customizable React components.
- **OpenAI:** Inspiration from advanced AI models and their applications in education.
- **Community Contributors:** Thanks to all the developers and contributors who have provided insights and support throughout the development of this project.

## Blog

Check out my detailed blog post on building this project: [How to Build a Gemini 2.0 Powered Personalized Learning Assistant with React & Flask](https://medium.com/@bhargav.dev01/how-to-build-a-gemini-2-0-powered-personalized-learning-assistant-with-react-flask-83b5466a1d69)

---
