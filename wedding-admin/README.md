# Wedding Admin Dashboard

A modern, elegant admin dashboard for managing wedding RSVPs with luxury minimalism design, dark mode support, and real-time Supabase integration.

## Features

### Authentication
- **Hardcoded Admin Access**: Secure login for 2 admin users
- **Route Protection**: Dashboard accessible only to authenticated admins
- **Persistent Sessions**: Login state maintained via localStorage

### Dashboard Analytics
- **Total RSVPs**: Count of all RSVP submissions
- **Total Guests**: Sum of all confirmed guests
- **Average Guests per RSVP**: Calculated metric for planning

### RSVP Management
- **Real-time Data**: Live connection to Supabase database
- **Search Functionality**: Filter by name or email
- **Sortable Columns**: Sort by name, date, or guest count
- **CSV Export**: Download filtered RSVP data
- **Responsive Table**: Mobile-friendly data display

### Design & UX
- **Luxury Minimalism**: Elegant off-white backgrounds with emerald and gold accents
- **Dark Mode**: Smooth theme switching with system preference support
- **Framer Motion**: Subtle animations and transitions
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Custom Typography**: Playfair Display for headings, Inter for body text

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4 + Shadcn/UI
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Routing**: Wouter
- **TypeScript**: Full type safety

## Environment Variables

The following environment variables are required (configured via the Manus platform):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_ADMIN_EMAIL_1=admin1@wedding.com
VITE_ADMIN_PASSWORD_1=your-secure-password-1
VITE_ADMIN_EMAIL_2=admin2@wedding.com
VITE_ADMIN_PASSWORD_2=your-secure-password-2
```

## Database Schema

The dashboard expects a `rsvp` table in your Supabase database with the following structure:

```sql
CREATE TABLE rsvp (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guests_count INTEGER NOT NULL DEFAULT 1,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Local Development

1. Install dependencies:
```bash
pnpm install
```

2. Configure environment variables in the Manus platform settings

3. Start the development server:
```bash
pnpm dev
```

4. Open http://localhost:3000 in your browser

## Deployment to Vercel

### Prerequisites
- Vercel account
- Supabase project with `rsvp` table

### Steps

1. **Push to GitHub**
   - Create a new GitHub repository
   - Push your code to the repository

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In Vercel project settings, add all environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_ADMIN_EMAIL_1`
     - `VITE_ADMIN_PASSWORD_1`
     - `VITE_ADMIN_EMAIL_2`
     - `VITE_ADMIN_PASSWORD_2`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

5. **Access Your Dashboard**
   - Visit your deployed URL (e.g., `your-project.vercel.app`)
   - Login with your admin credentials

## Project Structure

```
client/
  src/
    components/     # Reusable UI components (Shadcn/UI)
    contexts/       # React contexts (Theme)
    lib/            # Utilities (Supabase, Auth)
    pages/          # Page components (Login, Dashboard)
    App.tsx         # Route configuration
    index.css       # Global styles and theme variables
```

## Usage

### Login
1. Navigate to the root URL
2. Enter admin email and password
3. Click "Sign In"

### Dashboard
- **View Analytics**: See total RSVPs, guests, and averages at the top
- **Search RSVPs**: Use the search bar to filter by name or email
- **Sort Data**: Click column headers to sort by name, date, or guest count
- **Export Data**: Click "Export CSV" to download filtered RSVP data
- **Toggle Theme**: Click the moon/sun icon to switch between light and dark mode
- **Logout**: Click "Logout" to end your session

## Security Notes

- Admin credentials are hardcoded in environment variables (suitable for small-scale use)
- For production use with more admins, consider implementing a proper authentication system
- Supabase Row Level Security (RLS) should be configured for additional data protection
- Use HTTPS in production (Vercel provides this automatically)

## Customization

### Change Colors
Edit the CSS variables in `client/src/index.css`:
- Primary color (emerald): `--primary`
- Secondary color (gold): `--secondary`
- Background: `--background`

### Change Fonts
Update the Google Fonts import in `client/src/index.css` and modify the font-family declarations.

### Add More Admin Users
Add additional admin credentials to the environment variables and update `client/src/lib/auth.ts`.

## Support

For issues or questions, please refer to the Manus documentation or contact support.

## License

This project is created for personal use. Modify as needed for your wedding.
