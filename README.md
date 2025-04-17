# BlogChillDev

Une application de blog moderne développée avec React et Django, permettant aux utilisateurs de partager des articles, commenter et réagir avec des emojis.

## Aperçu du projet

BlogChillDev est une application full-stack composée d'un frontend React avec TypeScript et d'un backend Django REST API. L'application permet:

- Consultation d'articles
- Création de nouveaux articles (administrateurs uniquement)
- Système d'authentification (inscription, connexion)
- Commentaires sur les articles
- Réactions par emoji (👍, ❤️, 😂)

## Technologies utilisées

### Frontend
- React 19
- TypeScript
- Vite
- React Router 7
- React-Bootstrap
- Axios

### Backend
- Django 4
- Django REST Framework
- Simple JWT (authentification)
- SQLite (base de données)

## Installation

### Prérequis
- Node.js (v18+)
- Python (v3.9+)
- npm ou yarn

### Installation du frontend

```bash
# Cloner le projet
git clone <url-du-repo>

# Accéder au répertoire du frontend
cd BlogChillDev-main

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Installation du backend

```bash
# Accéder au répertoire du backend
cd django_backend

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement virtuel
# Sur Windows
venv\Scripts\activate
# Sur macOS/Linux
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt

# Appliquer les migrations
python manage.py migrate

# Créer un superutilisateur (administrateur)
python manage.py createsuperuser

# Démarrer le serveur
python manage.py runserver
```

## Configuration

### Connexion entre le frontend et le backend

Le frontend communique avec le backend à travers une API REST. La configuration de l'URL de l'API se trouve dans le fichier `src/api/config.ts`.

Par défaut, l'API est configurée pour être accessible à l'adresse `http://localhost:8000/api`.

### CORS

Le backend est configuré pour accepter les requêtes depuis:
- `http://localhost:3000` (React Create React App)
- `http://localhost:5173` (Vite)

Si vous utilisez un port différent, assurez-vous de l'ajouter à la liste `CORS_ALLOWED_ORIGINS` dans le fichier `settings.py` du backend.

## Structure du projet

### Frontend

```
src/
├── api/            # Configuration d'Axios et URL de l'API
├── components/     # Composants réutilisables
├── pages/          # Pages principales de l'application
├── services/       # Services pour les appels API
├── App.tsx         # Composant principal de l'application
└── Router.tsx      # Configuration des routes
```

### Backend

```
django_backend/
├── blog_api/       # Configuration principale de Django
├── users/          # Gestion des utilisateurs
├── posts/          # Gestion des articles et commentaires
└── manage.py       # Script de gestion Django
```

## Fonctionnalités principales

### Authentification

- Inscription avec nom d'utilisateur, email et mot de passe
- Connexion avec nom d'utilisateur et mot de passe
- Authentification par JWT (JSON Web Tokens)

### Gestion des articles

- Affichage de la liste des articles
- Affichage détaillé d'un article
- Création d'article (administrateurs uniquement)
- Réactions par emoji (👍, ❤️, 😂)

### Commentaires

- Affichage des commentaires par article
- Ajout de nouveaux commentaires
- Pagination des commentaires

## API Endpoints

### Authentification
- `POST /api/token/` - Obtenir un token JWT
- `POST /api/users/` - Créer un nouvel utilisateur
- `GET /api/users/me/` - Obtenir les détails de l'utilisateur connecté

### Articles
- `GET /api/posts/` - Liste de tous les articles
- `GET /api/posts/{id}/` - Détails d'un article
- `POST /api/posts/` - Créer un nouvel article (admin seulement)
- `POST /api/posts/{id}/toggle_emoji/` - Ajouter/retirer un emoji
- `GET /api/posts/{id}/comments/` - Liste des commentaires
- `POST /api/posts/{id}/add_comment/` - Ajouter un commentaire

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contributeurs

- Yanis - Développeur principal
