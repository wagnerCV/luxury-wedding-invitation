# 🔐 Admin Access Setup Guide

Complete guide for setting up and managing admin access to the RSVP dashboard.

---

## 📍 Step 1: Access the Admin Dashboard

**URL**: `https://your-wedding-site.vercel.app/admin`

When you first visit `/admin`, you'll see a login screen.

---

## 🔑 Step 2: Login for the First Time

### For You (Project Owner)

1. Click **"Iniciar Sessão"** (Login)
2. You'll be redirected to Manus OAuth login
3. Login with your Manus account
4. **You're automatically assigned admin role** ✅
5. You'll see the full admin dashboard immediately

### For Your Wife

1. She visits `/admin`
2. Clicks **"Iniciar Sessão"**
3. Logs in with her Manus account (or creates one if needed)
4. She'll see "Acesso Negado" (Access Denied) - **this is normal!**
5. Her user account is now created in the database
6. Now you need to grant her admin access (see Step 3)

---

## 👥 Step 3: Grant Admin Access to Your Wife

After your wife logs in once, follow these steps to make her an admin:

### Method 1: Using Management UI (Easiest)

1. **Open Management UI**
   - Look for the panel icon in the top-right of your Manus interface
   - Or access it from the project dashboard

2. **Navigate to Database Panel**
   - Click **"Database"** in the left sidebar
   - You'll see a list of all your database tables

3. **Open the `users` Table**
   - Find and click on the `users` table
   - You'll see a list of all users who have logged in

4. **Find Your Wife's User Record**
   - Look for her email address in the table
   - You should see a row with her information

5. **Edit the Role**
   - Click the **edit icon** (pencil) on her row
   - Find the `role` field
   - Change it from `user` to `admin`
   - Click **Save**

6. **Done!**
   - She can now refresh `/admin`
   - She'll have full access to the dashboard

### Method 2: Using SQL Query (Advanced)

If you prefer using SQL directly:

