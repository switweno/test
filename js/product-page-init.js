/**
 * Script d'initialisation des fonctionnalités de la page produit
 * - Sélection de couleur
 * - Sélection de quantité
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialiser la sélection de couleur
  initColorSelection();
  
  // Initialiser le sélecteur de quantité
  initQuantitySelector();
});

/**
 * Initialise la sélection de couleur
 */
function initColorSelection() {
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColorDisplay = document.getElementById('selected-color');
  
  if (!colorOptions.length || !selectedColorDisplay) return;
  
  // Aucune couleur sélectionnée par défaut
  // Afficher un message invitant l'utilisateur à choisir une couleur
  selectedColorDisplay.textContent = "Veuillez choisir une couleur";
  selectedColorDisplay.style.color = "#777"; // Style pour indiquer qu'aucune sélection n'a été faite
  
  // Ajouter les écouteurs d'événements à chaque option de couleur
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Retirer la classe active de toutes les options
      colorOptions.forEach(opt => opt.classList.remove('active'));
      
      // Ajouter la classe active à l'option cliquée
      this.classList.add('active');
      
      // Mettre à jour l'affichage de la couleur sélectionnée
      const colorName = this.getAttribute('data-color') || 'Couleur inconnue';
      selectedColorDisplay.textContent = colorName;
      selectedColorDisplay.style.color = ""; // Réinitialiser la couleur du texte
    });
  });
}

/**
 * Initialise le sélecteur de quantité
 */
function initQuantitySelector() {
  const quantityInput = document.getElementById('quantity');
  const decreaseBtn = document.querySelector('.quantity-decrease');
  const increaseBtn = document.querySelector('.quantity-increase');
  
  if (!quantityInput || !decreaseBtn || !increaseBtn) return;
  
  // Définir les limites
  const minValue = parseInt(quantityInput.getAttribute('min') || 1, 10);
  const maxValue = parseInt(quantityInput.getAttribute('max') || 15, 10);
  
  // S'assurer que la valeur initiale est dans les limites
  let currentValue = parseInt(quantityInput.value, 10) || 1;
  currentValue = Math.max(minValue, Math.min(maxValue, currentValue));
  quantityInput.value = currentValue;
  
  // Gestionnaire pour le bouton de diminution
  decreaseBtn.addEventListener('click', function() {
    currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > minValue) {
      quantityInput.value = --currentValue;
    }
  });
  
  // Gestionnaire pour le bouton d'augmentation
  increaseBtn.addEventListener('click', function() {
    currentValue = parseInt(quantityInput.value, 10);
    if (currentValue < maxValue) {
      quantityInput.value = ++currentValue;
    }
  });
  
  // Gestionnaire pour les changements directs dans l'input
  quantityInput.addEventListener('change', function() {
    currentValue = parseInt(this.value, 10) || minValue;
    currentValue = Math.max(minValue, Math.min(maxValue, currentValue));
    this.value = currentValue;
  });
  
  // Empêcher les valeurs non numériques
  quantityInput.addEventListener('keypress', function(e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });
}
