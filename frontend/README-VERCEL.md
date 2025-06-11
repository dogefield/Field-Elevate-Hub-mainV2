# Vercel Frontend Deployment Guide

## Prerequisites
- Vercel account (sign up at vercel.com)
- Railway backend deployed and running

## Deployment Steps

### 1. Deploy to Vercel
Option A - Using Vercel CLI:
```bash
cd frontend
npm install -g vercel
vercel
```
Follow the CLI prompts to complete the deployment.

Option B - Using Vercel Dashboard:
1. Log in to the Vercel dashboard.
2. Import this repository and select the `frontend` folder as the root.
3. Set the environment variables defined in `.env.example`.
4. Click **Deploy**.

After deployment, Vercel will provide a URL for your frontend.
