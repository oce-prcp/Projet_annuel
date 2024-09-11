# Sample Project

Ce projet est une plateforme développée à la demande d'un cabinet d'architectes qui a besoin d'une solution pour stocker et gérer les fichiers de ses clients de manière sécurisée.

## Objectif du Projet

Le cabinet d'architectes souhaite une plateforme où ses clients peuvent déposer et consulter des documents relatifs à leurs projets. La sécurité des données étant une priorité, la plateforme est conçue pour garantir la confidentialité et la protection des fichiers stockés.

La page d'accueil de la plateforme est une page de connexion, garantissant que seuls les utilisateurs autorisés peuvent accéder aux fichiers et aux fonctionnalités.
## Prérequis

- Node.js (v16+ recommandé)
- npm (version 7+)
- WAMP ou tout autre serveur Apache/MySQL

## Installation

Clonez le dépôt dans votre environnement local :

```bash
git clone https://github.com/oce-prcp/Projet_annuel.git
cd sample-project
```

## Démarrer le Front-End
Accédez au dossier front :

```bash
cd front
```

Installez les dépendances :

```bash
npm install
```

Démarrez le serveur de développement :

```bash
npm run dev
```

## Démarrer le Back-End
Assurez-vous que WAMP est lancé et que votre serveur MySQL/Apache est actif.

Accédez au dossier back :

```bash
cd back
```
Installez les dépendances (si ce n'est pas déjà fait) :

```bash
npm install
```
Démarrez le serveur Node.js :

```bash
node server.js
