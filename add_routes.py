with open('server.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure bookings and portfolio are read at top
if 'let bookings =' not in content:
    target_data_read = "let invoices = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'invoices.json'), 'utf8'));"
    data_replacement = """let invoices = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'invoices.json'), 'utf8'));
let bookings = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'bookings.json'), 'utf8'));
let portfolio = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'portfolio.json'), 'utf8'));"""
    content = content.replace(target_data_read, data_replacement)

# Insert the API routes
routes_to_add = """
      // GET /api/bookings
      if (pathname === '/api/bookings' && method === 'GET') {
        return sendJson(res, 200, bookings);
      }

      // POST /api/bookings
      if (pathname === '/api/bookings' && method === 'POST') {
        const body = await parseRequestBody(req);
        bookings.unshift(body);
        return sendJson(res, 201, { success: true, booking: body });
      }

      // PUT /api/bookings/:id/status
      if (pathname.startsWith('/api/bookings/') && pathname.endsWith('/status') && method === 'PUT') {
        const parts = pathname.split('/');
        const id = parts[3];
        const body = await parseRequestBody(req);
        const idx = bookings.findIndex(b => b.bookingId === id);
        if (idx !== -1) {
          bookings[idx] = { ...bookings[idx], ...body, updatedAt: new Date().toISOString() };
          return sendJson(res, 200, { success: true, updated: bookings[idx] });
        }
        return sendJson(res, 404, { error: 'Booking not found' });
      }

      // GET /api/portfolio
      if (pathname === '/api/portfolio' && method === 'GET') {
        const cat = parsedUrl.query.category;
        if (!cat || cat === 'all') return sendJson(res, 200, portfolio);
        const filtered = portfolio.filter(p => p.category === cat);
        return sendJson(res, 200, filtered);
      }
"""

marker = "return sendJson(res, 404, { error: `API route not found:"
idx = content.find(marker)
if idx != -1:
    content = content[:idx] + routes_to_add + "\n      " + content[idx:]

with open('server.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleanly added booking & portfolio routes.")
