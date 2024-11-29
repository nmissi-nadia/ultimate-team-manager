
### **Ultimate Team Manager - EA FC 25 Squad Builder**

**Version :** 1.0.0  
**Auteur :** Nadia Nmissi  

---

## **Description**

**Ultimate Team Manager** est une application web interactive permettant de créer, personnaliser et gérer des équipes de football pour le jeu EA FC 25. Cette application propose des fonctionnalités avancées pour construire des formations tactiques, évaluer les statistiques des joueurs et optimiser la chimie de l'équipe.

---

## **Fonctionnalités**

- **Création d'équipes** :
  - Ajouter des joueurs personnalisés avec des données spécifiques.
  - Sauvegarder les configurations dans le Local Storage pour une utilisation ultérieure.

- **Personnalisation des joueurs** :
  - Ajouter des joueurs avec des informations comme :
    - Nom.
    - Club.
    - Position.
    - Nationalité.
    - Statistiques spécifiques (pour les joueurs de terrain ou les gardiens).

- **Gestion des formations** :
  - Supporte plusieurs configurations tactiques :
    - 4-4-2
    - 4-3-3
    - 5-3-2

- **Filtrage dynamique** :
  - Afficher les joueurs disponibles pour une position donnée lors de la sélection d'une carte.

- **Interface utilisateur moderne** :
  - Développée avec **Tailwind CSS** pour un design épuré et responsive.

---

## **Installation**

### Prérequis
1. Navigateur moderne supportant HTML5, CSS3 et JavaScript.
2. Serveur web local (optionnel, recommandé pour un usage optimal).

### Étapes
1. **Clonez le projet** :
   ```bash
   git clone https://github.com/votre-repository/ultimate-team-manager.git
   ```
2. **Accédez au dossier** :
   ```bash
   cd ultimate-team-manager
   ```
3. **Ouvrez le fichier HTML principal** :
   - Lancez `home.html` dans votre navigateur.

---

## **Utilisation**

1. **Ajoutez des joueurs** :
   - Cliquez sur le bouton **"Ajouter une joueur"**.
   - Remplissez le formulaire en fonction des informations du joueur.

2. **Construisez votre équipe** :
   - Sélectionnez une formation dans le menu déroulant (ex. 4-4-2).
   - Cliquez sur les cartes pour afficher les joueurs disponibles pour chaque position.

3. **Mettez à jour les cartes** :
   - Sélectionnez un joueur dans la liste affichée pour mettre à jour les statistiques de la carte.

4. **Sauvegardez vos données** :
   - Toutes les données sont enregistrées dans le **Local Storage** pour un accès futur.

---

## **Structure du Projet**

### **Arborescence**
```
ultimate-team-manager/
│
├── assets/
│   ├── css/
│   │   └── style.css       # Fichier de styles personnalisés
│   ├── js/
│   │   └── script.js       # Script principal JavaScript
│   └── images/             # Ressources graphiques (logos, joueurs, etc.)
│
├── home.html               # Page principale de l'application
└──README.md               # Documentation du projet

```

---

## **Technologies utilisées**

- **HTML5** : Structure sémantique du projet.
- **CSS3 & Tailwind CSS** : Mise en forme et design responsive.
- **JavaScript** : Logique fonctionnelle (manipulation DOM, gestion des événements).
- **Local Storage** : Stockage des données utilisateurs.

---



## **Problèmes connus**

- La suppression de joueurs ajoutés dans le Local Storage doit être gérée manuellement.
- Pas encore de gestion de serveur ou d'authentification utilisateur.

---

## **Améliorations futures**

- Intégration avec une base de données pour une gestion plus robuste des joueurs.
- Ajout de nouvelles formations tactiques.
- Fonctionnalités d'analyse pour évaluer la chimie et le potentiel de l'équipe.

---


## **Capture d'écran**

### Interface Principale
![Capture d'écran de l'interface](https://via.placeholder.com/800x400)

---

## **Contact**

Pour toute question ou suggestion, contactez :  
**Email :** nadia.nmissi@example.com  
**LinkedIn :** [Votre Profil](https://linkedin.com/in/votre-profil)  
**GitHub :** [Votre GitHub](https://github.com/nmissi-nadia)



