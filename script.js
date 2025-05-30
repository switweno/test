// DOM Elements
let slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const mainNav = document.querySelector('.main-nav');

// Globals
let currentSlide = 0;
let slideInterval;

// Initialize the page
function init() {
  if (slides && slides.length > 0) {
    startSlider();
  }
  setupEventListeners();
  setupLazyLoading();
}

// Slider Functions
function startSlider() {
  if (slides && slides.length > 0) {
    showSlide(currentSlide);
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }
}

function showSlide(index) {
  if (!slides || slides.length === 0) return;
  
  if (index < 0 || index >= slides.length) return;
  
  slides.forEach(slide => slide.classList.remove('active'));
  
  if (dots && dots.length > 0) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }
  
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Product Filter Functions with animations
function filterProducts(category) {
  // Marquer le bouton actif
  filterBtns.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Garder trace des cartes qui doivent être visibles
  const visibleCards = [];
  const hiddenCards = [];
  
  // Trier les cartes selon qu'elles doivent être affichées ou masquées
  productCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      visibleCards.push(card);
    } else {
      hiddenCards.push(card);
    }
  });
  
  // D'abord, animer la disparition des cartes à masquer
  hiddenCards.forEach(card => {
    card.classList.add('animate-out');
    card.classList.remove('animate-in');
    
    // Après l'animation, masquer la carte
    setTimeout(() => {
      card.style.display = 'none';
      card.classList.remove('animate-out');
    }, 400);
  });
  
  // Ensuite, animer l'apparition des cartes à afficher avec un délai progressif
  visibleCards.forEach((card, index) => {
    // Préparer les cartes à afficher
    card.style.display = 'flex';
    card.style.opacity = '0';
    
    // Appliquer un délai croissant pour créer un effet cascade
    setTimeout(() => {
      card.classList.add('animate-in');
      card.classList.remove('animate-out');
      
      // Nettoyer après l'animation
      setTimeout(() => {
        card.classList.remove('animate-in');
        card.style.opacity = '1';
      }, 500);
    }, 30 * index); // Délai progressif entre chaque carte
  });
}

// Search Function
function searchProducts(searchTerm) {
  if (!searchTerm) {
    const inputEl = this.previousElementSibling;
    if (inputEl) searchTerm = inputEl.value.toLowerCase().trim();
  }
  
  if (!searchTerm) return;
  
  if (mainNav && mainNav.classList.contains('show')) {
    toggleMobileMenu();
  }
  
  productCards.forEach(card => {
    const productName = card.querySelector('h3').textContent.toLowerCase();
    
    if (productName.includes(searchTerm)) {
      card.style.display = 'block';
      card.classList.add('highlight');
      setTimeout(() => {
        card.classList.remove('highlight');
      }, 2000);
    } else {
      card.style.display = 'none';
    }
  });
}

// Fonction pour le menu mobile
function toggleMobileMenu(event) {
  if (event) event.preventDefault();
  
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (!mobileMenuToggle || !mainNav) return;
  
  mobileMenuToggle.classList.toggle('active');
  mainNav.classList.toggle('show');
  
  const isExpanded = mainNav.classList.contains('show');
  mobileMenuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  
  let overlay = document.querySelector('.menu-overlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', toggleMobileMenu);
  }
  
  overlay.classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

// Notification pour formulaire newsletter
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-shopping-cart"></i>
    <p>${message}</p>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 500);
  }, 3000);
}

// Fonction pour configurer le lazy loading avec Intersection Observer
function setupLazyLoading() {
  // Vérifier si IntersectionObserver est supporté
  if ('IntersectionObserver' in window) {
    const productCards = document.querySelectorAll('.product-card');
    
    const options = {
      root: null, // utiliser le viewport comme zone d'observation
      rootMargin: '0px 0px 100px 0px', // marge de 100px en bas pour précharger
      threshold: 0.1 // 10% de l'élément doit être visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const image = card.querySelector('img');
          
          // Si l'image a un attribut data-src, utiliser celui-ci comme source
          if (image && image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
          }
          
          // Ajouter une classe pour animer l'entrée de la carte
          card.classList.add('fade-in');
          
          // Arrêter d'observer cet élément
          observer.unobserve(card);
        }
      });
    }, options);
    
    // Observer chaque carte de produit
    productCards.forEach(card => {
      observer.observe(card);
    });
  }
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
  // Slider controls
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetSliderInterval();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetSliderInterval();
    });
  }
  
  // Dot navigation
  if (dots && dots.length > 0) {
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const dotIndex = parseInt(this.dataset.index);
        if (!isNaN(dotIndex) && dotIndex >= 0 && dotIndex < slides.length) {
          currentSlide = dotIndex;
          showSlide(currentSlide);
          resetSliderInterval();
        }
      });
    });
  }
  
  // Category filter
  if (filterBtns && filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterProducts(this.dataset.category);
      });
    });
  }
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input').value;
      
      if (email) {
        showNotification('Merci de vous être abonné à notre newsletter!');
        this.reset();
      }
    });
  }
}

// Reset slider interval
function resetSliderInterval() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
}

// Add styles needed for notifications
function addNotificationStyles() {
  // ...existing code...
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Réinitialiser les animations à chaque visite si nécessaire
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroElements = hero.querySelectorAll('h1, p');
      heroElements.forEach(el => {
        // Forcer un redémarrage de l'animation
        el.style.animation = 'none';
        el.offsetHeight; // Déclencher un reflow
        el.style.animation = null;
      });
    }
    
    addNotificationStyles();
    init();
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  }
});





