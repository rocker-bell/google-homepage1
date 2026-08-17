# Google Homepage Clone

A modern, responsive, and accessible replica of the official Google Search homepage built with semantic HTML5, modern vanilla CSS (Light & Dark themes), and vanilla JavaScript.

---

## ✨ Features

- **Authentic Google UI/UX**:
  - Crisp, scalable SVG Google Logo.
  - Interactive search pill with hover and focus elevation shadows.
  - Search buttons ("Google Search" and "I'm Feeling Lucky") with exact Google color tokens.
  - Two-tier responsive footer (location bar + policy & settings links).
- **Interactive Search**:
  - Live query redirect to Google Search (`https://www.google.com/search?q=...`).
  - "I'm Feeling Lucky" redirect to Google Doodles or top search hit (`btnI=1`).
  - Dynamic **Autocomplete Suggestions** with matching keyword bolding and keyboard navigation (<kbd>↑</kbd>, <kbd>↓</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>).
  - Clear button (`×`) that toggles dynamically based on text presence.
- **Web Speech API Voice Search**:
  - Live microphone listening dialog with pulse wave animation and real-time speech transcription.
- **Google Lens Modal**:
  - Drag-and-drop or file upload zone for image search simulation.
- **Google Apps 9-Dot Launcher**:
  - Authentic grid menu with Google services (Search, Maps, YouTube, Play, News, Gmail, Meet, Drive, Calendar).
  - Outside click dismissal and keyboard accessibility.
- **Dark Mode / Light Mode Switcher**:
  - Instant theme toggle with smooth CSS transitions.
  - Automatic system preference detection (`prefers-color-scheme`) and `localStorage` persistence.
- **Fully Responsive**:
  - Adapts fluidly across mobile (320px+), tablet, and desktop screens without horizontal scrollbar bugs.

---

## 📁 Project Structure

```
google-homepage1/
├── images/            # Graphic assets & fallback icons
├── index.html         # Semantic HTML5 markup
├── style.css          # CSS Variables, Design tokens, animations, responsive rules
├── app.js             # Logic for Search, Suggestions, Speech API, Apps grid, Themes
├── README.md          # Project documentation
└── introduction.txt   # Original project notes
```

---

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Alternatively, use a local development server such as VS Code Live Server or:
   ```bash
   npx serve .
   ```

---

## ⌨️ Keyboard Shortcuts & Interactions

- <kbd>Enter</kbd> in search box: Execute search.
- <kbd>Arrow Down</kbd> / <kbd>Arrow Up</kbd>: Navigate autocomplete suggestions.
- <kbd>Escape</kbd>: Close open modals, popups, or autocomplete dropdown.
- Click Voice Search button: Speak a query to automatically search.
