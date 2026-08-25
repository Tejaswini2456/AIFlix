# 🎨 AIFlix - Fullstack Netflix Clone with AI Movie Recommendations

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aiflix-omega.vercel.app)

🌐 **Live Demo Application**: [https://aiflix-omega.vercel.app](https://aiflix-omega.vercel.app)

A fully functional, modern **Netflix Clone** built with the **MERN stack** (MongoDB, Express, React, Node.js). It features **AI-powered movie recommendations** using **Gemini AI**, complete **user authentication**, and a clean, responsive UI powered by real movie data from the **TMDB API**.

Developed by **Tejaswini** ([@Tejaswini2456](https://github.com/Tejaswini2456)).

---

## 🚀 Features

* 🎬 **Netflix-Style UI**: Responsive layout with smooth video trailers, movie details, and modal overlays
* 🧠 **AI Recommendations**: Mood-based, personalized movie recommendations powered by **Gemini AI**
* 🎨 **Real Movie Data**: Live dynamic data integrated with **TMDB API**
* 🔐 **Full Authentication**: Secure signup & login using JWT (JSON Web Tokens) and bcrypt password hashing
* ⚡ **State Management**: Clean client-side state handling with Zustand
* ⚒️ **REST API**: Modular Express.js backend with MongoDB & Mongoose schemas

---

## 🧰 Tech Stack

### Frontend
* **React.js** (Vite)
* **Tailwind CSS**
* **Zustand** (State Management)
* **Axios**
* **Lucide React** & **Swiper**
* **TMDB API**

### Backend
* **Node.js** & **Express.js**
* **MongoDB** & **Mongoose**
* **JWT** & **Bcrypt.js**
* **Cookie Parser** & **Cors**

### AI Integration
* **Google Gemini AI SDK** (`@google/genai`)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Tejaswini2456/AIFlix.git
cd AIFlix
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_here
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

**Frontend (`frontend/.env`):**
```env
VITE_GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies & Run

**Backend:**
```bash
cd backend
npm install
node server.js
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser to view the app!

---

## 👤 Author

Developed by **Tejaswini**  
* GitHub: [@Tejaswini2456](https://github.com/Tejaswini2456)
