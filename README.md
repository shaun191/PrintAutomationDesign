# Print Automation & Design — rebuilt static website

This is a modern static rebuild of the original ASP.NET MVC site.

## Files
- `index.html` — complete one-page marketing site
- `styles.css` — custom responsive styling
- `script.js` — mobile navigation and header behavior
- `assets/images/` — copied from the original site

## Deployment
Upload this folder to Vercel, Netlify, Azure Static Web Apps, or any static web host.

## Contact form
The form currently uses `mailto:info@printautomationdesign.com` so it works without a backend. For production lead capture, replace the `form action` in `index.html` with a CRM/form endpoint such as Formspree, Netlify Forms, HubSpot, Gravity Forms, or a custom API.

## Notes
The old MVC backend, DLLs, Bootstrap/jQuery dependencies, placeholder contact page, and broken modal references were removed for a lighter, faster lead-generation site.
