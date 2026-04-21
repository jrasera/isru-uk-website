# ISRU UK Website

Hosted on GitHub Pages at [isru.uk](https://isru.uk).

## File Structure

```
index.html          ← Home page
people.html         ← Management Committee + Directorate Heads
news.html           ← News feed (powered by Google Sheet)
events.html         ← Events calendar + meetings archive
resources.html      ← Links and documents
assets/
  css/style.css     ← All shared styles
  js/main.js        ← Nav, footer, Google Sheet reader, animations
```

The nav and footer are generated automatically by `main.js` — **edit them in main.js only**, and they'll update across every page.

---

## Setting Up the Google Sheet News Feed

1. Create a new Google Sheet
2. In **Row 1**, add these exact column headers:
   ```
   date | title | category | summary | link
   ```
3. Fill in your news items. Categories can be: `Meeting`, `News`, `Funding`, `International`, `Outreach`
4. Go to **File → Share → Publish to web**
5. Choose **Sheet1** and **CSV** format, then click **Publish**
6. Copy the URL it gives you
7. Open `assets/js/main.js` and replace:
   ```
   const NEWS_SHEET_URL = 'YOUR_NEWS_SHEET_CSV_URL_HERE';
   ```
   with your URL.

---

## Setting Up the Meetings Sheet

Same Google Sheet, second tab (or a separate sheet):

1. Add a second tab called `Meetings`
2. Row 1 headers:
   ```
   date | title | description | slides_link | recording_link | type
   ```
3. Publish this tab as CSV too (same process — select the Meetings tab)
4. In `main.js`, replace `MEETINGS_SHEET_URL` with the new URL

---

## Setting Up the Google Calendar

1. Create an ISRU UK Google Calendar (or use an existing one)
2. Go to Google Calendar → Settings → click your calendar → **Integrate calendar**
3. Copy the **Embed code** (it's an `<iframe>` tag)
4. Open `events.html` and find the comment block starting with `TO SET UP THE CALENDAR`
5. Replace the entire `<div class="calendar-setup">` placeholder block with your iframe
6. Recommended height: `600px`

Share edit access to the calendar with Patrick and Hannah so they can add events directly.

---

## Adding a News Item (once Google Sheet is connected)

1. Open the Google Sheet
2. Add a new row with date, title, category, summary, and optional link
3. The website updates automatically — no code changes needed

---

## Updating People

Edit `people.html` directly. Each person has a `person-card` block — copy/paste to add new members.

To add a photo: upload the image file to GitHub (e.g. `assets/images/hannah.jpg`) and replace:
```html
<div class="person-photo-placeholder">👤</div>
```
with:
```html
<img src="assets/images/hannah.jpg" alt="Dr Hannah Sargeant">
```

---

## Deploying Changes

Push any file change to the `main` branch on GitHub — the site deploys automatically via GitHub Pages within ~1 minute.
