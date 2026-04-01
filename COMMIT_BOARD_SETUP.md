# Commit Board Setup Guide

## Environment Variables Required

Add these to your Netlify site settings (Site settings → Environment variables):

1. **COMMIT_BOARD_PASSWORD** - Set this to your desired password for posting notes
   - Example: "mySecurePassword123"
   - This password will be required in the form to post new notes

2. **NETLIFY_API_TOKEN** (if not already set)
   - Get from: Netlify User Settings → Applications → Personal Access Tokens
   - Create new token with full access

3. **SITE_ID** (if not already set)
   - Found in: Site settings → General → Site details → API ID
   - Or in your site URL

## Testing Steps

1. **Deploy the site**
   ```bash
   npm run build
   # Or push to git if using automatic deploys
   ```

2. **Visit the commit board**
   - Navigate to: https://your-site.netlify.app/commit-board.html

3. **Test submission**
   - Enter a note (max 160 characters)
   - Enter your password (set in COMMIT_BOARD_PASSWORD env var)
   - Click "Commit Note"
   - Should see success message and note appear below

4. **Test calendar rendering**
   - Submit notes on different days
   - Calendar should show activity with different intensity colors:
     - Level 0 (light): No notes
     - Level 1: 1-2 notes
     - Level 2: 3-4 notes
     - Level 3: 5-6 notes
     - Level 4 (dark): 7+ notes

5. **Test validation**
   - Try submitting without password → Should fail
   - Try submitting empty note → Should fail
   - Try exceeding 160 characters → Should be blocked by maxlength

6. **Test calendar interactions**
   - Hover over calendar cells to see tooltip with count and date
   - Check that month labels appear correctly
   - Verify responsive design on mobile

## Features Implemented

✅ Password-protected write access (owner-only)
✅ Public read access (no auth needed to view)
✅ 160-character limit with live counter
✅ GitHub-style contribution calendar (52 weeks)
✅ Intensity levels based on daily note count
✅ Chronological note display grouped by date
✅ Relative timestamps (e.g., "2h ago")
✅ Responsive design for mobile
✅ LocalStorage fallback for offline viewing
✅ Optimistic UI updates

## File Structure

```
commit-board.html              # Main page
netlify/functions/
  submit-note.js               # Authenticates and submits notes
  get-notes.js                 # Fetches all notes
stylez.css                     # Calendar + commit board styles (lines 753+)
```

## Troubleshooting

**Notes not appearing after submission:**
- Check browser console for errors
- Verify environment variables are set correctly in Netlify
- Check Netlify Function logs for errors

**Calendar not rendering:**
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify notes have valid timestamps

**Password not working:**
- Double-check COMMIT_BOARD_PASSWORD value in Netlify env vars
- Remember it's case-sensitive
- Clear browser cache and retry

**Calendar overflow on mobile:**
- Calendar container has horizontal scroll enabled
- Can reduce number of weeks shown by modifying `weeks` variable in JavaScript

## Future Enhancements (Optional)

- Add note editing/deletion via Netlify Forms UI
- Export notes as JSON/Markdown
- Add simple tagging system (#dev, #life, etc.)
- Show total note count and current streak
- Add date range filter
- Make some notes private (visible only when authenticated)
