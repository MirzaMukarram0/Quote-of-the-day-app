# 🐳 Docker Setup Guide - Quote of the Day App

This guide explains how to run the complete Quote of the Day microservices application using Docker and Docker Compose.

## 🏗️ Architecture

The application consists of 4 containerized services:

| Service | Port | Description |
|---------|------|-------------|
| **Frontend** | 3000 | React UI served with Nginx |
| **Auth Service** | 4000 | User authentication and JWT management |
| **Quote Service** | 5000 | Quote management and user favourites |
| **Database** | 27017 | MongoDB data persistence |

## 🚀 Quick Start

### Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

### 1. Build All Services

```powershell
cd c:\Github\Quote-of-the-day-app
docker-compose build
```

### 2. Start All Services

```powershell
docker-compose up -d
```

This will start all services in detached mode. The `-d` flag runs containers in the background.

### 3. Verify Services

Check that all containers are running:

```powershell
docker-compose ps
```

You should see all 4 containers with "Up" status.

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Auth Service API**: http://localhost:4000
- **Quote Service API**: http://localhost:5000
- **MongoDB**: localhost:27017

## 🌱 Database Seeding

The database starts empty. You can seed it with sample data:

```powershell
# Add sample quotes
docker exec -it quoteapp-database mongosh quoteapp --eval "
db.quotes.insertMany([
  {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'motivation',
    tags: ['work', 'passion', 'success']
  },
  {
    text: 'Life is what happens when you are busy making other plans.',
    author: 'John Lennon',
    category: 'life',
    tags: ['life', 'philosophy', 'wisdom']
  },
  {
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    category: 'inspiration',
    tags: ['dreams', 'future', 'belief']
  }
])
"
```

## 🔧 Testing the Services

### Test Auth Service
```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:4000/health"

# Create test user
Invoke-RestMethod -Uri "http://localhost:4000/auth/signup" -Method POST -ContentType "application/json" -Body '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test Quote Service
```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:5000/health"

# Get random quote
Invoke-RestMethod -Uri "http://localhost:5000/quotes/random"
```

### Test Frontend
Visit http://localhost:3000 in your browser to access the React application.

## 🛑 Managing the Application

### Stop All Services
```powershell
docker-compose down
```

### View Logs
```powershell
# All services
docker-compose logs

# Specific service
docker-compose logs auth-service
docker-compose logs quote-service
docker-compose logs frontend
docker-compose logs database
```

### Restart Services
```powershell
docker-compose restart
```

### Rebuild After Changes
```powershell
docker-compose down
docker-compose build
docker-compose up -d
```

## 🗂️ Container Details

### Port Mapping
- Host:4000 → Auth Service:5000 (internal)
- Host:5000 → Quote Service:5001 (internal)  
- Host:3000 → Frontend:3000
- Host:27017 → Database:27017

### Volumes
- `mongodb_data`: Persistent MongoDB data storage

### Networks
- `quoteapp-network`: Internal bridge network for service communication

## 🔍 Troubleshooting

### Container Won't Start
```powershell
# Check logs for errors
docker-compose logs [service-name]

# Check container status
docker-compose ps
```

### Database Connection Issues
```powershell
# Check MongoDB is healthy
docker exec quoteapp-database mongosh --eval "db.adminCommand('ping')"

# Check database connectivity from services
docker-compose logs auth-service | findstr "MongoDB"
docker-compose logs quote-service | findstr "MongoDB"
```

### Frontend API Connection Issues
1. Ensure auth-service and quote-service are running
2. Check that ports 4000 and 5000 are not blocked by firewall
3. Verify environment variables in docker-compose.yml

### Reset Everything
```powershell
# Stop and remove all containers, networks, and volumes
docker-compose down -v

# Remove images (optional)
docker system prune -a

# Rebuild from scratch
docker-compose build
docker-compose up -d
```

## 🎯 Development Workflow

For development, you can run services individually:

```powershell
# Run only database
docker-compose up database

# Run auth and quote services
docker-compose up auth-service quote-service

# Run frontend in development mode (outside Docker)
cd frontend
npm run dev
```

## 📝 Environment Variables

The docker-compose.yml sets these environment variables:

### Auth Service
- `PORT=5000`
- `MONGODB_URI=mongodb://database:27017/quoteapp`
- `JWT_SECRET=mysecretkey`

### Quote Service  
- `PORT=5001`
- `MONGODB_URI=mongodb://database:27017/quoteapp`
- `JWT_SECRET=mysecretkey`

### Frontend
- `VITE_AUTH_API=http://localhost:4000`
- `VITE_QUOTE_API=http://localhost:5000`

## 🚀 Production Considerations

For production deployment:

1. Change `JWT_SECRET` to a secure random string
2. Use environment-specific docker-compose files
3. Configure proper MongoDB authentication
4. Use HTTPS/SSL certificates
5. Set up proper monitoring and logging
6. Configure resource limits for containers

## 📚 Useful Commands

```powershell
# Follow logs in real-time
docker-compose logs -f

# Execute commands in running container
docker exec -it quoteapp-database bash
docker exec -it quoteapp-auth sh

# View resource usage
docker stats

# Clean up unused Docker resources
docker system prune
```

---

## ✅ Success Verification

After running `docker-compose up -d`, you should be able to:

1. ✅ Access the frontend at http://localhost:3000
2. ✅ Create an account and login
3. ✅ View random quotes
4. ✅ Add quotes to favourites (when logged in)
5. ✅ View your favourites list

If all these work, your dockerized Quote of the Day application is running successfully! 🎉