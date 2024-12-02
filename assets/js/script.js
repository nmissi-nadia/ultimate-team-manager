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
function createPlayerCard(position, row, column,index) {
  const playerCard = document.createElement("div");
  const uniqueId = `${position}-${index}`; // ID unique basé sur position + index
    playerCard.id = uniqueId;
  playerCard.className = "card mx-auto bg-transparent p-4 rounded-lg relative z-2";
  playerCard.innerHTML = `
     <div class="relative w-22 h-[170px] bg-[url('https://cdn.easysbc.io/fc25/cards/e_7_0.png')] bg-center bg-cover bg-no-repeat py-3 z-10 transition ease-in duration-200 sm:w-12 sm:h-[90px] md:w-20 md:h-[140px] lg:w-24 lg:h-[150px]">
      <div class="relative flex text-[#e9cc74] px-1 sm:px-1 md:px-1 lg:px-2">
        <!-- Player Master Info -->
        <div class="absolute text-[6px] font-light uppercase leading-3 py-1 sm:py-1 md:py-1">
          <div class="text-xs sm:text-[10px] md:text-xs lg:text-sm">${position || "POS"}</div>
          <div class="w-2 h-1 mt-[1px] sm:w-1.5 sm:h-1.5 md:w-2 md:h-2">
            <img src="https://via.placeholder.com/20" alt="Pays" class="pyim object-contain" />
          </div>
          <div class="w-2 h-2.5 sm:w-1.5 sm:h-2 md:w-2 md:h-2.5">
            <img src="https://via.placeholder.com/20" alt="Club" class="club object-contain" />
          </div>
        </div>
        <!-- Player Picture -->
        <div class="w-10 h-10 mx-auto overflow-hidden sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img src="https://via.placeholder.com/50" alt="Joueur" class="imjou object-contain relative -right-1 sm:-right-0.5 md:-right-1 lg:-right-1.5" />
        </div>
      </div>
      <!-- Player Card Bottom -->
      <div class="relative">
        <div class="block text-black w-[90%] mx-auto py-[1px]">
          <!-- Player Name -->
          <div class="card-title block bg-[#e9cc74] text-center text-[6px] uppercase border-b border-opacity-10 border-[#e9cc74] pb-[1px] sm:text-[5px] md:text-[6px] lg:text-[7px]">
            <span class="block">Nom du joueur</span>
          </div>
          <!-- Player Stats -->
          <div class="cards-stats sm:text-[5px] md:text-[6px] bg-[#e9cc74] lg:text-[7px] text-center mt-1 w-full">
            ${
              position === "GK"
                ? `DIV: --, HAN: --, KIC: --,<br> REF: --, SPD: --, POS: --`
                : `PAC: --, SHO: --, PAS: --,<br> DRI: --, DEF: --, PHY: --`
            }
          </div>
          <div class=" flex justify-between"><button id="edit-button" class="flex bg-green-900 w-10 center mt-0 justify-self-center  rounded-lg items-center text-white text-s"><i class="fa fa-trash" aria-hidden="true"></i></button>
          <button onclick="openPlayerList('${playerCard.id}','${position}')
          " id="change-button" class="flex bg-green-900 w-8 mt-0 rounded-lg justify-self-center text-white text-s"><i class="fas fa-edit"></i></button></div>
         
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


  //  loadPlayerData(position);

  // Événement pour ouvrir le modal
    console.log(document.getElementById("change-button"));
}



// Chargement des données sauvegardées
// function loadPlayerData(cardId) {
//   const data = JSON.parse(localStorage.getItem(cardId));
//   if (data) {
//     updateCard(cardId, data);
//   }
// }
// Mise à jour visuelle des cartes
// function updateCard(cardId, data) {
//   const card = document.getElementById(cardId);
//   if (!card) return;

//   const cardTitle = card.querySelector(".card-title");
//   const cardRating = card.querySelector(".card-rating");
//   const cardStats = card.querySelector(".card-stats");

//   if (cardTitle) cardTitle.textContent = data.name || "Nom inconnu";
//   if (cardRating) cardRating.textContent = `Rating: ${data.rating || "--"}`;
//   if (cardStats) {
//     if (cardId === "GK") {
//       cardStats.textContent = `
//         Réflexes: ${data.stats.reflexes || "--"}, 
//         Plongeons: ${data.stats.diving || "--"}, 
//         Jeu au pied: ${data.stats.kicking || "--"}
//       `;
//     } else {
//       cardStats.textContent = `
//         PAC: ${data.stats.pace || "--"}, SHO: ${data.stats.shooting || "--"}, 
//         PAS: ${data.stats.passing || "--"}, DRI: ${data.stats.dribbling || "--"}, 
//         DEF: ${data.stats.defending || "--"}, PHY: ${data.stats.physical || "--"}
//       `;
//     }
//   }
// }

// Générer la formation d'aores le formation selecter
function generateFormation(formation) {
  clearField(); // Supprimer les cartes existantes
  formation.forEach((line) => {
    const positions = line.positions;
    const row = line.row;
    const columns = calculateColumns(positions.length);

    positions.forEach((position, index) => {
      createPlayerCard(position, row, columns[index],index);
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
  const playerName = document.getElementById("playerName").value.trim();
  const playerClub = document.getElementById("player-club").value.trim();
  const playerCountry = document.getElementById("player-country").value.trim();
  const playerImage = document.getElementById("photosrc").value.trim();
  const position = playerPosition.value;

  if (!playerName) {
    Alertperso("Le nom du joueur est obligatoire.");
    return;
  }

  if (!playerClub) {
    Alertperso("Veuillez sélectionner un club.");
    return;
  }

  if (!playerCountry) {
    Alertperso("Veuillez sélectionner un pays.");
    return;
  }

  if (!playerImage) {
    Alertperso("Veuillez choisir une image pour le joueur.");
    return;
  }

  if (!position) {
    Alertperso("Veuillez choisir une position.");
    return;
  }
  let playerData = {
    id: players.length + 1,
    name: playerName,
    club: playerClub,
    country: playerCountry,
    image: playerImage,
    position: position,
  };
  if (position === "GK") {
    playerData.stats = {
      diving: validateStat("diving"),
      handling: validateStat("handling"),
      kicking: validateStat("kicking"),
      reflexes: validateStat("reflexes"),
      speed: validateStat("speed"),
      positioning: validateStat("positioning"),
    };
  } else {
    playerData.stats = {
      pace: validateStat("pace"),
      shooting: validateStat("shooting"),
      passing: validateStat("passing"),
      dribbling: validateStat("dribbling"),
      defending: validateStat("defending"),
      physical: validateStat("physical"),
    };
  }

  const existingPlayer = players.find(
    (p) => p.name === playerName && p.position === position
  );
  if (existingPlayer) {
    Alertperso("Ce joueur existe déjà dans votre équipe.");
    return;
  }
  players.push(playerData);
  localStorage.setItem("players", JSON.stringify(players));
  playerForm.reset();
  document.getElementById("pop_up_ajoute").classList.add("hidden");
  statsJoue.classList.remove("hidden");
  statsGK.classList.add("hidden");

  Alertperso("Joueur ajouté avec succès !");
});

// pour validation des statistiques des joueurs 
function validateStat(statId) {
  const value = parseInt(document.getElementById(statId).value.trim(), 10);
  if (isNaN(value) || value < 0 || value > 99) {
    Alertperso(`La statistique ${statId} doit être un nombre entre 0 et 99.`);
    throw new Error(`Statistique invalide pour ${statId}`);
  }
  return value;
}




  // const players = JSON.parse(localStorage.getItem("players")) || [];
// Création du modal de la liste des joueurs
const playerListModal = document.createElement("div");
playerListModal.id = "playerListModal";
playerListModal.className = "absolute hidden top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center z-20";
playerListModal.innerHTML = `
  <div class="bg-gray-900 w-3/4 max-w-lg rounded-lg shadow-lg p-6">
    <h2 class="text-lg font-bold mb-4 text-yellow-400 text-center">Sélectionnez un joueur</h2>
    <div id="playerList" class=" space-x-2 max-h-60 overflow-x-auto"></div>
    <button id="closePlayerList" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600">Fermer</button>
  </div>
`;
document.body.appendChild(playerListModal);
console.log(players)
const playerList = document.querySelector("#playerList");


// Fonction pour ouvrir la liste des joueurs
window.openPlayerList = function(id,position) {
  const modal = document.getElementById("playerListModal");
  const playerList = document.getElementById("playerList");
  
console.log(position)

  const players = JSON.parse(localStorage.getItem("players")) || [];

  // Filtrer les joueurs par position
  const filteredPlayers = players.filter(players => players.position === position);

  // Réinitialiser le contenu du modal
  playerList.innerHTML = "";

  if (filteredPlayers.length === 0) {
    playerList.innerHTML = `<p class="text-center text-gray-500">Aucun joueur disponible pour cette position</p>`;
  } else {
    filteredPlayers.forEach((player) => {
      const listItem = document.createElement("div");
      listItem.className = "mx-auto bg-transparent p-4 rounded-lg  relative z-2 cursor-pointer";
      listItem.innerHTML = `
        <div class="relative w-22 h-[170px] bg-[url('https://cdn.easysbc.io/fc25/cards/e_7_0.png')] bg-center bg-cover bg-no-repeat py-3 z-10 transition ease-in duration-200 sm:w-12 sm:h-[90px] md:w-20 md:h-[140px] lg:w-24 lg:h-[150px]">
      <div class="relative flex text-[#e9cc74] px-1 sm:px-1 md:px-1 lg:px-2">
        <!-- Player Master Info -->
        <div class="absolute text-[6px] font-light uppercase leading-3 py-1 sm:py-1 md:py-1">
          <div class="text-xs sm:text-[10px] md:text-xs lg:text-sm">${player.position}</div>
          <div class="w-2 h-1 mt-[1px] sm:w-1.5 sm:h-1.5 md:w-2 md:h-2">
            <img src="${player.country}" alt="Pays" class="object-contain" />
          </div>
          <div class="w-2 h-2.5 sm:w-1.5 sm:h-2 md:w-2 md:h-2.5">
            <img src="${player.club}" alt="Club" class="object-contain" />
          </div>
        </div>
        <!-- Player Picture -->
        <div class="w-10 h-10 mx-auto overflow-hidden sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img src="${player.image}" alt="Joueur" class="object-contain relative -right-1 sm:-right-0.5 md:-right-1 lg:-right-1.5" />
        </div>
      </div>
      <!-- Player Card Bottom -->
       <div class="relative">
          <div class="block text-black w-[90%] mx-auto py-[1px]">
            <div class="card-title bg-[#e9cc74] block text-center text-[6px] uppercase border-b border-opacity-10 border-[#e9cc74] pb-[1px] sm:text-[5px] md:text-[6px] lg:text-[7px]">
              <span class="block">${player.name}</span>
            </div>
            <div class="cards-stats sm:text-[5px] bg-[#e9cc74] md:text-[6px] lg:text-[7px] text-center mt-1 w-full font-light">
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
      listItem.addEventListener("click", () => {
        updateCardWithPlayer(id, player); // Appeler la fonction de mise à jour
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
function updateCardWithPlayer(id, player) {
  const card = document.getElementById(id); // Trouver la carte correspondante
  if (!card) return;

  const cardImagecountry = card.querySelector(".pyim"); // Image du country
  const cardImageclub = card.querySelector(".club"); // Image du club
  const cardImagejoue = card.querySelector(".imjou"); // Image du joueur
  const cardTitle = card.querySelector(".card-title"); // Nom du joueur
  const name =cardTitle.querySelector("span");
  const cardStats = card.querySelector(".cards-stats"); // Statistiques du joueur

  // Mettre à jour les données de la carte
  if (cardImagecountry) cardImagecountry.src = player.country || "https://via.placeholder.com/20";
  if (cardImageclub) cardImageclub.src = player.club || "https://via.placeholder.com/20";
  if (cardImagejoue) cardImagejoue.src = player.image || "https://via.placeholder.com/50";
  if (name) name.textContent = player.name || "Nom inconnu";

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
  console.log(players)
  players.forEach((player) => {
    const playerCard = document.createElement("div");
    
    playerCard.className = "card mx-auto bg-transparent p-4 rounded-lg  relative z-2";
    playerCard.innerHTML = ""
    playerCard.innerHTML = `
      
      <div class="relative w-22 h-[170px] bg-[url('https://cdn.easysbc.io/fc25/cards/e_7_0.png')] bg-center bg-cover bg-no-repeat py-3 z-10 transition ease-in duration-200 sm:w-20 sm:h-[140px] md:w-20 md:h-[140px] lg:w-24 lg:h-[150px]">
      <div class="relative flex text-[#e9cc74] px-1 sm:px-1 md:px-1 lg:px-2">
        <!-- Player Master Info -->
        <div class="absolute text-[6px] font-light uppercase leading-3 py-1 sm:py-1 md:py-1">
          <div class="text-xs sm:text-[10px] md:text-xs lg:text-sm">${player.position}</div>
          <div class="w-2 h-1 mt-[1px] sm:w-1.5 sm:h-1.5 md:w-2 md:h-2">
            <img src="${player.country}" alt="Pays" class="object-contain" />
          </div>
          <div class="w-2 h-2.5 sm:w-1.5 sm:h-2 md:w-2 md:h-2.5">
            <img src="${player.club}" alt="Club" class="object-contain" />
          </div>
        </div>
        <!-- Player Picture -->
        <div class="w-10 h-10 mx-auto overflow-hidden sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img src="${player.image}" alt="Joueur" class="object-contain relative -right-1 sm:-right-0.5 md:-right-1 lg:-right-1.5" />
        </div>
      </div>
      <!-- Player Card Bottom -->
       <div class="relative">
          <div class="block text-black w-[90%] mx-auto py-[1px]">
            <div class="block card-title bg-[#e9cc74] text-center text-[6px] uppercase border-b border-opacity-10 border-[#e9cc74] pb-[1px] sm:text-[5px] md:text-[6px] lg:text-[7px]">
              <span class="block">${player.name}</span>
            </div>
            <div class="cards-stats sm:text-[5px] bg-[#e9cc74] md:text-[6px] lg:text-[7px] text-center mt-1 w-full font-light">
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


// -------------------------------------------------------------------------------------------
// pour l'affichage des squad enregistre
function affichagesquadformation() {
  const teams = JSON.parse(localStorage.getItem("teams")) || [];
  const container = document.getElementById("saved-teams");
  container.innerHTML = ""; // Réinitialiser l'affichage

  if (teams.length === 0) {
      container.innerHTML = "<p>Aucune équipe sauvegardée.</p>";
      return;
  }

  teams.forEach(team => {
      const teamElement = document.createElement("div");
      teamElement.className = "team-card border rounded-lg p-4 mb-4 bg-gray-100";

      teamElement.innerHTML = `
          <h3 class="text-lg font-bold mb-2">${team.teamName}</h3>
          <div class="grid grid-cols-4 gap-2">
              ${team.formation.map(f => `
                  <div class="player-card text-center">
                      <img src="${f.player.image}" alt="${f.player.name}" 
                           class="h-12 w-12 mx-auto rounded-full" />
                      <p class="text-sm">${f.player.name}</p>
                      <p class="text-xs text-gray-400">${f.position}</p>
                  </div>
              `).join("")}
          </div>
      `;
      container.appendChild(teamElement);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  affichagesquadformation();
});

// enregistrement des equipe
function enregistreequipeformation(teamName) {
  const formation = [];

  // Parcourir toutes les cartes sur le terrain
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
      const position = card.id; // ID de la carte (ex. "GK-1", "CB-2")
      const playerName = card.querySelector(".card-title span") ?.textContent;
      const playerImage = card.querySelector(".imgjou")?.src; 
      const playercountry = card.querySelector("pyim")?.src;
      const playerclub = card.querySelector("club")?.src; 
      const playerStats = card.querySelector(".cards-stats")?.textContent || "";

      // Vérifier si le joueur existe sur cette carte
      if (playerName) {
          formation.push({
              position, // Position sur le terrain (ex. "GK-1")
              player: {
                  name: playerName,
                  image: playerImage,
                  country:playercountry,
                  club:playerclub,
                  stats: playerStats,
              }
          });
      }
  });

  // Validation
  if (!teamName || formation.length === 0) {
    Alertperso("Veuillez donner un nom à l'équipe et compléter la formation.");
      return;
  }

  // Sauvegarder dans localStorage
  let teams = JSON.parse(localStorage.getItem("teams")) || [];
  teams.push({ teamName, formation }); // Ajouter la formation
  localStorage.setItem("teams", JSON.stringify(teams)); // Sauvegarder
  Alertperso("Formation enregistrée avec succès !");
}




// la fonction pour rechercher une equipe et l'afficher dans le stade
function affichersquadparnom(teamName) {
  // Charger les formations existantes
  const teams = JSON.parse(localStorage.getItem("teams")) || [];
  const team = teams.find(t => t.teamName.toLowerCase() === teamName.toLowerCase());

  if (!team) {
    Alertperso("Aucune formation trouvée pour cette équipe.");
      return;
  }

  // Vider le terrain avant d'afficher la formation
  const field = document.getElementById("main");
  field.innerHTML = "";

  // Afficher la formation sur le terrain
  team.formation.forEach(({ position, player }) => {
      const playerCard = document.createElement("div");
      playerCard.id = position;
      playerCard.className = "card mx-auto bg-transparent p-4 rounded-lg  relative z-2";

      playerCard.innerHTML = `
          <div class="relative w-22 h-[170px] bg-[url('https://cdn.easysbc.io/fc25/cards/e_7_0.png')] bg-center bg-cover bg-no-repeat py-3 z-10 transition ease-in duration-200 sm:w-20 sm:h-[140px] md:w-20 md:h-[140px] lg:w-24 lg:h-[150px]">
      <div class="relative flex text-[#e9cc74] px-1 sm:px-1 md:px-1 lg:px-2">
        <!-- Player Master Info -->
        <div class="absolute text-[6px] font-light uppercase leading-3 py-1 sm:py-1 md:py-1">
          <div class="text-xs sm:text-[10px] md:text-xs lg:text-sm">${player.position}</div>
          <div class="w-2 h-1 mt-[1px] sm:w-1.5 sm:h-1.5 md:w-2 md:h-2">
            <img src="${player.country}" alt="Pays" class="object-contain" />
          </div>
          <div class="w-2 h-2.5 sm:w-1.5 sm:h-2 md:w-2 md:h-2.5">
            <img src="${player.club}" alt="Club" class="object-contain" />
          </div>
        </div>
        <!-- Player Picture -->
        <div class="w-10 h-10 mx-auto overflow-hidden sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img src="${player.image}" alt="Joueur" class="object-contain relative -right-1 sm:-right-0.5 md:-right-1 lg:-right-1.5" />
        </div>
      </div>
      <!-- Player Card Bottom -->
       <div class="relative">
          <div class="block text-black w-[90%] mx-auto py-[1px]">
            <div class="block card-title bg-[#e9cc74] text-center text-[6px] uppercase border-b border-opacity-10 border-[#e9cc74] pb-[1px] sm:text-[5px] md:text-[6px] lg:text-[7px]">
              <span class="block">${player.name}</span>
            </div>
            <div class="cards-stats sm:text-[5px] bg-[#e9cc74] md:text-[6px] lg:text-[7px] text-center mt-1 w-full font-light">
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

      // Positionner la carte sur le terrain
      const [row, col] = position.split("-"); // Exemple : "GK-1" -> ["GK", "1"]
      playerCard.style.gridRow = row;
      playerCard.style.gridColumn = col;

      field.appendChild(playerCard);
  });
}







































});

// pour le mv de cards des joueurs en reserve
const carousel = document.getElementById("reserve");
carousel.addEventListener("mouseenter", () => {
    carousel.style.animationPlayState = "paused";
});
carousel.addEventListener("mouseleave", () => {
    carousel.style.animationPlayState = "running";
});







// fonction pour personnaliser alert 
function Alertperso(message) {
  // Vérifier si une alerte est déjà affichée
  if (document.getElementById("custom-alert-box")) return;

  // Créer l'élément de la boîte d'alerte
  const alertBox = document.createElement("div");
  alertBox.id = "custom-alert-box";
  alertBox.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";

  // Contenu de la boîte d'alerte
  alertBox.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-center">
          <p class="text-gray-800 text-lg font-semibold mb-4">${message}</p>
          <button id="close-alert-btn" class="px-4 py-2 bg-blue-500 text-white rounded-lg">
              OK
          </button>
      </div>
  `;

  // Ajouter la boîte au document
  document.body.appendChild(alertBox);

  // Fermer la boîte d'alerte
  document.getElementById("close-alert-btn").onclick = () => {
      alertBox.remove();
  };
}