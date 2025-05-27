// Product Detail Page JavaScript

// DOM Elements
const thumbnails = document.querySelectorAll('.product-thumbnails img');
const mainImage = document.getElementById('current-image');
const prevImgBtn = document.querySelector('.prev-img');
const nextImgBtn = document.querySelector('.next-img');
const quantityInput = document.getElementById('quantity');
const quantityDecreaseBtn = document.querySelector('.quantity-decrease');
const quantityIncreaseBtn = document.querySelector('.quantity-increase');
const colorOptions = document.querySelectorAll('.color-option');
const sizeOptions = document.querySelectorAll('.size-option');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const ratingStars = document.querySelectorAll('.rating-star');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const buyNowBtn = document.querySelector('.buy-now-btn');
const wishlistBtn = document.querySelector('.wishlist-btn');
const productForm = document.querySelector('.review-form');
const loadMoreReviewsBtn = document.querySelector('.load-more-reviews');

// Current active thumbnail index
let currentThumbnailIndex = 0;

// Ajouter un objet de base de données produit (simulation)
const productDatabase = {
  'velo-electrique-x1': {
    name: 'Vélo Électrique X1',
    price: '2500 DH',
    oldPrice: '2800 DH',
    rating: 4.5,
    reviewCount: 42,
    description: 'Vélo électrique haut de gamme avec batterie longue durée et autonomie de 80km, idéal pour les déplacements urbains et les loisirs.',
    badge: 'Populaire',
    category: 'electric',
    colors: ['Bleu', 'Noir', 'Rouge'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Vue avant du Vélo Électrique X1' },
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Vue arrière du Vélo Électrique X1' },
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Batterie amovible du Vélo Électrique X1' },
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Console de contrôle du Vélo Électrique X1' }
    ],
    specs: {
      'Moteur': '250W sans balais',
      'Batterie': 'Lithium-ion 36V 10Ah, amovible',
      'Autonomie': 'Jusqu\'à 80 km (selon mode d\'assistance)',
      'Temps de charge': '4-6 heures',
      'Vitesse maximale': '25 km/h (assistance électrique)',
      'Cadre': 'Aluminium 6061',
      'Poids': '22 kg (batterie incluse)',
      'Freins': 'Disque hydraulique avant et arrière',
      'Dérailleur': 'Shimano 7 vitesses',
      'Suspension': 'Fourche avant à suspension',
      'Roues': '26 pouces',
      'Charge maximale': '120 kg'
    }
  },
  'trottinette-t1': {
    name: 'Trottinette T1',
    price: '1800 DH',
    oldPrice: '',
    rating: 4.0,
    reviewCount: 28,
    description: 'Trottinette électrique légère et pliable, parfaite pour la mobilité urbaine. Facile à transporter et à ranger.',
    badge: '',
    category: 'scooter',
    colors: ['Noir', 'Blanc', 'Gris'],
    sizes: ['Unique'],
    images: [
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Trottinette T1 - Vue générale' },
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Trottinette T1 - Vue pliée' },
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Trottinette T1 - Tableau de bord' }
    ],
    specs: {
      'Moteur': '350W',
      'Batterie': 'Lithium-ion 36V 7.8Ah',
      'Autonomie': 'Jusqu\'à 30 km',
      'Temps de charge': '3-4 heures',
      'Vitesse maximale': '25 km/h',
      'Poids': '12.5 kg',
      'Charge maximale': '100 kg',
      'Pneus': '8.5 pouces, pneumatiques',
      'Freins': 'Électronique avant, à disque arrière',
      'Pliable': 'Oui',
      'Éclairage': 'LED avant et arrière'
    }
  },
  'velo-classique-c1': {
    name: 'Vélo Classique C1',
    price: '1200 DH',
    oldPrice: '1500 DH',
    rating: 3.0,
    reviewCount: 15,
    description: 'Vélo classique avec cadre en aluminium et freins à disque, idéal pour les trajets urbains et les balades tranquilles.',
    badge: 'Promo',
    category: 'classic',
    colors: ['Rouge', 'Bleu', 'Vert'],
    sizes: ['S', 'M', 'L'],
    images: [
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Vélo Classique C1 - Vue générale' },
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Vélo Classique C1 - Vue arrière' },
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Vélo Classique C1 - Détail des freins' }
    ],
    specs: {
      'Cadre': 'Aluminium',
      'Poids': '13 kg',
      'Freins': 'À disque mécanique',
      'Dérailleur': 'Shimano 21 vitesses',
      'Roues': '26 pouces',
      'Suspension': 'Avant',
      'Charge maximale': '120 kg',
      'Éclairage': 'Non inclus'
    }
  },
  'velo-classique-c2': {
    name: 'Vélo Classique C2',
    price: '1200 DH',
    oldPrice: '',
    rating: 4.0,
    reviewCount: 36,
    description: 'Vélo classique confortable avec position droite, parfait pour les balades en famille et les trajets quotidiens.',
    badge: '',
    category: 'classic',
    colors: ['Bleu', 'Noir', 'Beige'],
    sizes: ['M', 'L', 'XL'],
    images: [
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Vélo Classique C2 - Vue générale' },
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Vélo Classique C2 - Vue de côté' },
      { src: 'images/slider/likebike-shine-s-09.webp', alt: 'Vélo Classique C2 - Détail du guidon' }
    ],
    specs: {
      'Cadre': 'Acier',
      'Poids': '14 kg',
      'Freins': 'V-brake',
      'Dérailleur': 'Shimano 7 vitesses',
      'Roues': '28 pouces',
      'Suspension': 'Non',
      'Selle': 'Confort gel',
      'Charge maximale': '130 kg',
      'Éclairage': 'LED avant et arrière inclus'
    }
  }
};

