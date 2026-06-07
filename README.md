# Ojasly BrainQuest Jr — Website

Live at: **www.ojasly.co.in** (via GitHub Pages)

---

## 📁 File Structure

```
ojasly-site/
├── index.html              # Landing page
├── worksheets.html         # Worksheets library
├── style.css               # Shared styles
├── worksheets.css          # Worksheet page styles
├── main.js                 # Shared JS (nav, animations, waitlist)
├── worksheets.js           # Worksheet loader (reads from data.json)
├── worksheets/
│   ├── data.json           # ← ONLY FILE YOU EVER NEED TO EDIT
│   ├── files/              # Put PDF worksheets here
│   └── thumbs/             # Put PNG thumbnails here (optional)
└── assets/                 # Logo, og-image, favicon
```

---

## ➕ How to Add a New Worksheet

**You only ever touch `worksheets/data.json`.** No code changes needed.

1. Drop your PDF into `worksheets/files/your-worksheet.pdf`
2. (Optional) Add a 300×400px PNG thumbnail to `worksheets/thumbs/your-worksheet.png`
3. Open `worksheets/data.json` and add a new entry:

```json
{
  "id": "ws-007",
  "title": "Subtraction Up to 20",
  "subject": "Math",
  "world": "Math Kingdom",
  "class": "Class 1",
  "description": "Step-by-step subtraction practice with visual aids.",
  "file": "worksheets/files/math-subtraction-20.pdf",
  "thumbnail": "worksheets/thumbs/math-subtraction-20.png",
  "pages": 3,
  "tags": ["subtraction", "math", "beginners"]
}
```

4. Commit & push. Done ✅

**Valid `subject` values:** `Math` | `English` | `Bengali` | `Science` | `Logic`

---

## 🚀 GitHub Pages Deployment

### First time setup

1. Push this repo to GitHub (e.g. `github.com/ojasly/brainquest-website`)
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)` → Save
4. Your site is live at `https://ojasly.github.io/brainquest-website/`

### Connect custom domain (www.ojasly.co.in)

**In GitHub Pages settings:**
- Add custom domain: `www.ojasly.co.in`
- Enable **Enforce HTTPS**

**In Spaceship DNS (your registrar):**

| Type  | Host | Value                          | TTL  |
|-------|------|--------------------------------|------|
| CNAME | www  | ojasly.github.io               | Auto |
| A     | @    | 185.199.108.153                | Auto |
| A     | @    | 185.199.109.153                | Auto |
| A     | @    | 185.199.110.153                | Auto |
| A     | @    | 185.199.111.153                | Auto |

DNS propagation takes 5–30 minutes. HTTPS certificate is auto-issued by GitHub.

---

## 🔔 Waitlist Form

The waitlist form in `main.js` currently shows a success message only (no backend call).
To wire it to your Supabase backend, uncomment and fill in the fetch() call in `main.js`.

---

## 📱 Social Links

- Facebook: https://www.facebook.com/profile.php?id=61588681892013
- Instagram: https://www.instagram.com/ojasly.brainquestjr/
