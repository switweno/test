// Script pour la page de commande

// Numéro WhatsApp pour les commandes
const whatsappNumber = '212762609147';

// Éléments DOM
const productImage = document.getElementById('product-image');
const productName = document.getElementById('product-name');
const productColor = document.getElementById('product-color');
const productQuantity = document.getElementById('product-quantity');
const productPrice = document.getElementById('product-price');
const productTotal = document.getElementById('product-total');
const customerForm = document.getElementById('customer-form');

// Produit par défaut à utiliser si aucun n'est sélectionné
const defaultProduct = {
  name: "Vélo Électrique X1",
  price: 2500,
  quantity: 1,
  image: "images/slider/likebike-shine-s-09.webp",
  total: 2500
  // Suppression de la couleur par défaut
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  // Charger les données du produit depuis localStorage
  loadProductData();
  
  // Charger les données client précédemment sauvegardées
  loadCustomerData();
  
  // Configurer le formulaire
  setupForm();
  
  // Configurer le bouton de retour
  setupBackButton();
});

// Charger les données du produit
function loadProductData() {
  try {
    // Forcer le rafraîchissement du localStorage pour obtenir les données les plus récentes
    const productData = localStorage.getItem('commandeProduct');
    console.log('Données brutes récupérées de localStorage:', productData);
    
    if (!productData) {
      console.log("Aucun produit sélectionné, utilisation du produit par défaut");
      displayProductDetails(defaultProduct);
      return;
    }
    
    try {
      const product = JSON.parse(productData);
      console.log('Produit après JSON.parse:', product);
      console.log('Type de quantity:', typeof product.quantity);
      console.log('Valeur de quantity:', product.quantity);
      
      // CRUCIAL: Assurons-nous que la quantité est un nombre
      if (product && typeof product.quantity !== 'undefined') {
        product.quantity = Number(product.quantity);
        
        // Recalculer le total pour être sûr
        if (product.price) {
          product.total = product.price * product.quantity;
        }
      }
      
      displayProductDetails(product);
    } catch (parseError) {
      console.error('Erreur lors du parsing JSON:', parseError);
      displayProductDetails(defaultProduct);
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données du produit:', error);
    displayProductDetails(defaultProduct);
  }
}

// Afficher les détails du produit avec des vérifications renforcées
function displayProductDetails(product) {
  if (!product) {
    product = defaultProduct;
    console.log("Utilisation du produit par défaut car aucun produit fourni");
  }
  
  // Vérifier explicitement chaque propriété
  const productToDisplay = {
    name: product.name || defaultProduct.name,
    price: Number(product.price || defaultProduct.price),
    quantity: Number(product.quantity || defaultProduct.quantity),
    image: product.image || defaultProduct.image
    // Couleur uniquement si elle existe et a été explicitement choisie
  };
  
  // N'ajouter la couleur que si elle existe vraiment et n'est pas vide
  if (product.color && typeof product.color === 'string' && product.color.trim() !== '') {
    productToDisplay.color = product.color.trim();
  }
  
  console.log('Produit formaté pour affichage:', productToDisplay);
  
  // Image du produit
  productImage.src = productToDisplay.image;
  productImage.alt = productToDisplay.name;
  
  // Nom du produit
  productName.textContent = productToDisplay.name;
  
  // Couleur (si disponible) - vérification stricte
  if (productToDisplay.color) {
    productColor.textContent = `Couleur: ${productToDisplay.color}`;
    productColor.style.display = 'block';
  } else {
    productColor.style.display = 'none'; // Masquer l'élément si pas de couleur
  }
  
  // Quantité - Afficher la valeur numérique explicite
  productQuantity.textContent = productToDisplay.quantity.toString();
  console.log('Quantité affichée:', productToDisplay.quantity);
  
  // Prix unitaire
  productPrice.textContent = `${productToDisplay.price.toFixed(2)} DH`;
  
  // Calculer et afficher le total
  const total = productToDisplay.price * productToDisplay.quantity;
  productTotal.textContent = `${total.toFixed(2)} DH`;
  console.log('Total calculé:', total);
}

// Charger les données client
function loadCustomerData() {
  try {
    const savedData = localStorage.getItem('customerInfo');
    if (savedData) {
      const customerInfo = JSON.parse(savedData);
      
      document.getElementById('fullname').value = customerInfo.fullname || '';
      document.getElementById('phone').value = customerInfo.phone || '';
      document.getElementById('address').value = customerInfo.address || '';
      document.getElementById('city').value = customerInfo.city || '';
      
      // Suppression de la récupération des notes
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données client:', error);
  }
}

// Configurer le formulaire
function setupForm() {
  if (!customerForm) return;
  
  customerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Valider le formulaire
    if (!validateForm()) {
      return;
    }
    
    // Récupérer les données du formulaire
    const formData = {
      fullname: document.getElementById('fullname').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value
      // Suppression de la récupération des notes
    };
    
    // Sauvegarder les données client
    localStorage.setItem('customerInfo', JSON.stringify(formData));
    
    // Récupérer les données du produit
    let product;
    try {
      const productData = localStorage.getItem('commandeProduct');
      product = productData ? JSON.parse(productData) : defaultProduct;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du produit:', error);
      product = defaultProduct;
    }
    
    // Générer le message WhatsApp
    const message = generateWhatsAppMessage(product, formData);
    
    // Ouvrir WhatsApp avec le message en utilisant la variable whatsappNumber
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  });
}

