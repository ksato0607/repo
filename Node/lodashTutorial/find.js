const _ = require("lodash");

const users = [
  { firstName: "John", lastName: "Doe", age: 28, gender: "male" },
  { firstName: "Jane", lastName: "Doe", age: 5, gender: "female" },
  { firstName: "Jim", lastName: "Carrey", age: 54, gender: "male" },
  { firstName: "Kate", lastName: "Winslet", age: 40, gender: "female" }
];

const user = _.find(users, { lastName: "Doe", gender: "male" });

console.log(user);

const findUserByAge = _.find(users, (user) => {
    return user.age < 18;
})

console.log(findUserByAge);