class SteamStyleSlideshow {
    constructor() {
        this.currentIndex = 0;
        this.lastDirection = 'right';
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
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.preloadImages();
        this.updateSlide();
    }

    setupEventListeners() {
        // Thumbnail navigation
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToSlide(index));
            thumb.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(index);
                }
            });
        });

        // Progress dots
        document.querySelectorAll('.progress-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') e.preventDefault();
        });

        // Navigation buttons (if present)
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        this.lastDirection = index > this.currentIndex ? 'right' : 'left';
        this.currentIndex = index;
        this.updateSlide();
    }

    nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
            this.lastDirection = 'right';
            this.currentIndex++;
            this.updateSlide();
        }
    }

    previousSlide() {
        if (this.currentIndex > 0) {
            this.lastDirection = 'left';
            this.currentIndex--;
            this.updateSlide();
        }
    }

    updateSlide() {
        const slide = this.slides[this.currentIndex];
        const mainImage = document.getElementById('main-image');
        const title = document.getElementById('image-title');
        const description = document.getElementById('image-description');

        if (!mainImage || !title || !description) return;

        // Animation direction
        const direction = this.lastDirection === 'left' ? 'slide-left' : 'slide-right';
        mainImage.classList.remove('slide-left', 'slide-right');
        void mainImage.offsetWidth; // force reflow
        mainImage.src = slide.url;
        mainImage.alt = slide.title;
        title.textContent = slide.title;
        description.textContent = slide.description;
        mainImage.classList.add(direction);

        // Update active states
        document.querySelectorAll('.thumbnail').forEach((thumb, idx) => {
            thumb.classList.toggle('active', idx === this.currentIndex);
        });
        document.querySelectorAll('.progress-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === this.currentIndex);
        });

        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
        if (nextBtn) nextBtn.disabled = this.currentIndex === this.slides.length - 1;
    }

    setupThemeToggle() {
        const toggleButton = document.getElementById('theme-toggle');
        if (!toggleButton) return;
        const toggleIcon = toggleButton.querySelector('.toggle-icon');
        const savedTheme = localStorage.getItem('xenia-theme') || 'dark';
        this.applyTheme(savedTheme, toggleIcon);

        toggleButton.addEventListener('click', () => {
            const isLightMode = document.body.classList.contains('light-mode');
            const newTheme = isLightMode ? 'dark' : 'light';
            this.applyTheme(newTheme, toggleIcon);
            localStorage.setItem('xenia-theme', newTheme);
        });
    }

    applyTheme(theme, toggleIcon) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            if (toggleIcon) toggleIcon.textContent = '🌙';
        } else {
            document.body.classList.remove('light-mode');
            if (toggleIcon) toggleIcon.textContent = '☀️';
        }
    }

    preloadImages() {
        this.slides.forEach(slide => {
            const img = new Image();
            img.src = slide.url;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SteamStyleSlideshow();
});

let cachedGamesTableHTML = null;

async function showSupportedGames() {
    if (cachedGamesTableHTML) {
        displayGamesModal(cachedGamesTableHTML);
        return;
    }

    const baseURL = "https://xenia-manager.github.io/Optimized-Settings/";
    try {
        const response = await fetch(baseURL);
        if (!response.ok) throw new Error("Network response was not ok");
        const text = await response.text();

        // Extract the table HTML from the Markdown
        const tableMatch = text.match(/<table id="games-table"[\s\S]*?<\/table>/);
        if (!tableMatch) {
            alert("Could not find games table.");
            return;
        }
        let tableHTML = tableMatch[0];

        // Load into a temporary DOM so we can rewrite img srcs
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tableHTML;
        const table = tempDiv.querySelector('table');
        if (table) {
            // For each <img> in the first <td> of each row, prepend the baseURL
            table.querySelectorAll('tr').forEach(row => {
                const img = row.querySelector('td:first-child img');
                if (img) {
                    const relSrc = img.getAttribute('src');
                    if (relSrc && !/^https?:\/\//i.test(relSrc)) {
                        img.src = baseURL + relSrc;
                    }
                }
            });
            tableHTML = table.outerHTML;
        }

        cachedGamesTableHTML = tableHTML;
        displayGamesModal(tableHTML);
    } catch (err) {
        alert("Failed to load supported games table.");
    }
}

function displayGamesModal(tableHTML) {
    let backdrop = document.getElementById('games-modal-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'games-modal-backdrop';
        backdrop.className = 'games-modal-backdrop';
        document.body.appendChild(backdrop);
    }
    backdrop.style.display = 'block';

    let modal = document.getElementById('games-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'games-modal';
        modal.className = 'games-modal';
        modal.innerHTML = `
            <button class="games-modal-close" aria-label="Close">&times;</button>
            <h2 class="games-modal-title">Supported Games</h2>
            <div id="games-table-container"></div>
        `;
        document.body.appendChild(modal);

        // Close on button click or backdrop click
        modal.querySelector('.games-modal-close').onclick = closeGamesModal;
        backdrop.onclick = closeGamesModal;
    }
    document.getElementById('games-table-container').innerHTML = tableHTML;
    modal.style.display = 'block';

    function closeGamesModal() {
        modal.style.display = 'none';
        backdrop.style.display = 'none';
    }
}

// Attach to your button
const viewGamesBtn = document.getElementById('view-supported-games-btn');
if (viewGamesBtn) viewGamesBtn.onclick = showSupportedGames;