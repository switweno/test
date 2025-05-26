// Script d'initialisation pour les pages produit

document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si les éléments de la page produit existent
  const productGallery = document.querySelector('.product-gallery');
  const productTabs = document.querySelector('.product-tabs');
  
  if (productGallery) {
    // Initialiser la galerie d'images
    initProductGallery();
  }
  
  if (productTabs) {
    // Initialiser les onglets de produit
    initProductTabs();
  }
  
  // Initialiser les autres fonctionnalités de la page produit
  initQuantityControls();
  initColorOptions();
  initSizeOptions();
  initAddToCart();
  setupStickyBuyBar();
});

// Initialisation de la galerie d'images
function initProductGallery() {
  const mainImage = document.getElementById('current-image');
  const thumbnails = document.querySelectorAll('.product-thumbnails img');
  const prevImgBtn = document.querySelector('.prev-img');
  const nextImgBtn = document.querySelector('.next-img');
  
  if (!mainImage || thumbnails.length === 0) return;
  
  let currentIndex = 0;
  
  // Fonction pour changer l'image principale
  function changeImage(index) {
    if (index < 0) index = thumbnails.length - 1;
    if (index >= thumbnails.length) index = 0;
    
    currentIndex = index;
    
    // Mettre à jour l'image principale avec effet de fondu
    mainImage.style.opacity = 0;
    
    setTimeout(() => {
      mainImage.src = thumbnails[index].src;
      mainImage.alt = thumbnails[index].alt;
      mainImage.style.opacity = 1;
    }, 200);
    
    // Mettre à jour la vignette active
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnails[index].classList.add('active');
  }
  
  // Ajouter les événements aux vignettes
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => changeImage(index));
  });
  
  // Ajouter les événements aux boutons de navigation
  if (prevImgBtn) {
    prevImgBtn.addEventListener('click', () => changeImage(currentIndex - 1));
  }
  
  if (nextImgBtn) {
    nextImgBtn.addEventListener('click', () => changeImage(currentIndex + 1));
  }
  
  // Ajouter la navigation par clavier
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      changeImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      changeImage(currentIndex + 1);
    }
  });
  
  // Ajouter la navigation par swipe sur mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  const gallery = document.querySelector('.product-gallery');
  
  gallery.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  gallery.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    
    // Détecter la direction du swipe
    if (touchStartX - touchEndX > 50) { // Swipe vers la gauche
      changeImage(currentIndex + 1);
    } else if (touchEndX - touchStartX > 50) { // Swipe vers la droite
      changeImage(currentIndex - 1);
    }
  }, { passive: true });
  
  // Initialiser l'effet de zoom
  const imageContainer = document.querySelector('.product-main-image');
  
  if (imageContainer) {
    imageContainer.addEventListener('mousemove', function(e) {
      // Activer uniquement sur desktop
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
  
  // Exposer la fonction globalement pour les attributs onclick dans le HTML
  window.changeImage = function(thumbnail) {
    const index = Array.from(thumbnails).indexOf(thumbnail);
    if (index !== -1) {
      changeImage(index);
    }
  };
  
  // Améliorer l'expérience utilisateur lors de la navigation dans les images
  function enhanceImageNavigation() {
    // Ajouter des boutons de navigation si absents
    if (!prevImgBtn || !nextImgBtn) {
      const productGallery = document.querySelector('.product-gallery');
      if (!productGallery) return;
      
      const imageControls = document.createElement('div');
      imageControls.className = 'image-controls';
      productGallery.appendChild(imageControls);
      
      const mainImage = document.querySelector('.product-main-image');
      const mainImageHeight = mainImage ? mainImage.offsetHeight : 400;
      
      const prevBtn = document.createElement('button');
      prevBtn.className = 'prev-img';
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevBtn.setAttribute('aria-label', 'Image précédente');
      
      // Positionnement correct pour les écrans larges
      const verticalCenter = mainImageHeight / 2;
      prevBtn.style.top = `-${verticalCenter}px`;
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'next-img';
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextBtn.setAttribute('aria-label', 'Image suivante');
      nextBtn.style.top = `-${verticalCenter}px`;
      
      imageControls.appendChild(prevBtn);
      imageControls.appendChild(nextBtn);
      
      // Mettre à jour les références
      window.prevImgBtn = prevBtn;
      window.nextImgBtn = nextBtn;
      
      // Ajouter les événements
      prevBtn.addEventListener('click', () => changeImage(currentIndex - 1));
      nextBtn.addEventListener('click', () => changeImage(currentIndex + 1));
    }
    
    // Ajuster la position des boutons sur resize
    window.addEventListener('resize', function() {
      const mainImage = document.querySelector('.product-main-image');
      const prevImg = document.querySelector('.product-gallery .prev-img');
      const nextImg = document.querySelector('.product-gallery .next-img');
      
      if (mainImage && prevImg && nextImg) {
        const verticalCenter = mainImage.offsetHeight / 2;
        prevImg.style.top = `-${verticalCenter}px`;
        nextImg.style.top = `-${verticalCenter}px`;
      }
    });
  }
  
  enhanceImageNavigation();
}

// Initialisation des onglets de produit
function initProductTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length === 0 || tabPanes.length === 0) return;
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Retirer la classe active de tous les boutons
      tabButtons.forEach(b => b.classList.remove('active'));
      
      // Ajouter la classe active au bouton cliqué
      this.classList.add('active');
      
      // Afficher le contenu correspondant
      const tabId = this.dataset.tab;
      
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === tabId) {
          pane.classList.add('active');
        }
      });
    });
  });
}

