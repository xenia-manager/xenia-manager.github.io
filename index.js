class SteamStyleSlideshow {
    constructor() {
        this.currentIndex = 0;
        this.lastDirection = 'right';
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        this.isPlaying = false;

        // Slide data with better organization
        this.slides = [
            {
                url: "screenshots/2. Library (Filled).png",
                title: "Game Library (Grid)",
                description: "Explore your Xbox 360 collection in a sleek grid view—instantly see cover art, game titles, and compatibility status at a glance."
            },
            {
                url: "screenshots/3. Library (List).png",
                title: "Game Library (List)",
                description: "Scroll through your Xbox 360 games in a detailed list, complete with titles, release dates, and compatibility icons for quick scanning."
            },
            {
                url: "screenshots/6. Content Viewer.png",
                title: "Content Viewer",
                description: "Open the content viewer to export & import save files, and manage installed DLCs/Updates from one dedicated window for streamlined management."
            },
            {
                url: "screenshots/9. Patch Downloader.png",
                title: "Patch Downloader",
                description: "Automatically fetch the latest game patches—keep your titles up to date with minimal effort and maximum reliability."
            },
            {
                url: "screenshots/10. Patch Configurator.png",
                title: "Patch Configurator",
                description: "Fine‑tune your experience by enabling or disabling individual patches and mods with a simple toggle interface."
            },
            {
                url: "screenshots/15. Xenia Settings.png",
                title: "Xenia Settings",
                description: "Customize emulator global and per‑game settings."
            },
            {
                url: "screenshots/16. Manage Xenia.png",
                title: "Manage Xenia",
                description: "Easily install, update, or remove Xenia builds (including Canary, Mousehook, and Netplay)."
            }
        ];

        this.elements = {};
        this.init();
    }

    init() {
        this.cacheElements();
        if (!this.validateElements()) return;

        this.setupEventListeners();
        this.setupThemeToggle();
        this.preloadImages();
        this.updateSlide();
    }

    cacheElements() {
        this.elements = {
            mainImage: document.getElementById('main-image'),
            title: document.getElementById('image-title'),
            description: document.getElementById('image-description'),
            thumbnails: document.querySelectorAll('.thumbnail'),
            progressDots: document.querySelectorAll('.progress-dot'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            themeToggle: document.getElementById('theme-toggle')
        };
    }

    validateElements() {
        const required = ['mainImage', 'title', 'description'];
        return required.every(key => this.elements[key]);
    }

    setupEventListeners() {
        // Thumbnail navigation with improved accessibility
        this.elements.thumbnails.forEach((thumb, index) => {
            const clickHandler = (e) => {
                e.preventDefault();
                this.goToSlide(index);
            };

            thumb.addEventListener('click', clickHandler);
            thumb.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    clickHandler(e);
                }
            });
        });

        // Progress dots navigation
        this.elements.progressDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation with debouncing
        let keydownTimeout;
        document.addEventListener('keydown', (e) => {
            clearTimeout(keydownTimeout);
            keydownTimeout = setTimeout(() => {
                this.handleKeydown(e);
            }, 50);
        });

        // Navigation buttons
        if (this.elements.prevBtn) {
            this.elements.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        if (this.elements.nextBtn) {
            this.elements.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Pause autoplay on user interaction
        const pauseAutoplay = () => this.pauseAutoplay();
        ['mouseenter', 'focus', 'touchstart'].forEach(event => {
            document.querySelector('.steam-showcase')?.addEventListener(event, pauseAutoplay);
        });

        // Resume autoplay when user stops interacting
        const resumeAutoplay = () => {
            if (this.isPlaying) this.startAutoplay();
        };
        ['mouseleave', 'blur', 'touchend'].forEach(event => {
            document.querySelector('.steam-showcase')?.addEventListener(event, resumeAutoplay);
        });
    }

    handleKeydown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                this.previousSlide();
                break;
            case 'ArrowRight':
                this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.toggleAutoplay();
                break;
            case 'Home':
                this.goToSlide(0);
                break;
            case 'End':
                this.goToSlide(this.slides.length - 1);
                break;
        }
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length || index === this.currentIndex) return;

        this.lastDirection = index > this.currentIndex ? 'right' : 'left';
        this.currentIndex = index;
        this.updateSlide();
    }

    nextSlide() {
        const nextIndex = this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
        this.goToSlide(prevIndex);
    }

    updateSlide() {
        const slide = this.slides[this.currentIndex];
        const { mainImage, title, description } = this.elements;

        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => {
            // Remove existing animation classes
            mainImage.classList.remove('slide-left', 'slide-right');

            // Force reflow
            void mainImage.offsetWidth;

            // Update content
            mainImage.src = slide.url;
            mainImage.alt = slide.title;
            title.textContent = slide.title;
            description.textContent = slide.description;

            // Add animation class
            const direction = this.lastDirection === 'left' ? 'slide-left' : 'slide-right';
            mainImage.classList.add(direction);
        });

        this.updateActiveStates();
        this.updateNavigationButtons();
        this.announceSlideChange(slide);
    }

    updateActiveStates() {
        // Update thumbnails
        this.elements.thumbnails.forEach((thumb, idx) => {
            thumb.classList.toggle('active', idx === this.currentIndex);
            thumb.setAttribute('aria-selected', idx === this.currentIndex);
        });

        // Update progress dots
        this.elements.progressDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === this.currentIndex);
        });
    }

    updateNavigationButtons() {
        if (this.elements.prevBtn) {
            this.elements.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.elements.nextBtn) {
            this.elements.nextBtn.disabled = this.currentIndex === this.slides.length - 1;
        }
    }

    announceSlideChange(slide) {
        // Announce slide change for screen readers
        const announcement = `Slide ${this.currentIndex + 1} of ${this.slides.length}: ${slide.title}`;
        this.announceToScreenReader(announcement);
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        announcement.textContent = message;

        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }

    startAutoplay() {
        if (this.autoPlayInterval) return;

        this.isPlaying = true;
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoplay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    toggleAutoplay() {
        if (this.isPlaying) {
            this.pauseAutoplay();
            this.isPlaying = false;
        } else {
            this.startAutoplay();
        }
    }

    setupThemeToggle() {
        if (!this.elements.themeToggle) return;

        const toggleIcon = this.elements.themeToggle.querySelector('.toggle-icon');
        const savedTheme = this.getSavedTheme();

        this.applyTheme(savedTheme, toggleIcon);

        this.elements.themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            this.applyTheme(newTheme, toggleIcon);
            this.saveTheme(newTheme);
        });
    }

    getSavedTheme() {
        try {
            return localStorage.getItem('xenia-theme') || 'dark';
        } catch (e) {
            return 'dark';
        }
    }

    saveTheme(theme) {
        try {
            localStorage.setItem('xenia-theme', theme);
        } catch (e) {
            console.warn('Could not save theme preference');
        }
    }

    applyTheme(theme, toggleIcon) {
        const isLight = theme === 'light';

        document.body.classList.toggle('light-mode', isLight);

        if (toggleIcon) {
            toggleIcon.textContent = isLight ? '🌙' : '☀️';
            toggleIcon.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        }
    }

    preloadImages() {
        // Use Promise.all for better error handling
        const imagePromises = this.slides.map(slide => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = () => {
                    console.warn(`Failed to preload image: ${slide.url}`);
                    resolve(); // Don't reject to avoid stopping other images
                };
                img.src = slide.url;
            });
        });

        Promise.all(imagePromises).then(() => {
            console.log('All images preloaded');
        });
    }

    destroy() {
        this.pauseAutoplay();
        // Remove event listeners if needed for cleanup
    }
}

