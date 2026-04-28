SEO IMPLEMENTATION PLAN FOR PROGRAMMER
Project goal: optimize the website technically so Google can crawl, understand, index, and display the site properly for product and local searches in Ecuador.
Do not create a blog section.



CLEAN URL STRUCTURE


Use simple, readable URLs.
Required structure:
/productos
/productos/[product-slug]
/categorias/[category-slug]
/tipos/[type-slug]
/contacto
/nosotros
Rules:
All URLs must be lowercase.
Use hyphens, not spaces or underscores.
Avoid extremely long slugs.
Avoid query-based product URLs like:
/producto?id=123
Bad:
/productos/Instrumentos y Medición HI98107 Medidor de Bolsillo de pH Impermeable
Good:
/productos/medidor-ph-hi98107
Acceptance criteria:
Every product, category, and type page has a clean slug.
No slug should be unnecessarily long.
No duplicated slugs.



PAGE METADATA


Every important page must have unique SEO metadata.
Implement metadata for:
Home page
Product listing page
Individual product pages
Category pages
Product type pages
Contact page
About page
Each page needs:
SEO title
Meta description
Canonical URL
Open Graph title
Open Graph description
Open Graph image
Twitter card metadata
Example product title format:
Medidor de pH HI98107 en Ecuador | Coldchain
Example product description format:
Cotiza el Medidor de pH HI98107 en Ecuador. Equipo profesional para medición agrícola, laboratorio e industria.
Example category title format:
Instrumentos de Medición en Ecuador | Coldchain
Example category description format:
Encuentra instrumentos de medición para agricultura, laboratorio e industria en Ecuador. Cotiza equipos profesionales con Coldchain.
Acceptance criteria:
Every page has unique title and description.
No page uses the same generic metadata.
Titles should be around 50–60 characters when possible.
Descriptions should be around 140–160 characters when possible.



HEADING STRUCTURE


Each page must use proper HTML heading hierarchy.
Rules:
Only one H1 per page.
Use H2 for main sections.
Use H3 for subsections.
Do not use headings only for visual styling.
Product detail page:
H1 = product name
H2 = Descripción
H2 = Ficha técnica
H2 = Productos relacionados
Category page:
H1 = category name
H2 = products in that category
H2 = other related categories if applicable
Home page:
H1 = main business positioning phrase
H2 = main product/category sections
Acceptance criteria:
No page has multiple H1 tags.
Headings describe the real page content.
Keywords appear naturally in important headings.



SITEMAP.XML


Create a dynamic sitemap.
The sitemap must include:
Home page
Product listing page
All product detail pages
All category pages
All product type pages
Contact page
About page
Each sitemap entry should include:
URL
lastModified
changeFrequency
priority
Example priorities:
Home: 1.0
Product listing: 0.9
Product pages: 0.8
Category pages: 0.8
Contact/About: 0.6
Acceptance criteria:
Sitemap is available at:
/sitemap.xml
All important pages are included.
No broken URLs are included.
Sitemap updates automatically when products/categories change.



ROBOTS.TXT


Create robots.txt.
It should allow indexing of public pages and block internal/admin routes.
Example:
User-agent: *
Allow: /
Disallow: /api/
Disallow: /studio/
Disallow: /admin/
Sitemap: https://YOURDOMAIN.com/sitemap.xml
Acceptance criteria:
robots.txt is available at:
/robots.txt
Sitemap path is included.
No important public pages are blocked.



CANONICAL TAGS


Add canonical URLs to all public pages.
Purpose: avoid duplicate content issues.
Example:
Product page canonical:
https://YOURDOMAIN.com/productos/medidor-ph-hi98107
Category canonical:
https://YOURDOMAIN.com/categorias/instrumentos-medicion
Acceptance criteria:
Every indexable page has one canonical URL.
Canonical URL matches the final production URL.
No canonical points to localhost, Vercel preview, or old domains.



PRODUCT STRUCTURED DATA


Add JSON-LD structured data to product pages.
Use Product schema.
Include when available:
Product name
Description
Image
Brand
SKU or product code
Category
URL
Availability
Price only if actual prices are shown publicly
If prices are not shown, do not fake prices.
Example fields:
@context
@type: Product
name
description
image
brand
sku
category
url
Acceptance criteria:
Product pages pass Google Rich Results Test.
No invalid or fake product data.
Images used in schema are absolute URLs.



ORGANIZATION STRUCTURED DATA


Add Organization schema globally or on the home page.
Include:
Company name
Website URL
Logo
Contact phone
Country
SameAs links if available
Address if business address is public
Acceptance criteria:
Organization schema is valid.
Logo URL is absolute.
Company information matches the website and Google Business Profile.



BREADCRUMB STRUCTURED DATA


Add breadcrumbs to:
Product pages
Category pages
Product type pages
Example product breadcrumb:
Home > Productos > Instrumentos de Medición > Medidor de pH HI98107
Acceptance criteria:
Breadcrumbs are visible to users or included as valid structured data.
Breadcrumb schema passes validation.
Breadcrumb links work correctly.



IMAGE SEO


