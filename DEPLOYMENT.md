# MyPortfolio - MERN Stack Application

A full-stack portfolio application built with MongoDB, Express, React, and Node.js.

## Project Structure

```
├── client/              # React frontend (Vercel deployment)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/              # Express backend (Render deployment)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── README.md
└── .env
```

## Local Development

### Prerequisites
- Node.js v16+
- MongoDB Atlas account
- Git

### Setup

1. **Install dependencies:**
```bash
cd server && npm install
cd ../client && npm install
```

2. **Configure environment variables:**
   - Edit `server/.env` with your MongoDB Atlas URI and JWT secret
   - Edit `client/.env` with your backend API URL

3. **Start development servers:**
```bash
# From root directory
npm run dev
```

This runs both client (Vite) and server (Express) concurrently.

## Deployment

### Backend (Express + MongoDB) → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your secret key
     - `NODE_ENV`: production

6. Deploy!

### Frontend (React + Vite) → Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Create new Project
4. Import GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `vite build`
   - **Environment Variables**:
     - `VITE_API_URL`: Your Render backend URL

6. Deploy!

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Content Management
- `GET /api/project` - Get all projects
- `GET /api/service` - Get all services
- `GET /api/qualification` - Get all qualifications
- `POST /api/contact` - Send contact message

## Environment Variables

### Backend (`server/.env`)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Portfolio
PORT=5000
JWT_SECRET=your_secret_key_here_min_32_characters
NODE_ENV=production
```

### Frontend (`client/.env`)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Testing Database Connection

Run the connection test:
```bash
cd server
node test-db-connection.js
```

## Technologies Used

- **Frontend**: React 19, Vite, React Router v7
- **Backend**: Express.js, Node.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcrypt
- **Deployment**: Vercel (frontend), Render (backend)

## License

MIT
