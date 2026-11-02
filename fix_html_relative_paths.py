import re

with open('public/css/style.css', 'r', encoding='utf-8') as f:
    style_css = f.read()

with open('public/css/watermark.css', 'r', encoding='utf-8') as f:
    watermark_css = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace all absolute paths with relative paths
html = html.replace('href="/manifest.json"', 'href="manifest.json"')
html = html.replace('href="/assets/', 'href="assets/')
html = html.replace('href="/css/', 'href="css/')
html = html.replace('src="/js/', 'src="js/')
html = html.replace('src="/assets/', 'src="assets/')

# Include js/client-db.js before other scripts
if 'client-db.js' not in html:
    html = html.replace('<script src="js/app.js"></script>', '<script src="js/client-db.js"></script>\n  <script src="js/app.js"></script>')

# Inline critical CSS in head so it can NEVER render as plain white paper
inline_style_tag = f"""  <style>
/* CRITICAL INLINE CYBER-HUD & WATERMARK STYLES */
{style_css}
{watermark_css}
  </style>
"""

# Insert inline style right before </head>
if '/* CRITICAL INLINE CYBER-HUD & WATERMARK STYLES */' not in html:
    html = html.replace('</head>', inline_style_tag + '</head>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('public/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated root index.html and public/index.html with relative paths and inline critical CSS.")
