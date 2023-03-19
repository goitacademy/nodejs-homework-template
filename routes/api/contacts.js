const express = require("express");
const router = express.Router();

const {
  getAllController,
  getByIdController,
  changeContactController,
  deleteController,
  addContactController,
} = require("../../controllers/controllers");

const {
  checkId,
  checkContactData,
} = require("../../middlewares/contactsMiddleware");

router
  .route("/")
  .get(getAllController)
  .post(checkContactData, addContactController);

router
  .route("/:contactId")
  .get(checkId, getByIdController)
  .delete(checkId, deleteController)
  .put(changeContactController);

module.exports = router;
