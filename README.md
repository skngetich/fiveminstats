# 5-Min Stats

A simple mobile web app for tracking basketball team shooting stats in the **first and last 5 minutes of each quarter**, plus overtime.

**Live app:** https://skngetich.github.io/fiveminstats/

## Features

- Track 3PT, 2PT and FT **made / missed** for both teams
- First 5 min and Last 5 min for each quarter (Q1–Q4)
- Overtime tracked as one period (all OTs combined)
- Live points and shooting percentages while you tap
- Undo the last entry
- Stats view per quarter, OT, and whole-game totals (FG%, 3P%, FT%, points)
- Share or copy the stats as text
- Editable team names
- **Multiple saved games:** start a new game, reopen or delete past games
- **Works offline:** installable app (PWA), so it runs in a gym with no signal
- Saves automatically on the device, so a refresh won't lose a game

## Usage

1. Open the live link on your phone and add it to your home screen:
   - **iPhone:** Share → Add to Home Screen
   - **Android:** ⋮ menu → Add to Home screen
2. Tap the team names to rename them.
3. Pick the quarter (Q1–Q4 or OT) and First 5 / Last 5, then tap ✓ for made or ✗ for missed.
4. Open **Stats** to see the summaries and share them.
5. Tap **☰ Games** to start a new game or switch to a saved one.

Open the app once while online and it will then work offline. Saved games stay on that phone; they are not synced between devices.

## Development

No dependencies or build step:

- `index.html` – the whole app
- `sw.js` – service worker for offline support (bump `CACHE` when the asset list changes)
- `manifest.webmanifest` and `icons/` – install settings and icons

Serve the folder locally (the service worker needs http, not `file://`):

```bash
python -m http.server 8123
```

Pushing to `main` deploys to GitHub Pages.
