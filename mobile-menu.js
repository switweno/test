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
          
          // Mise à jour de l'attribut aria-expanded pour l'accessibilité
          const isExpanded = mainNav.classList.contains('show');
          this.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
          
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
            });
          }
          
          overlay.classList.toggle('active');
        });
        
        // Fermer le menu en cliquant sur les liens
        const links = mainNav.querySelectorAll('a');
        links.forEach(function(link) {
          link.addEventListener('click', function() {
            menuBtn.classList.remove('open');
            mainNav.classList.remove('show');
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
              overlay.classList.remove('active');
            }
          });
        });
      } else {
        console.error("Éléments du menu mobile non trouvés");
      }
    });
