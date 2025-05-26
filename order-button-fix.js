/**
 * Script pour corriger les problèmes de redirection des boutons de commande
 */

document.addEventListener('DOMContentLoaded', function() {
  // Corriger les boutons de commande sur la page produit
  fixOrderButtons();
});

function fixOrderButtons() {
  // Trouver tous les boutons de commande
  const orderButtons = document.querySelectorAll('.order-now-btn, .whatsapp-order-btn, #submit-order');
  
  console.log("Nombre de boutons de commande trouvés:", orderButtons.length);
  
  orderButtons.forEach(button => {
    // Déjà un élément <a> ?
    if (button.tagName === 'A') {
      console.log("Bouton est déjà un lien, vérification de l'URL:", button.href);
      if (!button.href || !button.href.includes('commande.html')) {
        button.href = '../commande.html'; // Page produit
        console.log("URL corrigée vers:", button.href);
      }
    } else {
      // C'est un bouton, ajoutons un écouteur d'événement
      console.log("Ajout d'un écouteur d'événement au bouton:", button);
      
      // Vérifions si c'est un bouton de formulaire
      const isSubmitButton = button.type === 'submit' || button.id === 'submit-order';
      
      if (!isSubmitButton) {
        button.addEventListener('click', function(e) {
          e.preventDefault(); // Empêcher le comportement par défaut
          
          // Déterminer l'URL de redirection selon le contexte
          let redirectUrl = 'commande.html';
          
          // Si nous sommes dans un sous-dossier (comme /produits/)
          if (window.location.pathname.includes('/produits/')) {
            redirectUrl = '../commande.html';
          }
          
          console.log("Redirection vers:", redirectUrl);
          window.location.href = redirectUrl;
        });
      }
    }
  });
  
  // Correction spécifique pour la page de détails du produit
  const productPageInit = document.querySelector('script[src="product-page-init.js"]');
  if (productPageInit) {
    // Nous sommes sur une page produit, assurons-nous que localStorage est correctement configuré
    console.log("Page produit détectée, vérification de la préparation des données produit");
    
    // Cette vérification sera traitée par le script existant product-page-init.js
  }
}