// Current product ID
let currentProductId = 'velo-electrique-x1';

// Initialize
function init() {
  loadProductFromUrl();
  setupEventListeners();
  setupZoomEffect();
  checkProductAvailability();
  updateRecentlyViewed();
  enhanceImageNavigation();
  addNavigationIndicators();
}

// Image Gallery Functions
function changeImage(thumbnail) {
  // Update main image with fade effect
  mainImage.style.opacity = 0;
  
  setTimeout(() => {
    mainImage.src = thumbnail.src;
    mainImage.alt = thumbnail.alt;
    mainImage.style.opacity = 1;
  }, 200);
  
  // Update active thumbnail
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  thumbnail.classList.add('active');
  
  // Update current index
  currentThumbnailIndex = Array.from(thumbnails).indexOf(thumbnail);
  
  // Scroll thumbnail into view if needed
  scrollThumbnailIntoView(thumbnail);
}

function scrollThumbnailIntoView(thumbnail) {
  // Scroll the thumbnail into view if it's not fully visible
  const container = document.querySelector('.product-thumbnails');
  if (!container) return;
  
  const thumbnailRect = thumbnail.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  if (thumbnailRect.left < containerRect.left) {
    container.scrollLeft += thumbnailRect.left - containerRect.left - 10;
  } else if (thumbnailRect.right > containerRect.right) {
    container.scrollLeft += thumbnailRect.right - containerRect.right + 10;
  }
}

function showPrevImage() {
  currentThumbnailIndex = (currentThumbnailIndex - 1 + thumbnails.length) % thumbnails.length;
  changeImage(thumbnails[currentThumbnailIndex]);
}

function showNextImage() {
  currentThumbnailIndex = (currentThumbnailIndex + 1) % thumbnails.length;
  changeImage(thumbnails[currentThumbnailIndex]);
}

// Setup zoom effect for main product image
function setupZoomEffect() {
  const imageContainer = document.querySelector('.product-main-image');
  
  if (!imageContainer) return;
  
  imageContainer.addEventListener('mousemove', function(e) {
    // Only enable on desktop
    if (window.innerWidth <= 768) return;
    
    const { left, top, width, height } = this.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    mainImage.style.transform = 'scale(1.5)';
  });
  
  imageContainer.addEventListener('mouseleave', function() {
    mainImage.style.transform = 'scale(1)';
  });
}

// Quantity Functions
function updateQuantity(change) {
  const currentValue = parseInt(quantityInput.value);
  const maxValue = parseInt(quantityInput.getAttribute('max'));
  const minValue = parseInt(quantityInput.getAttribute('min'));
  let newValue = currentValue + change;
  
  // Ensure value is within bounds
  if (newValue < minValue) newValue = minValue;
  if (newValue > maxValue) newValue = maxValue;
  
  quantityInput.value = newValue;
}

