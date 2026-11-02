import json
import os

with open('data/portfolio.json') as f: portfolio_items = json.load(f)
with open('data/bookings.json') as f: bookings = json.load(f)
with open('data/partners.json') as f: partners = json.load(f)
with open('data/obd_database.json') as f: obd_codes = json.load(f)
with open('data/customers.json') as f: customers = json.load(f)
with open('data/job_cards.json') as f: job_cards = json.load(f)

# Build 30 Pre-Rendered Portfolio Cards HTML
portfolio_cards_html = ""
for idx, item in enumerate(portfolio_items):
    is2w = item['category'] == '2w'
    accent = "#00e5ff" if is2w else "#ff9100"
    badge_bg = "rgba(0, 229, 255, 0.15)" if is2w else "rgba(255, 145, 0, 0.15)"
    category_class = "port-item-2w" if is2w else "port-item-4w"
    
    # Stylized action graphic SVG
    svg_graphic = f"""
    <div style="position: relative; overflow: hidden; border-radius: 8px 8px 0 0; background: {'radial-gradient(circle at 50% 40%, #0d1e33 0%, #050a12 100%)' if is2w else 'radial-gradient(circle at 50% 40%, #261608 0%, #0a0603 100%)'}; border-bottom: 1px solid var(--bg-card-border);">
      <svg viewBox="0 0 400 220" width="100%" height="185" style="display: block;">
        <defs>
          <linearGradient id="grad_{item['id']}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="{accent}" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0.8"/>
          </linearGradient>
        </defs>
        <line x1="20" y1="20" x2="380" y2="20" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="20" y1="195" x2="380" y2="195" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>
        
        <!-- Graphic Elements -->
        {'<circle cx="200" cy="105" r="50" fill="none" stroke="' + accent + '" stroke-width="1.5" stroke-dasharray="4,4"/><rect x="155" y="70" width="90" height="70" rx="8" fill="#091320" stroke="' + accent + '" stroke-width="2"/><circle cx="180" cy="95" r="10" fill="#1b2a40" stroke="#fff" stroke-width="1.5"/><circle cx="220" cy="95" r="10" fill="#1b2a40" stroke="#fff" stroke-width="1.5"/><line x1="180" y1="105" x2="180" y2="135" stroke="#ffd700" stroke-width="2.5"/><line x1="220" y1="105" x2="220" y2="135" stroke="#ffd700" stroke-width="2.5"/><line x1="80" y1="50" x2="130" y2="90" stroke="#fff" stroke-width="3" stroke-linecap="round"/><rect x="70" y="42" width="22" height="12" rx="3" fill="' + accent + '"/>' if is2w else '<rect x="35" y="25" width="12" height="170" fill="#2d1c0b" stroke="' + accent + '" stroke-width="1.5"/><rect x="353" y="25" width="12" height="170" fill="#2d1c0b" stroke="' + accent + '" stroke-width="1.5"/><line x1="42" y1="115" x2="358" y2="115" stroke="' + accent + '" stroke-width="3"/><rect x="90" y="85" width="220" height="42" rx="8" fill="#150e06" stroke="#ffb300" stroke-width="2"/><path d="M 125 85 L 155 58 L 245 58 L 275 85 Z" fill="#0d0803" stroke="' + accent + '" stroke-width="1.5"/><path d="M 80 155 Q 120 125, 160 155 T 240 155 T 320 155" fill="none" stroke="#00e676" stroke-width="2"/>'}
        
        <rect x="20" y="26" width="110" height="22" rx="4" fill="rgba(0,0,0,0.65)" stroke="{accent}" stroke-width="1"/>
        <text x="75" y="40" font-size="9" fill="{accent}" font-weight="bold" text-anchor="middle" font-family="monospace">
          #{str(idx + 1).zfill(2)} {'2-WHEELER' if is2w else '4-WHEELER'}
        </text>
        <circle cx="28" cy="180" r="4" fill="#00e676"/>
        <text x="38" y="183" font-size="9" fill="#8b9bb4" font-family="monospace">{item.get('area', 'Hyderabad Lab')}</text>
      </svg>

      <!-- OFFICIAL WATERMARK EMBEDDED ON BOTTOM-RIGHT CORNER -->
      <div style="position: absolute; bottom: 8px; right: 10px; background: rgba(0, 0, 0, 0.85); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 4px; padding: 4px 8px; display: flex; align-items: center; gap: 6px; pointer-events: none; z-index: 2; box-shadow: 0 4px 12px rgba(0,0,0,0.9);">
        <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: {accent};"></span>
        <span style="font-size: 9.5px; font-weight: 900; letter-spacing: 0.8px; color: #fff; text-transform: uppercase; font-family: 'Segoe UI', sans-serif;">
          CC MOTOCRAFTS
        </span>
      </div>
    </div>
    """

    card_html = f"""
    <div class="pricing-card {category_class}" style="padding: 0; overflow: hidden; border: 1px solid var(--bg-card-border); background: var(--bg-card); display: flex; flex-direction: column;">
      {svg_graphic}
      <div style="padding: 18px; flex: 1; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 11px; font-weight: 800; color: {accent}; font-family: var(--font-mono); text-transform: uppercase;">
            {item['tag']}
          </span>
          <span style="font-size: 10px; background: rgba(0, 230, 118, 0.15); color: var(--success); padding: 2px 6px; border-radius: 4px; font-weight: 700;">
            VERIFIED WORKSHOP
          </span>
        </div>

        <h4 style="font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.3;">
          {item['title']}
        </h4>

        <!-- 2-Line Clear Description -->
        <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5; min-height: 54px;">
          {item['workDescription']}
        </p>

        <!-- Tools Used & Team -->
        <div style="background: rgba(0,0,0,0.35); padding: 10px 12px; border-radius: 6px; margin-bottom: 14px; font-size: 11.5px; border: 1px solid rgba(255,255,255,0.05);">
          <p style="color: var(--text-dim); margin-bottom: 4px;">
            <strong style="color: #fff;">🔧 Tools Used:</strong> {item['toolsUsed']}
          </p>
          <p style="color: var(--text-dim);">
            <strong style="color: #fff;">👨‍🔧 Team & Role:</strong> {item['technicians']}
          </p>
        </div>

        <!-- Action Buttons -->
        <div style="margin-top: auto; display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 8px;">
          <button class="btn-cyber-solid" style="padding: 10px 12px; font-size: 13px; font-weight: 800; text-align: center;" onclick="openBookServiceModal('{item['id']}', '{item['title']}', '{item['vehicle']}')">
            ⚡ Book Service
          </button>
          <button class="btn-cyber" style="padding: 10px 8px; font-size: 11.5px; text-align: center;" onclick="viewPortfolioSpecs('{item['id']}')">
            🔍 Specs
          </button>
        </div>
      </div>
    </div>
    """
    portfolio_cards_html += card_html

