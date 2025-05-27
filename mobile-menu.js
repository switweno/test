/**
 * Script pour gérer le menu mobile sur toutes les pages
 */
document.addEventListener('DOMContentLoaded', function() {
  // Sélection des éléments
  const menuBtn = document.getElementById('menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuBtn && mainNav) {
    console.log("Menu mobile initialisé");
    
    // Gestionnaire d'événement pour le bouton
    menuBtn.addEventListener('click', function() {
      console.log("Bouton menu cliqué");
      this.classList.toggle('open');
      mainNav.classList.toggle('show');
      
      // Créer/gérer l'overlay
      let overlay = document.querySelector('.menu-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', function() {
          menuBtn.classList.remove('open');
          mainNav.classList.remove('show');
          this.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
      }
      
      overlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Fermer le menu en cliquant sur les liens
    const links = mainNav.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        menuBtn.classList.remove('open');
        mainNav.classList.remove('show');
        const overlay = document.querySelector('.menu-overlay');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  } else {
    console.error("Éléments du menu mobile non trouvés");
  }
});
