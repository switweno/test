/**
 * Script spécifique pour la redirection vers la page de commande
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log("Script whatsapp-order.js chargé");
  
  // Sélectionner le bouton de commande WhatsApp
  const orderButton = document.querySelector('.whatsapp-order-btn');
  
  // Vérifier si le bouton existe
  if (orderButton) {
    console.log("Bouton de commande WhatsApp trouvé, ajout de l'écouteur d'événement");
    
    // Ajouter l'écouteur d'événement directement au bouton
    orderButton.addEventListener('click', function(event) {
      event.preventDefault();
      console.log("Bouton de commande WhatsApp cliqué");
      
      try {
        // Obtenir les données du produit comme dans product-page-init.js
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
        
        // Récupérer la couleur sélectionnée
        const colorOption = document.querySelector('.color-option.active');
        const color = colorOption ? colorOption.dataset.color : '';
        
        // Récupérer le prix
        const priceElement = document.querySelector('.current-price');
        const productPrice = priceElement ? parseFloat(priceElement.textContent.replace(/[^\d.-]/g, '')) : 0;
        
        // Récupérer l'image actuelle
        const mainImage = document.querySelector('.swiper-slide-active img') || 
                          document.querySelector('.product-main-image img') ||
                          document.querySelector('.swiper-zoom-container img');
        const productImage = mainImage ? mainImage.src : '';
        
        // Traiter l'URL de l'image
        let imagePath = productImage;
        if (productImage.includes('/')) {
          const urlParts = productImage.split('/');
          imagePath = urlParts[urlParts.length - 1];
        }
        
        console.log("Données du produit capturées:", {
          name: productName,
          price: productPrice,
          quantity: quantity,
          color: color,
          image: imagePath
        });
        
        // Créer l'objet produit
        const product = {
          name: productName || "Vélo Électrique X1",
          price: productPrice,
          quantity: Number(quantity),
          color: color,
          image: imagePath,
          total: productPrice * Number(quantity),
          id: document.location.pathname.split('/').pop().replace('.html', '') // Extraire l'ID du produit depuis l'URL
        };
        
        // Vider localStorage avant de stocker pour éviter les conflits
        localStorage.removeItem('commandeProduct');
        
        // Stocker dans localStorage
        localStorage.setItem('commandeProduct', JSON.stringify(product));
        
        // Déterminer le chemin correct vers la page de commande
        let commandePath = '../commande.html';
        
        // Si nous sommes déjà au niveau racine du site
        if (window.location.pathname.split('/').length <= 2) {
          commandePath = 'commande.html';
        }
        
        // Forcer la redirection vers la page de commande
        console.log("Redirection vers la page de commande:", commandePath);
        window.location.href = commandePath;
      } catch (error) {
        console.error("Erreur lors de la préparation de la commande:", error);
        
        // En cas d'erreur, essayer différents chemins de redirection
        try {
          if (window.location.pathname.includes('/produits/')) {
            window.location.href = '../commande.html';
          } else {
            window.location.href = 'commande.html';
          }
        } catch (redirectError) {
          console.error("Erreur de redirection:", redirectError);
          // Dernière tentative avec chemin absolu
          window.location.href = '/commande.html';
        }
      }
    });
    
    // Ajouter un effet visuel pour montrer que le bouton est cliquable
    orderButton.classList.add('whatsapp-pulse');
    
    // Ajouter une classe pour indiquer que le script est initialisé
    orderButton.classList.add('initialized');
    console.log("Bouton WhatsApp initialisé avec succès");
  } else {
    // Essayer d'autres sélecteurs si le bouton principal n'est pas trouvé
    const alternativeButtons = document.querySelectorAll('.order-now-btn, .whatsapp-btn, button[id*="order"]');
    
    if (alternativeButtons.length > 0) {
      console.log(`Boutons alternatifs trouvés: ${alternativeButtons.length}`);
      
      alternativeButtons.forEach(btn => {
        btn.addEventListener('click', function(event) {
          event.preventDefault();
          console.log("Bouton alternatif cliqué, redirection vers la page de commande");
          
          try {
            // Redirection simple sans données pour les boutons alternatifs
            if (window.location.pathname.includes('/produits/')) {
              window.location.href = '../commande.html';
            } else {
              window.location.href = 'commande.html';
            }
          } catch (error) {
            console.error("Erreur lors de la redirection:", error);
            window.location.href = '/commande.html';
          }
        });
      });
    } else {
      console.error("Aucun bouton de commande trouvé sur cette page");
    }
  }
});
