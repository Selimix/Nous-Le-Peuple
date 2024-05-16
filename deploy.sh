#!/bin/bash

# Arrêter le script si une commande échoue
set -e

# Variables
REPO_URL="https://github.com/votre-utilisateur/votre-repo.git"
PROJECT_DIR="/var/www/your_project"
ENV_FILE="/var/www/your_project/.env"
MONGO_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
JWT_SECRET="your_jwt_secret"
NODE_ENV="production"
OSRM_PATH="/path/to/your/osrm/file.osrm"
GOOGLE_MAPS_API_KEY="your_google_maps_api_key"

# Mise à jour du serveur
echo "Mise à jour du serveur..."
sudo apt-get update && sudo apt-get upgrade -y

# Installation de Node.js et npm
echo "Installation de Node.js et npm..."
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installation de MongoDB
echo "Installation de MongoDB..."
sudo apt-get install -y mongodb

# Démarrage du service MongoDB
echo "Démarrage de MongoDB..."
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Clonage du dépôt
echo "Clonage du dépôt..."
if [ -d "$PROJECT_DIR" ]; then
  sudo rm -rf "$PROJECT_DIR"
fi
sudo git clone "$REPO_URL" "$PROJECT_DIR"

# Aller dans le répertoire du projet
cd "$PROJECT_DIR"

# Installation des dépendances backend
echo "Installation des dépendances backend..."
cd backend
npm install

# Installation des dépendances frontend
echo "Installation des dépendances frontend..."
cd ../frontend
npm install

# Configuration de l'environnement
echo "Configuration de l'environnement..."
cat <<EOT > "$ENV_FILE"
MONGO_URI=$MONGO_URI
JWT_SECRET=$JWT_SECRET
NODE_ENV=$NODE_ENV
OSRM_PATH=$OSRM_PATH
GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY
EOT

# Démarrage du serveur
echo "Démarrage du serveur..."
cd ../backend
npm install pm2 -g
pm2 start app.js --name "your_project"

echo "Déploiement terminé avec succès !"
