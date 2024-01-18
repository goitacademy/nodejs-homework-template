const { ctrlWrapper } = require("../../helpers/index.js");
const getAll = require('./getAll.js');
const getById = require('./getById.js');
const addNew = require('./addNew.js');
const deleteById = require('./deleteById.js');
const updateById = require('./updateById.js');
const updateStatusContact = require('./updateStatusContact.js');


module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};