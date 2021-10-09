<h1 align="center">
  The Payroll System
</h1>

<p align="center">A sample payroll system, using Nest.JS + MongoDB</p>

____

## Description

This project is part of a challenge that the main goal is to create a new payroll system API that have two goals:

1. Upload a CSV file containing data on the number of hours worked per day per employee
1. Retrieve a report detailing how much each employee should be paid in each _pay period_

## Running the project

### Skaffold

The easiest way to run the project is to have:
- [Skaffold](https://skaffold.dev/docs/install/) installed
- Duplicate the `.env-docker-sample` file by renaming it to `.env`.
- Running the following command in the main project folder:

```bash
skaffold dev
```

And then, to know the server port use the command:

```bash
kubectl get services
```

### Locally

To run on your machine, first you need to have MongoDB installed.

> Tip: you can download it [HERE](https://www.mongodb.com/try/download/community)

Then install the dependencies running:

```bash
npm run install
```

Then duplicate the `.env-local-sample` file by renaming it to `.env`.

Finally, there are three ways to run the application:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Roadmap

* [ ] Add Swagger
* [ ] Add more tests to cover more possibilities
* [ ] Add alias to common paths/modules
* [ ] Add filters in GET /payrolls/reports

## Stay in touch

- [LinkedIn](https://www.linkedin.com/in/wenderpmachado/)
- [Instagram](https://www.instagram.com/wenderpmachado/)
