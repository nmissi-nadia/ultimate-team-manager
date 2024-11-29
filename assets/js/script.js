document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const navbar = document.getElementById("navbar");
  const menuLinks = document.querySelectorAll(".nav-link");
  const field = document.getElementById("main");
  const playerForm = document.getElementById("playerForm");
  const statsJoue = document.getElementById("stats_joue");
  const statsGK = document.getElementById("stats_GK");
  const playerPosition = document.getElementById("player-position");
  const maxPlayers = 23;
  const maxByPosition = { GK: 2, CB: 3, CM: 3, RM: 3, LM: 3, LB: 3, RB: 3 };
  const equipe = document.getElementById("info");
  const btn_ajout =document.getElementById('add_joueur');

  let players = JSON.parse(localStorage.getItem("players")) || [];
  // Toggle menu visibility for mobile
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
    menu.classList.add(
      "flex-col",
      "space-y-4",
      "bg-gray-900",
      "p-4",
      "rounded-lg",
      "md:flex-row",
      "md:space-y-0",
      "md:space-x-8"
    );
  });

  // Change active link on scroll
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          menuLinks.forEach((link) => {
            link.classList.remove("text-yellow-400", "font-bold");
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("text-yellow-400", "font-bold");
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach((section) => observer.observe(section));

  // Add sticky effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-gray-800", "shadow-md");
    } else {
      navbar.classList.remove("bg-gray-800", "shadow-md");
    }
  });

// ----------------chng de formations
  

// Formation 4-4-2 : Définition des positions
const formation442 = [
  { row: 1, positions: ["ST", "ST"] },
  { row: 2, positions: ["LM", "CM", "CM", "RM"] },
  { row: 3, positions: ["LB", "CB", "CB", "RB"] },
  { row: 4, positions: ["GK"] },
];

const formation532 = [
  { row: 1, positions: ["ST", "ST"] },
  { row: 2, positions: ["LM", "CM", "RM"] },
  { row: 3, positions: ["LB", "CB", "CB", "CB", "RB"] },
  { row: 4, positions: ["GK"] },
];

const formation433 = [
  { row: 1, positions: ["LW", "ST", "RW"] },
  { row: 2, positions: ["LM", "CM", "RM"] },
  { row: 3, positions: ["LB", "CB", "CB", "RB"] },
  { row: 4, positions: ["GK"] },
];

// Effacer les anciennes cartes
function clearField() {
  field.innerHTML = "";
}

// Calcul des colonnes pour centrer les joueurs
function calculateColumns(playerCount) {
  const columns = [];
  const totalColumns = 5;

  if (playerCount === 4) {
    columns.push(1, 2, 4, 5);
  } else if (playerCount === 3) {
    columns.push(2, 3, 4);
  } else if (playerCount === 1) {
    columns.push(3);
  } else if (playerCount === 2) {
    columns.push(2, 4);
  } else if (playerCount === 5) {
    columns.push(1, 2, 3, 4, 5);
  }

  return columns;
}


