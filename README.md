# Analysis

[Read analysis](docs/index.md)

# Installation (with docker)

## 1. Set environment

Copy .env.dist to .env and set the environment variables

## 2. Build the containers

```bash
docker-compose build
```

## 3. Start the containers

```bash
docker-compose up -d
```

## 4. Database initialization

```bash
docker-compose run app rails db:setup
```

## 5. Run tests

```bash
# Backend unit tests and e2e tests
docker-compose run app rspec
```

```bash
# Frontend unit tests
docker-compose run client yarn test
```

## 6. Open app in browser

By default: [localhost:8000](http://localhost:8000)
