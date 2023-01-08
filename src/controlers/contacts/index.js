const getList = require("./getList");
const getListById = require("./getContactById");
const postContact = require("./postContact");
const deleteById = require("./deleteById");
const putById = require("./putById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getList,
  getListById,
  postContact,
  deleteById,
  putById,
  updateStatusContact,
};