// Création d'une carte de joueur
function createPlayerCard(position, row, column) {
  const playerCard = document.createElement("div");
  playerCard.id = position; // Utiliser la position comme identifiant
  playerCard.className = "card mx-auto bg-transparent p-4 rounded-lg relative z-2";
  playerCard.innerHTML = `
     <div class="relative w-22 h-[170px] bg-[url('https://cdn.easysbc.io/fc25/cards/e_7_0.png')] bg-center bg-cover bg-no-repeat py-3 z-10 transition ease-in duration-200 sm:w-12 sm:h-[90px] md:w-20 md:h-[140px] lg:w-24 lg:h-[150px]">
      <div class="relative flex text-[#e9cc74] px-1 sm:px-1 md:px-1 lg:px-2">
        <!-- Player Master Info -->
        <div class="absolute text-[6px] font-light uppercase leading-3 py-1 sm:py-1 md:py-1">
          <div class="text-xs sm:text-[10px] md:text-xs lg:text-sm">${position || "POS"}</div>
          <div class="w-2 h-1 mt-[1px] sm:w-1.5 sm:h-1.5 md:w-2 md:h-2">
            <img src="https://via.placeholder.com/20" alt="Pays" class="object-contain" />
          </div>
          <div class="w-2 h-2.5 sm:w-1.5 sm:h-2 md:w-2 md:h-2.5">
            <img src="https://via.placeholder.com/20" alt="Club" class="object-contain" />
          </div>
        </div>
        <!-- Player Picture -->
        <div class="w-10 h-10 mx-auto overflow-hidden sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img src="https://via.placeholder.com/50" alt="Joueur" class="object-contain relative -right-1 sm:-right-0.5 md:-right-1 lg:-right-1.5" />
        </div>
      </div>
      <!-- Player Card Bottom -->
      <div class="relative">
        <div class="block text-black w-[90%] mx-auto py-[1px]">
          <!-- Player Name -->
          <div class="block text-center text-[6px] uppercase border-b border-opacity-10 border-[#e9cc74] pb-[1px] sm:text-[5px] md:text-[6px] lg:text-[7px]">
            <span class="block">Nom du joueur</span>
          </div>
          <!-- Player Stats -->
          <div class="cards-stats sm:text-[5px] md:text-[6px] bg-[#e9cc74] lg:text-[7px] text-center mt-1 w-full">
            ${
              position === "GK"
                ? `DIV: --, HAN: --, KIC: --, REF: --, SPD: --, POS: --`
                : `PAC: --, SHO: --, PAS: --, DRI: --, DEF: --, PHY: --`
            }
          </div>
          <button id="edit-button" class="flex bg-green-900 w-16 mt-0 justify-self-center  rounded-lg items-center text-white text-s"><i class="fa fa-trash" aria-hidden="true"></i></button>
          <button onclick="openPlayerList('${position}')
          " id="change-button" class="flex bg-green-900 w-16 mt-0 rounded-lg justify-self-center text-white text-s"><i class="fas fa-edit"></i></button>
        </div>
      </div>
    </div>

    <div class="c rounded-xl w-8 h-7 bg-yellow-700 flex justify-self-center">
      <p class="text-sm font-bold mx-auto">${position}</p>
    </div>
   
  `;

  playerCard.style.gridRow = row;
  playerCard.style.gridColumn = column;
  field.appendChild(playerCard);


  loadPlayerData(position);

  // Événement pour ouvrir le modal
    
}

console.log(document.getElementById("change-button"));

// Chargement des données sauvegardées
function loadPlayerData(cardId) {
  const data = JSON.parse(localStorage.getItem(cardId));
  if (data) {
    updateCard(cardId, data);
  }
}
// Mise à jour visuelle des cartes
function updateCard(cardId, data) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const cardTitle = card.querySelector(".card-title");
  const cardRating = card.querySelector(".card-rating");
  const cardStats = card.querySelector(".card-stats");

  if (cardTitle) cardTitle.textContent = data.name || "Nom inconnu";
  if (cardRating) cardRating.textContent = `Rating: ${data.rating || "--"}`;
  if (cardStats) {
    if (cardId === "GK") {
      cardStats.textContent = `
        Réflexes: ${data.stats.reflexes || "--"}, 
        Plongeons: ${data.stats.diving || "--"}, 
        Jeu au pied: ${data.stats.kicking || "--"}
      `;
    } else {
      cardStats.textContent = `
        PAC: ${data.stats.pace || "--"}, SHO: ${data.stats.shooting || "--"}, 
        PAS: ${data.stats.passing || "--"}, DRI: ${data.stats.dribbling || "--"}, 
        DEF: ${data.stats.defending || "--"}, PHY: ${data.stats.physical || "--"}
      `;
    }
  }
}

// Générer la formation d'aores le formation selecter
function generateFormation(formation) {
  clearField(); // Supprimer les cartes existantes
  formation.forEach((line) => {
    const positions = line.positions;
    const row = line.row;
    const columns = calculateColumns(positions.length);

    positions.forEach((position, index) => {
      createPlayerCard(position, row, columns[index]);
    });
  });
}

// Gestion des formations via le select
const formationSelector = document.getElementById("formation-selector");
formationSelector.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  switch (selectedValue) {
    case "4-4-2":
      generateFormation(formation442);
      break;
    case "4-3-3":
      generateFormation(formation433);
      break;
    case "5-3-2":
      generateFormation(formation532);
      break;
    default:
      console.warn("Formation inconnue :", selectedValue);
  }
});


