# DocAna

A minimal, chat-style AI assistant web app — ask a question, get an answer with a typing effect.

Built for anyone who wants a simple AI chatbot frontend wired to a backend API, with zero build tools and zero dependencies to install.

## What it does

Everything observed in the code:

- 💬 **Chat interface** — a clean chat window where your messages appear on one side and the assistant's replies on the other
- ✍️ **Send with Enter or click** — type a question (or press Enter) and it's posted to the backend; empty messages are ignored
- ⌨️ **Typing effect** — replies stream out character-by-character like a real assistant, and the chat auto-scrolls as it types
- 🧠 **Backend-powered answers** — each question is sent as a `POST` to `/ask` on the configured backend (`https://backend-eta-dusky.vercel.app`), and the `reply` field from the response is shown
- 🧭 **Nav bar** — hamburger menu that slides the Home / About / Contact links open and closed (Contact links to a WhatsApp number), plus a "Sign in with Google" button in the nav
- 🎨 **Icons via Font Awesome** — menu, send, add, and Google brand icons from the Font Awesome 6.4.2 CDN

## Tech stack

From the actual files in the repo — no build step, no frameworks:

- **HTML5** — page structure (`index.html`)
- **Vanilla CSS3** — all styling (`style.css`), responsive viewport meta tag included
- **Vanilla JavaScript** — chat logic, fetch calls, typing animation (`script.js`)
- **Font Awesome 6.4.2 (CDN)** — icons
- **Backend** — the frontend expects a backend at `https://backend-eta-dusky.vercel.app/ask` that accepts `{ "question": "..." }` and returns `{ "reply": "..." }`

## Project structure

```
DocAna/
├── index.html   # Page structure: nav, chat area, input box
├── style.css    # All styling (nav, chat bubbles, input, responsive bits)
└── script.js    # Chat logic: send question → fetch backend → typing-effect reply
```

## Run it locally

There are no build tools or packages to install — it's plain static files:

1. Start any static file server from the repo root, for example:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
2. Open `http://localhost:8000` (or whichever port your server uses) in a browser.

Or just double-click `index.html` to open it directly.

> Note: answers come from the live backend at `https://backend-eta-dusky.vercel.app/ask` — you need an internet connection and a running backend for replies to work. If the request fails, the app shows a "check your connection" message in the chat.

## Notes

- The `about.html` page linked in the nav is not part of this repo (the link will 404).
- The "Sign in with Google" button is present in the nav but has no sign-in logic wired up yet — it's decorative at this stage.
- The backend URL is hardcoded in `script.js` as `VERCEL_BACKEND_URL` — change that constant to point at your own backend if you're forking this.
