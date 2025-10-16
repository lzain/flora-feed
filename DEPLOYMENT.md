# Deployment Guide

This document provides detailed instructions for deploying Flora Feed using various methods.

## Table of Contents

- [GitHub Pages (Recommended)](#github-pages-recommended)
- [Docker Deployment](#docker-deployment)
- [Other Platforms](#other-platforms)

## GitHub Pages (Recommended)

Flora Feed is pre-configured for seamless deployment to GitHub Pages.

### Automatic Deployment

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main`.

1. **Enable GitHub Pages in your repository:**
   ```
   Settings → Pages → Source: GitHub Actions
   ```

2. **Update the base path** (if your repo name is different from "flora-feed"):
   
   Edit `vite.config.ts` and change the base path:
   ```typescript
   base: process.env.GITHUB_PAGES === 'true' ? '/your-repo-name/' : '/',
   ```

3. **Push to the main branch:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

4. **The GitHub Action (`.github/workflows/deploy.yml`) will automatically:**
   - Install dependencies with pnpm
   - Build the application with `GITHUB_PAGES=true`
   - Generate the manifest with correct paths via VitePWA
   - Deploy to GitHub Pages
   - Make it available at: `https://<username>.github.io/<repo-name>/`

### Manual Deployment

If you need to deploy manually or test the GitHub Pages build locally:

```bash
# Build with GitHub Pages config
pnpm build:gh-pages

# Preview the build locally (simulates GitHub Pages environment)
pnpm preview:gh-pages

# The dist folder is ready to deploy manually if needed
```

**Note:** The VitePWA plugin automatically generates the `manifest.webmanifest` and service worker with the correct base paths during build. Do not create a static `manifest.json` file in the `public/` folder as it will override the generated one.

### Troubleshooting

- **404 on navigation**: The deployment workflow handles this automatically with proper routing
- **Assets not loading**: Check that the `base` path in `vite.config.ts` matches your repository name
- **Service Worker issues**: Clear cache and hard reload after deployment

## Docker Deployment

### Local Development with Docker

Run the development server with hot reload:

```bash
docker-compose up dev
```

Access at: http://localhost:5173

### Production Preview

Build and run the production container locally:

```bash
docker-compose up prod
```

Access at: http://localhost:8080

### Manual Docker Build

```bash
# Build the image
docker build -t flora-feed .

# Run the container
docker run -p 8080:80 flora-feed

# Run in detached mode
docker run -d -p 8080:80 --name flora-feed-app flora-feed

# Stop the container
docker stop flora-feed-app

# Remove the container
docker rm flora-feed-app
```

### Docker Hub Deployment

```bash
# Tag your image
docker tag flora-feed yourusername/flora-feed:latest

# Push to Docker Hub
docker push yourusername/flora-feed:latest

# Pull and run on any server
docker pull yourusername/flora-feed:latest
docker run -d -p 80:80 yourusername/flora-feed:latest
```

### Container Platforms

Deploy the Docker image to various platforms:

#### AWS ECS

```bash
# Build for linux/amd64
docker buildx build --platform linux/amd64 -t flora-feed .

# Push to ECR
aws ecr get-login-password --region region | docker login --username AWS --password-stdin account.dkr.ecr.region.amazonaws.com
docker tag flora-feed:latest account.dkr.ecr.region.amazonaws.com/flora-feed:latest
docker push account.dkr.ecr.region.amazonaws.com/flora-feed:latest
```

#### Google Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/project-id/flora-feed

# Deploy
gcloud run deploy flora-feed --image gcr.io/project-id/flora-feed --platform managed
```

#### Azure Container Instances

```bash
# Push to ACR
az acr login --name yourregistry
docker tag flora-feed yourregistry.azurecr.io/flora-feed:latest
docker push yourregistry.azurecr.io/flora-feed:latest

# Deploy
az container create --resource-group myResourceGroup --name flora-feed --image yourregistry.azurecr.io/flora-feed:latest --dns-name-label flora-feed --ports 80
```

## Other Platforms

### Vercel

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`
3. Deploy

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `pnpm build`
   - Publish Directory: `dist`
3. Add `_redirects` file to `public/` folder:
   ```
   /*    /index.html   200
   ```
4. Deploy

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
   - Build Command: `pnpm build`
   - Build Output Directory: `dist`
   - Root Directory: `/`
3. Deploy

### Self-Hosted (Traditional Server)

#### Using Docker (Recommended)

```bash
# On your server
docker pull yourusername/flora-feed:latest
docker run -d -p 80:80 --restart unless-stopped flora-feed
```

#### Using Nginx (Manual)

1. Build the app:
   ```bash
   pnpm build
   ```

2. Copy `dist/` folder to your server:
   ```bash
   scp -r dist/* user@server:/var/www/flora-feed/
   ```

3. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/flora-feed;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. Reload Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Environment Variables

The following environment variables are used:

- `GITHUB_PAGES`: Set to `'true'` to configure the app for GitHub Pages deployment
- `NODE_ENV`: Automatically set by build tools (development/production)

## Build Output

After building, the `dist/` folder contains:
- `index.html` - Main HTML file
- `assets/` - JavaScript, CSS, and other assets
- PWA files: `manifest.webmanifest`, `sw.js`, `registerSW.js`
- Icons and images

## Performance Optimization

The production build includes:
- ✅ Code minification
- ✅ Tree shaking
- ✅ Asset optimization
- ✅ Gzip compression (in Docker/nginx)
- ✅ Cache headers for static assets
- ✅ Service worker for offline access

## Monitoring

When deployed, you can monitor:
- **GitHub Pages**: Check Actions tab for deployment status
- **Docker**: Use `docker logs flora-feed-app`
- **Nginx**: Check logs at `/var/log/nginx/`

## Security

The nginx configuration includes:
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Proper caching for static assets
- No-cache for service worker and manifest files

## Support

For issues with deployment:
1. Check the Actions tab on GitHub for build logs
2. Verify environment variables are set correctly
3. Ensure the base path matches your deployment location
4. Clear browser cache after deployment

---

**Note**: This app stores data locally using localStorage. No backend server is required.