// Check product availability based on selected variants
function checkProductAvailability() {
  const selectedColor = document.querySelector('.color-option.active').dataset.color;
  const selectedSize = document.querySelector('.size-option.active').dataset.size;
  
  // Simulate inventory check (in real app, this would be an API call)
  const availableInventory = {
    'Bleu-M': 15,
    'Bleu-L': 8,
    'Bleu-XL': 5,
    'Noir-S': 10,
    'Noir-M': 7,
    'Noir-L': 0,
    'Rouge-S': 3,
    'Rouge-M': 6
  };
  
  const key = `${selectedColor}-${selectedSize}`;
  const stock = availableInventory[key] || 0;
  const stockElement = document.querySelector('.product-stock');
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  const buyNowBtn = document.querySelector('.buy-now-btn');
  
  // Update quantity max attribute
  if (quantityInput) {
    quantityInput.setAttribute('max', stock);
    if (parseInt(quantityInput.value) > stock) {
      quantityInput.value = stock > 0 ? stock : 1;
    }
  }
  
  // Update stock indicator
  if (stockElement) {
    if (stock > 5) {
      stockElement.innerHTML = `<i class="fas fa-check-circle"></i> En stock (${stock} disponibles)`;
      stockElement.className = 'product-stock in-stock';
    } else if (stock > 0) {
      stockElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> Stock limité (${stock} disponibles)`;
      stockElement.className = 'product-stock limited-stock';
    } else {
      stockElement.innerHTML = `<i class="fas fa-times-circle"></i> Rupture de stock`;
      stockElement.className = 'product-stock out-of-stock';
    }
  }
  
  // Disable/Enable buttons based on stock
  if (addToCartBtn && buyNowBtn) {
    if (stock === 0) {
      addToCartBtn.disabled = true;
      buyNowBtn.disabled = true;
      addToCartBtn.classList.add('disabled');
      buyNowBtn.classList.add('disabled');
    } else {
      addToCartBtn.disabled = false;
      buyNowBtn.disabled = false;
      addToCartBtn.classList.remove('disabled');
      buyNowBtn.classList.remove('disabled');
    }
  }
}

// Variant Selection Functions
function selectColor(selected) {
  colorOptions.forEach(option => option.classList.remove('active'));
  selected.classList.add('active');
  
  // Update product information based on color selection
  checkProductAvailability();
}

function selectSize(selected) {
  sizeOptions.forEach(option => option.classList.remove('active'));
  selected.classList.add('active');
  
  // Update product information based on size selection
  checkProductAvailability();
}

// Tab Functions
function selectTab(selected) {
  // Update tab buttons
  tabButtons.forEach(btn => btn.classList.remove('active'));
  selected.classList.add('active');
  
  // Show corresponding tab content
  const tabId = selected.dataset.tab;
  tabPanes.forEach(pane => {
    pane.classList.remove('active');
    if (pane.id === tabId) {
      pane.classList.add('active');
    }
  });
}

// Rating Functions
function setRating(rating) {
  ratingStars.forEach((star, index) => {
    if (index < rating) {
      star.classList.remove('far');
      star.classList.add('fas', 'active');
    } else {
      star.classList.remove('fas', 'active');
      star.classList.add('far');
    }
  });
}

// Cart Functions
function addToCart() {
  const productName = document.querySelector('.product-info h1').textContent;
  const quantity = parseInt(quantityInput.value);
  const color = document.querySelector('.color-option.active').dataset.color;
  const size = document.querySelector('.size-option.active').dataset.size;
  
  // Display notification
  showNotification(`${quantity} ${productName} (${color}, ${size}) ajouté au panier`);
  
  // Update cart count in the header
  const cartCount = document.querySelector('.cart-count');
  cartCount.textContent = parseInt(cartCount.textContent) + quantity;
  
  // Animation effect
  addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Ajouté';
  addToCartBtn.classList.add('added');
  
  setTimeout(() => {
    addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter au panier';
    addToCartBtn.classList.remove('added');
  }, 1500);
}

function buyNow() {
  addToCart();
  // Redirect to checkout page
  setTimeout(() => {
    window.location.href = 'checkout.html';
  }, 500);
}

function toggleWishlist() {
  const icon = wishlistBtn.querySelector('i');
  
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    icon.style.color = '#e74c3c';
    showNotification('Produit ajouté à vos favoris');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    icon.style.color = '';
    showNotification('Produit retiré de vos favoris');
  }
}

// Recently Viewed Products
function updateRecentlyViewed() {
  // Get current product info
  const productId = new URL(window.location.href).searchParams.get('id') || 'velo-electrique-x1';
  const productImage = document.querySelector('.product-main-image img').src;
  const productName = document.querySelector('.product-info h1').textContent;
  const productPrice = document.querySelector('.current-price').textContent;
  
  // Create product object
  const product = {
    id: productId,
    name: productName,
    image: productImage,
    price: productPrice,
    url: window.location.href
  };
  
  // Get existing recently viewed products from localStorage
  let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  
  // Remove current product if it's already in the list
  recentlyViewed = recentlyViewed.filter(item => item.id !== productId);
  
  // Add current product to the beginning of the array
  recentlyViewed.unshift(product);
  
  // Keep only the last 4 products
  recentlyViewed = recentlyViewed.slice(0, 4);
  
  // Save back to localStorage
  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Review Functions
function loadMoreReviews() {
  // Simulate loading more reviews
  const reviewsList = document.querySelector('.reviews-list');
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
  
  loadMoreReviewsBtn.style.display = 'none';
  reviewsList.appendChild(loadingIndicator);
  
  // Simulate API call delay
  setTimeout(() => {
    reviewsList.removeChild(loadingIndicator);
    
    // Sample additional reviews
    const additionalReviews = `
      <div class="review-item">
        <div class="review-header">
          <div class="reviewer-info">
            <img src="images/avatar-placeholder.jpg" alt="Avatar de l'utilisateur" class="reviewer-avatar">
            <div>
              <strong>Sophia R.</strong>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div class="review-date">12 mars 2023</div>
        </div>
        <div class="review-content">
          <p>J'adore ce vélo électrique ! Il est très confortable et facile à utiliser. L'autonomie est excellente, même sur des trajets plus longs. Je l'utilise tous les jours pour aller au travail et je ne regrette pas mon achat.</p>
        </div>
      </div>
      
      <div class="review-item">
        <div class="review-header">
          <div class="reviewer-info">
            <img src="images/avatar-placeholder.jpg" alt="Avatar de l'utilisateur" class="reviewer-avatar">
            <div>
              <strong>Younes T.</strong>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
              </div>
            </div>
          </div>
          <div class="review-date">28 février 2023</div>
        </div>
        <div class="review-content">
          <p>Le vélo est bien, mais l'assemblage était un peu difficile. Les instructions n'étaient pas très claires. Une fois monté, il fonctionne correctement, mais j'aurais aimé plus d'assistance pour le montage.</p>
        </div>
      </div>
    `;
    
    // Insert before the "load more" button
    const insertPoint = loadMoreReviewsBtn.parentNode;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = additionalReviews;
    
    while (tempDiv.firstChild) {
      insertPoint.insertBefore(tempDiv.firstChild, loadMoreReviewsBtn);
    }
    
    // Show a message that there are no more reviews
    const noMoreReviews = document.createElement('p');
    noMoreReviews.className = 'no-more-reviews';
    noMoreReviews.textContent = 'Tous les avis ont été chargés';
    insertPoint.insertBefore(noMoreReviews, loadMoreReviewsBtn);
  }, 1500);
}

function submitReview(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('review-name').value;
  const email = document.getElementById('review-email').value;
  const content = document.getElementById('review-content').value;
  
  // Get selected rating
  const activeStars = document.querySelectorAll('.rating-star.active');
  const rating = activeStars.length;
  
  if (rating === 0) {
    alert('Veuillez attribuer une note au produit.');
    return;
  }
  
  // In a real application, you would send this data to your server
  console.log('Review submitted:', { name, email, content, rating });
  
  // Show confirmation
  showNotification('Merci pour votre avis ! Il sera publié après modération.');
  
  // Reset form
  document.querySelector('.review-form').reset();
  setRating(0);
}

// Utility Functions
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-info-circle"></i>
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

// Add "sticky" product info on scroll for mobile
function setupStickyBuyBar() {
  // Only apply on smaller screens
  if (window.innerWidth > 768) return;
  
  const productActions = document.querySelector('.product-actions');
  if (!productActions) return;
  
  // Create sticky buy bar
  const stickyBar = document.createElement('div');
  stickyBar.className = 'sticky-buy-bar';
  stickyBar.innerHTML = `
    <div class="sticky-product-info">
      <h3>${document.querySelector('.product-info h1').textContent}</h3>
      <div class="sticky-price">${document.querySelector('.current-price').textContent}</div>
    </div>
    <button class="btn sticky-add-to-cart"><i class="fas fa-cart-plus"></i> Ajouter</button>
  `;
  
  // Add to DOM
  document.body.appendChild(stickyBar);
  
  // Add event listener to the sticky add to cart button
  const stickyAddToCartBtn = stickyBar.querySelector('.sticky-add-to-cart');
  stickyAddToCartBtn.addEventListener('click', addToCart);
  
  // Show/hide sticky bar based on scroll position
  window.addEventListener('scroll', () => {
    const productActionsPosition = productActions.getBoundingClientRect().top;
    
    if (productActionsPosition < 0) {
      stickyBar.classList.add('show');
    } else {
      stickyBar.classList.remove('show');
    }
  });
}

// Add CSS for sticky buy bar
function addStickyBuyBarStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .sticky-buy-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: white;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.8rem 1rem;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      z-index: 1000;
    }
    
    .sticky-buy-bar.show {
      transform: translateY(0);
    }
    
    .sticky-product-info {
      flex: 1;
    }
    
    .sticky-product-info h3 {
      font-size: 1rem;
      margin-bottom: 0.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .sticky-price {
      font-weight: bold;
      color: var(--dark-color);
    }
    
    .sticky-add-to-cart {
      background-color: var(--secondary-color);
      padding: 0.6rem 1.2rem;
      margin-left: 1rem;
    }
    
    .disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .added {
      background-color: #27ae60 !important;
    }
    
    .loading-indicator {
      text-align: center;
      padding: 1rem;
      color: #777;
    }
    
    .no-more-reviews {
      text-align: center;
      padding: 1rem;
      color: #777;
      font-style: italic;
    }
    
    @media (max-width: 576px) {
      .sticky-product-info h3 {
        max-width: 200px;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Event Listeners
function setupEventListeners() {
  // Thumbnail click
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => changeImage(thumbnail));
  });
  
  // Previous/Next image buttons
  if (prevImgBtn && nextImgBtn) {
    prevImgBtn.addEventListener('click', showPrevImage);
    nextImgBtn.addEventListener('click', showNextImage);
  }
  
  // Quantity controls
  if (quantityDecreaseBtn && quantityIncreaseBtn) {
    quantityDecreaseBtn.addEventListener('click', () => updateQuantity(-1));
    quantityIncreaseBtn.addEventListener('click', () => updateQuantity(1));
  }
  
  // Prevent manual input of non-numeric values
  if (quantityInput) {
    quantityInput.addEventListener('input', () => {
      quantityInput.value = quantityInput.value.replace(/[^0-9]/g, '');
      
      // Ensure value is within bounds
      const maxValue = parseInt(quantityInput.getAttribute('max'));
      const minValue = parseInt(quantityInput.getAttribute('min'));
      let newValue = parseInt(quantityInput.value) || minValue;
      
      if (newValue < minValue) newValue = minValue;
      if (newValue > maxValue) newValue = maxValue;
      
      quantityInput.value = newValue;
    });
  }
  
  // Color options
  if (colorOptions.length) {
    colorOptions.forEach(option => {
      option.addEventListener('click', () => selectColor(option));
    });
  }
  
  // Size options
  if (sizeOptions.length) {
    sizeOptions.forEach(option => {
      option.addEventListener('click', () => selectSize(option));
    });
  }
  
  // Tab buttons
  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => selectTab(btn));
    });
  }
  
  // Rating stars
  if (ratingStars.length) {
    ratingStars.forEach((star, index) => {
      star.addEventListener('click', () => setRating(index + 1));
      
      // Preview rating on hover
      star.addEventListener('mouseenter', () => {
        ratingStars.forEach((s, i) => {
          if (i <= index) {
            s.classList.remove('far');
            s.classList.add('fas');
          } else {
            s.classList.remove('fas');
            s.classList.add('far');
          }
        });
      });
    });
    
    // Reset preview on mouse leave if no rating is selected
    const ratingContainer = ratingStars[0].parentElement;
    ratingContainer.addEventListener('mouseleave', () => {
      const activeStars = document.querySelectorAll('.rating-star.active');
      if (activeStars.length === 0) {
        ratingStars.forEach(s => {
          s.classList.remove('fas');
          s.classList.add('far');
        });
      } else {
        const rating = activeStars.length;
        setRating(rating);
      }
    });
  }
  
  // Add to cart button
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', addToCart);
  }
  
  // Buy now button
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', buyNow);
  }
  
  // Wishlist button
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', toggleWishlist);
  }
  
  // Review form submission
  if (productForm) {
    productForm.addEventListener('submit', submitReview);
  }
  
  // Load more reviews button
  if (loadMoreReviewsBtn) {
    loadMoreReviewsBtn.addEventListener('click', loadMoreReviews);
  }
  
  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Left arrow key - previous image
    if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
    // Right arrow key - next image
    else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  });
  
  // Handle swipe on touch devices
  let touchStartX = 0;
  let touchEndX = 0;
  
  const productGallery = document.querySelector('.product-gallery');
  if (productGallery) {
    productGallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    productGallery.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    const threshold = 50; // Minimum swipe distance
    
    // Swipe right to left (next image)
    if (touchStartX - touchEndX > threshold) {
      showNextImage();
    }
    // Swipe left to right (previous image)
    else if (touchEndX - touchStartX > threshold) {
      showPrevImage();
    }
  }
}

// Add CSS for notifications
function addNotificationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #2c3e50;
      color: white;
      padding: 1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 300px;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification i {
      color: #3498db;
    }
    
    @media (max-width: 576px) {
      .notification {
        left: 10px;
        right: 10px;
        max-width: calc(100% - 20px);
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Fonction pour charger les données du produit selon l'ID dans l'URL
function loadProductFromUrl() {
  // Obtenir l'ID du produit depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  // Si aucun ID n'est fourni, rediriger vers la page d'accueil
  if (!productId) {
    window.location.href = 'index.html';
    return;
  }
  
  // Récupérer les données du produit
  const product = productDatabase[productId];
  
  // Si le produit n'existe pas, rediriger vers la page d'accueil
  if (!product) {
    window.location.href = 'index.html';
    return;
  }
  
  // Mettre à jour le titre de la page
  document.title = `${product.name} | Ma Boutique de Vélos`;
  
  // Mettre à jour les métadonnées pour SEO
  updateMetaTags(product);
  
  // Mettre à jour le contenu de la page
  updateProductContent(product, productId);
}

// Fonction pour mettre à jour les métadonnées
function updateMetaTags(product) {
  // Mise à jour de la description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', `${product.name} - ${product.description}`);
  }
  
  // Mise à jour des balises Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (ogTitle) ogTitle.setAttribute('content', `${product.name} | Ma Boutique de Vélos`);
  if (ogDescription) ogDescription.setAttribute('content', product.description);
  if (ogImage && product.images.length > 0) ogImage.setAttribute('content', product.images[0].src);
  
  // Mise à jour de l'URL canonique
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', `https://www.maboutiquedevelos.com/product-details.html?id=${productId}`);
  }
}

// Fonction pour mettre à jour le contenu de la page
function updateProductContent(product, productId) {
  // Mise à jour du titre du produit
  const productTitle = document.querySelector('.product-info h1');
  if (productTitle) productTitle.textContent = product.name;
  
  // Mise à jour des images
  const mainImage = document.getElementById('current-image');
  const thumbnailsContainer = document.querySelector('.product-thumbnails');
  
  if (mainImage && product.images.length > 0) {
    mainImage.src = product.images[0].src;
    mainImage.alt = product.images[0].alt;
  }
  
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = '';
    product.images.forEach((image, index) => {
      const thumbnail = document.createElement('img');
      thumbnail.src = image.src;
      thumbnail.alt = image.alt;
      if (index === 0) thumbnail.classList.add('active');
      thumbnail.onclick = function() { changeImage(this); };
      thumbnailsContainer.appendChild(thumbnail);
    });
  }
  
  // Mise à jour du prix
  const currentPrice = document.querySelector('.current-price');
  const oldPrice = document.querySelector('.old-price');
  if (currentPrice) currentPrice.textContent = product.price;
  if (oldPrice) {
    if (product.oldPrice) {
      oldPrice.textContent = product.oldPrice;
      oldPrice.style.display = 'inline';
    } else {
      oldPrice.style.display = 'none';
    }
  }
  
  // Mise à jour du badge de promotion
  const discountBadge = document.querySelector('.discount-badge');
  if (discountBadge) {
    if (product.oldPrice) {
      discountBadge.style.display = 'inline-block';
      
      // Calculer le pourcentage de réduction
      const newPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      const oldPriceValue = parseFloat(product.oldPrice.replace(/[^0-9.-]+/g, ""));
      const discount = Math.round((oldPriceValue - newPrice) / oldPriceValue * 100);
      
      discountBadge.textContent = `-${discount}%`;
    } else {
      discountBadge.style.display = 'none';
    }
  }
  
  // Mise à jour de la description
  const shortDescription = document.querySelector('.product-short-description p');
  if (shortDescription) shortDescription.textContent = product.description;
  
  // Mise à jour des étoiles de notation
  const ratingStars = document.querySelectorAll('.product-rating .stars i');
  if (ratingStars.length > 0) {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    
    ratingStars.forEach((star, index) => {
      star.className = ''; // Réinitialiser les classes
      
      if (index < fullStars) {
        star.classList.add('fas', 'fa-star');
      } else if (index === fullStars && hasHalfStar) {
        star.classList.add('fas', 'fa-star-half-alt');
      } else {
        star.classList.add('far', 'fa-star');
      }
    });
  }
  
  // Mise à jour du nombre d'avis
  const ratingCount = document.querySelector('.rating-count');
  if (ratingCount) ratingCount.textContent = `${product.rating}/5 (${product.reviewCount} avis)`;
  
  // Mise à jour des options de couleur
  const colorOptions = document.querySelector('.color-options');
  if (colorOptions && product.colors) {
    colorOptions.innerHTML = '';
    const colorMap = {
      'Bleu': '#3498db',
      'Noir': '#2c3e50',
      'Rouge': '#e74c3c',
      'Vert': '#27ae60',
      'Blanc': '#ffffff',
      'Gris': '#95a5a6',
      'Beige': '#f5f5dc'
    };
    
    product.colors.forEach((color, index) => {
      const colorBtn = document.createElement('button');
      colorBtn.className = 'color-option' + (index === 0 ? ' active' : '');
      colorBtn.dataset.color = color;
      colorBtn.setAttribute('aria-label', `Couleur ${color}`);
      colorBtn.style.backgroundColor = colorMap[color] || '#333';
      colorBtn.addEventListener('click', () => selectColor(colorBtn));
      colorOptions.appendChild(colorBtn);
    });
  }
  
  // Mise à jour des options de taille
  const sizeOptions = document.querySelector('.size-options');
  if (sizeOptions && product.sizes) {
    sizeOptions.innerHTML = '';
    product.sizes.forEach((size, index) => {
      const sizeBtn = document.createElement('button');
      sizeBtn.className = 'size-option' + (index === 0 ? ' active' : '');
      sizeBtn.dataset.size = size;
      sizeBtn.textContent = size;
      sizeBtn.addEventListener('click', () => selectSize(sizeBtn));
      sizeOptions.appendChild(sizeBtn);
    });
  }
  
  // Mise à jour des spécifications techniques
  const specsTable = document.querySelector('.specs-table');
  if (specsTable && product.specs) {
    const tbody = specsTable.querySelector('tbody') || specsTable;
    tbody.innerHTML = '';
    
    for (const [key, value] of Object.entries(product.specs)) {
      const row = document.createElement('tr');
      
      const th = document.createElement('th');
      th.textContent = key;
      
      const td = document.createElement('td');
      td.textContent = value;
      
      row.appendChild(th);
      row.appendChild(td);
      tbody.appendChild(row);
    }
  }
  
  // Mise à jour du fil d'Ariane
  const breadcrumbsSpan = document.querySelector('.breadcrumbs span');
  if (breadcrumbsSpan) breadcrumbsSpan.textContent = product.name;
  
  // Mise à jour du lien de catégorie dans le fil d'Ariane
  const breadcrumbsLinks = document.querySelectorAll('.breadcrumbs a');
  if (breadcrumbsLinks.length >= 2) {
    let categoryName = 'Produits';
    
    switch (product.category) {
      case 'electric':
        categoryName = 'Vélos Électriques';
        break;
      case 'scooter':
        categoryName = 'Trottinettes';
        break;
      case 'classic':
        categoryName = 'Vélos Classiques';
        break;
    }
    
    breadcrumbsLinks[1].textContent = categoryName;
    breadcrumbsLinks[1].href = `index.html?category=${product.category}`;
  }
  
  // Mise à jour des données structurées JSON-LD
  updateJsonLd(product, productId);
}

