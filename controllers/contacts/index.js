const { getAll } = require("./getAll");
const { getById } = require("./getById");
const { add } = require("./add");
const { updateById } = require("./updateById");
const { deleteById } = require("./deleteById");
const { updateStatusContact } = require("./updateStatusContact");

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
};
