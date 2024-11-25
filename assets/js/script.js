document.addEventListener("DOMContentLoaded", function() {
    const playerForm = document.getElementById('player-form');
    const playerNameInput = document.getElementById('player-name');
    const playerPositionInput = document.getElementById('player-position');
    const playerList = document.getElementById('players');
  
    // Fonction pour ajouter un joueur à la liste
    playerForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const playerName = playerNameInput.value.trim();
      const playerPosition = playerPositionInput.value;
  
      if (playerName && playerPosition) {
        // Créer un élément de liste pour le joueur
        const li = document.createElement('li');
        li.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'border', 'border-gray-300', 'rounded-md');
        
        li.innerHTML = `
          <span class="font-medium">${playerName}</span> - <span class="text-gray-500">${playerPosition}</span>
          <button class="bg-red-600 text-white text-xs py-1 px-2 rounded-md" onclick="removePlayer(this)">Supprimer</button>
        `;
        
        playerList.appendChild(li);
  
        // Réinitialiser le formulaire
        playerNameInput.value = '';
        playerPositionInput.value = 'GK'; // Retourner la position par défaut
      }
    });
  
    // Fonction pour supprimer un joueur de la liste
    window.removePlayer = function(button) {
      const li = button.closest('li');
      li.remove();
    };
  });
  