// Mise à jour des données structurées JSON-LD
function updateJsonLd(product, productId) {
  const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
  if (!jsonLdScript) return;
  
  const imageUrls = product.images.map(img => img.src);
  
  const jsonLdData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": imageUrls,
    "description": product.description,
    "sku": `SKU-${productId}`,
    "mpn": `MPN-${productId}`,
    "brand": {
      "@type": "Brand",
      "name": "EcoBike"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": product.rating.toString(),
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Client Satisfait"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating.toString(),
      "reviewCount": product.reviewCount.toString()
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.maboutiquedevelos.com/product-details.html?id=${productId}`,
      "priceCurrency": "MAD",
      "price": product.price.replace(/[^0-9.-]+/g, ""),
      "priceValidUntil": "2024-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Ma Boutique de Vélos"
      }
    }
  };
  
  jsonLdScript.textContent = JSON.stringify(jsonLdData);
}

// Modifier la fonction init pour appeler loadProductFromUrl
function init() {
  loadProductFromUrl();
  setupEventListeners();
  setupZoomEffect();
  checkProductAvailability();
  updateRecentlyViewed();
  enhanceImageNavigation();
  addNavigationIndicators();
}

// Image Gallery Functions
function changeImage(thumbnail) {
  // Update main image with fade effect
  mainImage.style.opacity = 0;
  
  setTimeout(() => {
    mainImage.src = thumbnail.src;
    mainImage.alt = thumbnail.alt;
    mainImage.style.opacity = 1;
  }, 200);
  
  // Update active thumbnail
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  thumbnail.classList.add('active');
  
  // Update current index
  currentThumbnailIndex = Array.from(thumbnails).indexOf(thumbnail);
  
  // Scroll thumbnail into view if needed
  scrollThumbnailIntoView(thumbnail);
}

function scrollThumbnailIntoView(thumbnail) {
  // Scroll the thumbnail into view if it's not fully visible
  const container = document.querySelector('.product-thumbnails');
  if (!container) return;
  
  const thumbnailRect = thumbnail.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  if (thumbnailRect.left < containerRect.left) {
    container.scrollLeft += thumbnailRect.left - containerRect.left - 10;
  } else if (thumbnailRect.right > containerRect.right) {
    container.scrollLeft += thumbnailRect.right - containerRect.right + 10;
  }
}

function showPrevImage() {
  currentThumbnailIndex = (currentThumbnailIndex - 1 + thumbnails.length) % thumbnails.length;
  changeImage(thumbnails[currentThumbnailIndex]);
}

function showNextImage() {
  currentThumbnailIndex = (currentThumbnailIndex + 1) % thumbnails.length;
  changeImage(thumbnails[currentThumbnailIndex]);
}

// Setup zoom effect for main product image
function setupZoomEffect() {
  const imageContainer = document.querySelector('.product-main-image');
  
  if (!imageContainer) return;
  
  imageContainer.addEventListener('mousemove', function(e) {
    // Only enable on desktop
    if (window.innerWidth <= 768) return;
    
    const { left, top, width, height } = this.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    mainImage.style.transform = 'scale(1.5)';
  });
  
  imageContainer.addEventListener('mouseleave', function() {
    mainImage.style.transform = 'scale(1)';
  });
}

// Quantity Functions
function updateQuantity(change) {
  const currentValue = parseInt(quantityInput.value);
  const maxValue = parseInt(quantityInput.getAttribute('max'));
  const minValue = parseInt(quantityInput.getAttribute('min'));
  let newValue = currentValue + change;
  
  // Ensure value is within bounds
  if (newValue < minValue) newValue = minValue;
  if (newValue > maxValue) newValue = maxValue;
  
  quantityInput.value = newValue;
}

// Check product availability based on selected variants
function checkProductAvailability() {
  const selectedColor = document.querySelector('.color-option.active').dataset.color;
  const selectedSize = document.querySelector('.size-option.active').dataset.size;
  
  // Simulate inventory check (in real app, this would be an API call)
  const availableInventory = {
    'Bleu-M': 15,
    'Bleu-L': 8,
    'Bleu-XL': 5,
    'Noir-S': 10,
    'Noir-M': 7,
    'Noir-L': 0,
    'Rouge-S': 3,
    'Rouge-M': 6
  };
  
  const key = `${selectedColor}-${selectedSize}`;
  const stock = availableInventory[key] || 0;
  const stockElement = document.querySelector('.product-stock');
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  const buyNowBtn = document.querySelector('.buy-now-btn');
  
  // Update quantity max attribute
  if (quantityInput) {
    quantityInput.setAttribute('max', stock);
    if (parseInt(quantityInput.value) > stock) {
      quantityInput.value = stock > 0 ? stock : 1;
    }
  }
  
  // Update stock indicator
  if (stockElement) {
    if (stock > 5) {
      stockElement.innerHTML = `<i class="fas fa-check-circle"></i> En stock (${stock} disponibles)`;
      stockElement.className = 'product-stock in-stock';
    } else if (stock > 0) {
      stockElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> Stock limité (${stock} disponibles)`;
      stockElement.className = 'product-stock limited-stock';
    } else {
      stockElement.innerHTML = `<i class="fas fa-times-circle"></i> Rupture de stock`;
      stockElement.className = 'product-stock out-of-stock';
    }
  }
  
  // Disable/Enable buttons based on stock
  if (addToCartBtn && buyNowBtn) {
    if (stock === 0) {
      addToCartBtn.disabled = true;
      buyNowBtn.disabled = true;
      addToCartBtn.classList.add('disabled');
      buyNowBtn.classList.add('disabled');
    } else {
      addToCartBtn.disabled = false;
      buyNowBtn.disabled = false;
      addToCartBtn.classList.remove('disabled');
      buyNowBtn.classList.remove('disabled');
    }
  }
}

