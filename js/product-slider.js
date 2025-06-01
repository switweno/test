/**
 * Script optimisé pour le slider d'images portrait (600x750px)
 * Avec correction définitive des préchargeurs persistants
 */

document.addEventListener('DOMContentLoaded', function() {
  initProductSlider();
  
  // Solution radicale: masquer tous les préchargeurs après un délai
  setTimeout(function() {
    const allPreloaders = document.querySelectorAll('.swiper-lazy-preloader');
    allPreloaders.forEach(function(preloader) {
      preloader.classList.add('preloader-hidden');
    });
  }, 2000); // 2 secondes après le chargement de la page
});

function initProductSlider() {
  // Vérifier si Swiper est disponible
  if (typeof Swiper === 'undefined') {
    console.error('Swiper n\'est pas disponible');
    return;
  }

  // Vérifier si les éléments du slider existent
  const productSwiper = document.querySelector('.product-swiper');
  const thumbsSwiper = document.querySelector('.product-thumbs-swiper');

  if (!productSwiper || !thumbsSwiper) {
    console.warn('Les éléments du slider ne sont pas présents sur cette page');
    return;
  }

  try {
    // Supprimer tous les préchargeurs existants des premières slides pour éviter les problèmes
    const firstSlidePreloaders = document.querySelectorAll('.swiper-slide:first-child .swiper-lazy-preloader');
    firstSlidePreloaders.forEach(function(preloader) {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    });
    
    // Initialiser le slider des miniatures
    const thumbsSlider = new Swiper('.product-thumbs-swiper', {
      spaceBetween: 10,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      freeMode: true,
      navigation: {
        nextEl: '.thumbs-button-next',
        prevEl: '.thumbs-button-prev',
      },
      // Configuration du lazy loading pour les miniatures
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2
      },
      breakpoints: {
        320: {
          slidesPerView: 4,
          spaceBetween: 5
        },
        480: {
          slidesPerView: 5,
          spaceBetween: 8
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 10
        }
      }
    });

    // Initialiser le slider principal
    const mainSlider = new Swiper('.product-swiper', {
      spaceBetween: 0,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      thumbs: {
        swiper: thumbsSlider
      },
      // Configuration optimisée du lazy loading (une seule propriété lazy)
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: true,
        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        checkInView: true
      },
      // Événements pour gérer les préchargeurs
      on: {
        init: function() {
          // Masquer les préchargeurs de la première slide dès l'initialisation
          setTimeout(function() {
            const activeSlide = document.querySelector('.swiper-slide-active');
            if (activeSlide) {
              const preloader = activeSlide.querySelector('.swiper-lazy-preloader');
              if (preloader) {
                preloader.style.display = 'none';
              }
            }
          }, 300);
        },
        
        slideChange: function() {
          // Masquer les préchargeurs après chaque changement de slide
          setTimeout(function() {
            const visibleSlides = document.querySelectorAll('.swiper-slide-visible');
            visibleSlides.forEach(function(slide) {
              const preloader = slide.querySelector('.swiper-lazy-preloader');
              if (preloader) {
                preloader.style.display = 'none';
              }
            });
          }, 300);
        },
        
        lazyImageReady: function(slideEl, imageEl) {
          // Quand une image est chargée, supprimer son préchargeur
          const preloader = slideEl.querySelector('.swiper-lazy-preloader');
          if (preloader) {
            preloader.style.display = 'none';
          }
          
          // Forcer le rafraîchissement du slider pour mettre à jour l'affichage
          this.update();
        }
      },
      // Optimisation de la fonctionnalité de zoom
      zoom: {
        maxRatio: 3,
        minRatio: 1,
        // Assurer que l'image est chargée avant le zoom
        onBeforeZoomIn: function() {
          const activeSlide = this.slides[this.activeIndex];
          const img = activeSlide.querySelector('img[data-src]');
          if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          return true;
        }
      },
      loop: false,
      grabCursor: true
    });

    // Synchronisation manuelle des deux sliders
    mainSlider.on('slideChange', function() {
      const activeIndex = mainSlider.activeIndex;
      if (thumbsSlider.slides && thumbsSlider.slides.length > activeIndex) {
        thumbsSlider.slideTo(activeIndex);
      }
    });

    // Mise à jour des sliders lors du redimensionnement
    window.addEventListener('resize', function() {
      mainSlider.update();
      thumbsSlider.update();
    });

    // Solution supplémentaire: observer les changements dans le DOM et masquer les préchargeurs
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function() {
        const preloaders = document.querySelectorAll('.swiper-lazy-preloader');
        preloaders.forEach(function(preloader) {
          const slide = preloader.closest('.swiper-slide');
          const img = slide.querySelector('img');
          
          // Si l'image est chargée, cacher le préchargeur
          if (img && img.complete) {
            preloader.style.display = 'none';
          }
        });
      });
    });
    
    // Observer le conteneur du slider pour les changements
    observer.observe(productSwiper, { 
      childList: true, 
      subtree: true, 
      attributes: true 
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du slider:', error);
  }
}

/**
 * Prépare les images pour le lazy loading de Swiper en standardisant les attributs
 */
function prepareImagesForLazyLoading() {
  // Trouver toutes les images dans le slider principal
  const mainSliderImages = document.querySelectorAll('.product-swiper .swiper-slide img');
  
  mainSliderImages.forEach((img, index) => {
    // Pour la première image, s'assurer qu'elle est chargée immédiatement
    if (index === 0) {
      // Si l'image a un attribut data-src, le transférer à src pour chargement immédiat
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      // S'assurer que la première image n'a pas la classe de lazy loading
      img.classList.remove('swiper-lazy');
      
      // Supprimer tout préchargeur existant pour la première image
      const preloader = img.parentNode.querySelector('.swiper-lazy-preloader');
      if (preloader) {
        preloader.parentNode.removeChild(preloader);
      }
    } else {
      // Pour les autres images, conserver le lazy loading
      if (!img.dataset.src && img.src) {
        img.dataset.src = img.src;
        img.classList.add('swiper-lazy');
        
        // Créer le préchargeur pour les images suivantes
        if (!img.parentNode.querySelector('.swiper-lazy-preloader')) {
          const preloader = document.createElement('div');
          preloader.className = 'swiper-lazy-preloader';
          img.parentNode.appendChild(preloader);
        }
        
        // Supprimer l'attribut src pour éviter le double chargement
        img.removeAttribute('src');
      }
    }
    
    // Supprimer l'attribut loading="lazy" pour éviter le conflit
    if (img.getAttribute('loading') === 'lazy') {
      img.removeAttribute('loading');
    }
  });
}

// Fonction pour vérifier périodiquement et masquer tous les préchargeurs persistants
function startPreloaderCleanupInterval() {
  setInterval(function() {
    const preloaders = document.querySelectorAll('.swiper-lazy-preloader');
    preloaders.forEach(function(preloader) {
      preloader.style.display = 'none';
    });
  }, 1000); // Vérifier toutes les secondes
}

// Démarrer le nettoyage périodique des préchargeurs
startPreloaderCleanupInterval();
