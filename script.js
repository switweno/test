// DOM Elements
let slides = document.querySelectorAll('.slide'); // Changé de const à let pour permettre la réassignation
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
const searchInput = document.querySelector('.search-input');
const searchInputMobile = document.querySelector('.search-input-mobile');
const searchButton = document.querySelector('.desktop-search .search-button');
const searchButtonMobile = document.querySelector('.mobile-search .search-button');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

// Globals
let currentSlide = 0;
let slideInterval;
let cartItems = 0;

// Initialize the page
function init() {
  // Only initialize slider if slides exist
  if (slides && slides.length > 0) {
    startSlider();
  } else {
    console.log("No slides found, skipping slider initialization");
  }
  setupEventListeners();
}

// Slider Functions
function startSlider() {
  // Show the first slide
  if (slides && slides.length > 0) {
    showSlide(currentSlide);
    
    // Start automatic sliding
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }
}

function showSlide(index) {
  // Safety check - make sure slides exist and index is valid
  if (!slides || slides.length === 0) {
    console.error("No slides found");
    return;
  }
  
  // Ensure index is within bounds
  if (index < 0 || index >= slides.length) {
    console.error(`Invalid slide index: ${index}. Must be between 0 and ${slides.length - 1}.`);
    return;
  }
  
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Remove active from all dots
  if (dots && dots.length > 0) {
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show active dot if it exists
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }
  
  // Show current slide
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

// Product Filter Functions
function filterProducts(category) {
  productCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Cart Functions
function addToCart(e) {
  // Obtenir la carte produit
  const btn = e.currentTarget;
  const card = btn.closest('.product-card');
  
  // Rediriger vers la page de détail du produit
  const productId = card.dataset.id;
  window.location.href = `produits/${productId}.html`;
}

// Fonction pour afficher une confirmation après ajout au panier avec option d'aller au panier
function showAddToCartConfirmation(productName) {
  // Créer l'élément de notification
  const notification = document.createElement('div');
  notification.className = 'notification cart-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle"></i>
      <p>${productName} a été ajouté à votre panier</p>
    </div>
    <div class="notification-actions">
      <button class="continue-shopping">Continuer les achats</button>
      <a href="panier.html" class="go-to-cart">Voir le panier</a>
    </div>
  `;
  
  // Ajouter au DOM
  document.body.appendChild(notification);
  
  // Ajouter les styles CSS si nécessaire
  addCartNotificationStyles();
  
  // Afficher avec animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Configurer les boutons
  const continueBtn = notification.querySelector('.continue-shopping');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    });
  }
  
  // Fermer automatiquement après un délai
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Ajouter les styles CSS pour la notification de panier
function addCartNotificationStyles() {
  // Vérifier si les styles existent déjà
  if (!document.getElementById('cart-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'cart-notification-styles';
    style.textContent = `
      .cart-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: white;
        color: var(--dark-color);
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        width: 300px;
        transform: translateX(110%);
        transition: transform 0.3s ease;
        z-index: 1100;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .cart-notification.show {
        transform: translateX(0);
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }
      
      .notification-content i {
        color: #27ae60;
        font-size: 1.5rem;
      }
      
      .notification-actions {
        display: flex;
        gap: 0.5rem;
      }
      
      .continue-shopping, .go-to-cart {
        padding: 0.5rem;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        flex: 1;
        font-size: 0.9rem;
        transition: all 0.2s ease;
      }
      
      .continue-shopping {
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        color: var(--dark-color);
      }
      
      .go-to-cart {
        background-color: var(--secondary-color);
        border: none;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .continue-shopping:hover {
        background-color: #e5e5e5;
      }
      
      .go-to-cart:hover {
        background-color: #2980b9;
      }
      
      @media (max-width: 576px) {
        .cart-notification {
          width: calc(100% - 40px);
          bottom: 10px;
          right: 10px;
          left: 10px;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
}

// Search Function
function searchProducts(searchTerm) {
  if (!searchTerm) {
    searchTerm = this.previousElementSibling.value.toLowerCase().trim();
  }
  
  if (searchTerm === '') return;
  
  // Si le menu mobile est ouvert, le fermer après la recherche
  if (mainNav.classList.contains('show')) {
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

// Fonction améliorée pour le menu mobile
function toggleMobileMenu(event) {
  console.log("toggleMobileMenu appelé");
  
  if (event) {
    event.preventDefault();
  }
  
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (!mobileMenuToggle || !mainNav) {
    console.error("Éléments du menu mobile non trouvés");
    return;
  }
  
  console.log("État du menu avant:", mainNav.classList.contains('show') ? "ouvert" : "fermé");
  
  // Toggle active class
  mobileMenuToggle.classList.toggle('active');
  mainNav.classList.toggle('show');
  
  console.log("État du menu après:", mainNav.classList.contains('show') ? "ouvert" : "fermé");
  
  // Gérer l'overlay
  let overlay = document.querySelector('.menu-overlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Fermer le menu quand on clique sur l'overlay
    overlay.addEventListener('click', function() {
      toggleMobileMenu();
    });
  }
  
  overlay.classList.toggle('active');
  
  // Empêcher le défilement quand le menu est ouvert
  document.body.classList.toggle('menu-open');
}

// Utility Functions
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-shopping-cart"></i>
    <p>${message}</p>
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Show with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after animation
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
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
  
  // Remplacer l'ancienne gestion du menu mobile
  const menuLinks = document.querySelectorAll('.main-nav a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      const mainNav = document.querySelector('.main-nav');
      if (mainNav.classList.contains('show')) {
        toggleMobileMenu();
      }
    });
  });
}

// Reset slider interval when manually changing slides
function resetSliderInterval() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
}

// Add CSS for notifications
function addNotificationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #2c3e50;
      color: white;
      padding: 1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification i {
      color: #3498db;
    }
    
    .added {
      background-color: #27ae60 !important;
    }
    
    .highlight {
      animation: highlight 2s;
    }
    
    @keyframes highlight {
      0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.5); }
      70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
      100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
    }
  `;
  
  document.head.appendChild(style);
}

// Add CSS for mobile menu
function addMobileMenuStyles() {
  const style = document.createElement('style');
  style.textContent = `
    body.menu-open {
      overflow: hidden;
    }
    
    @media (max-width: 768px) {
      .main-nav.show {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 0.5rem;
      }
      
      .cart-icon {
        display: inline-flex;
        align-items: center;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Check if elements exist before initializing
  if (typeof slides === 'undefined' || slides === null || slides.length === 0) {
    // Requery the DOM in case elements weren't available when script first loaded
    const slidesCollection = document.querySelectorAll('.slide');
    if (slidesCollection && slidesCollection.length > 0) {
      slides = slidesCollection; // Maintenant cette réassignation est valide
    } else {
      console.log("No slides found on this page");
    }
  }
  
  addNotificationStyles();
  addMobileMenuStyles();
  init();
  
  // Mettre à jour le compteur du panier
  updateCartCount();
});

// Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
  // Fonction vidée car nous n'utilisons plus le panier
}




