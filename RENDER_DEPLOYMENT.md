# Deploy Backend to Render - Step-by-Step Guide

## Prerequisites
✅ Your code is on GitHub: https://github.com/mannasca/Portfolio
✅ MongoDB Atlas is configured and running
✅ Backend is in the `server` folder

## Step 1: Create Render Account

1. Go to https://render.com
2. Click **"Sign Up"**
3. Sign up with GitHub (easiest option) or email
4. Authorize Render to access your GitHub repositories

## Step 2: Create a New Web Service

1. After signing in, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect a repository"**

## Step 3: Connect Your GitHub Repository

1. You'll see a list of your GitHub repositories
2. Find and click **"Portfolio"** (your repository)
3. Click **"Connect"** button

## Step 4: Configure the Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `portfolio-backend` |
| **Environment** | `Node` |
| **Region** | Choose closest to you (e.g., `Oregon`, `Frankfurt`) |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Root Directory** | `server` |

### Important: Root Directory
- ⚠️ MUST be `server` (not the root folder)
- This tells Render to build from the `server` folder

## Step 5: Add Environment Variables

1. Scroll down to **"Advanced"** section
2. Click **"Add Environment Variable"**
3. Add these variables:

```
MONGO_URI = mongodb+srv://MANAS-301436553:Anas12345@cluster0.7xsortf.mongodb.net/?appName=Cluster0
PORT = 5000
JWT_SECRET = mySuperSecretKey123
NODE_ENV = production
```

⚠️ **Copy exactly from your `server/.env` file**

## Step 6: Deploy

1. Click **"Create Web Service"** button
2. Wait for deployment to start (takes 1-3 minutes)
3. You'll see build logs in real-time
4. Look for message: ✅ "Server running on port 5000"

## Step 7: Get Your Backend URL

After successful deployment:

1. You'll see a URL like: `https://portfolio-backend.onrender.com`
2. Copy this URL (you'll need it for the frontend)
3. Test it: Visit `https://portfolio-backend.onrender.com/api/project`
4. Should see your projects JSON data

## Step 8: Verify Deployment

Test your backend:

### Test GET request:
```
https://portfolio-backend.onrender.com/api/project
```
Should return your 3 projects ✅

### Test another endpoint:
```
https://portfolio-backend.onrender.com/api/service
```
Should return your 3 services ✅

## Common Issues & Solutions

### ❌ Build Failed
**Check:**
- Root directory is set to `server`
- All dependencies in `server/package.json`
- No syntax errors in code

**Fix:** Check Render build logs for specific error

### ❌ "Cannot find module"
**Cause:** Missing dependencies

**Fix:** 
1. Run `npm install` in `server` folder locally
2. Commit `package-lock.json`
3. Push to GitHub
4. Redeploy on Render

### ❌ "MongoDB connection failed"
**Check:**
- `MONGO_URI` is correct in environment variables
- IP whitelist includes Render (use 0.0.0.0/0 for now)
- Username/password are correct

### ❌ "Port already in use"
**Fix:** Render manages ports automatically, ensure `PORT` env var is set

### ⏳ First request is slow
**Normal:** Free tier Render services sleep after 15 min of inactivity
- First request after sleep takes 30-50 seconds
- Subsequent requests are fast

## After Deployment

1. ✅ Copy your backend URL
2. ✅ Update frontend with this URL
3. ✅ Set `VITE_API_URL` in Vercel to this URL
4. ✅ Test API calls from frontend

## Monitoring Your Deployment

**View Logs:**
1. Go to your service on Render
2. Click **"Logs"** tab
3. See real-time server output

**Check Status:**
1. Go to your service dashboard
2. See CPU, memory usage
3. View last deploy time

**Redeploy:**
1. Push changes to GitHub
2. Render auto-detects and redeploys
3. Or manually click **"Redeploy"** button

## Your Backend URL

After deployment, your backend will be at:
```
https://portfolio-backend.onrender.com
```

Use this in your frontend `.env`:
```
VITE_API_URL=https://portfolio-backend.onrender.com
```

---

**That's it! Your backend is now live on the cloud!** 🚀
