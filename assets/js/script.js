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
      "rounded-lg",
      "md:flex-row",
      "md:space-y-0",
      "md:space-x-8"
    );
  });

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
  const Cardjoueur = document.createElement("div");
  const uniqueId = `${position}-${index}`;
  Cardjoueur.id = uniqueId;
  Cardjoueur.className = "card mx-auto bg-transparent p-4 rounded-lg relative z-2";
  Cardjoueur.innerHTML = `
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
          <div class="cards-stats sm:text-[2px] md:text-[6px] bg-[#e9cc74] lg:text-[7px] text-center mt-1 w-full">
            ${
              position === "GK"
                ? `DIV: --, HAN: --, KIC: --,<br> REF: --, SPD: --, POS: --`
                : `PAC: --, SHO: --, PAS: --,<br> DRI: --, DEF: --, PHY: --`
            }
          </div>
          <div class=" flex justify-between">
          <button id="edit-button" onclick="supprimer_joueur('${Cardjoueur.id}')" class="flex bg-green-900 w-10 center mt-0 justify-center  rounded-lg items-center text-white text-s"><i class="fa fa-trash" aria-hidden="true"></i></button>
          <button onclick="modifier_joueur('${Cardjoueur.id}')" class="bg-yellow-500 text-white px-3 py-1 rounded-lg">
        <i class="fas fa-edit"></i>
    </button>
          <button onclick="openPlayerList('${Cardjoueur.id}','${position}')
          " id="change-button" class="flex bg-green-900 w-8 mt-0 rounded-lg justify-center text-white text-s"><i class="fa fa-plus" aria-hidden="true"></i></button></div>
         
        </div>
      </div>
    </div>

    <div class="rounded-xl w-8 h-7 bg-yellow-700 flex justify-self-center">
      <p class="text-sm font-bold mx-auto">${position}</p>
    </div>
   
  `;

  Cardjoueur.style.gridRow = row;
  Cardjoueur.style.gridColumn = column;
  field.appendChild(Cardjoueur);


  //  loadPlayerData(position);

  // Événement pour ouvrir le modal
    console.log(document.getElementById("change-button"));
    
}
// ------------------------------------------choix du formation-----------------------

