# Fork notes

This ZIP is a clean fork of the Broome Toyota tracker to use as the core for a new similar website. Browser storage keys, backup filenames, note keys, column-width keys and the QZ printer preference key have been renamed so this copy does not share saved data with the Broome Toyota tracker.

# Vehicle Tracking Core

Static prototype for vehicle tracking.

## Current workflow

1. Open `index.html` in a browser.
2. Go to **Uploads**.
3. Paste or upload the Navision plain-text export.
4. Use the dashboard filters, row checkboxes, ZPL labels, PO upload, Autocare despatch notice import, and CRM backup/restore.

## Backup / restore

Use **Export Backup** before replacing the website files with a new build. Restore the JSON backup in the new build to reload saved vehicles, edits, notes, PO ticks, Autocare results, deleted vehicles, and column widths.

## Latest changes

- Fixed bulk/single vehicle delete so deleting one selected Navision row no longer removes unrelated imported vehicles that happen to share broad matching keys.

- Removed the sidebar Attention box.
- Removed the Export CSV top-bar button; backup JSON is the restore workflow.
- Renamed the selected-row email button to **Email PDC**.
- Moved Waiting PD2, Waiting PD1, Vehicle Waiting For Wholesale, and Vehicle Delayed above Ready For Shipment and Planned for Production in the status sort/filter order.
- Existing vehicle rows now protect manual CRM edits during Navision refreshes. Navision updates only the core matching IDs plus Tray, Dealer Comments/Navision Notes, JITA, and location/status fields.
- Navision rows marked as **Cut But Vehicle** are highlighted light blue.


## 2026-06-18 build notes

- Locked the dashboard table order to: Select/SP, SN, P/Month, Client, Vehicle, Tint, Build PO, Build Complete, Tray Fitment Ordered, Tray Fitment Complete, Toyota Status, ETA, Navision Notes, JITA, Action.
- Autocare despatch now highlights rows orange without replacing the Navision Toyota Status value shown in the Toyota Status column.
- Navision refreshes now keep ETA source fields and Production Month current on existing rows while still protecting manual Build PO and Tint ticks.
- Vehicle popup now includes a Navision detail panel with Dealer Comments/Navision Notes plus key imported fields.
- Column-width storage was bumped to v8 so old saved widths do not break the revised column order.
- Added a logo fallback if the brand logo asset is not present in `assets/brand-logo.svg`.

## Latest changes - Navision notes and tray fitment

- Added a full **Navision Notes** table column showing Dealer Comments text, with hover tooltip and full text in the vehicle popup.
- Kept the narrow **!** Navision note indicator for quick scanning.
- Split tray status into **Tray Fitment Ordered** and **Tray Fitment Complete** columns.
- Added **Tray Fitment Complete** to the vehicle popup edit checks, detail metrics, Navision field section, backup/export state, and Navision confirmation review.
- Bumped saved table column widths to `v9` so older column widths do not corrupt the new wider table layout.


## Latest update - task/notes/build complete

- Removed the dashboard Task column.
- Removed the narrow ! Navision Notes indicator because Navision Notes now has its own full column.
- Added a protected Build Complete checkbox next to Build PO.
- Tightened the dashboard headers so longer preparation headers wrap onto two lines.


## Latest update

- Removed visible Generate ZPL label actions from the dashboard flow.
- Kept direct QZ Tray Print Labels as the normal workflow.
- Replaced angled checkbox headers with compact stacked/two-line headers.
- Autocare label actions now print directly instead of sending users through the ZPL generator.

## Latest patch

- Added the brand logo asset into `assets/brand-logo.svg` so it displays online as well as locally.
- Removed the always-visible top Email PDC button; Email PDC now only appears in the selected-row action bar.
- Added Print Labels to the selected-row action bar for QZ Tray Zebra printing.
- Fixed a JavaScript error in the selected-row panel that stopped the sticky/frozen table header from activating.


## QZ Tray printing fix

This build restores the QZ Tray browser script include so the static site can connect to the locally running QZ Tray service and send raw ZPL to the Zebra printer.


## Latest ETA rule

- Dashboard ETA now uses only Navision **ETA At Kewdale Yard** / Kewdale ETA.
- If the Kewdale ETA field is blank, dashboard ETA stays blank.
- ETA Date, Port/Plant ETA Date, and ETA At Dealer/BB are retained only as reference fields where imported; they are not used for the dashboard ETA.

- Moved **Vehicle Out on Consignment** into the **Released** status tab/category.

## Latest status grouping update

