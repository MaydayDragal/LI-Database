# 🗄️ LI Document Database

A **single-file, install-free** database for your Mercedes-Benz LI documents. It runs in
your browser, stores everything **locally on your machine**, and needs **no admin rights,
no installer, and no internet** (except the first time you use OCR on scanned files).

It has the LI renamer built in: on import it reads each PDF's **document number, version,
title, function group, date and validity**, and lets you search, browse, preview, edit,
and export properly-named copies.

---

## Getting started (no admin needed)

1. Copy **`LI-Database.html`** somewhere on your PC (e.g. your Documents folder or a network
   drive you can reach).
2. **Double-click it** — it opens in your default browser. For best results use **Microsoft
   Edge** or **Chrome** (both are on virtually every Windows machine).
3. **Install it as an app** (recommended, no admin rights needed): click the
   **📌 Install** button in the app — it walks you through three options:
   - **Desktop shortcut** (works even on locked-down work PCs, nothing to download):
     copy the ready-made command it shows, then desktop right-click → **New → Shortcut** →
     paste → name it. Then give it the proper icon: **⬇ Download icon (.ico)** from the same
     dialog, save it next to `LI-Database.html`, and shortcut → Properties → **Change Icon…**
     → Browse to it.
   - **Edge**: **⋯ → Apps → Install this site as an app** (Edge keeps a separate copy of the
     database — move your documents once with Auto-save/Backup + Restore).
   - **Automatic installer (.bat)** — one double-click, but some workplaces block downloaded
     scripts; if Windows says "Your Internet security settings prevented these files from
     being opened", use the desktop-shortcut option instead.

   If you later move `LI-Database.html` to a different folder, redo the install so the icon
   points at the new location.

That's it. There's nothing else to install.

---

## Using it

- **Import** — click **＋ Import PDFs**, then drop files in or tick *"Pick a whole folder"*
  to select your entire LI folder at once. It reads each PDF and adds it to the database.
  Re-importing the same LI number + version just updates that entry (no duplicates), and
  any manual corrections you made to its title/details are kept.
- **Search / filter** — type in the search box (matches LI number, title, function group, or
  the full text of the document). Filter by function group; click any column to sort.
- **Star favorites** — click the ☆ in a row (or in the document view's header) to mark documents
  you use often. The **★ Starred** toolbar button filters to just your favorites, the ★ column
  header sorts starred first, and stars are saved with the database (they survive re-imports
  and are included in backups).
- **One row per document** — multiple versions of the same LI number are grouped into a single
  row (e.g. “v3 · 3 versions”). Open it to get a large PDF viewer on the left and the details/
  download panel on the right.
- **Version picker** — switch between versions from the dropdown at the top of the viewer.
- **Compare versions** — for multi-version documents, pick two versions and **Show differences**.
  The two PDFs are shown **side by side** with the changes highlighted **on the pages themselves**
  (removed words shaded red on the old version, added words shaded green on the new one), and the
  two panes scroll together. A **Text** toggle switches to a compact word-level text diff instead.
  Repeating page furniture (headers, footers, page numbers, print dates) is ignored, so text that
  merely reflows to a different page between versions isn't flagged as a change. Content that was
  only **moved** (e.g. reordered table rows) isn't highlighted either — the summary notes how many
  words moved.
  Scanned PDFs without a text layer still show side by side, but can't be highlighted.
- **Details** — document number, version, title, **reason for change**, function group, date and
  validity are all shown and editable. **↻ Re-read PDF** re-extracts every field from the stored
  PDF (useful after the app's reader improves) while keeping anything you edited by hand. **Download renamed** gives a Windows-safe copy named
  `LI54.21-P-080326_3 Vehicle handover cannot be performed.pdf`.
- **Bulk export** — select rows (or none = all shown) and **⬇ Export renamed (ZIP)** to get a
  ZIP of correctly-named PDFs.
- **Scanned PDFs** — if a file has no text layer, tick **"Run OCR on scanned PDFs"** at import
  time to read it with OCR (slower; needs internet the first time to fetch the OCR engine,
  then it's cached).

## Backups (important)

Your data lives in the browser's local storage for this file. It persists between sessions,
but to be safe and portable:

- **🔄 Auto-save** — click it once and pick a location (a flash drive, a network share, your
  Documents folder…). From then on the whole database is **automatically written to that file
  a moment after every change** — imports, edits, stars, deletions. The button shows the
  last-saved time; click it again to turn auto-save off. After closing and reopening the app,
  the browser's security rules may need one click — the button reads *"click to resume"* and
  asks you to re-allow access to the same file. (Needs Edge or Chrome.)
- **💾 Backup** saves your whole database (all PDFs + details) to a single `.lidb` file
  on demand.
- **↥ Restore** loads a `.lidb` file — including one written by auto-save — on any machine,
  so you can move your database between computers or recover it if browser data is cleared.

## Good to know

- **Capacity** — comfortably handles 1000+ documents (your ~1000 files are roughly 80 MB;
  the browser database holds far more).
- **Privacy** — nothing is uploaded. Everything runs and stays on your computer.
- **Engine** — PDF reading (PDF.js) and ZIP (JSZip) are built into the file, so it works
  offline. Only OCR of scanned files fetches its engine from the internet the first time.
- **Where's my data?** — it's stored under the browser profile for this file (IndexedDB).
  Clearing browser data or using a different browser/profile starts fresh — that's what the
  **Backup/Restore** buttons are for.
