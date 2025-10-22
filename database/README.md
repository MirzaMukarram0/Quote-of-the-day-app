# 🗄️ Database Service (MongoDB)

This directory contains database-related configuration, schemas, and seed scripts for the Quote of the Day application.

## 🧭 Overview

The **Database Service** provides the **persistent data storage** layer for the entire application, handling information related to **users**, **quotes**, and **favourites**.

Each microservice (Auth Service, Quote Service) connects to this database using its own **Mongoose connection**, enabling modular, independent access while maintaining shared data integrity.

This service does not expose HTTP endpoints directly — instead, it serves as the data backbone for all other services.

---

## ✨ Collections

| Collection | Description |
|-------------|--------------|
| **users** | Stores user details such as credentials and role information |
| **quotes** | Stores all quotes, including author, category, and tags |
| **favourites** | Links users to their favourite quotes |

---

## 🧱 Schemas

### 🧍 User Schema

```js
{
  name: String,
  email: String,
  password: String,
  role: String (enum: ["user", "admin"]),
  createdAt: Date,
  updatedAt: Date
}
```

- **name** → User's display name
- **email** → Unique email for login and communication
- **password** → Hashed password stored securely (via bcrypt)
- **role** → User role (user or admin)

### 💬 Quote Schema

```js
{
  text: String,
  author: String,
  category: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

- **text** → The quote content
- **author** → Quote's author name
- **category** → Quote category (e.g., "motivational", "wisdom")
- **tags** → Array of tags for categorization

### ⭐ Favourite Schema

```js
{
  userId: String,
  quoteId: ObjectId (ref: "Quote"),
  createdAt: Date,
  updatedAt: Date
}
```

- **userId** → Reference to the user
- **quoteId** → Reference to the quote

---

## 🗂️ File Structure

```
database/
├── README.md              # This file
├── init/
│   └── seed.js           # Seed script to populate initial data
├── models/
│   ├── User.js           # User model (shared reference)
│   ├── Quote.js          # Quote model (shared reference)
│   └── Favourite.js      # Favourite model (shared reference)
├── config/
│   └── db.js             # Database connection utility
└── package.json          # Dependencies for seeding
```

---

## ▶️ Setup Instructions

### 1. Install MongoDB

Ensure MongoDB is installed and running locally:

```bash
# Windows (with MongoDB installed)
mongod --dbpath C:\data\db

# macOS/Linux
mongod --dbpath /data/db
```

### 2. Install Dependencies

```bash
cd database
npm install
```

### 3. Seed the Database

Populate the database with initial quotes and an admin user:

```bash
npm run seed
```

This will create:
- An admin user (email: admin@example.com, password: admin123)
- A regular user (email: user@example.com, password: user123)
- 20+ sample quotes

---

## 📦 Default Connection String

```
mongodb://localhost:27017/quoteapp
```

All microservices connect to the same database name (`quoteapp`) to ensure data consistency.

---

## 🔧 Usage in Microservices

- **Auth Service** → Uses the `users` collection for authentication and registration
- **Quote Service** → Uses the `quotes` and `favourites` collections to manage quote data

Each service connects independently to MongoDB but shares the same database name, ensuring consistency across services.

---

## 🌱 Environment Variables

In each microservice's `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/quoteapp
```

For production, replace with your MongoDB Atlas or hosted MongoDB URI.

---

## 📝 Notes

- Passwords are automatically hashed using bcrypt before saving
- The database uses Mongoose ODM for schema validation
- Indexes are created on email (users) and userId+quoteId (favourites) for performance
- Timestamps are automatically managed by Mongoose

---

## License

ISC
