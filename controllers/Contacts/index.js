const { cntWrapper } = require("../../Helpers");

const getAll = require("./getAll");
const getById = require("./getById");
const addContact = require("./add");
const removeContact = require("./remove");
const updateContact = require("./update");
const setFaforited = require("./setFavorited");

module.exports = {
  getAll: cntWrapper(getAll),
  getById: cntWrapper(getById),
  addContact: cntWrapper(addContact),
  removeContact: cntWrapper(removeContact),
  updateContact: cntWrapper(updateContact),
  setFaforited: cntWrapper(setFaforited),
};
