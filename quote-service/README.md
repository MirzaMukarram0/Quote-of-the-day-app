# Quote Service

A microservice for managing quotes and user favourites.

## Features

- 🎲 Random quote retrieval
- ➕ Add, update, and delete quotes (Admin only)
- ⭐ User favourites management
- 🔒 JWT-based authentication
- 📊 MongoDB database

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
PORT=5001
MONGODB_URI=mongodb://localhost:27017/quote-service
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the service:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Quotes Endpoints

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| `GET` | `/quotes/random` | Retrieve a random "Quote of the Day" | No |
| `POST` | `/quotes/add` | Add a new quote | Yes (Admin) |
| `PUT` | `/quotes/:id` | Update existing quote | Yes (Admin) |
| `DELETE` | `/quotes/:id` | Delete a quote | Yes (Admin) |

### Favourites Endpoints

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| `GET` | `/favourites` | Retrieve all favourites for the authenticated user | Yes |
| `POST` | `/favourites/add/:quoteId` | Add a quote to the user's favourites | Yes |
| `DELETE` | `/favourites/remove/:quoteId` | Remove a quote from the user's favourites | Yes |

## Authentication

Include JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Project Structure

```
quote-service/
├── controllers/
│   ├── quoteController.js      # Quote CRUD operations
│   └── favouriteController.js  # Favourite management logic
├── middleware/
│   └── authMiddleware.js       # JWT verification
├── models/
│   ├── Quote.js               # Quote schema
│   └── Favourite.js           # Favourite schema
├── routes/
│   ├── quoteRoutes.js         # Quote endpoints
│   └── favouriteRoutes.js     # Favourite endpoints
├── server.js                  # Application entry point
├── package.json
└── .env.example
```

## Environment Variables

- `PORT`: Server port (default: 5001)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT verification (must match auth-service)

## License

ISC
