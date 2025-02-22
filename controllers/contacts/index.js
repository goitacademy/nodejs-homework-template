const { getAll } = require("./getAll");
const { getById } = require("./getById");
const { postContact } = require("./postContact");
const { deleteById } = require("./deleteById");
const { putById } = require("./putById");
const { updateStatusContact } = require("./updateStatusContact");

module.exports = {
  getAll,
  getById,
  postContact,
  deleteById,
  putById,
  updateStatusContact,
};
