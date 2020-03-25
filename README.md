# Installation (with docker)

Copy .env.dist to .env and set the environment variables

- Build the containers

```bash
docker-compose build
```

- Database initialization

```bash
docker-compose run app rails db:setup
```

- Run tests

```bash
docker-compose run app rspec
```
