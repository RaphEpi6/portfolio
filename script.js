document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const panelContents = document.querySelectorAll('.panel-content');
    
    // Objet pour stocker le HTML original de chaque panel au chargement
    const panelData = {};

    // Sauvegarde et nettoyage initial
    panelContents.forEach(panel => {
        panelData[panel.id] = panel.innerHTML;
        panel.innerHTML = ''; 
    });

    // Fonction d'écriture qui gère intelligemment les balises HTML
    function typeWriter(element, htmlContent, speed = 10) {
        let i = 0;
        let isTag = false;
        let currentHTML = '';
        element.innerHTML = ''; // On vide avant d'écrire

        function type() {
            if (i < htmlContent.length) {
                let char = htmlContent.charAt(i);
                currentHTML += char;
                
                // Détection de l'ouverture et fermeture de balise HTML
                if (char === '<') isTag = true;
                if (char === '>') isTag = false;

                element.innerHTML = currentHTML;
                i++;

                // Si on est dans une balise ou sur un espace, on tape instantanément
                if (isTag || char === ' ') {
                    type(); 
                } else {
                    setTimeout(type, speed);
                }
            }
        }
        type();
    }

    function setActivePanel(panelId) {
        // Mise à jour des boutons
        navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.panel === panelId);
        });

        // Mise à jour des contenus
        panelContents.forEach(panel => {
            if (panel.id === panelId) {
                panel.classList.add('active');
                // On déclenche l'effet en utilisant le HTML sauvegardé
                typeWriter(panel, panelData[panelId]);
            } else {
                panel.classList.remove('active');
                panel.innerHTML = ''; // On vide les panels inactifs
            }
        });
    }

    // Écouteurs d'événements sur les boutons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Empêche de relancer l'animation si on clique sur l'onglet déjà actif
            if (!this.classList.contains('active')) {
                const panelId = this.dataset.panel;
                setActivePanel(panelId);
            }
        });
    });

    // Initialisation du premier panel au chargement
    setActivePanel('about');
});