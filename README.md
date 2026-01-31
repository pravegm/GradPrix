# GradPrix Website

Premium MBA admissions consulting website for GradPrix.

## Run Locally

Simply open `index.html` in your browser, or use a local server:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

**Using VS Code:**
Install the "Live Server" extension and click "Go Live"

## Project Structure

```
GradPrix/
├── index.html              # Homepage
├── about.html              # About Us page
├── services.html           # Services page
├── success-stories.html    # Testimonials and results
├── resources.html          # Blog listing page
├── faq.html                # FAQ page
├── contact.html            # Contact page
├── blog/                   # Individual blog posts
│   ├── mba-for-all-backgrounds.html
│   ├── international-experience-myths.html
│   ├── extracurriculars-mba-applications.html
│   └── too-young-for-mba-myth.html
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── images/
│       ├── logo.png        # GradPrix logo
│       ├── team-*.jpg      # Team photos
│       └── schools/        # Partner school logos
└── README.md
```

## Pages

1. **Homepage** - Hero, services overview, testimonials, target schools
2. **About Us** - Company story, mission, team bios
3. **Services** - Tailored consulting packages
4. **Success Stories** - Client testimonials and admission results
5. **Blog** - MBA insights and articles
6. **FAQ** - Common questions
7. **Contact** - Contact form and info

## Deployment

Static HTML/CSS/JS - deploy to any hosting service:
- Netlify
- Vercel  
- GitHub Pages
- Traditional hosting via FTP

## License

Private - GradPrix © 2025
