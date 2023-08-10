const getListContacts = require("./contacts/getListContacts");
const getOneContactById = require("./contacts/getOneContactById");
const addOneContact = require("./contacts/addOneContact");
const removeContactById = require("./contacts/removeContactById");
const updateOneContact = require("./contacts/updateOneContact");
const updateStatusContact = require("./contacts/updateStatusContact");
const updateAvatar = require("./auth/updateAvatar");

const register = require("./auth/register");
const login = require("./auth/login");
const getCurrent = require("./auth/getCurrent");
const logout = require("./auth/logout");
const updateSubscriptionUser = require("./auth/updateSubscriptionUser");

module.exports = {
  getListContacts,
  getOneContactById,
  addOneContact,
  removeContactById,
  updateOneContact,
  updateStatusContact,
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionUser,
  updateAvatar,
};
