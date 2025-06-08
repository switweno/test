/**
 * JavaScript pour la page FAQ
 * Gère le comportement accordéon des questions/réponses
 */

document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les éléments de question FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  // Ajouter les écouteurs d'événements pour chaque question
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Obtenir l'élément parent (faq-item)
      const faqItem = question.parentElement;
      
      // Vérifier si l'élément est déjà actif
      const isActive = faqItem.classList.contains('active');
      
      // Fermer toutes les réponses ouvertes
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Si la question n'était pas active, l'ouvrir
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
  

});
