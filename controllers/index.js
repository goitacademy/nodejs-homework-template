const contacts = require("./contacts");
const users = require("./users");

module.exports = {
  contacts,
  users,
};

// module.exports = ["./contactControllers.js", "./userControllers.js"].reduce(
//   (obj, file) => {
//     const exp = require(file);
//     Object.assign(obj, exp);
//     return obj;
//   },
//   {}
// );
