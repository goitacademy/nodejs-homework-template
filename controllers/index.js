const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const update = require("./update");
const updateStatusContact = require("./updateStatusContact");
const remove = require("./delete");
const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const userCurrent = require("./userCurrent");
const updateUserSubscription = require("./updateUserSubscription");

module.exports = {
  getAll,
  getById,
  add,
  update,
  updateStatusContact,
  remove,
  signup,
  login,
  logout,
  userCurrent,
  updateUserSubscription,
};
