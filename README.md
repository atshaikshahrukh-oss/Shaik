# CC MOTOCRAFTS ENTERPRISE DUAL-AI PLATFORM (v2.6.0)
### All-in-One Multi-Tenant Partner Garage, PWA Mobile Booking App & Live Work Bay Streaming Platform
**Official Domain:** [ccmotocrafts.in](https://ccmotocrafts.in)  
**Business & WhatsApp Hotline:** [+91 8333007351](https://wa.me/918333007351)  
**Official Business Email:** [info@ccmotocrafts.in](mailto:info@ccmotocrafts.in)  
**Central Verification Alert Desk:** `aisupport.on@gmail.com`  
**Regional Headquarters:** Gachibowli, Hyderabad, Telangana 500032, India

---

## 1. What's New in v2.6.0 (Major Upgrades)

1. **📲 0-Second Instant App Install (PWA with Offline Support):**
   * Configured with `manifest.json` and `sw.js` (Service Worker) for zero-latency instant loading.
   * Can be installed directly from Chrome / Edge / Android / iOS without Google Play Store or App Store setup.
   * Caches core diagnostic interfaces and vehicle data for offline usage even during low or zero data connectivity in underground workshop basements.

2. **📋 Dedicated Workshop Booking & Warranty Tracker App (Zero Database / No Google Sheets Headache):**
   * Eliminates the need to open spreadsheets or phpMyAdmin databases manually.
   * Directly log new incoming vehicle jobs, assign bays (2W / 4W), select master technicians, and set price estimates in 1 click.
   * Interactive 1-click stage advancement (`Inspection` ➔ `Disassembly` ➔ `Overhaul` ➔ `Washing & Dyno` ➔ `Ready`).
   * Automated warranty guardrail monitor with countdown alerts for the mandatory **500–750 KM (15–30 days)** first engine overhaul break-in service.
   * Instant WhatsApp customer dispatch button pre-filled with real-time bay telemetry.

3. **🛒 Customer "Track My Order / Gadi Status" Trolley with Return Password Gate:**
   * Customers enter Vehicle Registration, Mobile, and Email.
   * If authorization is pending, the system presents the anti-irritation holding notice:
     > *"Aapka request CC MOTOCRAFTS system mein receive ho gaya hai. Central Verification Desk verification ke baad aapke Mobile, Email aur WhatsApp par dynamic return password send karega. Return password enter karke live video stream aur job card unlock karein."*
   * Dispatches automated alert to `aisupport.on@gmail.com` and issues dynamic OTP for instant release.

4. **📸 Real Visual Workshop Action & Engineering Portfolio (2W & 4W):**
   * High-definition visual cards for both 2-Wheelers and 4-Wheelers.
   * **2-Wheeler Specialist:** KTM Duke 390 DOHC valve lapping & shim calibration, Honda Activa 6G CVT variator overhaul, Royal Enfield 650 Twin crankshaft micropolishing & bearing assembly.
   * **4-Wheeler & Fleet:** Hyundai Creta 1.5 MPI cylinder honing & piston ring gap setting, Mahindra Thar 4x4 CRDe CAN-Bus telemetry & common rail calibration, 15,000cc Ashok Leyland commercial engine head re-facing.
   * Click-to-inspect modal detailing exact feeler gauge valve lash (IN 0.10mm, EX 0.15mm), torque specs (Nm), multimeter readings, and 25-Year master technician wisdom.

---

## 2. Multi-Portal Dual-Pass Architecture & Access Rules

```
                      CC MOTOCRAFTS MULTI-PORTAL DUAL-PASS ARCHITECTURE
========================================================================================
                                [ MASTER GATEWAY ]
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
   [ Passcode: cc105 ]          [ Passcode: cc1005 ]         [ Passcode: cc102 ]
┌────────────────────────┐   ┌────────────────────────┐   ┌────────────────────────┐
│ PARTNER GARAGE PORTAL  │   │ CUSTOMER LIVE BAY      │   │ CENTRAL ADMIN DESK     │
│ • Garage Profile & GST │   │ • 4-Step Verification  │   │ • Verification Desk    │
│ • Watermark Invoicing  │   │ • Return Password Gate │   │ • Hold Release & OTP   │
│ • Engine 1: OBD-II Lab │   │ • Live Low-Latency Cam │   │ • Network Revenue Log  │
│ • Engine 2: Advisor AI │   │ • 4-Stage Job Card     │   │ • Garage Activations   │
└────────────────────────┘   └────────────────────────┘   └────────────────────────┘
```

| User Role | Dedicated Access Code | Permissions & Scope | Security Guardrail |
| :--- | :---: | :--- | :--- |
| **Partner Workshop & Technician** | `cc105` | Profile setup (Address, GST, Trade License), isolated billing, Engine 1 OBD Scanner & Engine 2 Service Advisor. | **Customer Portal Restricted:** Cannot view customer live video streams or personal tokens. |
| **Customer Live Tracking** | `cc1005` | Real-time Work Bay Camera Stream, 4-Stage Digital Job Card tracker, and interactive "Add Problem / Note" dispatcher. | **Garage Dashboard Restricted:** Technician internal scanners, passwords, and billing tools are 100% masked. |
| **Central Master Admin** | `cc102` | Central Verification Desk, hold dispatch, network revenue analytics, partner garage activation/deactivation. | **Strict Master Authority:** Overrides all holds and manages diagnostic telemetry database. |

---

## 3. Strict Warranty & Regional Business Rules

* **General Service:** 30 Days Working Guarantee on tuned components and labor workmanship.
* **Engine Rebuild Overhaul:** 1-Year Engine Warranty covering Crankshaft, Cylinder Bore Kit, and Valve Manufacturing Defects. Wear-and-tear parts (brake pads, clutch plates, belts, filters) carry zero warranty.
* **Mandatory First Service:** Must be completed between **500–750 KM (15–30 days)**. Failure to perform this break-in checkup voids the 1-year overhaul warranty.
* **Routine Maintenance Interval:** Routine oil inspection and service mandatory every **1,800–2,000 KM (45–60 days)**.
* **Doorstep Pickup & Drop:** 100% Free Doorstep Pickup & Drop for VIP areas within a 20 km radius of Gachibowli, Hyderabad (covering pincodes 500032, 500081, 500084, 500089, 500033, 500075, etc.).
* **Cancellation Policy:** A standard diagnostic & dispatch inspection fee of ₹300 is applicable on post-confirmation cancellations.

---

## 4. File Structure

```
ccmotocrafts-platform/
├── package.json              # Platform metadata & npm scripts
├── config.js                 # Global credentials, contact details & warranty rules
├── server.js                 # Zero-dependency Node.js production server & REST API
├── README.md                 # Full enterprise documentation & VPS guide
├── data/
│   ├── partners.json         # Pre-seeded partner garages & isolated revenue data
│   ├── obd_database.json     # Master OBD fault codes, pinouts & multimeter specs
│   ├── customers.json        # Historical customer timelines & warranty records
│   ├── job_cards.json        # Live bay streams, 4-stage tracking & customer notes
│   ├── bookings.json         # Workshop bookings app database
│   ├── portfolio.json        # 2W and 4W engineering action portfolio
│   └── invoices.json         # Watermarked invoice logs & quotations
├── public/
│   ├── index.html            # Main UI, Hero HUD, Booking App, Portfolio & Modals
│   ├── manifest.json         # PWA Manifest for 0-Second App Install
│   ├── sw.js                 # Service Worker for offline caching
│   ├── assets/
│   │   ├── icon-192.png      # PWA App Icon (192x192)
│   │   └── icon-512.png      # PWA App Icon (512x512)
│   ├── css/
│   │   ├── style.css         # Cyber-HUD glassmorphism design system
│   │   └── watermark.css     # CC MOTOCRAFTS official watermark hologram print styles
│   └── js/
│       ├── app.js            # 2W/4W switcher, 3D engine canvas HUD, gateway modals
│       ├── booking-app.js    # Dedicated Booking & Warranty App + Customer Trolley
│       ├── portfolio.js      # 2W & 4W Workshop Action Gallery & Inspection Modal
│       ├── partner-dashboard.js # Partner profile, GST toggles & watermark invoice engine
│       ├── hts-engine1.js    # Technical AI, speech recognition/TTS & sound analyzer
│       ├── hts-engine2.js    # Service advisor, customer search & warranty engine
│       ├── customer-portal.js # Customer 4-step OTP, live bay camera & job cards
│       └── admin-portal.js   # Central Verification Desk & network analytics
└── scripts/
    └── test_endpoints.js     # Automated API & security verification test suite
```

---

## 5. Quickstart & Deployment

Because the server is engineered with pure Node.js standard libraries (`http`, `fs`, `path`, `crypto`, `url`), it runs out of the box with zero npm install requirements:

```bash
# 1. Unzip the package
unzip ccmotocrafts_master_platform.zip
cd ccmotocrafts-platform

# 2. Run the application
node server.js
```
Open `http://localhost:3000` in your browser.

---
*CC MOTOCRAFTS Automotive Intelligence Labs © 2024–2026. All rights reserved.*

---

## 6. GitHub Pages Deployment Guide (`atshaikshahrukh-oss.github.io/Shaik/`)

Because all asset paths are strictly relative (`css/style.css`, `js/app.js`, etc.) and all critical Cyber-HUD styling is inlined into `<head>`, the platform will **NEVER appear as a blank white page** on GitHub Pages or custom subpaths:

1. **Upload Files to GitHub:**
   * Unzip `ccmotocrafts_master_platform.zip`.
   * Open your GitHub repository (`Shaik`) and upload all files from inside `ccmotocrafts-platform/` directly to the repository root.
   * Ensure `index.html` is in the root directory alongside `css/`, `js/`, `data/`, and `assets/`.
2. **Enable GitHub Pages:**
   * Go to **Settings** ➔ **Pages**.
   * Under **Branch**, select `main` (or `master`) and folder `/(root)`.
   * Click **Save**.
3. **Instant Live Result:**
   * Open `https://atshaikshahrukh-oss.github.io/Shaik/`.
   * The complete dark aerospace theme, 3D rotating engine HUD, all 30 portfolio cards with direct WhatsApp `[Book Service]` modals, HTS AI diagnostic chat, and customer tracking will render with 100% functionality and zero dependencies.

---
