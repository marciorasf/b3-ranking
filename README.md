# Hippocards API

Hippocards is a tool that helps people studying with flashcards.

Check also the client repo [hippocards-web](https://github.com/marciorasf/hippocards-web).
.
## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed Node.js version 12.22.0 or above.
* You have Docker and DockerCompose installed.
* You have yarn installed.
* You don't need the [hippocards-web](https://github.com/marciorasf/hippocards-api) running, but is highly recommended.

## Installing

To install hippocards-api, follow these steps:

Clone repo:
```
git clone git@github.com:marciorasf/hippocards-api.git
```

Install dependencies:
```
yarn
```

Clone .env.example as .env

## Using hippocards-api

To use hippocards-api, execute the following steps:

Run the container with the PostgreSQL:

```
docker-compose up
```

Start tsc watch:

```
yarn watch
```

Start server:

```
yarn dev
```

## Technologies used
* TypeScript
* Express.js
* PostreSQL with TypeORM
* AWS SES
* bcrypt

## Contact

If you want to contact me you can reach me at marciorasf@gmail.com.
