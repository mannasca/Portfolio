# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign In"**
3. Create an account with email/password or Google/GitHub

## Step 2: Create a Cluster

1. Click **"Create"** (after signing in)
2. Choose **"Free"** tier (M0 Sandbox)
3. Select your cloud provider (AWS, Google Cloud, or Azure)
4. Choose region closest to you
5. Click **"Create"**
6. Wait 1-3 minutes for cluster to be created

## Step 3: Create Database User

1. Go to **"Security"** → **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username**: `manas` (or your preferred name)
   - **Password**: Create a strong password (save this!)
5. Set privileges to **"Atlas admin"**
6. Click **"Add User"**

⚠️ **Important**: Save your username and password securely!

## Step 4: Whitelist IP Address

1. Go to **"Security"** → **"Network Access"**
2. Click **"Add IP Address"**
3. Choose one of:
   - **"Allow Access from Anywhere"** (0.0.0.0/0) - for development/testing
   - **"Add Current IP Address"** - more secure
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Go to **"Clusters"** (main page)
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"**
4. Select **"Node.js"**
5. Copy the connection string
6. It should look like:
```
mongodb+srv://manas:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Step 6: Update Your Application

### Local Development

Edit `server/.env`:
```env
MONGO_URI=mongodb+srv://manas:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/Portfolio?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=mySuperSecretKey123
NODE_ENV=development
```

Replace:
- `manas` with your database username
- `YOUR_PASSWORD` with your database password
- `cluster0.xxxxx` with your actual cluster info

### Production (Render)

1. Go to Render dashboard → Your backend service
2. Click **"Environment"**
3. Add/update:
   - **MONGO_URI**: Your connection string (same format as above)
   - **JWT_SECRET**: Your secret key
   - **NODE_ENV**: `production`
4. Click **"Save"**
5. Service will auto-redeploy

## Step 7: Verify Connection

Run this command to test:
```bash
cd server
node test-db-connection.js
```

You should see:
```
✅ MongoDB connection successful!
📊 Connection status: Connected
📦 Collections: (will list your collections)
```

## Step 8: Create Database (Optional)

If you want to manage your database:

1. Go to **"Collections"** in your cluster
2. Click **"Create Database"**
3. Enter:
   - **Database name**: `Portfolio`
   - **Collection name**: `users` (or leave empty)
4. Click **"Create"**

Or let your app create collections automatically when it runs.

## Useful MongoDB Atlas Links

- **Clusters**: https://cloud.mongodb.com/v2 → Your cluster
- **Data Explorer**: View and manage your data
- **Performance**: Monitor database performance
- **Backups**: Automatic backups are enabled on free tier

## Common Issues

### "Authentication failed"
- Check username/password are correct
- Verify IP is whitelisted
- Ensure no special characters in password (URL encode if needed)

### "Connection timeout"
- Check IP whitelist includes your current IP
- For Render: Use "Allow Access from Anywhere"

### "Database not found"
- Collection will be created automatically on first write
- Or manually create it in Data Explorer

## Example Connection in Code

Your `server/server.js` already has:
```javascript
await mongoose.connect(mongoUri);
console.log("✅ MongoDB connected successfully");
```

Just ensure `MONGO_URI` environment variable is set correctly!

## Security Best Practices

✅ Do:
- Use strong passwords (12+ characters, mix of types)
- Store credentials in `.env` (never in code)
- Use IP whitelist for production
- Enable VPC peering for extra security

❌ Don't:
- Commit `.env` to GitHub
- Use "Allow Anywhere" in production (use specific IPs)
- Share connection strings
- Use weak passwords

---

**Once set up, your data will be stored in the cloud and accessible from anywhere!** ☁️
