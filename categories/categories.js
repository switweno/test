// DOM Elements
const slides = document.querySelectorAll('.slide');
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
  startSlider();
  setupEventListeners();
}

// Slider Functions
function startSlider() {
  // Show the first slide
  showSlide(currentSlide);
  
  // Start automatic sliding
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Remove active from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Show current slide and set active dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
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
// Fonction pour ajouter un produit au panier
function addToCart(e) {
  const btn = e.currentTarget;
  const card = btn.closest('.product-card');
  const productId = card.dataset.id;
  const productName = card.querySelector('h3').textContent;
  const productPrice = card.querySelector('.product-price').textContent.trim();
  const priceValue = parseFloat(productPrice.replace(/[^0-9.-]+/g, ""));
  const productImage = card.querySelector('img').src;

  // Créer l'objet produit
  const product = {
    id: productId,
    name: productName,
    price: priceValue,
    image: productImage,
    quantity: 1
  };

  // Charger le panier actuel
  let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Vérifier si le produit existe déjà
  const existingItemIndex = cart.findIndex(item => 
    item.id === product.id && 
    (item.color === product.color || (!item.color && !product.color)) && 
    (item.size === product.size || (!item.size && !product.size))
  );
  
  if (existingItemIndex !== -1) {
    // Mettre à jour la quantité si le produit existe
    cart[existingItemIndex].quantity += product.quantity;
  } else {
    // Ajouter un nouveau produit
    cart.push(product);
  }
  
  // Sauvegarder le panier
  localStorage.setItem('cartItems', JSON.stringify(cart));
  
  // Mettre à jour le compteur du panier
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = itemCount;
  }
  
  // Animation du bouton
  btn.innerHTML = '<i class="fas fa-check"></i> Ajouté';
  btn.classList.add('added');
  
  // Afficher confirmation avec option d'aller au panier
  setTimeout(() => {
    showAddToCartConfirmation(productName);
    
    // Réinitialiser le bouton
    btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Ajouter';
    btn.classList.remove('added');
  }, 1000);
}

// Fonction pour afficher la confirmation après ajout au panier
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
      <a href="../panier.html" class="go-to-cart">Voir le panier</a>
    </div>
  `;
  
  // Ajouter au DOM
  document.body.appendChild(notification);
  
  // Ajouter les styles CSS
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

// Ajouter les styles CSS pour la notification
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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  addNotificationStyles();
  addMobileMenuStyles();
  init();
  
  // Mettre à jour le compteur du panier
  updateCartCount();
});

// Ajouter les écouteurs d'événements pour les boutons d'ajout au panier
function setupCartButtons() {
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', addToCart);
  });
}

// Appeler cette fonction lors de l'initialisation
document.addEventListener('DOMContentLoaded', function() {
  // ...existing code...
  setupCartButtons();
});