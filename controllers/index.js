const { create } = require("./create");
const { delete_by_id } = require("./delete_by_id");
const { get_list } = require("./get_list");
const { get_by_id } = require("./get_by_id");
const { update } = require("./update");

module.exports = {
  create,
  delete_by_id,
  get_list,
  get_by_id,
  update,
};
