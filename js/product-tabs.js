/**
 * Gestion des onglets dans la page de détail produit
 */

document.addEventListener('DOMContentLoaded', function() {
  initProductTabs();
});

function initProductTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length === 0 || tabPanes.length === 0) {
    console.warn('Les éléments des onglets ne sont pas présents sur cette page');
    return;
  }
  
  // Ajouter l'écouteur d'événement pour chaque bouton d'onglet
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Désactiver tous les onglets
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Activer l'onglet cliqué
      const tabId = this.getAttribute('data-tab');
      this.classList.add('active');
      
      const activePane = document.getElementById(tabId);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
  
  console.log('Initialisation des onglets de produit terminée');
}
