# Railway Deployment Guide

## Prerequisites
- Railway account (sign up at railway.app)
- This repository pushed to GitHub

## Deployment Steps

### 1. Create New Project in Railway
- Go to Railway dashboard
- Click "New Project"
- Choose "Deploy from GitHub repo"
- Select this repository

### 2. Add Database Services
- In your Railway project, click "+ New"
- Select "Database" → "PostgreSQL"
- Click "+ New" again
- Select "Database" → "Redis"

### 3. Configure Environment Variables
- Click on your main app service
- Go to "Variables" tab
- Click "Raw Editor" and add:
  - DATABASE_URL: Copy from PostgreSQL service
  - REDIS_URL: Copy from Redis service
  - Any other env variables from .env.example

### 4. Generate Domain
- Go to "Settings" tab
- Under "Networking", click "Generate Domain"

### 5. Monitor Deployment
- Check "Deployments" tab for build logs
- Once deployed, visit your generated domain

## Troubleshooting
- If "Application failed to respond": Check PORT configuration
- If modules not found: Check file path case sensitivity
- If database errors: Ensure DATABASE_URL is set correctly
