# GradPrix Website

Premium MBA admissions consulting website for **GradPrix** - helping candidates secure admission to Tier 1 and Tier 2 MBA programs worldwide

🌐 **Live Site:** [www.gradprix.com](https://www.gradprix.com)

## Quick Start

### Run Locally

**Option 1: Node (serve) on Windows (PowerShell)**
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
cd c:\Projects\GradPrix
npx serve -l 3000
```
Then open **http://localhost:3000**

**Option 2: Python Server**
```bash
cd /path/to/GradPrix
python3 -m http.server 8000
```
Visit `http://localhost:8000` (requires Python in PATH)

**Option 3: VS Code Live Server**
Install the "Live Server" extension, open the GradPrix folder, then click "Go Live". The extension will pick a port (e.g. 5500) and open the browser.

**Option 4: Open file directly**
Double-click `index.html` or drag it into your browser. The site will load from `file://`. Navigation and most content work; some features (e.g. contact form, strict CORS) may not.

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
├── robots.txt                    # Crawler permissions (includes AI bots)
├── sitemap.xml                   # XML sitemap for search engines
├── llms.txt                      # AI/LLM information file for ChatGPT, Gemini, etc.
│
├── blog/                         # Individual blog posts (SEO + AI optimized)
│   ├── insead-mba-application-guide.html
│   ├── lbs-mba-application-guide.html
│   ├── oxford-mba-application-guide.html
│   ├── cambridge-mba-application-guide.html
│   ├── hec-paris-mba-application-guide.html
│   ├── iese-mba-application-guide.html
│   ├── kellogg-mba-application-guide.html
│   ├── darden-mba-application-guide.html
│   ├── european-vs-usa-mba.html
│   ├── mba-program-length-guide.html
│   ├── mba-emba-mim-comparison-guide.html
│   ├── reapplicant-playbook-show-growth.html
│   ├── too-young-for-mba-myth.html
│   ├── mba-leadership-evaluation.html
│   ├── extracurriculars-mba-applications.html
│   ├── international-experience-myths.html
│   ├── initiative-beyond-day-job.html
│   ├── optional-essay-decision-tree.html
│   ├── mba-for-all-backgrounds.html
│   ├── mba-resume-teardown.html
│   └── career-gaps-layoffs-pivots-mba.html
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

Twenty-one comprehensive, SEO + AI-optimized blog posts:

**School-Specific Guides:**
1. **INSEAD MBA Application Guide** (Nov 2025) - Complete guide from INSEAD alumni
2. **Oxford MBA Application Guide** (Nov 2025) - Oxford Saïd Business School strategies
3. **LBS MBA Application Guide** (Dec 2025) - London Business School strategies
4. **Cambridge MBA Application Guide** (Nov 2025) - Cambridge Judge Business School strategies
5. **HEC Paris MBA Application Guide** (Dec 2025) - France's top MBA program
6. **IESE MBA Application Guide** (Oct 2025) - Barcelona MBA insights
7. **Kellogg MBA Application Guide** (Nov 2025) - Northwestern's collaborative MBA
8. **Darden MBA Application Guide** (Nov 2025) - UVA's case method focused MBA

**Programme Selection:**
9. **European vs. USA MBA** (Jan 2026) - Complete guide to choosing your path
10. **1-Year vs 1.5-Year vs 2-Year MBA** (Oct 2025) - Complete guide to choosing program length
11. **MBA vs. EMBA vs. MiM** (Oct 2025) - Which one is right for your timeline and ROI

**Application Strategy:**
12. **Optional Essay Decision Tree: Should You Write One, and What to Say** (Feb 2026) - Decision framework for the MBA optional essay
13. **Reapplicant Playbook: How to Show Growth (Without Apologizing)** (Feb 2026) - Reapplication strategy and growth narrative
14. **Am I Too Young for an MBA?** (Jan 2026) - Debunking the experience myth
15. **How Top MBAs Evaluate Leadership** (Dec 2025) - Beyond titles and team size
16. **Extracurriculars in MBA Applications** (Dec 2025) - Quality over quantity
17. **Initiative Beyond Your Day Job** (Nov 2025) - Practical strategies for busy professionals
18. **International Experience Myths** (Nov 2025) - Busting common misconceptions
19. **MBA for All Backgrounds** (Sep 2025) - Why diverse backgrounds are valued
20. **MBA Resume Teardown** (Feb 2026) - What to cut, what to keep, what to prove
21. **Career Gaps, Layoffs, and Pivots** (Jan 2026) - How to address them confidently in your MBA application

Each blog includes:
- Schema.org Article markup
- AI-optimized meta tags (`ai-content-summary`, `page-type`, `topic`)
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
- **Mobile hamburger menu** with full-screen overlay, smooth animations, and touch support
- Smooth scroll navigation
- FAQ accordion
- Form handling (client-side validation)
- Scroll-triggered animations
- Counter animations

## AI SEO / Generative Engine Optimization (GEO)

The site is optimized for AI systems like ChatGPT, Gemini, Perplexity, and Claude to ensure GradPrix is found, understood, and cited in AI-generated answers.

### AI SEO Files
| File | Purpose |
|------|---------|
| `llms.txt` | Structured information file for AI crawlers (company info, services, FAQ, sitemap) |
| `robots.txt` | Explicit permissions for all major AI crawler bots |

### AI Crawler Permissions (robots.txt)
The site explicitly allows all major AI crawlers:
- **GPTBot / ChatGPT-User** (OpenAI)
- **anthropic-ai / Claude-Web** (Anthropic)
- **Google-Extended** (Gemini/Bard)
- **PerplexityBot** (Perplexity AI)
- **Applebot-Extended** (Apple Intelligence)
- **Meta-ExternalAgent** (Meta AI)
- **CCBot** (Common Crawl - AI training data)

### AI Meta Tags
All pages include AI-optimized meta tags:
```html
<meta name="ai-content-summary" content="Quick summary for AI systems...">
<meta name="page-type" content="Homepage|Article|FAQ|Services">
<meta name="topic" content="Topic keywords for AI categorization">
```

### Enhanced Schema Markup
- **SpeakableSpecification** - For voice assistants and AI summaries
- **FAQPage schema** - Comprehensive Q&A for AI systems
- **HowTo schema** - Step-by-step process for MBA application
- **Review/AggregateRating** - Client testimonials and ratings
- **Article schema** - All blog posts with proper authorship

### AI-Friendly Content
- Hidden TL;DR summary blocks (readable by AI, not visible to users)
- Q&A formatted content throughout FAQ
- Bullet points and clear structure for easy AI parsing
- Entity-rich content with consistent brand signals

### Monitoring AI Visibility
Periodically test AI visibility by asking:
- ChatGPT: "What is the best MBA admissions consultant?"
- Perplexity: "GradPrix MBA consulting reviews"
- Gemini: "How to get into INSEAD with a consultant?"

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
