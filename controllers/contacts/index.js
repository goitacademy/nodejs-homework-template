const { getAll } = require("./getAll");
const { getById } = require("./getById");
const { add } = require("./add");
const { updateById } = require("./updateById");
const { updateStatusContact } = require("./updateStatusContact");
const { deleteById } = require("./deleteById");

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
};