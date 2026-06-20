# Security

## Project type
This is a static GitHub Pages/localStorage application. It should not require server credentials, API keys, customer secrets or privileged tokens in the repository.

## Rules
- Do not commit secrets, tokens, passwords, cookies, customer private data or environment files.
- Do not add analytics, advertising pixels, telemetry, hidden redirects, external trackers or third-party scripts without explicit approval.
- Do not expose private customer/business data on public pages.
- Do not change DNS, GitHub Pages source, custom domain, repository visibility or access permissions without explicit approval.
- Do not add destructive data-clearing behaviour without explicit approval and backup/export wording.
- Keep all workflow changes small, reviewable and tested before deployment.

## Data handling
- Vehicle data is stored in browser localStorage on the device using the site.
- Users should export backups before clearing browser data or switching PCs.
- The live GitHub Pages site only hosts static files; it does not provide shared server-side storage.

## Deployment checks
Before any live deployment:
- Check git diff for accidental secrets or private data.
- Run syntax and workflow validation scripts.
- Run a local browser console check.
- Confirm the live site builds and has no browser console errors after push.
