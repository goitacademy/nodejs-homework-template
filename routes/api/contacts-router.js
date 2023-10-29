const express = require("express");

const router = express.Router();

const { isEmptyBody, isValidId } = require("../../middlewares");

const { validateBody } = require("../../decorators");

const { contactAddSchema } = require("../../models/Contact");

const contactAddValidate = validateBody(contactAddSchema);

const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require("../../controllers");

router.get("/", listContactsController);

router.get("/:contactId", isValidId, getContactByIdController);

router.post("/", isEmptyBody, contactAddValidate, addContactController);

//router.delete("/:contactId", removeContactController);

/*router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidate,
  updateContactController
);*/

module.exports = router;
