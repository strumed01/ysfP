# Credix 💳 — Application de gestion de crédit et finances

> Application mobile multilingue (FR / EN / ES / AR) pour gérer votre crédit, vos dépenses et vos objectifs d'épargne.

---

## 📁 Structure du projet

```
credix/
├── frontend/          # React app (interface mobile)
│   ├── public/
│   └── src/
│       ├── App.jsx    # Application principale (multilingue)
│       ├── index.js
│       ├── index.css
│       └── api.js     # Service API (axios)
│
└── backend/           # Node.js + Express + MongoDB
    ├── server.js      # Point d'entrée
    ├── models/        # Schémas MongoDB
    │   ├── User.js
    │   ├── Transaction.js
    │   ├── Budget.js
    │   └── Goal.js
    ├── routes/        # Routes API REST
    │   ├── auth.js
    │   ├── transactions.js
    │   ├── budgets.js
    │   ├── goals.js
    │   ├── credit.js
    │   └── users.js
    ├── middleware/
    │   └── auth.js    # JWT middleware
    └── config/
        └── db.js      # Connexion MongoDB
```

---

## 🚀 Installation & démarrage

### Prérequis
- Node.js >= 18
- MongoDB (local ou Atlas)
- npm ou yarn

---

### Backend

```bash
cd backend
cp .env.example .env       # Configurer les variables d'environnement
npm install
npm run dev                # Démarrage en mode développement (nodemon)
```

Variables `.env` à configurer :
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/credix
JWT_SECRET=votre_clé_secrète_très_longue
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

---

### Frontend

```bash
cd frontend
cp .env.example .env       # Configurer l'URL de l'API
npm install
npm start                  # Démarrage sur http://localhost:3000
```

---

## 🌐 API REST — Endpoints

### Authentification
| Méthode | Route              | Description          |
|---------|--------------------|----------------------|
| POST    | /api/auth/register | Créer un compte      |
| POST    | /api/auth/login    | Se connecter         |
| GET     | /api/auth/me       | Profil connecté      |

### Transactions
| Méthode | Route                        | Description              |
|---------|------------------------------|--------------------------|
| GET     | /api/transactions            | Liste des transactions   |
| POST    | /api/transactions            | Ajouter une transaction  |
| DELETE  | /api/transactions/:id        | Supprimer               |
| GET     | /api/transactions/stats      | Statistiques du mois     |

### Budgets
| Méthode | Route              | Description              |
|---------|--------------------|--------------------------|
| GET     | /api/budgets       | Récupérer le budget      |
| PUT     | /api/budgets       | Mettre à jour le budget  |
| POST    | /api/budgets/reset | Réinitialiser le mois    |

### Objectifs
| Méthode | Route                    | Description           |
|---------|--------------------------|-----------------------|
| GET     | /api/goals               | Liste des objectifs   |
| POST    | /api/goals               | Créer un objectif     |
| PATCH   | /api/goals/:id/deposit   | Ajouter de l'épargne  |
| DELETE  | /api/goals/:id           | Supprimer             |

### Crédit
| Méthode | Route               | Description              |
|---------|---------------------|--------------------------|
| GET     | /api/credit/score   | Score de crédit calculé  |
| GET     | /api/credit/tips    | Conseils personnalisés   |

### Utilisateurs
| Méthode | Route                | Description              |
|---------|----------------------|--------------------------|
| GET     | /api/users/profile   | Profil utilisateur       |
| PUT     | /api/users/profile   | Modifier le profil       |
| PUT     | /api/users/password  | Changer le mot de passe  |

---

## 🌍 Langues supportées

| Code | Langue   | Direction |
|------|----------|-----------|
| `fr` | Français | LTR       |
| `en` | English  | LTR       |
| `es` | Español  | LTR       |
| `ar` | العربية  | RTL       |

---

## 🎨 Design System Credix

| Couleur    | Hex       | Usage              |
|------------|-----------|---------------------|
| Bleu       | `#4DA6FF` | Couleur primaire    |
| Jade       | `#00E5A0` | Accent / succès     |
| Nuit       | `#070D1A` | Fond principal      |
| Marine     | `#0F1E38` | Cartes              |
| Ambre      | `#FFB547` | Alertes             |
| Corail     | `#FF6B6B` | Danger / dépenses   |

---

## 🔒 Sécurité

- Authentification JWT (7 jours)
- Hachage des mots de passe avec bcryptjs (salt 12)
- Rate limiting : 100 requêtes / 15 min
- Helmet.js pour les headers HTTP
- Validation des entrées avec express-validator

---

## 📱 Fonctionnalités

- ✅ Tableau de bord avec solde en temps réel
- ✅ Ajout de transactions (revenus / dépenses)
- ✅ Budgets mensuels par catégorie
- ✅ Score de crédit calculé dynamiquement
- ✅ Objectifs d'épargne avec progression
- ✅ Notifications et conseils IA
- ✅ Interface 4 langues avec RTL pour l'arabe
- ✅ Bouton FAB pour saisie rapide

---

## 👨‍💻 Stack technique

**Frontend** : React 18, React Router, Axios  
**Backend**  : Node.js, Express, MongoDB, Mongoose  
**Auth**     : JWT + bcryptjs  
**Design**   : CSS-in-JS, SVG custom, Google Fonts (Sora + Plus Jakarta Sans + Space Mono)

---

*Credix — Score · Track · Grow* 💳
