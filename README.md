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
- Saves automatically in the browser, so a refresh won't lose the game

## Usage

1. Open the live link on your phone and add it to your home screen:
   - **iPhone:** Share → Add to Home Screen
   - **Android:** ⋮ menu → Add to Home screen
2. Tap the team names to rename them.
3. Pick the quarter (Q1–Q4 or OT) and First 5 / Last 5, then tap ✓ for made or ✗ for missed.
4. Open **Stats** to see the summaries and share them.

## Development

It's a single `index.html` with no dependencies or build step. Open it in a browser to run it locally. Pushing to `main` deploys to GitHub Pages.
