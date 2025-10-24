Frontend Service (React)
📁 Location

/frontend

🧭 Overview

The Frontend Service provides a clean, responsive, and user-friendly interface built with React.js.
It connects to the Auth Service and Quote Service APIs to provide real-time interaction with the system.

✨ Features

Signup, Login, Forgot Password pages

Dashboard to view “Quote of the Day”

“My Favourites” section for saved quotes

Share button (copy or share link)

JWT token stored in localStorage for authentication

🧱 Tech Stack

React.js

Axios

React Router DOM

Tailwind CSS (for styling)

📜 Main Pages
Page	Description	Route
Signup	Register new user	/signup
Login	User login	/login
Forgot Password	Reset password	/forgot
Dashboard	Displays quote of the day	/dashboard
My Favourites	View and manage saved quotes	/favourites
🧩 API Integration
Action	Endpoint (calls)
Login	POST http://localhost:5001/auth/login
Signup	POST http://localhost:5001/auth/signup
Forgot Password	POST http://localhost:5001/auth/forgot-password
Get Quote of the Day	GET http://localhost:5002/quotes/random
Add Favourite	POST http://localhost:5002/favourites/add/:quoteId
Get Favourites	GET http://localhost:5002/favourites
▶️ Run Locally
cd frontend
npm install
npm start