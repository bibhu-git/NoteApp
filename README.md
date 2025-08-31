**Note Taking App - README**
This is a full-stack Note Taking Application built using the MERN stack (MongoDB, Express, React, Node.js) with Vite. The app allows users to sign up with Email & OTP verification or with their Google account, securely log in, and manage personal notes using JWT-based authentication.
**Features**
•  User Authentication: Email + OTP flow, Google Signup/Login (OAuth 2.0), Secure passwordless flow
•  Notes Management: Create and delete notes, notes stored per user with JWT authorization
•  User Experience: Responsive UI (Figma-inspired), Clean error handling & validation, Mobile-friendly
•  Security: JWT authorization, MongoDB storage, Nodemailer for OTP, Zod validation for inputs
**Tech Stack**
Frontend: React 18, Vite, Tailwind CSS, Axios, Google Identity Services
Backend: Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer, Zod
Project Structure
note-app/
├── backend/                # Express + MongoDB API
│   ├── src/
│   │   ├── config/         # env + db setup
│   │   ├── controllers/    # auth + notes controllers
│   │   ├── middleware/     # auth middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # helpers (jwt, mailer, logger)
│   │   └── server.ts       # entrypoint
│   ├── package.json
│   └── .env.example
│
├── frontend/               # React + Vite client
│   ├── src/
│   │   ├── api/            # Axios instance
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # AuthContext
│   │   ├── pages/          # SignUp, SignIn, Dashboard
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── package.json
│   └── .env.example
│
├── docs/                   # Postman collection, screenshots
├── .gitignore
├── README.md
**Setup & Installation**
1. Clone the repository:
git clone https://github.com/<your-username>/<your-repo>.git
cd note-app
2. Backend Setup:
cd backend
npm install
cp .env.example .env
Update .env with your values (Mongo URI, JWT secret, Google client ID, SMTP credentials).
Run backend:
npm run dev
3. Frontend Setup:
cd ../frontend
npm install
cp .env.example .env
Update .env with your API base URL and Google client ID.
Run frontend:
npm run dev

**Usage**
1. Open frontend at http://localhost:5173
2. Sign up with email (OTP) or Google
3. Verify OTP or Google login
4. Create and delete notes from dashboard


**License**
MIT © 2025 **Bibhu Ranjan Mohanty
**
