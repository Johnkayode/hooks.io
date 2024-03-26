<h1 align="center">
  Hooks.io 
</h1>

## Overview

Hooks.io is a simple self-hostable webhook gateway service. It serves as a wehbook management tool to route incoming webhooks to the services where they are to be consumed.

## Features
- [x] Ingest webhook events.
- [x] Forward wehbook events to subscribed endpoints.
- [x] Manual event retries.
- [ ] Automatic event retries.
- [ ] Idempotency support.

## Running the project.
### Build the Docker image

```bash
$ docker-compose build
```

### Run the Containers
 
To run the containers previously built, execute the following:
 
```bash
$ docker-compose up -d
```


### Run database migrations
 
To run the containers previously built, execute the following:
 
```bash
$ docker exec -it app bash
$ npm run db-migrate
```

### API Documentation
View the API docs on `localhost:5000/api-docs`