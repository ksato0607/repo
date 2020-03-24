const _ = require("lodash");

const vals = [-3, 4, 0, 12, 43, 9, -12];

let min = _.min(vals);
console.log(min);

let max = _.max(vals);
console.log(max);

const obs = [{ n: 12 }, { n: -4 }, { n: 4 }, { n: -11 }];

min = _.minBy(obs, "n");
console.log(min);

max = _.maxBy(obs, "n");
console.log(max);
