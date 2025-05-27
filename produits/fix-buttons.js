/**
 * Script pour corriger les problèmes d'alignement des boutons
 */
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les boutons "Voir les détails" dans les produits similaires et récemment consultés
  const detailButtons = document.querySelectorAll('.related-products .view-details, .recently-viewed .view-details');
  
  // Appliquer des styles directement
  detailButtons.forEach(button => {
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    button.style.width = '100%';
    button.style.margin = '0 auto';
    button.style.textAlign = 'center';
    
    // S'assurer que le conteneur parent est également correctement stylé
    const actionContainer = button.closest('.product-actions');
    if (actionContainer) {
      actionContainer.style.display = 'flex';
      actionContainer.style.justifyContent = 'center';
      actionContainer.style.width = '100%';
    }
    
    // Centrer le texte de l'info produit
    const productInfo = button.closest('.product-info');
    if (productInfo) {
      productInfo.style.textAlign = 'center';
      productInfo.style.display = 'flex';
      productInfo.style.flexDirection = 'column';
      productInfo.style.alignItems = 'center';
      
      // Prix centré
      const priceElement = productInfo.querySelector('.product-price');
      if (priceElement) {
        priceElement.style.textAlign = 'center';
      }
    }
  });
});
