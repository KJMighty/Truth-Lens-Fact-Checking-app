# Truth Lens – AI-Assisted Fact-Checking Web Application

## Overview

Truth Lens is a full-stack web application designed to help users verify the credibility of social media claims using real-time fact-checking data. The system allows users to enter claims or statements and cross-checks them against verified fact-checking sources using the Google Fact Check Tools API.

The application was developed as a final-year Computer Science project focused on misinformation detection, media literacy, and AI-assisted verification systems.

---

## Features

* Real-time fact-check search using the Google Fact Check Tools API
* AI-assisted credibility scoring system
* Google search fallback when no fact-check results are found
* Responsive futuristic UI inspired by NotebookLM
* Scrollable result interface for large fact-check datasets
* Source links to original fact-checking organisations
* FastAPI backend with React frontend
* Full deployment using Netlify and Render

---

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Python
* FastAPI
* Uvicorn
* Requests
* Python-dotenv

### Deployment

* Netlify (Frontend)
* Render (Backend)

### External APIs

* Google Fact Check Tools API

---

## Live Demo

Frontend:

[https://truth-lens-api.netlify.app](https://truth-lens-api.netlify.app)

Backend API:

[https://truth-lens-fact-checking-app.onrender.com/docs](https://truth-lens-fact-checking-app.onrender.com/docs)

---

## Screenshots

### Main Interface

*Add screenshot here*

### Fact-Check Results

*Add screenshot here*

### Credibility Scoring

*Add screenshot here*

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/KJMighty/Truth-Lens-Fact-Checking-app.git
cd Truth-Lens-Fact-Checking-app
```

---

## Backend Setup

### 1. Navigate to backend folder

```bash
cd backend
```

### 2. Create virtual environment

```bash
python -m venv .venv
```

### 3. Activate virtual environment

#### Windows

```bash
.venv\Scripts\activate
```

#### Linux / macOS

```bash
source .venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Create .env file

```env
FACTCHECK_API_KEY=YOUR_API_KEY
```

### 6. Run backend server

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

### 1. Navigate to frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoint

### POST /factcheck

Example request:

```json
{
  "text": "covid vaccines contain microchips"
}
```

Example response:

```json
{
  "query": "covid vaccines contain microchips",
  "matchCount": 2,
  "matches": []
}
```

---

## Project Structure

```text
Truth-Lens-Fact-Checking-app/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Key Learning Outcomes

This project involved:

* Full-stack web application development
* API integration and asynchronous communication
* FastAPI backend development
* React frontend design and state management
* Deployment and cloud hosting
* CORS handling and environment configuration
* Research into misinformation and digital literacy

---

## Future Improvements

Potential future improvements include:

* AI-generated evidence summaries
* Smart claim rewriting and NLP processing
* User authentication and saved search history
* Source bias and reliability indicators
* Machine learning-based misinformation classification
* Real-time social media integration

---

## Author

Kai Mighty

Computer Science / Information Technology Student

GitHub:
[https://github.com/KJMighty](https://github.com/KJMighty)

---

## License

This project was developed for educational and portfolio purposes.
