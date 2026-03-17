# 🚀 Hosting Guide — Elqahwa Iftar

## Option 1: Render.com (Recommended — Free & Easy)

### Steps:

1. **Create a GitHub repo**
   ```bash
   cd "/Users/abdoahmed/Documents/projects/iftar orders"
   git init
   git add .
   git commit -m "Initial commit"
   ```
   Then push to GitHub (create a new repo at https://github.com/new):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/elqahwa-iftar.git
   git branch -M main
   git push -u origin main
   ```

2. **Go to [Render.com](https://render.com)** and sign up (free) with your GitHub account

3. **Click "New +" → "Web Service"**

4. **Connect your GitHub repo** (`elqahwa-iftar`)

5. **Configure the service:**
   | Setting       | Value            |
   |--------------|------------------|
   | Name         | elqahwa-iftar    |
   | Runtime      | Node             |
   | Build Command| `npm install`    |
   | Start Command| `node server.js` |
   | Plan         | **Free**         |

6. **Click "Create Web Service"** — it will deploy automatically!

7. Your site will be live at: `https://elqahwa-iftar.onrender.com` 🎉

> **Note:** The free tier sleeps after 15 minutes of inactivity. First visit after sleep takes ~30 seconds to wake up.

---

## Option 2: Glitch.com (Instant — No GitHub Needed)

1. Go to [glitch.com](https://glitch.com) and sign up (free)
2. Click **"New Project" → "Import from GitHub"**
3. Paste your repo URL, or use **"hello-express"** template and replace files
4. Your site is instantly live at `https://your-project-name.glitch.me`

---

## Option 3: Railway.app

1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Click **"New Project" → "Deploy from GitHub Repo"**
3. Select your repo — it auto-detects Node.js
4. Free tier gives you 500 hours/month

---

## Running Locally

```bash
cd "/Users/abdoahmed/Documents/projects/iftar orders"
npm install
npm start
```
Open http://localhost:3000
