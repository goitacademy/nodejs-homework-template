const { getAllController } = require("./getAllController");
const { getByIdController } = require("./getByIDController");
const { postController } = require("./postController");
const { deleteController } = require("./deleteController");
const { putController } = require("./putController");
const { patchController } = require("./patchController");

module.exports = {
  getAllController,
  getByIdController,
  postController,
  deleteController,
  putController,
  patchController,
};