// Modal : Ouvrir et gérer les données du formulaire
let currentCardId = null;

  const addPlayerButton = document.getElementById("add_joueur");
  const modal = document.getElementById("pop_up_ajoute");
  const closeButton = document.getElementById("closeButton");

  // Fonction pour ouvrir le modal
  addPlayerButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // Fonction pour fermer le modal
  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Fermer le modal en cliquant en dehors
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
  

 // Gérer l'affichage dynamique des sections stats
 playerPosition.addEventListener("change", () => {
  const selectedPosition = playerPosition.value;
  if (selectedPosition === "GK") {
    statsJoue.classList.add("hidden");
    statsGK.classList.remove("hidden");
  } else {
    statsJoue.classList.remove("hidden");
    statsGK.classList.add("hidden");
  }
});

// Stocker les informations dans le Local Storage
playerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const playerName = document.getElementById("playerName").value;
  const playerClub = document.getElementById("player-club").value;
  const playerCountry = document.getElementById("player-country").value;
  const playerimage = document.getElementById("photosrc").value;
  const position = playerPosition.value;

  // Validation de base
if (!playerName || !playerClub || !playerCountry || !playerimage) {
  alert("Veuillez remplir tous les champs obligatoires.");
  return;
}

  let playerData = {
    name: playerName,
    club: playerClub,
    country: playerCountry,
    image:playerimage,
    position: position,
  };

  // Ajouter les statistiques spécifiques en fonction de la position
  if (position === "GK") {
    playerData.stats = {
      diving: document.getElementById("diving").value,
      handling: document.getElementById("handling").value,
      kicking: document.getElementById("kicking").value,
      reflexes: document.getElementById("reflexes").value,
      speed: document.getElementById("speed").value,
      positioning: document.getElementById("positioning").value,
    };
  } else {
    playerData.stats = {
      pace: document.getElementById("pace").value,
      shooting: document.getElementById("shooting").value,
      passing: document.getElementById("passing").value,
      dribbling: document.getElementById("dribbling").value,
      defending: document.getElementById("defending").value,
      physical: document.getElementById("physical").value,
    };
  }
// Enregistrer les données dans le Local Storage
let players = JSON.parse(localStorage.getItem("players")) || [];

// Vérifier si le joueur existe déjà
const existingPlayer = players.find(
  (p) => p.name === playerName && p.position === position
);

if (existingPlayer) {
  alert("Ce joueur existe déjà dans votre équipe.");
  return;
}

// Ajouter le joueur si unique
players.push(playerData);
localStorage.setItem("players", JSON.stringify(players));

    playerForm.reset();
    document.getElementById("pop_up_ajoute").classList.add("hidden");
    statsJoue.classList.remove("hidden");
    statsGK.classList.add("hidden");
  });



  // const players = JSON.parse(localStorage.getItem("players")) || [];
// Création du modal de la liste des joueurs
const playerListModal = document.createElement("div");
playerListModal.id = "playerListModal";
playerListModal.className = "absolute hidden top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center z-30";
playerListModal.innerHTML = `
  <div class="bg-white w-3/4 max-w-lg rounded-lg shadow-lg p-6">
    <h2 class="text-lg font-bold mb-4 text-center">Sélectionnez un joueur</h2>
    <ul id="playerList" class="space-y-2 max-h-60 overflow-y-auto"></ul>
    <button id="closePlayerList" class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Fermer</button>
  </div>
`;
document.body.appendChild(playerListModal);
console.log(players)
const playerList = document.querySelector("#playerList");


// Fonction pour ouvrir la liste des joueurs
window.openPlayerList = function(position) {
  const modal = document.getElementById("playerListModal");
  const playerList = document.getElementById("playerList");
  
console.log(position)

  const players = JSON.parse(localStorage.getItem("players")) || [];

  // Filtrer les joueurs par position
  const filteredPlayers = players.filter(players => players.position === position);

  // Réinitialiser le contenu du modal
  playerList.innerHTML = "";

  if (filteredPlayers.length === 0) {
    playerList.innerHTML = `<li class="text-center text-gray-500">Aucun joueur disponible pour cette position</li>`;
  } else {
    filteredPlayers.forEach((player) => {
      const listItem = document.createElement("li");
      listItem.className = "flex items-center justify-between bg-gray-100 p-2 rounded-lg hover:bg-gray-200 cursor-pointer";
      listItem.innerHTML = `
        <span>${player.name}</span>
        <span class="text-gray-500">${player.position}</span>
      `;
      listItem.addEventListener("click", () => {
        updateCardWithPlayer(position, player); // Appeler la fonction de mise à jour
        modal.classList.add("hidden");
      });
      playerList.appendChild(listItem);
    });
  }

  modal.classList.remove("hidden");
};


