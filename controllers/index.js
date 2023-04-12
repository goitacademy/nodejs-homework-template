const ctrlWrapper = require("../helpers/ctrlWrapper");
const getList = require("./contacts/getList");

const getById = require("./contacts/getById");

const add = require("./contacts/add");

const removeById = require("./contacts/removeById");

const updateById = require("./contacts/updateById");

//

module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
