# 🚀 Deploy to Vercel - Step-by-Step Guide

## Prerequisites
✅ Vercel account (you already have this!)  
✅ Git installed locally  
✅ Project files ready (done!)

---

## 📋 Option 1: Deploy via Vercel CLI (Fastest)

### Step 1: Install Vercel CLI
Open your terminal and run:
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate with your Vercel account.

### Step 3: Navigate to Project
```bash
cd /path/to/luxury-wedding-invitation
```

### Step 4: Deploy to Preview
```bash
vercel
```

You'll be asked:
- **Set up and deploy?** → Press `Y`
- **Which scope?** → Select your Vercel account
- **Link to existing project?** → Press `N`
- **Project name?** → `luxury-wedding-invitation` (or your preferred name)
- **In which directory is your code located?** → Press Enter (use `.`)
- **Want to override settings?** → Press `N`

Vercel will automatically detect the configuration from `vercel.json`.

### Step 5: Deploy to Production
Once preview deployment succeeds, deploy to production:
```bash
vercel --prod
```

🎉 **Done!** Your website will be live at `https://luxury-wedding-invitation.vercel.app`

---

## 📋 Option 2: Deploy via Vercel Dashboard (Recommended for GitHub Integration)

### Step 1: Push to GitHub

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `luxury-wedding-invitation`
   - Make it **Private** (recommended for personal wedding site)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code**:
   ```bash
   cd /path/to/luxury-wedding-invitation
   git remote add origin https://github.com/YOUR_USERNAME/luxury-wedding-invitation.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import to Vercel

1. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Repository**:
   - Click "Import" next to your `luxury-wedding-invitation` repository
   - If you don't see it, click "Adjust GitHub App Permissions" to grant access

3. **Configure Project**:
   Vercel should auto-detect settings from `vercel.json`, but verify:
   
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (leave as is)
   - **Build Command**: `cd client && pnpm install && pnpm build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `pnpm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for build to complete

🎉 **Done!** Your site is live!

---

## ⚙️ Post-Deployment Configuration

### 1. Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `sofia-miguel-wedding.com`)
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

### 2. Environment Variables (If Needed)

If you need to add environment variables:
1. Go to "Settings" → "Environment Variables"
2. Add any required variables
3. Redeploy for changes to take effect

### 3. Update Wedding Details

Before sharing with guests, update:
1. `client/src/lib/wedding-config.ts`:
   - Couple names
   - Wedding date and time
   - Venue information
   - Formspree endpoint (see below)
   - Spotify playlist ID

2. Replace photos in `client/public/gallery/`

3. Replace hero background: `client/public/hero-bg.jpg`

### 4. Set Up Formspree for RSVP

1. Go to https://formspree.io
2. Sign up / Log in
3. Create a new form
4. Copy the endpoint URL (e.g., `https://formspree.io/f/xyzabc123`)
5. Update in `wedding-config.ts`:
   ```typescript
   rsvp: {
     formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
   }
   ```
6. Commit and push changes (Vercel auto-deploys)

---

## 🔄 Automatic Deployments

With GitHub integration:
- **Every push to `main`** → Production deployment
- **Pull requests** → Preview deployments
- **Instant rollbacks** available in Vercel Dashboard

---

## 🎨 Customization After Deployment

### Update Content
1. Edit files locally
2. Commit changes: `git commit -am "Update wedding details"`
3. Push: `git push`
4. Vercel automatically redeploys (takes ~1-2 minutes)

### View Deployment Logs
- Go to Vercel Dashboard → Your Project → "Deployments"
- Click any deployment to see build logs

---

## 📊 Monitor Your Site

### Analytics
Vercel provides built-in analytics:
1. Go to your project → "Analytics"
2. View page views, visitors, and performance metrics

### Performance
Check Lighthouse scores:
1. Go to "Speed Insights" in Vercel Dashboard
2. Monitor Core Web Vitals

---

## 🆘 Troubleshooting

### Build Failed?
1. Check build logs in Vercel Dashboard
2. Verify `vercel.json` configuration is correct
3. Ensure all dependencies are in `package.json`

### Images Not Loading?
1. Verify images are in `client/public/` directory
2. Check paths start with `/` (e.g., `/gallery/photo1.jpg`)
3. Ensure images were committed to git

### Form Not Working?
1. Verify Formspree endpoint is correct
2. Check Formspree dashboard for submissions
3. Ensure form is active (not in test mode)

---

## 🎯 Quick Reference Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm luxury-wedding-invitation
```

---

## 📱 Share Your Website

Once deployed, share your URL:
- **Vercel URL**: `https://luxury-wedding-invitation.vercel.app`
- **Custom Domain**: `https://your-domain.com` (if configured)

You can also generate QR codes for wedding invitations:
- Use https://qr-code-generator.com
- Paste your Vercel URL
- Download and print on physical invitations

---

## ✅ Final Checklist Before Going Live

- [ ] Updated all wedding details in `wedding-config.ts`
- [ ] Replaced all placeholder photos
- [ ] Configured Formspree endpoint
- [ ] Added Spotify playlist
- [ ] Tested RSVP form submission
- [ ] Verified countdown timer works
- [ ] Tested on mobile, tablet, desktop
- [ ] Checked all links (calendar, map)
- [ ] Reviewed content for typos
- [ ] Set up custom domain (optional)
- [ ] Shared preview with close friends for feedback

---

**Need help?** Check the main [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for more details!

🎉 **Congratulations on your upcoming wedding!** 💍