Optimize all website images.
Requirements:
Use WebP or AVIF when possible.
Compress images.
Use responsive image sizes.
Use descriptive alt text.
Use lazy loading for non-critical images.
Use priority loading only for above-the-fold hero images.
Bad alt text:
image
product photo
foto1
Good alt text:
Medidor de pH HI98107 para agricultura en Ecuador
Acceptance criteria:
No large unoptimized images.
Product images have descriptive alt text.
Hero images load quickly.
Lighthouse does not show major image warnings.



PERFORMANCE OPTIMIZATION


Optimize for Core Web Vitals.
Targets:
LCP under 2.5 seconds
CLS under 0.1
INP under 200 ms
Mobile Lighthouse score above 80
Desktop Lighthouse score above 90
Tasks:
Optimize images.
Avoid unnecessary JavaScript.
Use server components where possible.
Lazy load heavy components.
Avoid layout shifts by setting image dimensions.
Minimize third-party scripts.
Acceptance criteria:
Website passes Core Web Vitals standards or gets as close as possible before launch.
No obvious layout shifts when loading pages.



MOBILE SEO


Ensure the site works perfectly on mobile.
Tasks:
Check responsive layout for:
Home
Product listing
Product detail
Category page
Contact page
Navigation menu
Requirements:
No horizontal scrolling.
Buttons are easy to tap.
Text is readable.
Filters work on mobile.
Images do not overflow.
Acceptance criteria:
All key pages are usable on mobile.
No content is cut off.
No text is too small.



INTERNAL LINKING


Add clear internal links across the site.
Required links:
Home → main product categories
Home → product catalog
Category page → product pages
Product page → category page
Product page → related products
Product page → contact/WhatsApp quote action
Navbar → main sections
Footer → important pages
Acceptance criteria:
Every product page links back to its category.
Every category page links to its products.
Users and search engines can reach all important pages without search/filter only.



INDEXING RULES


Define which pages should be indexed.
Index:
Home
Product catalog
Product detail pages
Category pages
Product type pages
Contact page
About page
Noindex:
Search result pages
Filter-only pages with query parameters
Admin/studio pages
Internal API routes
Duplicate pages
Acceptance criteria:
Important pages are indexable.
Thin or duplicate pages are noindexed.
Google Search Console shows no accidental indexing issues.



404 AND REDIRECTS


Handle missing pages properly.
Tasks:
Create a custom 404 page.
If a product/category slug changes, redirect old URL to new URL.
Use 301 redirects for permanent URL changes.
Acceptance criteria:
Deleted/missing products show 404 or redirect properly.
No broken internal links.
Old important URLs redirect to correct new URLs.



OPEN GRAPH AND SOCIAL SHARING


Add social preview metadata.
Required for:
Home
Product pages
Category pages
Include:
og:title
og:description
og:image
og:url
og:type
Product pages should use the product image as the OG image.
Acceptance criteria:
Links shared on WhatsApp, Facebook, and LinkedIn show correct title, description, and image.
No generic or missing preview image.



LOCAL SEO SIGNALS ON WEBSITE


Add Ecuador/local business signals directly on the website.
Tasks:
Mention service area naturally:
Ecuador
Guayaquil if relevant
Agriculture, laboratory, industry depending on business focus
Add business contact information consistently:
Company name
Phone
Email
Address if public
WhatsApp contact
Add this information in:
Footer
Contact page
Organization schema
Acceptance criteria:
Business contact information is consistent across the site.
Footer includes essential company/contact details.
Contact page is crawlable and clear.



ACCESSIBILITY BASICS


Improve accessibility because it supports usability and SEO.
Tasks:
Use semantic HTML.
Add alt text to images.
Ensure buttons have accessible labels.
Ensure color contrast is readable.
Make navigation keyboard-friendly.
Use real buttons for actions and real links for navigation.
Acceptance criteria:
No major accessibility errors in Lighthouse.
Navigation works with keyboard.
Images and buttons have meaningful labels.



ANALYTICS AND SEARCH CONSOLE


Install tracking and monitoring.
Tasks:
Set up Google Search Console.
Submit sitemap.
Set up Google Analytics.
Track important actions:
WhatsApp clicks
Contact form submissions
Product quote button clicks
Phone clicks
Email clicks
Acceptance criteria:
Search Console is connected.
Sitemap submitted.
Analytics records page views.
Main conversion actions are tracked.



PRE-LAUNCH SEO QA


Before deploying, check:
No metadata is missing.
No page title is duplicated.
No meta description is duplicated.
Sitemap works.
Robots.txt works.
Canonical URLs use production domain.
Images are optimized.
Mobile layout works.
No broken internal links.
No localhost URLs remain.
No Vercel preview URLs are used in production metadata.
Product pages return 200 status.
Missing pages return 404.
Structured data validates correctly.
Google Search Console is ready.

FINAL PRIORITY ORDER FOR PROGRAMMER


Fix clean URLs and slugs.


Add metadata for all important pages.


Add sitemap.xml and robots.txt.


Add canonical URLs.


Add product, organization, and breadcrumb schema.


Optimize images and alt text.


Improve performance and mobile layout.


Add correct internal links.


Set indexing/noindex rules.


Set up analytics and Search Console.


Run final SEO QA before launch.

