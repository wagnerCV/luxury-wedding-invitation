# 🚀 Deployment Instructions - Two Separate Projects

This system consists of **two independent projects** that deploy separately to Vercel, both connected to the same Supabase database.

---

## 📦 Project Structure

```
luxury-wedding-invitation/
├── client/                    # Public Wedding Website
│   ├── src/                  # React source code
│   ├── public/               # Static assets
│   ├── vercel.json           # Vercel config for website
│   └── package.json
│
└── wedding-admin/            # Private Admin Dashboard
    ├── app/                  # Next.js app router
    ├── lib/                  # Utilities & Supabase client
    ├── public/               # PWA assets
    ├── vercel.json           # Vercel config for admin
    └── package.json
```

---

## 🗄️ Shared Supabase Database

Both projects connect to the same Supabase instance:

**URL:** `https://javfiorjnisekjnrjtsg.supabase.co`  
**Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Table:** `rsvp`

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `name` | text | Guest name |
| `email` | text | Guest email |
| `phone` | text | Guest phone (optional) |
| `guests_count` | integer | Number of guests |
| `message` | text | Optional message |
| `created_at` | timestamp | Auto-generated |

---

## 🌐 Project 1: Public Wedding Website

### What It Does
- Displays beautiful wedding invitation
- RSVP form submits directly to Supabase
- No authentication required
- Static site (Vite + React)

### Deploy to Vercel

#### Option A: From Root Directory

```bash
# Navigate to client folder
cd client

# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

When prompted:
- **Set up and deploy:** Yes
- **Link to existing project:** No
- **Project name:** `wedding-invitation` (or your choice)
- **Directory:** `./` (current directory)

#### Option B: Via GitHub

1. **Create repository for website only:**
   ```bash
   cd client
   git init
   git add .
   git commit -m "Wedding website"
   git branch -M main
   git remote add origin https://github.com/yourusername/wedding-site.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Framework: **Vite**
   - Root Directory: **`./`**
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Click **Deploy**

### Environment Variables
**None required!** Supabase credentials are hardcoded in `src/lib/supabase.ts`.

### Verify Deployment
1. Visit your deployed URL
2. Fill out RSVP form
3. Submit
4. Check Supabase dashboard → Table Editor → `rsvp` table
5. Verify your test submission appears

---

## 🔐 Project 2: Private Admin Dashboard

### What It Does
- Email/password authentication (2 users max)
- View all RSVPs with statistics
- Search and sort functionality
- Export to CSV
- PWA installable on phones/desktop
- Next.js 14 app

### Deploy to Vercel

#### Option A: From Root Directory

```bash
# Navigate to admin folder
cd wedding-admin

# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

When prompted:
- **Set up and deploy:** Yes
- **Link to existing project:** No
- **Project name:** `wedding-admin` (or your choice)
- **Directory:** `./` (current directory)

#### Option B: Via GitHub

1. **Create repository for admin only:**
   ```bash
   cd wedding-admin
   git init
   git add .
   git commit -m "Wedding admin dashboard"
   git branch -M main
   git remote add origin https://github.com/yourusername/wedding-admin.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Framework: **Next.js**
   - Root Directory: **`./`**
   - Click **Deploy**

### Environment Variables

**Required:** Set these in Vercel dashboard after deployment.

1. Go to your Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Add the following:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://javfiorjnisekjnrjtsg.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphdmZpb3JqbmlzZWtqbnJqdHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzUyNTQsImV4cCI6MjA3ODIxMTI1NH0.aYjImaRVuactHjnMYLGBSSQeMeSCMNktWZROCv9qEyQ` | Production, Preview, Development |
| `ADMIN_EMAIL_1` | `jorge@example.com` | Production |
| `ADMIN_PASSWORD_1` | `your-secure-password` | Production |
| `ADMIN_EMAIL_2` | `ana@example.com` | Production |
| `ADMIN_PASSWORD_2` | `your-secure-password` | Production |

4. Click **Save**
5. Go to **Deployments** tab
6. Click **•••** on latest deployment → **Redeploy**

### Verify Deployment
1. Visit your admin dashboard URL
2. Login with credentials you set
3. Verify RSVPs appear (if any exist)
4. Test search functionality
5. Test CSV export

---

## 📱 Install Admin Dashboard as PWA

