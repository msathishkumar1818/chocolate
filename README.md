# Maison du Cacao — Artisan Chocolate Studio & Atelier

A luxury, handcrafted multi-page website built for **Maison du Cacao**, an artisanal bean-to-bar chocolate making studio, confectionery boutique, and masterclass academy.

---

## 🎨 Theme Color Palette
Tailored strictly from the luxury dark chocolate reference identity:
- **Dark Mode Background**: `#000000` (Pure black luxury mode)
- **Deep Espresso**: `#1A0B06` / `#241008`
- **Rich Dark Chocolate**: `#35170D`
- **Cocoa Brown**: `#4A2415`
- **Warm Brown & Caramel**: `#633522` / `#8A5535`
- **Champagne Gold (Accents & Buttons)**: `#E8C77A`
- **Soft Gold (Borders & Icons)**: `#D9B866` / `#B89452`
- **Warm Ivory / Cream (Headings & Body Text)**: `#FFF4D6` / `#F7E8C2`

---

## 🧭 Navigation & Dropdown Architecture
- **Desktop (1024px+)**: Exactly 6 primary navigation items arranged horizontally on a single line:
  1. `Home` (Click-only dropdown for `Home 1: Bean-to-Bar` and `Home 2: Tasting Lounge`)
  2. `Collections` (`products.html`)
  3. `Workshops & Classes` (`classes.html`)
  4. `Corporate Gifting` (`gifting.html`)
  5. `About Atelier` (`about.html`)
  6. `Contact & Tasting` (`contact.html` — directly visible)
- **Click-Only Home Dropdown**:
  - Hover triggers do nothing.
  - Clicking `Home` opens the menu; clicking `Home 1` or `Home 2` automatically closes it.
  - Navigating to any other page keeps the dropdown closed.
- **Mobile Menu**: Responsive slide-out drawer with accordion for Home submenu, auto-close on selection, RTL/LTR toggle, and theme switch.
- **Brand Head Title & Favicon**: Custom artisan cacao pod SVG favicon matching the header logo across all pages.

---

## 📐 Page Structure & Layout
1. **Home 1 (`index.html`)** — Exactly 6 Content Sections:
   - *Hero*: Grand Editorial Bean-to-Bar Showcase & Live Status
   - *Section 02*: 4-Stage Bean-to-Bar Journey (Harvest, Conching, Tempering, Finishing)
   - *Section 03*: Curated Master Collections (Origin Tablets, Silk Truffles, Keepsake Chest)
   - *Section 04*: Sensory Tasting Profile & Terroir Pairing Notes
   - *Section 05*: International Accolades & Gastronome Reverence
   - *Section 06*: Final Luxury Call-to-Action Section & Tasting Reservation Button
2. **Home 2 (`home-2.html`)** — Exactly 6 Unique Content Sections:
   - *Hero*: Tasting Salon with Interactive Cacao Intensity Percentage Slider
   - *Section 02*: Limited Autumn Botanical Drops & Weekly Batch Counts
   - *Section 03*: Chocolate Making Masterclass Studio & Granite Slab Stations
   - *Section 04*: Evening Sommelier Flights (Whisky & Port Chocolate Pairings)
   - *Section 05*: Haute Couture Corporate & Private Gifting
   - *Section 06*: Final Call-to-Action Section & Lounge Booking Button
3. **Inner Pages (Exactly 5 Content Sections each, concluding with a CTA Button)**:
   - `products.html`: Collections, filter tabs, product cards, bonbon anatomy, custom box builder, final ordering CTA.
   - `classes.html`: Academy overview, 3 masterclass curriculum tiers, studio equipment, chef bio, final station reservation CTA.
   - `gifting.html`: Executive concierge, bespoke debossing & velvet cases, 3 corporate hamper tiers, logistics timeline, final consultation CTA.
   - `about.html`: Studio heritage, Chef Henri Vance profile, direct-trade agroforestry, stone-wheel conching, final visit CTA.
   - `contact.html`: Studio location, hours, reservation & inquiry form, boutique amenities, final priority concierge CTA.

---

## 🖼️ Local Asset & Licensing Management
- 48 high-resolution, unique images sourced from Unsplash under the Unsplash License (Commercial Use Permitted, No Attribution Required).
- Zero remote production URLs (`assets/images/...` local paths only).
- Zero repeated visuals across any page or section.
- Complete audit logged in `assets/image-sources.md`.