- Added a separate **YH / Yard Hold** dashboard status pill/tab.
- Rows are grouped into YH / Yard Hold when Navision Location Status is `YH`, or when the Toyota Status/Sub Location text contains Yard Hold.
- YH / Yard Hold rows now use their own sky-blue Toyota Status pill colour instead of being mixed into Hold/Waiting.
- Navision imports do not automatically delete vehicles missing from the new upload unless the cleanup checkbox is ticked and the import is applied. If cleanup is not ticked, the missing vehicles are listed with a manual remove button.

## PMG/PDC workflow rule update

- Navision imports now drive vehicle movement only up to **YH / Yard Hold**.
- Rows where Navision shows post-Yard-Hold movement such as PMB, body builder, RFT, ready for transport, out on consignment, or at dealer are skipped during import and reported in the import warnings.
- Added protected manual **PDC location** in the vehicle popup with options: Follow Navision until Yard Hold, YH, PMB, and RFT.
- The top pills use Navision for Production / In Transit and YH, then use the protected manual PDC location for PMB and RFT.
- Manual PMB/RFT vehicles are protected from the missing-vehicle cleanup so future Navision uploads do not remove vehicles already being worked through the PDC flow.

## Navision upload restore + sidebar cleanup

- Restored Navision uploads by making the post-Yard-Hold skip rule less aggressive. Only Navision **Location Status** and **Sub Location Description** decide whether a row is past Yard Hold. Dealer comments, vehicle notes and build-status wording no longer block a row from importing.
- Vehicles already at YH / Yard Hold, PMB, or RFT are protected from missing-vehicle cleanup.
- Removed the **Labels** item from the left sidebar. Direct selected-row **Print Labels** still remains available for Zebra/QZ Tray printing.

## YH to PMB transfer + PMB branch tiles

- Added a selected-row **Transfer to PMB** button. It enables only when every selected row is currently in **Vehicles at YH** / Yard Hold.
- Bulk transfer saves a protected manual PDC location of `PMB` and opens the **Vehicles at PMB** view after transfer.
- Clicking the **Vehicles at PMB** top pill now opens a PMB control-board branch underneath the top pills.
- PMB branch tiles are: **Fabrication**, **Tint**, **Build**, and **Sublet**.
- Added a protected **PMB work stream** dropdown in the vehicle popup so each PMB vehicle can be assigned to Fabrication, Tint, Build, or Sublet.
- The PMB branch tiles are clickable filters and the PMB work stream is included in search and CSV export.

## PMB drag board update

- Replaced the simple PMB branch tile area with a drag-and-drop PMB board.
- PMB vehicles now appear as draggable cards under **Unassigned**, **Fabrication**, **Tint**, **Build**, and **Sublet**.
- A PMB card can be dragged into Fabrication, Tint, Build, or Sublet to save its protected `pmbStage` manual work stream.
- PMB table rows are also draggable when the **Vehicles at PMB** pill/view is active, so users can drag directly from the list into a bucket.
- Dropping a vehicle into a bucket keeps its manual PDC location as `PMB`, stamps `pmbStageUpdatedAt`, refreshes counts, and keeps Navision from moving the vehicle backwards.
- The PMB board keeps the clickable filters: Show all PMB, Unassigned, Fabrication, Tint, Build, and Sublet.


## PMB visual control + RFT transfer update

- PMB cards now show colour-coded requirement markers: **F** Fabrication, **T** Tint, **B** Build, and **S** Sublet.
- PMB cards now show the number of days since **ETA At Kewdale Yard**, rather than the PMB transfer date.
- Transferring Yard Hold vehicles to PMB now stamps the PMB transfer date.
- The selected-row action bar now includes **Transfer to RFT**, enabled only when all selected vehicles are currently at PMB.
- PMB cards also include an **RFT** shortcut button for moving one vehicle directly from a bucket to Ready for Transport.
- After transferring to RFT, the website prompts whether to notify the salesperson. If no salesperson email is stored, it opens a draft email with the To field blank and the salesperson details in the body.

## PDC control-board requirements + accountability update

- Replaced the early dashboard tick-box columns with **TINT**, **BUILD**, **PARTS**, **SUBLET**, and **FABRICATION** requirement checkboxes.
- PMB cards now show those required jobs as small colour-coded markers.
- Clicking a PMB card marker signs the job off or removes the sign-off after confirmation.
- Completed markers show a tick and a circular outline so the department sign-off is visible on the PMB board.
- The vehicle popup now separates **Required work before RFT** from **Department sign-off / completed**.
- RFT transfer now drafts the notification email to **bryce.guthrie@broometoyota.com.au** with stock/order/customer/vehicle details plus completed and outstanding jobs.
- Added a browser-local PDC audit trail for PMB transfers, PMB bucket moves, RFT transfer, job requirement changes, and department sign-offs.
- CRM backup now includes the audit log storage key.

