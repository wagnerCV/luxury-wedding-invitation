# Deployment Guide - Luxury Wedding Invitation Website

## Overview

This ultra-luxury wedding invitation website is built with **React 19**, **Vite**, **Tailwind CSS 4**, and modern animation libraries. It's designed to be deployed as a static website on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel provides the best experience for React + Vite applications with automatic deployments and global CDN.

### Method 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project directory**:
   ```bash
   cd luxury-wedding-invitation
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy**:
   ```bash
   vercel
   ```

5. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **luxury-wedding-invitation** (or your preferred name)
   - In which directory is your code located? **./client**
   - Want to override settings? **N**

6. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - luxury wedding website"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure build settings:
     - **Framework Preset**: Vite
     - **Root Directory**: `client`
     - **Build Command**: `pnpm build`
     - **Output Directory**: `dist`
   - Click "Deploy"

---

## 🌐 Deploy to Netlify

1. **Build the project locally**:
   ```bash
   cd client
   pnpm install
   pnpm build
   ```

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=client/dist
   ```

3. **Or deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `client/dist` folder
   - Or connect your GitHub repository with these settings:
     - **Base directory**: `client`
     - **Build command**: `pnpm build`
     - **Publish directory**: `client/dist`

---

## 📦 Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   cd client
   pnpm add -D gh-pages
   ```

2. **Update `client/package.json`**:
   ```json
   {
     "homepage": "https://<your-username>.github.io/<repository-name>",
     "scripts": {
       "predeploy": "pnpm build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update `client/vite.config.ts`** to set base path:
   ```typescript
   export default defineConfig({
     base: '/<repository-name>/',
     // ... rest of config
   });
   ```

4. **Deploy**:
   ```bash
   pnpm deploy
   ```

---

## ⚙️ Configuration Before Deployment

### 1. Update Wedding Configuration

Edit `client/src/lib/wedding-config.ts` to customize:

```typescript
export const WEDDING_CONFIG = {
  bride: "Sofia",  // Bride's name
  groom: "Miguel", // Groom's name
  date: new Date("2025-09-20T18:00:00"), // Wedding date and time
  
  venue: {
    name: "Quinta da Aveleda",
    address: "Rua da Aveleda, 4560-570 Penafiel, Portugal",
    ceremonyTime: "18:00",
    receptionTime: "20:00",
    mapUrl: "https://maps.google.com/?q=Quinta+da+Aveleda",
  },
  
  rsvp: {
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // ⚠️ UPDATE THIS
    deadline: new Date("2025-08-20"),
  },
  
  spotifyPlaylistId: "37i9dQZF1DX4sWSpwq3LiO", // ⚠️ UPDATE THIS
  
  gallery: [
    // Update with your actual photo paths
  ],
};
```

### 2. Set Up Formspree for RSVP Form

1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Copy the form endpoint (e.g., `https://formspree.io/f/xyzabc123`)
5. Update `WEDDING_CONFIG.rsvp.formspreeEndpoint` in `wedding-config.ts`

### 3. Update Spotify Playlist

1. Open Spotify and create a playlist
2. Click "Share" → "Copy Playlist Link"
3. Extract the playlist ID from the URL:
   - URL format: `https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO`
   - Playlist ID: `37i9dQZF1DX4sWSpwq3LiO`
4. Update `WEDDING_CONFIG.spotifyPlaylistId` in `wedding-config.ts`

### 4. Replace Gallery Images

1. Add your wedding photos to `client/public/gallery/`
2. Update the `gallery` array in `wedding-config.ts`:
   ```typescript
   gallery: [
     { src: "/gallery/photo1.jpg", alt: "Our engagement" },
     { src: "/gallery/photo2.jpg", alt: "First date" },
     // ... add all your photos
   ],
   ```

### 5. Update Hero Background Image

Replace `client/public/hero-bg.jpg` with your preferred background image (recommended size: 1920x1080px or larger).

---

## 🎨 Customization Options

### Change Color Palette

Edit `client/src/index.css` to modify the color variables:

```css
:root {
  --emerald: oklch(51.78% 0.1351 180.84);
  --burgundy: oklch(34.83% 0.1345 14.29);
  --burnt-orange: oklch(52.64% 0.1598 46.61);
  --amber: oklch(76.82% 0.1593 85.11);
  --sand: oklch(82.89% 0.0389 69.45);
  --off-white: oklch(98.21% 0.0089 85.87);
  --ink-black: oklch(11.42% 0.0034 285.88);
}
```

### Modify Typography

The website uses:
- **Playfair Display** for headings (serif, elegant)
- **Inter** for body text (sans-serif, modern)

To change fonts, update `client/index.html` and `client/src/index.css`.

---

## 📱 Testing Before Deployment

### Local Development

```bash
cd client
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to preview.

### Production Build Test

```bash
cd client
pnpm build
pnpm preview
```

This builds the production version and serves it locally for testing.

---

## 🎯 Performance Optimization

The website is already optimized with:

- ✅ **Lazy loading** for images
- ✅ **Code splitting** via Vite
- ✅ **Optimized animations** with GSAP and Framer Motion
- ✅ **Smooth scroll** with Lenis
- ✅ **Responsive images** for all screen sizes
- ✅ **Minimal bundle size** with tree-shaking

### Additional Optimizations

1. **Compress images** before uploading:
   - Use tools like [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)
   - Recommended format: WebP or optimized JPEG
   - Max size: 500KB per image

2. **Enable CDN caching** (automatic on Vercel/Netlify)

3. **Add custom domain** for professional appearance

---

## 🔧 Troubleshooting

### Issue: Blank page after deployment

**Solution**: Check if the base path is correctly set in `vite.config.ts`. For Vercel/Netlify, use `base: '/'`. For GitHub Pages, use `base: '/<repository-name>/'`.

### Issue: Images not loading

**Solution**: Ensure all image paths start with `/` (e.g., `/gallery/photo1.jpg`) and files are in the `client/public/` directory.

### Issue: Form not submitting

**Solution**: Verify the Formspree endpoint is correct in `wedding-config.ts` and the form is active on Formspree dashboard.

### Issue: Spotify playlist not showing

**Solution**: 
1. Make sure the playlist is set to "Public" in Spotify
2. Verify the playlist ID is correct
3. Check browser console for any CORS errors

---

## 📋 Pre-Deployment Checklist

- [ ] Updated couple names in `wedding-config.ts`
- [ ] Set correct wedding date and time
- [ ] Updated venue information
- [ ] Configured Formspree endpoint for RSVP
- [ ] Added Spotify playlist ID
- [ ] Replaced all placeholder images with actual photos
- [ ] Tested RSVP form submission
- [ ] Verified all links work (calendar, map, etc.)
- [ ] Tested on mobile devices
- [ ] Optimized and compressed all images
- [ ] Ran production build test locally
- [ ] Checked for console errors

---

## 🎉 Post-Deployment

After successful deployment:

1. **Test the live website** on multiple devices and browsers
2. **Share the URL** with a few friends for feedback
3. **Set up analytics** (optional):
   - Google Analytics
   - Vercel Analytics (built-in)
   - Plausible Analytics (privacy-friendly)

4. **Monitor RSVP submissions** via Formspree dashboard
5. **Update content** as needed (Vercel/Netlify auto-deploy on git push)

---

## 🆘 Support

For issues or questions:
- Check the [Vite documentation](https://vitejs.dev)
- Review [Vercel deployment docs](https://vercel.com/docs)
- Consult [Formspree guides](https://help.formspree.io)

---

## 📄 License

This wedding invitation website is a custom creation. All rights reserved by the couple.

---

**Congratulations on your upcoming wedding! 💍✨**
