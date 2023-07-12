const { getAllController } = require("./getAll");
const { getByIdController } = require("./getByID");
const { postController } = require("./post");
const { deleteController } = require("./delete");
const { putController } = require("./put");

module.exports = {
  getAllController,
  getByIdController,
  postController,
  deleteController,
  putController,
};
