const { __, assoc, gt, identity, prop, reduce } = require('ramda');

// NO!
const greaterThanTen = gt(10);
greaterThanTen(5) // true  because it evaluates to 10 `gt` 5 

const greaterThanSix = gt(__, 6); // evaluates to ? gt 6

const reducer = (acc, item) => {
  acc[item.name] = item.value;
  return acc;
};

// Bad!
const aggregate = reduce(reducer, {});

aggregate([{name: 'five', value: 5}]); // {five: 5}
aggregate([{name: 'six', value: 6}]); // {five: 5, six: 6}

// don't partially apply the accumulator
reduce(reducer, {}, [{name: 'five', value: 5}]); // {five: 5}
reduce(reducer, {}, [{name: 'six', value: 6}]); // {six: 6}

array.reduce(reducer, {});

// or don't mutate the accumulator
const reducer2 = (acc, item) => assoc(item.name, item.value, acc);
