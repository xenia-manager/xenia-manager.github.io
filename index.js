class SteamStyleSlideshow {
    constructor() {
        this.currentIndex = 0;
        this.isPlaying = true;

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
            if (e.key === ' ') {
                e.preventDefault();
            }
        });
    }

    goToSlide(index) {
        this.lastDirection = index > this.currentIndex ? 'right' : 'left';
        this.currentIndex = index;
        this.updateSlide();
    }

    nextSlide() {
        this.lastDirection = 'right';
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlide();
    }

    previousSlide() {
        this.lastDirection = 'left';
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlide();
    }

    updateSlide() {
        const slide = this.slides[this.currentIndex];
        const mainImage = document.getElementById('main-image');
        const title = document.getElementById('image-title');
        const description = document.getElementById('image-description');

        // Determine direction
        const direction = this.lastDirection === 'left' ? 'slide-left' : 'slide-right';

        // Change image with animation
        mainImage.classList.remove('slide-left', 'slide-right'); // remove old classes
        void mainImage.offsetWidth; // force reflow
        mainImage.src = slide.url;
        mainImage.alt = slide.title;
        title.textContent = slide.title;
        description.textContent = slide.description;
        mainImage.classList.add(direction);

        // Update active states
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });

        document.querySelectorAll('.progress-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = this.currentIndex === 0;
        document.getElementById('next-btn').disabled = this.currentIndex === this.slides.length - 1;
    }

    setupThemeToggle() {
        const toggleButton = document.getElementById('theme-toggle');
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
            toggleIcon.textContent = '🌙';
        } else {
            document.body.classList.remove('light-mode');
            toggleIcon.textContent = '☀️';
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