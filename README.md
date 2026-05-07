Truth Lens – AI-Assisted Fact-Checking Web Application
Overview
Truth Lens is a full-stack web application designed to help users verify the credibility of social media claims using real-time fact-checking data. The system allows users to enter claims or statements and cross-checks them against verified fact-checking sources using the Google Fact Check Tools API.
The application was developed as a final-year Computer Science project focused on misinformation detection, media literacy, and AI-assisted verification systems.
________________________________________
Features
•	Real-time fact-check search using the Google Fact Check Tools API
•	AI-assisted credibility scoring system
•	Google search fallback when no fact-check results are found
•	Responsive futuristic UI inspired by NotebookLM
•	Scrollable result interface for large fact-check datasets
•	Source links to original fact-checking organisations
•	FastAPI backend with React frontend
•	Full deployment using Netlify and Render
________________________________________
Tech Stack
Frontend
•	React
•	Vite
•	CSS
Backend
•	Python
•	FastAPI
•	Uvicorn
•	Requests
•	Python-dotenv
Deployment
•	Netlify (Frontend)
•	Render (Backend)
External APIs
•	Google Fact Check Tools API
________________________________________
Live Demo
Frontend:
https://truth-lens-api.netlify.app
Backend API:
https://truth-lens-fact-checking-app.onrender.com/docs
________________________________________
Screenshots
Main Interface
Add screenshot here
Fact-Check Results
Add screenshot here
Credibility Scoring
Add screenshot here
________________________________________
Installation
1. Clone Repository
git clone https://github.com/KJMighty/Truth-Lens-Fact-Checking-app.git
cd Truth-Lens-Fact-Checking-app
________________________________________
Backend Setup
1. Navigate to backend folder
cd backend
2. Create virtual environment
python -m venv .venv
3. Activate virtual environment
Windows
.venv\Scripts\activate
Linux / macOS
source .venv/bin/activate
4. Install dependencies
pip install -r requirements.txt
5. Create .env file
FACTCHECK_API_KEY=YOUR_API_KEY
6. Run backend server
uvicorn main:app --reload
Backend runs on:
http://127.0.0.1:8000
________________________________________
Frontend Setup
1. Navigate to frontend folder
cd frontend
2. Install dependencies
npm install
3. Start development server
npm run dev
Frontend runs on:
http://localhost:5173
________________________________________
API Endpoint
POST /factcheck
Example request:
{
  "text": "covid vaccines contain microchips"
}
Example response:
{
  "query": "covid vaccines contain microchips",
  "matchCount": 2,
  "matches": []
}
________________________________________
Project Structure
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
________________________________________
Key Learning Outcomes
This project involved:
•	Full-stack web application development
•	API integration and asynchronous communication
•	FastAPI backend development
•	React frontend design and state management
•	Deployment and cloud hosting
•	CORS handling and environment configuration
•	Research into misinformation and digital literacy
________________________________________
Future Improvements
Potential future improvements include:
•	AI-generated evidence summaries
•	Smart claim rewriting and NLP processing
•	User authentication and saved search history
•	Source bias and reliability indicators
•	Machine learning-based misinformation classification
•	Real-time social media integration
________________________________________
Author
Kai Mighty
Computer Science / Information Technology Student
GitHub: https://github.com/KJMighty
________________________________________
License
This project was developed for educational and portfolio purposes.
