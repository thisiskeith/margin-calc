# margin-calc

Utility for calculating gross profit, gross margin percentage, and markup percentage

## Usage

Gross profit
```js
margincalc.grossProfit(revenue, cost);
```

Gross margin percentage
```js
margincalc.grossMarginPercentage(revenue, cost[, precision]);
```

Mark up percentage
```js
margincalc.markUpPercentage(revenue, cost[, precision]);
```

## Installation

The easiest way to get started is to add the following to your `package.json` dependencies
```js
{
    "dependencies": {
        "margin-calc": "git+ssh://git@github.com:thisiskeith/margin-calc.git",
    }
}
```
Install the package
```js
npm install
```
Require in your application
```
var margincalc = require('margin-calc');
```
