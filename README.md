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
npm i margin-calc -S
```
Require in your application
```
// ES5
var MarginCalc = require('margin-calc');

// ES6
import MarginCalc from 'margin-calc';
```
