# Lizee technical test

## Description

Here is my attempt for the technical test - backend focused. It consists of a NestJS server connected to a PostgreSQL database.
I used TypeORM to connect my services with the database.
The server exposes an API with 2 endpoints:
- `/avaibility` to get product availabilty for a given time period
- `/checkout` if you want to simulate a checkout and see if availabilities change.
The simpliest way to test the solution is to follow the instructions below.

## Required

- Node.js and npm installed
- Recent version of docker
- A bash script interpreter. (with curl)

## Installation

```bash
$ npm install
```

## Demo

run:

```bash
$ npm demo:launch
```

Basically it will:
- build the project
- deploy a dockerized version of PostgreSQL on `127.0.0.1:5432` (make sure this address is free)
- create the tables
- launch the server on `localhost:3000` and populate the tables with some dummy data

once all is working fine, you can launch another terminal and type:

```bash
$ npm run demo:test
```

then maybe (it will book the available tent for the given period)

```bash
$ npm run demo:checkout
```

and re

```bash
$ npm run demo:test
```

## Architecture

NestJS enforces to use a elegant architecture module-driven. A module is meant to assume a given function within the solution. A module is basically a set of services, controllers, or dependencies.

Here `src/rental` is a module that offers a service to get product availabilities or to book a product item. In other words, its function is to deal with all the rental part of the solution (the only one, for now). Within this module we can find the database schema definitions in files suffixed with `.entity.ts`

For the database I chosed to mount 2 tables: one to get tracks on product items, the other to store the rental bookings.
You can find 2 pieces of business logic in file `src/rental/rental.service`.

## Criticism

Except all the guards I could set up to insure a minimum of security and reliability (e.g `checkout` doesn't event check if the mentionned item is available for renting), I think the data-model should be re-thinked either to resolve the problem using only 1 table or, on the contrary, to prepare incoming features. 

The migration task doesn't seem to work if we perform a change on data-model. I should investigate why.

No automical tests have been set up.

The business logic part is not that scalable.


