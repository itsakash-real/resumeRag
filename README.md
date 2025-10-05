# ResumeRAG - AI-Powered Resume & Job Matching Demo

**ResumeRAG** is a web application that allows users to upload their CVs, extract skills using **Gemini API**, and fetch matched job listings using **Adzuna API**. The app is designed to be simple, modern, and easy to use.

---

## Features

- **Login Page**  
  Demo credentials for testing:  
  - Email: `admin@mail.com`  
  - Password: `admin123`  

- **Homepage**  
  Simple hero section with a CTA to access the dashboard.

- **Dashboard**  
  - Upload PDF CV  
  - Extract technical skills from CV using **Gemini API**  
  - Display extracted skills as tags/badges  
  - Fetch job matches using **Adzuna API**  
  - Show jobs in a grid/list with basic info (title, company, location, salary)  

- **Design & UX**  
  - Mobile-first, responsive  
  - Modern layout with **Tailwind CSS**  
  - Smooth animations: fade-in, hover effects, progress bars  

---

## Demo Video

Watch the demo of the app in action:  

<video controls width="600">
  <source src="https://drive.google.com/uc?export=download&id=1K8Ag9SgafDk3tSKXzLU8TSgr878DQ-a9" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd resumerag-frontend
Install dependencies:

npm install


Create a .env file with:

VITE_API_BASE_URL=<your-backend-api-url>
GEMINI_API_KEY=<your-gemini-key>
ADZUNA_APP_ID=<your-adzuna-app-id>
ADZUNA_APP_KEY=<your-adzuna-app-key>


Run the app:

npm run dev


Access app at http://localhost:5173

Tech Stack

React 18 + Vite

Tailwind CSS

Zustand (state management)

React Query (API caching)

Gemini API (CV parsing)

Adzuna API (job matching)

Notes

Only homepage, login, and dashboard pages are implemented.

Core functionality: CV upload → Skill Extraction → Job Match
