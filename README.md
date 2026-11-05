
# Henri Trip — Frontend

Application web de gestion et de consultation de guides touristiques développée avec Angular 22.

## Technologies

- Angular 22
- TypeScript
- Angular Router
- HttpClient
- Authentification JWT

## Fonctionnalités

### Administrateur
- Gestion des guides touristiques
- Gestion des activités
- Programmation des activités par jour
- Gestion des utilisateurs et des invitations

### Utilisateur
- Connexion
- Consultation des guides auxquels il est invité
- Affichage du programme et des activités

## Installation

### Prérequis

- Node.js compatible avec Angular 22
- npm
- Backend Henri Trip démarré sur `http://localhost:8080`

### Commandes

```bash
npm install
npm start
```

Ouvrir `http://localhost:4200`.

## Configuration API

L'URL du backend est définie dans :

`src/app/core/api.config.ts`

Par défaut :

```typescript
export const API_URL = 'http://localhost:8080/api';
```

## Tests

```bash
npm test -- --watch=false
```

## Compilation

```bash
npm run build
```

## Authentification

L'application utilise un token JWT transmis automatiquement aux requêtes API protégées.

Les interfaces accessibles dépendent du rôle ADMIN ou USER.

## Backend

L'API Spring Boot est disponible dans un dépôt séparé.
