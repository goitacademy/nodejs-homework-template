const express = require("express");

const router = express.Router();

const { isEmptyBody } = require("../../middlewares/isEmptyBody");

const { validateBody } = require("../../decorators");

const { contactAddSchema } = require("../../schemas");

const contactAddValidate = validateBody(contactAddSchema);

const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require("../../controllers");

router.get("/", listContactsController);

//router.get("/:contactId", getContactByIdController);

//router.post("/", isEmptyBody, contactAddValidate, addContactController);

//router.delete("/:contactId", removeContactController);

/*router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidate,
  updateContactController
);*/

module.exports = router;
