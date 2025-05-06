# BlogChillDev

Une application de blog moderne développée avec React et Django, permettant aux utilisateurs de partager des articles, commenter et réagir avec des emojis.

## Aperçu du projet

BlogChillDev est une application full-stack composée d'un frontend React avec TypeScript et d'un backend Django REST API. L'application permet:

- Consultation d'articles
- Création de nouveaux articles (administrateurs uniquement)
- Système d'authentification (inscription, connexion)
- Commentaires sur les articles
- Réactions par emoji (👍, ❤️, 😂)

## Wireframes

Lien : https://whimsical.com/projet-blog-Apu8mtQfMtgMyS9ptKY1k9

## MCD

Diagram : https://dbdiagram.io/d/67bed6ee263d6cf9a0813a5b

## Structure du projet

Ce dépôt est un monorepo contenant à la fois:
- Le frontend React/TypeScript à la racine
- Le backend Django dans le dossier `django_backend/`

Cette structure facilite le développement et le déploiement de l'application complète.

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

### Installation

```bash
# Cloner le projet
git clone https://github.com/GaTcha-Sama/BlogChillDev.git
cd BlogChillDev
```

### Configuration du Frontend

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le frontend sera accessible à l'adresse: http://localhost:5173

### Configuration du Backend

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

# Appliquer les migrations (si nécessaire)
python manage.py migrate

# Créer un superutilisateur (administrateur)
python manage.py createsuperuser

# Démarrer le serveur
python manage.py runserver
```

Le backend sera accessible à l'adresse: http://localhost:8000/api
L'interface d'administration: http://localhost:8000/admin

## Configuration

### Connexion entre le frontend et le backend

Le frontend communique avec le backend à travers une API REST. La configuration de l'URL de l'API se trouve dans le fichier `src/api/config.ts`.

Par défaut, l'API est configurée pour être accessible à l'adresse `http://localhost:8000/api`.

### CORS

Le backend est configuré pour accepter les requêtes depuis:
- `http://localhost:3000` (React Create React App)
- `http://localhost:5173` (Vite)
- `http://127.0.0.1:5173` (Vite alternative)

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

## Dépannage

### Problèmes CORS
Si vous rencontrez des problèmes CORS, vérifiez que:
1. Le backend Django est bien en cours d'exécution
2. Les origines correctes sont configurées dans `django_backend/blog_api/settings.py`
3. Le frontend utilise la bonne URL API dans `src/api/config.ts`

### Problèmes d'authentification
Si vous ne pouvez pas créer d'articles en tant qu'administrateur:
1. Vérifiez que l'utilisateur a bien le statut d'administrateur dans l'admin Django
2. Assurez-vous que le token JWT est bien inclus dans les requêtes API

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contributeurs

- Yanis - Lead Dev
- Jérémy - Dev
- Thomas - Dev