// Générer la formation d'aores le formation selecter
function generateFormation(formation) {
  clearField(); 
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
// ---------------------------------------------------Ajout des joueurs-----------------
  const addPlayerButton = document.getElementById("add_joueur");
  const modal = document.getElementById("pop_up_ajoute");
  const closeButton = document.getElementById("closeButton");

  addPlayerButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
  

 //l'affichage des sections stats
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
// validation et enregistrement
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

  const Regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!Regex.test(playerName)) {
        Alertperso("Le nom du joueur ne doit contenir que des lettres et des espaces.");
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
// --------------------------------------------------------------------------------------suppresion des joueurs 

window.supprimer_joueur = function (cardId) {
 e
  const card = document.getElementById(cardId);
  if (!card) {
      Alertperso(`Aucune carte trouvée avec l'ID : ${cardId}`);
      return;
  }

  const reservePlayers = JSON.parse(localStorage.getItem("players")) || [];

  const playerName = card.querySelector(".card-title span")?.textContent || "";
  const playerPosition = cardId;

  if (!playerName) {
      Alertperso(`Aucun joueur trouvé pour la carte ${cardId}.`);
      return;
  }

  const reserveIndex = reservePlayers.findIndex(
      (player) => player.name === playerName && player.position === playerPosition
  );

  if (reserveIndex !== -1) {
      reservePlayers.splice(reserveIndex, 1);
      localStorage.setItem("players", JSON.stringify(reservePlayers)); 
  } else {
      Alertperso(`Joueur ${playerName} non trouvé dans la liste des réserves.`);
  }
  card.innerHTML = `
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
          <div class="cards-stats sm:text-[2px] md:text-[6px] bg-[#e9cc74] lg:text-[7px] text-center mt-1 w-full">
            ${
              position === "GK"
                ? `DIV: --, HAN: --, KIC: --,<br> REF: --, SPD: --, POS: --`
                : `PAC: --, SHO: --, PAS: --,<br> DRI: --, DEF: --, PHY: --`
            }
          </div>
            <div class=" flex justify-between">
                <button id="edit-button" onclick="supprimer_joueur('${Cardjoueur.id}')" class="flex bg-green-900 w-10 center mt-0 justify-center  rounded-lg items-center text-white text-s"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick="modifier_joueur('${Cardjoueur.id}')" class="bg-yellow-500 text-white px-3 py-1 rounded-lg">
              <i class="fas fa-edit"></i></button>
                <button onclick="openPlayerList('${Cardjoueur.id}','${position}')
                " id="change-button" class="flex bg-green-900 w-8 mt-0 rounded-lg justify-center text-white text-s"><i class="fa fa-plus" aria-hidden="true"></i></button></div>
         
        </div>
      </div>
    </div>

    <div class="rounded-xl w-8 h-7 bg-yellow-700 flex justify-self-center">
      <p class="text-sm font-bold mx-auto">${position}</p>
    </div>
   
  `;

  console.log(`Joueur supprimé définitivement de la carte ${cardId} et de la réserve.`);
};
// -------------------------------------------------------------  Modification d'un joueur
window.modifier_joueur = function (cardId) {
  // Trouver la carte correspondante
  const card = document.getElementById(cardId);
  if (!card) {
      console.warn(`Aucune carte trouvée avec l'ID : ${cardId}`);
      return;
  }

  // Récupérer les informations actuelles du joueur
  const playerName = card.querySelector(".card-title span")?.textContent || "";
  const playerPosition = card.id;
  const playerCountry = card.querySelector(".pyim")?.src || "";
  const playerClub = card.querySelector(".club")?.src || "";
  const playerImage = card.querySelector(".imjou")?.src || "";
  const playerStats = card.querySelector(".cards-stats")?.textContent || "";

  // Associer les champs du modal
  const modal = document.getElementById("pop_up_ajoute");
  const nameInput = document.getElementById("playerName");
  const positionSelect = document.getElementById("player-position");
  const countrySelect = document.getElementById("player-country");
  const clubSelect = document.getElementById("player-club");
  const photoSelect = document.getElementById("photosrc");

  if (!modal || !nameInput || !positionSelect || !countrySelect || !clubSelect || !photoSelect) {
      console.error("Un ou plusieurs champs du modal sont introuvables !");
      return;
  }

  // Pré-remplir les champs du modal avec les données existantes
  nameInput.value = playerName;
  positionSelect.value = playerPosition;
  countrySelect.value = playerCountry;
  clubSelect.value = playerClub;
  photoSelect.value = playerImage;

  // Gérer les statistiques dynamiques (joueur ou gardien)
  const statsDiv = document.getElementById(playerPosition === "GK" ? "stats_GK" : "stats_joue");
  const otherStatsDiv = document.getElementById(playerPosition === "GK" ? "stats_joue" : "stats_GK");
  statsDiv.classList.remove("hidden");
  otherStatsDiv.classList.add("hidden");

  // Remplir les champs des statistiques si disponibles
  if (playerStats) {
      const stats = playerStats.split(", ");
      stats.forEach((stat) => {
          const [key, value] = stat.split(":");
          const statInput = document.getElementById(key.trim().toLowerCase());
          if (statInput) {
              statInput.value = value.trim();
          }
      });
  }

  // Afficher le modal
  modal.classList.remove("hidden");

  // Gérer le bouton "Fermer"
  document.getElementById("closeButton").onclick = () => {
      modal.classList.add("hidden");
  };

  // Gérer l'enregistrement des modifications
  document.getElementById("btnajout").onclick = (e) => {
      e.preventDefault();

      // Récupérer les données modifiées
      const updatedName = nameInput.value.trim();
      const updatedPosition = positionSelect.value;
      const updatedCountry = countrySelect.value;
      const updatedClub = clubSelect.value;
      const updatedPhoto = photoSelect.value;

      if (!updatedName || !updatedPosition || !updatedCountry || !updatedClub || !updatedPhoto) {
          alert("Tous les champs doivent être remplis.");
          return;
      }

      // Mettre à jour la carte
      card.querySelector(".card-title span").textContent = updatedName;
      card.querySelector(".pyim").src = updatedCountry;
      card.querySelector(".club").src = updatedClub;
      card.querySelector(".imjou").src = updatedPhoto;

      // Mettre à jour les statistiques dans la carte
      const updatedStats = Array.from(statsDiv.querySelectorAll("input"))
          .map((input) => `${input.id.toUpperCase()}: ${input.value}`)
          .join(", ");
      card.querySelector(".cards-stats").textContent = updatedStats;

      // Mettre à jour dans localStorage
      const players = JSON.parse(localStorage.getItem("players")) || [];
      const playerIndex = players.findIndex((player) => player.name === playerName && player.position === playerPosition);

      if (playerIndex !== -1) {
          players[playerIndex] = {
              name: updatedName,
              position: updatedPosition,
              country: updatedCountry,
              club: updatedClub,
              image: updatedPhoto,
              stats: updatedStats,
          };
          localStorage.setItem("players", JSON.stringify(players));
      }

      // Masquer le modal
      modal.classList.add("hidden");
      alert("Les informations du joueur ont été mises à jour avec succès !");
  };
};



// -----------------------------------------------------------------------Modal des joueurs en reserve de meme poste 

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
        changejoueur(id, player); // Appeler la fonction de mise à jour
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
// ---------------------------------------------------------------------------------------------------------------------------change a player 
function changejoueur(id, player) {
  const card = document.getElementById(id);
  if (!card) return;

  const cardImagecountry = card.querySelector(".pyim");
  const cardImageclub = card.querySelector(".club");
  const cardImagejoue = card.querySelector(".imjou");
  const cardTitle = card.querySelector(".card-title");
  const name =cardTitle.querySelector("span");
  const cardStats = card.querySelector(".cards-stats");

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
// --------------------------------------------joueures en reseve--------------------------------------------
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

loadReservePlayers(); 

});
// ---------------------------------carrousel des joueurs en reserver------------------------
// pour le mv de cards des joueurs en reserve
const carousel = document.getElementById("reserve");
carousel.addEventListener("mouseenter", () => {
    carousel.style.animationPlayState = "paused";
});
carousel.addEventListener("mouseleave", () => {
    carousel.style.animationPlayState = "running";
});

// --------------------------------------------------------------------------------------------

// fonction pour personnaliser alert 
function Alertperso(message) {
  if (document.getElementById("custom-alert-box")) return;
  const alertBox = document.createElement("div");
  alertBox.id = "custom-alert-box";
  alertBox.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";
  alertBox.innerHTML = `
      <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 rounded-lg shadow-lg w-80 p-4 text-center">
          <p class="text-gray-800 text-lg font-semibold mb-4">${message}</p>
          <button id="close-alert-btn" class="px-4 py-2 bg-green-700 text-white rounded-lg">
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