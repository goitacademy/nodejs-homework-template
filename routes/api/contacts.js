const express = require("express");

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
  checkUpdateContactData,
} = require("../../middlewares/contactsMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getAllController)
  .post(checkContactData, addContactController);

router
  .route("/:contactId")
  .get(checkId, getByIdController)
  .delete(checkId, deleteController)
  .put(checkUpdateContactData, changeContactController);

module.exports = router;
