const { create } = require("./create.js");
const { get } = require("./get.js");
const { getById } = require("./getById.js");
const { remove } = require("./remove.js");
const { update } = require("./update.js");
const { updateStatusContact } = require("./updateStatusContact.js");

module.exports = {
  create,
  get,
  getById,
  remove,
  update,
  updateStatusContact,
};
