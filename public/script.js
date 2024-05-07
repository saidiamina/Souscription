// Exemple de script.js avec gestion des événements et chargement dynamique des projets/devis

document.addEventListener('DOMContentLoaded', function() {
    // Simulation des données des projets/devis (à remplacer par des appels AJAX)
    const projectsData = [
        { opportunityNumber: 1234, clientName: 'Client A', proposedRate: '$1000' },
        { opportunityNumber: 5678, clientName: 'Client B', proposedRate: '$1500' },
        { opportunityNumber: 91011, clientName: 'Client C', proposedRate: '$1200' }
    ];

    const projectsTable = document.getElementById('projects-table');
    const projectsTableBody = projectsTable.querySelector('tbody');

    // Fonction pour afficher les projets/devis dans le tableau
    function renderProjects() {
        projectsTableBody.innerHTML = '';
        projectsData.forEach(project => {
            const row = `
                <tr>
                    <td>${project.opportunityNumber}</td>
                    <td>${project.clientName}</td>
                    <td>${project.proposedRate}</td>
                    <td><a href="#" onclick="viewContract(${project.opportunityNumber})">Voir le contrat</a></td>
                </tr>
            `;
            projectsTableBody.innerHTML += row;
        });
    }

    // Appel initial pour afficher les projets/devis
    renderProjects();

    // Gestionnaire d'événement pour le bouton "Nouveau devis"
    const newProjectBtn = document.getElementById('new-project-btn');
    newProjectBtn.addEventListener('click', function(event) {
        event.preventDefault();
        // Redirection vers la page de création d'un nouveau devis
        window.location.href = 'new-project.html'; // Remplacer par la bonne URL
    });
});

// Fonction pour afficher le contrat associé à un projet/devis
function viewContract(opportunityNumber) {
    alert(`Afficher le contrat pour l'opportunité numéro ${opportunityNumber}`);
}
document.getElementById('new-project-btn').addEventListener('click', function() {
                    
    window.location.href = 'index2.html';
});