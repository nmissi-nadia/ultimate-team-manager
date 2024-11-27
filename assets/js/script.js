document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const navbar = document.getElementById("navbar");
  const menuLinks = document.querySelectorAll(".nav-link");

  // Toggle menu visibility for mobile
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
    menu.classList.add("flex-col", "space-y-4", "bg-gray-900", "p-4", "rounded-lg", "md:flex-row", "md:space-y-0", "md:space-x-8");
  });

  // Change active link on scroll
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver((entries) => {
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
  }, { threshold: 0.5 });

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
  { row: 1, positions: ["ST", "ST"] }, // Ligne 1 : 2 attaquants
  { row: 2, positions: ["LM", "CM", "CM", "RM"] }, // Ligne 2 : 4 milieux
  { row: 3, positions: ["LB", "CB", "CB", "RB"] }, // Ligne 3 : 4 défenseurs
  { row: 4, positions: ["GK"] }, // Ligne 4 : Gardien
];

const formation532 = [
  { row: 1, positions: ["ST", "ST"] }, // Ligne 1 : 2 attaquants
  { row: 2, positions: ["LM", "CM", "RM"] }, // Ligne 2 : 4 milieux
  { row: 3, positions: ["LB", "CB", "CB", "CB", "RB"] }, // Ligne 3 : 4 défenseurs
  { row: 4, positions: ["GK"] }, // Ligne 4 : Gardien
];

// Génération dynamique des joueurs avec le style spécifique
function createPlayerCard(position, row, column) {
  const playerCard = document.createElement("div");

  playerCard.className =
    "mx-auto md:mb-[-30px] ml-20 tablet:mt-16 scale-[1.5] tablet:scale-[1.8] sb-large:scale-[1.5]";

  playerCard.innerHTML = `
    <div class="relative -left[100px]  md:w-20 w-28 sb-large:w-36 text-[#412b18]">
      <img alt="type" src="https://cdn.easysbc.io/fc25/cards/e_7_0.png" />
      <div class="w-full flex absolute top-1 md:top-[-6px] sb-large:top-0">
       
          <div
            class="left-[14%] top-[22%] sb-large:left-[14%] flex flex-col rounded-lg p-4 pl-1 pt-6 relative w-20 h-28 text-left"
            style="color: rgb(89, 77, 44);"
          >
            
              <p class="text-sm font-bold mb-2">${position}</p>
              <button
                id="open-modal-btn"
                class="bg-green-700 w-10 h-7 rounded-lg flex items-center justify-center hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
       
      
    </div>
    <div
              class="c rounded-xl w-8 h-7 bg-yellow-700 flex justify-self-center"
            ><p class="text-sm font-bold mx-auto">${position}</p>
    </div>
  `;

  // Placement dans la grille
  playerCard.style.gridRow = row;
  playerCard.style.gridColumn = column;

  // Ajout au terrain
  field.appendChild(playerCard);
}

// Générer la formation 4-4-2
function generateFormation(formation) {
  formation.forEach((line) => {
    const positions = line.positions;
    const row = line.row;

    // Centrer les joueurs pour chaque ligne
    const columns = calculateColumns(positions.length);

    positions.forEach((position, index) => {
      createPlayerCard(position, row, columns[index]);
    });
  });
}

// Calcul des colonnes pour centrer les joueurs
function calculateColumns(playerCount) {
  const columns = [];
  const totalColumns = 5;

  // Démarrage des joueurs au centre
  const startColumn = Math.floor((totalColumns - playerCount) / 2) + 1;
  for (let i = 0; i < playerCount; i++) {
    columns.push(startColumn + i);
  }

  return columns;
}

// Générer le terrain et les joueurs
generateFormation(formation442);



// --------------------------------------------------affichage du modal pour les joueurs
// Fonction pour ouvrir le modal au-dessus du bouton cliqué
function openModalAboveButton(button) {
  const modal = document.getElementById('modal');
  const buttonRect = button.getBoundingClientRect();

  // Calculer la position du modal
  modal.style.top = `${buttonRect.top + window.scrollY}px`; // Gérer le défilement
  modal.style.left = `${buttonRect.left}px`;

  // Afficher le modal
  modal.classList.remove('hidden');
}

// Écouteur d'événement global pour capturer les clics sur les boutons dynamiques
document.addEventListener('click', (e) => {
  // Vérifier si le clic vient d'un bouton dans une carte
  if (e.target && e.target.classList.contains('bg-green-700')) {
    openModalAboveButton(e.target);
  }

  // Fermer le modal si on clique sur "×" ou à l'extérieur
  const modal = document.getElementById('modal');
  if (e.target.id === 'close-modal-btn' || (!modal.contains(e.target) && !e.target.classList.contains('bg-green-700'))) {
    modal.classList.add('hidden');
  }
});
