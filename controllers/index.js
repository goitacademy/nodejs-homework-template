// working with contacts
const getContactsList = require("./contacts/getContactsList");
const getContactById = require("./contacts/getContactById");
const putContactFildFavorite = require("./contacts/putContactFildFavorite");
const postContact = require("./contacts/postContact");
const putContact = require("./contacts/putContact");
const deleteContact = require("./contacts/deleteContact");

const { login } = require("./auth/userLogin");
const { register } = require("./auth/userRegister");
const getCurrent = require("./auth/getCurrent")
const logout = require("./auth/logout")
module.exports = {
  getContactsList,
  getContactById,
  putContactFildFavorite,
  postContact,
  putContact,
  deleteContact,
  register,
  login,
  getCurrent,
  logout,
};
