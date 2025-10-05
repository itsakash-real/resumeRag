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

## Demo Images/Video

Watch the demo of the app in action:  

[![Watch Demo](https://img.youtube.com/vi/rJwMCQyAiKY/0.jpg)](https://youtu.be/rJwMCQyAiKY)

IMAGES
<img width="1920" height="1742" alt="screencapture-127-0-0-1-5000-2025-10-05-22_03_02" src="https://github.com/user-attachments/assets/3fd20fe1-cbac-4e27-99cf-19982ce55c31" />

<img width="1920" height="912" alt="screencapture-127-0-0-1-5000-login-2025-10-05-22_03_18" src="https://github.com/user-attachments/assets/2d5fa7d4-f0bd-4f11-b34e-f0a8e52150f7" />

<img width="1920" height="912" alt="screencapture-127-0-0-1-5000-dashboard-2025-10-05-22_03_43" src="https://github.com/user-attachments/assets/79e780fa-6b40-4592-9622-0d6471490ef2" />

<img width="1920" height="3805" alt="screencapture-127-0-0-1-5000-dashboard-2025-10-05-22_04_05" src="https://github.com/user-attachments/assets/f8d1fdfa-8e90-41a3-828a-a8f16240e5c5" />

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
