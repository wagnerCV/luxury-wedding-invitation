# 💍 Ultra-Luxury Wedding Invitation Website

A breathtaking, cinematic wedding invitation website that combines the elegance of **Vogue**, the luxury of **Tiffany & Co.**, and the sophistication of **Aesop**. Built with modern web technologies and designed to create an unforgettable first impression.

![Wedding Invitation Preview](client/public/hero-bg.jpg)

---

## ✨ Features

### 🎬 Cinematic Experience
- **Smooth scroll** with Lenis for butter-smooth kinetic scrolling
- **Parallax effects** on hero background for depth and dimension
- **Scroll-triggered animations** that reveal content elegantly
- **Micro-interactions** on every button and link
- **Glassmorphism** effects for modern, premium aesthetic

### 📱 Core Sections
1. **Hero Section** - Dramatic entrance with couple names and animated text
2. **Where & When** - Event details with live countdown timer
3. **Dress Code** - Visual color palette guide for guests
4. **Love Quote** - Romantic message with elegant typography
5. **Photo Gallery** - Masonry layout with hover effects
6. **Spotify Playlist** - Embedded music player
7. **RSVP Form** - Fully functional form with Formspree integration
8. **Footer** - Signature section with couple details

### 🎨 Design Excellence
- **Autumn luxury color palette**: Emerald, Burgundy, Burnt Orange, Amber, Sand
- **Premium typography**: Playfair Display (titles) + Inter (body)
- **Responsive design**: Perfect on mobile, tablet, and desktop
- **Accessibility**: Reduced motion support, semantic HTML
- **Performance**: Optimized images, lazy loading, code splitting

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Modern UI framework |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS 4** | Utility-first styling with OKLCH colors |
| **Framer Motion** | Smooth, declarative animations |
| **GSAP** | Advanced animation capabilities |
| **Lenis** | Smooth scroll library |
| **shadcn/ui** | Beautiful, accessible UI components |
| **Formspree** | Form submission handling |
| **TypeScript** | Type-safe development |

---

## 📂 Project Structure

```
luxury-wedding-invitation/
├── client/
│   ├── public/
│   │   ├── gallery/          # Wedding photos
│   │   ├── hero-bg.jpg       # Hero background image
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/     # Page sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── WhereWhenSection.tsx
│   │   │   │   ├── DressCodeSection.tsx
│   │   │   │   ├── LoveQuoteSection.tsx
│   │   │   │   ├── GallerySection.tsx
│   │   │   │   ├── SpotifySection.tsx
│   │   │   │   ├── RSVPSection.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   └── FloatingCTA.tsx
│   │   ├── contexts/
│   │   │   ├── ThemeContext.tsx
│   │   │   └── SmoothScrollContext.tsx
│   │   ├── lib/
│   │   │   ├── utils.ts      # Utility functions
│   │   │   └── wedding-config.ts  # Configuration
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.ts
│   └── vite.config.ts
├── DEPLOYMENT_GUIDE.md       # Deployment instructions
├── ANIMATION_DECISIONS.md    # Animation design rationale
├── TESTING_NOTES.md          # Testing documentation
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **pnpm** installed
- **Git** for version control

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd luxury-wedding-invitation
   ```

2. **Install dependencies**:
   ```bash
   cd client
   pnpm install
   ```

3. **Configure your wedding details**:
   Edit `client/src/lib/wedding-config.ts`:
   ```typescript
   export const WEDDING_CONFIG = {
     bride: "Your Bride Name",
     groom: "Your Groom Name",
     date: new Date("2025-09-20T18:00:00"),
     // ... update all fields
   };
   ```

