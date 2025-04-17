# Blog API - Backend Django

Ce projet est le backend Django pour une application de blog avec React en frontend.

## Fonctionnalités

- Authentification utilisateur (connexion)
- Affichage des posts (limité à 5 lignes avec option pour voir le post complet)
- Commentaires sur les posts (limité à 5 commentaires par page)
- Réactions avec emoji sur les posts
- Compteur d'emojis
- Protection de la page de création de posts (réservée aux administrateurs)

## Installation

1. Cloner le dépôt
2. Installer Python 3.8 ou supérieur
3. Créer un environnement virtuel:
   ```
   python -m venv venv
   ```
4. Activer l'environnement virtuel:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`
5. Installer les dépendances:
   ```
   pip install -r requirements.txt
   ```
6. Appliquer les migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
7. Créer un superutilisateur:
   ```
   python manage.py createsuperuser
   ```
8. Démarrer le serveur:
   ```
   python manage.py runserver
   ```

Le serveur sera accessible à l'adresse: http://127.0.0.1:8000/

## API Endpoints

- `/api/posts/` - Liste et création de posts
- `/api/posts/{id}/` - Détail, modification et suppression d'un post
- `/api/posts/{id}/comments/` - Liste des commentaires d'un post
- `/api/posts/{id}/add_comment/` - Ajouter un commentaire à un post
- `/api/posts/{id}/toggle_emoji/` - Ajouter/supprimer un emoji sur un post
- `/api/token/` - Obtenir un token JWT
- `/api/token/refresh/` - Rafraîchir un token JWT
- `/admin/` - Interface d'administration Django

## Technologies utilisées

- Django 4.2
- Django REST Framework
- JWT pour l'authentification
- SQLite pour la base de données (en développement) 