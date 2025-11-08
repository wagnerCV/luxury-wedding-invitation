# 📋 RSVP System Documentation

Complete guide for managing wedding guest confirmations with the built-in RSVP backend system.

---

## 🎯 System Overview

Your wedding website now includes a complete RSVP management system with:

- **Database Storage**: All RSVPs are stored securely in a MySQL database
- **Public RSVP Form**: Guests can confirm attendance directly on your website
- **Admin Dashboard**: Secure admin panel to view and manage all confirmations
- **PWA Support**: Admin dashboard can be installed as an app on iOS/Android
- **Export Functionality**: Download all RSVPs as CSV for easy sharing

---

## 🔐 Admin Access

### Accessing the Admin Dashboard

1. **Navigate to**: `https://your-website.vercel.app/admin`
2. **Login**: Click "Iniciar Sessão" to login with Manus OAuth
3. **Admin Role Required**: Only users with admin role can access RSVPs

### Setting Up Admin Access

The project owner (you) is automatically assigned admin role. To grant admin access to others:

1. Open the **Database** panel in the Management UI
2. Find the `users` table
3. Locate the user you want to promote
4. Change their `role` from `user` to `admin`
5. Save changes

---

## 📊 Admin Dashboard Features

### Statistics Overview

The dashboard displays three key metrics:
- **Total RSVPs**: Number of confirmations received
- **Total Guests**: Sum of all guests across all RSVPs
- **Average per RSVP**: Average number of guests per confirmation

### RSVP Table

View all confirmations with:
- Guest name
- Email address
- Phone number (if provided)
- Number of guests
- Personal message
- Confirmation date/time

### Search & Filter

- **Search**: Find RSVPs by name or email
- **Sort by**:
  - Date (newest first) - default
  - Name (alphabetical)
  - Number of Guests (highest first)

### Export to CSV

Click "Exportar CSV" to download all RSVPs as a spreadsheet containing:
- Nome (Name)
- Email
- Telefone (Phone)
- Nº Convidados (Number of Guests)
- Mensagem (Message)
- Data (Date)

Perfect for sharing with your venue, caterer, or wedding planner!

---

## 📱 PWA Installation Guide

The admin dashboard can be installed as a standalone app on your phone or tablet for quick access.

### iOS (iPhone/iPad)

1. Open Safari and navigate to `/admin`
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it "Wedding Admin" or your preference
5. Tap **"Add"**
6. The app icon will appear on your home screen

### Android

1. Open Chrome and navigate to `/admin`
2. Tap the **menu** (three dots)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Confirm the installation
5. The app icon will appear on your home screen

### Desktop (Chrome/Edge)

1. Navigate to `/admin`
2. Look for the **install icon** in the address bar (⊕ or computer icon)
3. Click it and confirm installation
4. The app will open in its own window

---

## 🔧 Database Configuration

### Database Connection

Your project uses the Manus-provided MySQL database. The connection is automatically configured via environment variables:

- `DATABASE_URL`: MySQL connection string (auto-injected)

**No manual configuration needed!** The database is ready to use.

### Database Schema

The `rsvps` table structure:

```sql
CREATE TABLE rsvps (
  id VARCHAR(36) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guestsCount INT NOT NULL,
  message TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Viewing Database Records

1. Open the **Management UI**
2. Click **"Database"** in the sidebar
3. Select the `rsvps` table
4. View, edit, or delete records directly

---

## 🎨 Customization

### Changing RSVP Form Fields

Edit `client/src/components/sections/RSVPSection.tsx`:

```tsx
// Add new field example:
<div className="space-y-2">
  <Label htmlFor="dietary">Dietary Restrictions</Label>
  <Input
    id="dietary"
    name="dietary"
    placeholder="Any dietary requirements?"
  />
</div>
```

Then update:
1. Database schema in `drizzle/schema.ts`
2. API validation in `server/routers.ts`
3. Run `pnpm db:push` to apply changes

### Customizing Admin Dashboard

Edit `client/src/pages/Admin.tsx` to:
- Change colors/styling
- Add new statistics
- Modify table columns
- Add custom filters

---

## 🚀 API Endpoints

### Public Endpoint

**POST** `/api/trpc/rsvp.create`

Submit a new RSVP (no authentication required):

```typescript
{
  name: string;          // Required
  email: string;         // Required (valid email)
  phone?: string;        // Optional
  guestsCount: number;   // Required (min: 1)
  message?: string;      // Optional
}
```

### Admin Endpoints

**GET** `/api/trpc/rsvp.list`

Get all RSVPs (requires admin authentication)

**GET** `/api/trpc/rsvp.totalGuests`

Get total guest count (requires admin authentication)

---

## 🔒 Security

### Authentication

- Admin dashboard requires Manus OAuth login
- Only users with `role: "admin"` can access RSVPs
- Public RSVP form has no authentication (guests can submit freely)

### Data Protection

- All data stored in secure MySQL database
- HTTPS encryption for all API requests
- Session cookies for authentication
- No sensitive data exposed to public

---

## 📝 Common Tasks

### How to check total confirmed guests?

1. Login to `/admin`
2. View the "Total de Convidados" card at the top

### How to contact all guests?

1. Export RSVPs to CSV
2. Open in Excel/Google Sheets
3. Use email column for bulk communication

### How to delete a duplicate RSVP?

1. Open **Database** panel in Management UI
2. Find the `rsvps` table
3. Locate the duplicate record
4. Click delete icon

### How to backup all RSVPs?

1. Login to `/admin`
2. Click "Exportar CSV"
3. Save the file to your computer
4. Store in a safe location (Google Drive, Dropbox, etc.)

---

## 🐛 Troubleshooting

### "Acesso negado" error in admin dashboard

**Solution**: Your user account doesn't have admin role.
1. Open Database panel
2. Find your user in `users` table
3. Change `role` to `admin`

### RSVP form not submitting

**Check**:
1. All required fields filled (Name, Email, Guests)
2. Email is valid format
3. Number of guests is at least 1
4. Check browser console for errors

### Admin dashboard not loading

**Check**:
1. You're logged in (click "Iniciar Sessão")
2. Your account has admin role
3. Database is accessible (check Management UI)

### PWA not installing

**iOS**: Must use Safari browser
**Android**: Must use Chrome browser
**Desktop**: Must use Chrome or Edge

---

## 📞 Support

For technical issues or questions:
- Check the [Main README](./README.md)
- Review [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- Submit feedback at https://help.manus.im

---

## ✅ Quick Reference

| Task | Location |
|------|----------|
| View RSVPs | `/admin` |
| Export data | `/admin` → "Exportar CSV" button |
| Edit database | Management UI → Database panel |
| Grant admin access | Database → `users` table → change `role` |
| Install PWA | `/admin` → Browser menu → "Add to Home Screen" |
| Backup RSVPs | Export CSV and save file |

---

**Last Updated**: November 2025
**System Version**: 1.0
