# Note Taking App

A full-stack Note Taking Application built using the **MERN stack** (MongoDB, Express, React, Node.js) with **Vite**.  
The app allows users to sign up with **Email + OTP** or **Google Login**, verify their identity securely, and manage personal notes using **JWT authentication**.

---

## Features

###  Authentication
- Email + OTP flow  
- Google Signup/Login (OAuth 2.0)

###  Notes
- Create and delete notes  
- User-specific notes with JWT authorization  

###  UI/UX
- Mobile-friendly, responsive design (Figma-inspired)  
- Error handling & validation  

###  Security
- JWT authorization  
- OTP with Nodemailer  
- MongoDB for persistence  

---

##  Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Axios, Google Identity Services  
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer, Zod  

---

##  Setup & Installation

### 1. Clone the repository
git clone https://github.com/bibhu-git/NoteApp.git
cd note-app

## 2. Backend Setup
cd backend
cp .env.example .env   # Add Mongo URI, JWT secret, Google Client ID, SMTP creds
npm install
npm run dev

## 3. Frontend Setup
cd frontend
cp .env.example .env   # Add API base URL + Google Client ID
npm install
npm run dev

##  Usage
1.	Open frontend at http://localhost:5173
2.	Sign up with Email + OTP or Google account
3.	Verify OTP or Google login
4.	Create and delete notes from the dashboard
## License
MIT © 2025 Bibhu Ranjan Mohanty
