/**
 * Script pour corriger l'affichage du menu mobile sur toutes les pages
 */
document.addEventListener('DOMContentLoaded', function() {
  // Forcer l'affichage du bouton menu sur mobile
  const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
  
  if (mobileMenuButton) {
    console.log("Bouton de menu mobile trouvé, configuration en cours...");
    
    // Ajouter des classes supplémentaires pour s'assurer qu'il s'affiche correctement
    mobileMenuButton.classList.add('hamburger-button');
    
    // Vérifier si les spans existent, sinon les créer
    if (mobileMenuButton.querySelectorAll('span').length === 0) {
      for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        span.className = 'menu-line';
        mobileMenuButton.appendChild(span);
      }
    }
    
    // Appliquer des styles inline pour garantir l'affichage
    if (window.innerWidth <= 768) {
      mobileMenuButton.style.display = 'flex';
      mobileMenuButton.style.flexDirection = 'column';
      mobileMenuButton.style.justifyContent = 'center';
      mobileMenuButton.style.alignItems = 'center';
    }
    
    // Mettre à jour l'affichage lors du redimensionnement
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
        mobileMenuButton.style.display = 'flex';
      } else {
        mobileMenuButton.style.display = 'none';
      }
    });
    
    // S'assurer que le bouton a un gestionnaire d'événement
    if (!mobileMenuButton.getAttribute('data-event-attached')) {
      mobileMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Bouton de menu mobile cliqué");
        
        // Appeler la fonction toggleMobileMenu
        if (typeof toggleMobileMenu === 'function') {
          toggleMobileMenu(e);
        } else {
          console.error("La fonction toggleMobileMenu n'est pas définie");
          
          // Alternative si la fonction n'existe pas
          const mainNav = document.querySelector('.main-nav');
          if (mainNav) {
            this.classList.toggle('active');
            mainNav.classList.toggle('show');
            document.body.classList.toggle('menu-open');
          }
        }
      });
      
      mobileMenuButton.setAttribute('data-event-attached', 'true');
    }
  } else {
    console.error("Bouton de menu mobile non trouvé");
  }
});
