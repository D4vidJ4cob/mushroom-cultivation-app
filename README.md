## Project Beschrijving

Deze applicatie digitaliseert en automatiseert het tracking-proces voor een paddenstoelenkwekerij. Het systeem biedt volledige traceerbaarheid van elke paddenstoel, van moedercultuur tot eindproduct.

### Functionaliteiten

* **Species management** - Beheer verschillende paddenstoelensoorten

* **Culture tracking** - Registreer moederculturen en vloeibare culturen met inoculatiedatums
* **Grain spawn monitoring** - Track grainspawns met volledige traceerbaarheid naar hun bron
* **Substrate production** - Beheer substraten met incubatiedatums en besmettingsstatus
* **User authentication** - Veilige toegang met rol-gebaseerde permissies
* **Team collaboration** - Wijs teamleden toe aan specifieke batches

---

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

* **Node.js** (v18 of hoger)
* **pnpm** (package manager)
* **MySQL Community Server** (v8.0)
* **Docker** (optioneel, voor containerized deployment)

---

## Front-end

### Setup

1. Navigeer naar de frontend directory:

```bash
   cd frontend
```

1. Installeer de dependencies:

```bash
   pnpm install
```

1. Maak een bestand genaamd `.env` met de volgende inhoud:

```env
   VITE_API_URL=http://localhost:3000/api
```

### Opstarten

#### Development

1. Zorg dat het `.env` bestand aanwezig en correct ingevuld is
2. Start de app met volgend commando:

```bash
   pnpm dev
```

1. Open je browser op `http://localhost:5173`

#### Production

1. Zorg dat het `.env` bestand aanwezig en correct ingevuld is

### Testen

1. Run de Cypress tests met volgend commando:

```bash
   pnpm test
```

**Test credentials:**

* Email: `davidjacob.bjj@gmail.com`
* Password: `12345678`

---

## Back-end

### Setup

#### Instellen van .env-bestand

Maak een `.env` bestand in de `backend` directory met de volgende inhoud:

```env
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=mysql://name:password@provider:port/databasename

# CORS
CORS_ORIGINS=["INSERT_FRONTEND_LINK"]
CORS_MAX_AGE=10800

# Authentication
AUTH_JWT_SECRET=eensuperveiligsecretvoorindevelopment
AUTH_JWT_EXPIRATION_INTERVAL=3600
AUTH_JWT_AUDIENCE=INSERT_PROJECT_NAME
AUTH_JWT_ISSUER=INSER_USER

# Logging
LOG_LEVELS=["log","error","warn","debug"]
LOG_DISABLED=false
```

### Database Setup

#### Met Docker (aanbevolen)

1. Start de MySQL database:

```bash
   docker-compose up -d
```

### Opstarten

#### Development

1. Navigeer naar de backend directory:

```bash
   cd backend
```

1. Installeer de dependencies:

```bash
   pnpm install
```

1. Voer de database migraties uit:

```bash
   pnpm db:generate
   pnpm db:migrate
```

1. Seed de database (optioneel):

```bash
   pnpm db:seed
```

1. Start de applicatie:

```bash
   pnpm start:dev
```

1. De API is nu beschikbaar op `http://localhost:3000`
. Swagger documentatie: `http://localhost:3000/docs`

#### Production

1. Installeer de dependencies:

```bash
   pnpm install
```

1. Voer de database migraties uit:

```bash
   pnpm db:migrate
```

1. Start de applicatie:

```bash
   pnpm start:dev
```

#### Docker Deployment

1. Build en start met Docker Compose:

```bash
   docker-compose -f docker-compose.yml -f docker-compose.backend.yml up -d
```

### Testen

1. Zorg dat de test database draait en `.env.test` bestaat
2. Run de e2e testen:

```bash
   pnpm test:e2e
```

1. Run testen met coverage:

```bash
   pnpm test:cov
```

---

## API Documentatie

### OpenAPI/Swagger

De volledige API documentatie is beschikbaar via Swagger UI:

* **Development**: `http://localhost:3000/docs`
* **OpenAPI JSON**: `http://localhost:3000/docs-json`

### Client Library Genereren

Je kunt een TypeScript client library genereren op basis van de OpenAPI spec:

```bash
# Vanuit root directory
pnpm generate:api-client
```

Dit genereert type-safe API clients in `frontend/src/generated-api/`

---

## Project Structuur

```
frontendweb-2526-davidjacob/
├── backend/                    # NestJS backend applicatie
│   ├── src/
│   │   ├── auth/              # Authentication & authorization
│   │   ├── drizzle/           # Database schema & migrations
│   │   ├── species/           # Species endpoints
│   │   ├── mother-culture/    # Mother culture endpoints
│   │   ├── liquid-culture/    # Liquid culture endpoints
│   │   ├── grain-spawn/       # Grain spawn endpoints
│   │   ├── substrate/         # Substrate endpoints
│   │   └── user/              # User management endpoints
│   ├── test/                  # E2E tests
│   └── Dockerfile             # Backend container
│
├── frontend/                   # React + Vite frontend applicatie
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── contexts/          # React contexts (Auth, Theme)
│   │   ├── pages/             # Page components
│   │   ├── schemas/           # Yup validation schemas
│   │   └── generated-api/     # Generated TypeScript API client
│   └── cypress/               # Cypress E2E tests
│
└── docker-compose.yml         # Docker orchestration
```

---

## Test Accounts

Na het seeden van de database zijn volgende test accounts beschikbaar:

| Email | Password | Rol |
|-------|----------|-----|
| <davidjacob.bjj@gmail.com> | 12345678 | Admin, User |
| <drieshoste032@gmail.com> | 12345678 | Admin |
| <ivan@example.com> | 12345678 | User |

---
