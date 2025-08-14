# Deployment Guide for RitualServiceNG

This guide explains how to deploy your Angular application so that cPanel automatically targets `index.csr.html` instead of requiring manual `index.html` management.

## 🎯 What This Solves

- **Before**: You had to manually manage `index.html` in the public folder
- **After**: cPanel automatically serves `index.csr.html` (the Angular build output)
- **Benefit**: No more manual file management, automatic deployment

## 🚀 Quick Deployment

### Option 1: Using the Build Script (Recommended)

#### For Windows Users:
```bash
npm run build:deploy:win
```

#### For Linux/Mac Users:
```bash
npm run build:deploy
```

### Option 2: Manual Build
```bash
npm run build
```

## 📁 What Gets Generated

After building, your `dist/ritual-service-ng/browser/` folder will contain:

- `index.csr.html` - Your main Angular application
- `.htaccess` - Apache configuration (makes cPanel serve index.csr.html)
- `web.config` - IIS configuration (for Windows servers)
- `index.html` - Simple redirect to index.csr.html
- All other build assets (JS, CSS, images)

## 🌐 Uploading to cPanel

1. **Build your project** using one of the methods above
2. **Navigate to** `dist/ritual-service-ng/browser/`
3. **Select all files** in this folder
4. **Upload to** your cPanel `public_html` directory
5. **Ensure** `.htaccess` is uploaded (it might be hidden)

## ⚙️ How It Works

### .htaccess Configuration
The `.htaccess` file contains:
```apache
# Set index.csr.html as the default document
DirectoryIndex index.csr.html index.html

# Handle Angular routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.csr.html [L]
```

This tells Apache/cPanel to:
1. **First try** to serve `index.csr.html`
2. **Fallback to** `index.html` if needed
3. **Route all requests** to `index.csr.html` for Angular routing

### Fallback index.html
The `index.html` file is a simple redirect that ensures users always get to your Angular app:
```html
<meta http-equiv="refresh" content="0;url=index.csr.html">
<script>window.location.href = 'index.csr.html';</script>
```

## 🔧 Troubleshooting

### cPanel Still Serves index.html
1. **Check** if `.htaccess` was uploaded (it might be hidden)
2. **Verify** `.htaccess` permissions (should be 644)
3. **Ensure** Apache mod_rewrite is enabled on your hosting

### 404 Errors on Refresh
This is normal for Angular apps. The `.htaccess` file handles this by routing all requests to `index.csr.html`.

### Build Errors
1. **Clean** the dist folder: `rm -rf dist/`
2. **Update** dependencies: `npm install`
3. **Try** building again: `npm run build:deploy`

## 📋 Deployment Checklist

- [ ] Project builds successfully
- [ ] `.htaccess` file is in the build output
- [ ] All files uploaded to cPanel `public_html`
- [ ] `.htaccess` file is visible and accessible
- [ ] Website loads correctly
- [ ] Angular routing works (try refreshing on a sub-page)

## 🎉 Result

After following this guide:
- ✅ cPanel automatically serves `index.csr.html`
- ✅ No more manual `index.html` management
- ✅ Angular routing works correctly
- ✅ Automatic deployment with each build
- ✅ Professional hosting setup

## 🔄 Updating Your Site

To update your live site:
1. **Make changes** to your code
2. **Run** `npm run build:deploy` (or `build:deploy:win` on Windows)
3. **Upload** the new `dist/ritual-service-ng/browser/` contents to cPanel
4. **Done!** Your site is updated

No more manual file management - just build and upload!
