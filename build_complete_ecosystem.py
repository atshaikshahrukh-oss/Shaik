import json
import os

with open('data/portfolio.json', 'r', encoding='utf-8') as f: portfolio_items = json.load(f)
with open('data/bookings.json', 'r', encoding='utf-8') as f: bookings = json.load(f)
with open('data/partners.json', 'r', encoding='utf-8') as f: partners = json.load(f)
with open('data/obd_database.json', 'r', encoding='utf-8') as f: obd_codes = json.load(f)
with open('data/customers.json', 'r', encoding='utf-8') as f: customers = json.load(f)
with open('data/job_cards.json', 'r', encoding='utf-8') as f: job_cards = json.load(f)

# Build 34 Pre-Rendered Portfolio Cards with REAL WORKSHOP PHOTOGRAPHS
portfolio_cards_html = ""
for idx, item in enumerate(portfolio_items):
    is2w = item['category'] == '2w'
    accent = "#00e5ff" if is2w else "#ff9100"
    category_class = "port-item-2w" if is2w else "port-item-4w"
    audio_desc = item.get('audioEffect', 'Tool Mechanical Telemetry Sound')
    photo_url = item.get('realPhotoUrl', 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80')

    photo_card_header = f"""
    <div style="position: relative; height: 210px; overflow: hidden; border-radius: 8px 8px 0 0; background: #0c1726; border-bottom: 1px solid var(--bg-card-border);">
      <img src="{photo_url}" alt="{item['title']}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.85) contrast(1.1); transition: transform 0.3s ease;">
      <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(6,11,19,0.2) 0%, rgba(6,11,19,0.85) 100%);"></div>

      <!-- Top Tag Badge -->
      <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.75); border: 1px solid {accent}; border-radius: 4px; padding: 3px 8px; font-size: 9.5px; font-weight: 800; color: {accent}; font-family: var(--font-mono);">
        #{str(idx + 1).zfill(2)} {'2-WHEELER' if is2w else '4-WHEELER'} • {item.get('tag', 'WORKSHOP')}
      </div>

      <!-- Location Badge -->
      <div style="position: absolute; bottom: 10px; left: 10px; font-size: 10px; color: #fff; font-family: var(--font-mono); display: flex; align-items: center; gap: 4px;">
        <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#00e676;"></span>
        {item.get('area', 'Gachibowli Lab')}
      </div>

      <!-- OFFICIAL WATERMARK EMBEDDED ON BOTTOM-RIGHT CORNER -->
      <div style="position: absolute; bottom: 8px; right: 10px; background: rgba(0, 0, 0, 0.88); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 4px; padding: 4px 8px; display: flex; align-items: center; gap: 6px; pointer-events: none; z-index: 2; box-shadow: 0 4px 14px rgba(0,0,0,0.9);">
        <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: {accent};"></span>
        <span style="font-size: 9.5px; font-weight: 900; letter-spacing: 0.8px; color: #fff; text-transform: uppercase; font-family: 'Segoe UI', sans-serif;">
          CC MOTOCRAFTS
        </span>
      </div>
    </div>
    """

    card_html = f"""
    <div class="pricing-card {category_class}" style="padding: 0; overflow: hidden; border: 1px solid var(--bg-card-border); background: var(--bg-card); display: flex; flex-direction: column;">
      {photo_card_header}
      <div style="padding: 16px; flex: 1; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 10.5px; font-weight: 800; color: {accent}; font-family: var(--font-mono); text-transform: uppercase;">
            {item['vehicle']}
          </span>
          <button class="btn-cyber" style="padding: 2px 8px; font-size: 10px; color: var(--gold); border-color: var(--gold);" onclick="playToolSound('{item['id']}', '{audio_desc}')" title="Play Real Tool Sound">
            🔊 Tool Audio
          </button>
        </div>

        <h4 style="font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 6px; line-height: 1.3;">
          {item['title']}
        </h4>

        <!-- 2-Line Clear Description -->
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px; line-height: 1.45; min-height: 50px;">
          {item['workDescription']}
        </p>

        <!-- Tools Used & Team -->
        <div style="background: rgba(0,0,0,0.35); padding: 8px 10px; border-radius: 6px; margin-bottom: 12px; font-size: 11px; border: 1px solid rgba(255,255,255,0.05);">
          <p style="color: var(--text-dim); margin-bottom: 3px;">
            <strong style="color: #fff;">🔧 Tools Used:</strong> {item['toolsUsed']}
          </p>
          <p style="color: var(--text-dim);">
            <strong style="color: #fff;">👨‍🔧 Team & Role:</strong> {item['technicians']}
          </p>
        </div>

        <!-- Action Buttons: Direct Book Service & Specs -->
        <div style="margin-top: auto; display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 8px;">
          <button class="btn-cyber-solid" style="padding: 9px 10px; font-size: 12.5px; font-weight: 800; text-align: center;" onclick="openBookServiceModal('{item['id']}', '{item['title']}', '{item['vehicle']}')">
            ⚡ Book Service
          </button>
          <button class="btn-cyber" style="padding: 9px 6px; font-size: 11px; text-align: center;" onclick="viewPortfolioSpecs('{item['id']}')">
            🔍 Specs
          </button>
        </div>
      </div>
    </div>
    """
    portfolio_cards_html += card_html

print(f"Generated {len(portfolio_items)} photographic action portfolio cards.")
