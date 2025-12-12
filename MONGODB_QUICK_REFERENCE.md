# Your MongoDB Atlas Connection - Quick Reference

## ✅ Current Status

Your MongoDB Atlas is **already configured and connected!**

### Current Connection Details
- **Cluster**: Cluster0
- **Region**: 7xsortf (AWS region)
- **Database**: Portfolio (auto-created on first use)
- **Status**: ✅ Connected and tested

## Your Connection String

```
mongodb+srv://MANAS-301436553:Anas12345@cluster0.7xsortf.mongodb.net/?appName=Cluster0
```

Currently used in: `server/.env` → `MONGO_URI`

## To View Your Data

1. Go to https://cloud.mongodb.com/v2
2. Sign in with your MongoDB Atlas account
3. Click on **Cluster0**
4. Go to **"Collections"** tab
5. Browse your data:
   - **users** - User accounts
   - **projects** - Portfolio projects
   - **services** - Services offered
   - **qualifications** - Qualifications/experience
   - **contacts** - Contact messages

## To Access from Render (Production)

Your backend on Render already has this connection string in environment variables.

If you need to update it:
1. Go to Render dashboard
2. Select your portfolio-backend service
3. Click "Environment"
4. Update `MONGO_URI` if needed

## Test Connection Locally

Run this command anytime to verify connection:

```bash
cd server
node test-db-connection.js
```

Expected output:
```
✅ MongoDB connection successful!
📊 Connection status: Connected
📦 Collections: users, projects, services, qualifications, contacts
```

## Add Data to Your Database

### Option 1: Using Your App
- Sign up as user
- Add projects, qualifications, etc.
- Data automatically saves to MongoDB Atlas

### Option 2: Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/products/compass
2. Use your connection string to connect
3. Browse and edit data visually

### Option 3: Using MongoDB Atlas UI
1. Go to https://cloud.mongodb.com/v2
2. Click "Collections"
3. Add data directly in the web interface

## Backup & Monitoring

Your free tier includes:
- ✅ Automatic daily backups
- ✅ Performance monitoring
- ✅ Basic alerts
- ✅ 512 MB storage

View backups:
1. Go to Cluster0
2. Click "Backup" tab
3. See all automatic backups

## Next Steps

1. ✅ MongoDB Atlas is configured
2. ✅ Connection string is in `server/.env`
3. ✅ Render backend has the same connection string
4. Now: Deploy your app and start using it!

**Your data is safe in the cloud and will persist across deployments!** ☁️
