# 🎉 Wedding Admin Dashboard

Admin dashboard for managing wedding RSVP confirmations. Built with Next.js 14, Supabase, and PWA support.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example.txt .env.local
   ```
   
   Edit `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://javfiorjnisekjnrjtsg.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   
   ADMIN_EMAIL_GROOM=groom@wedding.com
   ADMIN_PASSWORD_GROOM=your-password
   
   ADMIN_EMAIL_BRIDE=bride@wedding.com
   ADMIN_PASSWORD_BRIDE=your-password
   ```

3. **Run development server:**
   ```bash
   pnpm dev
   ```
   
   Open [http://localhost:3001](http://localhost:3001)

### Build for Production

```bash
pnpm build
pnpm start
```

## 📦 Features

- ✅ Email/password authentication (2 users only)
- ✅ Real-time RSVP statistics
- ✅ Complete guest list with search and sort
- ✅ CSV export functionality
- ✅ PWA installable on iOS/Android/Desktop
- ✅ Responsive design (mobile-first)
- ✅ Offline support with service worker

## 🔐 Default Credentials

**Groom:**
- Email: `groom@wedding.com`
- Password: `groom123`

**Bride:**
- Email: `bride@wedding.com`
- Password: `bride123`

**⚠️ Change these before deploying to production!**

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Set environment variables** in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

### Alternative: GitHub + Vercel

1. Push to GitHub
2. Import repository in Vercel dashboard
3. Configure environment variables
4. Deploy

## 📱 PWA Installation

### iPhone
1. Open in Safari
2. Tap Share → "Add to Home Screen"

### Android
1. Open in Chrome
2. Tap Menu → "Add to Home screen"

### Desktop
1. Look for install icon in address bar
2. Click to install

## 📊 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Date Formatting:** date-fns
- **PWA:** Service Worker + Manifest

## 📁 Project Structure

```
wedding-admin/
├── app/
│   ├── page.tsx              # Login page
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── auth.ts               # Authentication logic
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker
│   ├── register-sw.js        # SW registration
│   ├── icon-192.png          # App icon (192x192)
│   └── icon-512.png          # App icon (512x512)
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🔧 Configuration

### Change Admin Credentials

Edit `.env.local` or set environment variables:

```env
ADMIN_EMAIL_GROOM=your-email@example.com
ADMIN_PASSWORD_GROOM=your-secure-password

ADMIN_EMAIL_BRIDE=your-email@example.com
ADMIN_PASSWORD_BRIDE=your-secure-password
```

### Customize Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  emerald: '#0F766E',    // Primary color
  burgundy: '#7C1D2F',   // Secondary color
  sand: '#D6BFA8',       // Accent color
  offwhite: '#FAF7F5',   // Background color
},
```

## 📖 Usage

### Login
- Use groom or bride credentials
- Session stored in localStorage

### Dashboard
- View total RSVPs, guests, and average
- Search by name or email
- Sort by date, name, or guest count
- Export to CSV

### Logout
- Click logout button in header
- Clears session and redirects to login

## 🐛 Troubleshooting

### Can't login
- Verify environment variables are set
- Check credentials match configuration
- Clear browser cache and try again

### No RSVPs showing
- Check Supabase table has data
- Verify RLS policies are configured
- Check browser console for errors

### PWA won't install
- Verify manifest.json is accessible
- Check icons exist in /public
- Ensure site is served over HTTPS

## 📄 License

Private project for wedding use only.

## 👰🤵 Credits

Built with love for Jorge & Ana's wedding 💍

---

**For complete deployment instructions, see:** `../SUPABASE_DEPLOYMENT_GUIDE.md`
