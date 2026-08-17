/**
 * Google Homepage Clone - Interactive Logic & Features
 * Includes: Search, Autocomplete Suggestions, Web Speech API Voice Search,
 * Google Lens Modal, Apps Menu, Profile Menu, Theme Toggle, Keyboard Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // DOM Elements
  // =========================================================================
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchBox = document.getElementById('search-box');
  const clearBtn = document.getElementById('clear-btn');
  const luckyBtn = document.getElementById('lucky-btn');
  const searchBtn = document.getElementById('search-btn');

  // Apps Menu & Profile
  const appsBtn = document.getElementById('apps-btn');
  const appsPopup = document.getElementById('apps-popup');
  const profileBtn = document.getElementById('profile-btn');
  const profilePopup = document.getElementById('profile-popup');

  // Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = themeToggleBtn.querySelector('.sun-icon');
  const moonIcon = themeToggleBtn.querySelector('.moon-icon');

  // Suggestions
  const suggestionsContainer = document.getElementById('suggestions-container');
  const suggestionsList = document.getElementById('suggestions-list');

  // Voice Search
  const voiceSearchBtn = document.getElementById('voice-search-btn');
  const voiceModal = document.getElementById('voice-modal');
  const voiceModalClose = document.getElementById('voice-modal-close');
  const voiceStatus = document.getElementById('voice-status');
  const voiceTranscript = document.getElementById('voice-transcript');

  // Lens Modal
  const lensSearchBtn = document.getElementById('lens-search-btn');
  const lensModal = document.getElementById('lens-modal');
  const lensModalClose = document.getElementById('lens-modal-close');
  const lensDropZone = document.getElementById('lens-drop-zone');
  const lensFileInput = document.getElementById('lens-file-input');

  // Location
  const userLocationEl = document.getElementById('user-location');

  // Language links
  const langLinks = document.querySelectorAll('.lang-link');

  // State
  let activeSuggestionIndex = -1;
  let currentSuggestions = [];
  let speechRecognition = null;

  // Preset query dictionary for autocomplete simulation
  const SUGGESTIONS_DATABASE = [
    'google translate',
    'google maps',
    'google flights',
    'google docs',
    'google drive',
    'google finance',
    'google earth',
    'google fonts',
    'google trends',
    'google classroom',
    'world news today',
    'weather forecast 10 days',
    'youtube music',
    'chatgpt login',
    'premier league standings',
    'calculator online',
    'speed test internet',
    'javascript documentation mdn',
    'python tutorial for beginners',
    'css flexbox guide',
    'how to learn web development',
    'crypto prices live'
  ];

  // =========================================================================
  // Theme Management (Light / Dark)
  // =========================================================================
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      document.documentElement.removeAttribute('data-theme');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  };

  const getPreferredTheme = () => {
    const saved = localStorage.getItem('google_clone_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Initialize theme
  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('google_clone_theme', currentTheme);
    applyTheme(currentTheme);
  });

  // =========================================================================
  // Search Functionality
  // =========================================================================
  const performSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
  };

  const performLuckySearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) {
      window.location.href = 'https://doodles.google/';
    } else {
      window.location.href = `https://www.google.com/search?btnI=1&q=${encodeURIComponent(trimmed)}`;
    }
  };

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (activeSuggestionIndex >= 0 && currentSuggestions[activeSuggestionIndex]) {
      performSearch(currentSuggestions[activeSuggestionIndex]);
    } else {
      performSearch(searchInput.value);
    }
  });

  luckyBtn.addEventListener('click', () => {
    performLuckySearch(searchInput.value);
  });

  // =========================================================================
  // Input Handling & Clear Button
  // =========================================================================
  const updateClearButton = () => {
    if (searchInput.value.trim().length > 0) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  };

  searchInput.addEventListener('input', () => {
    updateClearButton();
    renderSuggestions(searchInput.value);
  });

  searchInput.addEventListener('focus', () => {
    searchBox.classList.add('has-focus');
    if (searchInput.value.trim().length > 0) {
      renderSuggestions(searchInput.value);
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    updateClearButton();
    hideSuggestions();
    searchInput.focus();
  });

  // =========================================================================
  // Autocomplete Suggestions & Keyboard Navigation
  // =========================================================================
  const hideSuggestions = () => {
    suggestionsContainer.classList.add('hidden');
    searchBox.classList.remove('has-suggestions');
    activeSuggestionIndex = -1;
    currentSuggestions = [];
  };

  const renderSuggestions = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      hideSuggestions();
      return;
    }

    // Filter matching suggestions
    const matches = SUGGESTIONS_DATABASE.filter(item => item.toLowerCase().includes(q)).slice(0, 6);

    // If typed query doesn't match default list, generate relevant suggestions
    if (!matches.some(m => m.toLowerCase() === q)) {
      matches.unshift(q);
    }

    currentSuggestions = matches;
    activeSuggestionIndex = -1;

    suggestionsList.innerHTML = '';

    matches.forEach((suggestion, index) => {
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.setAttribute('role', 'option');
      li.setAttribute('data-index', index);

      // Highlight matching query
      const highlightedText = highlightMatch(suggestion, q);

      li.innerHTML = `
        <span class="suggestion-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </span>
        <span class="suggestion-text">${highlightedText}</span>
      `;

      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        searchInput.value = suggestion;
        performSearch(suggestion);
      });

      suggestionsList.appendChild(li);
    });

    suggestionsContainer.classList.remove('hidden');
    searchBox.classList.add('has-suggestions');
  };

  const highlightMatch = (text, query) => {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    const before = text.substring(0, idx);
    const matched = text.substring(idx, idx + query.length);
    const after = text.substring(idx + query.length);
    return `${before}<strong>${matched}</strong>${after}`;
  };

  // Keyboard navigation for suggestions
  searchInput.addEventListener('keydown', (e) => {
    if (currentSuggestions.length === 0 || suggestionsContainer.classList.contains('hidden')) {
      return;
    }

    const items = suggestionsList.querySelectorAll('.suggestion-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex + 1) % currentSuggestions.length;
      updateActiveSuggestion(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
      updateActiveSuggestion(items);
    } else if (e.key === 'Escape') {
      hideSuggestions();
    }
  });

  const updateActiveSuggestion = (items) => {
    items.forEach((item, idx) => {
      if (idx === activeSuggestionIndex) {
        item.classList.add('active');
        searchInput.value = currentSuggestions[idx];
      } else {
        item.classList.remove('active');
      }
    });
  };

  // =========================================================================
  // Web Speech API Voice Search
  // =========================================================================
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      voiceStatus.textContent = 'Listening...';
      voiceTranscript.textContent = 'Say something to search';
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const currentText = finalTranscript || interimTranscript;
      if (currentText) {
        voiceTranscript.textContent = `"${currentText}"`;
      }

      if (finalTranscript) {
        searchInput.value = finalTranscript;
        updateClearButton();
        voiceStatus.textContent = 'Searching...';
        setTimeout(() => {
          closeVoiceModal();
          performSearch(finalTranscript);
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      voiceStatus.textContent = 'Voice search error';
      if (event.error === 'not-allowed') {
        voiceTranscript.textContent = 'Microphone access was denied. Please allow microphone permissions.';
      } else if (event.error === 'no-speech') {
        voiceTranscript.textContent = 'No speech was detected. Please try again.';
      } else {
        voiceTranscript.textContent = `Error: ${event.error}`;
      }
    };

    recognition.onend = () => {
      if (voiceStatus.textContent === 'Listening...') {
        voiceStatus.textContent = 'Tap microphone to retry';
      }
    };

    return recognition;
  };

  const openVoiceModal = () => {
    voiceModal.classList.remove('hidden');
    voiceStatus.textContent = 'Listening...';
    voiceTranscript.textContent = 'Say something to search';

    if (!speechRecognition) {
      speechRecognition = initSpeechRecognition();
    }

    if (speechRecognition) {
      try {
        speechRecognition.start();
      } catch (err) {
        console.warn('Speech recognition already active or error:', err);
      }
    } else {
      voiceStatus.textContent = 'Voice Search Unsupported';
      voiceTranscript.textContent = 'Your browser does not support the Web Speech API.';
    }
  };

  const closeVoiceModal = () => {
    voiceModal.classList.add('hidden');
    if (speechRecognition) {
      try {
        speechRecognition.stop();
      } catch (e) {}
    }
  };

  voiceSearchBtn.addEventListener('click', openVoiceModal);
  voiceModalClose.addEventListener('click', closeVoiceModal);
  voiceModal.addEventListener('click', (e) => {
    if (e.target === voiceModal) closeVoiceModal();
  });

  // =========================================================================
  // Google Lens Modal
  // =========================================================================
  const openLensModal = () => {
    lensModal.classList.remove('hidden');
  };

  const closeLensModal = () => {
    lensModal.classList.add('hidden');
  };

  lensSearchBtn.addEventListener('click', openLensModal);
  lensModalClose.addEventListener('click', closeLensModal);
  lensModal.addEventListener('click', (e) => {
    if (e.target === lensModal) closeLensModal();
  });

  lensDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    lensDropZone.style.borderColor = '#4285f4';
  });

  lensDropZone.addEventListener('dragleave', () => {
    lensDropZone.style.borderColor = '';
  });

  lensDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    lensDropZone.style.borderColor = '';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleLensUpload(files[0]);
    }
  });

  lensFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleLensUpload(e.target.files[0]);
    }
  });

  const handleLensUpload = (file) => {
    lensDropZone.innerHTML = `
      <p class="drop-text">Analyzing <strong>${file.name}</strong>...</p>
    `;
    setTimeout(() => {
      closeLensModal();
      window.location.href = 'https://lens.google.com/';
    }, 1500);
  };

  // =========================================================================
  // Popups: Apps Grid & Profile Card
  // =========================================================================
  const togglePopup = (btn, popup) => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    closeAllPopups();
    if (!isExpanded) {
      popup.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  const closeAllPopups = () => {
    appsPopup.classList.add('hidden');
    appsBtn.setAttribute('aria-expanded', 'false');
    profilePopup.classList.add('hidden');
    profileBtn.setAttribute('aria-expanded', 'false');
  };

  appsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup(appsBtn, appsPopup);
  });

  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup(profileBtn, profilePopup);
  });

  // Global click & Escape listener
  document.addEventListener('click', (e) => {
    // Close suggestions if clicked outside search-box
    if (!searchBox.contains(e.target)) {
      hideSuggestions();
      searchBox.classList.remove('has-focus');
    }

    // Close popups if clicked outside
    if (!appsPopup.contains(e.target) && e.target !== appsBtn) {
      appsPopup.classList.add('hidden');
      appsBtn.setAttribute('aria-expanded', 'false');
    }
    if (!profilePopup.contains(e.target) && e.target !== profileBtn) {
      profilePopup.classList.add('hidden');
      profileBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
      hideSuggestions();
      closeVoiceModal();
      closeLensModal();
    }
  });

  // =========================================================================
  // Location & Language Switcher
  // =========================================================================
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      const city = timeZone.split('/')[1];
      if (city && userLocationEl) {
        userLocationEl.textContent = city.replace(/_/g, ' ');
      }
    }
  } catch (err) {}

  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = link.getAttribute('data-lang');
      searchInput.placeholder = `Search in ${lang}...`;
      searchInput.focus();
    });
  });
});