# Build Pre-Rendered Bookings Cards HTML
bookings_cards_html = ""
for b in bookings:
    is2w = b['customer']['vehicleType'] == '2w'
    isRebuild = b['serviceType'] == 'engine_rebuild'
    kmElapsed = (b.get('currentKm', 0)) - (b.get('lastServiceKm', 0))
    isFirstServiceDue = isRebuild and (500 <= kmElapsed <= 750)
    
    b_html = f"""
    <div class="pricing-card" style="padding: 18px; border: 1px solid var(--bg-card-border); background: var(--bg-card); display: flex; flex-direction: column;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <div>
          <span style="font-family: var(--font-mono); font-size: 11px; background: rgba(0, 229, 255, 0.15); color: var(--theme-primary); padding: 2px 6px; border-radius: 4px;">
            {b['bookingId']}
          </span>
          <h4 style="font-size: 16px; font-weight: 800; color: #fff; margin-top: 4px;">{b['customer']['vehicleModel']}</h4>
          <p style="font-size: 13px; font-weight: 700; color: var(--theme-primary); font-family: var(--font-mono);">{b['customer']['regNumber']}</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; background: {'rgba(0, 229, 255, 0.2)' if is2w else 'rgba(255, 145, 0, 0.2)'}; color: {'var(--theme-primary)' if is2w else 'var(--warning)'};">
            {'2-WHEELER' if is2w else '4-WHEELER'}
          </span>
          <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">{b['createdAt'].split(' ')[0]}</p>
        </div>
      </div>

      <p style="font-size: 12.5px; color: #fff; font-weight: 600; margin-bottom: 6px;">
        🛠️ {b['servicePackage']}
      </p>

      <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px; margin-bottom: 12px; font-size: 12px;">
        <p style="color: var(--text-muted);"><strong>Customer:</strong> {b['customer']['name']} ({b['customer']['mobile']})</p>
        <p style="color: var(--text-muted);"><strong>Assigned Bay:</strong> {b['assignedBay']}</p>
        <p style="color: var(--text-muted);"><strong>Lead Tech:</strong> {b['assignedTechnician']}</p>
        <p style="color: var(--theme-primary); margin-top: 4px;"><strong>Stage:</strong> {b['currentStage']} ({b['progressPercent']}%)</p>
      </div>

      {'<div style="background: rgba(255, 51, 102, 0.15); border: 1px solid var(--danger); padding: 8px 12px; border-radius: 6px; margin-bottom: 12px;"><p style="font-size: 11.5px; color: var(--danger); font-weight: 800;">🚨 CRITICAL: 500-750 KM FIRST OVERHAUL CHECKUP DUE!</p><p style="font-size: 11px; color: #fff;">Break-in flush required to maintain 1-Year Engine Warranty.</p></div>' if isFirstServiceDue else '<div style="background: rgba(0, 230, 118, 0.08); border-left: 3px solid var(--success); padding: 6px 10px; border-radius: 4px; margin-bottom: 12px; font-size: 11px;"><strong style="color: var(--success);">' + b['warrantyStatus']['type'] + '</strong><p style="color: var(--text-muted);">' + b['warrantyStatus'].get('rules', b['warrantyStatus'].get('notes', 'Active Guarantee')) + '</p></div>'}

      <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: auto;">
        <button class="btn-cyber" style="padding: 6px 10px; font-size: 11px;" onclick="advanceBookingStage('{b['bookingId']}')">
          ⏩ Advance Stage
        </button>
        <a href="https://wa.me/918333007351?text=Hi%20CC%20Motocrafts,%20status%20update%20for%20{b['customer']['regNumber']}" target="_blank" class="btn-cyber" style="padding: 6px 10px; font-size: 11px; color: #25D366; border-color: #25D366;">
          💬 WhatsApp
        </a>
        <button class="btn-cyber-solid" style="padding: 6px 10px; font-size: 11px;" onclick="quickLaunchLiveBay('{b['customer']['regNumber']}')">
          🎥 Bay Video
        </button>
      </div>
    </div>
    """
    bookings_cards_html += b_html

print(f"Generated {len(portfolio_items)} pre-rendered portfolio cards and {len(bookings)} booking cards.")
