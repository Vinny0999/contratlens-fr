# 🚀 Simple Vercel Deployment Setup

## One-Time Configuration (Do this once in Vercel Dashboard)

1. **Go to your Vercel project settings**: https://vercel.com/vinny0999s-projects/contratlens-fr/settings

2. **Click on "General" tab**

3. **Scroll to "Build & Development Settings"**

4. **Configure these settings:**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Click "Save"**

6. **Go to "Deployments" tab and click "Redeploy"**

## That's It! 🎉

From now on, every time you push to GitHub, it will **automatically deploy**!

```bash
git add .
git commit -m "your changes"
git push
```

Vercel will automatically:
✅ Detect the push
✅ Build the frontend
✅ Deploy to production

## Quick Fix via Vercel Dashboard

**Alternative: Use Vercel's UI to set Root Directory**

1. Go to: Project Settings → General
2. Find "Root Directory"
3. Click "Edit"
4. Enter: `frontend`
5. Save

This tells Vercel: "My project is inside the `frontend` folder"

Then just redeploy and it will work! 🚀
