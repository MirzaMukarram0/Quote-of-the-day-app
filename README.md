# Quote of the Day — Microservices App

A small, modular microservices application that serves a "Quote of the Day".
This repository contains four services that work together:

- `auth-service` — User authentication (signup/login/forgot password) using JWT and MongoDB
- `quote-service` — Stores and serves quotes, manages user favourites
- `frontend` — React + Vite frontend (served with Nginx in production)
- `database` — MongoDB data layer and seeding utilities

This README explains how to run the project locally with Docker Compose and how to deploy to a local Kubernetes cluster (minikube).

## Quick links

- Services folder: `auth-service/`, `quote-service/`, `frontend/`, `database/`
- Docker Compose: `docker-compose.yml` (root)
- Kubernetes manifests: `k8s/` (auth, quote, frontend, mongo)
- Docker setup guide: `DOCKER_SETUP.md`
- Kubernetes guide: `KUBERNETES_GUIDE.md`

---

## Prerequisites

- Node.js & npm (for local development of individual services)
- Docker & Docker Compose (for containerized run)
- (Optional) minikube and kubectl (for Kubernetes local deployment)
- MongoDB (only if you run services without Docker)

---

## Run with Docker Compose (recommended quick start)

1. Build images and start services

```powershell
# from repository root
docker-compose build
docker-compose up -d
```

2. Verify services:

```powershell
docker-compose ps
```

3. Open the frontend in your browser:

```
http://localhost:3000
```

4. Useful commands:

```powershell
# Stop and remove containers, networks and volumes created by compose
docker-compose down

# Follow logs
docker-compose logs -f

# Rebuild and restart
docker-compose build && docker-compose up -d --force-recreate
```

Notes:
- The provided `docker-compose.yml` maps host ports to container ports for quick testing (frontend:3000, auth:4000, quote:5000, mongo:27017).
- Check `DOCKER_SETUP.md` for a full walkthrough and troubleshooting tips.

---

## Run on Kubernetes (minikube)

1. Start minikube

```powershell
minikube start
minikube docker-env | Invoke-Expression
```

2. Build images into minikube's Docker daemon (so k8s can use them):

```powershell
docker build -t auth-service:latest ./auth-service
docker build -t quote-service:latest ./quote-service
docker build -t frontend:latest ./frontend
```

3. Deploy manifests

```powershell
kubectl apply -f ./k8s/
```

4. Access the frontend (recommended):

```powershell
minikube service frontend-service --url
```

5. To stop and remove the k8s resources

```powershell
kubectl delete -f ./k8s/
minikube stop
```

See `KUBERNETES_GUIDE.md` for full instructions and troubleshooting.

---

## Project structure (high level)

```
├── auth-service/        # Express auth API (signup, login, forgot password)
├── quote-service/       # Express quote API (random, CRUD, favourites)
├── frontend/            # React + Vite frontend
├── database/            # MongoDB models and seed script
├── k8s/                 # Kubernetes manifests for local deployment
├── docker-compose.yml   # Compose setup for local containers
└── README.md            # This file
```

---

## Environment variables

Each service includes a `.env.example` file. Important variables:

- `MONGODB_URI` / `MONGO_URI` — MongoDB connection string (example: `mongodb://database:27017/quoteapp`)
- `JWT_SECRET` — JWT signing secret (must be same across services that verify tokens)
- `PORT` — The port the service listens on

When running with Docker Compose these are already set in `docker-compose.yml` for quick testing. For production change secrets and use a proper secret store.

---

## Seed data

The `database/init/seed.js` script (and the `database` service) contains sample quotes and test users (admin and regular) to populate the DB. You can run the seeding script manually or use the provided Docker Compose setup.

---

## Development tips

- Run the frontend in dev mode while backend runs in containers:

```powershell
cd frontend
npm install
npm run dev
```

- To run a single service locally (example: auth)

```powershell
cd auth-service
npm install
npm run dev
```

---

## API Endpoints (high level)

- Auth Service (default host/port when using compose)
	- POST /auth/signup
	- POST /auth/login
	- POST /auth/forgot-password
	- GET /auth/me

- Quote Service
	- GET /quotes/random
	- POST /quotes/add (admin)
	- PUT /quotes/:id (admin)
	- DELETE /quotes/:id (admin)

- Favourites (Quote Service)
	- GET /favourites
	- POST /favourites/add/:quoteId
	- DELETE /favourites/remove/:quoteId

---

## Troubleshooting

- If a service cannot reach MongoDB, ensure MongoDB is running and that the `MONGO_URI` points to the right host/port (in Docker Compose `mongodb://database:27017/quoteapp`).
- If JWT verification fails across services, check `JWT_SECRET` is identical between `auth-service` and `quote-service`.
- Use `docker-compose logs -f` or `kubectl logs` to inspect runtime logs.

---

## License & Credits

This project is released under the ISC license. See individual service READMEs for more details.

---

If you'd like I can:
- Add CI workflow for building images
- Add production-ready k8s manifests (Ingress, PersistentVolumes, Secrets)
- Set up GitHub Actions to build and push images to a registry

Tell me which of those you'd like next.

