# GradPrix Website

Premium MBA admissions consulting website for **GradPrix** - helping candidates secure admission to Tier 1 and Tier 2 MBA programs worldwide

🌐 **Live Site:** [www.gradprix.com](https://www.gradprix.com)

## Quick Start

### Run Locally

**Option 1: Python Server (Recommended)**
```bash
cd /path/to/GradPrix
python3 -m http.server 8000
```
Visit `http://localhost:8000`

**Option 2: VS Code Live Server**
Install the "Live Server" extension and click "Go Live"

**Option 3: Direct File**
Simply open `index.html` in your browser (some features may not work due to CORS)

## Project Structure

```
GradPrix/
├── index.html                    # Homepage with hero, testimonials, school logos
├── about.html                    # Company story, mission, and team
├── services.html                 # Consulting packages and pricing
├── success-stories.html          # Client testimonials and results
├── resources.html                # Blog listing page
├── faq.html                      # Frequently asked questions
├── contact.html                  # Contact form and information
│
├── blog/                         # Individual blog posts (SEO optimized)
│   ├── mba-for-all-backgrounds.html
│   ├── international-experience-myths.html
│   ├── extracurriculars-mba-applications.html
│   ├── too-young-for-mba-myth.html
│   └── european-vs-usa-mba.html
│
├── google-apps-script/           # Backend form handling
│   └── contact-form-handler.gs   # Google Apps Script for form submissions
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions for auto-deployment
│
├── assets/
│   ├── css/
│   │   └── styles.css            # Main stylesheet (3500+ lines)
│   ├── js/
│   │   └── main.js               # Interactive functionality
│   └── images/
│       ├── logo.png              # GradPrix logo
│       ├── team-praveg.jpg       # Co-founder photo
│       ├── team-rajat.jpg        # Co-founder photo
│       ├── team-rangolie.jpg     # Team member photo
│       └── schools/              # Partner MBA school logos
│           ├── insead.png
│           ├── lbs.png
│           ├── oxford.png
│           ├── cambridge.png
│           ├── iese.png
│           ├── ie.png
│           ├── esade.png
│           ├── hkust.png
│           ├── darden.png
│           ├── tuck.png
│           └── manchester.png
│
└── README.md
```

## Pages Overview

| Page | Description |
|------|-------------|
| **Homepage** | Hero section, key stats, testimonials carousel, partner school logos |
| **About Us** | Founding story, mission statement, team profiles with credentials |
| **Services** | Detailed consulting packages with features and CTAs |
| **Success Stories** | Featured testimonial, client results grid, school logos carousel |
| **Blog** | Featured article banner, blog cards grid, newsletter signup |
| **FAQ** | Accordion-style Q&A covering common applicant questions |
| **Contact** | Contact form, email/phone info, consultation booking |

## Blog Articles

Five comprehensive, SEO-optimized blog posts:

1. **MBA for All Backgrounds** (Sep 2025) - Why diverse backgrounds are valued
2. **International Experience Myths** (Nov 2025) - Busting common misconceptions
3. **European vs. USA MBA** (Nov 2025) - Complete guide to choosing your path
4. **Extracurriculars in MBA Applications** (Dec 2025) - Quality over quantity
5. **Am I Too Young for an MBA?** (Jan 2026) - Debunking the experience myth

Each blog includes:
- Schema.org Article markup
- Meta descriptions and keywords
- Custom hero visuals (CSS-based)
- GradPrix CTA section
- Related articles

## Technical Features

### Design
- **Typography:** Cormorant Garamond (headings) + Montserrat (body)
- **Color Palette:** Navy (#1a2744), Gold (#c9a227), Off-white backgrounds
- **Animations:** Scroll-triggered reveals, hover effects, animated carousels
- **Components:** Cards with shadows, glassmorphism effects, gradient overlays

### Performance
- Lazy loading for images (`loading="lazy"`)
- Preload for critical resources
- Font preconnect to Google Fonts
- Optimized images (compressed)

### Responsive Design
- **Desktop:** Full layouts, multi-column grids
- **Tablet (≤968px):** Hamburger menu, adjusted grids
- **Mobile (≤768px):** Single-column layouts, stacked elements
- **Small Mobile (≤480px):** Further size reductions

Mobile features:
- Touch-friendly targets (44px minimum)
- No horizontal scrolling
- Readable typography (15-16px base)
- Full-width buttons and forms

### JavaScript Features
- Mobile hamburger menu toggle
- Smooth scroll navigation
- FAQ accordion
- Form handling (client-side validation)
- Scroll-triggered animations
- Counter animations

## Form Handling

The contact form uses **Google Apps Script** for backend processing:

- **Email Notifications:** Sends formatted emails to team on new submissions
- **Google Sheets Logging:** All submissions logged to spreadsheet for tracking
- **Auto-responder:** Sends confirmation email to applicants
- **Validation:** Both client-side and server-side validation

### Setup
The Google Apps Script (`google-apps-script/contact-form-handler.gs`) handles:
1. Form data validation
2. Email dispatch to GradPrix team
3. Applicant confirmation emails
4. Sheet logging with timestamps

## Deployment

Currently deployed via **GitHub Pages** with automatic deployment on push to master.

### GitHub Pages (Current)
1. Push changes to `master` branch
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers automatically
3. Site deploys to `pravegm.github.io/GradPrix`

### Alternative Hosting Options

**Netlify:**
1. Connect repo to Netlify
2. Set publish directory: `/` (root)
3. Configure custom domain

**Vercel:**
1. Import project to Vercel
2. Deploy (auto-detects static site)

### Custom Domain Setup (www.gradprix.com)

**Step 1: GitHub Pages Configuration**
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Custom domain", enter: `www.gradprix.com`
4. Check "Enforce HTTPS" (will be available after DNS propagates)

**Step 2: GoDaddy DNS Configuration**
1. Log into your GoDaddy account
2. Go to **My Products** → **Domains** → Click **DNS** for `gradprix.com`
3. Add/Update the following DNS records:
   - **A Record:** 
     - Name: `@` (or leave blank)
     - Value: `185.199.108.153`
     - TTL: 600 (or default)
   - **A Record:**
     - Name: `@` (or leave blank)
     - Value: `185.199.109.153`
     - TTL: 600
   - **A Record:**
     - Name: `@` (or leave blank)
     - Value: `185.199.110.153`
     - TTL: 600
   - **A Record:**
     - Name: `@` (or leave blank)
     - Value: `185.199.111.153`
     - TTL: 600
   - **CNAME Record:**
     - Name: `www`
     - Value: `pravegm.github.io`
     - TTL: 600

**Step 3: Verify Setup**
- The `CNAME` file in the repository root contains `www.gradprix.com`
- After DNS propagation (can take 24-48 hours), your site will be accessible at `www.gradprix.com`
- GitHub will automatically provision SSL certificate for HTTPS

**Note:** DNS changes can take up to 48 hours to fully propagate globally.

## Development

### File Naming
- HTML pages: lowercase, hyphens (`success-stories.html`)
- Images: descriptive names (`team-praveg.jpg`)
- CSS/JS: single main files

### CSS Organization
The `styles.css` file is organized into sections:
1. CSS Variables (colors, spacing, typography)
2. Reset & Base styles
3. Layout utilities
4. Navigation
5. Hero section
6. Components (cards, buttons, forms)
7. Page-specific styles
8. Media queries (responsive)

### Adding New Blog Posts
1. Create new file in `blog/` directory
2. Copy structure from existing blog post
3. Update content, meta tags, schema markup
4. Add card to `resources.html`
5. Update related articles in other posts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Credits

- **Fonts:** Google Fonts (Cormorant Garamond, Montserrat)
- **Icons:** SVG icons (inline)
- **School Logos:** Official logos used with permission

## Contact

**GradPrix**
- Email: support@gradprix.com
- Phone: +44 7865 267776
- Location: London, UK

## License

Private - GradPrix © 2025. All rights reserved.
