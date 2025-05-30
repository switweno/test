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
  // Suppression de l'appel à setupStickyBuyBar() qui n'est pas défini
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
  const selectedColorDisplay = document.getElementById('selected-color');
  
  if (colorOptions.length === 0) return;
  
  // Variable pour suivre si une couleur a été sélectionnée
  let colorSelected = false;
  
  colorOptions.forEach(option => {
    // Vérifier si une option a déjà la classe 'active' (par défaut)
    if (option.classList.contains('active')) {
      colorSelected = true;
      // Afficher la couleur actuellement sélectionnée
      if (selectedColorDisplay) {
        selectedColorDisplay.textContent = `Couleur: ${option.dataset.color}`;
      }
    }
    
    option.addEventListener('click', function() {
      colorOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      colorSelected = true; // Marquer qu'une couleur a été explicitement sélectionnée
      
      // Afficher la couleur sélectionnée
      if (selectedColorDisplay) {
        selectedColorDisplay.textContent = `Couleur: ${this.dataset.color}`;
      }
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
        
        // Récupérer la couleur sélectionnée UNIQUEMENT si elle a été explicitement choisie
        const colorOption = document.querySelector('.color-option.active');
        const color = colorOption ? colorOption.dataset.color : '';
        
        // Ne pas inclure la couleur si elle n'a pas été explicitement sélectionnée
        
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
          image: imagePath,
          total: productPrice * Number(quantity),
          id: 'velo-electrique-likebike-shine-s'
        };
        
        // N'ajouter la couleur à l'objet que si elle a été explicitement sélectionnée
        if (colorOption) {
          product.color = color;
        }
        
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


// Initialisation de Swiper sans pagination
try {
  // Vérifier si Swiper est disponible avant de l'initialiser
  if (typeof Swiper !== 'undefined') {
    // Supprimer complètement l'élément de pagination s'il existe
    const paginationContainer = document.querySelector('.swiper-pagination');
    if (paginationContainer && paginationContainer.parentNode) {
      paginationContainer.parentNode.removeChild(paginationContainer);
    }
    
    

    
    
    const swiper = new Swiper('.product-swiper', {
      loop: true,
      zoom: {
        maxRatio: 3,
      },
      // Désactiver complètement la pagination
      pagination: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: new Swiper('.product-thumbs-swiper', {
          // Adapter le nombre de diapositives en fonction de la taille de l'écran
          slidesPerView: 'auto',
          // Centre les slides quand il n'y a pas assez pour remplir le conteneur
          centeredSlides: false,
          // Espace entre les slides en pixels
          spaceBetween: 10,
          freeMode: true,
          watchSlidesProgress: true,
          // Responsive breakpoints
          breakpoints: {
            // Quand la largeur de la fenêtre est >= 320px
            320: {
              slidesPerView: 4,
              spaceBetween: 5
            },
            // Quand la largeur de la fenêtre est >= 480px
            480: {
              slidesPerView: 5,
              spaceBetween: 10
            },
            // Quand la largeur de la fenêtre est >= 768px
            768: {
              slidesPerView: 5,
              spaceBetween: 15
            },
            // Quand la largeur de la fenêtre est >= 992px
            992: {
              slidesPerView: 6,
              spaceBetween: 15
            },
            // Quand la largeur de la fenêtre est >= 1200px
            2200: {
              slidesPerView: 7,
              spaceBetween: 15
            }
          }
        }),
      },
    });
  }
} catch (error) {
  console.warn("Swiper n'est pas initialisé correctement:", error);
}

// Fonction pour gérer les produits récemment consultés
function initRecentlyViewed() {
  // Obtenir l'ID du produit actuel depuis l'URL
  const currentProductId = window.location.pathname.split('/').pop().replace('.html', '');
  
  // Récupérer les produits récemment consultés du localStorage
  let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  
  // Ajouter le produit actuel au début et éviter les doublons
  recentlyViewed = recentlyViewed.filter(id => id !== currentProductId);
  recentlyViewed.unshift(currentProductId);
  
  // Limiter à 4 produits maximum
  recentlyViewed = recentlyViewed.slice(0, 4);
  
  // Sauvegarder dans localStorage
  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Exécuter la fonction quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
  // Initialiser les produits récemment consultés
  initRecentlyViewed();
});

