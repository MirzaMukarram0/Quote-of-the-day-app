
---

## 🧩 File Details

### `server.js`
- Entry point for the Quote Service.
- Connects to MongoDB and initializes all routes.
- Handles global error and request logging.

### `quoteRoutes.js`
- Defines routes for retrieving and managing quotes.
- Includes middleware to restrict certain routes to admin users.

### `favouriteRoutes.js`
- Manages user favourites — adding, removing, and viewing saved quotes.
- Requires a valid JWT for all requests.

### `quoteController.js`
- Contains logic for retrieving random quotes and performing CRUD operations.

### `favouriteController.js`
- Handles logic for managing a user’s favourite quotes (add, view, remove).

### `authMiddleware.js`
- Verifies and decodes JWT tokens sent by the Auth Service.
- Attaches the decoded user object to the request.

---

## 📜 API Endpoints

### **Quotes Endpoints**
| Method | Route | Description |
|---------|--------|-------------|
| `GET` | `/quotes/random` | Retrieve a random “Quote of the Day”. |
| `POST` | `/quotes/add` | Add a new quote (Admin only). |
| `PUT` | `/quotes/:id` | Update existing quote (Admin only). |
| `DELETE` | `/quotes/:id` | Delete a quote (Admin only). |

### **Favourites Endpoints**
| Method | Route | Description |
|---------|--------|-------------|
| `GET` | `/favourites` | Retrieve all favourites for the authenticated user. |
| `POST` | `/favourites/add/:quoteId` | Add a quote to the user’s favourites. |
| `DELETE` | `/favourites/remove/:quoteId` | Remove a quote from the user’s favourites. |

---

## 🔒 Example: Auth Middleware
```javascript
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. Token missing." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token." });
    req.user = user;
    next();
  });
}
