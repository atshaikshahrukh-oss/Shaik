# CC Motocrafts — Production Audit & Repair Report
Audit date: 04 November 2026
Input archive: `3 index.zip`

## Deliverable status
This package is a cleaned, root-level audit copy of the supplied archive. It is **not certified production-ready**. The front-end source is present, but the supplied archive does not contain a production backend, database, authentication service, mail provider integration, AI API integration, camera infrastructure, or scheduled-job service. Those cannot be truthfully completed by editing static HTML alone.

## What was inspected
- 48 ZIP entries (including 5 HTML pages, 3 manifests, a service worker and 28 portfolio photographs).
- JavaScript syntax in `index.html`, `customer.html`, `garage.html`, `admin.html`, `owner.html`: all passed `node --check`.
- Local static references: the HTML pages mostly resolve their local references; the customer page contains a template expression for a dynamic portfolio image, which is not a missing file by itself.
- No Supabase or Firebase client, no API `fetch()` calls, and no server endpoint were found in the five HTML pages.
- The app data in partner/admin/owner pages is embedded sample JSON and is not a shared live database.

## Repairs made in this audit copy
1. Flattened the archive so the website files are at the ZIP root, rather than nested inside `3 index.html/ccmotocrafts_master_platform/`.
2. Changed the customer PWA manifest start URL to `customer.html`.
3. Changed the partner PWA manifest start URL to `partner.html`.
4. Added a separate `manifest-admin.json` and connected `admin.html` to it.
5. Added a local SVG app icon and updated the manifests to use it instead of missing PNG files.
6. Removed the owner passcode (`cc102`) as an accepted manager-panel login code. This is only a front-end correction; it is not a substitute for server-side role authorization.
7. Preserved the supplied website pages, portfolio photographs and other assets.

## Production blockers — must be implemented and tested before launch

### A. Backend and identity
- Deploy a real backend and database (for example, Supabase or a secured custom API).
- Move all authorization checks to server-side policies. Never keep owner, manager or partner passcodes in HTML/JavaScript.
- Implement distinct roles: customer, garage partner, operations manager and owner.
- Enforce owner-only partner approval/block/deletion and privileged configuration on the server.
- Enforce assignment-based partner access: a partner can only read/update jobs assigned to that partner. Partner must not self-assign.
- Add audit logs for assignment, stage changes, partner status and privileged actions.
- Remove all demonstration customer/partner records and replace them with consented test data.

### B. Independent 2W and 4W AI
- No connected AI API or two separately enforced assistant services were present.
- Create separate 2W and 4W system prompts, routes, vehicle schemas and validation. Reject out-of-domain requests or route them to the correct assistant explicitly.
- Add a safety layer: no definitive remote diagnosis, no unsafe repair instructions, and advise inspection for safety-critical faults.
- Store API keys only on the server. Add rate limits, logging and customer consent.
- AI-generated WhatsApp booking text is not a booking until the customer confirms and the backend records it.

### C. Booking and dispatch
- Implement a durable booking endpoint, unique booking IDs, validation, duplicate-submit protection and status history.
- Store customer details and location securely with access controls and retention rules.
- Admin must assign jobs; partner accept/reject must update the backend and notify the admin.
- Implement dispatch notifications via approved WhatsApp Business Platform provider/webhooks if automatic outbound messages are required. A `wa.me` link only opens a prefilled message for a person to send.
- Implement actual email delivery through an authenticated mail provider. Static HTML cannot send email reliably or securely.
- Configure and verify `info@ccmotocrafts.in`, `aisupport.on@gmail.com` and the operations recipient in backend secrets/configuration. The operations recipient is not specified in the source blueprint and must be supplied.

### D. Live tracking and CCTV
- No verified camera streaming or GPS telemetry backend exists in the archive.
- Integrate an authorized camera/stream provider and customer-specific access tokens; do not expose camera URLs publicly.
- Implement consent-based GPS updates and server-side access checks.
- SEC-DEV-412 must be implemented as a real state machine with a clear, truthful synchronization status. Do not imply a live feed exists while it is paused or disconnected.

### E. Review routing
- The supplied archive has no verified Google Business Profile review URL or review-routing service.
- A 4–5 star prompt can offer a voluntary Google review link; a 1–3 star response can offer a private support channel. Do not suppress, manipulate or condition public reviews based on rating. All customers must remain free to post honest reviews.
- Add valid LocalBusiness structured data only with verified business details.

### F. Backups, invoices and PWA
- The midnight backup button currently only displays a success message. Add a server-side scheduled backup, encrypted storage, retention, restore tests and failure alerts.
- GST invoice generation requires validated seller/customer data, invoice numbering and tax rules; the current browser calculator is not compliant billing by itself.
- Confirm HTTPS, hosting rewrite rules, PWA service-worker registration/scope and install tests on the actual Hostinger and GitHub Pages URLs.
- Test every route and deep link on both hosting targets. GitHub Pages project sites may need a base-path-aware deployment configuration.

## Key source findings
- `admin.html` contained an operations login condition accepting both `cc103` and `cc102`; the audit copy now accepts only `cc103`, but the remaining client-side passcode is still not secure.
- `garage.html` contains a universal fallback passcode and hardcoded partner credentials. These are demo-only and must be replaced by backend authentication.
- Admin/owner/garage pages contain hardcoded sample bookings and partner records.
- Partner acceptance and job-stage functions primarily change page content or in-memory JavaScript data; they do not persist to a shared backend.
- `triggerMidnightBackup()` displays an alert claiming a backup was sent; it does not create or send a backup.
- Email routing configuration updates browser memory and does not send mail.
- WhatsApp actions open `wa.me` links and require a human to press Send.
- `owner.html` contains browser-side partner deletion and status toggles. These are not secure until backed by owner-authorized server endpoints.
- The supplied `sw.js` lists CSS/JS paths that are not present in this archive, and no service-worker registration was found in the five inspected HTML pages.

## Release decision
**Do not deploy this archive as a live multi-role production platform yet.** It is a front-end prototype/audit copy. Backend, role security, AI separation, notifications, camera/GPS, backups and end-to-end tests remain release blockers.

## Deployment safety
The ZIP does not alter DNS, nameservers, MX records or Hostinger email settings. Back up the current `public_html` before any deployment. Test the package in a separate preview directory first.
