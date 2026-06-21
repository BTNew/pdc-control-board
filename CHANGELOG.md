# Changelog

## 2026-06-21 — Parts and production rule alignment
- Aligned Parts statuses to PDC wording: Not Required, Not Ordered, On Order, Issued, Misc Acc and Stoppage.
- Kept Parts search/table/export focused on parts and production by removing salesperson fields from those views.
- Removed the RFT salesperson notification prompt so RFT transfer stays production-only.
- Added regression coverage for parts status rules and no-salesperson RFT prompts.

## 2026-06-20 — Role-focused visual management refresh
- Reworked the Parts department page copy so it clearly hides Navision notes and production-only noise.
- Reordered Parts summary cards to surface Stoppages first, then open/order/waiting/complete work.
- Reordered Parts table columns around actionability: status, stock, ETA/age, blocker, actions, then supporting context.
- Highlighted stoppage rows and cards more strongly so blockers are visible first.
- Added focused PMB bay guidance per work stream: Fabrication, Tint, Build, Electrical and Sublet.
- Simplified PMB bay cards to show the current station status rather than all department job markers.
- Clarified PMB board guidance that vehicles land in Unallocated first and are manually assigned to production streams.
- Added documentation set: PROJECT_BRIEF, CHANGELOG, TODO, BUGS and SECURITY.

## 2026-06-20 — Startup and PMB landing fixes
- Fixed missing runtime references for status tabs/header mapping/status category labels.
- Preserved PMB first-landing behaviour so imported requirements do not auto-bucket vehicles.
- Reordered job markers to T, B, P, E, S, F.
- Added local browser console and Navision/PMB validation helpers.
