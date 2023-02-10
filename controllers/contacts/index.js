const { getAll } = require("./getAll");
const { getById } = require("./getById");
const { add } = require("./add");
const { updateById } = require("./updateById");
const { updateStatusById } = require("./updateStatusById");
const { removeById } = require("./removeById");

module.exports = {
  add,
  updateById,
  updateStatusById,
  getAll,
  getById,
  removeById,
};
