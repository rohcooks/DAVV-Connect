# DAVV Connect

A browser-based front-end prototype built with HTML, CSS, JavaScript, and Bootstrap. It includes sign-in and onboarding screens, a home page, communities, departments, and notices.

## Open in VS Code

1. In VS Code, choose File > Open Folder.
2. Select this DAVV Connect folder.

## Run the site

Use the Live Server extension and choose Open with Live Server on index.html.

Or, from the VS Code terminal in this folder, run:

    python -m http.server 5500

Then open http://localhost:5500/index.html in your browser. Bootstrap is loaded from a CDN, so an internet connection is needed for its styles and components.

## Project files

- index.html, signup.html, onboarding.html: account flow
- home.html, communities.html, departments.html, notices.html: app pages
- app.js: page behavior and local demo data
- style.css: visual styles and responsive layouts
- img/: logo, banner, and event images

The prototype stores demo accounts, groups, and chats in the browser. Notices and events are sample content; this folder does not connect to a university data service.
