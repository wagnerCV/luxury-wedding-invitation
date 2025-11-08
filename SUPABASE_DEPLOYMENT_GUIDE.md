# 🚀 Complete Supabase RSVP System - Deployment Guide

This guide covers deploying both the wedding website and the separate admin dashboard to Vercel.

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Prerequisites](#prerequisites)
3. [Supabase Setup](#supabase-setup)
4. [Deploy Wedding Website](#deploy-wedding-website)
5. [Deploy Admin Dashboard](#deploy-admin-dashboard)
6. [Environment Variables](#environment-variables)
7. [PWA Installation](#pwa-installation)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 System Overview

**Two Separate Applications:**

1. **Wedding Website** (`/luxury-wedding-invitation`)
   - Public wedding invitation
   - RSVP form submits directly to Supabase
   - Deployed to: `your-wedding-site.vercel.app`

2. **Admin Dashboard** (`/wedding-admin`)
   - Separate Next.js 14 app
   - Email/password authentication (2 users only)
   - View RSVPs, statistics, export CSV
   - PWA installable on iOS/Android
   - Deployed to: `your-wedding-admin.vercel.app`

**Database:**
- Supabase PostgreSQL database
- Single `rsvp` table shared by both apps

---

## ✅ Prerequisites

- [Vercel account](https://vercel.com/signup) (free)
- [Supabase account](https://supabase.com) (already set up)
- Git installed locally
- Node.js 18+ installed

---

## 🗄️ Supabase Setup

### Step 1: Run SQL Migration

1. Go to https://javfiorjnisekjnrjtsg.supabase.co
2. Navigate to **SQL Editor** in left sidebar
3. Click **"New Query"**
4. Copy and paste the contents of `supabase-migration.sql`
5. Click **"Run"**
6. Verify success message

### Step 2: Verify Table Creation

1. Go to **Table Editor** in Supabase dashboard
2. You should see the `rsvp` table with columns:
   - `id` (uuid)
   - `name` (text)
   - `email` (text)
   - `phone` (text)
   - `guests_count` (int4)
   - `message` (text)
   - `created_at` (timestamptz)

### Step 3: Check Row Level Security (RLS)

1. Go to **Authentication** → **Policies**
2. Select `rsvp` table
3. You should see two policies:
   - **"Allow public RSVP submissions"** (INSERT for anon)
   - **"Allow authenticated users to read RSVPs"** (SELECT for authenticated)

---

## 🌐 Deploy Wedding Website

### Option 1: Deploy from Manus (Easiest)

1. In Manus, click **"Publish"** button in Management UI
2. Your site will be deployed automatically
3. You'll get a live URL: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Navigate to project root
cd /path/to/luxury-wedding-invitation

# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 3: Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   cd /path/to/luxury-wedding-invitation
   git init
   git add .
   git commit -m "Initial commit - wedding website"
   git branch -M main
   git remote add origin https://github.com/yourusername/wedding-site.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Git Repository"**
   - Select your `wedding-site` repository
   - Configure:
     - **Framework Preset:** Vite
     - **Build Command:** `pnpm build`
     - **Output Directory:** `client/dist`
   - Click **"Deploy"**

3. **Verify:**
   - Visit your deployed URL
   - Test RSVP form submission
   - Check Supabase dashboard to see if data appears in `rsvp` table

---

## 🔐 Deploy Admin Dashboard

### Step 1: Prepare Environment Variables

1. Navigate to `/wedding-admin` folder
2. Copy `env.example.txt` to `.env.local`:
   ```bash
   cd wedding-admin
   cp env.example.txt .env.local
   ```

3. Edit `.env.local` and set your credentials:
   ```env
   # Supabase (already configured)
   NEXT_PUBLIC_SUPABASE_URL=https://javfiorjnisekjnrjtsg.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # Admin Credentials
   ADMIN_EMAIL_GROOM=jorge@example.com
   ADMIN_PASSWORD_GROOM=your-secure-password

   ADMIN_EMAIL_BRIDE=ana@example.com
   ADMIN_PASSWORD_BRIDE=your-secure-password
   ```

### Step 2: Test Locally

```bash
cd wedding-admin
pnpm install
pnpm dev
```

Visit `http://localhost:3001` and test login.

### Step 3: Deploy to Vercel

**Option A: Vercel CLI**

```bash
cd wedding-admin
vercel --prod
```

When prompted:
- **Set up and deploy:** Yes
- **Link to existing project:** No (create new)
- **Project name:** `wedding-admin` (or your choice)
- **Directory:** `./` (current directory)

**Option B: GitHub + Vercel Dashboard**

1. **Create separate GitHub repository:**
   ```bash
   cd wedding-admin
   git init
   git add .
   git commit -m "Initial commit - admin dashboard"
   git branch -M main
   git remote add origin https://github.com/yourusername/wedding-admin.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import `wedding-admin` repository
   - Configure:
     - **Framework Preset:** Next.js
     - **Root Directory:** `./`
   - **Add Environment Variables** (see Step 4 below)
   - Click **"Deploy"**

### Step 4: Configure Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://javfiorjnisekjnrjtsg.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |
| `ADMIN_EMAIL_GROOM` | `jorge@example.com` | Production |
| `ADMIN_PASSWORD_GROOM` | `your-secure-password` | Production |
| `ADMIN_EMAIL_BRIDE` | `ana@example.com` | Production |
| `ADMIN_PASSWORD_BRIDE` | `your-secure-password` | Production |

4. Click **"Save"**
5. Redeploy if necessary

### Step 5: Verify Deployment

1. Visit your admin dashboard URL: `https://your-wedding-admin.vercel.app`
2. Login with groom or bride credentials
3. Verify you can see RSVPs (if any exist)
4. Test CSV export
5. Test search and sort functionality

---

## 🔑 Environment Variables

### Wedding Website

**No environment variables needed!** Supabase credentials are hardcoded in `client/src/lib/supabase.ts`.

### Admin Dashboard

Required environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://javfiorjnisekjnrjtsg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphdmZpb3JqbmlzZWtqbnJqdHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzUyNTQsImV4cCI6MjA3ODIxMTI1NH0.aYjImaRVuactHjnMYLGBSSQeMeSCMNktWZROCv9qEyQ

# Admin Credentials (Change these!)
ADMIN_EMAIL_GROOM=groom@wedding.com
ADMIN_PASSWORD_GROOM=your-secure-password-here

ADMIN_EMAIL_BRIDE=bride@wedding.com
ADMIN_PASSWORD_BRIDE=your-secure-password-here
```

**⚠️ Security Note:** Change the default passwords before deploying!

---

## 📱 PWA Installation

### iPhone (iOS)

1. Open Safari and visit your admin dashboard URL
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Edit name if desired (e.g., "Wedding Admin")
5. Tap **"Add"**
6. App icon appears on home screen

### Android

1. Open Chrome and visit your admin dashboard URL
2. Tap the **Menu** (three dots)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Confirm installation
5. App icon appears on home screen

### Desktop (Chrome/Edge)

1. Visit admin dashboard URL
2. Look for **install icon** in address bar (⊕)
3. Click it and confirm installation
4. App opens in standalone window

---

## 🔧 Troubleshooting

### Problem: RSVP form submission fails

**Symptoms:** Error message when submitting RSVP form

**Solutions:**
1. Check Supabase dashboard → **Table Editor** → Verify `rsvp` table exists
2. Check **Authentication** → **Policies** → Verify RLS policies are active
3. Open browser console (F12) and check for errors
4. Verify Supabase URL and anon key are correct in `client/src/lib/supabase.ts`

### Problem: Can't login to admin dashboard

**Symptoms:** "Email ou palavra-passe incorretos"

**Solutions:**
1. Verify environment variables are set correctly on Vercel
2. Check that email/password match what you configured
3. Try default credentials: `groom@wedding.com` / `groom123` or `bride@wedding.com` / `bride123`
4. Check browser console for errors

### Problem: Admin dashboard shows no RSVPs

**Symptoms:** Dashboard loads but table is empty

**Solutions:**
1. Check Supabase → **Table Editor** → `rsvp` table → Verify data exists
2. Check RLS policy: **"Allow authenticated users to read RSVPs"** must exist
3. Open browser console and check for Supabase errors
4. Try submitting a test RSVP from the wedding website first

### Problem: PWA won't install

**Symptoms:** No "Add to Home Screen" option

**Solutions:**
1. Verify `manifest.json` is accessible: `https://your-admin-url.vercel.app/manifest.json`
2. Verify icons exist: `/icon-192.png` and `/icon-512.png`
3. Check that site is served over HTTPS (Vercel does this automatically)
4. Try in different browser (Safari for iOS, Chrome for Android)
5. Check browser console for manifest errors

### Problem: CSV export downloads empty file

**Symptoms:** CSV file has headers but no data

**Solutions:**
1. Verify RSVPs are visible in the dashboard table
2. Check browser console for JavaScript errors
3. Try refreshing the page and exporting again

### Problem: Vercel build fails

**Symptoms:** Deployment fails with build errors

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify all dependencies are installed: `pnpm install`
3. Test build locally: `pnpm build`
4. Check for TypeScript errors: `pnpm run lint`

---

## 📊 Testing Checklist

### Wedding Website
- [ ] Website loads correctly
- [ ] RSVP form appears
- [ ] Can fill out all fields
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Data appears in Supabase `rsvp` table

### Admin Dashboard
- [ ] Login page loads
- [ ] Can login with groom credentials
- [ ] Can login with bride credentials
- [ ] Dashboard shows correct statistics
- [ ] RSVP table displays all submissions
- [ ] Search functionality works
- [ ] Sort functionality works
- [ ] CSV export downloads correctly
- [ ] Can logout successfully

### PWA
- [ ] Can install on iPhone
- [ ] Can install on Android
- [ ] App opens in standalone mode
- [ ] App icon displays correctly
- [ ] Works offline (shows cached data)

---

## 🎉 Success!

You now have:
✅ Wedding website with Supabase RSVP form  
✅ Separate admin dashboard deployed to Vercel  
✅ PWA installable on phones and desktop  
✅ Complete RSVP management system  

**Your URLs:**
- Wedding Website: `https://your-wedding-site.vercel.app`
- Admin Dashboard: `https://your-wedding-admin.vercel.app`

---

## 📞 Support

If you encounter issues not covered in this guide:

1. Check Supabase logs: Dashboard → **Logs**
2. Check Vercel logs: Project → **Deployments** → Click deployment → **Logs**
3. Check browser console (F12) for JavaScript errors

---

**Last Updated:** November 2025  
**Version:** 1.0

---

## ✅ DONE ✅

Your complete Supabase RSVP system is ready for production!
