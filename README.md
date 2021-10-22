# Simple transaction system

This is a simple transactions system

## Setup

First clone this repository and navigate into it with
- `git clone https://github.com/dPliakos/simple-transactions-system.git`
- `cd simple-transactions-system`

#### Back-end service
  - Navigate into the back-end directory `cd ./simple-transactions`
  - Install dependencies `npm install`
  - Start server `npm start`

#### Front-end app
  - Navigate into the front-end directory `cd ./simple-transactions-frontend`
  - Install dependencies `npm install`
  - Start development server `npm start`


## Features

- Shows the list of repeating transactions from the local dataset


## Algorithms

### Repeating transactions

This simple algorithm used in order to decide if a list of transactions with the same
description has repeating transactions.

1. Every transaction has a timestamp
2. Check that a transaction happens multiple times, but once each month


### Fuzzy description matching

Given a list of transactions
1. Find unique descriptions
2. Create a target list
3. Remove the the item that is being tested from the list
4. Use `fuzzyset.js` to rank the testing item against each other (I used a threshold of 0.7 for this example)
5. Remove the items that matched from the list too, run again from 3
