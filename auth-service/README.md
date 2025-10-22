# 🔐 Auth Service

A microservice for user authentication and authorization using JWT tokens.

## ✨ Features

- 🆕 **Signup:** Register new users with hashed passwords using `bcrypt`
- 🔑 **Login:** Authenticate existing users and return a signed JWT
- 🔄 **Forgot Password:** Provide a password reset mechanism (mock email or console link)
- 🧾 **User Profile:** Retrieve the authenticated user's details using the JWT
- 🛡️ **JWT Validation:** Middleware to protect routes that require authentication
- 👥 **Role-based Access:** Support for user roles (user/admin)

## 🧱 Tech Stack

- **Backend Framework:** Node.js (Express.js)
- **Database:** MongoDB (via Mongoose ORM)
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcrypt.js for password hashing
- **Environment Management:** dotenv for secrets and configurations

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth-service
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

**Important:** Use the same `JWT_SECRET` across all services that need to verify tokens.

4. Start the service:
```bash
# Development
npm run dev

# Production
npm start
```

## 📜 API Endpoints

### Public Endpoints

| Method | Route | Description | Body Parameters |
|--------|-------|-------------|-----------------|
| `POST` | `/auth/signup` | Register a new user | `name`, `email`, `password`, `role` (optional) |
| `POST` | `/auth/login` | Authenticate user and return JWT | `email`, `password` |
| `POST` | `/auth/forgot-password` | Send reset link or simulate password reset | `email` |

### Protected Endpoints

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| `GET` | `/auth/me` | Return authenticated user's profile | Yes (JWT) |

## 🔒 Authentication

Include JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📋 Example Requests

### Signup
```bash
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile
```bash
GET /auth/me
Authorization: Bearer <your_jwt_token>
```

### Forgot Password
```bash
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## 📂 Project Structure

```
auth-service/
├── config/
│   └── db.js                  # Database connection
├── controllers/
│   └── authController.js      # Authentication logic
├── middleware/
│   └── authMiddleware.js      # JWT verification
├── models/
│   └── User.js               # User schema
├── routes/
│   └── authRoutes.js         # Authentication endpoints
├── server.js                 # Application entry point
├── package.json
├── .env.example
└── README.md
```

## 🔐 Security Features

- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens expire after 7 days (configurable)
- Email validation on user registration
- Password minimum length requirement (6 characters)
- Role-based access control support
- Password field excluded from JSON responses

## 🌍 Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing and verification
- `JWT_EXPIRES_IN`: Token expiration time (default: 7d)

## 📝 User Roles

- **user**: Default role for regular users
- **admin**: Admin role with elevated privileges (can be used by other services)

## License

ISC
