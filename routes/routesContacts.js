const express = require("express");
const router = express.Router();

const {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} = require("../controllers/controllers");

router
  .route("/contacts")
  .get(getAllContactsController)
  .post(createContactController);
router
  .route("/contacts/:id")
  .get(getContactByIdController)
  .delete(deleteContactController)
  .put(updateContactController);

module.exports = router;
