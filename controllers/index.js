const add = require("./contacts/add");
const getAll = require("./contacts/get");
const updateById = require("./contacts/put");
const updateFavoriteById = require("./contacts/patch");
const signup = require("./auth/signup");
const login = require("./auth/login");
const logout = require("./auth/logout");
const getCurrent = require("./users/current");

module.exports = {
  add,
  getAll,
  updateById,
  updateFavoriteById,
  signup,
  login,
  logout,
  getCurrent,
};