### iPhone (iOS)
1. Open Safari and visit admin dashboard URL
2. Tap **Share** button
3. Tap **"Add to Home Screen"**
4. Tap **"Add"**
5. App icon appears on home screen

### Android
1. Open Chrome and visit admin dashboard URL
2. Tap **Menu** (three dots)
3. Tap **"Add to Home screen"**
4. Confirm installation

### Desktop (Chrome/Edge)
1. Visit admin dashboard URL
2. Look for **install icon** in address bar (⊕)
3. Click and confirm installation

---

## 🔧 Local Development

### Wedding Website

```bash
cd client
pnpm install
pnpm dev
```

Visit: `http://localhost:5173`

### Admin Dashboard

```bash
cd wedding-admin

# Create .env.local
cp env.example.txt .env.local

# Edit .env.local with your credentials
nano .env.local

# Install and run
pnpm install
pnpm dev
```

Visit: `http://localhost:3001`

---

## ✅ Deployment Checklist

### Before Deploying

- [ ] Run SQL migration in Supabase dashboard (see `supabase-migration.sql`)
- [ ] Verify `rsvp` table exists in Supabase
- [ ] Test RSVP form submission locally
- [ ] Test admin dashboard login locally
- [ ] Choose admin credentials (change from defaults!)

### Wedding Website Deployment

- [ ] Deploy to Vercel (no env variables needed)
- [ ] Test RSVP form on production URL
- [ ] Verify data appears in Supabase table

### Admin Dashboard Deployment

- [ ] Deploy to Vercel
- [ ] Set all 6 environment variables in Vercel dashboard
- [ ] Redeploy after setting env variables
- [ ] Test login with both admin accounts
- [ ] Verify RSVPs display correctly
- [ ] Test CSV export
- [ ] Install as PWA on phone

---

## 🎯 Final URLs

After deployment, you'll have:

- **Wedding Website:** `https://your-wedding-site.vercel.app`
- **Admin Dashboard:** `https://your-admin-dashboard.vercel.app`

Both connect to the same Supabase database.

---

## 🐛 Troubleshooting

### Wedding Website: RSVP form fails

**Check:**
1. Supabase `rsvp` table exists
2. RLS policy "Allow public RSVP submissions" is active
3. Browser console for errors (F12)

**Fix:**
- Run `supabase-migration.sql` in Supabase SQL Editor

### Admin Dashboard: Can't login

**Check:**
1. Environment variables are set in Vercel
2. Credentials match what you configured
3. Redeployed after setting env variables

**Fix:**
- Verify env variables in Vercel Settings
- Try default: `admin1@wedding.com` / `admin123`

### Admin Dashboard: No RSVPs showing

**Check:**
1. Data exists in Supabase `rsvp` table
2. RLS policy "Allow authenticated users to read RSVPs" exists
3. Browser console for errors

**Fix:**
- Submit test RSVP from wedding website first
- Check Supabase RLS policies

### Vercel Build Fails

**Check:**
1. Correct `vercel.json` in project root
2. Dependencies install correctly
3. Build command succeeds locally

**Fix:**
```bash
# Test build locally first
cd client  # or wedding-admin
pnpm install
pnpm build
```

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Wedding Website (Vite + React)                        │
│  https://your-wedding-site.vercel.app                  │
│                                                         │
│  - Public access                                        │
│  - RSVP form                                           │
│  - No authentication                                    │
│                                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ INSERT rsvp
                     ▼
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Supabase PostgreSQL Database                          │
│  https://javfiorjnisekjnrjtsg.supabase.co             │
│                                                         │
│  Table: rsvp                                           │
│  - id, name, email, phone, guests_count, message       │
│                                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ SELECT rsvp
                     ▼
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Admin Dashboard (Next.js 14)                          │
│  https://your-admin-dashboard.vercel.app               │
│                                                         │
│  - Email/password auth (2 users)                       │
│  - View RSVPs                                          │
│  - Search, sort, export CSV                            │
│  - PWA installable                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ DONE!

You now have two separate, independently deployable projects:

1. ✅ **Public wedding website** with Supabase RSVP form
2. ✅ **Private admin dashboard** with authentication and PWA support
3. ✅ Both connected to the same Supabase database
4. ✅ Each project has its own `vercel.json` for deployment
5. ✅ Complete documentation and environment variable setup

**Ready to deploy!** 🚀

---

**Last Updated:** November 2025  
**Version:** 2.0 - Separate Deployments