// Variant Selection Functions
function selectColor(selected) {
  colorOptions.forEach(option => option.classList.remove('active'));
  selected.classList.add('active');
  
  // Update product information based on color selection
  checkProductAvailability();
}

function selectSize(selected) {
  sizeOptions.forEach(option => option.classList.remove('active'));
  selected.classList.add('active');
  
  // Update product information based on size selection
  checkProductAvailability();
}

// Tab Functions
function selectTab(selected) {
  // Update tab buttons
  tabButtons.forEach(btn => btn.classList.remove('active'));
  selected.classList.add('active');
  
  // Show corresponding tab content
  const tabId = selected.dataset.tab;
  tabPanes.forEach(pane => {
    pane.classList.remove('active');
    if (pane.id === tabId) {
      pane.classList.add('active');
    }
  });
}

// Rating Functions
function setRating(rating) {
  ratingStars.forEach((star, index) => {
    if (index < rating) {
      star.classList.remove('far');
      star.classList.add('fas', 'active');
    } else {
      star.classList.remove('fas', 'active');
      star.classList.add('far');
    }
  });
}

// Cart Functions
function addToCart() {
  const productName = document.querySelector('.product-info h1').textContent;
  const quantity = parseInt(quantityInput.value);
  const color = document.querySelector('.color-option.active').dataset.color;
  const size = document.querySelector('.size-option.active').dataset.size;
  
  // Display notification
  showNotification(`${quantity} ${productName} (${color}, ${size}) ajouté au panier`);
  
  // Update cart count in the header
  const cartCount = document.querySelector('.cart-count');
  cartCount.textContent = parseInt(cartCount.textContent) + quantity;
  
  // Animation effect
  addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Ajouté';
  addToCartBtn.classList.add('added');
  
  setTimeout(() => {
    addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter au panier';
    addToCartBtn.classList.remove('added');
  }, 1500);
}