4. **Set up Formspree** (for RSVP form):
   - Go to [formspree.io](https://formspree.io) and create a form
   - Copy the endpoint URL
   - Update `rsvp.formspreeEndpoint` in `wedding-config.ts`

5. **Add your Spotify playlist**:
   - Create a playlist in Spotify
   - Get the playlist ID from the share URL
   - Update `spotifyPlaylistId` in `wedding-config.ts`

6. **Add your photos**:
   - Place photos in `client/public/gallery/`
   - Update the `gallery` array in `wedding-config.ts`

7. **Start development server**:
   ```bash
   pnpm dev
   ```

8. **Open browser**:
   Visit `http://localhost:3000`

---

## 📦 Build & Deploy

### Build for Production

```bash
cd client
pnpm build
```

The optimized build will be in `client/dist/`.

### Deploy to Vercel (Recommended)

```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for detailed instructions on deploying to:
- ✅ Vercel
- ✅ Netlify
- ✅ GitHub Pages

---

## 🎨 Customization Guide

### Change Colors

Edit `client/src/index.css`:

```css
:root {
  --emerald: oklch(51.78% 0.1351 180.84);
  --burgundy: oklch(34.83% 0.1345 14.29);
  /* ... update colors */
}
```

### Change Fonts

1. Update Google Fonts link in `client/index.html`
2. Update font families in `client/src/index.css`:
   ```css
   .font-display {
     font-family: 'Your Display Font', serif;
   }
   ```

### Modify Animations

See **[ANIMATION_DECISIONS.md](ANIMATION_DECISIONS.md)** for detailed animation documentation and customization options.

---

## 🧪 Testing

### Run Development Server
```bash
pnpm dev
```

### Build and Preview Production
```bash
pnpm build
pnpm preview
```

### Test Checklist
- [ ] All sections display correctly
- [ ] Countdown timer works
- [ ] RSVP form submits successfully
- [ ] Spotify playlist loads
- [ ] Gallery images load and hover effects work
- [ ] Smooth scroll functions properly
- [ ] Responsive on mobile, tablet, desktop
- [ ] All links work (calendar, map, etc.)

---

## 📱 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

**Note**: Modern browsers with ES2020 support required.

---

## ♿ Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Reduced motion support for users with motion sensitivity
- ✅ High contrast text for readability
- ✅ Focus indicators on all interactive elements

---

## 📄 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[ANIMATION_DECISIONS.md](ANIMATION_DECISIONS.md)** - Animation design philosophy and technical details
- **[TESTING_NOTES.md](TESTING_NOTES.md)** - Testing results and observations

---

## 🎯 Performance

- ⚡ **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- 🖼️ **Lazy loading** for images
- 📦 **Code splitting** for optimal bundle size
- 🎨 **GPU-accelerated** animations
- 🚀 **CDN delivery** via Vercel/Netlify

---

## 🤝 Contributing

This is a personal wedding invitation website. If you'd like to use it as a template:

1. Fork the repository
2. Update all personal information in `wedding-config.ts`
3. Replace images with your own
4. Customize colors and fonts to match your theme
5. Deploy to your own hosting

---

## 📝 License

© 2025 Sofia & Miguel. All rights reserved.

This website design and code are provided as-is for personal use. Feel free to use as a template for your own wedding, but please update all personal information and images.

---

## 🙏 Acknowledgments

**Design Inspiration**:
- Vogue Magazine - Editorial elegance
- Tiffany & Co. - Luxury branding
- Aesop - Minimalist sophistication
- Awwwards - Modern web design trends

**Libraries & Tools**:
- React Team - Incredible framework
- Vercel - Amazing deployment platform
- Tailwind Labs - Beautiful utility-first CSS
- Framer - Smooth animation library
- All open-source contributors

---

## 📧 Contact

For questions or customization requests, please reach out via the RSVP form on the website.

---

**Made with ❤️ for an unforgettable celebration**

---

## 🎉 Preview

Visit the live website: [Your Deployment URL]

---

## 🔗 Quick Links

- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Animation Documentation](ANIMATION_DECISIONS.md)
- [Testing Notes](TESTING_NOTES.md)
- [Formspree](https://formspree.io)
- [Vercel](https://vercel.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