Important limitation: this is still a browser-only localStorage prototype. The audit trail is useful for a single browser or shared workstation, but it is not a true multi-user accountability system. For dozens of users, the next proper step is a backend with user login, shared database, permissions, and server-side audit events.

## Applied PDC best-practice controls update

- Navision/vehicle uploads now accept `.xlsx` Excel workbooks as well as `.txt`, `.tsv`, and `.csv` files. The workbook is parsed in the browser and converted into the existing import/review workflow.
- The importer still supports Navision columns, and now also recognises explicit PDC control columns when present: `TINT`, `BUILD`, `PARTS`, `SUBLET`, `FABRICATION`, `PMB Bucket`, `PDC Location`, `Blocked`, and `Blocked Reason`.
- Added PMB WIP limits to the drag board. Buckets show count/limit, oldest bucket age, and blocked count. Buckets change warning style when at or over their WIP limit.
- Added bucket-level ageing. PMB cards now show days since **ETA At Kewdale Yard** plus days in the current PMB bucket.
- Added blocked/exception control in the vehicle popup. Blocked vehicles show visually on the PMB board, table, TV board, search, CSV export, and RFT gate.
- Added an RFT gate check. Vehicles with outstanding required jobs, blocked status, or no PMB bucket trigger a warning before transfer to RFT. A manager override is allowed only when a reason is entered; the override is saved and logged.
- Added operator profile tracking. Staff can set their name/initials and department/role; future audit events record both.
- Added a TV Board view for large-screen PDC visual management: flow counts, PMB WIP limits, blocked/RFT-gate issues, and overdue bucket ageing.
- CSV export now includes blocked status, blocked reason, bucket days, RFT gate issues, and RFT override reason.


## Kewdale ETA ageing update

- The PMB vehicle age pill now uses **ETA At Kewdale Yard** as the start date. It no longer uses the PMB transfer timestamp for the main age number.
- Vehicles more than 90 days past Kewdale ETA flash orange.
- Vehicles more than 150 days past Kewdale ETA flash red.
- CSV export now labels this field as `Days Since Kewdale ETA`.

Important limitation remains: this is still browser/localStorage based. The visual controls and audit trail help on a shared workstation, but true dozens-of-users accountability still requires a backend, login, shared database, permissions, and server-side audit events.

## PMB station bay-board update

- Clicking a PMB work-stream header such as **Fabrication**, **Tint**, **Build**, or **Sublet** now opens that station's 15-bay work line under the PMB control board.
- Vehicles in that work stream can be dragged into a specific bay from 1 to 15, or dragged back to **Not in a bay**.
- Each bay vehicle card has a planned-hours field for the work being done at that station.
- Completing work from the bay card signs off the matching department job, stamps the operator/date, records the bay/hours in the audit trail, and updates the main PMB card marker with the circled tick.
- Once that station's work is complete, the bay card enables **Move to next station** for the next outstanding required PMB station.
- Moving to the next station clears the previous bay assignment so the vehicle can be dropped into a new bay in the next line.
- CSV export now includes PMB Bay, PMB Bay Hours, PMB Bay Started, and PMB Bay Completed.

## 2026-06-19 update

- Navision / spreadsheet imports now only add rows that have a real Batch / Stock number. Order-only rows are skipped with a warning.
- Added a sidebar PDC Lists page for managing mechanic names and sublet providers.
- Sublet bay cards can use the sublet provider list instead of the mechanic list.
- Removed the Clear Dashboard button from the visible website.
- Added a top dashboard pill for Parts Required, showing vehicles where parts are required and not signed off.

## 2026-06-19 workflow update

- Reordered the top dashboard pills so **Parts Required** is now third from the left: All Vehicles, Production / In Transit, Parts Required, Vehicles at YH, Vehicles at PMB, Vehicles RFT.
- Added **Electrical** as a full PDC work group and PMB station, including required/completed job flags, PMB bucket, 15-bay board, mechanic assignment, import mappings, review fields and CSV export.
- RFT transfer is now hard-blocked unless every required PDC job is signed off. The previous manager override prompt has been removed for RFT movement.
- The intended process is now enforced as **Vehicles at YH → Transfer to PMB → complete all required PMB/PDC boxes → Transfer to RFT**.

## 2026-06-19 update — movable dashboard columns

- Vehicle table columns can now be moved left/right from the dashboard by dragging the ↔ handle in the column header.
- Column order is saved in browser localStorage and is included in CRM backup/restore.
- Existing column resizing remains supported, with widths saved by column ID so resized columns keep their width after being moved.
- Added a Reset columns button on the dashboard to return to the default column order.

