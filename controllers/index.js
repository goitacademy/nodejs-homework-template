const { getAllController } = require("./getAllContactsController");
const { getByIdController } = require("./getContactByIDController");
const { postController } = require("./postContactController");
const { deleteController } = require("./deleteContactController");
const { putController } = require("./putContactController");

module.exports = {
  getAllController,
  getByIdController,
  postController,
  deleteController,
  putController,
};
