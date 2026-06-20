# Bugs / Watch List

## Open watch items
- RFT gate logic should be reviewed with real-world examples to confirm every required job blocks RFT until signed off.
- Browser localStorage data depends on each PC/browser. Users must export backups before clearing browser data or switching machines.
- Parts currently treats imported vehicles as needing Parts follow-up until signed off; confirm with Craig if exceptions are needed.
- Wide tables may still require horizontal scrolling on smaller screens.

## Recently addressed
- Missing app references causing startup/runtime issues were fixed.
- PMB first-landing protection was added so imported requirements do not bypass Unallocated.
- Parts page was cleaned up to avoid irrelevant Navision/production-only fields.

## Regression checks required before live push
- JavaScript syntax checks pass.
- Navision/import validation helper passes.
- Local browser console has no errors.
- Live GitHub Pages browser console has no errors after deployment.
- PMB Unallocated and manual bucket rules still work.