## 2026-06-19 update — Parts department home

- Added a sidebar **Parts** page for the parts department.
- Parts is no longer treated as a workflow bucket. Every imported vehicle with a real Batch / Stock number is treated as needing parts until the Parts department signs it off.
- The Parts page hides unrelated detail such as Navision notes and sublet requirements. It focuses on stock number, client, vehicle, ETA/Kewdale age, current stage, salesperson, parts status, stoppage reason and actions.
- Parts actions added: Mark Ordered, Mark Complete, Record Stoppage, Clear Stoppage.
- Parts stoppages are included in the RFT gate, so a vehicle cannot be moved to RFT while parts are outstanding or stopped.
- Added a Parts CSV export from the Parts page.

## 2026-06-19 update - Parts home and table spacing fix

Changes made:

- The top **Parts Required** pill now opens the dedicated **Parts Department** home screen instead of filtering the full Navision dashboard.
- The Parts page re-renders when opened from the sidebar or the Parts Required pill, so vehicles should appear immediately after data is loaded.
- The main dashboard vehicle table now uses wider, fixed column widths keyed by column ID rather than old nth-child widths. This keeps columns readable even after users drag columns left/right.
- Reset Columns now clears the old saved width settings as well as the column order.
- The Parts table received wider fixed columns for parts-only use.



## 2026-06-19 fix - contained top pills and PMB transfer

- Top KPI pills are locked to the visible dashboard width; horizontal scrolling is limited to the lower vehicle table.
- Added a visible header Transfer to PMB button and wired it to the same Yard Hold bulk transfer workflow.
- Yard Hold transfer detection now accepts manual YH, Navision Yard Hold wording, and Location Status YH.


## 2026-06-19 - Parts Required top pill temporarily removed

- Removed the top dashboard Parts Required pill for now.
- Parts department home screen remains available from the sidebar.
- Parts-required filtering logic is kept in the code so the pill can be added back later without rebuilding the Parts page.

## 2026-06-19 station bay completion update

- Station bay cards now only show the Complete action while a vehicle is in a production bay.
- Removed the direct Move to next station button from bay cards.
- Completing bay work now clears the bay assignment and returns the vehicle to a Work Started holding box in the same station screen.
- Completion still signs off the matching job marker so the main PMB/RFT cards show the circled tick.

## 2026-06-19 PMB/YH + production timeline fixes

- Production bay schedule is Monday-Friday only, 7:00am-5:00pm.
- Production timeline now initialises its live red Now line when the station screen opens.
- Now line updates every 15 seconds and auto-scrolls near current production time.
- Bay detail form now saves scheduled start, planned hours and mechanic/provider reliably using named form elements.
- Bay detail saves also force PMB manual location lock so Navision updates do not move the vehicle back to YH.
- YH to PMB transfer is more tolerant of Navision Yard Hold wording and locks transferred vehicles to PMB.
- PMB vehicles are removed from Yard Hold counts because manual PMB/RFT status has priority over Navision location.
- PDC job tick boxes have been made slimmer and colour-coded in modal screens and table cells.


2026-06-20 update:
- Slimmed PDC checkbox visuals in the main dashboard and modal.
- Bulk Yard Hold to PMB transfer now saves all selected vehicles in one batch and locks PMB location against future Navision updates.
- Selection is pruned to visible rows when a top pill filter is active, preventing hidden stale selections from disabling transfer buttons.


## 2026-06-20 batch matched / bay tile update

- Replaced the top **All Vehicles** pill with **Batch Matched**.
- **Batch Matched** shows imported vehicles with a real batch/stock number that are not in Production / In Transit and are not already manually in YH, PMB or RFT.
- Navision imports now keep every row with a real Batch / Stock number. Rows are no longer skipped only because Navision shows Body Builder, Dealer, Despatched, RFT or other post-transit wording.
- The default dashboard filter after import is now **Batch Matched**.
- Production bay screens were changed back from the calendar dispatch timeline to the cleaner 15-bay tile view.
- The bay tile view still lets staff drag vehicles into bays, set planned hours/mechanics/providers, and complete the station.


2026-06-20 update: compacted dashboard table columns, reduced PDC job column widths, and bumped saved column-width storage key to ignore old wide browser widths.


2026-06-20 update: PDC job columns are single-letter T/B/P/E/S/F, colour-coded, and a bulk Override to YH action was added.


2026-06-20 update: Vehicles transferred to PMB now always land in the Unallocated PMB bucket first. Required job ticks no longer auto-allocate a PMB work stream; vehicles only enter Fabrication/Tint/Build/Electrical/Sublet after being manually dragged there.
