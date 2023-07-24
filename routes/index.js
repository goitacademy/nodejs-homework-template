const contactsRouter = require("./api");
const usersRouter = require("./users");

const allRouter = {
  contactsRouter,
  usersRouter,
};
module.exports = { allRouter };
