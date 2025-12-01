// ==========================================================================
// Gallery & Lightbox JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilters();
    initLightbox();
});

// ==========================================================================
// Gallery Filters
// ==========================================================================

function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items with animation
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Staggered animation
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        requestAnimationFrame(() => {
                            item.style.transition = 'all 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    }, index * 30);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================================================
// Lightbox
// ==========================================================================

function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox || galleryItems.length === 0) return;

    let currentIndex = 0;
    let visibleItems = [];

    // Update visible items array
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => {
            return item.style.display !== 'none' &&
                   window.getComputedStyle(item).display !== 'none';
        });
    }

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateVisibleItems();
            currentIndex = visibleItems.indexOf(item);
            showImage(currentIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Show image at index
    function showImage(index) {
        if (index < 0 || index >= visibleItems.length) return;

        const item = visibleItems[index];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-text');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : '';

        currentIndex = index;
    }

    // Previous image
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        showImage(currentIndex);
    });

    // Next image
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % visibleItems.length;
        showImage(currentIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
                showImage(currentIndex);
                break;
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % visibleItems.length;
                showImage(currentIndex);
                break;
        }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                currentIndex = (currentIndex + 1) % visibleItems.length;
                showImage(currentIndex);
            } else {
                // Swipe right - previous image
                currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
                showImage(currentIndex);
            }
        }
    }
}
