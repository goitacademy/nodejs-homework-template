const express = require("express");
const router = express.Router();

const {
  validation,
} = require("../../middlewares/validation/validationMiddleware");

const {
  getContactsController,
  getContactByIdController,
  postNewContactController,
  deleteContactController,
  putContactController,
} = require("../../controllers/contactsController");

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", validation, postNewContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", validation, putContactController);

module.exports = router;
