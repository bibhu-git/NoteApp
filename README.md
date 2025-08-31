# 📝 Note Taking App

A full-stack **Note Taking Application** built using the **MERN stack (MongoDB, Express, React, Node.js)** with **Vite**.  
Users can sign up with **Email + OTP** or their **Google account**, manage personal notes, and stay secure with **JWT authentication**.

---

## 🚀 Features
- **Authentication**
  - Email + OTP flow
  - Google Signup / Login (OAuth 2.0)
  - Secure passwordless login
- **Notes Management**
  - Create and delete notes
  - Notes stored per user with JWT authorization
- **User Experience**
  - Responsive (Figma-inspired design)
  - Mobile-friendly
  - Error handling & validation
- **Security**
  - JWT authorization
  - MongoDB storage
  - Nodemailer for OTP
  - Zod validation

---

## 🛠️ Tech Stack
**Frontend**  
- React 18  
- Vite  
- TailwindCSS  
- Axios  
- Google Identity Services  

**Backend**  
- Node.js, Express  
- MongoDB, Mongoose  
- JWT  
- Nodemailer  
- Zod  

---

## 📂 Project Structure
note-app/
│── backend/ # Express + MongoDB API
│ ├── src/
│ │ ├── config/ # env + db setup
│ │ ├── controllers/ # auth + notes controllers
│ │ ├── middleware/ # auth middleware
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # API routes
│ │ ├── utils/ # helpers (jwt, mailer, logger)
│ │ └── server.ts # entrypoint
│ ├── package.json
│ └── .env.example
│
│── frontend/ # React + Vite client
│ ├── src/
│ │ ├── api/ # Axios instance
│ │ ├── components/ # UI components
│ │ ├── context/ # AuthContext
│ │ ├── pages/ # SignUp, SignIn, Dashboard
│ │ └── main.tsx
│ ├── vite.config.ts
│ ├── package.json
│ └── .env.example
│
│── docs/ # Postman collection, screenshots
│── .gitignore
└── README.md


---

## ⚙️ Setup & Installation

1. **Clone the repo**
   git clone https://github.com/bibhu-git/NoteApp.git
   cd note-app
Backend Setup

cd backend
cp .env.example .env   # update values (Mongo URI, JWT secret, Google client ID, SMTP credentials)
npm install
npm run dev
Frontend Setup

cd frontend
cp .env.example .env   # update API base URL + Google client ID
npm install
npm run dev
📌 Usage
Open frontend at 👉 http://localhost:5173

Sign up with:

Email + OTP, or

Google account

Verify OTP or Google login

Create and delete notes from your dashboard

📜 License
MIT © 2025 Bibhu Ranjan Mohanty
