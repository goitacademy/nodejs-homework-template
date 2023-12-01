const { decoratorCtrl } = require("../../helpers");

const getAll = require("./getAll");
const getById = require("./getById");
const addItem = require("./addItem");
const deleteItem = require("./deleteItem");
const updateItemById = require("./updateItemById");

module.exports = {
  getAll: decoratorCtrl(getAll),
  getById: decoratorCtrl(getById),
  addItem: decoratorCtrl(addItem),
  deleteItem: decoratorCtrl(deleteItem),
  updateItemById: decoratorCtrl(updateItemById),
  updateStatusContact: decoratorCtrl(updateItemById),
};