// Bouton "Retour au produit":
function setupBackButton() {
  const backButton = document.getElementById('back-to-product');
  if (!backButton) return;

  backButton.addEventListener('click', function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });
}

// Valider le formulaire
function validateForm() {
  const fullname = document.getElementById('fullname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  
  if (!fullname || !phone || !address || !city) {
    showError("Veuillez remplir tous les champs obligatoires.");
    return false;
  }
  
  // Validation basique du numéro de téléphone
  const phoneRegex = /^[0-9+\s()-]{8,15}$/;
  if (!phoneRegex.test(phone)) {
    showError("Veuillez entrer un numéro de téléphone valide.");
    return false;
  }
  
  return true;
}

// Générer le message WhatsApp
function generateWhatsAppMessage(product, customer) {
  // S'assurer que les valeurs sont correctes
  const quantity = Number(product.quantity || 1);
  const price = Number(product.price || 0);
  const total = price * quantity;
  
  let message = '🛒 *NOUVELLE COMMANDE* 🛒\n\n';
  
  // Détails du produit
  message += '*Produit commandé:*\n';
  message += `*${product.name}*\n`;
  
  // N'ajouter la couleur que si elle existe et n'est pas vide - vérification stricte
  if (product.color && typeof product.color === 'string' && product.color.trim() !== '') {
    message += `- Couleur: ${product.color}\n`;
  }
  
  message += `- Prix: ${price.toFixed(2)} DH\n`;
  message += `- Quantité: ${quantity}\n`;
  message += `- Total: ${total.toFixed(2)} DH\n\n`;
  
  // Informations client
  message += '*Informations client:*\n';
  message += `*Nom:* ${customer.fullname}\n`;
  message += `*Téléphone:* ${customer.phone}\n`;
  message += `*Adresse:* ${customer.address}\n`;
  message += `*Ville:* ${customer.city}\n`;
  
  return encodeURIComponent(message);
}

// Afficher un message d'erreur
function showError(message) {
  // Vérifier si un message d'erreur existe déjà
  let errorEl = document.querySelector('.error-message');
  
  // Si non, en créer un
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    
    // Insérer avant le formulaire
    const form = document.querySelector('.commande-content');
    form.parentNode.insertBefore(errorEl, form);
  }
  
  // Mettre à jour le message et afficher
  errorEl.textContent = message;
  errorEl.classList.add('show');
  
  // Faire défiler jusqu'au message
  errorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Masquer après un délai
  setTimeout(() => {
    errorEl.classList.remove('show');
  }, 5000);
}
