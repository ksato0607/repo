const _ = require("lodash");

const nums = [4, 5, 3, 2, 1, 7, 6, 8, 9];

const sum = _.reduce(nums, (total, next) => {
  return total + next;
});
console.log(sum);

const colours = ["red", "green", "white", "blue", "black"];

const res = _.reduceRight(colours, (next, total) => {
  return `${total}-${next}`;
});
console.log(res);
