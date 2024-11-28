document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const navbar = document.getElementById("navbar");
  const menuLinks = document.querySelectorAll(".nav-link");

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
});

const field = document.getElementById("main");

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
  playerCard.className = "card mx-auto bg-transparent p-4 rounded-lg shadow-md relative";

  playerCard.innerHTML = `
    <div class="relative w-22 h-[170px] bg-[url('https://cdn.easysbc.io/fc25/cards/e_7_0.png')] bg-center bg-cover bg-no-repeat py-3 z-10 transition ease-in duration-200 sm:w-12 sm:h-[90px] md:w-20 md:h-[140px] lg:w-24 lg:h-[150px]">
  <div class="relative flex text-[#e9cc74] px-1 sm:px-1 md:px-1 lg:px-2">
    <!-- Player Master Info -->
    <div class="absolute text-[6px] font-light uppercase leading-3 py-1 sm:py-1 md:py-1">
      <div class="text-xs sm:text-[10px] md:text-xs lg:text-sm">97</div>
      <div class="text-[8px] sm:text-[7px] md:text-[8px]">RW</div>
      <div class="w-2 h-1 mt-[1px] sm:w-1.5 sm:h-1.5 md:w-2 md:h-2">
        <img src="https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg" alt="Argentina" class="object-contain" />
      </div>
      <div class="w-2 h-2.5 sm:w-1.5 sm:h-2 md:w-2 md:h-2.5">
        <img src="https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg" alt="Barcelona" class="object-contain" />
      </div>
    </div>
    <!-- Player Picture -->
    <div class="w-10 h-10 mx-auto overflow-hidden sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
      <img src="https://selimdoyranli.com/cdn/fut-player-card/img/messi.png" alt="Messi" class="object-contain relative -right-1 sm:-right-0.5 md:-right-1 lg:-right-1.5" />
      <div class="absolute bottom-[-1px] right-0 text-[5px] font-bold uppercase w-full h-2 text-right px-1">
        <span class="ml-[2px]">4*SM</span>
        <span class="ml-[2px]">4*WF</span>
      </div>
    </div>
  </div>
  <!-- Player Card Bottom -->
  <div class="relative">
    <div class="block text-black w-[90%] mx-auto py-[1px]">
      <!-- Player Name -->
      <div class="block text-center text-[6px] uppercase border-b border-opacity-10 border-[#e9cc74] pb-[1px] sm:text-[5px] md:text-[6px] lg:text-[7px]">
        <span class="block">MESSI</span>
      </div>
      <!-- Player Features -->
      <div class="flex justify-center mt-[1px] sm:mt-[0.5px] md:mt-[1px] lg:mt-[1.5px]">
        <div class="pr-2 border-r border-opacity-10 border-[#e9cc74] sm:pr-1.5 md:pr-2 lg:pr-2.5">
          <span class="flex text-[6px] uppercase sm:text-[5px] md:text-[6px] lg:text-[7px]">
            <div class="font-bold mr-[1px]">97</div>
            <div class="font-light">PAC</div>
          </span>
          <span class="flex text-[6px] uppercase sm:text-[5px] md:text-[6px] lg:text-[7px]">
            <div class="font-bold mr-[1px]">95</div>
            <div class="font-light">SHO</div>
          </span>
          <span class="flex text-[6px] uppercase sm:text-[5px] md:text-[6px] lg:text-[7px]">
            <div class="font-bold mr-[1px]">94</div>
            <div class="font-light">PAS</div>
          </span>
        </div>
        <div class="pl-2 sm:pl-1.5 md:pl-2 lg:pl-2.5">
          <span class="flex text-[6px] uppercase sm:text-[5px] md:text-[6px] lg:text-[7px]">
            <div class="font-bold mr-[1px]">99</div>
            <div class="font-light">DRI</div>
          </span>
          <span class="flex text-[6px] uppercase sm:text-[5px] md:text-[6px] lg:text-[7px]">
            <div class="font-bold mr-[1px]">35</div>
            <div class="font-light">DEF</div>
          </span>
          <span class="flex text-[6px] uppercase sm:text-[5px] md:text-[6px] lg:text-[7px]">
            <div class="font-bold mr-[1px]">68</div>
            <div class="font-light">PHY</div>
          </span>
        </div>
        
      </div>
      <button id="open-modal-btn" class="bg-green-800 w-4 h-4 rounded flex items-center justify-center hover:bg-green-600">+</button>
      <button class="edit-button bg-green-800 w-10 h-5  rounded flex items-center text-4 justify-center">Modifié</button>
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

  // Charger les données depuis le Local Storage
  loadPlayerData(position);

  // Événement pour ouvrir le modal
  playerCard.querySelector(".edit-button").addEventListener("click", (e) => {
    openModalAboveButton(e.target);
  });
}

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
  if (card) {
    card.querySelector(".card-title").textContent = data.name || cardId;
    card.querySelector(".card-rating").textContent = `Rating: ${data.rating || "--"}`;
    if (cardId === "GK") {
      card.querySelector(".card-stats").textContent = `
        Réflexes: ${data.stats.reflexes || "--"}, 
        Plongeons: ${data.stats.diving || "--"}, 
        Jeu au pied: ${data.stats.kicking || "--"}
      `;
    } else {
      card.querySelector(".card-stats").textContent = `
        PAC: ${data.stats.pace || "--"}, SHO: ${data.stats.shooting || "--"}, PAS: ${data.stats.passing || "--"}, 
        DRI: ${data.stats.dribbling || "--"}, DEF: ${data.stats.defending || "--"}, PHY: ${data.stats.physical || "--"}
      `;
    }
  }
}

// Générer la formation
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

function openModalAboveButton(button) {
  const modal = document.getElementById("modal");
  currentCardId = button.closest(".card").id;

  const data = JSON.parse(localStorage.getItem(currentCardId)) || {};
  document.getElementById("player-name").value = data.name || "";
  document.getElementById("player-rating").value = data.rating || "";
  document.getElementById("pace").value = data.stats?.pace || "";
  document.getElementById("shooting").value = data.stats?.shooting || "";
  document.getElementById("passing").value = data.stats?.passing || "";
  document.getElementById("dribbling").value = data.stats?.dribbling || "";
  document.getElementById("defending").value = data.stats?.defending || "";
  document.getElementById("physical").value = data.stats?.physical || "";

  modal.classList.remove("hidden");
}

document.getElementById("player-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("player-name").value;
  const rating = document.getElementById("player-rating").value;
  const stats = {
    pace: document.getElementById("pace").value,
    shooting: document.getElementById("shooting").value,
    passing: document.getElementById("passing").value,
    dribbling: document.getElementById("dribbling").value,
    defending: document.getElementById("defending").value,
    physical: document.getElementById("physical").value,
  };

  const playerData = { name, rating, stats };
  localStorage.setItem(currentCardId, JSON.stringify(playerData));
  updateCard(currentCardId, playerData);

  document.getElementById("modal").classList.add("hidden");
});
