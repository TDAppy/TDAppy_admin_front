# README — TDAppy Admin Dashboard

## Présentation

Le dashboard admin de TDAppy est une SPA (Single Page Application)
développée avec Angular 19, réservée aux administrateurs de la plateforme.
Elle permet de gérer les utilisateurs, le contenu du forum, les ressources
documentaires, les signalements et de consulter les statistiques du quiz.
Contrairement à l'application principale, ce frontend n'a pas vocation
à être référencé — la stratégie CSR en SPA est donc optimale pour ce cas
d'usage.

## Stack technique

- Angular 19 — TypeScript 5
- Angular Signals (gestion d'état)
- Angular Router (lazy-loading, guards)
- Tailwind CSS
- Chart.js / ng2-charts (statistiques)
- ESLint — Prettier — Husky (qualité du code)
- Karma / Jasmine (tests unitaires et d'intégration)
- Cypress (tests E2E)
- Docker — GitHub Actions (CI/CD)

## Prérequis

- Node.js 20
- npm 10+
- Angular CLI (`npm install -g @angular/cli`)

## Installation et lancement

```bash
# Cloner le dépôt
git clone https://github.com/[organisation]/tdappy-admin.git
cd tdappy-admin

# Installer les dépendances
npm ci

# Lancer en développement
npm start
```

## Environnements

Trois environnements sont configurés dans `src/environments/` :

| Environnement | Commande                                    | API cible                              |
|---------------|---------------------------------------------|----------------------------------------|
| development   | `npm start`                                 | http://localhost:8080                  |
| staging       | `npm run build -- --configuration=staging`  | https://staging-api.tdappy.fr          |
| production    | `npm run build`                             | https://api.tdappy.fr                  |

## Scripts disponibles

```bash
npm start                  # Lancer le serveur de développement
npm run build              # Build de production
npm run lint               # Vérification ESLint
npm run test:unit          # Tests unitaires (Karma / Jasmine)
npm run test:integration   # Tests d'intégration (Karma / Jasmine)
npm run cypress:open       # Tests E2E en mode interactif
npm run cypress:ci         # Tests E2E en mode headless (CI)
```

## Architecture

```
src/
├── app/
│   ├── app.ts              — Composant racine (<app-root>)
│   ├── app.config.ts       — Configuration Angular (providers, router)
│   ├── router/
│   │   ├── app.routes.ts   — Déclaration des routes (lazy-loading)
│   │   └── guards/         — authGuard (accès réservé aux admins)
│   ├── features/
│   │   ├── authentication/ — Login admin
│   │   ├── users/          — Gestion des utilisateurs et bannissements
│   │   ├── forums/         — Modération des topics
│   │   ├── reports/        — Gestion des signalements
│   │   ├── content/        — Gestion des ressources documentaires
│   │   ├── statistics/     — Statistiques du quiz (Chart.js)
│   │   └── dashboard/      — Page d'accueil du back-office
│   └── shared/
│       ├── components/     — AdminTable, Pagination, Modales réutilisables
│       ├── services/       — BaseApi, ErrorService…
│       └── models/         — Interfaces TypeScript
├── assets/                 — Images, fonts
├── environments/           — Variables par environnement
└── tests/
    ├── config/             — karma.base.conf.js, cypress.config.ts
    ├── unit/               — Specs unitaires
    ├── integration/        — Specs d'intégration
    └── e2e/                — Scénarios Cypress (navigate.cy.ts)
```

## Qualité du code

- **ESLint** — analyse statique, règles Angular et TypeScript
- **Prettier** — formatage automatique (printWidth 100, singleQuote)
- **Husky** — git hooks bloquant le commit si lint ou format en échec

## CI/CD

Les pipelines GitHub Actions assurent :
- **CI** — lint, tests unitaires, d'intégration et E2E à chaque push
- **CD** — build de l'image Docker (Nginx) et déploiement sur le VPS OVH
  à chaque merge sur `staging` ou `production`

## Accès

Le dashboard est accessible uniquement aux utilisateurs disposant
du rôle `ROLE_ADMIN`. Toute tentative d'accès avec un compte standard
est bloquée au niveau du `JwtFilter` côté API et de l'`authGuard`
côté frontend.
