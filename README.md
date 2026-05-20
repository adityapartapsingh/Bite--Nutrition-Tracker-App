# Bite Nutrition Tracker 🍎

Bite is a premium, beautifully designed full-stack nutrition tracking application. It helps users log their daily meals, track macronutrients, monitor their water intake, and stay on top of their health goals with an intuitive, modern, glassmorphic UI.

## ✨ Features

- **Smart Dashboard**: A sleek, responsive dashboard featuring a daily calorie ring, dynamic macro progress bars (Protein, Fat, Carbs), and daily nutrition insights.
- **AI Meal Scanner 📸**: Uses the power of Google Gemini Vision AI to let users take a picture of their plate. The app automatically identifies the foods, estimates the portion sizes, and calculates all macros to add to their diary instantly.
- **Water Tracking 💧**: A visually engaging daily water tracker with fluid animations to ensure you stay hydrated.
- **Lightning-Fast Logging**: 
  - **Quick Suggestions**: Instantly suggests popular and frequently logged foods before you even finish typing.
  - **Recent Foods**: Automatically remembers and surfaces the last 20 unique items you've logged.
  - **Manual Entry**: A custom entry form for logging precise macro information.
- **Weekly History Charts 📊**: Visualizes your daily calorie consumption across the week with an interactive, animated SVG bar chart against your target goal.
- **Beautiful UI/UX**: Built with dark mode in mind, featuring glassmorphism elements, bouncy micro-animations, rich gradients, and an accessible, mobile-first design.

## 🛠️ Tech Stack

- **Frontend**: React (Create React App), Context API for state management, Vanilla CSS with custom CSS variables and animations.
- **Backend**: Node.js, Express.js.
- **Database**: SQLite (via `better-sqlite3`).
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing.
- **AI Integration**: Google Generative AI (`@google/generative-ai`) for image recognition.

## 🔗 Live Demo

- **Production (API & Backend)**: https://bite-nutrition-tracker.onrender.com
- **Production (Frontend)**: https://bite-nutrition-tracker-app.vercel.app/

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey) (for the AI Meal Scanner)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables. Create a `.env` file (if it doesn't exist) and add:
   ```env
   PORT=3001
   JWT_SECRET=your_super_secret_jwt_key
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:3001`.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will open in your browser at `http://localhost:3000`.*

## 📂 Project Structure

```
bite/
├── backend/
│   ├── controllers/    # API endpoint logic (Auth, AI, Logs)
│   ├── database/       # SQLite db connection and schemas
│   ├── middleware/     # JWT Auth and Error handling
│   ├── routes/         # Express router definitions
│   └── server.js       # Express server entry point
│
└── frontend/
    ├── public/
    └── src/
        ├── components/ # Reusable UI components (Dashboard, AddFood, History)
        ├── context/    # React Context (AuthContext, NutritionContext)
        ├── services/   # API communication helpers
        ├── styles/     # Global variables and base CSS
        ├── utils/      # Formatting, math, and mock datasets
        └── App.js      # Main React application
```

## 🎨 Design System
The app uses a consistent design token system found in `frontend/src/styles/variables.css`. It heavily utilizes standard CSS custom properties for:
- Typography (`--text-primary`, `--text-secondary`)
- Accents & Gradients (`--accent-green`, `--gradient-calories`, `--gradient-water`)
- Glassmorphism Backgrounds (`--bg-glass`, `--bg-card`)
- Bouncy Animations & Easings (`--transition-slow`)

## 📄 License
This project is open-source and available under the MIT License.
