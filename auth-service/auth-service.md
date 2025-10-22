# 🔐 Auth Service (Node.js / Express)

📁 **Location:**  
`/auth-service`

---

## 🧭 Overview

The **Auth Service** handles all user authentication functionalities such as **registration**, **login**, and **password reset**.  
It generates and verifies **JWT tokens** that are used by other microservices (e.g., the Quote Service) to authenticate user requests.

This service ensures secure authentication flows, including password hashing, token management, and protected route access.

---

## ✨ Features

- 🆕 **Signup:** Register new users with hashed passwords using `bcrypt`.
- 🔑 **Login:** Authenticate existing users and return a signed JWT.
- 🔄 **Forgot Password:** Provide a password reset mechanism (mock email or console link).
- 🧾 **User Profile:** Retrieve the authenticated user’s details using the JWT.
- 🛡️ **JWT Validation:** Middleware to protect routes that require authentication.

---

## 🧱 Tech Stack

- **Backend Framework:** Node.js (Express.js)  
- **Database:** MongoDB (via Mongoose ORM)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Security:** bcrypt.js for password hashing  
- **Environment Management:** dotenv for secrets and configurations  

---

## 📂 Folder Structure

auth-service/
│
├── server.js
├── routes/
│ └── authRoutes.js
├── controllers/
│ └── authController.js
├── models/
│ └── User.js
├── middleware/
│ └── authMiddleware.js
└── config/
└── db.js

pgsql
Copy code

---

## 📜 API Endpoints

| Method | Route | Description |
|:-------|:------|:-------------|
| **POST** | `/auth/signup` | Register a new user |
| **POST** | `/auth/login` | Authenticate a user and return JWT |
| **POST** | `/auth/forgot-password` | Send reset link or simulate password reset |
| **GET** | `/auth/me` | Return authenticated user’s profile (JWT required) |

---

## 🧩 Example User Model (`User.js`)

```js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);