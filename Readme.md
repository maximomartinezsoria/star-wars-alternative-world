# Star Wars Alternative World

## Installation

### Using Docker

1. Create `.env` file, using `.env.example` as a reference. Since you're using Docker, you don't really need to change anything.

```
cp .env.example .env
```

2. Run services

```
# Development
docker-compose up

# Production
docker-compose -f docker-compose-prod.yml up
```

3. Run database migrations. **I think knex might has an issue with esm. You'll have to run this command 3 times for it to work. After the third time, you'll get this green message: "Batch 1 run: 4 migrations"**

```
docker-compose exec api yarn knex migrate:latest --esm
```

4. Run database seeders. **I think knex might has an issue with esm. You'll have to run this command twice for it to work (yes, migrations three times but seeders only twice, kinda funny 😄). After the second time, you'll get this green message: "Ran 3 seed files"**

```
docker-compose exec api yarn knex seed:run --esm
```

5. Ready! Find the API at [http://localhost:3000/graphql](http://localhost:3000/graphql) and the APP at [http://localhost:5000](http://localhost:5000)

### Using your local machine

#### Prerequisites

1. Node 14 or above
2. PostgreSQL 12

#### Installation

1. Create `.env` file, using `.env.example` as a reference. Update the new `.env` with your database credentials.

```
cp .env.example .env
```

2. Install dependencies. This project uses yarn workspaces.

```
# In root folder
yarn install
```

3. Run database migrations. **I think knex might has an issue with esm. You'll have to run this command 3 times for it to work. After the third time, you'll get this green message: "Batch 1 run: 4 migrations"**

```
docker-compose exec api yarn knex migrate:latest --esm
```

4. Run database seeders. **I think knex might has an issue with esm. You'll have to run this command twice for it to work (yes, migrations three times but seeders only twice, kinda funny 😄). After the second time, you'll get this green message: "Ran 3 seed files"**

```
docker-compose exec api yarn knex seed:run --esm
```

5. Start services

```
# In root folder

# Development
yarn dev:api
yarn dev:app

# Production
yarn start:api
yarn start:app
```

6. Ready! Find the API at [http://localhost:3000/graphql](http://localhost:3000/graphql) and the APP at [http://localhost:5000](http://localhost:5000)

## Tests

1. Install Cypress

```
# In root folder
yarn install

```

2. Run Cypress

```
# In root folder
yarn cypress
```
