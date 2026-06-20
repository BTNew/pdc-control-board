# Local preview

This folder is a live-edit working copy of the PDC Control Board prototype.

## Preview URL

http://127.0.0.1:8124/index.html

## Start preview server

Windows:

```bat
start-preview.bat
```

Git Bash / macOS / Linux:

```sh
./start-preview.sh
```

The server serves the current folder. After editing `index.html`, `styles.css`, `app.js`, or `data.js`, refresh the browser to preview the change.

## Current prototype limits

This is still a static localStorage-only prototype. It is good for local preview and workflow validation, but it is not yet a shared multi-user production system. A live shared version needs backend login, permissions, database storage, realtime updates, server-side audit logs, file storage, and backups.
