# Deployment Guide for Render

Follow these steps to deploy your LearnFlow LMS to Render.

## 1. Prepare your GitHub Repository
- Ensure all your code (root, frontend, backend) is pushed to a GitHub repository.

## 2. Create a Web Service on Render
- Go to [dashboard.render.com](https://dashboard.render.com).
- Click **New +** and select **Web Service**.
- Connect your GitHub repository.

## 3. Configure the Web Service
- **Name**: `learnflow-lms` (or any name you like)
- **Environment**: `Node`
- **Root Directory**: (Leave blank - use the repository root)
- **Build Command**: `npm run root-build`
- **Start Command**: `npm start`

## 4. Set Environment Variables
In the **Environment** tab on Render, add the following variables:
- `NODE_ENV`: `production`
- `MONGODB_URI`: (Your MongoDB Atlas connection string)
- `JWT_SECRET`: (Your secret key for JWT)
- `PORT`: `10000` (Render's default)

## 5. Deploy!
- Click **Create Web Service**.
- Render will install dependencies, build the frontend, and start your backend server.

## 6. Verification
- Once the status is **Live**, click the URL provided by Render.
- Your application should load, and the backend will serve the frontend automatically.
## 7. Troubleshooting: "vite: Permission denied"
If you see a `Permission denied` error, it's likely because your `node_modules` folder was accidentally pushed to GitHub from Windows. 

### How to Fix:
Run these commands in your local terminal to remove `node_modules` from Git tracking:
```bash
git rm -r --cached .
git add .
git commit -m "chore: remove node_modules and apply .gitignore"
git push origin main
```
This will clear the "bad" files from GitHub without deleting them from your computer, allowing Render to do a fresh, clean install.
