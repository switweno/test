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
  
  // Gérer le bouton de menu mobile
  const menuBtn = document.getElementById('menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function() {
      this.classList.toggle('open');
      mainNav.classList.toggle('show');
      
      // Overlay pour fermer le menu
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
  }
  
  // Ouvrir automatiquement la première question
  if (faqQuestions.length > 0) {
    faqQuestions[0].click();
  }
});