// Games table functionality with improved error handling and caching
class GamesTableManager {
    constructor() {
        this.cachedGamesTableHTML = null;
        this.baseURL = "https://xenia-manager.github.io/optimized-settings/";
        this.modal = null;
        this.backdrop = null;

        this.init();
    }

    init() {
        const viewGamesBtn = document.getElementById('view-supported-games-btn');
        if (viewGamesBtn) {
            viewGamesBtn.addEventListener('click', () => this.showSupportedGames());
        }
    }

    async showSupportedGames() {
        if (this.cachedGamesTableHTML) {
            this.displayGamesModal(this.cachedGamesTableHTML);
            return;
        }

        try {
            this.showLoadingState();
            const tableHTML = await this.fetchGamesTable();
            this.cachedGamesTableHTML = tableHTML;
            this.displayGamesModal(tableHTML);
        } catch (error) {
            console.error('Error loading games table:', error);
            this.showErrorState();
        }
    }

    showLoadingState() {
        // Show loading indicator
        this.displayGamesModal('<div style="text-align: center; padding: 2rem;">Loading games table...</div>');
    }

    showErrorState() {
        const errorHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p>Failed to load supported games table.</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--button-bg); color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Retry
                </button>
            </div>
        `;
        this.displayGamesModal(errorHTML);
    }

    async fetchGamesTable() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        try {
            const response = await fetch(this.baseURL, {
                signal: controller.signal,
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const text = await response.text();
            return this.processTableHTML(text);
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        }
    }

    processTableHTML(text) {
        const tableMatch = text.match(/<table id="games-table"[\s\S]*?<\/table>/);
        if (!tableMatch) {
            throw new Error("Could not find games table in response");
        }

        let tableHTML = tableMatch[0];

        // Process images in a more robust way
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tableHTML;

        const table = tempDiv.querySelector('table');
        if (table) {
            // Fix relative image URLs
            const images = table.querySelectorAll('tr td:first-child img');
            images.forEach(img => {
                const relSrc = img.getAttribute('src');
                if (relSrc && !/^https?:\/\//i.test(relSrc)) {
                    img.src = this.baseURL + relSrc.replace(/^\.\//, '');
                    // Add error handling for images
                    img.onerror = function () {
                        this.style.display = 'none';
                    };
                }
            });

            tableHTML = table.outerHTML;
        }

        return tableHTML;
    }

    displayGamesModal(tableHTML) {
        this.createModalElements();

        // Update content
        const container = document.getElementById('games-table-container');
        if (container) {
            container.innerHTML = tableHTML;
        }

        // Show modal
        this.backdrop.style.display = 'block';
        this.modal.style.display = 'block';

        // Focus management
        this.modal.focus();

        // Trap focus within modal
        this.trapFocus();
    }

    createModalElements() {
        if (!this.backdrop) {
            this.backdrop = document.createElement('div');
            this.backdrop.id = 'games-modal-backdrop';
            this.backdrop.className = 'games-modal-backdrop';
            this.backdrop.addEventListener('click', () => this.closeGamesModal());
            document.body.appendChild(this.backdrop);
        }

        if (!this.modal) {
            this.modal = document.createElement('div');
            this.modal.id = 'games-modal';
            this.modal.className = 'games-modal';
            this.modal.setAttribute('role', 'dialog');
            this.modal.setAttribute('aria-labelledby', 'games-modal-title');
            this.modal.setAttribute('aria-modal', 'true');
            this.modal.tabIndex = -1;

            this.modal.innerHTML = `
                <button class="games-modal-close" aria-label="Close modal">&times;</button>
                <h2 id="games-modal-title" class="games-modal-title">Supported Games</h2>
                <div id="games-table-container"></div>
            `;

            document.body.appendChild(this.modal);

            // Add event listeners
            const closeBtn = this.modal.querySelector('.games-modal-close');
            closeBtn.addEventListener('click', () => this.closeGamesModal());

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.style.display === 'block') {
                    this.closeGamesModal();
                }
            });
        }
    }

    trapFocus() {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    closeGamesModal() {
        if (this.modal) this.modal.style.display = 'none';
        if (this.backdrop) this.backdrop.style.display = 'none';

        // Return focus to the trigger button
        const viewGamesBtn = document.getElementById('view-supported-games-btn');
        if (viewGamesBtn) viewGamesBtn.focus();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new SteamStyleSlideshow();
        new GamesTableManager();
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    // Could pause/resume slideshow based on page visibility
    if (document.hidden) {
        // Page is hidden, pause any animations or timers
        console.log('Page hidden, conserving resources');
    } else {
        // Page is visible again
        console.log('Page visible, resuming normal operation');
    }
});