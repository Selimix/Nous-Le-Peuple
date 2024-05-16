# Projet de Gestion de Collage d'Affiches

## Description

Cette application permet à des militants bénévoles de coller des affiches sur les panneaux électoraux partout en France. Les bénévoles peuvent s'inscrire, être validés par un administrateur, et recevoir des tournées optimisées pour coller des affiches. Les administrateurs peuvent gérer les utilisateurs, valider les comptes, visualiser des statistiques globales, et plus encore.

## Fonctionnalités

### Utilisateurs

- **Inscription et Connexion** : Les utilisateurs peuvent s'inscrire et se connecter à l'application.
- **Validation des Comptes** : Les comptes des utilisateurs doivent être validés par un administrateur avant de pouvoir utiliser l'application.
- **Tableau de Bord** : Les utilisateurs peuvent voir leurs tournées et téléverser des photos des panneaux où ils ont collé des affiches.
- **Statistiques Personnelles** : Les utilisateurs peuvent voir le nombre de kilomètres parcourus, le nombre de panneaux collés, et plus.
- **Classement** : Un classement des utilisateurs basé sur le nombre de panneaux collés.
- **Système de Médailles** : Les utilisateurs reçoivent des médailles en fonction des paliers atteints (par exemple, 10, 20, 50 panneaux collés).

### Administrateurs

- **Validation des Utilisateurs** : Les administrateurs peuvent valider les comptes des utilisateurs.
- **Gestion des Utilisateurs** : Les administrateurs peuvent supprimer ou limiter les utilisateurs.
- **Statistiques Globales** : Les administrateurs peuvent voir le nombre total d'utilisateurs, le nombre de panneaux, et le nombre de panneaux couverts.
- **Fiches Statistiques des Utilisateurs** : Les administrateurs peuvent consulter les statistiques individuelles des utilisateurs.

## Structure du Projet

```
project-root/
|-- backend/
|   |-- models/
|   |   |-- User.js
|   |   |-- Panel.js
|   |-- routes/
|   |   |-- userRoutes.js
|   |   |-- panelRoutes.js
|   |   |-- adminRoutes.js
|   |-- scripts/
|   |   |-- importPanels.js
|   |-- middleware/
|   |   |-- authMiddleware.js
|   |-- app.js
|   |-- config.js
|-- data/
|   |-- panels.csv
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |   |-- logo.svg
|   |   |-- components/
|   |   |   |-- Admin/
|   |   |   |   |-- ValidateUsers.js
|   |   |   |   |-- Stats.js
|   |   |   |   |-- ManageUsers.js
|   |   |   |-- Dashboard.js
|   |   |   |-- Map.js
|   |   |   |-- SignUp.js
|   |   |   |-- Login.js
|   |   |   |-- UserStats.js
|   |   |   |-- UserRanking.js
|   |   |   |-- LoadingScreen.js
|   |   |   |-- LoadingScreen.css
|   |   |-- App.js
|   |   |-- index.js
|-- .env
|-- package.json
|-- README.md
|-- deploy.sh
```

## Installation

### Prérequis

- Node.js et npm
- MongoDB

### Étapes d'Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo
   ```

2. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet avec le contenu suivant :
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   OSRM_PATH=/path/to/your/osrm/file.osrm
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

3. Installez les dépendances backend :
   ```bash
   cd backend
   npm install
   ```

4. Installez les dépendances frontend :
   ```bash
   cd ../frontend
   npm install
   ```

5. Importez les données des panneaux :
   ```bash
   cd ../backend
   npm run import:panels
   ```

6. Démarrez le serveur backend :
   ```bash
   npm start
   ```

7. Démarrez le serveur frontend :
   ```bash
   cd ../frontend
   npm start
   ```

## Déploiement

Pour déployer ce projet sur un serveur, suivez les étapes suivantes :

1. Rendez le script de déploiement exécutable :
   ```bash
   chmod +x deploy.sh
   ```

2. Exécutez le script de déploiement :
   ```bash
   ./deploy.sh
   ```

Le script mettra à jour le serveur, installera Node.js, npm, et MongoDB, clonera le dépôt, installera les dépendances, configurera l'environnement, et démarrera le serveur.

## Utilisation

### Accès Administrateur

- Accédez à `/admin/validate-users` pour valider les utilisateurs.
- Accédez à `/admin/stats` pour voir les statistiques globales.
- Accédez à `/admin/manage-users` pour gérer les utilisateurs.

### Accès Utilisateur

- Accédez à `/user/stats` pour voir les statistiques personnelles.
- Accédez à `/user/ranking` pour voir le classement des utilisateurs.

---

Avec cette structure et ces instructions, vous pouvez facilement déployer et gérer votre projet de gestion de collage d'affiches. Assurez-vous de personnaliser les fichiers et les configurations selon vos besoins spécifiques.
```
