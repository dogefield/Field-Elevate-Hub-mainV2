// field-elevate-frontend-railway-implementation.md
// RAILWAY.COM OPTIMIZED FRONTEND IMPLEMENTATION
// =============================================

// ===== REMOVE/IGNORE DOCKER FILES =====
// If you have Dockerfile or docker-compose.yml, either:
// 1. Delete them, OR
// 2. Add a .railwayignore file to exclude them

// ===== .railwayignore =====
const railwayIgnore = `
Dockerfile
docker-compose.yml
.dockerignore
*.dockerfile
`;

// ===== RAILWAY.JSON (Railway-specific config)
const railwayJson = `
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
`;

// ===== NIXPACKS.TOML (Railway's build system config)
const nixpacksToml = `
# nixpacks.toml
providers = ["node"]

[variables]
NODE_ENV = "production"

[phases.setup]
nixPkgs = ["nodejs-18_x", "npm-9_x"]

[phases.install]
cmds = ["npm ci --legacy-peer-deps"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"
`;

// ===== UPDATED PACKAGE.JSON (Railway-optimized)
const packageJsonRailway = {
  "name": "field-elevate-frontend",
  "version": "1.0.0",
  "private": true,
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p ${PORT:-3000}",
    "lint": "next lint",
    "postinstall": "prisma generate || true"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.3",
    "@tanstack/react-query": "^5.17.0",
    "zustand": "^4.4.7",
    "socket.io-client": "^4.6.0",
    "next-auth": "^4.24.5",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "recharts": "^2.10.0",
    "d3": "^7.8.5",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "date-fns": "^3.2.0",
    "lodash": "^4.17.21",
    "@tanstack/react-virtual": "^3.0.1",
    "framer-motion": "^10.18.0",
    "sharp": "^0.33.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.47",
    "@types/react-dom": "^18.2.18",
    "@types/lodash": "^4.14.202",
    "@types/d3": "^7.4.3",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.1.0"
  }
};

// ===== UPDATED NEXT.CONFIG.JS (Railway-optimized)
const nextConfigRailway = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Railway doesn't need standalone output
  output: 'default',
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  env: {
    // Railway provides these as environment variables
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000',
  },
  images: {
    domains: ['api.fieldelevate.com'],
    // Railway optimization
    loader: 'default',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  // Railway-specific optimizations
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
`;

// ===== ENVIRONMENT VARIABLES TEMPLATE (.env.example)
const envExample = `
# Railway will inject these from your service variables
# Set these in Railway dashboard, not in code

# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_WS_URL=wss://your-backend.railway.app

# NextAuth Configuration
NEXTAUTH_URL=https://your-frontend.railway.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Backend MCP Hub URL
MCP_HUB_URL=https://your-mcp-hub.railway.app

# Optional: Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_POSTHOG_KEY=
`;

// ===== RAILWAY DEPLOYMENT GUIDE =====
const railwayDeploymentGuide = `
# RAILWAY DEPLOYMENT GUIDE FOR FIELD ELEVATE FRONTEND
# ==================================================

# Prerequisites:
# 1. Railway CLI installed: npm install -g @railway/cli
# 2. Railway account created
# 3. Backend services already deployed on Railway

# Step 1: Login to Railway
railway login

# Step 2: Create new project (if not exists)
railway init
# Select "Empty Project"
# Name it: field-elevate-frontend

# Step 3: Link to GitHub repo (recommended)
# Go to Railway dashboard > Your Project > Settings > Connect GitHub repo

# Step 4: Set Environment Variables in Railway Dashboard
# Go to your service > Variables > Add the following:

NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_WS_URL=wss://your-backend.railway.app
NEXTAUTH_URL=https://${{RAILWAY_STATIC_URL}}
NEXTAUTH_SECRET=your-generated-secret
NODE_ENV=production
PORT=3000

# Step 5: Configure build settings in Railway Dashboard
# - Build Command: npm run build
# - Start Command: npm start
# - Install Command: npm ci --legacy-peer-deps

# Step 6: Deploy
railway up

# OR if using GitHub:
# Just push to your connected branch

# Step 7: Setup custom domain (optional)
# Go to Settings > Domains > Add custom domain

# ===== IMPORTANT RAILWAY-SPECIFIC NOTES =====

# 1. Railway provides these automatically:
# - PORT (use process.env.PORT)
# - RAILWAY_STATIC_URL (your app URL)
# - NODE_ENV

# 2. Railway uses Nixpacks by default, which auto-detects Next.js

# 3. No need for Docker unless you specifically want it

# 4. Railway provides built-in SSL/HTTPS

# 5. Railway handles scaling automatically

# ===== CONNECTING TO BACKEND SERVICES =====

# Your backend services on Railway should expose:
# - MCP Hub: https://mcp-hub-production.railway.app
# - Data Hub: Internal service URL
# - Signal Forge: Internal service URL
# etc.

# Use Railway's internal networking for service-to-service communication
# Frontend -> MCP Hub: Use public URL (HTTPS)
# MCP Hub -> Other services: Use internal URLs

# ===== TROUBLESHOOTING =====

# If build fails:
# 1. Check build logs in Railway dashboard
# 2. Ensure all env variables are set
# 3. Try adding to package.json:
#    "engines": { "node": "18.x" }

# If app crashes on start:
# 1. Make sure to use process.env.PORT
# 2. Check for missing env variables
# 3. Look at deploy logs

# If WebSocket connection fails:
# 1. Ensure backend supports WSS (not just WS)
# 2. Check CORS settings on backend
# 3. Use the public Railway URL for WebSocket connections
`;

// ===== COMPLETE IMPLEMENTATION STEPS =====
const implementationSteps = `
# COMPLETE RAILWAY IMPLEMENTATION STEPS
# ====================================

# 1. Create new Next.js project
npx create-next-app@latest field-elevate-frontend --typescript --tailwind --app

# 2. Navigate to project
cd field-elevate-frontend

# 3. Remove Docker files if they exist
rm -f Dockerfile docker-compose.yml .dockerignore

# 4. Create Railway-specific files
echo '${railwayIgnore}' > .railwayignore
echo '${JSON.stringify(railwayJson, null, 2)}' > railway.json
echo '${nixpacksToml}' > nixpacks.toml

# 5. Update package.json with Railway-optimized version
# Copy the packageJsonRailway content

# 6. Update next.config.js
# Copy the nextConfigRailway content

# 7. Install all dependencies
npm install @tanstack/react-query zustand socket.io-client next-auth \
  @radix-ui/react-alert-dialog @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast \
  recharts d3 react-hook-form zod @hookform/resolvers \
  tailwindcss-animate class-variance-authority clsx date-fns lodash \
  @tanstack/react-virtual framer-motion lucide-react sharp

# 8. Create .env.example
echo '${envExample}' > .env.example

# 9. Initialize git (if not already)
git init
git add .
git commit -m "Initial commit with Railway configuration"

# 10. Deploy to Railway
railway login
railway init
railway up

# OR connect GitHub repo in Railway dashboard for automatic deployments
`;

// COMPLETE RAILWAY-OPTIMIZED IMPLEMENTATION
