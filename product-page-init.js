document.addEventListener('DOMContentLoaded', function() {
  // Initialisation des sliders produit avec Swiper
  initProductGallery();
  
  // Initialisation des autres éléments de la page produit
  initProductPageElements();
});

function initProductGallery() {
  try {
    // Vérifier si Swiper est disponible
    if (typeof Swiper === 'undefined') {
      console.error('Swiper n\'est pas disponible');
      return;
    }

    // Initialiser le Swiper des miniatures en premier
    const thumbsSwiper = new Swiper('.product-thumbs-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      watchSlidesProgress: true,
      centerInsufficientSlides: true,
      slideToClickedSlide: true,
      // Assurez-vous que toutes les miniatures sont visibles sur les grands écrans
      breakpoints: {
        // Pour les écrans mobiles
        320: {
          slidesPerView: 3.5,
          spaceBetween: 8
        },
        // Pour les tablettes
        768: {
          slidesPerView: 6,
          spaceBetween: 10
        },
        // Pour les grands écrans
        1024: {
          slidesPerView: 8, // Afficher toutes les miniatures sur grand écran
          spaceBetween: 12
        }
      },
      // Activer la navigation pour les miniatures sur les petits écrans
      navigation: {
        nextEl: '.thumbs-button-next',
        prevEl: '.thumbs-button-prev',
      }
    });

    // Initialiser le Swiper principal
    const mainSwiper = new Swiper('.product-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false, // Désactiver la boucle pour éviter les problèmes de synchronisation
      zoom: {
        maxRatio: 2,
        toggle: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '" data-total="' + this.slides.length + '"></span>';
        }
      },
      // Lier avec les miniatures
      thumbs: {
        swiper: thumbsSwiper
      }
    });

    // Ajouter la classe visible aux miniatures
    const miniatures = document.querySelectorAll('.product-thumbs-swiper .swiper-slide');
    miniatures.forEach(function(miniature) {
      miniature.classList.add('visible');
    });

  } catch (error) {
    console.error('Erreur lors de l\'initialisation de Swiper:', error);
  }
}

function initProductPageElements() {
  // Initialiser les options de couleur
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColorDisplay = document.getElementById('selected-color');
  
  if (colorOptions.length > 0) {
    // Définir la première couleur comme active par défaut
    colorOptions[0].classList.add('active');
    if (selectedColorDisplay) {
      selectedColorDisplay.textContent = `Couleur: ${colorOptions[0].dataset.color}`;
    }

    colorOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Désactiver toutes les options
        colorOptions.forEach(opt => opt.classList.remove('active'));
        
        // Activer l'option cliquée
        this.classList.add('active');
        
        // Mettre à jour l'affichage de la couleur sélectionnée
        if (selectedColorDisplay) {
          selectedColorDisplay.textContent = `Couleur: ${this.dataset.color}`;
        }
      });
    });
  }

  // Initialiser le contrôle de quantité
  const quantityInput = document.getElementById('quantity');
  const decreaseBtn = document.querySelector('.quantity-decrease');
  const increaseBtn = document.querySelector('.quantity-increase');
  
  if (quantityInput && decreaseBtn && increaseBtn) {
    decreaseBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    increaseBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value) || 1;
      const max = parseInt(quantityInput.getAttribute('max')) || 15;
      if (currentValue < max) {
        quantityInput.value = currentValue + 1;
      }
    });
  }

  // Initialiser les onglets de produit
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Désactiver tous les onglets
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Activer l'onglet cliqué
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        const pane = document.getElementById(tabId);
        
        if (pane) pane.classList.add('active');
      });
    });
  }
}