// Initialisation des contrôles de quantité
function initQuantityControls() {
  const quantityInput = document.getElementById('quantity');
  const decreaseBtn = document.querySelector('.quantity-decrease');
  const increaseBtn = document.querySelector('.quantity-increase');
  
  if (!quantityInput || !decreaseBtn || !increaseBtn) return;
  
  decreaseBtn.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
      quantityInput.value = value - 1;
    }
  });
  
  increaseBtn.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    let max = parseInt(quantityInput.getAttribute('max') || 99);
    
    if (value < max) {
      quantityInput.value = value + 1;
    }
  });
  
  quantityInput.addEventListener('input', function() {
    let value = this.value.replace(/[^0-9]/g, '');
    let min = parseInt(this.getAttribute('min') || 1);
    let max = parseInt(this.getAttribute('max') || 99);
    
    if (value === '' || parseInt(value) < min) {
      value = min;
    }
    
    if (parseInt(value) > max) {
      value = max;
    }
    
    this.value = value;
  });
}

// Initialisation des options de couleur
function initColorOptions() {
  const colorOptions = document.querySelectorAll('.color-option');
  
  if (colorOptions.length === 0) return;
  
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      colorOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// Initialisation des options de taille
function initSizeOptions() {
  const sizeOptions = document.querySelectorAll('.size-option');
  
  if (sizeOptions.length === 0) return;
  
  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      sizeOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// Initialisation du bouton de commande
function initAddToCart() {
  const orderNowBtn = document.querySelector('.order-now-btn');
  
  if (orderNowBtn) {
    orderNowBtn.addEventListener('click', function() {
      try {
        // Récupérer les informations du produit
        const productName = document.querySelector('.product-info h1').textContent;
        
        // Récupérer la quantité
        const quantityInput = document.getElementById('quantity');
        let quantity = 1; // Valeur par défaut
        
        if (quantityInput) {
          quantity = parseInt(quantityInput.value, 10);
          if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
          }
        }
        
        // Récupérer la couleur sélectionnée
        const colorOption = document.querySelector('.color-option.active');
        const color = colorOption ? colorOption.dataset.color : '';
        
        // Récupérer le prix
        const priceElement = document.querySelector('.current-price');
        const productPrice = priceElement ? parseFloat(priceElement.textContent.replace(/[^\d.-]/g, '')) : 0;
        
        // Récupérer l'image CORRECTEMENT - Prenons l'image actuellement affichée
        const mainImage = document.querySelector('.product-main-image img');
        const productImage = mainImage ? mainImage.src : '';
        
        // Extraire juste le nom du fichier si c'est une URL complète
        let imagePath = productImage;
        if (productImage.includes('/')) {
          // Extraire le nom du fichier de l'URL complète
          const urlParts = productImage.split('/');
          imagePath = urlParts[urlParts.length - 1];
        }
        
        console.log("Chemin d'image capturé:", imagePath);
        
        // Créer l'objet produit
        const product = {
          name: productName || "Vélo Électrique X1",
          price: productPrice,
          quantity: Number(quantity),
          color: color,
          image: imagePath,
          total: productPrice * Number(quantity),
          id: 'velo-electrique-x1' // Ajout de l'ID pour le retour à la page produit
        };
        
        console.log("Produit à enregistrer:", product);
        
        // Vider localStorage avant d'enregistrer
        localStorage.removeItem('commandeProduct');
        
        // Enregistrer dans localStorage
        localStorage.setItem('commandeProduct', JSON.stringify(product));
        
        // Rediriger vers la page de commande
        window.location.href = '../commande.html';
      } catch (error) {
        console.error('Erreur lors de la préparation de la commande:', error);
        window.location.href = '../commande.html';
      }
    });
  }
}



// Fonction pour afficher une notification
function showNotification(message) {
  // Créer l'élément de notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-info-circle"></i>
    <p>${message}</p>
  `;
  
  // Ajouter au DOM
  document.body.appendChild(notification);
  
  // Ajouter les styles CSS pour les notifications
  const notificationStyle = document.createElement('style');
  notificationStyle.textContent = `
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
  
  document.head.appendChild(notificationStyle);
  
  // Afficher avec animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Supprimer après l'animation
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Assurez-vous que les liens du panier fonctionnent correctement
document.addEventListener('DOMContentLoaded', function() {
  // Mettre à jour le compteur du panier
  updateCartCount();
  
  // Vérifier que l'icône du panier a un lien correct
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon && !cartIcon.getAttribute('href')) {
    cartIcon.setAttribute('href', '../panier.html');
  }
});

// Fonction pour mettre à jour le compteur du panier - remplacée par une fonction vide pour éviter les erreurs
function updateCartCount() {
  // Fonction vidée car nous n'utilisons plus le panier
}
const swiper = new Swiper('.product-swiper', {
  loop: true,
  zoom: {
    maxRatio: 3,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: new Swiper('.product-thumbs-swiper', {
      slidesPerView: 4,
      spaceBetween: 10,
      freeMode: true,
      watchSlidesProgress: true,
    }),
  },
});