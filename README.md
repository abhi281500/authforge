AuthForge 🛡️

AuthForge is a robust, full-stack authentication system designed to provide a secure and seamless user experience. Built with the MERN stack (MongoDB, Express, React, Node.js), it offers a complete suite of authentication features including secure registration, login, profile management, and password recovery.

🚀 Live Demo

•Frontend: https://authforge-ten.vercel.app/

•Backend API: https://authforge-7por.onrender.com

•GitHub Repository: https://github.com/abhi281500/authforge


✨ Features

•User Authentication: Secure Sign Up and Login functionality.

•JWT Integration: Token-based authentication for secure API access.

•Password Security: Industry-standard password hashing using Bcrypt.

•
Profile Management: View and update user profile information.

•Password Recovery: Forgot password and reset password functionality.

•Responsive Design: A clean, modern UI that works across all devices.

•Secure Routes: Protected frontend routes and backend middleware.

🛠️ Tech Stack

Frontend

•
React 19: Modern UI library.

•
Vite: Ultra-fast frontend build tool.

•
React Router DOM: Declarative routing for React.

•
Axios: Promise-based HTTP client for API requests.

•
Tailwind CSS: Utility-first CSS framework for styling.

Backend

•
Node.js & Express: Scalable server-side environment and web framework.

•
MongoDB & Mongoose: NoSQL database with elegant object modeling.

•
JSON Web Token (JWT): Secure transmission of information between parties.

•
Bcrypt: Secure password hashing.

•
CORS: Cross-Origin Resource Sharing enabled for frontend integration.

•
Dotenv: Environment variable management.

authforge/
├── frontend/             # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main application pages
│   │   └── ...
│   └── ...
└── backend/              # Node.js + Express backend
    ├── config/           # Database and server configurations
    ├── controllers/      # Request handlers
    ├── middleware/       # Auth and error handling middleware
    ├── models/           # Mongoose schemas
    ├── routes/           # API endpoints
    └── server.js         # Entry point

    ⚙️ Installation & Setup

Prerequisites

•
Node.js installed

•
MongoDB account (Atlas or local)

1. Clone the Repository

git clone https://github.com/abhi281500/authforge.git
cd authforge

2. Backend Setup
cd backend
npm install

Create a .env file in the backend directory and add
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server:

Bash


npm start



3. Frontend Setup

Bash


cd ../frontend
npm install



Create a .env file in the frontend directory and add:

Plain Text


VITE_API_URL=http://localhost:5000



Start the frontend development server:

Bash


npm run dev



🛡️ API Endpoints

Method
Endpoint
Description
Auth Required
POST
/api/auth/register
Register a new user
No
POST
/api/auth/login
Login user & get token
No
POST
/api/auth/logout
Logout user
Yes
GET
/api/auth/profile
Get user profile
Yes
POST
/api/auth/update-profile
Update user profile
Yes
POST
/api/auth/forgot-password
Request password reset
No
POST
/api/auth/reset-password/:token
Reset password
No




🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

📄 License

This project is licensed under the ISC License.




Developed with ❤️ by Abhishek Kumar






