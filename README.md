# B3 Ranking

This is a CLI tool that provides an easy way to get B3's stocks indicators, and rank them using an algorithm like the one written in the book: The Little Book That Beats The Market.

The project is inspired by Joel Greenblatt's book: The Little Book That Beats The Market, translated to portuguese as something like "The Magic Formula To Beats The Market" (that's the reason of the name of this repo), and provides a simple way to get B3's stocks indicators and process your own stocks rankings.

First, I intended to make a program to only get the stocks and applies Greenblatt's strategy. But, I realize that it would be much more valuable if it provides a generic way to apply custom strategies to rank the stocks. So that was what I built.

## How it works

To get the stocks' indicators it crawls the [Status Invest](https://statusinvest.com.br/) site for each stock. Then it saves in a convenient format on a MongoDB to be consumed later.

Finally, it runs a ranking algorithm based on specified indicators and constraints.

## Important notes

- There's no guarantee that the indicators retrieved by this project or the ranking algorithms are correct.
- The strategies are not investments recommendations.
- The indicators names were written in portuguese to ease the verification of the indicators and maintenance.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js version 12.22.0 or above.
- You have Docker and DockerCompose installed.
- You have yarn installed.

## Installing

To install **B3 Ranking**, follow these steps:

Clone repo:

```
git clone git@github.com:marciorasf/b3-ranking.git
```

Install dependencies:

```
yarn
```

Clone .env.example as .env

## Using B3 Ranking

### Setup

To use the CLI, you must have your MongoDB running. To run the MongoDB container execute:

```bash
docker-compose up
```

### Strategies

An strategy consists on a configuration for the rank algorithm. The default strategy is the **custom**. You can modify it at `./src/strategies/custom.ts`. You can modify the others strategies too, but I don't recommend because the **custom** strategy was added with that intent.

To make changes on the **custom** strategy I highly recommend to use some editor with typescript support because it helps a LOT.

There are more 3 strategies:

- marciorasf: strategy used by the author
- onlyEbit: uses only ev/evit to rank the stocks
- bazin: based on Décio Bazin's strategy. This strategy can be found on the book "Faça Fortuna com Ações" (I think it doesn't have an english version).

### Making Changes

If you want to make changes on the files, make sure you start typescript in watch mode by executing:

```bash
yarn watch
```

Or at least build the project after the changes:

```bash
yarn build
```

### Import

This command get the current information of the stocks on Status Invest. The list of stocks to be searched can be found on `./resources/stocks_codes_custom.json`. You can change it if you don't want to search specific stocks.

Make sure you run this command before executing others so you have up to date informations.

To run it, execute:

```bash
yarn cli import
```

<br/>

:warning: Sometimes occurs errors when importing some stocks. See the **errors** command below to learn how to check which stocks are not on the database.

### Errors

```bash
yarn cli errors
```

### List

This command lists the stocks based on the ranking strategy chosen.

To run it with the default options, execute:

```bash
yarn cli list
```

<br/>

You can also pass some options and flags. Let's see those options now.

#### Strategy

You can pass the strategy that you want to use with the `-s` option:

```bash
# list the stocks using marciorasf's strategy
yarn cli list -s marciorasf
```

At the moment there are only four strategies: custom, marciorasf, bazin, onlyEbit. The default strategy is **custom**.

#### Number of stocks

You can limit the list size using `-n` option:

```bash
# list only the first 50 stocks
yarn cli list -n 50
```

#### Filter same enterprise stocks

You can filter the list to display only the stocks with best positions for each enterprise with the flag `-f`.

For example, SANEPAR has the following codes: SAPR3, SAPR4, SAPR11. If you don't use the flag all the three codes will be displayed. Instead, if you use the flag, only the code with best position will be displayed.

To filter the stocks codes run:

```bash
yarn cli list -f
```

#### Combining options

You can also use more than one option at once like:

```
yarn cli list -n 50 -f
```

### Find

The find command is used to find the positions of specific stocks.

If the position is **-1**, it means that the stock doesn't fit to the strategy constraints.

This command always return the position of the best code of the searched stock. So instead of providing **SAPR3** and **SAPR4**, you should pass only **SAPR**.

```bash
yarn cli find --stocks "SAPR, TAEE"
```

As **list** command you can pass the strategy using `-s` option.

## Technologies used

- TypeScript
- MongoDB with mongoose and typegoose
- Axios
- Cheerio
- Commander

## REST API

I implemented a REST API using the core of the project. I also implemented a simple front-end that consumes from this server, check it at [B3 Ranking](https://b3-ranking.marciorasf.space).

To run it, execute:

```bash
yarn dev
```

> You must have the Mongo running before running the server.

You can also run the server with the mongo with:

```bash
docker-compose -f docker-compose.full.yaml up
```
