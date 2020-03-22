const _ = require("lodash");

const vals = [1, 2, "good", [1, 2], { name: "Peter", age: 32 }];

vals.forEach(e => {
  if (_.isNumber(e)) {
    console.log(`${e} isNumber`);
  }
  if (_.isString(e)) {
    console.log(`${e} isString`);
  }
  if (_.isArray(e)) {
    console.log(`${e} isArray`);
  }
  if (_.isObject(e)) {
    console.log(`${JSON.stringify(e)} isObject`);
  }
});
