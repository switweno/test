/**
 * Script optimisé pour la page de détails des produits
 * Ce fichier remplace les anciens scripts non fonctionnels
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialisation de la galerie d'images
  initProductGallery();
  
  // Initialisation des onglets du produit
  initProductTabs();
  
  // Initialisation des contrôles de quantité
  initQuantityControls();
  
  // Initialisation des options de couleur
  initColorOptions();
  
  // Initialisation du bouton de commande
  initOrderButton();
});

/**
 * Initialisation de la galerie d'images avec Swiper
 */
function initProductGallery() {
  // Vérifier si Swiper est disponible
  if (typeof Swiper === 'undefined') return;
  
  try {
    // Initialiser le Swiper principal
    const mainSwiper = new Swiper('.product-swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '" data-total="' + this.slides.length + '"></span>';
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
    
    // Initialiser le Swiper des miniatures
    const thumbsSwiper = new Swiper('.product-thumbs-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      centerInsufficientSlides: true,
      watchSlidesProgress: true
    });
    
    // Connecter les deux Swipers
    if (mainSwiper && thumbsSwiper) {
      mainSwiper.thumbs = {
        swiper: thumbsSwiper
      };
      
      mainSwiper.thumbs.init();
    }
  } catch (error) {
    console.warn("Erreur lors de l'initialisation de Swiper:", error);
  }
}

/**
 * Initialisation des onglets de la page produit
 */
function initProductTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (!tabButtons.length || !tabPanes.length) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Désactiver tous les onglets
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Activer l'onglet sélectionné
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      const pane = document.getElementById(tabId);
      
      if (pane) pane.classList.add('active');
    });
  });
}

/**
 * Initialisation des contrôles de quantité
 */
function initQuantityControls() {
  const quantityInput = document.getElementById('quantity');
  const decreaseBtn = document.querySelector('.quantity-decrease');
  const increaseBtn = document.querySelector('.quantity-increase');
  
  if (!quantityInput || !decreaseBtn || !increaseBtn) return;
  
  // Bouton de diminution
  decreaseBtn.addEventListener('click', function() {
    const currentValue = parseInt(quantityInput.value) || 1;
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
  
  // Bouton d'augmentation
  increaseBtn.addEventListener('click', function() {
    const currentValue = parseInt(quantityInput.value) || 1;
    const max = parseInt(quantityInput.getAttribute('max')) || 15;
    if (currentValue < max) {
      quantityInput.value = currentValue + 1;
    }
  });
  
  // Validation de la saisie
  quantityInput.addEventListener('input', function() {
    let value = this.value.replace(/[^0-9]/g, '');
    const min = parseInt(this.getAttribute('min')) || 1;
    const max = parseInt(this.getAttribute('max')) || 15;
    
    if (value === '' || parseInt(value) < min) {
      value = min;
    } else if (parseInt(value) > max) {
      value = max;
    }
    
    this.value = value;
  });
}

/**
 * Initialisation des options de couleur
 */
function initColorOptions() {
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColorDisplay = document.getElementById('selected-color');
  
  if (!colorOptions.length) return;
  
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Désactiver toutes les options
      colorOptions.forEach(opt => opt.classList.remove('active'));
      
      // Activer l'option sélectionnée
      this.classList.add('active');
      
      // Afficher la couleur sélectionnée
      if (selectedColorDisplay) {
        selectedColorDisplay.textContent = `Couleur: ${this.dataset.color}`;
      }
    });
  });
}

/**
 * Initialisation du bouton de commande
 */
function initOrderButton() {
  const orderBtn = document.querySelector('.whatsapp-order-btn');
  
  if (!orderBtn) return;
  
  orderBtn.addEventListener('click', function() {
    // Récupérer les informations du produit
    const productName = document.querySelector('.product-info h1').textContent;
    const productPrice = document.querySelector('.current-price').textContent.trim();
    
    // Récupérer la quantité
    const quantity = document.getElementById('quantity');
    const quantityValue = quantity ? quantity.value : 1;
    
    // Récupérer la couleur si sélectionnée
    const colorOption = document.querySelector('.color-option.active');
    const colorValue = colorOption ? colorOption.dataset.color : '';
    
    // Créer l'objet produit
    const product = {
      name: productName,
      price: parseFloat(productPrice.replace(/[^\d.-]/g, '')),
      quantity: parseInt(quantityValue),
      total: parseFloat(productPrice.replace(/[^\d.-]/g, '')) * parseInt(quantityValue)
    };
    
    // N'ajouter la couleur que si elle a été explicitement sélectionnée
    if (colorOption) {
      product.color = colorValue;
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('commandeProduct', JSON.stringify(product));
    
    // Rediriger vers la page de commande
    window.location.href = '../commande.html';
  });
}


