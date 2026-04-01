---
description: When in PLAN mode or asked about how to think through an idea, refer to these instructions to learn about the purpose and structure of the codebase
---

# Concourse Codes - Project Overview

## Purpose and Mission

**Overview:** This is a personal portfolio project website intended to be kept as minimalistic and using low-tech web development technologies where possible (HTML, CSS, light JS or tooling). It is designed to be a homepage to link to my personal projects, a blog, my resume/CV and any other small trinkets. 

**Mission:** The mission is to build a site that is lightweight, leaning on early internet website techniques and aesthetics. Ideally, it will easily display a homepage for my work.

**Design:** The site uses an early internet retro web design along with an earthtone / beige color scheme to evoke nostalgia while tying the site to a more natural feeling. Most images are pixel-art based in the style of old desktop icons.

## Tech Stack

- **Static Site Generator**: Eleventy (11ty) v3.0.0
- **Templating**: Nunjucks (.njk files in `_includes/`)
- **Styling**: Custom CSS (`stylez.css`) with Google Fonts (Ubuntu Mono)
- **JavaScript**: Vanilla JS (no frameworks)
- **Hosting**: Netlify
- **Serverless Functions**: Netlify Functions (Node.js in `netlify/functions/`)
- **Analytics**: Google Analytics (gtag.js)

## Project Structure

- **Root HTML files**: Main pages (index, blog, projects, about, contact, ideas, microblog)
- **`_includes/`**: Nunjucks templates and layouts
- **`_site/`**: Build output directory (Eleventy generates static files here)
- **`projects/`**: Project content (.html and .md files)
- **`assets/`**: Static assets (fonts, images, JavaScript)
- **`netlify/functions/`**: Serverless function handlers (e.g., get-messages.js)

## Build Commands

- **Development**: `npm run dev` (Eleventy with watch mode and local server)
- **Production**: `npm run build` (generates static site to `_site/`)
- **Deploy**: Automated via Netlify on push