// pour fermer le modal
closePlayerList.addEventListener("click", () => {
  playerListModal.classList.add("hidden");
});
function updateCardWithPlayer(position, player) {
  const card = document.getElementById(position); // Trouver la carte correspondante
  if (!card) return;

  const cardImage = card.querySelector("img"); // Image du joueur
  const cardTitle = card.querySelector(".card-title"); // Nom du joueur
  const cardStats = card.querySelector(".cards-stats"); // Statistiques du joueur

  // Mettre à jour les données de la carte
  if (cardImage) cardImage.src = player.image || "https://via.placeholder.com/50";
  if (cardTitle) cardTitle.textContent = player.name || "Nom inconnu";

  if (cardStats) {
    cardStats.textContent = player.position === "GK"
      ? `DIV: ${player.stats.diving}, HAN: ${player.stats.handling}, KIC: ${player.stats.kicking}, REF: ${player.stats.reflexes}, SPD: ${player.stats.speed}, POS: ${player.stats.positioning}`
      : `PAC: ${player.stats.pace}, SHO: ${player.stats.shooting}, PAS: ${player.stats.passing}, DRI: ${player.stats.dribbling}, DEF: ${player.stats.defending}, PHY: ${player.stats.physical}`;
  }
}

// Fonction pour fermer le modal
closePlayerList.addEventListener("click", () => {
  playerListModal.classList.add("hidden");
});

// Charger les joueurs dans la réserve
function loadReservePlayers() {
  const reserve = document.getElementById("reserve");
  reserve.innerHTML = ""; // Réinitialiser le conteneur

  const players = JSON.parse(localStorage.getItem("players")) || [];
  players.forEach((player) => {
    const playerCard = document.createElement("div");
    playerCard.className = "card mx-auto bg-transparent p-4 rounded-lg  relative z-2";
    playerCard.innerHTML = `
      <div class="relative w-22 h-[170px] bg-[url('https://cdn.easysbc.io/fc25/cards/e_7_0.png')] bg-center bg-cover bg-no-repeat py-3 z-10 transition ease-in duration-200 sm:w-12 sm:h-[90px] md:w-20 md:h-[240px] lg:w-24 lg:h-[150px]">
        <div class="relative flex text-[#e9cc74] px-1 sm:px-1 md:px-1 lg:px-2">
          <div class="absolute text-[6px] font-light uppercase leading-3 py-1 sm:py-1 md:py-1">
            <div class="text-xs sm:text-[10px] md:text-xs lg:text-sm">${player.position}</div>
            <div class="w-2 h-1 mt-[1px] sm:w-1.5 sm:h-1.5 md:w-2 md:h-2">
              <img src="${player.country}" alt="Pays" class="object-contain" />
              
            </div>
            <div class="w-2 h-2.5 sm:w-1.5 sm:h-2 md:w-2 md:h-2.5">
              <img src="${player.club}" alt="Club" class="object-contain" />
            </div>
          </div>
          <div class="w-10 h-10 mx-auto overflow-hidden sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
            <img src="${player.image}" alt="Joueur" class="object-contain relative -right-1 sm:-right-0.5 md:-right-1 lg:-right-1.5" />
          </div>
        </div>
        <div class="relative">
          <div class="block text-black w-[90%] mx-auto py-[1px]">
            <div class="block text-center text-[6px] uppercase border-b border-opacity-10 border-[#e9cc74] pb-[1px] sm:text-[5px] md:text-[6px] lg:text-[7px]">
              <span class="card-title block">${player.name}</span>
            </div>
            <div class="cards-stats sm:text-[5px] md:text-[6px] lg:text-[7px] text-center mt-1 w-full font-light">
              ${
                player.position === "GK"
                  ? `DIV: ${player.stats.diving}, HAN: ${player.stats.handling}, KIC: ${player.stats.kicking}, REF: ${player.stats.reflexes}, SPD: ${player.stats.speed}, POS: ${player.stats.positioning}`
                  : `PAC: ${player.stats.pace}, SHO: ${player.stats.shooting}, PAS: ${player.stats.passing}, DRI: ${player.stats.dribbling}, DEF: ${player.stats.defending}, PHY: ${player.stats.physical}`
              }
            </div>
          </div>
        </div>
      </div>
    `;
    console.log(player.image);
    reserve.appendChild(playerCard);
  });
}

loadReservePlayers(); // Charger les joueurs au démarrage










































});