function buyNow() {
  addToCart();
  // Redirect to checkout page
  setTimeout(() => {
    window.location.href = 'checkout.html';
  }, 500);
}

function toggleWishlist() {
  const icon = wishlistBtn.querySelector('i');
  
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    icon.style.color = '#e74c3c';
    showNotification('Produit ajouté à vos favoris');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    icon.style.color = '';
    showNotification('Produit retiré de vos favoris');
  }
}

// Recently Viewed Products
function updateRecentlyViewed() {
  // Get current product info
  const productId = new URL(window.location.href).searchParams.get('id') || 'velo-electrique-x1';
  const productImage = document.querySelector('.product-main-image img').src;
  const productName = document.querySelector('.product-info h1').textContent;
  const productPrice = document.querySelector('.current-price').textContent;
  
  // Create product object
  const product = {
    id: productId,
    name: productName,
    image: productImage,
    price: productPrice,
    url: window.location.href
  };
  
  // Get existing recently viewed products from localStorage
  let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  
  // Remove current product if it's already in the list
  recentlyViewed = recentlyViewed.filter(item => item.id !== productId);
  
  // Add current product to the beginning of the array
  recentlyViewed.unshift(product);
  
  // Keep only the last 4 products
  recentlyViewed = recentlyViewed.slice(0, 4);
  
  // Save back to localStorage
  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Review Functions
function loadMoreReviews() {
  // Simulate loading more reviews
  const reviewsList = document.querySelector('.reviews-list');
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
  
  loadMoreReviewsBtn.style.display = 'none';
  reviewsList.appendChild(loadingIndicator);
  
  // Simulate API call delay
  setTimeout(() => {
    reviewsList.removeChild(loadingIndicator);
    
    // Sample additional reviews
    const additionalReviews = `
      <div class="review-item">
        <div class="review-header">
          <div class="reviewer-info">
            <img src="images/avatar-placeholder.jpg" alt="Avatar de l'utilisateur" class="reviewer-avatar">
            <div>
              <strong>Sophia R.</strong>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div class="review-date">12 mars 2023</div>
        </div>
        <div class="review-content">
          <p>J'adore ce vélo électrique ! Il est très confortable et facile à utiliser. L'autonomie est excellente, même sur des trajets plus longs. Je l'utilise tous les jours pour aller au travail et je ne regrette pas mon achat.</p>
        </div>
      </div>
      
      <div class="review-item">
        <div class="review-header">
          <div class="reviewer-info">
            <img src="images/avatar-placeholder.jpg" alt="Avatar de l'utilisateur" class="reviewer-avatar">
            <div>
              <strong>Younes T.</strong>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
              </div>
            </div>
          </div>
          <div class="review-date">28 février 2023</div>
        </div>
        <div class="review-content">
          <p>Le vélo est bien, mais l'assemblage était un peu difficile. Les instructions n'étaient pas très claires. Une fois monté, il fonctionne correctement, mais j'aurais aimé plus d'assistance pour le montage.</p>
        </div>
      </div>
    `;
    
    // Insert before the "load more" button
    const insertPoint = loadMoreReviewsBtn.parentNode;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = additionalReviews;
    
    while (tempDiv.firstChild) {
      insertPoint.insertBefore(tempDiv.firstChild, loadMoreReviewsBtn);
    }
    
    // Show a message that there are no more reviews
    const noMoreReviews = document.createElement('p');
    noMoreReviews.className = 'no-more-reviews';
    noMoreReviews.textContent = 'Tous les avis ont été chargés';
    insertPoint.insertBefore(noMoreReviews, loadMoreReviewsBtn);
  }, 1500);
}

function submitReview(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('review-name').value;
  const email = document.getElementById('review-email').value;
  const content = document.getElementById('review-content').value;
  
  // Get selected rating
  const activeStars = document.querySelectorAll('.rating-star.active');
  const rating = activeStars.length;
  
  if (rating === 0) {
    alert('Veuillez attribuer une note au produit.');
    return;
  }
  
  // In a real application, you would send this data to your server
  console.log('Review submitted:', { name, email, content, rating });
  
  // Show confirmation
  showNotification('Merci pour votre avis ! Il sera publié après modération.');
  
  // Reset form
  document.querySelector('.review-form').reset();
  setRating(0);
}

// Ajouter les fonctions manquantes pour éviter les erreurs
function enhanceImageNavigation() {
  // Ajouter des boutons de navigation si absents
  if (!prevImgBtn || !nextImgBtn) {
    const productGallery = document.querySelector('.product-gallery');
    if (!productGallery) return;
    
    const imageControls = document.createElement('div');
    imageControls.className = 'image-controls';
    productGallery.appendChild(imageControls);
    
    if (!prevImgBtn) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'prev-img';
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevBtn.setAttribute('aria-label', 'Image précédente');
      imageControls.appendChild(prevBtn);
      
      prevBtn.addEventListener('click', showPrevImage);
    }
    
    if (!nextImgBtn) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'next-img';
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextBtn.setAttribute('aria-label', 'Image suivante');
      imageControls.appendChild(nextBtn);
      
      nextBtn.addEventListener('click', showNextImage);
    }
  }
}

function addNavigationIndicators() {
  // Ajouter des indicateurs de navigation pour les images
  const productGallery = document.querySelector('.product-gallery');
  if (!productGallery || !thumbnails.length) return;
  
  const indicators = document.createElement('div');
  indicators.className = 'image-indicators';
  
  // Créer une fonction séparée pour gérer le clic sur l'indicateur
  function handleDotClick(e) {
    const index = parseInt(e.currentTarget.getAttribute('data-index'));
    if (index >= 0 && index < thumbnails.length) {
      changeImage(thumbnails[index]);
    }
  }
  
  // Générer les indicateurs
  for (let i = 0; i < thumbnails.length; i++) {
    const dot = document.createElement('span');
    dot.className = 'image-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('data-index', i);
    
    // Utiliser la fonction externe au lieu de déclarer une nouvelle fonction à chaque itération
    dot.addEventListener('click', handleDotClick);
    
    indicators.appendChild(dot);
  }
  
  productGallery.appendChild(indicators);
}

// Initialiser au chargement du document
document.addEventListener('DOMContentLoaded', function() {
  addNotificationStyles();
  addStickyBuyBarStyles();
  init();
});