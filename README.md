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

## Documentation
### Source
Sources send webhook events ingested to into the service. For example, Paystack, a payment gateway can be the source for your payments
and orders services in your e-commerce project. 

### Endpoint
An endpoint is a valid HTTP URL that can receive webhook events forwarded by Hooks.io. An endpoint should be subscribed to a source to receive events from the source.

### Subscription
Subscriptions are conduits through which events are routed from a source to an endpoint.

### Event
Event is a basically any webhook event from a source.

### Event Delivery
An event delivery is the combination of an endpoint and an event. An event can generate multiple event deliveries depending on the subscriptions. 

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
 
To run database migrations:
 
```bash
$ docker exec -it app bash
$ npm run db-migrate
```

### API Documentation
View the API docs on `localhost:5000/api-docs`