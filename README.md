# 🗄️ LI Document Database

A **Progressive Web App (PWA)** database for your Mercedes-Benz LI documents. It runs in
your browser, stores everything **locally on your machine**, works **fully offline**, and
needs **no admin rights and no installer** (internet is only needed the first time you use
OCR on scanned files).

It has the LI renamer built in: on import it reads each PDF's **document number, version,
title, function group, date and validity**, and lets you search, browse, preview, edit,
and export properly-named copies.

---

## Getting started

### Option A — use it as a hosted PWA (recommended)

1. Open the app's URL in **Edge** or **Chrome** (see *Hosting* below — with GitHub Pages
   that's `https://<user>.github.io/LI-Database/`).
2. Click the **📌 Install** button in the app (or the install icon in the address bar).
   The browser installs it as a real app: its own window, its own Start-menu/desktop icon,
   no admin rights needed.
3. That's it. After the first visit the whole app is cached by a service worker, so it
   **opens and works with no internet at all** — your documents live in the browser's local
   database on your machine and are never uploaded.

### Option B — run it from a file (no hosting at all)

1. Copy **`index.html`** somewhere on your PC (e.g. your Documents folder or a network
   drive you can reach).
2. **Double-click it** — it opens in your default browser. For best results use **Microsoft
   Edge** or **Chrome** (both are on virtually every Windows machine).
3. **Install it as an app**: click the **📌 Install** button in the app — since browsers
   can't natively install a `file://` page, it walks you through three fallbacks:
   - **Desktop shortcut** (works even on locked-down work PCs, nothing to download):
     copy the ready-made command it shows, then desktop right-click → **New → Shortcut** →
     paste → name it. Then give it the proper icon: **⬇ Download icon (.ico)** from the same
     dialog, save it next to `index.html`, and shortcut → Properties → **Change Icon…**
     → Browse to it.
   - **Edge**: **⋯ → Apps → Install this site as an app** (Edge keeps a separate copy of the
     database — move your documents once with Auto-save/Backup + Restore).
   - **Automatic installer (.bat)** — one double-click, but some workplaces block downloaded
     scripts; if Windows says "Your Internet security settings prevented these files from
     being opened", use the desktop-shortcut option instead.

   If you later move `index.html` to a different folder, redo the install so the icon
   points at the new location.

## Hosting (for the PWA)

Any static host works — the app is just static files. The easiest is **GitHub Pages**:
repository **Settings → Pages → Deploy from a branch → `main` / root**. A minute later the
app is live at `https://<user>.github.io/LI-Database/` and installable from any machine.

The PWA pieces are:

| File | Purpose |
|---|---|
| `index.html` | the entire app (PDF.js and JSZip inlined) |
| `manifest.webmanifest` | app name, colors and icons for installation |
| `sw.js` | service worker — precaches the app for offline use, and caches the OCR engine after its first download |
| `icons/` | app icons (SVG + PNG, incl. maskable and Apple touch icon) |

Each visitor's database stays in **their own browser's IndexedDB** — hosting the app does
not share or upload any documents.

---

## Using it

- **Import** — click **＋ Import PDFs**, then drop files in or tick *"Pick a whole folder"*
  to select your entire LI folder at once. It reads each PDF and adds it to the database.
  Re-importing the same LI number + version just updates that entry (no duplicates), and
  any manual corrections you made to its title/details are kept. Imports run across multiple
  CPU cores, and scanned PDFs are OCR-read automatically.
- **📂 Sync folder** *(optional; Edge/Chrome)* — link your LI folder once, then click it any
  time to import just the **new or changed** PDFs from that folder (unchanged files are
  skipped, so it's fast). Hold **Shift** and click to link a different folder. Manual import
  still works exactly as before — this is an add-on, not a replacement.
- **Search / filter** — type in the search box (matches LI number, title, function group, or
  the full text of the document). Filter by **function group** or by **model series** (parsed
  from the Validity field, e.g. *Model 205*); click any column to sort.
- **Referenced documents** — when a bulletin cites other LI numbers in its text, the document
  view lists them as chips: click one to jump to that document (dimmed if you don't have it).
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
- **Scanned PDFs** — files with no text layer are **read with OCR automatically** at import
  time (slower than text files; needs internet the first time to fetch the OCR engine, then
  it's cached — and cached by the service worker too when run as a hosted PWA).

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
  offline. Only OCR of scanned files fetches its engine from the internet the first time;
  when the app runs as a hosted PWA, the service worker caches the OCR engine too, so even
  OCR works offline after its first use.
- **Where's my data?** — it's stored under the browser profile for this app (IndexedDB).
  Clearing browser data or using a different browser/profile starts fresh — that's what the
  **Backup/Restore** buttons are for.
