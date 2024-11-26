document.addEventListener("DOMContentLoaded", () => {
  const formationSelector = document.getElementById("formation-selector");
  const playerCardsContainer = document.getElementById("player-cards-container");

  // Configuration des formations et des positions
  const formations = {
    "4-4-2": ["GK", "LB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "ST", "ST"],
    "4-3-3": ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "CM", "LW", "RW", "ST"],
    "3-5-2": ["GK", "CB", "CB", "CB", "LM", "RM", "CDM", "CAM", "ST", "ST"],
  };

  // Fonction pour afficher les cartes des joueurs selon la formation choisie
  const displayPlayerCards = (formation) => {
    playerCardsContainer.innerHTML = ""; // Réinitialise les cartes

    // Génère les cartes pour chaque position
    formations[formation].forEach((position) => {
      const card = document.createElement("div");
      card.className = "p-4 rounded-lg shadow-md flex flex-col items-center";

      card.innerHTML = `
              <div class="mx-auto md:mb-[-30px] tablet:mt-16 scale-[1.5] tablet:scale-[1.8] sb-large:scale-[1.5]">
              <div class="relative md:w-20 w-28 sb-large:w-36 text-[#412b18] "><img alt="type" src="https://cdn.easysbc.io/fc25/cards/e_7_0.png">
                <div class="w-full flex absolute top-1 md:top-[-6px] sb-large:top-0">
                  <div class="flex flex-row gap-x-[2px] px-1 bg-black rounded text-white text-tiny desktop:text-xs sb-large:text-sm border border-[1px] border-[#493422] items-center w-fit mx-auto py-[1px]">
                    <div class="absolute left-[14%] top-[22%] sb-large:left-[14%] flex flex-col text-left" style="color: rgb(89, 77, 44);">
                      <div class="rounded-lg p-4 pl-1 pt-6 relative w-20 h-28 ">
                        <p class="text-sm font-bold mb-2">${position}</p>
                        <button class="bg-green-700 w-10 h-7 rounded-lg flex items-center justify-center hover:bg-green-600">
                          +
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
      `;
      playerCardsContainer.appendChild(card);
    });
  };

  // Écouteur d'événement pour détecter les changements de formation
  formationSelector.addEventListener("change", (e) => {
    const selectedFormation = e.target.value;
    displayPlayerCards(selectedFormation);
  });

  // Affiche la formation par défaut au chargement
  displayPlayerCards(formationSelector.value);
});