1. Open **Management UI** → **Database** panel
2. Click the **SQL Query** tab
3. Run this query (replace with her email):

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'her-email@example.com';
```

4. Execute the query
5. Done!

---

## 📊 Step 4: Viewing the Users Table

### Where to Find It

**Management UI → Database Panel → `users` Table**

### What You'll See

The `users` table contains:

| Column | Description | Example |
|--------|-------------|---------|
| `id` | Unique user ID | `cm7x8y9z0...` |
| `email` | User's email address | `jorge@example.com` |
| `name` | User's display name | `Jorge Borges` |
| `role` | Access level | `admin` or `user` |
| `openId` | OAuth identifier | `oauth:123...` |
| `createdAt` | Account creation date | `2025-11-09 15:30:00` |

### Understanding Roles

- **`admin`**: Full access to `/admin` dashboard, can view all RSVPs, export data
- **`user`**: No special access, cannot view admin dashboard

---

## 🛠️ Step 5: Manually Setting Your Own Role to Admin

If for some reason you need to manually set your role to admin:

### Using Management UI

1. Open **Management UI** → **Database**
2. Click on `users` table
3. Find your user record (by your email)
4. Click edit (pencil icon)
5. Change `role` field to `admin`
6. Save

### Using SQL Query

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

---

## ✅ Verification Checklist

After granting admin access, verify it works:

- [ ] Your wife can visit `/admin`
- [ ] She can login successfully
- [ ] She sees the dashboard (not "Acesso Negado")
- [ ] She can view the RSVP statistics
- [ ] She can see the RSVP table
- [ ] She can search and filter RSVPs
- [ ] She can export to CSV

---

## 🔄 Common Scenarios

### Scenario 1: Wife Sees "Acesso Negado"

**Cause**: Her role is still `user`, not `admin`

**Solution**:
1. Check the `users` table in Management UI
2. Verify her `role` field says `admin` (not `user`)
3. If it says `user`, change it to `admin` and save
4. She should refresh the `/admin` page

### Scenario 2: Wife's Account Not in Database

**Cause**: She hasn't logged in yet

**Solution**:
1. She needs to visit `/admin` first
2. Click "Iniciar Sessão" and complete login
3. This creates her user record
4. Then you can grant admin access

### Scenario 3: Can't Find Users Table

**Cause**: Looking in wrong place

**Solution**:
1. Make sure you're in the **Management UI** (not the website)
2. Click **"Database"** in the left sidebar
3. Scroll through the table list
4. Look for `users` (not `rsvps`)

### Scenario 4: Multiple People Need Access

**Solution**:
- Repeat Step 3 for each person
- Each person must login once first
- Then you grant them admin role
- No limit on number of admins

---

## 📱 After Setup: Installing the PWA

Once both of you have admin access, install the dashboard as a mobile app:

1. Both visit `/admin` on your phones
2. **iPhone**: Safari → Share → "Add to Home Screen"
3. **Android**: Chrome → Menu → "Add to Home screen"
4. App icon appears on home screen
5. Tap to quickly check RSVPs anytime!

See [PWA_INSTALLATION_GUIDE.md](./PWA_INSTALLATION_GUIDE.md) for detailed instructions.

---

## 🔒 Security Best Practices

### Recommended Setup

- **Only 2 admins**: You and your wife
- **Don't share login credentials**: Each person uses their own account
- **Logout on shared devices**: Always logout if using someone else's device
- **Regular access review**: Periodically check who has admin access

### Revoking Access

To remove someone's admin access:

1. Open **Management UI** → **Database** → `users`
2. Find their user record
3. Change `role` from `admin` to `user`
4. Save
5. They'll lose access immediately

### Deleting a User

To completely remove a user account:

1. Open **Management UI** → **Database** → `users`
2. Find their user record
3. Click the **delete icon** (trash can)
4. Confirm deletion
5. They'll need to login again to recreate account

---

## 📞 Troubleshooting

### Problem: "Acesso Negado" after setting role to admin

**Solution**:
- Clear browser cache and cookies
- Logout and login again
- Verify role is actually `admin` in database (check for typos)

### Problem: Can't access Management UI

**Solution**:
- Make sure you're the project owner
- Check you're logged into Manus
- Try accessing from the project dashboard

### Problem: Changes to database not saving

**Solution**:
- Make sure you clicked "Save" after editing
- Check for error messages
- Try refreshing the page and editing again

### Problem: Users table is empty

**Solution**:
- No one has logged in yet
- First person needs to visit `/admin` and login
- This creates the first user record

---

## 🎯 Quick Reference

| Task | Steps |
|------|-------|
| **Grant admin access** | Management UI → Database → `users` → Edit user → Change `role` to `admin` |
| **View all users** | Management UI → Database → `users` table |
| **Check your role** | Management UI → Database → `users` → Find your email → Check `role` column |
| **Revoke access** | Management UI → Database → `users` → Edit user → Change `role` to `user` |
| **Delete user** | Management UI → Database → `users` → Delete icon |

---

## 📚 Related Documentation

- [RSVP_SYSTEM_DOCUMENTATION.md](./RSVP_SYSTEM_DOCUMENTATION.md) - Complete RSVP system guide
- [PWA_INSTALLATION_GUIDE.md](./PWA_INSTALLATION_GUIDE.md) - Install admin dashboard as mobile app
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy to production

---

**Last Updated**: November 2025  
**Version**: 1.0

---

## ✅ Summary

1. **You (project owner)** are automatically admin
2. **Your wife** needs to login once, then you grant her admin role
3. **Grant access** via Management UI → Database → `users` table → Change `role` to `admin`
4. **Both of you** can then access `/admin` and manage RSVPs
5. **Install as PWA** on phones for quick access

**That's it!** Simple, secure, and works perfectly for managing your wedding RSVPs together.
