# Luxury Wedding Invitation Website - TODO

## Design System & Setup
- [x] Install required dependencies (GSAP, Framer Motion, Lenis Scroll)
- [x] Configure Tailwind with luxury color palette (Emerald, Burgundy, Burnt Orange, Amber, Sand, Off-white, Ink Black)
- [x] Add Google Fonts (Playfair Display for titles, Inter for body)
- [x] Set up global CSS with cinematic gradients and glassmorphism utilities
- [x] Configure theme to light mode with luxury aesthetic

## Core Sections
- [x] Hero section with couple names and cinematic text entrance animation
- [x] Where & When section with event details
- [x] Dress Code section with color palette swatches
- [x] Love Message Quote section with elegant typography
- [x] Photo Gallery with masonry/staggered layout and scroll animations
- [x] Spotify Playlist embed section
- [x] RSVP Form with Formspree integration
- [x] Footer signature section

## Motion Design & Interactions
- [x] Implement smooth scroll with Lenis
- [x] Add parallax background image effects
- [x] Create cinematic text entrance animations (GSAP/Framer Motion)
- [x] Add micro-interactions on hover for buttons and links
- [x] Implement scroll-triggered fade-in animations for gallery
- [x] Add smooth transitions between sections
- [x] Create animated countdown to event date

## Features & Functionality
- [x] Add to Google Calendar link generation
- [x] RSVP form submission to Formspree
- [x] Fixed floating bottom CTA bar for mobile "Confirm Presence"
- [x] Responsive design for all screen sizes
- [x] Ambient gradient overlays and glassmorphism effects

## Visual Assets
- [x] Source luxury wedding background images
- [x] Gather couple photos for gallery
- [x] Create/source decorative elements

## Testing & Deployment
- [x] Test all animations and interactions
- [x] Verify form submission works
- [x] Test responsive design on mobile/tablet
- [x] Verify smooth scroll performance
- [x] Create deployment documentation for Vercel
- [x] Save checkpoint for deployment

## User Requested Changes
- [x] Swap names order to Jorge Borges & Ana Oliveira
- [x] Update wedding date to 05 de setembro de 2026
- [x] Update location to Igreja de São Francisco Xavier da Caparica, Rua das Quintas 7 11, 2825-171, Caparica
- [x] Update ceremony time to 10h
- [x] Replace love quote with biblical text about love
- [x] Remove dietary restrictions field from RSVP form

## RSVP Backend + Admin Dashboard (PWA)
- [x] Upgrade project to add server and database features
- [x] Create Supabase database schema for RSVP table
- [x] Build POST /api/rsvp endpoint to save RSVP data
- [x] Build GET /api/rsvp endpoint with admin authentication
- [x] Update RSVP form to POST to new API endpoint
- [x] Create /admin page with password authentication
- [x] Build admin dashboard with RSVP data table
- [x] Add filtering and sorting functionality
- [x] Add "Export to CSV" feature
- [x] Create manifest.json for PWA
- [x] Create service worker for offline support
- [x] Add app icons for iOS and Android
- [x] Test "Add to Home Screen" functionality
- [x] Create Supabase configuration documentation
- [x] Create admin password change documentation
- [x] Create PWA installation guide for iOS and Android

## Production Admin Dashboard Fix
- [x] Verify Vercel build configuration for correct dist folder
- [x] Ensure /admin route is accessible in production
- [x] Create documentation for viewing users table in database
- [x] Create documentation for setting admin role manually
- [x] Create documentation for granting admin access to wife

## Supabase Migration & Separate Admin Dashboard
- [x] Install Supabase client in wedding website
- [x] Remove tRPC/MySQL RSVP endpoints
- [x] Create Supabase rsvp table schema
- [x] Update RSVP form to submit directly to Supabase
- [x] Test RSVP submission to Supabase
- [x] Create /wedding-admin Next.js 14 project
- [x] Set up Supabase client in admin dashboard
- [x] Implement email/password authentication (2 users only)
- [x] Build admin dashboard UI with statistics
- [x] Add RSVP table with search and sort
- [x] Implement CSV export functionality
- [x] Add PWA manifest and service worker
- [x] Create deployment documentation
- [x] Provide .env setup instructions

## Project Restructuring - Two Separate Deployments
- [x] Create vercel.json for wedding website (/client)
- [x] Update admin dashboard env variable names (ADMIN_EMAIL_1, ADMIN_PASSWORD_1, etc.)
- [x] Create vercel.json for admin dashboard (/wedding-admin)
- [x] Create separate deployment documentation for both projects
- [x] Verify both projects can deploy independently to Vercel
