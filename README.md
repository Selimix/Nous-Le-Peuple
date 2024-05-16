# Optimisation du Collage d'Affiches Électorales

L'application "Optimisation du Collage d'Affiches Électorales" est une plateforme destinée aux militants bénévoles pour faciliter et optimiser le processus de collage d'affiches électorales sur les panneaux électoraux en France. Cette application permet aux bénévoles de s'inscrire, de planifier leurs tournées, de rapporter leurs actions et de collaborer efficacement pour une couverture optimale du territoire.

## Structure
racine/
|-- backend/
|   |-- models/
|   |   |-- User.js
|   |   |-- Panel.js
|   |-- routes/
|   |   |-- userRoutes.js
|   |   |-- panelRoutes.js
|   |-- scripts/
|   |   |-- importPanels.js
|   |-- app.js
|   |-- config.js
|-- data/
|   |-- panels.csv
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Dashboard.js
|   |   |   |-- Map.js
|   |   |   |-- SignUp.js
|   |   |   |-- Login.js
|   |   |-- App.js
|   |   |-- index.js
|-- .env
|-- package.json
|-- README.md
|-- deploy.sh

## Fonctionnalités

- **Inscription et Connexion des Utilisateurs**
  - Création de compte et authentification des utilisateurs.
  
- **Gestion des Panneaux Électoraux**
  - Importation de listes de panneaux électoraux via des fichiers CSV.
  - Visualisation des panneaux sur une carte interactive.

- **Attribution des Panneaux et Optimisation des Tournées**
  - Sélection des panneaux par les bénévoles.
  - Optimisation des itinéraires avec OSRM (Open Source Routing Machine).

- **Suivi et Rapport d'Activité**
  - Upload de photos des affiches collées.
  - Validation des actions et historique des activités des bénévoles.

- **Collaboration et Partage**
  - Tableau de bord collaboratif pour suivre l'avancement du collage des affiches.
  - Notifications pour rappeler les tâches et informer des nouvelles affectations.

## Captures d'Écran

### Tableau de Bord
![Tableau de Bord](https://via.placeholder.com/600x400)

### Optimisation de la Tournée
![Optimisation de la Tournée](https://via.placeholder.com/600x400)

### Upload de Photos
![Upload de Photos](https://via.placeholder.com/600x400)

## Technologies Utilisées

- **Frontend** : React.js
- **Backend** : Node.js avec Express.js
- **Base de Données** : MongoDB
- **API Cartographique** : Leaflet pour la visualisation des panneaux
- **Optimisation des Itinéraires** : OSRM (Open Source Routing Machine)

## Installation

### Prérequis

- Node.js
- MongoDB
- OSRM backend configuré avec le fichier OSM pour la France

### Instructions

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-repo.git
   cd nom-du-repo
   ```

2. Configurez les variables d'environnement :

   Créez un fichier `.env` dans le répertoire `backend` avec les variables suivantes :

   ```plaintext
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_secret_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

3. Installez les dépendances et lancez le serveur backend :

   ```bash
   cd backend
   npm install
   node app.js
   ```

4. Installez les dépendances et lancez le serveur frontend :

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## Contribuer

Les contributions sont les bienvenues ! Pour commencer :

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b fonctionnalite/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Ajout d'une fonctionnalité incroyable'`)
4. Poussez la branche (`git push origin fonctionnalite/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

